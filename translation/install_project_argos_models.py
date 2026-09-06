import json
import os
import sys
from pathlib import Path


project_root = Path(__file__).resolve().parent.parent
os.chdir(project_root)

runtime = Path("translation") / "argos-runtime"
packages_dir = Path("translation") / "argos-packages"
cache_dir = Path("translation") / "argos-cache"

sys.path.insert(0, str(runtime))
os.environ["ARGOS_PACKAGES_DIR"] = str(packages_dir)
os.environ["XDG_CACHE_HOME"] = str(cache_dir / "cache")
os.environ["XDG_DATA_HOME"] = str(cache_dir / "data")
os.environ["STANZA_RESOURCES_DIR"] = str(cache_dir / "stanza")
os.environ["ARGOS_DEVICE_TYPE"] = "cpu"

packages_dir.mkdir(parents=True, exist_ok=True)
cache_dir.mkdir(parents=True, exist_ok=True)

import argostranslate.package


def pair_key(package):
    return (str(package.from_code), str(package.to_code))


argostranslate.package.update_package_index()
available = argostranslate.package.get_available_packages()
installed = {
    pair_key(package)
    for package in argostranslate.package.get_installed_packages()
}

targets = [("en", "zh")]
if any(pair_key(package) == ("ja", "zh") for package in available):
    targets.append(("ja", "zh"))
else:
    targets.append(("ja", "en"))

added = []
for source, target in targets:
    if (source, target) in installed:
        continue
    package = next(
        (
            candidate
            for candidate in available
            if pair_key(candidate) == (source, target)
        ),
        None,
    )
    if package is None:
        raise RuntimeError(f"官方模型目录没有 {source} -> {target}")
    download_path = package.download()
    argostranslate.package.install_from_path(download_path)
    added.append(f"{source}->{target}")

result = {
    "ok": True,
    "added": added,
    "installed": [
        f"{package.from_code}->{package.to_code}"
        for package in argostranslate.package.get_installed_packages()
    ],
    "packagesDirectory": str(packages_dir),
}
print(json.dumps(result, ensure_ascii=False))
