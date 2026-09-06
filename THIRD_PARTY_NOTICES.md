# 第三方组件与许可说明

纸上寻踪自身源码采用 GPL-3.0-only。以下第三方项目及其衍生资源仍适用各自许可证，不因与本项目一同分发而改变。

## Electron 与 Chromium

- Electron：MIT License，<https://github.com/electron/electron>
- Electron 发行包随附 `LICENSE.electron.txt`。
- Chromium 及其第三方组件的许可证汇总随发行包以 `LICENSES.chromium.html` 提供。

## Umi-OCR 与 OCR 组件

- Umi-OCR：MIT License，<https://github.com/hiroi-sora/Umi-OCR>
- Umi-OCR 可调用 RapidOCR/PaddleOCR 等组件；其二进制、模型和依赖适用对应上游项目附带的许可证与声明。

## Argos Translate 与翻译模型

- Argos Translate：MIT / CC0，<https://github.com/argosopentech/argos-translate>
- 英中模型包的上游说明标注其衍生 OPUS 模型为 CC BY 4.0。
- 英日模型包的上游说明列出 OPUS、Wiktionary/Wiktextract 与 Stanford Stanza 等数据和模型来源；重新分发时应保留包内 README，并分别核对相关数据与模型条款。

## npm 与 Python 依赖

Node.js、Electron 构建依赖以及离线翻译运行环境中的 Python 包适用各自许可证。完整发行包保留这些组件随附的 `LICENSE`、`NOTICE`、`ThirdPartyNotices` 和包元数据文件。

本文件是归属与分发说明，不构成法律意见。发现遗漏或错误时，欢迎通过 Issue 提交具体组件名称和上游许可链接。
