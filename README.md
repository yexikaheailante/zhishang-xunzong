# 纸上寻踪

纸上寻踪是一款面向中国近代史学习与研究的 Windows 桌面工具，围绕“导入—阅读—框选—OCR—翻译—批注—记录—导出”的史料工作流程设计。

当前公开版本：**1.0.0**

## 主要功能

- 导入 PDF 和常见图片，也可直接拖入文件、文件夹或混合项目。
- 在工作台中阅读、整理史料，并使用专注阅读与悬浮阅读。
- 框选图像区域后调用本地 Umi-OCR/RapidOCR，或选择看典、百度、千问、Claude、自定义图像 API；整页识别同样保留。
- 保留 OCR 原文、人工校订文本和来源关系，方便回到原始影像核验。
- 使用本地 Argos Translate，或由用户主动配置第三方翻译服务。
- 建立框选批注、研究笔记、时间线和历史记录，并导出研究成果。
- 管理常用研究网站和史料项目。

## 下载与使用

请从仓库右侧的 [Releases](https://github.com/yexikaheailante/zhishang-xunzong/releases) 下载 Windows x64 免安装 ZIP 包。

1. 完整解压 ZIP，不要只取出其中的 EXE。
2. 双击 `纸上寻踪.exe`。
3. 第一次使用时选择现有资料库，或选择空文件夹并初始化。
4. Windows 若显示来源未知提示，请先核对下载地址和 Release 页面提供的 SHA-256。

支持 Windows 10/11 x64。当前程序尚未购买代码签名证书。

## 配置图像识别 API

在现有“引擎设置 → 识别引擎”中选择千问、Claude 或自定义 API，填写完整接口地址、API Key 和支持图片输入的模型 ID，选择繁体或简体后保存。勾选允许上传，再使用原有“框选 / OCR 此框 / 整页 OCR”操作。

- 千问预设为百炼 OpenAI 兼容接口和 `qwen3-vl-plus`，可按账户所在地域修改地址和模型。
- Claude 使用 Messages 接口，预设模型 `claude-sonnet-4-5`；如账户不支持，请填写实际可用的图像模型 ID。
- 自定义 API 支持 OpenAI Chat Completions 和 Claude Messages 两种协议，并非任意服务的专有接口都兼容。地址必须包含完整路径，不仅是域名或 `/v1`。
- 只向所选接口发送当前识别图片，不自动切换服务；单张图片上限 4 MB。响应截断会报错，请缩小框选重试。
- “检查配置”不调用付费识别，也不验证密钥有效性。保存成功不等于鉴权成功；百度提示 `invalid_client` 时，请检查同一 OCR 应用的 API Key / Secret Key。
- API 通常由服务商另行计费，聊天会员订阅不等于 API 额度。请勿上传未获许可的材料。

## 隐私与资料安全

纸上寻踪以本地处理为主，不包含隐藏遥测、暗门或材料收集功能。程序不会把文件名、路径、史料影像、OCR 文本、批注或研究笔记发送给本项目维护者。

只有当用户自行配置并主动调用云端 OCR、翻译或 AI 服务时，相应内容才会发送给用户选择的第三方服务商。详情见 [PRIVACY.md](PRIVACY.md)。

## 从源码运行

基础要求：

- Node.js 20 或更高版本
- Windows 10/11 x64
- npm

安装依赖并运行测试：

```powershell
npm install
npm test
```

仅启动 Electron 桌面端：

```powershell
npm run desktop
```

完整 OCR、PDF 和离线翻译能力依赖体积较大的第三方运行资源，因此这些资源不提交到 Git：

- 将 Umi-OCR 官方发行目录放入 `Umi-OCR/`。
- 将 Argos Translate 运行环境和模型分别放入 `translation/argos-runtime/`、`translation/argos-packages/`。
- PDFium WebAssembly 资源已保留在 `public/vendor/`，并随附上游许可证。

官方 Release 已包含运行所需资源。重新分发第三方组件前，请核对各组件及模型的许可证与署名要求。项目自身源码采用 GPL-3.0-only；第三方组件不因放入发行包而改用 GPL。

## 源码结构

- `desktop/`：Electron 主进程、预加载脚本和悬浮阅读窗口。
- `public/`：工作台界面、样式、客户端逻辑和界面资源。
- `server.js`：本地服务、资料库、OCR、翻译和导出逻辑。
- `vision-ocr.js`：千问、Claude 和自定义图像 API 的协议适配。
- `translation/`：Argos Translate 接入与模型安装脚本。
- `tests/`：数据模型、导入流程、界面约束和发布布局测试。
- `build/`：Windows 图标和构建配置。

## 研究使用提醒

OCR、翻译和 AI 输出都可能存在误识、漏字或推断。凡用于论文直接引用的文字，均应回到原始影像逐字核验。

## 参与贡献

欢迎通过 Issues 报告错误或提出建议。提交代码前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

项目自身源码采用 [GNU General Public License v3.0](LICENSE)。第三方组件和模型适用各自许可证，详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
