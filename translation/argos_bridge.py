import json
import os
import sys
from pathlib import Path


def emit(value):
    sys.stdout.write(json.dumps(value, ensure_ascii=False))
    sys.stdout.flush()


def fail(message):
    emit({"ok": False, "error": str(message)})
    raise SystemExit(1)


runtime_path = os.environ.get("HISTORICAL_ARGOS_RUNTIME", "").strip()
if runtime_path:
    sys.path.insert(0, runtime_path)

project_root = Path(__file__).resolve().parent.parent
os.chdir(project_root)

packages_path = os.environ.get("ARGOS_PACKAGES_DIR", "").strip()
if packages_path:
    candidate = Path(packages_path)
    if candidate.is_absolute():
        try:
            os.environ["ARGOS_PACKAGES_DIR"] = str(
                candidate.resolve().relative_to(project_root)
            )
        except ValueError:
            pass

os.environ.setdefault("ARGOS_DEVICE_TYPE", "cpu")

try:
    import argostranslate.package
    import argostranslate.translate
except Exception as exc:
    fail(f"Argos Translate 本地组件尚未安装：{exc}")


def payload_from_stdin():
    try:
        raw = sys.stdin.read()
        return json.loads(raw) if raw else {}
    except Exception as exc:
        fail(f"Argos 请求格式不正确：{exc}")


def installed_pairs():
    pairs = []
    try:
        for package in argostranslate.package.get_installed_packages():
            pairs.append(
                {
                    "from": str(package.from_code),
                    "to": str(package.to_code),
                    "name": str(package),
                }
            )
    except Exception:
        for source in argostranslate.translate.get_installed_languages():
            for translation in getattr(source, "translations", []):
                pairs.append(
                    {
                        "from": str(source.code),
                        "to": str(translation.to_lang.code),
                        "name": str(translation),
                    }
                )
    unique = {}
    for pair in pairs:
        unique[f"{pair['from']}->{pair['to']}"] = pair
    return list(unique.values())


def status():
    emit(
        {
            "ok": True,
            "installed": True,
            "version": getattr(argostranslate, "__version__", ""),
            "pairs": installed_pairs(),
        }
    )


def download_model(payload):
    source = str(payload.get("sourceLanguage", "")).strip()
    target = str(payload.get("targetLanguage", "")).strip()
    if not source or not target:
        fail("请选择 Argos 源语言和目标语言")
    argostranslate.package.update_package_index()
    packages = argostranslate.package.get_available_packages()
    match = next(
        (
            package
            for package in packages
            if package.from_code == source and package.to_code == target
        ),
        None,
    )
    if match is None:
        fail(
            f"Argos 官方模型目录目前没有 {source} → {target} 直译包；"
            "可另行安装经英语中转所需的两个语言包"
        )
    download_path = match.download()
    argostranslate.package.install_from_path(download_path)
    emit(
        {
            "ok": True,
            "message": f"Argos {source} → {target} 本地模型已安装",
            "pairs": installed_pairs(),
        }
    )


def translate_text(payload):
    source = str(payload.get("sourceLanguage", "")).strip()
    target = str(payload.get("targetLanguage", "")).strip()
    text = str(payload.get("text", "")).strip()
    if not source or not target:
        fail("请选择 Argos 源语言和目标语言")
    if not text:
        fail("请先投入需要翻译的文本")
    translated = argostranslate.translate.translate(text, source, target)
    if not str(translated).strip():
        fail("Argos Translate 没有返回可用译文")
    emit({"ok": True, "text": str(translated).strip()})


def main():
    payload = payload_from_stdin()
    action = str(payload.get("action", "status"))
    try:
        if action == "status":
            status()
        elif action == "download-model":
            download_model(payload)
        elif action == "translate":
            translate_text(payload)
        else:
            fail("没有这个 Argos 本地操作")
    except SystemExit:
        raise
    except Exception as exc:
        fail(exc)


if __name__ == "__main__":
    main()
