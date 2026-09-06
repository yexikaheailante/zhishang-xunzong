; 第九十八版安装路径页兼容处理：
; 用户机器上的 Windows Shell 文件夹选择器会在 shcore.dll 中崩溃。
; 保留可编辑的安装路径输入框，但隐藏并禁用会调用该选择器的“浏览”按钮。

!ifndef BUILD_UNINSTALLER
  !ifndef ONE_CLICK
    !ifdef allowToChangeInstallationDirectory
      !define MUI_DIRECTORYPAGE_TEXT_TOP "请直接输入或粘贴完整安装路径，然后点击“下一步”。为避免系统文件夹窗口异常，本页不使用浏览按钮。"
      !define MUI_DIRECTORYPAGE_TEXT_DESTINATION "安装路径"
      !define MUI_PAGE_CUSTOMFUNCTION_SHOW zhishangDirectoryPageShow

      Function zhishangDirectoryPageShow
        FindWindow $0 "#32770" "" $HWNDPARENT
        GetDlgItem $1 $0 1001
        EnableWindow $1 0
        ShowWindow $1 0
      FunctionEnd
    !endif
  !endif
!endif
