param(
    [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"

$appDirectory = $PSScriptRoot
$serverFile = Join-Path $appDirectory "server.js"
$preferredPort = 32382
$lastCandidatePort = 32402
$expectedVersion = 100
$localNode = Join-Path $appDirectory "runtime\node.exe"
$bundledNode = if ($env:USERPROFILE) {
    Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
} else {
    $null
}
$nodeExecutable = $null
$serverProcess = $null

if (Test-Path -LiteralPath $localNode) {
    $nodeExecutable = $localNode
} elseif (Test-Path -LiteralPath $bundledNode) {
    $nodeExecutable = $bundledNode
} else {
    $nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
    if ($nodeCommand) {
        $nodeExecutable = $nodeCommand.Source
    }
}

if (-not $nodeExecutable) {
    Write-Host "Node.js was not found." -ForegroundColor Red
    Write-Host "Please capture this window and return it to Codex."
    exit 1
}

$resolvedServerFile = [System.IO.Path]::GetFullPath($serverFile)
$previousTestProcesses = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Where-Object {
        $_.Name -eq "node.exe" -and
        $_.CommandLine -and
        $_.CommandLine.IndexOf(
            $resolvedServerFile,
            [System.StringComparison]::OrdinalIgnoreCase
        ) -ge 0
    }
foreach ($previousTestProcess in $previousTestProcesses) {
    Stop-Process -Id $previousTestProcess.ProcessId -Force -ErrorAction SilentlyContinue
}
if ($previousTestProcesses) {
    Start-Sleep -Milliseconds 300
}

$port = $null
$candidateListeners = Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
    Where-Object {
        $_.LocalPort -ge $preferredPort -and
        $_.LocalPort -le $lastCandidatePort
    }
$listeningPorts = @(
    $candidateListeners |
        Select-Object -ExpandProperty LocalPort -Unique |
        Sort-Object
)

if ($null -eq $port) {
    for ($candidatePort = $preferredPort; $candidatePort -le $lastCandidatePort; $candidatePort += 1) {
        if ($listeningPorts -notcontains $candidatePort) {
            $port = $candidatePort
            break
        }
    }
}

if ($null -eq $port) {
    Write-Host "Historical Workbench could not find a free local port." -ForegroundColor Red
    Write-Host "Please close an older test window and try again."
    exit 1
}

$baseUrl = 'http://127.0.0.1:{0}' -f $port

Write-Host "Starting Historical Workbench version $expectedVersion on port $port..."
$processInfo = New-Object System.Diagnostics.ProcessStartInfo
$processInfo.FileName = $nodeExecutable
$processInfo.Arguments = "`"$serverFile`""
$processInfo.WorkingDirectory = $appDirectory
$processInfo.UseShellExecute = $false
$processInfo.CreateNoWindow = $true
$processInfo.EnvironmentVariables["HISTORICAL_WORKBENCH_PORT"] = [string]$port
$serverProcess = New-Object System.Diagnostics.Process
$serverProcess.StartInfo = $processInfo
$serverProcess.Start() | Out-Null

$ready = $false
$observedVersion = $null
Write-Host "Waiting for the local service..."
for ($attempt = 0; $attempt -lt 24; $attempt += 1) {
    try {
        $response = Invoke-RestMethod `
            -Uri ($baseUrl + '/api/bootstrap') `
            -TimeoutSec 2
        $observedVersion = $response.version
        if ($observedVersion -eq $expectedVersion) {
            $ready = $true
            break
        }
    } catch {
        if ($serverProcess -and $serverProcess.HasExited) {
            break
        }
        Start-Sleep -Milliseconds 250
    }
}

if (-not $ready) {
    if ($serverProcess -and -not $serverProcess.HasExited) {
        $serverProcess.Kill()
    }
    Write-Host "Historical Workbench did not start correctly." -ForegroundColor Red
    if ($null -ne $observedVersion) {
        Write-Host "Observed version: $observedVersion; expected version: $expectedVersion." -ForegroundColor Yellow
    }
    if ($serverProcess -and $serverProcess.HasExited) {
        Write-Host "The local service exited with code $($serverProcess.ExitCode)." -ForegroundColor Yellow
    }
    Write-Host "Please capture this window and return it to Codex."
    exit 1
}

if (-not $NoBrowser) {
    Write-Host "Opening $baseUrl"
    Start-Process -FilePath $baseUrl
}
exit 0
