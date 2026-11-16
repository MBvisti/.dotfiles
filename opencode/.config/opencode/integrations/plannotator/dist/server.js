// server.ts
import { existsSync as existsSync9, readFileSync as readFileSync7 } from "node:fs";
import path6 from "node:path";
import { fileURLToPath as fileURLToPath2, pathToFileURL } from "node:url";

// ../../packages/shared/child-env.ts
var SANDBOX_NO_KEYCHAIN_ENV = Object.freeze({
  GIT_CONFIG_NOSYSTEM: "1",
  GCM_INTERACTIVE: "never",
  GH_PROMPT_DISABLED: "1",
  GH_NO_UPDATE_NOTIFIER: "1"
});
function isAskAiChild(env = process.env) {
  return env.PLANNOTATOR_ASK_AI_CHILD === "1";
}

// ../../packages/shared/config.ts
import { isAbsolute as isAbsolute2, join as join2, resolve as resolve2 } from "path";

// ../../packages/shared/data-dir.ts
import { existsSync } from "fs";
import { homedir } from "os";
import { isAbsolute, join, resolve } from "path";
function getPlannotatorDataDir() {
  const home = homedir();
  const envDir = process.env.PLANNOTATOR_DATA_DIR?.trim();
  if (envDir) {
    if (envDir === "~")
      return home;
    if (envDir.startsWith("~/") || envDir.startsWith("~\\")) {
      return join(home, envDir.slice(2));
    }
    return resolve(envDir);
  }
  return getDefaultPlannotatorDataDir(home);
}
var DATA_DIR_MARKERS = [
  "history",
  "sessions",
  "drafts",
  "inbox",
  "claude-code-mod",
  "install-flags.json"
];
function holdsPlannotatorData(dir) {
  return DATA_DIR_MARKERS.some((entry) => existsSync(join(dir, entry)));
}
function xdgPlannotatorDataDir() {
  const xdgDataHome = process.env.XDG_DATA_HOME?.trim();
  return xdgDataHome && isAbsolute(xdgDataHome) ? join(xdgDataHome, "plannotator") : null;
}
function getDefaultPlannotatorDataDir(home = homedir()) {
  const legacyDir = join(home, ".plannotator");
  const xdgDir = xdgPlannotatorDataDir();
  if (existsSync(legacyDir)) {
    if (xdgDir && existsSync(xdgDir) && holdsPlannotatorData(xdgDir) && !holdsPlannotatorData(legacyDir)) {
      return xdgDir;
    }
    return legacyDir;
  }
  return xdgDir ?? legacyDir;
}

// ../../packages/shared/config.ts
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync as existsSync2,
  openSync,
  writeSync,
  closeSync,
  statSync,
  unlinkSync,
  renameSync,
  realpathSync
} from "fs";

// ../../packages/core/favicon.ts
var FAVICON_ICO_BASE64 = /* @__PURE__ */ [
  "AAABAAMAEBAAAAEAIABoBAAANgAAACAgAAABACAAqBAAAJ4EAAAwMAAAAQAgAKglAABGFQAAKAAAABAAAAAgAAAAAQAgAAAAAAAA",
  "BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/",
  "BAUG/wAAAAAFBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BwgJ",
  "/wcICf8HCAn/BwgJ/wcICf8HCAn/BwgJ/wcICf8HCAn/BwgJ/wcICf8HCAn/BwgJ/wcICf8HCAn/BwgJ/wgKC/8ICgv/CAoL/wgK",
  "C/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP+K",
  "Ad3/igHd/4oB3f+KAd3/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/",
  "Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/wwPEP8MDxD/qs3i/6rN4v+qzeL/qs3i/6rN4v8MDxD/DA8Q/6rN4v+qzeL/qs3i",
  "/6rN4v+qzeL/DA8Q/wwPEP8NEBH/utnr/w8SE/8PEhP/DxIT/w8SE/+62ev/DRAR/w0QEf+62ev/DxIT/w8SE/8PEhP/DxIT/7rZ",
  "6/8NEBH/yeT1/8nk9f8SFxj/JGf9/yRn/f8kZ/3/EhcY/8nk9f/J5PX/EhcY/yRn/f8kZ/3/JGf9/xIXGP/J5PX/yeT1/9ju/P/Y",
  "7vz/Fhsc/yRn/f8kZ/3/JGf9/xYbHP8WGxz/Fhsc/xYbHP8kZ/3/JGf9/yRn/f8WGxz/2O78/9ju/P8TFxn/4/T+/xwgIv8cICL/",
  "HCAi/xwgIv8cICL/HCAi/xwgIv8cICL/HCAi/xwgIv8cICL/HCAi/+P0/v8TFxn/Fhsc/xYbHP/u+f//7vn//+75///u+f//7vn/",
  "/+75///u+f//7vn//+75///u+f//7vn//+75//8WGxz/Fhsc/xgeIP8YHiD/GB4g/xgeIP8YHiD/GB4g/xgeIP8YHiD/GB4g/xge",
  "IP8YHiD/GB4g/xgeIP8YHiD/GB4g/xgeIP8bISP/GyEj/xshI/8bISP/GyEj/xshI/8bISP/GyEj/xshI/8bISP/GyEj/xshI/8b",
  "ISP/GyEj/xshI/8bISP/SVNX/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/",
  "SVNX/wAAAABLVVn/S1VZ/0tVWf9LVVn/S1VZ/0tVWf9LVVn/S1VZ/0tVWf9LVVn/S1VZ/0tVWf9LVVn/S1VZ/wAAAACAAQAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAAKAAAACAAAABAAAAAAQAgAAAA",
  "AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8E",
  "BQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8AAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAFBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH",
  "/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/AAAAAAAAAAAAAAAABQcI/wUHCP8FBwj/BQcI/wUH",
  "CP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8F",
  "Bwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/AAAAAAAAAAAGBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/",
  "BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI",
  "/wYHCP8AAAAABggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYI",
  "Cf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8HCQr/BwkK/wcJCv8H",
  "CQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/",
  "BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL",
  "/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgK",
  "C/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8I",
  "Cgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8JCwz/",
  "CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM",
  "/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN/woM",
  "Df8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf+KAd3/igHd/4oB3f+KAd3/igHd/4oB3f8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf8K",
  "DA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDA3/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/",
  "Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O",
  "/woNDv8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsO",
  "D/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8L",
  "Dg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//",
  "Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//DA8Q/wwPEP8MDxD/DA8Q/wwPEP+qzeL/qs3i/6rN4v+qzeL/qs3i",
  "/6rN4v+qzeL/qs3i/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/6rN4v+qzeL/qs3i/6rN4v+qzeL/qs3i/6rN4v+qzeL/DA8Q/wwP",
  "EP8MDxD/DA8Q/wwPEP8NEBH/DRAR/w0QEf8NEBH/DRAR/7PT5/8PEhP/DxIT/w8SE/8PEhP/DxIT/w8SE/+z0+f/DRAR/w0QEf8N",
  "EBH/DRAR/w0QEf8NEBH/s9Pn/w8SE/8PEhP/DxIT/w8SE/8PEhP/DxIT/7PT5/8NEBH/DRAR/w0QEf8NEBH/DRAR/w0REv8NERL/",
  "DRES/7va7f+72u3/EBUW/xAVFv8QFRb/EBUW/xAVFv8QFRb/EBUW/xAVFv+72u3/DRES/w0REv8NERL/DRES/7va7f8QFRb/EBUW",
  "/xAVFv8QFRb/EBUW/xAVFv8QFRb/EBUW/7va7f+72u3/DRES/w0REv8NERL/DhES/w4REv8OERL/xODy/8Tg8v8TFhj/ExYY/xMW",
  "GP8cXu7/HF7u/xxe7v8cXu7/ExYY/8Tg8v8OERL/DhES/w4REv8OERL/xODy/xMWGP8cXu7/HF7u/xxe7v8cXu7/ExYY/xMWGP8T",
  "Fhj/xODy/8Tg8v8OERL/DhES/w4REv8OEhP/DhIT/w4SE//N5/f/zef3/xUZGv8VGRr/FRka/yFk+P8hZPj/IWT4/yFk+P8VGRr/",
  "FRka/83n9/8OEhP/DhIT/83n9/8VGRr/FRka/yFk+P8hZPj/IWT4/yFk+P8VGRr/FRka/xUZGv/N5/f/zef3/w4SE/8OEhP/DhIT",
  "/w8TFP8PExT/DxMU/9Xt/P/V7fz/Fxwd/xccHf8XHB3/LnH+/y5x/v8ucf7/LnH+/xccHf8XHB3/1e38/9Xt/P/V7fz/1e38/xcc",
  "Hf8XHB3/LnH+/y5x/v8ucf7/LnH+/xccHf8XHB3/Fxwd/9Xt/P/V7fz/DxMU/w8TFP8PExT/EBUW/xAVFv8QFRb/2/D9/9vw/f8a",
  "ICH/GiAh/xogIf9ypf//cqX//3Kl//9ypf//GiAh/xogIf8aICH/GiAh/xogIf8aICH/GiAh/xogIf9ypf//cqX//3Kl//9ypf//",
  "GiAh/xogIf8aICH/2/D9/9vw/f8QFRb/EBUW/xAVFv8SFhf/EhYX/xIWF//i8/7/4vP+/x4iJP8eIiT/HiIk/x4iJP8eIiT/HiIk",
  "/x4iJP8eIiT/HiIk/x4iJP8eIiT/HiIk/x4iJP8eIiT/HiIk/x4iJP8eIiT/HiIk/x4iJP8eIiT/HiIk/x4iJP/i8/7/4vP+/xIW",
  "F/8SFhf/EhYX/xMYGf8TGBn/ExgZ/xMYGf8TGBn/6Pb+/yAmJ/8gJif/ICYn/yAmJ/8gJif/ICYn/yAmJ/8gJif/ICYn/yAmJ/8g",
  "Jif/ICYn/yAmJ/8gJif/ICYn/yAmJ/8gJif/ICYn/yAmJ/8gJif/6Pb+/xMYGf8TGBn/ExgZ/xMYGf8TGBn/FRkb/xUZG/8VGRv/",
  "FRkb/xUZG//u+f//7vn//+75///u+f//7vn//+75///u+f//7vn//+75///u+f//7vn//+75///u+f//7vn//+75///u+f//7vn/",
  "/+75///u+f//7vn//+75///u+f//FRkb/xUZG/8VGRv/FRkb/xUZG/8WGxz/Fhsc/xYbHP8WGxz/Fhsc/xYbHP8WGxz/Fhsc/xYb",
  "HP8WGxz/Fhsc/xYbHP8WGxz/Fhsc/xYbHP8WGxz/Fhsc/xYbHP8WGxz/Fhsc/xYbHP8WGxz/Fhsc/xYbHP8WGxz/Fhsc/xYbHP8W",
  "Gxz/Fhsc/xYbHP8WGxz/Fhsc/xcdHv8XHR7/Fx0e/xcdHv8XHR7/Fx0e/xcdHv8XHR7/Fx0e/xcdHv8XHR7/Fx0e/xcdHv8XHR7/",
  "Fx0e/xcdHv8XHR7/Fx0e/xcdHv8XHR7/Fx0e/xcdHv8XHR7/Fx0e/xcdHv8XHR7/Fx0e/xcdHv8XHR7/Fx0e/xcdHv8XHR7/GR4g",
  "/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xke",
  "IP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8aICL/GiAi/xogIv8aICL/GiAi/xogIv8a",
  "ICL/GiAi/xogIv8aICL/GiAi/xogIv8aICL/GiAi/xogIv8aICL/GiAi/xogIv8aICL/GiAi/xogIv8aICL/GiAi/xogIv8aICL/",
  "GiAi/xogIv8aICL/GiAi/xogIv8aICL/GiAi/1JdYf8bIiP/GyIj/xsiI/8bIiP/GyIj/xsiI/8bIiP/GyIj/xsiI/8bIiP/GyIj",
  "/xsiI/8bIiP/GyIj/xsiI/8bIiP/GyIj/xsiI/8bIiP/GyIj/xsiI/8bIiP/GyIj/xsiI/8bIiP/GyIj/xsiI/8bIiP/GyIj/xsi",
  "I/9SXWH/AAAAAB0jJf8dIyX/HSMl/x0jJf8dIyX/HSMl/x0jJf8dIyX/HSMl/x0jJf8dIyX/HSMl/x0jJf8dIyX/HSMl/x0jJf8d",
  "IyX/HSMl/x0jJf8dIyX/HSMl/x0jJf8dIyX/HSMl/x0jJf8dIyX/HSMl/x0jJf8dIyX/HSMl/wAAAAAAAAAAVF9j/x4lJ/8eJSf/",
  "HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn",
  "/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/9UX2P/AAAAAAAAAAAAAAAAVmBk/1ZgZP8gJij/ICYo/yAmKP8gJij/ICYo/yAm",
  "KP8gJij/ICYo/yAmKP8gJij/ICYo/yAmKP8gJij/ICYo/yAmKP8gJij/ICYo/yAmKP8gJij/ICYo/yAmKP8gJij/ICYo/yAmKP9W",
  "YGT/VmBk/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFZhZv9WYWb/VmFm/1ZhZv9WYWb/VmFm/1ZhZv9WYWb/VmFm/1ZhZv9WYWb/",
  "VmFm/1ZhZv9WYWb/VmFm/1ZhZv9WYWb/VmFm/1ZhZv9WYWb/VmFm/1ZhZv9WYWb/VmFm/wAAAAAAAAAAAAAAAAAAAADwAAAPwAAA",
  "A4AAAAGAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAYAAAAHAAAAD8AAADygAAAAwAAAAYAAAAAEAIAAAAAAAACQAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/",
  "BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG",
  "/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAYH/wQG",
  "B/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8E",
  "Bgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/BAYH/wQGB/8EBgf/",
  "BAYH/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH",
  "/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUG",
  "B/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8FBgf/BQYH/wUGB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAUHCP8F",
  "Bwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/",
  "BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI/wUHCP8FBwj/BQcI",
  "/wUHCP8FBwj/BQcI/wUHCP8FBwj/AAAAAAAAAAAAAAAABgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYH",
  "CP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8G",
  "Bwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wYHCP8GBwj/BgcI/wAAAAAAAAAA",
  "BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ",
  "/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYI",
  "Cf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wAAAAAGCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8G",
  "CAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/",
  "BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ/wYICf8GCAn/BggJ",
  "/wYICf8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJ",
  "Cv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8H",
  "CQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/",
  "BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK",
  "/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJ",
  "Cv8HCQr/BwkK/wcJCv8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8I",
  "Cgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/",
  "CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL",
  "/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgK",
  "C/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8I",
  "Cgv/CAoL/wgKC/8ICgv/CAoL/wgKC/8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/",
  "CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM",
  "/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8ICwz/CAsM/wgLDP8JCwz/CQsM/wkL",
  "DP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8J",
  "Cwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/",
  "CQsM/wkLDP8JCwz/CQsM/wkLDP8JCwz/CQsM/wkLDP8JDA3/CQwN/wkMDf8JDA3/CQwN/wkMDf8JDA3/CQwN/wkMDf8JDA3/CQwN",
  "/wkMDf8JDA3/CQwN/wkMDf8JDA3/CQwN/wkMDf8JDA3/gAHI/4AByP+AAcj/gAHI/4AByP+AAcj/gAHI/4AByP+AAcj/gAHI/wkM",
  "Df8JDA3/CQwN/wkMDf8JDA3/CQwN/wkMDf8JDA3/CQwN/wkMDf8JDA3/CQwN/wkMDf8JDA3/CQwN/wkMDf8JDA3/CQwN/wkMDf8K",
  "DA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDA3/",
  "niTw/54k8P+eJPD/niTw/54k8P+eJPD/niTw/54k8P+eJPD/niTw/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN",
  "/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDA3/CgwN/woMDf8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woN",
  "Dv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8K",
  "DQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/",
  "Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O",
  "/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woN",
  "Dv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8KDQ7/Cg0O/woNDv8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8L",
  "Dg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//",
  "Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P",
  "/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsO",
  "D/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8L",
  "Dg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8LDg//Cw4P/wsOD/8MDxD/DA8Q/wwPEP8MDxD/",
  "DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q",
  "/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwP",
  "EP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/haa5/4Wmuf+Fprn/haa5/4Wmuf+F",
  "prn/haa5/4Wmuf+Fprn/haa5/4Wmuf+Fprn/haa5/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MDxD/haa5/4Wmuf+Fprn/",
  "haa5/4Wmuf+Fprn/haa5/4Wmuf+Fprn/haa5/4Wmuf+Fprn/haa5/wwPEP8MDxD/DA8Q/wwPEP8MDxD/DA8Q/wwPEP8MEBH/DBAR",
  "/wwQEf8MEBH/DBAR/wwQEf+Kqbv/sNHl/9vq8//b6vP/2+rz/9vq8//b6vP/2+rz/9vq8//b6vP/2+rz/9vq8//b6vP/sNHl/wwQ",
  "Ef8MEBH/DBAR/wwQEf8MEBH/DBAR/wwQEf8MEBH/sNHl/9vq8//b6vP/2+rz/9vq8//b6vP/2+rz/9vq8//b6vP/2+rz/9vq8//b",
  "6vP/sNHl/4qpu/8MEBH/DBAR/wwQEf8MEBH/DBAR/wwQEf8NEBH/DRAR/w0QEf8NEBH/DRAR/w0QEf+11en/tdXp/xATFP8QExT/",
  "EBMU/xATFP8QExT/EBMU/xATFP8QExT/EBMU/xATFP8QExT/tdXp/42rvv8NEBH/DRAR/w0QEf8NEBH/DRAR/w0QEf+Nq77/tdXp",
  "/xATFP8QExT/EBMU/xATFP8QExT/EBMU/xATFP8QExT/EBMU/xATFP8QExT/tdXp/7XV6f8NEBH/DRAR/w0QEf8NEBH/DRAR/w0Q",
  "Ef8NERL/DRES/w0REv8NERL/ka7A/5GuwP+72ez/4O72/xEVFv8RFRb/ERUW/xEVFv8RFRb/ERUW/xEVFv8RFRb/ERUW/xEVFv8R",
  "FRb/4O72/7vZ7P8NERL/DRES/w0REv8NERL/DRES/w0REv+72ez/4O72/xEVFv8RFRb/ERUW/xEVFv8RFRb/ERUW/xEVFv8RFRb/",
  "ERUW/xEVFv8RFRb/4O72/7vZ7P+RrsD/ka7A/w0REv8NERL/DRES/w0REv8OERL/DhES/w4REv8OERL/wN7w/8De8P/A3vD/ExYX",
  "/xMWF/8TFhf/ExYX/xMWF/8TFhf/ExYX/xMWF/8TFhf/ExYX/xMWF/8TFhf/ExYX/8De8P+VssP/DhES/w4REv8OERL/DhES/5Wy",
  "w//A3vD/ExYX/xMWF/8TFhf/ExYX/xMWF/8TFhf/ExYX/xMWF/8TFhf/ExYX/xMWF/8TFhf/ExYX/8De8P/A3vD/wN7w/w4REv8O",
  "ERL/DhES/w4REv8OEhP/DhIT/w4SE/8OEhP/xuLz/8bi8//G4vP/FBka/xQZGv8UGRr/FBka/xxe7v8cXu7/HF7u/xxe7v8cXu7/",
  "HF7u/xxe7v8UGRr/FBka/+Xy+v/G4vP/DhIT/w4SE/8OEhP/DhIT/8bi8//l8vr/FBka/xQZGv8cXu7/HF7u/xxe7v8cXu7/HF7u",
  "/xxe7v8cXu7/FBka/xQZGv8UGRr/FBka/8bi8//G4vP/xuLz/w4SE/8OEhP/DhIT/w4SE/8OEhP/DhIT/w4SE/8OEhP/zOb2/8zm",
  "9v/M5vb/FRob/xUaG/8VGhv/FRob/x9i9P8fYvT/H2L0/x9i9P8fYvT/H2L0/x9i9P8VGhv/FRob/xUaG//M5vb/nbfH/w4SE/8O",
  "EhP/nbfH/8zm9v8VGhv/FRob/xUaG/8fYvT/H2L0/x9i9P8fYvT/H2L0/x9i9P8fYvT/FRob/xUaG/8VGhv/FRob/8zm9v/M5vb/",
  "zOb2/w4SE/8OEhP/DhIT/w4SE/8PExT/DxMU/w8TFP8PExT/0er6/9Hq+v/R6vr/GBwd/xgcHf8YHB3/GBwd/yJl+v8iZfr/ImX6",
  "/yJl+v8iZfr/ImX6/yJl+v8YHB3/GBwd/xgcHf/q9v3/0er6/6G6yv+husr/0er6/+r2/f8YHB3/GBwd/xgcHf8iZfr/ImX6/yJl",
  "+v8iZfr/ImX6/yJl+v8iZfr/GBwd/xgcHf8YHB3/GBwd/9Hq+v/R6vr/0er6/w8TFP8PExT/DxMU/w8TFP8QFBX/EBQV/xAUFf8Q",
  "FBX/1u78/9bu/P/W7vz/Gh4g/xoeIP8aHiD/Gh4g/ypt/f8qbf3/Km39/ypt/f8qbf3/Km39/ypt/f8aHiD/Gh4g/xoeIP8aHiD/",
  "7ff+/+33/v/t9/7/7ff+/xoeIP8aHiD/Gh4g/xoeIP8qbf3/Km39/ypt/f8qbf3/Km39/ypt/f8qbf3/Gh4g/xoeIP8aHiD/Gh4g",
  "/9bu/P/W7vz/1u78/xAUFf8QFBX/EBQV/xAUFf8RFRb/ERUW/xEVFv8RFRb/2u/9/9rv/f/a7/3/HCEi/xwhIv8cISL/HCEi/zZ4",
  "/v82eP7/Nnj+/zZ4/v82eP7/Nnj+/zZ4/v8cISL/HCEi/xwhIv8cISL/HCEi/xwhIv8cISL/HCEi/xwhIv8cISL/HCEi/xwhIv82",
  "eP7/Nnj+/zZ4/v82eP7/Nnj+/zZ4/v82eP7/HCEi/xwhIv8cISL/HCEi/9rv/f/a7/3/2u/9/xEVFv8RFRb/ERUW/xEVFv8RFhf/",
  "ERYX/xEWF/8RFhf/3vH9/97x/f/e8f3/HSMk/x0jJP8dIyT/HSMk/4ez//+Hs///h7P//4ez//+Hs///h7P//4ez//8dIyT/HSMk",
  "/x0jJP8dIyT/HSMk/x0jJP8dIyT/HSMk/x0jJP8dIyT/HSMk/x0jJP+Hs///h7P//4ez//+Hs///h7P//4ez//+Hs///HSMk/x0j",
  "JP8dIyT/HSMk/97x/f/e8f3/3vH9/xEWF/8RFhf/ERYX/xEWF/8SFxj/EhcY/xIXGP8SFxj/8vr///L6///i8/7/rcDN/x8lJ/8f",
  "JSf/HyUn/x8lJ/8fJSf/HyUn/x8lJ/8fJSf/HyUn/x8lJ/8fJSf/HyUn/x8lJ/8fJSf/HyUn/x8lJ/8fJSf/HyUn/x8lJ/8fJSf/",
  "HyUn/x8lJ/8fJSf/HyUn/x8lJ/8fJSf/HyUn/x8lJ/8fJSf/HyUn/x8lJ/8fJSf/rcDN/+Lz/v/y+v//8vr//xIXGP8SFxj/EhcY",
  "/xIXGP8TGBn/ExgZ/xMYGf8TGBn/ExgZ/xMYGf/m9f7/5vX+/yInKf8iJyn/Iicp/yInKf8iJyn/Iicp/yInKf8iJyn/Iicp/yIn",
  "Kf8iJyn/Iicp/yInKf8iJyn/Iicp/yInKf8iJyn/Iicp/yInKf8iJyn/Iicp/yInKf8iJyn/Iicp/yInKf8iJyn/Iicp/yInKf8i",
  "Jyn/Iicp/yInKf8iJyn/5vX+/+b1/v8TGBn/ExgZ/xMYGf8TGBn/ExgZ/xMYGf8UGRr/FBka/xQZGv8UGRr/FBka/xQZGv/2+///",
  "6vf//7LDzv+yw87/ssPO/7LDzv+yw87/ssPO/7LDzv+yw87/ssPO/7LDzv+yw87/ssPO/7LDzv+yw87/ssPO/7LDzv+yw87/ssPO",
  "/7LDzv+yw87/ssPO/7LDzv+yw87/ssPO/7LDzv+yw87/ssPO/7LDzv+yw87/ssPO/7LDzv+yw87/6vf///b7//8UGRr/FBka/xQZ",
  "Gv8UGRr/FBka/xQZGv8VGhz/FRoc/xUaHP8VGhz/FRoc/xUaHP8VGhz/9/z///f8///3/P//9/z///f8///3/P//9/z///f8///3",
  "/P//9/z///f8///3/P//9/z///f8///3/P//9/z///f8///3/P//9/z///f8///3/P//9/z///f8///3/P//9/z///f8///3/P//",
  "9/z///f8///3/P//9/z///f8///3/P//9/z//xUaHP8VGhz/FRoc/xUaHP8VGhz/FRoc/xUaHP8WGx3/Fhsd/xYbHf8WGx3/Fhsd",
  "/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYb",
  "Hf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8W",
  "Gx3/Fhsd/xYbHf8WGx3/Fhsd/xYbHf8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/",
  "Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe",
  "/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8XHB7/Fxwe/xccHv8YHR//GB0f/xgd",
  "H/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8Y",
  "HR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//",
  "GB0f/xgdH/8YHR//GB0f/xgdH/8YHR//GB0f/xgdH/8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g",
  "/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xke",
  "IP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8ZHiD/GR4g/xkeIP8a",
  "HyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/",
  "Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h",
  "/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8aHyH/Gh8h/xofIf8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xsh",
  "Iv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8b",
  "ISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/GyEi/xshIv8bISL/",
  "GyEi/xshIv9bZWn/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj",
  "/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwi",
  "I/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/xwiI/8cIiP/HCIj/1tlaf8AAAAAHCMk/xwjJP8cIyT/HCMk/xwjJP8c",
  "IyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/",
  "HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk/xwjJP8cIyT/HCMk",
  "/xwjJP8cIyT/HCMk/wAAAAAAAAAAW2dr/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0k",
  "Jv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8d",
  "JCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/HSQm/x0kJv8dJCb/W2dr/wAAAAAAAAAAAAAAAFxnbP8eJSf/",
  "HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn",
  "/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4lJ/8eJSf/HiUn/x4l",
  "J/8eJSf/HiUn/x4lJ/9cZ2z/AAAAAAAAAAAAAAAAAAAAAAAAAABdaG3/HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/HyYo/x8mKP8f",
  "Jij/HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/",
  "HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/HyYo/x8mKP8fJij/HyYo/11obf8AAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAXWlt/11pbf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAn",
  "Kf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAnKf8gJyn/ICcp/yAnKf8g",
  "Jyn/ICcp/yAnKf9daW3/XWlt/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeaW7/Xmlu/15pbv9eaW7/",
  "Xmlu/15pbv9eaW7/Xmlu/15pbv9eaW7/Xmlu/15pbv9eaW7/Xmlu/15pbv9eaW7/Xmlu/15pbv9eaW7/Xmlu/15pbv9eaW7/Xmlu",
  "/15pbv9eaW7/Xmlu/15pbv9eaW7/Xmlu/15pbv9eaW7/Xmlu/15pbv9eaW7/Xmlu/15pbv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAD8AAAAAD8AAPAAAAAADwAA4AAAAAAHAADAAAAAAAMAAIAAAAAAAQAAgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAEAAIAAAAAAAQAAwAAAAAADAADgAAAAAAcAAPAAAAAA",
  "DwAA/AAAAAA/AAA="
].join("");
var FAVICON_ICO_DATA_URL = `data:image/x-icon;base64,${FAVICON_ICO_BASE64}`;
var FAVICON_ICO_BYTES = /* @__PURE__ */ Uint8Array.from(atob(FAVICON_ICO_BASE64), (char) => char.charCodeAt(0));
var FAVICON_PNG_BASE64 = /* @__PURE__ */ [
  "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACe0lEQVR4AcXBT2tUVxzH4c+Jx8QSrW0XlWIWNoLVVEhWtmhU4kso",
  "IhIUK0rfhJtsfBNVsYUQRAouXSgtxqk2EkgC1j+F+o+Aa43OzZwz5/ft3DYXLpexIDi5z+Oo+OH0MdFDP16+6ihxrDn7/THR0bhz",
  "j14a37+P3MWfrjo6HB1nTh1V48491tP4/n1c+vkX5+mYbcyx3mYbc+Tc6ZPfafb3Oepw6MA3bHj9+tUUAgQIECBAgAABAgQIECBA",
  "gAABAgQIECBAgAABAgQIECBA8PzFMt5M1MmbjDp5M1EnLxNVy88e0wtDO76iypuMKqXAnrFv+ZAeLv6Byahy2z7/TKx5+fciuV2j",
  "4/TCX0sNcl/sHKPgJaOg1CKXrE3hyfnjlA2fu8L/eXL+OGXD565QUGqRk4yCNxMFpUCu3U4UNH+TsnY7kXu69CtlX44eIaf5m5S1",
  "24mCUiBnJgpeEoUYVsmlZBTCygplKRm5GFYZ+nqC3PKfv5GSkQsrK5SlZBRiWCUniUKfBBJIEFsZsZVhybBkWDKaIdIMkWaINEPE",
  "kvHo7jW2j0wggQTbRyZ4dPcaloxmiDRDpBkizRCxZFgyLBmxlRFbGRJIIIEHUYghI2dKFHZff0NVDBkgymLIMCV2X3/Du8SQ8R9R",
  "cJ9+skVUPLg9w97DJ+jm/q1pRg5O0s2D2zPsPXyCbu7fmmbk4CRVXhJVMWQs3LhANzFkSKKbGDIWblygmxgyJFHltn48KGrUR828",
  "JOrkJd7b4tspuhkbnOJ9uc2DH4kaeUnUqY+aeUnUyUuiTo6OTQP9ogarreA8/xJ1cawZ6N8o1lErREeHo6J/oxc9FGLbUfIPNOVm",
  "E2qbfnIAAAAASUVORK5CYII="
].join("");
var FAVICON_PNG_DATA_URL = `data:image/png;base64,${FAVICON_PNG_BASE64}`;
var FAVICON_PNG_BYTES = /* @__PURE__ */ Uint8Array.from(atob(FAVICON_PNG_BASE64), (character) => character.charCodeAt(0));
var FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <image width="64" height="64" href="${FAVICON_PNG_DATA_URL}"/>
</svg>`;
var FACE_FAVICON_PNG_BASE64 = /* @__PURE__ */ [
  "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAYhklEQVR42u2be7hdZX3nP7/3XWvty7mfkxu5UUJuJAFFiVIU",
  "QS2d4gUrTuIUSisdBkZQEerz1Gr1cNqq1YoOF9vn6eA4M0adSWxBvFC1ToowyCVcDEkgGELI/SQ5J+e6L+vy/uaPtfY+e+9z",
  "DgSVTv/ofp717GSdtdf7/m7f3/WFV/HT34/RfryZ/qabsdqP2bwh/X6pZ17NPcqr9WLtx8gADuCZu/o6lqqsNLHrdcr4aC54",
  "fuF/PHq88fnjd/UtbIuT5cZKu3PeyMl277lFVx450fquf5UMUBD6EdYi7ERZi8hGkhO39S5uN+ZPrdrf9YSFeEACseOkWv1h",
  "VYLPuGSyI2+8T0hsLvY92jEKiRDBMJ7cPVGRP+/96JH9W/vxLl6LshMh/dZfB1N+JQaoImzByEaS1r+d/GLf29vz5hueb+dT",
  "VeJYVUEB8Q1CwRKWNAL1goKIlh2J4gBVxfgWoWiIYxmMVC4v3nD4oZm0DOBXYYT8OlT8B7eRu7CtZ4VWbV+MOUniutrV/NA3",
  "UogijQQ8JFtLFRBVcFawquBUEwQjSO0pVFVRYj9v/ShmuBTopZrEHeIzX5yMJL63s/eaoy8C6AasbJkuhFeNATXid/TTfuac",
  "vo95Tq4EWe5ZIY7BKc4XMbFTZySVkjYuppqZjmh2Q0AQabYrAKeqvjUSo3g+YAEnxLErqTU/HI/4dN9HB3foZuxMmvhrZ0CN",
  "+CO3zz+jj+QeP2fPoeJIElBwgpiMRsWk7xeROtGNDAABSXW+kQE1ZqW6AppxyKFONGWNEbGmKCSOiUqcbGz/yIn7fhmwlFds",
  "87cgQ7297R1qHglydnVcSkJEPKi5K8lEqqIZgdKoAY2MyJ7XmTYm09bO+NBwS0l8X7zYUCoZ73Wd1x9+jn7klTDBvBLi991C",
  "jlvQgpM/CYpmdVxyoYgE6XtkSm6qktKpdeKntFqa+K4t0pAGRtVhs64rLTwSvCjS2PNNMYiSLwDQi6+bsb9WDWi1r+qX5x4K",
  "rCyIY0UQo41kKM1SbxClam1BbcDD5q1IE2N0CjvRFiBp0DYBZ4hOtJvFtfhC+zHcgsrMCnbqDKjZ1dBXepbknX2fh1xkYnmP",
  "1BGsQcrarL6ZZbfEDFqnXKThdylapL/VmfRjGj4iSPY+UWNFYqOP4OvPQtx3Oj449M81zX0pJrwUA0Qzeyrd0fcxH/NJzzfd",
  "OIgrrkm1Z9JnkWYbl7pMa5FTuvo0Jknd4KdvsmHRVmVQBC9nqAVbEfrtku9f1/2fDg6/FBNmZUDNt058qe+Otg7vQzrhSBxx",
  "ptWWFkG1Aj2SInhq1NKKZtNNpkkdMnORVokzTZskw0UVQQUnqg4V8TqNjSr6+Gih+61zDuyenM0cZk1CZAvJxG1zr2pr8z4U",
  "j7kodqgIXo34mgpKzZXNgNxTFGidOVojVGkEONK4pwEb0CaGtoYI2giNtS/FgHiI2mg0Cf28vL6tNPJ5GcCxZWZaZca4XuEX",
  "txMsdXN25TzzG1GkmAZmaQNkTflszSAp25w0aWxqr5lTb9VvaQBEadmMSgswNuJFg1lJE7zWeK2qIslETlb2fHBw30xxwnSu",
  "bMaIoHOinvU5a5bFkSLTnpMWvNYmOxWZDn6pSUjd9lv/KDLj7YyJDR6iLnRtWlnRpjsCog7n5Y3vR3rJbPROZ8DO9I05Y9fg",
  "oWng2ajSDURktquzKVYW2k8FQJq5Qmlx7joNS7VBWVpX0FYQ0elr1xVNVMWx4hUFQtqPwUhQd+IiDSinrc66Oc+Zwd01gkMK",
  "AQ1uoMWFNt3QZg2gBVObQiqdzWuKGCScrbAy7ebjC1PXV411X12jlOkOftZQTprSnBmLBzU+qs648VYTmuZydbrg6yZUA1Od",
  "Ylsk7pAM4Fg4o5VND3pOfLn3rC7PbpZE1jqnmIY0dfbIRKcHatO8XYOvnCHzU5kZlWnykDqjX5BGQ6k7H1FjRfHkxEQiV3Xf",
  "eORHrUAorYnO4Y723jk2/3iQs0ujinNGxJxKSYiXjjhncUD6sq8VfamYcFowMQ0bFFE/EIlhfDJw53Zde3wvt0wlTFPEbUk5",
  "02NynwoKZmlUcpERMVrz4TpTJtcIVoLDkGBIsA2Xl35L7f8GpwaXPZ9eNr3UkOjU7x2WOLumnjVNVjlbiFS7bQSJQhd5AR25",
  "qhkQSUt2zdlEFio+c1dfx7Ixed4zZo5TVbRB+hlouQboERSj6VYhAYkBN3XV4910J/V/N2mA1JP+ZpDVqf+rZgmnAc0u8VOG",
  "YVAMU0GnIupSNylSL7z4BqrOjZZ7ojN6rh4dqdGclqxvSXczZ1JWelbmulgVwYBmHDeZHEMgzAhVwAeTZ1KLjLkuRrSb0aSL",
  "Ee1kJOlg1HUxru1MuiJlClQ1R5Ug1RJN35uCl8NqghVHIBEBEXlKtEmJdjNJlxmnw0zQKeN0yyg95iSdMka7mcTXElAFdaSJ",
  "gI/DJ8YDBSMOQSVO0MA33ePVwnIY3bZlIwZIUgasRehXY2Vh0RDjUEVFnBgCUwIJgSKDbgH7kyXsTZaxN1rKvmgxh5IFDCW9",
  "jCQdlJI8kaaLp8QJ1oBn0m9rUkWoXVIXvqAKiSqJA+cgUUhcejlVVB2iCb7EFKRMh1eix46ywJ5gqX+YM7z9LPf2coa3j4Xm",
  "MHkdBrFE2l43XTFgEhPQ32827BqAjGWws18ZENdzJ/vjcF5swDpRDcyYbE/Wc2/lnTxWeQ17q0sZSrqJyeFZQ1ugdBeU7rxj",
  "cQG6itBVgI68oZgzFAIh8IWcJ/iewbNSJ9w0hH6aqb9LC6Q4B7FTwkipxko5dJSqMFkVxsqWkcmAkVInI5WF/LwsPFgSqrGA",
  "xrTLOEv8I7yusJPLC9/hzd79xFpUa0QiNdXetsN7GRhw9PcbGEglz4C4df3bV1dk3l33dLz//LWyzcQmJ1+Y/Bh/O/KHhK7A",
  "gk7H4i7Hoh5Y1Gs5rdujs82jveARWEklZARrTC3ayRKcKeysF3gUGnNCoTG+b/brIo35QlYlysKbMHaUqwnj5YThiZjBkYQD",
  "Q44XTsCLIwbnHNf2fINPtX0Gn7I+7N7qNo59/cHT4t1XP/qZ81+gX40Ht3BR/9b8gbj77xe2xWsWyAGHjeSz4wN8cfg6fvO0",
  "Ud7xOsPKhUXmd3l05oWJinJ0IoXDaphQVUtHZw7noFpVojDCudTVGmMwRk7RMWqTR3Xq6gRbawlyPrkAkgRGR8t41lLMp0JY",
  "PDePFcFpqjFHhqrc++gotx28Bl8SPtX+p7Ik2SfzA71oOJ7/rYv6t775/lqYf07/IyvDaNHuIuPu23OukJOuVy49+i3OW1jh",
  "xncv4LzFHp0+WFHECHtOJDxxKGZeX45vbvo+/7Dpbtaddw7nvHYNa9atYsmShRSLHmIgrEIYRs2VHpklimyJ9QsFH9+HKIKx",
  "sTJ7n9/H9qd28eTjT3P0yFH+4q8+wW8sW0K1EmZRey1yV/KBIYyV275zlJ0ncvx4wfuIndErRv6HS9RovrN0+pN/ctZhAVj1",
  "Z8+s8pLcM6Hmpd2OaZtMyOHqPG56dy9/8IYinbkUnKwRjk8oDx9IUFU8TxgbneCpJ3ewbdvTPP/cC1QqFdrbiqxcs4Izly1h",
  "3TlrWLL0NJLEpX6nodCBzhwbaabuO3Y+x/PPPc/ze/bz3LN7SJKE3r5u1p29mvPe+FpWr16OMXam8gNJorQXLU+9UOLO+0Y4",
  "vXiM4aRLq9ouHpWq9aPlTw+sPJh1bkNU8pKTiIorMu7a6S3GnD7Hp91PVc5aGCkrjxxMcKpYIySJ0tXdxW9feiGXvfdCDh6a",
  "4Ibr/ow9T+5izzN7KLQVedfl/47rrr+S0mSCGKm7+KYicr0Gl2KDZy0nR8b4+n/fwjO7nocjx6Crnbdf9lt88tPXY71Us6qV",
  "uG4irTGQsRDFjnldPh05x+HqAjyT4EsEDeGNaa3JepkvFmPwbbpha2GsAj/bn5A4xTNSr0vHccz4WIUTQ1Vu/fzfcN171/PG",
  "i1+Hdcqys1bw+x/YQLWSIMZMF7rOlLul75w7t4vrbvgA689dweduvYE5i+bxk83f4yu3b6JaVibGyynx0pCsthRg0gZKRhcR",
  "BldL1qSFAUEdo5tKCpnvnKzCQ/sTqklKfFMy6JTurjwPPPAkZ84J+MuPX8n1v/92EqfsfOwJHrj/UQpFLwVFmUJ1dPZ6n1Ml",
  "lzP8r2/eww3vfxMfv/49/Nab1iJewD/+4CccOXKCfD6Happ1qk6V3IXpdas0Q5zKFUSmctW0jWUjASto0rSpKIGhEjx8IKEc",
  "p8Q71WmFSevBE9u2E0YxAA9t2w3WIsby+GNPNRcu9OU7MJ61jI6E7Nj+LLlcnjhJ2PWLQ1DMM3lylB1PP0sul7o5bWqmzJZs",
  "KTWaDQmoeg0MUPEwB2NNDoReD0ZjRRUjaRDys/0xE6HiZ5KXFgQThGoIpYlx7v7+o1y4cYC7Nt+P15ZHRTg2eIJqVTFipny/",
  "zp6Tq6Yub2RklLBS4aN/uYnzL+9n+44XCIo5iB1HDg82F5pbaiKN5bKaaYsqRhMXen0k6M6E8Bj9asyGDVvMroF1E0vzB3/v",
  "DG93ZUT7JFZb620hAlZkhpxLmhgtgIsTHnxoV5pdZTiRJMnL1uB1BhyIogTrWQYHT/L4tt14+SCz+RQjWnsnU0CqJCL4zuG7",
  "JGOIo+o8HaXHnGl3jC/vOHbFroF1YT/gbV6zUQXhR31vGSnH8/37cu/gC6MfkYh5SK3QILO7b1XFWOjq7kLUkW8vEMUxIoIk",
  "ju6eLnxfiEKlVlrQrDaojZ0kmao1Js7R1lYkn8tRLVXwC7mMkanL6+3tbmzfNICe4kQQhfVHjjLY3cFB20aCz+LgsNzccQe/",
  "U/xxPvAHQ0nLH5jMDDhWXrSq4Im9vPA1d27wFEOVPGEUZ6CpM0qvMcRdtXp56n9rlSERNHGsXL0c61HHDpflocWcoT2fXoXA",
  "pJvPaohxFNPT28HS0xej1TBbR1CnSCHHqtUriMJGc5R6nO1EWHf8BL3lChihUo05GRW4KP8Al+U2JYHn+cerp68AhbWIYW0q",
  "UE/DkjqDcwU5K3iesQrsPx4SeIKbBbhEFGMMlXLMBW9+Pb1LFhJOlPADn7BcId/bxcVvu4BK2WHEkKiS9w1Jojy+Z4J7Hxvl",
  "e9tGeHrfROqLPJNlfoq1wqXvfBsaRmls4PtEo2Oc89p1rFx9BpVKtR79iSoqEFnL2qFhFk1MUrIek4U8+45UqcTKKn8vjjZR",
  "B3mpTk6B4M6UAZUg3hVGcWjw5NLcj7TLjrN1R4nYpb7UzQjiqeJFUUxPTwc3/vG1FNvaqAydxDOGD910DUuWzKdaDXFAwTfs",
  "Plzhc3cP8YV/jPn7R0tsebTCX93nuPW7wxwYCsn7BhXD5GTIxW97I++66nKisUkqwyc5bdnp3HDj1VPpbWbzsUkLNWcfP8GS",
  "8XEAhjuKHBafB3aVOS0Y4mL/n9VIIGEcTU76+gwAG7JcoNYHLH1p7ncLee9dVE/Gn5r8a+/OE1fyB+ur/O4F8yhV4owZM4yy",
  "CDjnKBZz7HvxKM9u38UZq85k5crTKU1WUYS2vGH3wQpf+sEoRSb4SNd/5fxgG06En8YXccfQ1eQCj49d1sNpPQHl0OFZ8Hyf",
  "J5/YwfDxYV7/xnPp6e6gWg0xJrX1yBjaooizj51gbqlMbISR9iLPLprHpgeOs2V7G5+ecxs3Fz4b0zbHq1TibxZuHLyy1vKX",
  "eh9gAB26rfesTvUe8zUujLoCv3fym/JYaR0bXlPl0vV9FHOGKFbihMwstKEBojin5HIBQU4Iq5qpqaEtbxgaj/j8PcOUy1U2",
  "z72as70HQdvTd9gJtlYv56rBO1gx13HTZXPJeUI5TDPKYjGHtVAux8RxjDEmJV6EheMTvObYiTRgay8w1NXODpvnO48M8d2d",
  "BS7t/L98teOPNO8bicSMTPp6bvd/HnyxVhi1AAP3o2s3YNffWj5202/nn/at//4ik7w9/39kp76Ge188g937x8FFtAVCMQOu",
  "nC/4nuBbwQp4VkATojBGcOQDS94X9h8v83c/Psme0XbumPsJ3uJ9n7IuQLEkEhC6Llb4T1D0Pb5x/BKOHRvizAUBfR0+vjUk",
  "cUQUJlgB30tD9MAaAl8oWBjuLPJsVxePked7L8Zs+ukkD+8v8u7OrdzZeSPttqqJ50cTqpf1fGjwyVuYKo1LY0eYDbiRL/e9",
  "tdOTf4pDq4GpmCo+d1Wv5Wsj/4F94SLa88KS7oQlPTC/S+htN3TkJWVGVvFRIIpheNKx40DIQ3sNUeL4i+7P8kf5v6NKF7Y+",
  "cJJuwSEEMskXyx/nr09+kM5cwpuWKasX+XS3GQKbPhc7iGKlEinjFeXYJBwZUw4Nw9FRKFeVZbmDXNO5iatz/w2rSiw5Z3LK",
  "WJJc3PPhEw82zjZKQ1PEkwHisVv7bu0o2JujUhKD9Yw4rBljWBexNXwrW8sX8nR1FUeTeYwmRRICxBisae7POk39eZEJLmjb",
  "zoeLd3KB/SlV6cTO2DZKw+xAJvhxfCl/M3Et2ybXUKGItQZrqL/X1QvGCQEhXWaCRcEgZ+ee5S3Bg1zk/5RuOUKsnSgGcLHf",
  "Yb1Kmc8Wbjz6yRqtUzXBho9V01XrbwsOp0Kc9NIro7wv9w3el/sWVe1hkPkcSeZxPJ7DSe1lzLVT0TwhPhZHmymxwBzlbH8n",
  "K2UXBDHYTnKhEsZp4bM+WQEYlCAAgk4uie/jEn8rO7vWsitcxaCbz4QrIkDeVClQodOM02uGmGuHWGCPM9ccw9OxbBahSFV7",
  "sLipKlNaYO1spXcaA5wwmJXZ69GZJSHCw7keBPAlZCl7WWqfAy/J+gBN3c+pxqgLcEGBf/i55ZkjynVvipnXpc2DgALEwoFh",
  "4asPC284vZtL1yasrf6ctYXHmievmjoyJosOfRLnE2oqu7TVkjTP4RjA6OHZGZAFRLG4n5DYT6Rjq1O9PCOKZNli2r3J19Nm",
  "bejmNlZ6RcCh5I3j0Bh8+vsBA1stF57heO0Cx4L21Pb3j8K2Q8K2/QZi4WtXRiBKmTaMa5/uc+sZ3lQtUVTTfL81QUgr0KKh",
  "EnvxPzXSOmNzdMta5F375zxUyJs3hBUXm3QIsnXco6l7O1WVaWmPZu5RHXg5+MUgbHrS477dsGfYMhGmTOrOK2vmOt69Rtl4",
  "TsLiHiEOG9ecaQiptb0oM7aZVYn8ovjlsm4t3nzsbbM2Rxu7w8O39pzdbu1DvpH2KNQIEZu9rj76KZnkJZvMqHdnG9WuYYRO",
  "FfxAwHcQQ7UilDIGdOTA5jVV06oQxWBMg2Y1zZrqzElJQ16QjWEokPg58SPHyGgSnz/npqFpk6Qy21zg6BfnXlD0dZMXmDOI",
  "FBeljQsaZiamBN+wgfq01/RkN+3+pKG1Z2rlqhTVY5d+W6FpLkNnmsWbVkZq1jwrgvgCgSEO3Z7JRK7o/ujRx2aaEZoxRd+8",
  "AbtxC8mLn+vqmV/MXW/Q94rjLByFjFaR2Yu6p9T+Vm0eBGodlUkryPoSP24BxZRZKghqZFI93aUidx/yw78987qTo7MNUsup",
  "nAcAOHnH/Iu7ErfVJSSZoGYgrxEFGyZGWsdIWwcKT2W2QF9mxyneJIiYEeQ359w0+MhstJzyqGw2NGHZhcoWkvKtvffk27z3",
  "xJMaSlpJbZabtoJgyxzczDp96szQlmHkhpEdRUO/0waViWRT4abjV+lmLDsRbiH5ZUdlpx1NGVw8b25vWR/wfVkRl1ycwZxp",
  "GJFSQTxVdZD1vl8CtRVVaZ6JnrV1pKlHFdBEkPrEHekxG/E7rY1Cni6Z4KKurfvHWHNqZ4rklRyBGxjA7b+1d9F837srsPxO",
  "tq2pQMMKrqwYgTjWBCN2ujlkZUtVZw0mPTKDE2rHK5o5ldXqne8bm7oSpooTkPbcRQgd9w4lXLPwxqPHX25A+pc/MNFgSxO3",
  "z3+np/rvjdOzUYpqZcgpP6tituRd/Jlch70kHnNJRoBpwANFVf28eGHFhSA2yImNqi7ODFmaA1OM12VNZVy/Han5L76JNxpY",
  "L9CtMKlGtqu1/7tww5EfNQrq1Tsyo03jwfVxLBqaDUf+5/y2nhH9Sk74QzwgzqQmqZZgIYrZVYrNByxRZ96ar3q+nE6cHplD",
  "swjXgyQSDVW+UnjTopvlvMej2daslS1PVfK/+qmx2qmMjTgBzXDCsBatpZpjt8+5MMBeYRLW41wfUFbLc5Fn7t1e9b91wR8f",
  "LAO8+Lmunjkd+au8hHdIrMsUzalwVK19uGr4eveHj26rr9kAbNl5Rdu45v+vj0ybhWyZzNyxeU2ATo88W5/bvBn73A+W51pH",
  "93WGIzP8a/9kZ389bSm8TLuniPbjNTIjY6L3ap8d/pdjRmvv8qUnaYV/+/zb51/k8/8ATqSGLedi1bsAAAAASUVORK5CYII="
].join("");
var FACE_FAVICON_PNG_DATA_URL = `data:image/png;base64,${FACE_FAVICON_PNG_BASE64}`;
var FACE_FAVICON_PNG_BYTES = /* @__PURE__ */ Uint8Array.from(atob(FACE_FAVICON_PNG_BASE64), (character) => character.charCodeAt(0));
var YELLOW_FAVICON_ICO_BASE64 = /* @__PURE__ */ [
  "AAABAAMAEBAAAAEAIABoBAAANgAAACAgAAABACAAqBAAAJ4EAAAwMAAAAQAgAKglAABGFQAAKAAAABAAAAAgAAAAAQAgAAAAAAAA",
  "BAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//",
  "QLrf/wAAAABDveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/RsDj",
  "/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0rD5v9Kw+b/SsPm/0rD",
  "5v9Kw+b/SsPm/0rD5v9Kw+b/SsPm/0rD5v9Kw+b/SsPm/0rD5v9Kw+b/SsPm/0rD5v9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P92",
  "Abf/dgG3/3YBt/92Abf/Tcbo/03G6P9Nxuj/Tcbo/03G6P9Nxuj/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/",
  "UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1PM7P9TzOz/BAUG/wQFBv8EBQb/BAUG/wQFBv9TzOz/U8zs/wQFBv8EBQb/BAUG",
  "/wQFBv8EBQb/U8zs/1PM7P9Xz+7/BwkK/1vQ7v9b0O7/W9Du/1vQ7v8HCQr/V8/u/1fP7v8HCQr/W9Du/1vQ7v9b0O7/W9Du/wcJ",
  "Cv9Xz+7/CQwN/wkMDf9h1PH/Cw8Q/wsPEP8LDxD/YdTx/wkMDf8JDA3/YdTx/wsPEP8LDxD/Cw8Q/2HU8f8JDA3/CQwN/w8TFf8P",
  "ExX/adjz/zN2/v8LDxD/Cw8Q/2nY8/9p2PP/adjz/2nY8/8zdv7/Cw8Q/wsPEP9p2PP/DxMV/w8TFf9l1/P/HSUn/3Pb9P9z2/T/",
  "c9v0/3Pb9P9z2/T/c9v0/3Pb9P9z2/T/c9v0/3Pb9P9z2/T/c9v0/x0lJ/9l1/P/bdn1/23Z9f8sNjr/LDY6/yw2Ov8sNjr/LDY6",
  "/yw2Ov8sNjr/LDY6/yw2Ov8sNjr/LDY6/yw2Ov9t2fX/bdn1/3Tc9v903Pb/dNz2/3Tc9v903Pb/dNz2/3Tc9v903Pb/dNz2/3Tc",
  "9v903Pb/dNz2/3Tc9v903Pb/dNz2/3Tc9v973vf/e973/3ve9/973vf/e973/3ve9/973vf/e973/3ve9/973vf/e973/3ve9/97",
  "3vf/e973/3ve9/973vf/te77/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/",
  "te77/wAAAAC57/z/ue/8/7nv/P+57/z/ue/8/7nv/P+57/z/ue/8/7nv/P+57/z/ue/8/7nv/P+57/z/ue/8/wAAAACAAQAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAAKAAAACAAAABAAAAAAQAgAAAA",
  "AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9A",
  "ut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/8AAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAABCu+D/Qrvg/0K74P9Cu+D/Qrvg/0K74P9Cu+D/Qrvg/0K74P9Cu+D/Qrvg/0K74P9Cu+D/Qrvg/0K74P9Cu+D/Qrvg",
  "/0K74P9Cu+D/Qrvg/0K74P9Cu+D/Qrvg/0K74P9Cu+D/Qrvg/0K74P9Cu+D/AAAAAAAAAAAAAAAAQ73h/0O94f9DveH/Q73h/0O9",
  "4f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9D",
  "veH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/AAAAAAAAAABFvuL/Rb7i/0W+4v9FvuL/Rb7i/0W+4v9FvuL/Rb7i/0W+4v9FvuL/",
  "Rb7i/0W+4v9FvuL/Rb7i/0W+4v9FvuL/Rb7i/0W+4v9FvuL/Rb7i/0W+4v9FvuL/Rb7i/0W+4v9FvuL/Rb7i/0W+4v9FvuL/Rb7i",
  "/0W+4v8AAAAARsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA",
  "4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9IweT/SMHk/0jB5P9I",
  "weT/SMHk/0jB5P9IweT/SMHk/0jB5P9IweT/SMHk/0jB5P9IweT/SMHk/0jB5P9IweT/SMHk/0jB5P9IweT/SMHk/0jB5P9IweT/",
  "SMHk/0jB5P9IweT/SMHk/0jB5P9IweT/SMHk/0jB5P9IweT/SMHk/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl",
  "/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD",
  "5f9Jw+X/ScPl/0nD5f9Jw+X/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9L",
  "xOb/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9LxOb/S8Tm/0vE5v9Mxuf/",
  "TMbn/0zG5/9Mxuf/TMbn/0zG5/9Mxuf/TMbn/0zG5/9Mxuf/TMbn/0zG5/9Mxuf/TMbn/0zG5/9Mxuf/TMbn/0zG5/9Mxuf/TMbn",
  "/0zG5/9Mxuf/TMbn/0zG5/9Mxuf/TMbn/0zG5/9Mxuf/TMbn/0zG5/9Mxuf/TMbn/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H",
  "6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f92Abf/dgG3/3YBt/92Abf/dgG3/3YBt/9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9O",
  "x+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9Ox+n/UMjq/1DI6v9QyOr/UMjq/1DI6v9QyOr/UMjq/1DI6v9QyOr/UMjq/1DI6v9QyOr/",
  "UMjq/1DI6v9QyOr/UMjq/1DI6v9QyOr/UMjq/1DI6v9QyOr/UMjq/1DI6v9QyOr/UMjq/1DI6v9QyOr/UMjq/1DI6v9QyOr/UMjq",
  "/1DI6v9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK",
  "6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1PL7P9Ty+z/U8vs/1PL7P9T",
  "y+z/U8vs/1PL7P9Ty+z/U8vs/1PL7P9Ty+z/U8vs/1PL7P9Ty+z/U8vs/1PL7P9Ty+z/U8vs/1PL7P9Ty+z/U8vs/1PL7P9Ty+z/",
  "U8vs/1PL7P9Ty+z/U8vs/1PL7P9Ty+z/U8vs/1PL7P9Ty+z/VM3t/1TN7f9Uze3/VM3t/1TN7f8EBQb/BAUG/wQFBv8EBQb/BAUG",
  "/wQFBv8EBQb/BAUG/1TN7f9Uze3/VM3t/1TN7f9Uze3/VM3t/wQFBv8EBQb/BAUG/wQFBv8EBQb/BAUG/wQFBv8EBQb/VM3t/1TN",
  "7f9Uze3/VM3t/1TN7f9Wzu7/Vs7u/1bO7v9Wzu7/Vs7u/wUHCP9Zz+7/Wc/u/1nP7v9Zz+7/Wc/u/1nP7v8FBwj/Vs7u/1bO7v9W",
  "zu7/Vs7u/1bO7v9Wzu7/BQcI/1nP7v9Zz+7/Wc/u/1nP7v9Zz+7/Wc/u/wUHCP9Wzu7/Vs7u/1bO7v9Wzu7/Vs7u/1fQ7/9X0O//",
  "V9Dv/wcJCv8HCQr/XdLw/13S8P9d0vD/XdLw/13S8P9d0vD/XdLw/13S8P8HCQr/V9Dv/1fQ7/9X0O//V9Dv/wcJCv9d0vD/XdLw",
  "/13S8P9d0vD/XdLw/13S8P9d0vD/XdLw/wcJCv8HCQr/V9Dv/1fQ7/9X0O//WdHw/1nR8P9Z0fD/CAsM/wgLDP9h0/H/YdPx/2HT",
  "8f8EBQb/BAUG/wQFBv8EBQb/YdPx/wgLDP9Z0fD/WdHw/1nR8P9Z0fD/CAsM/2HT8f8EBQb/BAUG/wQFBv8EBQb/YdPx/2HT8f9h",
  "0/H/CAsM/wgLDP9Z0fD/WdHw/1nR8P9a0/H/WtPx/1rT8f8KDQ7/Cg0O/2XW8v9l1vL/Zdby/wkMDf8JDA3/CQwN/wkMDf9l1vL/",
  "Zdby/woNDv9a0/H/WtPx/woNDv9l1vL/Zdby/wkMDf8JDA3/CQwN/wkMDf9l1vL/Zdby/2XW8v8KDQ7/Cg0O/1rT8f9a0/H/WtPx",
  "/1zU8v9c1PL/XNTy/wsPEf8LDxH/adjz/2nY8/9p2PP/Exga/zN2/v8TGBr/Exga/2nY8/9p2PP/Cw8R/wsPEf8LDxH/Cw8R/2nY",
  "8/9p2PP/Exga/zN2/v8TGBr/Exga/2nY8/9p2PP/adjz/wsPEf8LDxH/XNTy/1zU8v9c1PL/YNXz/2DV8/9g1fP/FBkb/xQZG/9w",
  "2fT/cNn0/3DZ9P9ET1T/RE9U/0RPVP9ET1T/cNn0/3DZ9P9w2fT/cNn0/3DZ9P9w2fT/cNn0/3DZ9P9ET1T/RE9U/0RPVP9ET1T/",
  "cNn0/3DZ9P9w2fT/FBkb/xQZG/9g1fP/YNXz/2DV8/9j1vP/Y9bz/2PW8/8cIyX/HCMl/3Xb9P912/T/ddv0/3Xb9P912/T/ddv0",
  "/3Xb9P912/T/ddv0/3Xb9P912/T/ddv0/3Xb9P912/T/ddv0/3Xb9P912/T/ddv0/3Xb9P912/T/ddv0/3Xb9P8cIyX/HCMl/2PW",
  "8/9j1vP/Y9bz/2fX9P9n1/T/Z9f0/2fX9P9n1/T/JCww/3vc9v973Pb/e9z2/3vc9v973Pb/e9z2/3vc9v973Pb/e9z2/3vc9v97",
  "3Pb/e9z2/3vc9v973Pb/e9z2/3vc9v973Pb/e9z2/3vc9v973Pb/JCww/2fX9P9n1/T/Z9f0/2fX9P9n1/T/atn0/2rZ9P9q2fT/",
  "atn0/2rZ9P8sNjr/LDY6/yw2Ov8sNjr/LDY6/yw2Ov8sNjr/LDY6/yw2Ov8sNjr/LDY6/yw2Ov8sNjr/LDY6/yw2Ov8sNjr/LDY6",
  "/yw2Ov8sNjr/LDY6/yw2Ov8sNjr/atn0/2rZ9P9q2fT/atn0/2rZ9P9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a",
  "9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u",
  "2vX/btr1/27a9f9u2vX/btr1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/",
  "cdv1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/cdv1/3Hb9f9x2/X/ddz2",
  "/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc",
  "9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v943fb/eN32/3jd9v943fb/eN32/3jd9v94",
  "3fb/eN32/3jd9v943fb/eN32/3jd9v943fb/eN32/3jd9v943fb/eN32/3jd9v943fb/eN32/3jd9v943fb/eN32/3jd9v943fb/",
  "eN32/3jd9v943fb/eN32/3jd9v943fb/eN32/7fu+/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73",
  "/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze",
  "9/+37vv/AAAAAH/g9/9/4Pf/f+D3/3/g9/9/4Pf/f+D3/3/g9/9/4Pf/f+D3/3/g9/9/4Pf/f+D3/3/g9/9/4Pf/f+D3/3/g9/9/",
  "4Pf/f+D3/3/g9/9/4Pf/f+D3/3/g9/9/4Pf/f+D3/3/g9/9/4Pf/f+D3/3/g9/9/4Pf/f+D3/wAAAAAAAAAAu+/8/4Ph+P+D4fj/",
  "g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4",
  "/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+77/z/AAAAAAAAAAAAAAAAvPD8/7zw/P+G4vj/huL4/4bi+P+G4vj/huL4/4bi",
  "+P+G4vj/huL4/4bi+P+G4vj/huL4/4bi+P+G4vj/huL4/4bi+P+G4vj/huL4/4bi+P+G4vj/huL4/4bi+P+G4vj/huL4/4bi+P+8",
  "8Pz/vPD8/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL7w/P++8Pz/vvD8/77w/P++8Pz/vvD8/77w/P++8Pz/vvD8/77w/P++8Pz/",
  "vvD8/77w/P++8Pz/vvD8/77w/P++8Pz/vvD8/77w/P++8Pz/vvD8/77w/P++8Pz/vvD8/wAAAAAAAAAAAAAAAAAAAADwAAAPwAAA",
  "A4AAAAGAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAYAAAAHAAAAD8AAADygAAAAwAAAAYAAAAAEAIAAAAAAAACQAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//",
  "QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/9Aut//QLrf",
  "/0C63/9Aut//QLrf/0C63/9Aut//QLrf/0C63/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQbvg/0G7",
  "4P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9B",
  "u+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/Qbvg/0G74P9Bu+D/",
  "Qbvg/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg",
  "/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K8",
  "4P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P9CvOD/Qrzg/0K84P8AAAAAAAAAAAAAAAAAAAAAAAAAAEO94f9D",
  "veH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/",
  "Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h/0O94f9DveH/Q73h",
  "/0O94f9DveH/Q73h/0O94f9DveH/AAAAAAAAAAAAAAAARL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+",
  "4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9E",
  "vuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/0S+4v9EvuL/RL7i/wAAAAAAAAAA",
  "Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i",
  "/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/",
  "4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/0W/4v9Fv+L/Rb/i/wAAAABGwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9G",
  "wOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/",
  "RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj/0bA4/9GwOP/RsDj",
  "/0bA4/9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB",
  "5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9H",
  "weT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9HweT/R8Hk/0fB5P9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/",
  "SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl",
  "/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC5f9IwuX/SMLl/0jC",
  "5f9IwuX/SMLl/0jC5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9J",
  "w+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/",
  "ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9Jw+X/ScPl/0nD5f9KxOb/SsTm/0rE5v9KxOb/SsTm",
  "/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE",
  "5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9K",
  "xOb/SsTm/0rE5v9KxOb/SsTm/0rE5v9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/",
  "S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn",
  "/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9LxOf/S8Tn/0vE5/9Mxef/TMXn/0zF",
  "5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9M",
  "xef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/",
  "TMXn/0zF5/9Mxef/TMXn/0zF5/9Mxef/TMXn/0zF5/9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P9Nxuj/Tcbo",
  "/03G6P9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P9Nxuj/ZQCg/2UAoP9lAKD/ZQCg/2UAoP9lAKD/ZQCg/2UAoP9lAKD/ZQCg/03G",
  "6P9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P9Nxuj/Tcbo/03G6P9O",
  "x+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9Ox+n/",
  "gAHE/4ABxP+AAcT/gAHE/4ABxP+AAcT/gAHE/4ABxP+AAcT/gAHE/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp",
  "/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9Ox+n/Tsfp/07H6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I",
  "6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9P",
  "yOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/T8jp/0/I6f9PyOn/",
  "T8jp/0/I6f9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq",
  "/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ",
  "6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Qyer/UMnq/1DJ6v9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9R",
  "yuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/",
  "Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr/1HK6/9Ryuv/Ucrr",
  "/1HK6/9Ryuv/Ucrr/1HK6/9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL",
  "7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9S",
  "y+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9Sy+z/Usvs/1LL7P9UzOz/VMzs/1TM7P9UzOz/",
  "VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs",
  "/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM",
  "7P9UzOz/VMzs/1TM7P9UzOz/VMzs/1TM7P9Vze3/Vc3t/1XN7f9Vze3/Vc3t/1XN7f9Vze3/AgME/wIDBP8CAwT/AgME/wIDBP8C",
  "AwT/AgME/wIDBP8CAwT/AgME/wIDBP8CAwT/AgME/1XN7f9Vze3/Vc3t/1XN7f9Vze3/Vc3t/1XN7f9Vze3/AgME/wIDBP8CAwT/",
  "AgME/wIDBP8CAwT/AgME/wIDBP8CAwT/AgME/wIDBP8CAwT/AgME/1XN7f9Vze3/Vc3t/1XN7f9Vze3/Vc3t/1XN7f9Wzu7/Vs7u",
  "/1bO7v9Wzu7/Vs7u/1bO7v8DBAT/BQYH/0FKTv9BSk7/QUpO/0FKTv9BSk7/QUpO/0FKTv9BSk7/QUpO/0FKTv9BSk7/BQYH/1bO",
  "7v9Wzu7/Vs7u/1bO7v9Wzu7/Vs7u/1bO7v9Wzu7/BQYH/0FKTv9BSk7/QUpO/0FKTv9BSk7/QUpO/0FKTv9BSk7/QUpO/0FKTv9B",
  "Sk7/BQYH/wMEBP9Wzu7/Vs7u/1bO7v9Wzu7/Vs7u/1bO7v9Xz+7/V8/u/1fP7v9Xz+7/V8/u/1fP7v8GCAn/BggJ/1vQ7v9b0O7/",
  "W9Du/1vQ7v9b0O7/W9Du/1vQ7v9b0O7/W9Du/1vQ7v9b0O7/BggJ/wQFBf9Xz+7/V8/u/1fP7v9Xz+7/V8/u/1fP7v8EBQX/BggJ",
  "/1vQ7v9b0O7/W9Du/1vQ7v9b0O7/W9Du/1vQ7v9b0O7/W9Du/1vQ7v9b0O7/BggJ/wYICf9Xz+7/V8/u/1fP7v9Xz+7/V8/u/1fP",
  "7v9Y0O//WNDv/1jQ7/9Y0O//BAUG/wQFBv8HCQr/QkxQ/17S8P9e0vD/XtLw/17S8P9e0vD/XtLw/17S8P9e0vD/XtLw/17S8P9e",
  "0vD/QkxQ/wcJCv9Y0O//WNDv/1jQ7/9Y0O//WNDv/1jQ7/8HCQr/QkxQ/17S8P9e0vD/XtLw/17S8P9e0vD/XtLw/17S8P9e0vD/",
  "XtLw/17S8P9e0vD/QkxQ/wcJCv8EBQb/BAUG/1jQ7/9Y0O//WNDv/1jQ7/9Z0fD/WdHw/1nR8P9Z0fD/CAoL/wgKC/8ICgv/YdPx",
  "/2HT8f9h0/H/YdPx/2HT8f9h0/H/YdPx/2HT8f9h0/H/YdPx/2HT8f9h0/H/YdPx/wgKC/8FBgf/WdHw/1nR8P9Z0fD/WdHw/wUG",
  "B/8ICgv/YdPx/2HT8f9h0/H/YdPx/2HT8f9h0/H/YdPx/2HT8f9h0/H/YdPx/2HT8f9h0/H/YdPx/wgKC/8ICgv/CAoL/1nR8P9Z",
  "0fD/WdHw/1nR8P9a0vD/WtLw/1rS8P9a0vD/CQsM/wkLDP8JCwz/ZNXx/2TV8f9k1fH/ZNXx/wQFBv8EBQb/BAUG/wQFBv8EBQb/",
  "BAUG/wQFBv9k1fH/ZNXx/0ROUf8JCwz/WtLw/1rS8P9a0vD/WtLw/wkLDP9ETlH/ZNXx/2TV8f8EBQb/BAUG/wQFBv8EBQb/BAUG",
  "/wQFBv8EBQb/ZNXx/2TV8f9k1fH/ZNXx/wkLDP8JCwz/CQsM/1rS8P9a0vD/WtLw/1rS8P9b0/H/W9Px/1vT8f9b0/H/CQ0O/wkN",
  "Dv8JDQ7/Z9by/2fW8v9n1vL/Z9by/wcJCv8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv9n1vL/Z9by/2fW8v8JDQ7/BQgI/1vT8f9b",
  "0/H/BQgI/wkNDv9n1vL/Z9by/2fW8v8HCQr/BwkK/wcJCv8HCQr/BwkK/wcJCv8HCQr/Z9by/2fW8v9n1vL/Z9by/wkNDv8JDQ7/",
  "CQ0O/1vT8f9b0/H/W9Px/1vT8f9c1PL/XNTy/1zU8v9c1PL/Cg4P/woOD/8KDg//atjz/2rY8/9q2PP/atjz/woNDv8KDQ7/Cg0O",
  "/woNDv8KDQ7/Cg0O/woNDv9q2PP/atjz/2rY8/9EUFT/Cg4P/wYICf8GCAn/Cg4P/0RQVP9q2PP/atjz/2rY8/8KDQ7/Cg0O/woN",
  "Dv8KDQ7/Cg0O/woNDv8KDQ7/atjz/2rY8/9q2PP/atjz/woOD/8KDg//Cg4P/1zU8v9c1PL/XNTy/1zU8v9e1fL/XtXy/17V8v9e",
  "1fL/DRES/w0REv8NERL/bdnz/23Z8/9t2fP/bdnz/xAVFv8zdv7/M3b+/xAVFv8QFRb/EBUW/xAVFv9t2fP/bdnz/23Z8/9t2fP/",
  "RlJW/0ZSVv9GUlb/RlJW/23Z8/9t2fP/bdnz/23Z8/8QFRb/M3b+/zN2/v8QFRb/EBUW/xAVFv8QFRb/bdnz/23Z8/9t2fP/bdnz",
  "/w0REv8NERL/DRES/17V8v9e1fL/XtXy/17V8v9g1fP/YNXz/2DV8/9g1fP/EhcZ/xIXGf8SFxn/cdr0/3Ha9P9x2vT/cdr0/xog",
  "Iv8zdv7/M3b+/xogIv8aICL/GiAi/xogIv9x2vT/cdr0/3Ha9P9x2vT/cdr0/3Ha9P9x2vT/cdr0/3Ha9P9x2vT/cdr0/3Ha9P8a",
  "ICL/M3b+/zN2/v8aICL/GiAi/xogIv8aICL/cdr0/3Ha9P9x2vT/cdr0/xIXGf8SFxn/EhcZ/2DV8/9g1fP/YNXz/2DV8/9i1vP/",
  "Ytbz/2LW8/9i1vP/Fx0f/xcdH/8XHR//ddv1/3Xb9f912/X/ddv1/0RPVP9ET1T/RE9U/0RPVP9ET1T/RE9U/0RPVP912/X/ddv1",
  "/3Xb9f912/X/ddv1/3Xb9f912/X/ddv1/3Xb9f912/X/ddv1/3Xb9f9ET1T/RE9U/0RPVP9ET1T/RE9U/0RPVP9ET1T/ddv1/3Xb",
  "9f912/X/ddv1/xcdH/8XHR//Fx0f/2LW8/9i1vP/Ytbz/2LW8/9l1/P/Zdfz/2XX8/9l1/P/UV9k/1FfZP8cIyb/ERUX/3nc9f95",
  "3PX/edz1/3nc9f953PX/edz1/3nc9f953PX/edz1/3nc9f953PX/edz1/3nc9f953PX/edz1/3nc9f953PX/edz1/3nc9f953PX/",
  "edz1/3nc9f953PX/edz1/3nc9f953PX/edz1/3nc9f953PX/edz1/3nc9f953PX/ERUX/xwjJv9RX2T/UV9k/2XX8/9l1/P/Zdfz",
  "/2XX8/9n2PT/Z9j0/2fY9P9n2PT/Z9j0/2fY9P8iKi3/Iiot/3ze9v983vb/fN72/3ze9v983vb/fN72/3ze9v983vb/fN72/3ze",
  "9v983vb/fN72/3ze9v983vb/fN72/3ze9v983vb/fN72/3ze9v983vb/fN72/3ze9v983vb/fN72/3ze9v983vb/fN72/3ze9v98",
  "3vb/fN72/3ze9v983vb/Iiot/yIqLf9n2PT/Z9j0/2fY9P9n2PT/Z9j0/2fY9P9p2PT/adj0/2nY9P9p2PT/adj0/2nY9P9ZaG3/",
  "JzAz/xcdH/8XHR//Fx0f/xcdH/8XHR//Fx0f/xcdH/8XHR//Fx0f/xcdH/8XHR//Fx0f/xcdH/8XHR//Fx0f/xcdH/8XHR//Fx0f",
  "/xcdH/8XHR//Fx0f/xcdH/8XHR//Fx0f/xcdH/8XHR//Fx0f/xcdH/8XHR//Fx0f/xcdH/8XHR//JzAz/1lobf9p2PT/adj0/2nY",
  "9P9p2PT/adj0/2nY9P9s2fT/bNn0/2zZ9P9s2fT/bNn0/2zZ9P9s2fT/XWxy/11scv9dbHL/XWxy/11scv9dbHL/XWxy/11scv9d",
  "bHL/XWxy/11scv9dbHL/XWxy/11scv9dbHL/XWxy/11scv9dbHL/XWxy/11scv9dbHL/XWxy/11scv9dbHL/XWxy/11scv9dbHL/",
  "XWxy/11scv9dbHL/XWxy/11scv9dbHL/XWxy/2zZ9P9s2fT/bNn0/2zZ9P9s2fT/bNn0/2zZ9P9u2vX/btr1/27a9f9u2vX/btr1",
  "/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a",
  "9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u2vX/btr1/27a9f9u",
  "2vX/btr1/27a9f9u2vX/btr1/27a9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/",
  "cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1",
  "/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9w2/X/cNv1/3Db9f9z2/X/c9v1/3Pb",
  "9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z",
  "2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/",
  "c9v1/3Pb9f9z2/X/c9v1/3Pb9f9z2/X/c9v1/3Pb9f913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2",
  "/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc",
  "9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v913Pb/ddz2/3Xc9v93",
  "3fb/d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/",
  "d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/d932",
  "/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v933fb/d932/3fd9v963vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re",
  "9/963vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re9/96",
  "3vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re9/963vf/et73/3re9/963vf/",
  "et73/3re9/+97/v/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73",
  "/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze",
  "9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/3ze9/983vf/fN73/73v+/8AAAAAft/3/37f9/9+3/f/ft/3/37f9/9+",
  "3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/",
  "ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3/37f9/9+3/f/ft/3",
  "/37f9/9+3/f/ft/3/wAAAAAAAAAAv/D8/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg",
  "+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B",
  "4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/geD4/4Hg+P+B4Pj/v/D8/wAAAAAAAAAAAAAAAMDw/P+D4fj/",
  "g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4",
  "/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph+P+D4fj/g+H4/4Ph",
  "+P+D4fj/g+H4/4Ph+P/A8Pz/AAAAAAAAAAAAAAAAAAAAAAAAAADB8Pz/heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/heH4/4Xh+P+F",
  "4fj/heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/",
  "heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/heH4/4Xh+P+F4fj/heH4/8Hw/P8AAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAwvH8/8Lx/P+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji",
  "+f+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji+f+I4vn/iOL5/4ji+f+I",
  "4vn/iOL5/4ji+f/C8fz/wvH8/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADD8fz/w/H8/8Px/P/D8fz/",
  "w/H8/8Px/P/D8fz/w/H8/8Px/P/D8fz/w/H8/8Px/P/D8fz/w/H8/8Px/P/D8fz/w/H8/8Px/P/D8fz/w/H8/8Px/P/D8fz/w/H8",
  "/8Px/P/D8fz/w/H8/8Px/P/D8fz/w/H8/8Px/P/D8fz/w/H8/8Px/P/D8fz/w/H8/8Px/P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAD8AAAAAD8AAPAAAAAADwAA4AAAAAAHAADAAAAAAAMAAIAAAAAAAQAAgAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAEAAIAAAAAAAQAAwAAAAAADAADgAAAAAAcAAPAAAAAA",
  "DwAA/AAAAAA/AAA="
].join("");
var YELLOW_FAVICON_ICO_DATA_URL = `data:image/x-icon;base64,${YELLOW_FAVICON_ICO_BASE64}`;
var YELLOW_FAVICON_ICO_BYTES = /* @__PURE__ */ Uint8Array.from(atob(YELLOW_FAVICON_ICO_BASE64), (character) => character.charCodeAt(0));
var YELLOW_FAVICON_PNG_BASE64 = /* @__PURE__ */ [
  "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACaUlEQVR4AcXBT2tUVxzH4c8tZ63pTgaVdCG4cGEF0xhBJDTaTdFQ",
  "UbJo8FX4InwBriVZiChEcKEmJdQyjknFZCOhu4YoWYiY+Idrjvec39c54oHhMgoBk/s8BTVhc17sIDcwWtCj4Iuw+ZfoCm//ZSe5",
  "PUMkbuDXgq6CrrAxp/B2gd3k9gzjfhwrHF3Vmza7rXrTJimq1/cUNh/RBDdwEldtPKQp1cZDHIo0yUmBJjkUaZKTAnVn/vyHnTA7",
  "fYo6h0XqynKLzp1LfE8j52+CReqcFMiO/f6AZPn+BKaPfE/tmXF+/u0GydLds2QORbKy3OIzq8guX3lGr+tXj/Atl688o9f1q0fI",
  "ynKLzxTJnBTIyvIDieTJOovLvJgcZP/UKol0iOTgL1P0WlucJOksLvNicpD9U6sk0iGysvxAIgUyJxlZNJHIAtm79yV7r62QyQJJ",
  "NPG8c57kwMgdZIHk3fuSvddWyGSBLJpIJCP7QSZkQibMDDNDMaAYUAx4X+F9hfcV3lcoBlrHp1lrn0MmZGKtfY7W8WkUA95XeF/h",
  "fYX3FYoBxYBiwMwwM2RCJmTCSUZmJhIpkL18OkEvKWAmJKOXmZACL59O0EsKZGYikYyseL10UdS0TsywvnCBflrDt1l/PE4/rRMz",
  "rC9coJ/W8G3WH49T5ySjzkzsG7rF10hGP2Zi39AtvkYy6opXT/4QDXKS0SQnE01ykrFdSyOH6edY5z+2y5mM7Tr6aIV+TGybk4km",
  "OclokpOJJjnJaFJB19r8mGjAwdG5wtElGU0p+GJ1blTsosGx+YKugpr/Z0+LHfTTmb8LenwCIklvaPI6mmgAAAAASUVORK5CYII="
].join("");
var YELLOW_FAVICON_PNG_DATA_URL = `data:image/png;base64,${YELLOW_FAVICON_PNG_BASE64}`;
var YELLOW_FAVICON_PNG_BYTES = /* @__PURE__ */ Uint8Array.from(atob(YELLOW_FAVICON_PNG_BASE64), (character) => character.charCodeAt(0));
var CLASSIC_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#070b14"/>
  <rect x="12" y="28" width="40" height="14" rx="3" fill="#E0BA55" opacity="0.35"/>
  <text x="32" y="46" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="42" fill="white">P</text>
</svg>`;
var CLASSIC_FAVICON_DATA_URL = `data:image/svg+xml;base64,${/* @__PURE__ */ btoa(CLASSIC_FAVICON_SVG)}`;
// ../../packages/shared/inbox/connection.ts
function inboxClaimName(replyId, session) {
  return `${replyId}.${session.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120)}`;
}
var INBOX_TOOL_NAME = "plannotator_inbox";
var INBOX_TOOL_ACTIONS = [
  "send_message",
  "read_thread",
  "search",
  "resolve_message",
  "snooze_thread",
  "thread_pulls",
  "submit_guide",
  "get_guide_brief",
  "card",
  "steps"
];
var INBOX_REMOVED_ACTION = "wait_for_reply";
var INBOX_REMOVED_ACTION_TEXT = "action_removed: The Plannotator Inbox no longer has wait_for_reply. Go on with your work or end your turn. If the reply does not arrive in this session by itself, call read_thread with the thread_id later.";
var INBOX_FILLED_ARGUMENTS = ["project_path", "agent_session", "agent_host", "agent_name"];
var INBOX_AGENT_PROJECT_PATH = "project_path";
var INBOX_AGENT_PROJECT_PATH_DESCRIPTION = "The repository or folder this is about; defaults to the folder your session started in. Pass it only when the message is about another repository or folder.";
function inboxProjectPathShapeRefusal(value) {
  if (typeof value !== "string" || value.trim() === "")
    return "project_path: a folder path (absolute, or relative to your working folder).";
  if (/[\u0000-\u001f\u007f]/.test(value))
    return "project_path: no control characters or line breaks.";
  if (value.length > 4096)
    return "project_path: at most 4096 characters.";
  return null;
}
var INBOX_WAKES_META_KEY = "ai.plannotator/inbox-wakes";
var INBOX_WORKING_FOLDER_META_KEY = "ai.plannotator/working-folder";
function inboxToolCallParams(call, options) {
  const meta = {
    ...options.wakes ? { [INBOX_WAKES_META_KEY]: true } : {},
    ...options.workingFolder ? { [INBOX_WORKING_FOLDER_META_KEY]: options.workingFolder } : {}
  };
  return { name: call.name, arguments: call.arguments, ...Object.keys(meta).length > 0 ? { _meta: meta } : {} };
}
var INBOX_REPLY_TO_CHECK = "Before reply_to into a thread you have not read in this context window, call read_thread with no id and match the subject.";
var INBOX_REF_LINK_RULE = "A bare #123 links to this project's repository (where your session started, or `project_path`), even in a message about another repo; a word before it (`docs #12`, `docs PR #12`) does not change that. For any other repo's issue or PR, write owner/repo#123 (its `git remote -v`) or its full URL in every mention, repeats and choices too; relaying another agent's report, rewrite its bare refs. In a GitLab project, a GitHub one needs its URL.";
var INBOX_PEEK_META_KEY = "ai.plannotator/inbox-peek";
var INBOX_SESSION_THREADS_MAX = 5;
var SESSION_THREAD_TEXT_MAX = 80;
function inboxSessionThreadsParams(projectPath, session) {
  return {
    name: "read_thread",
    arguments: { project_path: projectPath, agent_session: session, limit: INBOX_SESSION_THREADS_MAX },
    _meta: { [INBOX_PEEK_META_KEY]: true }
  };
}
function inboxHealthPeeks(health, serverSession) {
  const value = health && typeof health === "object" ? health : null;
  return !!value && value.serverSession === serverSession && value.peek === true;
}
var INBOX_SESSION_THREADS_MORE = 'More: read_thread with no id lists every thread (asked_by "anyone", include_resolved); search finds older ones by words (all_projects).';
function inboxSessionThreadsText(result, toolName = INBOX_TOOL_NAME) {
  const structured = result?.structuredContent;
  if (!structured || !Array.isArray(structured.threads))
    return null;
  const oneLine = (value) => {
    if (typeof value !== "string")
      return null;
    const flat = value.replace(/[\u061c\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]/g, "").replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]+/g, " ").replace(/\s+/g, " ").trim();
    if (!flat)
      return null;
    return JSON.stringify(flat.length > SESSION_THREAD_TEXT_MAX ? `${flat.slice(0, SESSION_THREAD_TEXT_MAX - 1)}…` : flat);
  };
  const time = (value) => typeof value === "string" && /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(value) ? `${value.slice(0, 10)} ${value.slice(11, 16)}Z` : null;
  const lines = [];
  for (const row of structured.threads.slice(0, INBOX_SESSION_THREADS_MAX)) {
    const thread = row;
    const id = thread?.thread_id;
    if (typeof id !== "string" || !/^msg_[0-9A-Za-z]{26}$/.test(id))
      continue;
    const parts = [`- ${id}`, oneLine(thread.subject) ?? "(no subject)"];
    const name = oneLine(thread.thread_name);
    if (name)
      parts.push(`name ${name}`);
    const questions = thread.questions;
    const open = typeof questions?.open === "number" && questions.open > 0 ? questions.open : 0;
    if (open > 0)
      parts.push(`${open} open question${open === 1 ? "" : "s"}`);
    if (thread.unread === true)
      parts.push("the person wrote something you have not read");
    const steps = thread.steps;
    if (typeof steps?.done === "number" && typeof steps.total === "number" && steps.total > 0)
      parts.push(`steps ${steps.done}/${steps.total}`);
    const at = time(thread.last_at);
    if (at)
      parts.push(`last ${thread.last_author === "person" ? "the person" : "an agent"} ${at}`);
    lines.push(parts.join(" · "));
  }
  if (lines.length === 0)
    return null;
  const total = typeof structured.total === "number" && structured.total > lines.length ? structured.total : lines.length;
  const count = total > lines.length ? `${lines.length} of ${total}, newest first` : `${lines.length}`;
  const check = INBOX_REPLY_TO_CHECK.replace("call read_thread", `call ${toolName} read_thread`);
  return [`Your open Plannotator Inbox threads in this project (${count}). ${check} ${INBOX_SESSION_THREADS_CHANNEL}`, ...lines, INBOX_SESSION_THREADS_MORE].join(`
`);
}
var INBOX_BRIDGE_POLL_PATH = "/api/inbox/bridge/poll";
var INBOX_BRIDGE_EVENT_PATH = "/api/inbox/bridge/event";
function parseInboxToolList(result) {
  const listed = result && typeof result === "object" ? result.tools : undefined;
  if (!Array.isArray(listed))
    return [];
  const byName = new Map;
  for (const item of listed) {
    if (!item || typeof item !== "object")
      continue;
    const tool = item;
    if (typeof tool.name !== "string" || !INBOX_TOOL_ACTIONS.includes(tool.name))
      continue;
    const schema = tool.inputSchema && typeof tool.inputSchema === "object" ? tool.inputSchema : { type: "object" };
    byName.set(tool.name, { name: tool.name, description: typeof tool.description === "string" ? tool.description : "", inputSchema: schema });
  }
  return INBOX_TOOL_ACTIONS.flatMap((name) => {
    const tool = byName.get(name);
    return tool ? [tool] : [];
  });
}
function propertiesOf(tool) {
  const properties = tool.inputSchema.properties;
  return properties && typeof properties === "object" ? properties : {};
}
function isFilled(name) {
  return INBOX_FILLED_ARGUMENTS.includes(name);
}
function leadOf(description) {
  const line = description.split(`
`, 1)[0] ?? "";
  const stop = line.search(/\.\s/);
  return (stop >= 0 ? line.slice(0, stop + 1) : line).trim();
}
var INBOX_CHANNEL_RULE = "A decision in the Inbox stays there: when the person writes in the chat, say what waits and link its thread, but never also ask it in the chat with a blocking question tool (AskUserQuestion or similar). Ask in the chat only about something new they raised there that needs no pictures or files, or when they ask.";
var INBOX_SESSION_THREADS_CHANNEL = "Their decisions stay in these threads: when the person writes in the chat, say what waits and link the thread, but never also ask it in the chat with a blocking question tool (AskUserQuestion or similar).";
var INBOX_USE_RULE = "Use it for a decision only they can make (a :::question block; go on with other work), finished long work (a short summary with its pictures inline, files in `attachments`), or when they ask.";
var INBOX_THREAD_RULE = "One thread per work stream, unless the person says otherwise.";
var INBOX_FOLLOW_THROUGH_RULE = "Be proactive about Inbox updates and about replying to the person through the Inbox when you think they would want you to. Don't withhold important updates or decisions, and don't batch updates to send later: proactivity is better than procrastination.";
var INBOX_SUBAGENT_RULE = "If another agent started you, report to it instead.";
var INBOX_AGENT_RULES = `${INBOX_USE_RULE} ${INBOX_THREAD_RULE} ${INBOX_CHANNEL_RULE} ${INBOX_FOLLOW_THROUGH_RULE} ${INBOX_SUBAGENT_RULE}`;
var INBOX_TOOL_LEAD = `The Plannotator Inbox on this machine: message the person, get their answer later; nothing blocks. ${INBOX_AGENT_RULES} Set \`action\` to a tool below, with its fields.`;
var INBOX_TOOL_WAKE_NOTE = "A reply arrives in this session by itself once it is idle, headed `Plannotator Inbox: <title> (<reply id>)`: end your turn or keep working. To answer it, send_message with reply_to set to that reply id, never one from memory.";
var INBOX_TOOL_HELP_NOTE = "Every field and question syntax: `plannotator inbox --help`.";
var INBOX_TOOL_BOARD_OFF_NOTE = "The Board (cards for work that outlasts a reply) is off until the person turns it on; see `plannotator card --help`.";
var INBOX_STEPS_LEAD = "The person's checklist for this thread, only for multi-step work you're both aligned on. Start one when the person gives the go-ahead on work with several steps. High-level steps, a few plain words each; never your own to-do list. The whole list each call. status: todo, doing, done, waiting (on the person), dropped (say why in note). Update each step as it starts and ends; notifies no one.";
var INBOX_STEPS_ACTION_LINE = "person's checklist for multi-step work you're aligned on (see the steps field).";
var INBOX_STEPS_FIELD_DESCRIPTION = `steps: ${INBOX_STEPS_LEAD} No thread yet: send it with the send_message that starts one.`;
function inboxStepsWakeLine(steps) {
  return `Your checklist here: ${steps.done} of ${steps.total} done${steps.doing ? `; doing: ${steps.doing}` : ""}. If you're still working on this, keep it current.`;
}
function inboxPullsWakeLine(changes) {
  const parts = [
    ...changes.added.length > 0 ? [`added ${changes.added.join(", ")}`] : [],
    ...changes.removed.length > 0 ? [`removed ${changes.removed.join(", ")}`] : []
  ];
  return `The person changed this thread's PRs: ${parts.join("; ")}.`;
}
function wakePullsChanged(value) {
  if (!value || typeof value !== "object")
    return null;
  const list = (v) => {
    if (!Array.isArray(v) || v.length > 20)
      return null;
    const out = [];
    for (const item of v) {
      if (typeof item !== "string" || item.length === 0 || item.length > 300 || /[\p{Cc}\p{Zl}\p{Zp}\s,;]/u.test(item))
        return null;
      out.push(item);
    }
    return out;
  };
  const { added, removed } = value;
  const a = list(added ?? []);
  const r = list(removed ?? []);
  if (!a || !r || a.length + r.length === 0)
    return null;
  return { added: a, removed: r };
}
var INBOX_STEPS_START_WAKE_LINE = "If these answers start work with several steps, start a checklist here (the steps action). If not, skip it.";
function wakeSteps(value) {
  if (!value || typeof value !== "object")
    return null;
  const { done, total, doing } = value;
  const count = (n) => typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 12;
  if (!count(done) || !count(total) || total === 0 || done > total)
    return null;
  const step = typeof doing === "string" ? doing.replace(/[\p{Cc}\p{Zl}\p{Zp}]+/gu, " ").replace(/\s+/g, " ").trim().slice(0, 80) : "";
  return { done, total, doing: step || null };
}
var INBOX_AGENT_ACTIONS_NO_LINE = ["snooze_thread", "thread_pulls"];
var INBOX_AGENT_ACTION_LEADS = {
  send_message: "Message the person (markdown); with no reply_to or thread, it starts a new thread.",
  resolve_message: "Archive a message's thread, only when nothing in it is left for the person to read or answer.",
  read_thread: 'Read a thread (thread_id); with no id, list your threads (asked_by "anyone": all).',
  search: "Find messages by words, older ones too (read-only).",
  get_guide_brief: "How to write a guided review, with a worked submit_guide call.",
  card: "A Board card for work that outlasts this reply: create it, then move it and say where it is as the work moves.",
  steps: INBOX_STEPS_ACTION_LINE
};
var INBOX_OPTION_LINES_RULE = "Indented under a `- [ ]` choice (not a plain bullet), only when it helps the person pick: `Pros: <item>; <item>` and `Cons: <item>; <item>` (the card lines them up across options), and `Prototype: <page>`, a page they try before picking: an HTML file you also attach, or the http://localhost address of an app you are running (the send is refused if it does not answer). One `Prototype:` line at the block's own indent is one page for all the options.";
var INBOX_PICTURES_RULE = "Pictures go in the body where you write about them, `![alt](/abs/path.png)`, never only in `attachments`; do not also attach one the body shows. Visual options are picture choices, one picture each, inside the choice (not in the text above the question): `- [ ] A · Label — ![alt](path) what it means`; the label comes back.";
var INBOX_ATTACHMENTS_PICTURES_LINE = "Screenshots and pictures go in the body instead (`![alt](path)`); attach what the person should open or click through.";
var INBOX_BRO_LINE = "Don't use jargon and speak coherently. State things more simply and concisely, like one human talking to another. Don't drop important details, especially if the user asks for them.";
function inboxBodyWithBro(description) {
  return description.replace("The message, markdown.", `The message, markdown. ${INBOX_BRO_LINE}`);
}
function inboxToolsWithoutBro(tools) {
  return tools.map((tool) => {
    const properties = tool.inputSchema.properties;
    const body = properties?.body;
    if (typeof body?.description !== "string" || !body.description.includes(INBOX_BRO_LINE))
      return tool;
    const description = body.description.replace(` ${INBOX_BRO_LINE}`, "");
    return { ...tool, inputSchema: { ...tool.inputSchema, properties: { ...properties, body: { ...body, description } } } };
  });
}
var INBOX_AGENT_FIELD_DESCRIPTIONS = {
  send_message: {
    body: [
      "The message, markdown. Ask what only the person can decide as a question block, which renders as an answerable card:",
      "",
      ":::question",
      "Where should the edit that loses a sync conflict go?",
      "",
      "Context in one to three plain sentences: what it affects, what you know, why you recommend one. The person switches in cold.",
      "",
      "- [ ] Nowhere — silent loss, as today",
      "- [ ] Local only, purged after 30 days — cheap",
      "- [ ] Server-side per user — needs a retention policy",
      "",
      "Recommended: Local only, purged after 30 days",
      "Holds up: sync release",
      ":::",
      "",
      'Your recommendation goes on the `Recommended:` line, never in a choice label. Keep the choices in their natural order; never move yours first. `:::question-multi` takes several choices, `:::question-text` free text. The person can always answer Other, add a note or skip, so never add an Other choice yourself. `Stopped: <why>` only when you cannot go on until it is answered (never `Stopped: no`); `Holds up: <work>` names work that waits while you go on. Ask only what you cannot decide alone, about 8 a round at most. Answers come back in the reply under "Answers to your questions".',
      "",
      INBOX_PICTURES_RULE,
      "",
      "Optional lines after the question; most questions need none of these: `Stakes: <what it affects>` (give one with every Stopped or Holds up), `Shows: ![alt](path)` or `Shows: [name](file)` (the one picture or file it is about), `Why: <why your recommendation>` on its own line, `Reversible: no — <why>` only when it cannot be undone.",
      INBOX_OPTION_LINES_RULE,
      "",
      'Only for a true blocker the person must go and do outside this chat, that you cannot do yourself (approve a deploy, sign in, touch a security key, merge a PR you cannot merge), write a `:::action` block: first line the order, then why. Each command the person must run goes in the why in its own fenced code block (```), one block per command in the order to run them, so each gets a copy button. Optional: `Where: <url>`, `Stopped:`, `Watching: <what you watch>`. Never for a decision or a question, for what you can do yourself, or as a checklist or status update; most messages need none. Done or Can\'t do it comes back under "Action items you asked for".',
      "",
      "Blocks fenced as `mermaid` or `dot` draw as diagrams; one fenced as `html` draws as a live, sandboxed page in the message (chart, SVG, mock; https libraries load). Leave its background transparent; use var(--foreground), var(--chart-1)…var(--chart-5). Let content set its height: no vh units or height:100% on html or body.",
      "",
      INBOX_REF_LINK_RULE
    ].join(`
`),
    reply_to: `A message id: post this as a reply in that message's thread. ${INBOX_REPLY_TO_CHECK}`,
    thread: "A short thread name, one line: the same name in this project is the same open thread, across sessions. With no thread and no reply_to, the message starts a new thread; to add to a thread, reply_to its latest message or use the same thread name. Ignored with reply_to, except when you are asked to name a thread the person started: then it names that thread, once.",
    supersedes: `Your own questions in this thread that are still open (read_thread state open or picked) and no longer apply: a newer message replaces them, or the reply settled them in words. "<message id>/<key>" for one, "<message id>" for all of that message's, as a list of strings, e.g. ["msg_…/q-…"]; send with reply_to into their thread. With one question in this message it replaces them, otherwise they read "No longer applies".`,
    done: 'Your own open action items (`:::action`) in this thread that you saw done yourself, e.g. the deploy you watch is Ready: "<message id>/<key>" (key a-…); send with reply_to into their thread. The card says you saw it done; nothing is sent to the person.',
    attachments: `Files to show the person beside the message, absolute or relative to project_path: a plan, an HTML mock, code, a video, any file. ${INBOX_ATTACHMENTS_PICTURES_LINE} Link one from the body (\`[the mock](mock.html)\`) to open it beside the thread. Their comments on the files come back in the reply. Folders and .env files are refused.`
  },
  read_thread: {
    thread_id: "A thread id. read_thread shows its open questions, its PRs, the newest messages in full, and earlier ones one line each."
  },
  submit_guide: {
    guide: "The guide in get_guide_brief's output_schema, as an object or its JSON.",
    snapshot: "Instead of guide and patch: a complete Plannotator guide snapshot, as an object or its JSON."
  }
};
var INBOX_REMINDER_TEXT = `Plannotator Inbox is on: when you finish long work, or need a decision only the person can make, send it with plannotator_inbox send_message (each decision as a \`:::question\` block) and keep going. ${INBOX_FOLLOW_THROUGH_RULE} ${INBOX_THREAD_RULE} Their reply comes back here. A decision in the Inbox stays there: when the person writes here, say what waits and link its thread, but never also ask it in the chat with a blocking question tool (AskUserQuestion or similar). Run \`plannotator inbox --help\` for how it works.`;
var INBOX_REMINDER_TEXT_NO_WAKE = `Plannotator Inbox is on: when you finish long work, or need a decision only the person can make, send it with plannotator_inbox send_message (each decision as a \`:::question\` block) and keep going. ${INBOX_FOLLOW_THROUGH_RULE} ${INBOX_THREAD_RULE} Their reply does not come back here by itself: read the thread later with read_thread. A decision in the Inbox stays there: when the person writes here, say what waits and link its thread, but never also ask it in the chat with a blocking question tool (AskUserQuestion or similar). Run \`plannotator inbox --help\` for how it works.`;
function inboxReminderText(toolName = INBOX_TOOL_NAME, options = {}) {
  const text = options.wakes === false ? INBOX_REMINDER_TEXT_NO_WAKE : INBOX_REMINDER_TEXT;
  return text.replace(INBOX_TOOL_NAME, toolName);
}
var INBOX_BRIEFING_NEVER_RUN = "Never run `plannotator inbox` just to send: send_message starts a stopped Inbox itself, and bare `plannotator inbox` opens the window for the person.";
var INBOX_BRIEFING_FROM_NOW_ON = "For the rest of this session, use the Inbox as above: for a decision the person is not here to make, and to hand over long work you finished.";
var INBOX_COMMAND_BRIEFING = [
  "The person opened their Plannotator Inbox with /plannotator-inbox and has its address. The Plannotator Inbox is one window on this computer where you leave the person messages, `:::question` blocks they answer with a click, and files. They answer when they can. Nothing blocks: you send, then keep working or end your turn.",
  "",
  `- ${INBOX_USE_RULE}`,
  `- ${INBOX_THREAD_RULE}`,
  "- Send with a `plannotator_inbox` tool when you have one (it can be listed with a prefix and may need loading through tool search first): `action` `send_message`, with a markdown `body`. Otherwise call `send_message` on the Inbox's MCP server, `plannotator inbox mcp`.",
  "- send_message's result says whether the person's reply arrives in this session by itself. When it does, do not wait or poll for it: end your turn or go on with other work. When it does not, go on with your work and read the thread later with read_thread.",
  `- ${INBOX_CHANNEL_RULE}`,
  `- ${INBOX_FOLLOW_THROUGH_RULE}`,
  `- ${INBOX_BRIEFING_NEVER_RUN}`,
  "- Before your first send, run `plannotator inbox --help` and read it: every field, the full question syntax, and how to connect the MCP server.",
  "- The `plannotator` skill, where you have it, has more.",
  "",
  `Opening the Inbox asks for no work by itself. ${INBOX_BRIEFING_FROM_NOW_ON}`
].join(`
`);
var INBOX_REMINDER_MAX_CHARS = 4128;
function inboxReminderCustomText(config, host) {
  const record = (value) => value && typeof value === "object" && !Array.isArray(value) ? value : null;
  const usable = (value) => typeof value === "string" && value.trim() !== "" && value.length <= INBOX_REMINDER_MAX_CHARS ? value : null;
  const inbox = record(record(record(config)?.prompts)?.inbox);
  if (!inbox)
    return null;
  return usable(record(record(inbox.runtimes)?.[host])?.reminder) ?? usable(inbox.reminder);
}
function inboxReminderFor(custom, toolName = INBOX_TOOL_NAME, options = {}) {
  if (typeof custom !== "string" || custom.trim() === "")
    return inboxReminderText(toolName, options);
  return custom.replace(/(^|[^A-Za-z0-9_])plannotator_inbox(?![A-Za-z0-9_])/g, (_match, before) => before + toolName);
}
function inboxAgentTool(tools, options = {}) {
  if (tools.length === 0)
    return null;
  const description = [
    INBOX_TOOL_LEAD,
    "",
    ...tools.filter((tool) => !INBOX_AGENT_ACTIONS_NO_LINE.includes(tool.name)).map((tool) => `- ${tool.name}: ${INBOX_AGENT_ACTION_LEADS[tool.name] ?? leadOf(tool.description)}`),
    ...options.wakes === false ? [] : ["", INBOX_TOOL_WAKE_NOTE],
    "",
    ...tools.some((tool) => tool.name === "card") ? [] : [INBOX_TOOL_BOARD_OFF_NOTE],
    INBOX_TOOL_HELP_NOTE
  ].join(`
`);
  const properties = {
    action: { type: "string", enum: tools.map((tool) => tool.name), description: "Which Inbox tool to call." }
  };
  const usedBy = new Map;
  for (const tool of tools) {
    for (const [name, schema] of Object.entries(propertiesOf(tool))) {
      if (isFilled(name) && name !== INBOX_AGENT_PROJECT_PATH || name === "action")
        continue;
      const users = usedBy.get(name);
      if (users) {
        users.push(tool.name);
        continue;
      }
      usedBy.set(name, [tool.name]);
      if (name === INBOX_AGENT_PROJECT_PATH) {
        properties[name] = { type: "string", description: INBOX_AGENT_PROJECT_PATH_DESCRIPTION };
        continue;
      }
      const own = INBOX_AGENT_FIELD_DESCRIPTIONS[tool.name]?.[name];
      const served = typeof schema.description === "string" ? schema.description : "";
      properties[name] = { ...schema, description: (own === undefined ? served : served.includes(INBOX_BRO_LINE) ? inboxBodyWithBro(own) : own).trim() };
    }
  }
  for (const [name, users] of usedBy) {
    const schema = properties[name];
    properties[name] = { ...schema, description: `(${users.join(", ")}) ${schema.description}`.trim() };
  }
  return { name: INBOX_TOOL_NAME, description, inputSchema: { type: "object", properties, required: ["action"], additionalProperties: false } };
}
var INBOX_JSON_FRAGMENT_RE = /^\s*[{[]\s*"|"\s*[,:]\s*["[{]/;
function inboxInputUnread(input, tools) {
  const { action, ...rest } = input;
  if (typeof action === "string")
    return /["{}[\]:,\n]/.test(action);
  if (action !== undefined)
    return false;
  const keys = Object.keys(rest);
  if (keys.length === 0)
    return true;
  const known = new Set(tools.flatMap((tool) => Object.keys(propertiesOf(tool))));
  if (keys.every((key) => !known.has(key)))
    return true;
  return Object.values(rest).some((value) => typeof value === "string" && INBOX_JSON_FRAGMENT_RE.test(value));
}
function inboxUnreadInputText(input, tools) {
  let got;
  if (input === null || input === undefined)
    got = "it arrived empty";
  else if (typeof input !== "object")
    got = `it arrived as a ${typeof input}, not fields`;
  else if (Array.isArray(input))
    got = "it arrived as a list, not fields";
  else {
    const keys = Object.keys(input);
    const named = keys.slice(0, 3).map((key) => JSON.stringify(key.slice(0, 40))).join(", ");
    got = keys.length === 0 ? "it arrived empty" : `it arrived as ${named}${keys.length > 3 ? ` and ${keys.length - 3} more` : ""}`;
  }
  return `Invalid plannotator_inbox call: its input could not be read as fields (${got}). Check the JSON quoting and call again: every field is its own key and every string value is in double quotes, e.g. {"action": "send_message", "body": "…", "supersedes": ["msg_…/q-…"]}. action is one of ${tools.map((tool) => tool.name).join(", ")}.`;
}
var INBOX_UNPARSED_INPUT_KEY = "__unparsedToolInput";
function unparsedInputOf(input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return null;
  const wrapper = input[INBOX_UNPARSED_INPUT_KEY];
  if (!wrapper || typeof wrapper !== "object")
    return null;
  const { raw, len } = wrapper;
  if (typeof raw !== "string")
    return null;
  return { raw, len: typeof len === "number" && Number.isFinite(len) && len > raw.length ? len : raw.length };
}
var INBOX_BARE_ID_RE = /^msg_[0-9A-HJKMNP-TV-Z]{26}(?:\/[aq]-[0-9a-f]{8}(?:-\d{1,3})?)?$/;
function jsonFailure(text) {
  let i = 0;
  let field = null;
  const ws = () => {
    while (i < text.length && /\s/.test(text[i]))
      i++;
  };
  const fail = (kind, at = i, token) => ({ at, kind, field, ...token ? { token } : {} });
  const str = () => {
    const start = i++;
    let out = "";
    while (i < text.length) {
      const c = text[i];
      if (c === '"') {
        i++;
        return out;
      }
      if (c === "\\")
        i++;
      else if (c < " ")
        return fail("unexpected", i);
      out += c;
      i++;
    }
    return fail("unterminated", start);
  };
  const value = () => {
    ws();
    const c = text[i];
    if (c === "{") {
      i++;
      ws();
      if (text[i] === "}")
        return i++, null;
      for (;; ) {
        ws();
        if (text[i] !== '"')
          return fail("unexpected");
        const key = str();
        if (typeof key !== "string")
          return key;
        ws();
        if (text[i] !== ":")
          return fail("unexpected");
        i++;
        const outer = field;
        field = key;
        const inner = value();
        if (inner)
          return inner;
        ws();
        if (text[i] !== "," && text[i] !== "}")
          return fail("unexpected");
        field = outer;
        if (text[i++] === "}")
          return null;
      }
    }
    if (c === "[") {
      i++;
      ws();
      if (text[i] === "]")
        return i++, null;
      for (;; ) {
        const inner = value();
        if (inner)
          return inner;
        ws();
        if (text[i] === ",") {
          i++;
          continue;
        }
        if (text[i] === "]")
          return i++, null;
        return fail("unexpected");
      }
    }
    if (c === '"') {
      const read = str();
      return typeof read === "string" ? null : read;
    }
    const literal = /^(?:-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null)(?![A-Za-z0-9_\/-])/.exec(text.slice(i));
    if (literal)
      return i += literal[0].length, null;
    const bare = /^[A-Za-z0-9_][A-Za-z0-9_.\/-]*/.exec(text.slice(i));
    return bare ? fail("bare", i, bare[0]) : fail("unexpected");
  };
  const failure = value();
  if (failure)
    return failure;
  ws();
  return i < text.length ? fail("unexpected") : null;
}
function spotOf(text, at, end) {
  const line = (part) => part.replace(/\s+/g, " ");
  return `${at > 20 ? "…" : ""}${line(text.slice(Math.max(0, at - 20), end))} ←`;
}
function readUnparsedInput(unparsed, tools) {
  const { raw, len } = unparsed;
  const actions = new Set([...tools.map((tool) => tool.name), ...INBOX_TOOL_ACTIONS]);
  const lists = new Set(tools.flatMap((tool) => Object.entries(propertiesOf(tool)).filter(([, schema]) => schema.type === "array").map(([name]) => name)));
  if (raw.length >= len) {
    let text = raw;
    const mended = [];
    for (let tries = 0;tries < 20; tries++) {
      const failure = jsonFailure(text);
      if (!failure)
        break;
      const token = failure.kind === "bare" ? failure.token : "";
      const id = INBOX_BARE_ID_RE.test(token);
      if (!id && !(failure.field === "action" && actions.has(token)))
        break;
      const inList = /\[\s*$/.test(text.slice(0, failure.at)) || /,\s*$/.test(text.slice(0, failure.at)) && mended.some((m) => m.field === failure.field);
      const quoted = JSON.stringify(token);
      const wrap = id && !inList && failure.field !== null && lists.has(failure.field);
      text = text.slice(0, failure.at) + (wrap ? `[${quoted}]` : quoted) + text.slice(failure.at + token.length);
      mended.push({ field: failure.field, value: wrap ? `[${quoted}]` : quoted });
    }
    if (!jsonFailure(text)) {
      const input = JSON.parse(text);
      if (input && typeof input === "object" && !Array.isArray(input)) {
        if (mended.length === 0)
          return { input };
        const fields = [...new Set(mended.map((m) => m.field ?? "a value"))].join(", ");
        const read = mended.map((m) => m.value).join(", ");
        return {
          input,
          note: `Your call's JSON had ${mended.length === 1 ? "an unquoted value" : "unquoted values"} (${fields}); ${mended.length === 1 ? "it was" : "they were"} read as ${read}. Quote every string value.`
        };
      }
    }
  }
  const failure = jsonFailure(raw);
  const prefix = "Invalid plannotator_inbox call: ";
  if (raw.length < len && (!failure || failure.at >= raw.length - 1 || failure.kind === "unterminated")) {
    const where = failure?.field ? `inside ${failure.field}` : "past what arrived";
    const what = failure?.field ?? "the long text";
    return {
      error: `${prefix}this call was ${len} characters and only the first ${raw.length} arrived readable; the JSON breaks ${where}. Check that quotes and backslashes inside ${what} are escaped, or send a shorter ${what} and attach the rest as a file.`
    };
  }
  if (!failure)
    return { error: inboxUnreadInputText({ [INBOX_UNPARSED_INPUT_KEY]: null }, tools) };
  if (failure.kind === "bare") {
    return { error: `${prefix}this call's JSON couldn't be read at character ${failure.at}: ${spotOf(raw, failure.at, failure.at + Math.min(failure.token.length, 20))} this value needs double quotes. Fix that spot and call again.` };
  }
  if (failure.kind === "unterminated") {
    return { error: `${prefix}this call's JSON couldn't be read at character ${failure.at}: ${spotOf(raw, failure.at, failure.at + 20)} this string never ends. Check that quotes and backslashes inside ${failure.field ?? "it"} are escaped, then call again.` };
  }
  const endedEarly = /"\s*$/.test(raw.slice(0, failure.at)) && /^[^\s,:}\]]/.test(raw.slice(failure.at));
  const why = endedEarly ? `the string before this spot ended early: a double quote inside ${failure.field ?? "a string"} needs a backslash (\\").` : "here.";
  return { error: `${prefix}this call's JSON couldn't be read at character ${failure.at}: ${spotOf(raw, failure.at, failure.at + 1)} ${why} Fix that spot and call again.` };
}
function inboxToolCall(input, tools, filled) {
  const unparsed = unparsedInputOf(input);
  if (unparsed) {
    const read = readUnparsedInput(unparsed, tools);
    if ("error" in read)
      return read;
    const call = inboxToolCall(read.input, tools, filled);
    if (!read.note)
      return call;
    return "error" in call ? { error: `${call.error} (${read.note})` } : { ...call, note: read.note };
  }
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: inboxUnreadInputText(input, tools) };
  const { action, ...rest } = input;
  if (action === INBOX_REMOVED_ACTION)
    return { error: INBOX_REMOVED_ACTION_TEXT };
  const tool = tools.find((candidate) => candidate.name === action);
  if (!tool) {
    if (inboxInputUnread(input, tools))
      return { error: inboxUnreadInputText(input, tools) };
    return {
      error: `Invalid plannotator_inbox call: action must be one of ${tools.map((candidate) => candidate.name).join(", ")}${typeof action === "string" && INBOX_TOOL_ACTIONS.includes(action) ? ` (this Plannotator Inbox has no ${action}; update Plannotator for it)` : ""}.`
    };
  }
  const own = propertiesOf(tool);
  const args = {};
  let projectPath;
  for (const [name, value] of Object.entries(rest)) {
    if (value === undefined)
      continue;
    if (name === INBOX_AGENT_PROJECT_PATH && name in own) {
      const refusal = inboxProjectPathShapeRefusal(value);
      if (refusal)
        return { error: `Invalid plannotator_inbox call: ${refusal}` };
      projectPath = value;
      continue;
    }
    if (!(name in own) || isFilled(name)) {
      const fields = Object.keys(own).filter((field) => !isFilled(field) || field === INBOX_AGENT_PROJECT_PATH);
      return { error: `Invalid plannotator_inbox call: ${tool.name} takes no "${name}" (its fields: ${fields.join(", ") || "none"}).` };
    }
    args[name] = value;
  }
  for (const name of INBOX_FILLED_ARGUMENTS)
    if (name in own)
      args[name] = filled[name];
  return projectPath === undefined ? { name: tool.name, arguments: args } : { name: tool.name, arguments: args, projectPath };
}
function inboxResultWithNote(text, note) {
  return note ? `${text}

${note}` : text;
}
var INBOX_TEXT_COMPLETE_META_KEY = "ai.plannotator/text-complete";
function inboxToolResultText(result) {
  const value = result && typeof result === "object" ? result : {};
  const text = Array.isArray(value.content) ? value.content.map((part) => part && typeof part === "object" && typeof part.text === "string" ? part.text : "").filter(Boolean).join(`
`) : "";
  const meta = value._meta && typeof value._meta === "object" ? value._meta : {};
  const complete = meta[INBOX_TEXT_COMPLETE_META_KEY] === true;
  const structured = !complete && value.structuredContent && typeof value.structuredContent === "object" ? `

${JSON.stringify(value.structuredContent)}` : "";
  return { text: `${text}${value.isError === true ? "" : structured}`.trim(), isError: value.isError === true };
}
function mcpAnswerOf(text) {
  const candidates = /^\s*(event:|data:|:)/m.test(text) ? text.split(/\r?\n\r?\n/).map((block) => block.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).replace(/^ /, "")).join(`
`)).filter((data) => data.trim()) : [text];
  for (const candidate of candidates) {
    try {
      const value = JSON.parse(candidate);
      if (value && typeof value === "object" && (("result" in value) || ("error" in value)))
        return value;
    } catch {}
  }
  return null;
}
var INBOX_MAX_REQUEST_BYTES = 128 * 1024 * 1024;
function inboxRequestTooLargeMessage(bytes) {
  const size = bytes === undefined ? "" : ` (${bytes} bytes)`;
  return `The message is too large for the Plannotator Inbox${size}: one request may carry at most ${INBOX_MAX_REQUEST_BYTES} bytes (128 MiB). Send a smaller message, or attach the content as a file.`;
}
function mcpAnswerOfResponse(status, text) {
  return mcpAnswerOf(text) ?? (status === 413 ? { error: { message: inboxRequestTooLargeMessage() } } : null);
}
function parseInboxRegistry(text) {
  if (!text)
    return null;
  try {
    const value = JSON.parse(text);
    if (value.v === 1 && typeof value.pid === "number" && typeof value.port === "number" && Number.isInteger(value.port) && value.port > 0 && value.port < 65536 && typeof value.token === "string" && value.token.length >= 32 && typeof value.serverSession === "string" && typeof value.url === "string") {
      return { pid: value.pid, port: value.port, token: value.token, serverSession: value.serverSession, url: value.url };
    }
  } catch {}
  return null;
}
var INBOX_TAGS_POLL_FIELD = "tags";
var INBOX_TAGGED_INSTRUCTION = "The person tagged you in a Plannotator Inbox thread that another session owns. Their reply follows as they wrote it; parts of it may be meant for the other session, not for you.";
function inboxTaggedLine(owner, id) {
  return `The thread belongs to another session (${owner}); you have not seen it. Read it first with read_thread (message_id ${id}). Answer only what is addressed to you, in the same thread: plannotator_inbox send_message with reply_to ${id}.`;
}
function inboxAlsoTaggedLine(names) {
  const list = names.length <= 1 ? names[0] ?? "another session" : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  return `This reply also tags ${list} (other sessions); each gets it too. Leave what is addressed to them to them.`;
}
var INBOX_ADDED_INSTRUCTION = "The person added you to a Plannotator Inbox thread that another session owns: you work on it alongside that session, and their later replies in it come to you too. Their reply follows as they wrote it; parts of it may be meant for the other session.";
function inboxAddedLine(owner, id) {
  return `The thread's owner is ${owner}. If you have not read the thread yet, read it first with read_thread (message_id ${id}). Answer your part in the same thread: plannotator_inbox send_message with reply_to ${id}.`;
}
var INBOX_HANDOFF_INSTRUCTION = "The person handed you this Plannotator Inbox thread: it is yours now, and their later replies in it come to you. Their reply follows as they wrote it.";
function inboxHandoffLine(from, id) {
  return `Another session (${from}) had this thread before; you have not seen it. Read it first with read_thread (message_id ${id}), then answer in it: plannotator_inbox send_message with reply_to ${id}.`;
}
function inboxHandedAwayLine(to) {
  return `The person handed this thread to another session (${to}); their later replies in it go there. Stop work on it, and write in it only if they ask you to.`;
}
var INBOX_WAKE_AGENT_NAMES = ["Claude Code", "Pi", "OpenCode", "Codex", "Cursor", "Grok Build", "Qwen Code"];
function wakeName(value) {
  if (typeof value !== "string")
    return "";
  const name = value.replace(/[\u0000-\u001f\u007f-\u009f\s]+/g, " ").trim();
  return INBOX_WAKE_AGENT_NAMES.includes(name) ? name : "";
}
var INBOX_SEND_NOW_POLL_FIELD = "send_now";
var INBOX_STEER_POLLS_POLL_FIELD = "steer_polls";
function parseInboxBridgeCommands(text) {
  try {
    const body = JSON.parse(text);
    if (!Array.isArray(body.commands))
      return [];
    return body.commands.filter((command) => {
      if (!command || typeof command !== "object")
        return false;
      const c = command;
      return (c.type === "reply" || c.type === "message") && typeof c.id === "string" && typeof c.thread_id === "string" && typeof c.body === "string";
    });
  } catch {
    return [];
  }
}
var INBOX_WAKE_INSTRUCTION = "This is a user reply from Plannotator Inbox. Their reply follows as they wrote it: it is their answer to you. When they need to hear back, answer in the same thread: plannotator_inbox send_message with reply_to set to the id in parentheses on the line above.";
var INBOX_REASK_INSTRUCTION = "The person asked, from the Plannotator Inbox, for the open questions in this thread to be asked again, together in one new message. The questions and what to do with each follow. Answer in the same thread: plannotator_inbox send_message with reply_to set to the id in parentheses on the line above.";
var reaskWords = (items) => items === "actions" ? { what: "open action items", they: "The action items" } : items === "both" ? { what: "open questions and action items", they: "They" } : { what: "open questions", they: "The questions" };
function inboxReaskInstruction(items, one = false) {
  if (one && items !== "both") {
    const what = items === "actions" ? "action item" : "question";
    return `The person asked, from the Plannotator Inbox, for the open ${what} in this thread to be asked again, in one new message. The ${what} and what to do with it follow. Answer in the same thread: plannotator_inbox send_message with reply_to set to the id in parentheses on the line above.`;
  }
  if (items !== "actions" && items !== "both")
    return INBOX_REASK_INSTRUCTION;
  const { what, they } = reaskWords(items);
  return `The person asked, from the Plannotator Inbox, for the ${what} in this thread to be asked again, together in one new message. ${they} and what to do with each follow. Answer in the same thread: plannotator_inbox send_message with reply_to set to the id in parentheses on the line above.`;
}
function inboxReaskRedirectedLine(asker, id, items, one = false) {
  if (one && items !== "both") {
    const what = items === "actions" ? "This action item" : "This question";
    return `${what} was asked by another ${asker} session, which has ended; the person picked you to take it over. Read the thread first with read_thread (message_id ${id}), then ask it again as below if it is still needed.`;
  }
  const these = items === "actions" ? "These action items" : items === "both" ? "These questions and action items" : "These questions";
  return `${these} were asked by another ${asker} session, which has ended; the person picked you to take them over. Read the thread first with read_thread (message_id ${id}), then ask the ones still needed again as below.`;
}
var INBOX_MESSAGE_INSTRUCTION = "The person wrote to you from the Plannotator Inbox. Their message follows as they wrote it: it is from them, not from the Inbox. When they need to hear back, answer in the same thread: plannotator_inbox send_message with reply_to set to the id in parentheses on the line above.";
var INBOX_NEW_THREAD_INSTRUCTION = "The person started a new thread with you in the Plannotator Inbox: an idea or a request of their own, not an answer to something you asked. Their message follows as they wrote it. It may be unrelated to what you were doing; say how you will handle it before you start. When they need to hear back, answer in the same thread: plannotator_inbox send_message with reply_to set to the id in parentheses on the line above.";
var INBOX_NAME_THREAD_LINE = "Name this thread in your reply: pass `thread` with a few words saying what it is about. The first name you give sets it, once.";
function inboxContinuesLine(id) {
  return `This continues a thread the person started with another session; you have not seen it. Read it first with read_thread (message_id ${id}), then answer in it with reply_to ${id}.`;
}
function inboxRedirectedLine(asker, id) {
  return `This reply was written to another ${asker} session that has ended. Read the thread with read_thread to see what it asked, then answer with reply_to ${id}.`;
}
function inboxAckReaction(value) {
  const thumbs = { emoji: "\uD83D\uDC4D", label: "Looks good" };
  if (!value || typeof value !== "object")
    return thumbs;
  const { emoji, label } = value;
  if (typeof emoji !== "string" || emoji.length === 0 || emoji.length > 16 || !/\p{Extended_Pictographic}|\p{Regional_Indicator}|\u20e3/u.test(emoji) || /[\s\p{Cc}\p{Cf}]/u.test(emoji.replace(/[\u200d\ufe0f\u{e0020}-\u{e007f}]/gu, "")))
    return thumbs;
  const text = typeof label === "string" ? label.replace(/[\p{Cc}\p{Zl}\p{Zp}]/gu, " ").replace(/(?!\u200d)\p{Cf}/gu, "").replace(/\s+/g, " ").trim() : "";
  const name = [...text].slice(0, 24).join("").trim();
  if (!name && emoji === "\uD83D\uDC4D")
    return thumbs;
  return { emoji, label: name };
}
function inboxAckLine(messageId, reaction) {
  const picked = inboxAckReaction(reaction);
  return `The person reacted ${picked.emoji}${picked.label ? ` ${picked.label}` : ""} to your message (${messageId}).`;
}
function wakeThreadId(value) {
  return typeof value === "string" && /^msg_[0-9A-Za-z]{1,64}$/.test(value) ? value : "";
}
var INBOX_WAKE_CLOSING_LINE = "[for context: read_thread (opt: set limit) or search · help: plannotator inbox --help]";
function inboxWakeAgo(at, now) {
  const then = typeof at === "string" ? Date.parse(at) : Number.NaN;
  if (!Number.isFinite(then))
    return "";
  const minutes = Math.floor((now - then) / 60000);
  if (minutes < 1)
    return "just now";
  if (minutes < 2)
    return "a minute ago";
  if (minutes < 60)
    return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 2)
    return "an hour ago";
  if (hours < 24)
    return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return days < 2 ? "a day ago" : `${days} days ago`;
}
var wakeCount = (value) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
var wakePlural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
function inboxWakeDetailsLine(threadId, context, options) {
  const thread = wakeThreadId(threadId);
  if (!thread || !context || typeof context !== "object")
    return "";
  const { messages, open_questions, open_actions, last_agent_at } = context;
  const count = wakeCount(messages);
  const questions = wakeCount(open_questions);
  const actions = wakeCount(open_actions);
  if (count === null || questions === null || actions === null)
    return "";
  const open = [];
  if (questions > 0)
    open.push(`${wakePlural(questions, "question")} open${options.reask ? "" : `, don't re-ask ${questions === 1 ? "it" : "them"}`}`);
  if (actions > 0)
    open.push(`${wakePlural(actions, "action item")} open`);
  const state = open.join(", ") || (options.queued ? "" : "nothing open");
  const ago = inboxWakeAgo(last_agent_at, options.now);
  return `[Thread ${thread}: ${wakePlural(count, "message")}${state ? `, ${state}` : ""}${ago ? `. Your last message was ${ago}` : ""}]`;
}
function wakeQuote(value) {
  if (typeof value !== "string")
    return "";
  const flat = value.replace(/[\p{Cc}\p{Cs}\p{Zl}\p{Zp}]+/gu, " ").replace(/\p{Cf}+/gu, "").replace(/[[\]]/g, "").replace(/"/g, "'").replace(/\s+/g, " ").trim();
  const chars = [...flat];
  return chars.length > 120 ? `${chars.slice(0, 120).join("").trimEnd()}…` : flat;
}
function inboxWakeReplyingLine(target, now) {
  if (!target || typeof target !== "object")
    return "";
  const { id, at, quote, questions, actions } = target;
  const message = wakeThreadId(id);
  const ago = inboxWakeAgo(at, now);
  if (!message || !ago)
    return "";
  const head = `Replying to your message from ${ago} (${message})`;
  const words = wakeQuote(quote);
  if (words)
    return `[${head}: "${words}"]`;
  const asked = [];
  if ((wakeCount(questions) ?? 0) > 0)
    asked.push(wakePlural(questions, "question"));
  if ((wakeCount(actions) ?? 0) > 0)
    asked.push(wakePlural(actions, "action item"));
  return `[${head}${asked.length > 0 ? `, with ${asked.join(" and ")}` : ""}]`;
}
function inboxWakeCommand(command) {
  if (!command.context || typeof command.context !== "object")
    return command;
  const { still_open_line: line, still_open_at: at, ...context } = command.context;
  if (typeof line !== "string" || line === "")
    return command;
  if (!inboxWakeDetailsLine(command.thread_id, context, { now: 0 }) || !wakeCount(context.open_questions))
    return { ...command, context };
  if (typeof at !== "number" || !Number.isSafeInteger(at) || at < 0 || !command.body.startsWith(line, at))
    return { ...command, context };
  const end = at + line.length;
  const alone = (at === 0 || command.body.slice(at - 2, at) === `

`) && (end === command.body.length || command.body.slice(end, end + 2) === `

`);
  if (!alone)
    return { ...command, context };
  const body = [command.body.slice(0, Math.max(0, at - 2)), command.body.slice(end + 2)].filter((part) => part !== "").join(`

`);
  return { ...command, context, body: body === "" ? command.body : body };
}
function inboxWakeText(command, now = Date.now(), wording = {}) {
  if (command.tidy === true) {
    return `Plannotator Inbox: ${(command.subject ?? "").replace(/\s+/g, " ").trim() || "Tidy"} (${command.id})
${command.body}

${INBOX_WAKE_CLOSING_LINE}`;
  }
  if (typeof command.ack_of === "string" && command.ack_of !== "") {
    const ackSubject = (command.subject ?? "").replace(/\s+/g, " ").trim() || "a message";
    const thread = wakeThreadId(command.thread_id);
    return `Plannotator Inbox: ${ackSubject} (${command.id})
${inboxAckLine(command.ack_of, command.ack_reaction)}${thread ? `

[thread ${thread}]` : ""}`;
  }
  const steps = wakeSteps(command.steps);
  const pulls = wakePullsChanged(command.pulls_changed);
  const stepsLine = steps ? inboxStepsWakeLine(steps) : command.steps_start === true ? INBOX_STEPS_START_WAKE_LINE : "";
  const closing = `${pulls ? `

${inboxPullsWakeLine(pulls)}` : ""}${stepsLine ? `

${stepsLine}` : ""}

${INBOX_WAKE_CLOSING_LINE}`;
  const { body, context } = inboxWakeCommand(command);
  const details = inboxWakeDetailsLine(command.thread_id, context, { now, reask: command.reask === true, queued: wording.queued === true });
  const target = details ? inboxWakeReplyingLine(context.replying_to, now) : "";
  const thread = wakeThreadId(command.thread_id);
  const facts = details ? `
${details}${target ? `
${target}` : ""}` : thread ? `
[Thread ${thread}]` : "";
  const subject = (command.subject ?? "").replace(/\s+/g, " ").trim() || (command.type === "message" ? "a message" : "a reply");
  if (command.handed_away && typeof command.handed_away === "object") {
    const to = wakeName(command.handed_away.to) || "another agent";
    return `Plannotator Inbox: ${subject} (${command.id})
${inboxHandedAwayLine(to)}${facts}${closing}`;
  }
  if (command.handoff && typeof command.handoff === "object") {
    const from = wakeName(command.handoff.from) || "another agent";
    return `Plannotator Inbox: ${subject} (${command.id})
${INBOX_HANDOFF_INSTRUCTION}
${inboxHandoffLine(from, command.id)}${facts}

${body}${closing}`;
  }
  if (command.tagged && typeof command.tagged === "object") {
    const owner = wakeName(command.tagged.owner) || "another agent";
    if (command.added === true) {
      return `Plannotator Inbox: ${subject} (${command.id})
${INBOX_ADDED_INSTRUCTION}
${inboxAddedLine(owner, command.id)}${facts}

${body}${closing}`;
    }
    return `Plannotator Inbox: ${subject} (${command.id})
${INBOX_TAGGED_INSTRUCTION}
${inboxTaggedLine(owner, command.id)}${facts}

${body}${closing}`;
  }
  const others = Array.isArray(command.also_tagged) ? command.also_tagged.filter((name) => typeof name === "string" && name.trim() !== "").map((name) => wakeName(name) || "another agent").slice(0, 8) : [];
  const also = others.length > 0 ? `
${inboxAlsoTaggedLine(others)}` : "";
  const reaskItems = command.reask_items === "actions" || command.reask_items === "both" ? command.reask_items : undefined;
  const reaskOne = command.reask_one === true;
  const instruction = command.type === "message" ? command.new_thread === true ? INBOX_NEW_THREAD_INSTRUCTION : INBOX_MESSAGE_INSTRUCTION : command.reask === true ? inboxReaskInstruction(reaskItems, reaskOne) : INBOX_WAKE_INSTRUCTION;
  const asker = command.type !== "message" && typeof command.redirected_from === "string" && command.redirected_from.trim() !== "" ? wakeName(command.redirected_from) || "agent" : "";
  const redirected = asker ? `
${command.reask === true ? inboxReaskRedirectedLine(asker, command.id, reaskItems, reaskOne) : inboxRedirectedLine(asker, command.id)}` : command.continues_thread === true ? `
${inboxContinuesLine(command.id)}` : "";
  const naming = command.name_thread === true ? `
${INBOX_NAME_THREAD_LINE}` : "";
  return `Plannotator Inbox: ${subject} (${command.id})
${instruction}${redirected}${also}${naming}${facts}

${body}${closing}`;
}

// ../../packages/shared/config.ts
function getConfigDir() {
  return getPlannotatorDataDir();
}
function getConfigPath() {
  return join2(getConfigDir(), "config.json");
}
function loadConfig(options = {}) {
  try {
    const configPath = getConfigPath();
    if (!existsSync2(configPath))
      return {};
    const raw = readFileSync(configPath, "utf-8").replace(/^\uFEFF/, "");
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : {};
  } catch (e) {
    if (!options.quiet)
      process.stderr.write(`[plannotator] Warning: failed to read config.json: ${e}
`);
    return {};
  }
}
function parseConfigBoolean(value) {
  if (typeof value === "boolean")
    return value;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (v === "true" || v === "1")
      return true;
    if (v === "false" || v === "0")
      return false;
  }
  return;
}
var AGENT_TOOL_DEFAULTS = {
  "claude-code": true,
  pi: false,
  "oh-my-pi": true,
  opencode: false,
  dsh: false
};
function parseAgentToolEnv(env = process.env) {
  const v = env.PLANNOTATOR_AGENT_TOOL?.trim().toLowerCase();
  if (v === "1" || v === "true" || v === "on")
    return true;
  if (v === "0" || v === "false" || v === "off" || v === "disabled")
    return false;
  return;
}
function resolveAgentTool(config, env, host) {
  return parseAgentToolEnv(env) ?? parseConfigBoolean(config.agentTool) ?? AGENT_TOOL_DEFAULTS[host];
}
var INBOX_TOOL_DEFAULTS = {
  "claude-code": AGENT_TOOL_DEFAULTS["claude-code"],
  pi: AGENT_TOOL_DEFAULTS.pi,
  opencode: AGENT_TOOL_DEFAULTS.opencode,
  dsh: AGENT_TOOL_DEFAULTS.dsh,
  cline: false
};
var INBOX_REMINDER_HOSTS = ["claude-code", "pi", "opencode"];
function parseInboxToolEnv(env = process.env) {
  const v = env.PLANNOTATOR_INBOX_TOOL?.trim().toLowerCase();
  if (v === "1" || v === "true" || v === "on")
    return true;
  if (v === "0" || v === "false" || v === "off" || v === "disabled")
    return false;
  return;
}
function configuredInboxTool(config, host) {
  const value = config.inboxTool;
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return parseConfigBoolean(value[host]);
  }
  return parseConfigBoolean(value);
}
function resolveInboxTool(config, env, host) {
  return parseInboxToolEnv(env) ?? configuredInboxTool(config, host) ?? INBOX_TOOL_DEFAULTS[host];
}
function configuredInboxReminder(config, host) {
  const value = config.inboxReminder;
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return parseConfigBoolean(value[host]);
  }
  return parseConfigBoolean(value);
}
function resolveInboxReminder(config, env, host) {
  return INBOX_REMINDER_HOSTS.includes(host) && resolveInboxTool(config, env, host) && (configuredInboxReminder(config, host) ?? true);
}
function resolveInboxReminderText(config, host, options = {}) {
  return inboxReminderFor(inboxReminderCustomText(config, host), options.toolName ?? INBOX_TOOL_NAME, { wakes: options.wakes });
}
function resolveSharingEnabled(config, env = process.env) {
  const envVal = env.PLANNOTATOR_SHARE;
  if (envVal !== undefined)
    return envVal !== "disabled";
  if (config.share !== undefined)
    return config.share !== "disabled";
  return true;
}
var warnedInvalidGuideShareUrls = new Set;
var warnedInvalidPublicUrls = new Set;
var warnedInvalidUrlHosts = new Set;
var warnedBitbucketApiUrls = new Set;

// ../../packages/shared/improvement-hooks.ts
import { join as join3 } from "path";
import { readFileSync as readFileSync2, statSync as statSync2 } from "fs";
function hooksBaseDir() {
  return join3(getPlannotatorDataDir(), "hooks");
}
var MAX_FILE_SIZE = 50 * 1024;
var KNOWN_HOOKS = {
  "enterplanmode-improve": {
    path: "compound/enterplanmode-improve-hook.txt",
    legacyPath: "compound/enterplanmode-improve-hook.txt"
  }
};
function fileExists(path) {
  try {
    statSync2(path);
    return true;
  } catch {
    return false;
  }
}
function tryReadHookFile(filePath, hookName) {
  try {
    const stat = statSync2(filePath);
    if (!stat.isFile() || stat.size === 0 || stat.size > MAX_FILE_SIZE)
      return null;
    const content = readFileSync2(filePath, "utf-8").trim();
    if (!content)
      return null;
    return { content, hookName, filePath };
  } catch {
    return null;
  }
}
function readImprovementHook(hookName) {
  const entry = KNOWN_HOOKS[hookName];
  if (!entry)
    return null;
  const newPath = join3(hooksBaseDir(), entry.path);
  if (fileExists(newPath)) {
    return tryReadHookFile(newPath, hookName);
  }
  const legacyFilePath = join3(getPlannotatorDataDir(), entry.legacyPath);
  return tryReadHookFile(legacyFilePath, hookName);
}

// ../../packages/shared/pfm-reminder.ts
function composeImproveContext(input) {
  const sections = [];
  if (input.pfmEnabled) {
    sections.push(PFM_REMINDER);
  }
  if (input.improvementHookContent) {
    sections.push([
      "[Plannotator Improvement Hook]",
      "The following corrective instructions were generated from analysis of previous plan denial patterns.",
      `Apply these guidelines when writing your plan:
`,
      input.improvementHookContent
    ].join(`
`));
  }
  if (sections.length === 0)
    return null;
  return sections.join(`

---

`);
}
var PFM_REMINDER = `[Plannotator Flavored Markdown]
This plan will be reviewed in Plannotator, which renders GitHub Flavored Markdown plus the extensions below. Use these features when they make the plan clearer for the reviewer — don't force them in for their own sake.

Code-file links (highest leverage)
Reference real source files inline. Plannotator validates the path and renders a clickable badge that opens the file in the reviewer's editor — prefer this over pasting code when you just need to point at something.
  \`packages/server/index.ts\`            backticked path
  \`packages/server/index.ts:42\`         path with line number
  \`packages/server/index.ts:10-20\`      line range — hover shows a code snippet preview
  [the handler](packages/server/index.ts:42)  markdown link form
Ambiguous paths (e.g. \`index.ts\`) still render and open a picker.

Callouts and alerts
GitHub-style alerts highlight critical context:
  > [!NOTE]      general callout
  > [!TIP]       suggestion
  > [!WARNING]   watch out
  > [!CAUTION]   risk
  > [!IMPORTANT] must-read
Or use directive containers for richer blocks:
  :::tip
  Body with **inline markdown**.
  :::

Tables
Pipe tables are interactive — the reviewer can copy as Markdown/CSV from a hover toolbar, or expand to a sortable, filterable popout. Reach for them for comparisons, files-to-change lists, or risk summaries.

Task lists
Use \`- [ ]\` and \`- [x]\` for actionable steps the reviewer (or a follow-up agent) can tick off.

Diagrams
Code fences with \`mermaid\` or \`graphviz\` render as live diagrams. Useful for flow, state, sequence, or architecture sketches.

Questions for the reviewer
When a decision needs the reviewer, ask it as a question block. They answer in place, and the answers come back at the top of their feedback. Never send a bare question: give one to three plain sentences on what it affects and why you recommend what you do, and a screenshot (\`![alt](path)\`) if it is visual. Ask only what you cannot decide alone, about 8 at most per round. \`:::question-multi\` picks any number, \`:::question-text\` asks for free text. \`- [x]\` marks a choice as settled: use it when you resubmit with an answered question.
  :::question
  Which cache backend?

  Two app servers will run soon, and an in-memory cache would give each its own copy. Redis keeps one shared copy.

  - [ ] Redis — shared across instances
  - [ ] In-memory — simplest, lost on restart

  Recommended: Redis
  :::

Other extras
  - Wiki-links: [[architecture]] auto-resolves to .md docs in the workspace
  - Hex color swatches: #1a2bcc renders as a small color chip
  - @username and #123 link to GitHub when a repo is detected
  - A small set of emoji shortcodes is supported (:rocket:, :warning:, :white_check_mark:, ...)

Plain prose is always fine. The point is: prefer code-file links over copy-pasted snippets, and reach for callouts or tables when structure makes the plan easier to scan.`;

// plan-mode.ts
var OPENCODE_PLAN_DIRECTORY = /\.opencode[\\/]plans?(?![a-z0-9_-])/;
function shouldStripPlanModeLine(line, options) {
  const normalized = line.trim().toLowerCase();
  if (normalized.includes("strictly forbidden: any file edits") || normalized.includes("your plan at ") || normalized.includes("plan file already exists at ") || normalized.includes(".opencode/plans/") || normalized.includes("plan_exit") || normalized.includes("agent's conversation") && normalized.includes("not on disk"))
    return true;
  if (!options.openCode2)
    return false;
  return normalized.includes("discuss the plan with the user directly") || normalized.includes("do not create or update plan files") || OPENCODE_PLAN_DIRECTORY.test(normalized);
}
function cleanupSystemEntry(entry) {
  return entry.split(`
`).map((line) => line.replace(/[ \t]+$/g, "")).join(`
`).replace(/\n{3,}/g, `

`).trim();
}
function stripConflictingPlanModeRules(systemEntries, options = {}) {
  return systemEntries.map((entry) => cleanupSystemEntry(entry.split(`
`).filter((line) => !shouldStripPlanModeLine(line, options)).join(`
`))).filter(Boolean);
}
function composeSystemPrompt(system, additions) {
  return [system.concat(additions).map((s) => s.trim()).filter(Boolean).join(`

`)];
}

// plan-reminder.ts
var STRICT_PLAN_REMINDER_REPLACEMENT = `<system-reminder>
# Plan Mode - System Reminder

CRITICAL: Plan mode ACTIVE. You are in a PLANNING phase. The ONLY file modifications
allowed are writing or editing markdown files (.md) - plans, specs, documentation, etc.
All other file edits, code modifications, and system changes are STRICTLY FORBIDDEN.
Do NOT use shell commands to manipulate non-markdown files. Commands may ONLY read/inspect.

Use submit_plan to submit the completed plan for user review. Do not proceed with
implementation until the plan is approved.
</system-reminder>`;
var WRAPPER_START = "<system-reminder>";
var WRAPPER_END = "</system-reminder>";
var PLAN_DIRECTORY_LINE = /^\S.*[\\/]\.opencode[\\/]plans?[\\/]?$/;
function wrapped(text) {
  const trimmed = text.trim();
  return trimmed.startsWith(WRAPPER_START) && trimmed.endsWith(WRAPPER_END);
}
function isOpenCode2PlanReminder(text) {
  if (!wrapped(text))
    return false;
  if (/\bno longer in plan mode\b/i.test(text))
    return false;
  return /\byou are in plan mode\b/i.test(text);
}
function planDirectoryOf(text) {
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (PLAN_DIRECTORY_LINE.test(trimmed))
      return trimmed;
  }
  return;
}
function openCode2PlanReminder(directory) {
  const saveRule = directory ? `

If the user explicitly asks you to save a plan file, write it only in:
${directory}` : "";
  return `${WRAPPER_START}
# Plan Mode - System Reminder

Plan mode is active. Explore and read the codebase, ask the user when you need their input, and work out the plan. Do not modify files, and do not ask a subagent to.

When the plan is ready, submit it with the submit_plan tool: it opens Plannotator's review, where the user approves the plan or asks for changes. submit_plan keeps its own copy of the plan, so it is not a plan file you create, and it is always allowed in Plan mode. Submit the plan with submit_plan rather than only writing it out in the conversation.${saveRule}

Do not implement changes until the plan is approved. If the user asks you to implement before then, tell them to approve the plan in Plannotator or switch agents.
${WRAPPER_END}`;
}
function planReminderReplacement(text) {
  if (isOpenCode2PlanReminder(text))
    return openCode2PlanReminder(planDirectoryOf(text));
  if (wrapped(text) && text.includes("STRICTLY FORBIDDEN"))
    return STRICT_PLAN_REMINDER_REPLACEMENT;
  return;
}
function replacePlanModeReminders(messages) {
  for (const message of messages) {
    if (!message || typeof message !== "object" || Reflect.get(message, "role") !== "user")
      continue;
    const content = Reflect.get(message, "content");
    if (!Array.isArray(content))
      continue;
    for (const part of content) {
      if (!part || typeof part !== "object" || Reflect.get(part, "type") !== "text")
        continue;
      const text = Reflect.get(part, "text");
      if (typeof text !== "string")
        continue;
      const replacement = planReminderReplacement(text);
      if (replacement !== undefined && replacement !== text)
        Reflect.set(part, "text", replacement);
    }
  }
}

// workflow.ts
var WORKFLOWS = new Set(["manual", "user-managed", "plan-agent", "all-agents"]);
var RUNTIMES = new Set(["auto", "embedded", "cli"]);
var DEFAULT_WORKFLOW = "plan-agent";
var DEFAULT_RUNTIME = "auto";
var BUILTIN_PLAN_AGENT = "plan";
function normalizeWorkflowOptions(rawOptions) {
  const rawWorkflow = typeof rawOptions?.workflow === "string" ? rawOptions.workflow.trim() : "";
  const workflow = WORKFLOWS.has(rawWorkflow) ? rawWorkflow : DEFAULT_WORKFLOW;
  const planningAgents = normalizePlanningAgents(rawOptions?.planningAgents);
  const runtime = normalizeRuntime(rawOptions?.runtime);
  return {
    workflow,
    planningAgents,
    planningAgentSet: new Set(planningAgents),
    runtime
  };
}
function normalizeRuntime(value) {
  const rawRuntime = typeof value === "string" ? value.trim() : "";
  return RUNTIMES.has(rawRuntime) ? rawRuntime : DEFAULT_RUNTIME;
}
function normalizePlanningAgents(value) {
  const seen = new Set;
  const agents = [BUILTIN_PLAN_AGENT];
  seen.add(BUILTIN_PLAN_AGENT);
  if (!Array.isArray(value))
    return agents;
  for (const item of value) {
    if (typeof item !== "string")
      continue;
    const trimmed = item.trim();
    if (!trimmed || seen.has(trimmed))
      continue;
    seen.add(trimmed);
    agents.push(trimmed);
  }
  return agents;
}
function isPlanningAgent(agentName, options) {
  return !!agentName && options.planningAgentSet.has(agentName);
}
function shouldStartImplementationForAgent(agentName, options) {
  return !!agentName && !isPlanningAgent(agentName, options);
}
function shouldRegisterSubmitPlan(options) {
  return options.workflow !== "manual";
}
function shouldModifyPrompts(options) {
  return options.workflow !== "manual" && options.workflow !== "user-managed";
}
function shouldInjectFullPlanningPrompt(agentName, options) {
  return shouldModifyPrompts(options) && isPlanningAgent(agentName, options);
}
function shouldInjectGenericPlanReminder(agentName, isSubagent, options) {
  if (options.workflow !== "all-agents")
    return false;
  if (!agentName || isSubagent)
    return false;
  if (agentName === "build")
    return false;
  return !isPlanningAgent(agentName, options);
}
function shouldRejectSubmitPlanForAgent(agentName, options) {
  return options.workflow === "plan-agent" && !isPlanningAgent(agentName, options);
}

// cli-bridge.ts
import { spawn as spawn2 } from "node:child_process";
import { existsSync as existsSync6, readFileSync as readFileSync4, rmSync as rmSync2, statSync as statSync6 } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomBytes, randomUUID as randomUUID2 } from "node:crypto";

// ../../packages/ai/session-bridge-pull.ts
var SESSION_BRIDGE_POLL_PATH = "/api/ai/bridge/poll";
var SESSION_BRIDGE_EVENT_PATH = "/api/ai/bridge/event";
var SESSION_BRIDGE_TOKEN_ENV = "PLANNOTATOR_SESSION_BRIDGE_TOKEN";
var SESSION_BRIDGE_HOST_ENV = "PLANNOTATOR_SESSION_BRIDGE_HOST";
var SESSION_BRIDGE_MODES_ENV = "PLANNOTATOR_SESSION_BRIDGE_MODES";
var STATUSES = new Set(["ready", "busy", "blocked", "gone"]);
var ERROR_CODES = new Set(["busy", "blocked", "gone", "aborted", "failed", "taken_over"]);
var BRIDGE_HOSTS = new Set(["pi", "opencode", "claude-code", "t3"]);

// ../../packages/ai/session-bridge-pull-client.ts
var TAKEN_OVER_FALLBACK_NOTE = "Another message entered this session while it was answering, so the rest of the reply went to that message.";
function takenOverFallback(streamed, message) {
  const note = `_${(message || TAKEN_OVER_FALLBACK_NOTE).trim()}_`;
  const delta = streamed ? `

${note}` : note;
  return { delta, answer: `${streamed}${delta}` };
}
function sleep(ms, signal) {
  return new Promise((resolve) => {
    if (signal.aborted)
      return resolve();
    const timer = setTimeout(done, ms);
    function done() {
      clearTimeout(timer);
      signal.removeEventListener("abort", done);
      resolve();
    }
    signal.addEventListener("abort", done, { once: true });
  });
}
function readStatus(bridge) {
  try {
    return bridge.status();
  } catch {
    return "gone";
  }
}
async function runPullSessionBridgeClient(options) {
  const doFetch = options.fetch ?? fetch;
  const base = options.baseUrl.replace(/\/+$/, "");
  const pollWaitMs = options.pollWaitMs ?? 25000;
  const maxFailures = options.maxFailures ?? 6;
  const deltaFlushMs = options.deltaFlushMs ?? 40;
  const { bridge, signal } = options;
  const log = options.log ?? (() => {});
  const headers = { "content-type": "application/json", authorization: `Bearer ${options.token}` };
  const asks = new Map;
  const interrupts = new Set;
  let stopped = false;
  let serverTakesTakenOver = false;
  let outbox = [];
  let sending = Promise.resolve();
  let flushTimer = null;
  const post = async (events) => {
    if (events.length === 0)
      return;
    try {
      const res = await doFetch(`${base}${SESSION_BRIDGE_EVENT_PATH}`, {
        method: "POST",
        headers,
        body: JSON.stringify(events.length === 1 ? events[0] : { events })
      });
      if (res.status === 409) {
        for (const event of events) {
          if ("askId" in event)
            stopAsk(event.askId);
        }
      }
      await res.body?.cancel().catch(() => {});
    } catch (error) {
      log(`[Plannotator] Session bridge event failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  const flushOutbox = () => {
    if (flushTimer)
      clearTimeout(flushTimer);
    flushTimer = null;
    const batch = outbox;
    outbox = [];
    sending = sending.then(() => post(batch));
    return sending;
  };
  const emit = (event, immediate = true) => {
    const last = outbox[outbox.length - 1];
    if (event.type === "delta" && last?.type === "delta" && last.askId === event.askId) {
      last.text += event.text;
    } else {
      outbox.push(event.type === "delta" ? { ...event } : event);
    }
    if (immediate)
      flushOutbox();
    else if (!flushTimer)
      flushTimer = setTimeout(() => void flushOutbox(), deltaFlushMs);
  };
  const stopAsk = (askId) => {
    const ask = asks.get(askId);
    if (ask && !ask.finished)
      ask.controller.abort();
  };
  const runAsk = (command) => {
    if (asks.has(command.askId))
      return;
    const controller = new AbortController;
    const ask = { controller, finished: false, text: "" };
    asks.set(command.askId, ask);
    emit({ type: "started", askId: command.askId });
    const finish = (event) => {
      if (ask.finished)
        return;
      ask.finished = true;
      emit(event);
    };
    try {
      bridge.ask({ askId: command.askId, text: command.text, mode: command.mode }, {
        delta: (text) => {
          if (ask.finished || !text)
            return;
          ask.text += text;
          emit({ type: "delta", askId: command.askId, text }, false);
        },
        tool: (name) => {
          if (!ask.finished && name)
            emit({ type: "tool", askId: command.askId, name });
        },
        done: (answer) => finish({ type: "done", askId: command.askId, answer }),
        error: (code, message) => {
          if (code === "taken_over" && !serverTakesTakenOver) {
            if (ask.finished)
              return;
            const fallback = takenOverFallback(ask.text, message);
            emit({ type: "delta", askId: command.askId, text: fallback.delta }, false);
            finish({ type: "done", askId: command.askId, answer: fallback.answer });
            return;
          }
          finish({ type: "error", askId: command.askId, code, ...message ? { message } : {} });
        }
      }, controller.signal);
    } catch (error) {
      finish({ type: "error", askId: command.askId, code: "failed", message: error instanceof Error ? error.message : String(error) });
    }
  };
  const runInterrupt = async (interruptId) => {
    if (interrupts.has(interruptId))
      return;
    interrupts.add(interruptId);
    if (!bridge.interrupt) {
      emit({ type: "interrupted", interruptId, ok: false, message: "This session cannot be interrupted." });
      return;
    }
    if (readStatus(bridge) === "gone") {
      emit({ type: "interrupted", interruptId, ok: false, message: "The session is no longer available." });
      return;
    }
    try {
      await bridge.interrupt();
      emit({ type: "interrupted", interruptId, ok: true });
    } catch (error) {
      emit({ type: "interrupted", interruptId, ok: false, message: error instanceof Error ? error.message : String(error) });
    }
  };
  const handleCommand = (command) => {
    switch (command.type) {
      case "ask":
        runAsk(command);
        break;
      case "cancel": {
        const ask = asks.get(command.askId);
        if (!ask) {
          emit({ type: "error", askId: command.askId, code: "aborted" });
        } else if (ask.finished) {
          emit({ type: "error", askId: command.askId, code: "aborted" });
        } else {
          ask.controller.abort();
        }
        break;
      }
      case "interrupt":
        runInterrupt(command.interruptId);
        break;
    }
  };
  let lastStatus = readStatus(bridge);
  const statusTimer = setInterval(() => {
    const status = readStatus(bridge);
    if (status === lastStatus)
      return;
    lastStatus = status;
    emit({ type: "status", status });
  }, options.statusIntervalMs ?? 500);
  statusTimer.unref?.();
  let failures = 0;
  try {
    while (!signal.aborted && !stopped) {
      let res;
      try {
        lastStatus = readStatus(bridge);
        res = await doFetch(`${base}${SESSION_BRIDGE_POLL_PATH}`, {
          method: "POST",
          headers,
          body: JSON.stringify({ status: lastStatus, modes: bridge.modes, waitMs: pollWaitMs, ...bridge.interruptible === false ? { interruptible: false } : {} }),
          signal
        });
      } catch (error) {
        if (signal.aborted)
          break;
        failures += 1;
        if (failures >= maxFailures) {
          log(`[Plannotator] Session bridge stopped: the Plannotator server is not answering (${error instanceof Error ? error.message : String(error)}).`);
          break;
        }
        await sleep(Math.min(4000, 500 * 2 ** (failures - 1)), signal);
        continue;
      }
      if (res.status === 401 || res.status === 403 || res.status === 404 || res.status === 405 || res.status === 503) {
        await res.body?.cancel().catch(() => {});
        if (res.status !== 404 && res.status !== 503)
          log(`[Plannotator] Session bridge refused (HTTP ${res.status}).`);
        break;
      }
      if (!res.ok) {
        await res.body?.cancel().catch(() => {});
        failures += 1;
        if (failures >= maxFailures)
          break;
        await sleep(Math.min(4000, 500 * 2 ** (failures - 1)), signal);
        continue;
      }
      failures = 0;
      let body = {};
      try {
        body = await res.json();
      } catch {}
      serverTakesTakenOver = Array.isArray(body.features) && body.features.includes("taken_over");
      for (const command of Array.isArray(body.commands) ? body.commands : []) {
        if (command && typeof command === "object" && typeof command.type === "string")
          handleCommand(command);
      }
      if (body.closing)
        stopped = true;
    }
  } finally {
    clearInterval(statusTimer);
    await flushOutbox().catch(() => {});
  }
}

// ../../packages/shared/inbox/agent-link.ts
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { chmodSync, existsSync as existsSync3, mkdirSync as mkdirSync2, readFileSync as readFileSync3, realpathSync as realpathSync2, renameSync as renameSync2, rmSync, statSync as statSync3, writeFileSync as writeFileSync2 } from "node:fs";
import { homedir as homedir2 } from "node:os";
import { isAbsolute as isAbsolute3, join as join4, resolve as resolve3 } from "node:path";
var INBOX_DISCOVER_TIMEOUT_MS = 2000;
var INBOX_SESSION_THREADS_TIMEOUT_MS = 1500;
var INBOX_POLL_WAIT_MS = 20000;
var INBOX_RETRY_MS = { first: 5000, max: 60000 };
var INBOX_TICK_MS = 1000;
var START_TIMEOUT_MS = 30000;
var INBOX_LEASE_EVERY_MS = 5000;
var INBOX_LEASE_STALE_MS = 20000;
var INBOX_STATE_EVERY_TICKS = 5;
var INBOX_INSTALL_TEXT = "The Plannotator Inbox is not running, and there is no plannotator command on this machine to start it: install Plannotator (https://plannotator.ai/docs/getting-started/installation/), then call again.";
var INBOX_STILL_MISSING_TEXT = "The Plannotator Inbox is not running (no plannotator command on PATH).";
function inboxRegistryFileOf(dataDir) {
  return join4(dataDir, "inbox", "inbox.json");
}
function rememberedToolsFileOf(dataDir) {
  return join4(dataDir, "inbox", "connection-tools.json");
}
function claimDirOf(dataDir, replyId, session) {
  return join4(dataDir, "inbox", "claims", inboxClaimName(replyId, session));
}
function inboxLeaseFileOf(dataDir, host, sessionId) {
  return join4(dataDir, "inbox", "leases", `${host}-${sessionId.replace(/[^A-Za-z0-9._-]/g, "_")}.json`);
}
function parseLease(text) {
  try {
    const value = JSON.parse(text ?? "");
    if (typeof value.at !== "number")
      return null;
    return {
      owner: typeof value.owner === "string" && value.owner ? value.owner : null,
      at: value.at,
      touchedAt: typeof value.touchedAt === "number" ? value.touchedAt : 0
    };
  } catch {
    return null;
  }
}
function readText(path) {
  try {
    return readFileSync3(path, "utf8");
  } catch {
    return null;
  }
}
function readRegistry(dataDir) {
  return parseInboxRegistry(readText(inboxRegistryFileOf(dataDir)));
}
function errorText(error) {
  return error instanceof Error ? error.message : String(error);
}
async function mcpCall(port, method, params, signal) {
  const response = await fetch(`http://127.0.0.1:${port}/mcp`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    signal
  });
  return mcpAnswerOfResponse(response.status, await response.text());
}
async function discoverInboxTools(dataDir, options = {}) {
  if (!existsSync3(inboxRegistryFileOf(dataDir)))
    return null;
  const registry = readRegistry(dataDir);
  if (registry) {
    const answer = await mcpCall(registry.port, "tools/list", {}, AbortSignal.timeout(options.timeoutMs ?? INBOX_DISCOVER_TIMEOUT_MS)).catch(() => null);
    const tools = answer && "result" in answer ? parseInboxToolList(answer.result) : [];
    if (tools.length > 0) {
      try {
        const file = rememberedToolsFileOf(dataDir);
        writeFileSync2(`${file}.tmp`, JSON.stringify({ tools }), { mode: 384 });
        chmodSync(`${file}.tmp`, 384);
        renameSync2(`${file}.tmp`, file);
      } catch {}
      return tools;
    }
  }
  let remembered = null;
  try {
    remembered = JSON.parse(readText(rememberedToolsFileOf(dataDir)) ?? "null");
  } catch {
    remembered = null;
  }
  const tools = inboxToolsWithoutBro(parseInboxToolList(remembered));
  return tools.length > 0 ? tools : null;
}
function inboxProjectDir(cwd, given) {
  try {
    const real = realpathSync2(isAbsolute3(given) ? given : resolve3(cwd, given));
    return statSync3(real).isDirectory() ? real : null;
  } catch {
    return null;
  }
}

class InboxAgentConnection {
  options;
  tools;
  saidInstall = false;
  constructor(options) {
    this.options = options;
    this.tools = options.tools;
  }
  get dataDir() {
    return this.options.dataDir;
  }
  get host() {
    return this.options.host;
  }
  async callTool(input, at) {
    const call = inboxToolCall(input, this.tools, {
      project_path: at.cwd,
      agent_session: at.sessionId,
      agent_host: this.options.host,
      agent_name: this.options.agentName
    });
    if ("error" in call)
      return { text: call.error, isError: true };
    if (call.projectPath !== undefined) {
      const resolved = inboxProjectDir(at.cwd, call.projectPath);
      if (!resolved)
        return { text: `Invalid plannotator_inbox call: project_path ${call.projectPath} is not an existing folder.`, isError: true };
      call.arguments.project_path = resolved;
    }
    const running = await this.ensureRunning();
    if ("error" in running)
      return { text: running.error, isError: true };
    let answer;
    try {
      answer = await mcpCall(running.port, "tools/call", inboxToolCallParams(call, { wakes: at.wakes === true }));
    } catch (error) {
      return { text: `The Plannotator Inbox did not answer (${errorText(error)}).`, isError: true };
    }
    if (!answer)
      return { text: "The Plannotator Inbox gave an answer this session could not read.", isError: true };
    if (answer.error) {
      const message = answer.error.message ?? "unknown error";
      if (/not found|unknown tool/i.test(message))
        return { text: `This Plannotator Inbox has no ${call.name}; update Plannotator. (${message})`, isError: true };
      return { text: `The Plannotator Inbox refused the call: ${message}`, isError: true };
    }
    const result = inboxToolResultText(answer.result);
    return { ...result, text: inboxResultWithNote(result.text, call.note) };
  }
  async sessionThreads(at, toolName = INBOX_TOOL_NAME, timeoutMs = INBOX_SESSION_THREADS_TIMEOUT_MS) {
    const registry = readRegistry(this.dataDir);
    if (!registry || !at.sessionId || !at.cwd)
      return null;
    const signal = AbortSignal.timeout(timeoutMs);
    try {
      const health = await fetch(`http://127.0.0.1:${registry.port}/api/inbox/health`, { signal });
      if (health.status !== 200 || !inboxHealthPeeks(await health.json(), registry.serverSession))
        return null;
      const answer = await mcpCall(registry.port, "tools/call", inboxSessionThreadsParams(at.cwd, at.sessionId), signal);
      if (!answer || !("result" in answer))
        return null;
      const result = answer.result;
      return result?.isError === true ? null : inboxSessionThreadsText(result, toolName);
    } catch {
      return null;
    }
  }
  async isRunning(registry) {
    try {
      const response = await fetch(`http://127.0.0.1:${registry.port}/api/inbox/health`, { signal: AbortSignal.timeout(5000) });
      if (response.status !== 200)
        return false;
      return (await response.json()).serverSession === registry.serverSession;
    } catch {
      return false;
    }
  }
  async ensureRunning() {
    const known = readRegistry(this.dataDir);
    if (known && await this.isRunning(known))
      return known;
    const started = await this.startInbox();
    if (started.missing) {
      const text = this.saidInstall ? INBOX_STILL_MISSING_TEXT : INBOX_INSTALL_TEXT;
      this.saidInstall = true;
      return { error: text };
    }
    if (started.exitCode !== 0) {
      const why = started.output.trim() || `exit ${started.exitCode}`;
      if (/unknown command/i.test(why))
        return { error: "The plannotator on PATH has no Inbox (an older version); update Plannotator." };
      return { error: `The Plannotator Inbox did not start: ${why}` };
    }
    return readRegistry(this.dataDir) ?? { error: "The Plannotator Inbox started but wrote no registry." };
  }
  async startInbox() {
    for (const command of plannotatorCommands(this.options.command)) {
      const run = await runOnce(command, ["inbox", "--background"], { ...process.env, PLANNOTATOR_DATA_DIR: this.dataDir });
      if (!run.missing)
        return run;
    }
    return { missing: true, exitCode: null, output: "" };
  }
  async bridge(path, session, body, signal) {
    const registry = readRegistry(this.dataDir);
    if (!registry)
      return null;
    try {
      const response = await fetch(`http://127.0.0.1:${registry.port}${path}`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${registry.token}` },
        body: JSON.stringify({ session, host: this.options.host, ...body }),
        signal
      });
      return { status: response.status, text: await response.text() };
    } catch {
      return null;
    }
  }
}
function runOnce(command, args, env) {
  return new Promise((resolve) => {
    let output = "";
    let stdout = "";
    let stderr = "";
    let settled = false;
    const done = (value) => {
      if (settled)
        return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    let child;
    try {
      child = spawn(command, args, { env, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
    } catch (error) {
      resolve({ missing: error.code === "ENOENT", exitCode: null, output: errorText(error) });
      return;
    }
    const timer = setTimeout(() => {
      child.kill();
      done({ missing: false, exitCode: null, output: `${output}
(no answer within ${START_TIMEOUT_MS / 1000} s)` });
    }, START_TIMEOUT_MS);
    child.stdout?.on("data", (chunk) => {
      output += String(chunk);
      stdout += String(chunk);
    });
    child.stderr?.on("data", (chunk) => {
      output += String(chunk);
      stderr += String(chunk);
    });
    child.on("error", (error) => done({ missing: error.code === "ENOENT", exitCode: null, output: error.message }));
    child.on("close", (code) => done({ missing: false, exitCode: code, output, stdout, stderr }));
  });
}
function plannotatorCommands(command) {
  if (command)
    return [command];
  const bin = process.env.PLANNOTATOR_BIN?.trim();
  return bin ? [bin] : ["plannotator", join4(homedir2(), ".local", "bin", "plannotator")];
}
async function openInboxInBrowser(options = {}) {
  const env = { ...options.env ?? process.env, ...options.dataDir ? { PLANNOTATOR_DATA_DIR: options.dataDir } : {} };
  for (const command of plannotatorCommands(options.command)) {
    const run = await runOnce(command, ["inbox", "--open"], env);
    if (run.missing)
      continue;
    const url = /https?:\/\/\S+/.exec(run.stdout ?? "")?.[0];
    if (run.exitCode === 0 && url) {
      const note = run.stderr?.trim();
      return note ? { url, note } : { url };
    }
    const why = run.output.trim() || `exit ${run.exitCode}`;
    if (/unknown inbox option: --open|unknown command/i.test(why))
      return { error: INBOX_OPEN_UPDATE_TEXT };
    return { error: `Could not open the Plannotator Inbox: ${why}` };
  }
  return { error: "There is no plannotator command on this machine: install Plannotator (https://plannotator.ai/docs/getting-started/installation/)." };
}
var INBOX_OPEN_UPDATE_TEXT = "The plannotator on PATH is older than /plannotator-inbox. Update it with `plannotator update`, or run `plannotator inbox` in a terminal.";
function inboxOpenedText(url, note) {
  return `Plannotator Inbox: ${url}${note?.trim() ? `
${note.trim()}` : ""}`;
}

class InboxDeliverLater extends Error {
  deliverLater = true;
}
function isInboxDeliverLater(error) {
  return error instanceof InboxDeliverLater || typeof error === "object" && error !== null && error.deliverLater === true;
}

class InboxWake {
  connection;
  sessionId;
  target;
  tickMs;
  timer = null;
  disposed = false;
  ticking = false;
  polling = false;
  delivering = false;
  retryAt = 0;
  backoffMs = 0;
  idleTicks = 0;
  abort = new AbortController;
  pending = new Map;
  noSteer = new Set;
  settled = new Set;
  unacked = new Set;
  instanceId = randomUUID();
  leaseFile;
  leader = false;
  leaseCheckedAt = Number.NEGATIVE_INFINITY;
  touchedAt = 0;
  startedAt = Date.now();
  lastLabel = "";
  busy = null;
  idleSince = null;
  stateCheckedAt = Number.NEGATIVE_INFINITY;
  lastSteerable = null;
  constructor(connection, sessionId, target, tickMs = INBOX_TICK_MS) {
    this.connection = connection;
    this.sessionId = sessionId;
    this.target = target;
    this.tickMs = tickMs;
    this.leaseFile = inboxLeaseFileOf(connection.dataDir, connection.host, sessionId);
  }
  get isDisposed() {
    return this.disposed;
  }
  start() {
    if (this.timer || this.disposed)
      return;
    this.touch();
    this.timer = setInterval(() => {
      if (this.ticking)
        return;
      this.ticking = true;
      this.tick().catch(() => {
        return;
      }).finally(() => {
        this.ticking = false;
      });
    }, this.tickMs);
    this.timer.unref?.();
  }
  dispose() {
    if (this.disposed)
      return;
    this.disposed = true;
    if (this.timer)
      clearInterval(this.timer);
    this.timer = null;
    this.abort.abort();
    if (this.leader)
      writeLease(this.leaseFile, { owner: null, at: 0, touchedAt: 0 });
    this.leader = false;
  }
  touch() {
    this.touchedAt = Date.now();
    if (!this.disposed)
      this.holdLease(this.touchedAt);
  }
  holdLease(now) {
    this.leaseCheckedAt = now;
    const lease = parseLease(readText(this.leaseFile));
    const foreign = !!lease?.owner && lease.owner !== this.instanceId && Math.abs(now - lease.at) < INBOX_LEASE_STALE_MS;
    if (foreign && lease && lease.touchedAt >= this.touchedAt) {
      this.leader = false;
      return false;
    }
    writeLease(this.leaseFile, { owner: this.instanceId, at: now, touchedAt: this.touchedAt });
    this.leader = true;
    return true;
  }
  onForeignPrompt() {
    this.idleTicks = 0;
  }
  async tick() {
    if (this.disposed)
      return;
    let busy = null;
    const asked = Date.now();
    if (this.pending.size > 0 || asked - this.stateCheckedAt >= this.tickMs * INBOX_STATE_EVERY_TICKS) {
      this.stateCheckedAt = asked;
      busy = await this.target.isBusy();
      this.noteBusy(busy, asked);
    }
    this.idleTicks = this.pending.size === 0 || busy !== false ? 0 : this.idleTicks + 1;
    for (const id of [...this.unacked])
      await this.acknowledge(id);
    const now = Date.now();
    if (now - this.leaseCheckedAt >= INBOX_LEASE_EVERY_MS)
      this.holdLease(now);
    if (!this.leader)
      return;
    if (!this.polling && now >= this.retryAt)
      this.poll();
    const urgent = [...this.pending.values()].some((command) => command.now === true && !this.noSteer.has(command.id)) && (this.steerable || busy === false);
    if (!this.delivering && this.pending.size > 0 && (this.idleTicks >= 2 || urgent)) {
      this.delivering = true;
      this.deliverNext(this.idleTicks < 2 && urgent).catch(() => {
        return;
      }).finally(() => {
        this.delivering = false;
      });
    }
  }
  get steerable() {
    return typeof this.target.steer === "function" && (this.target.canSteer?.() ?? true);
  }
  noteBusy(busy, now) {
    const steerable = this.steerable;
    if (busy === this.busy && steerable === this.lastSteerable)
      return;
    const known = this.busy !== null;
    if (busy !== this.busy && !busy)
      this.idleSince = now;
    this.busy = busy;
    this.lastSteerable = steerable;
    if (known && this.leader && !this.disposed) {
      this.connection.bridge(INBOX_BRIDGE_EVENT_PATH, this.sessionId, { type: "state", busy, idle_since: this.idleSince, [INBOX_SEND_NOW_POLL_FIELD]: steerable }).catch(() => null);
    }
  }
  async pendingNow(waitMs) {
    const signal = AbortSignal.any([this.abort.signal, AbortSignal.timeout(waitMs + 1e4)]);
    let projectPath = null;
    try {
      projectPath = await this.target.projectPath?.();
    } catch {
      projectPath = null;
    }
    try {
      const label = await this.target.label?.();
      if (typeof label === "string")
        this.lastLabel = label;
    } catch {}
    let plugin = null;
    try {
      plugin = this.target.plugin?.() ?? null;
      if (!plugin) {
        const version = this.target.pluginVersion?.() ?? null;
        plugin = version ? { version } : null;
      }
    } catch {
      plugin = null;
    }
    const response = await this.connection.bridge(INBOX_BRIDGE_POLL_PATH, this.sessionId, {
      waitMs,
      ...typeof projectPath === "string" && projectPath ? { project_path: projectPath } : {},
      ...this.target.label ? { label: this.lastLabel } : {},
      started_at: this.startedAt,
      ...this.busy === null ? {} : { busy: this.busy, idle_since: this.idleSince },
      ...this.steerable ? { [INBOX_SEND_NOW_POLL_FIELD]: true } : {},
      [INBOX_STEER_POLLS_POLL_FIELD]: true,
      [INBOX_TAGS_POLL_FIELD]: true,
      ...plugin?.version ? { plugin } : {}
    }, signal);
    return response && response.status === 200 ? parseInboxBridgeCommands(response.text) : null;
  }
  async poll() {
    this.polling = true;
    try {
      const commands = await this.pendingNow(INBOX_POLL_WAIT_MS);
      if (this.disposed)
        return;
      if (commands === null) {
        this.backoffMs = this.backoffMs ? Math.min(this.backoffMs * 2, INBOX_RETRY_MS.max) : INBOX_RETRY_MS.first;
        this.retryAt = Date.now() + this.backoffMs;
        return;
      }
      this.backoffMs = 0;
      this.retryAt = 0;
      const handedOut = new Set(commands.map((command) => command.id));
      for (const id of this.settled)
        if (!handedOut.has(id))
          this.settled.delete(id);
      for (const command of commands) {
        if (!this.settled.has(command.id))
          this.pending.set(command.id, command);
      }
    } finally {
      this.polling = false;
    }
  }
  settle(id) {
    this.pending.delete(id);
    this.settled.add(id);
  }
  async deliverNext(urgent = false) {
    const waiting = this.pending.values().next().value;
    if (!waiting)
      return;
    const fresh = await this.pendingNow(0);
    if (fresh === null || this.disposed)
      return;
    const command = fresh.find((candidate) => candidate.id === waiting.id);
    if (!command) {
      this.pending.delete(waiting.id);
      return;
    }
    const busy = await this.target.isBusy();
    const steering = busy && urgent && this.steerable;
    if (busy && !steering) {
      this.idleTicks = 0;
      return;
    }
    if (this.disposed || !this.holdLease(Date.now()))
      return;
    if (!command.tagged && existsSync3(join4(this.connection.dataDir, "inbox", "claims", command.id))) {
      this.settle(command.id);
      return;
    }
    const claim = claimDirOf(this.connection.dataDir, command.id, this.sessionId);
    try {
      mkdirSync2(join4(claim, ".."), { recursive: true, mode: 448 });
      mkdirSync2(claim, { mode: 448 });
    } catch (error) {
      if (error.code === "EEXIST")
        this.settle(command.id);
      return;
    }
    writeQuietly(join4(claim, "by"), this.instanceId);
    writeQuietly(join4(claim, "pid"), String(process.pid));
    if (steering) {
      try {
        await this.target.steer(inboxWakeText(command), command);
      } catch {
        try {
          rmSync(claim, { recursive: true, force: true });
        } catch {}
        this.noSteer.add(command.id);
        this.connection.bridge(INBOX_BRIDGE_EVENT_PATH, this.sessionId, { type: "send_now_failed", id: command.id }).catch(() => null);
        return;
      }
      writeQuietly(join4(claim, "delivered"), new Date().toISOString());
      this.settle(command.id);
      this.unacked.add(command.id);
      await this.acknowledge(command.id);
      return;
    }
    try {
      await this.target.deliver(inboxWakeText(command), command);
    } catch (error) {
      if (isInboxDeliverLater(error)) {
        try {
          rmSync(claim, { recursive: true, force: true });
        } catch {}
        return;
      }
      this.settle(command.id);
      writeQuietly(join4(claim, "reported"), "1");
      this.target.notify(`A reply in the Plannotator Inbox (${command.subject ?? "a thread"}) could not be delivered to this session (${errorText(error)}). Read it in the Inbox: ${command.url}`);
      return;
    }
    writeQuietly(join4(claim, "delivered"), new Date().toISOString());
    this.settle(command.id);
    this.unacked.add(command.id);
    await this.acknowledge(command.id);
  }
  async acknowledge(id) {
    const response = await this.connection.bridge(INBOX_BRIDGE_EVENT_PATH, this.sessionId, { type: "delivered", id });
    if (!response)
      return;
    if (response.status === 200 || response.status >= 400 && response.status < 500 && response.status !== 401)
      this.unacked.delete(id);
  }
}
function writeLease(file, lease) {
  try {
    mkdirSync2(join4(file, ".."), { recursive: true, mode: 448 });
    const tmp = `${file}.${process.pid}.tmp`;
    writeFileSync2(tmp, JSON.stringify(lease), { mode: 384 });
    renameSync2(tmp, file);
  } catch {}
}
function writeQuietly(path, text) {
  try {
    writeFileSync2(path, text, { mode: 384 });
  } catch {}
}

// ../../packages/shared/resolve-file.ts
import { homedir as homedir3 } from "os";
import { isAbsolute as isAbsolute4, join as join5, resolve as resolve4, win32 } from "path";
import { existsSync as existsSync4, readdirSync } from "fs";

// ../../packages/core/annotatable.ts
var BUILTIN_TEXT_PATTERN = String.raw`(?:\.(?:mdx?|txt|adoc|asciidoc|mmd|mermaid|dot|gv|ya?ml|jsonc?|json5|toml|ini|cfg|conf|properties|csv|tsv|log|xml)|\.env\.example)`;
var BUILTIN_DOC_PATTERN = String.raw`(?:\.(?:mdx?|txt|adoc|asciidoc|mmd|mermaid|dot|gv|html?|ya?ml|jsonc?|json5|toml|ini|cfg|conf|properties|csv|tsv|log|xml)|\.env\.example)`;
var ANNOTATABLE_TEXT_REGEX = new RegExp(`${BUILTIN_TEXT_PATTERN}$`, "i");
var ANNOTATABLE_DOC_REGEX = new RegExp(`${BUILTIN_DOC_PATTERN}$`, "i");
function isDeniedMarkdownExtension(ext) {
  return ext.endsWith(".env") || ext.startsWith(".env.");
}
var CONFIGURABLE_EXTENSION_RE = /^\.[a-z0-9][a-z0-9._-]*$/;
var MAX_CONFIGURABLE_EXTENSION_LENGTH = 24;
var MAX_CONFIGURABLE_EXTENSIONS = 32;
function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function normalizeMarkdownExtensions(value) {
  if (!Array.isArray(value))
    return [];
  const result = [];
  for (const entry of value) {
    if (result.length >= MAX_CONFIGURABLE_EXTENSIONS)
      break;
    if (typeof entry !== "string")
      continue;
    const ext = entry.trim().toLowerCase();
    if (ext.length > MAX_CONFIGURABLE_EXTENSION_LENGTH)
      continue;
    if (!CONFIGURABLE_EXTENSION_RE.test(ext))
      continue;
    if (isDeniedMarkdownExtension(ext))
      continue;
    if (ANNOTATABLE_DOC_REGEX.test(`sample${ext}`))
      continue;
    if (result.includes(ext))
      continue;
    result.push(ext);
  }
  return result;
}
var regexCache = new Map;
function buildRegex(basePattern, extra) {
  if (extra.length === 0) {
    return basePattern === BUILTIN_TEXT_PATTERN ? ANNOTATABLE_TEXT_REGEX : ANNOTATABLE_DOC_REGEX;
  }
  const key = `${basePattern}::${extra.join(",")}`;
  const cached = regexCache.get(key);
  if (cached)
    return cached;
  const alternation = [basePattern, ...extra.map(escapeRegExp)].join("|");
  const regex = new RegExp(`(?:${alternation})$`, "i");
  regexCache.set(key, regex);
  return regex;
}
function buildAnnotatableTextRegex(extra = []) {
  return buildRegex(BUILTIN_TEXT_PATTERN, extra);
}
var MAX_ANNOTATABLE_FILE_BYTES = 2 * 1024 * 1024;
// ../../packages/shared/markdown-extensions.ts
function resolveMarkdownExtensions(config) {
  return normalizeMarkdownExtensions(config.markdownExtensions);
}
var cached = null;
function getExtraMarkdownExtensions(config) {
  if (config)
    return resolveMarkdownExtensions(config);
  if (cached === null)
    cached = resolveMarkdownExtensions(loadConfig());
  return cached;
}
// ../../packages/shared/resolve-file.ts
var WINDOWS_DRIVE_PATH_PATTERNS = [
  /^\/cygdrive\/([a-zA-Z])\/(.+)$/,
  /^\/([a-zA-Z])\/(.+)$/
];
var IGNORED_DIRS = [
  "node_modules/",
  ".git/",
  "dist/",
  "build/",
  ".next/",
  "__pycache__/",
  ".obsidian/",
  ".trash/"
];
var CODE_IGNORED_DIRS = [
  ...IGNORED_DIRS,
  ".turbo/",
  ".cache/",
  "target/",
  "vendor/",
  "coverage/",
  ".venv/",
  ".pytest_cache/"
];
var DEFAULT_FILE_BROWSER_MAX_FILES = 5000;
function getFileBrowserMaxFiles() {
  const value = Number.parseInt(process.env.PLANNOTATOR_FILE_BROWSER_MAX_FILES ?? "", 10);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_FILE_BROWSER_MAX_FILES;
}
function normalizeSeparators(input) {
  return input.replace(/\\/g, "/");
}
function stripTrailingSlashes(input) {
  return input.replace(/\/+$/, "");
}
function expandHomePath(input, home = homedir3()) {
  if (input === "~") {
    return home;
  }
  if (input.startsWith("~/") || input.startsWith("~\\")) {
    return join5(home, input.slice(2));
  }
  return input;
}
function stripWrappingQuotes(input) {
  if (input.length < 2) {
    return input;
  }
  const first = input[0];
  const last = input[input.length - 1];
  if (first === '"' && last === '"' || first === "'" && last === "'") {
    return input.slice(1, -1);
  }
  return input;
}
function normalizeUserPathInput(input, platform = process.platform) {
  const trimmedInput = input.trim();
  const unquotedInput = stripWrappingQuotes(trimmedInput);
  const expandedInput = expandHomePath(unquotedInput);
  if (platform !== "win32") {
    return expandedInput;
  }
  for (const pattern of WINDOWS_DRIVE_PATH_PATTERNS) {
    const match = expandedInput.match(pattern);
    if (!match) {
      continue;
    }
    const [, driveLetter, rest] = match;
    return `${driveLetter.toUpperCase()}:/${rest}`;
  }
  return expandedInput;
}
function isAbsoluteNormalizedUserPath(input, platform = process.platform) {
  if (hasWindowsDriveLetter(input)) {
    return true;
  }
  return platform === "win32" ? win32.isAbsolute(input) : isAbsolute4(input);
}
function resolveUserPath(input, baseDir = process.cwd(), platform = process.platform) {
  const normalizedInput = normalizeUserPathInput(input, platform);
  if (!normalizedInput) {
    return "";
  }
  return isAbsoluteNormalizedUserPath(normalizedInput, platform) ? resolveAbsolutePath(normalizedInput, platform) : resolve4(baseDir, normalizedInput);
}
function normalizeComparablePath(input) {
  return stripTrailingSlashes(normalizeSeparators(resolveUserPath(input)));
}
function isWithinProjectRoot(candidate, projectRoot) {
  const normalizedCandidate = normalizeComparablePath(candidate);
  const normalizedProjectRoot = normalizeComparablePath(projectRoot);
  return normalizedCandidate === normalizedProjectRoot || normalizedCandidate.startsWith(`${normalizedProjectRoot}/`);
}
function getLowercaseBasename(input) {
  const normalizedInput = normalizeSeparators(input);
  return normalizedInput.split("/").pop().toLowerCase();
}
function getLookupKey(input, isBareFilename) {
  return isBareFilename ? getLowercaseBasename(input) : input.toLowerCase();
}
function resolveAbsolutePath(input, platform = process.platform) {
  return platform === "win32" || hasWindowsDriveLetter(input) ? win32.resolve(input) : resolve4(input);
}
function isSearchableMarkdownPath(input, extra) {
  return buildAnnotatableTextRegex(extra).test(input.trim());
}
function hasWindowsDriveLetter(input) {
  return /^[a-zA-Z]:[/\\]/.test(input);
}
function fileExists2(filePath) {
  try {
    return existsSync4(filePath);
  } catch {
    return false;
  }
}
function walkFiles(dir, root, results, ignoredDirs, fileMatcher, state) {
  if (state.visitedFiles >= state.limit)
    return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (state.visitedFiles >= state.limit)
      return;
    if (entry.isDirectory()) {
      if (ignoredDirs.some((d) => d === entry.name + "/"))
        continue;
      try {
        walkFiles(join5(dir, entry.name), root, results, ignoredDirs, fileMatcher, state);
      } catch {}
    } else if (entry.isFile()) {
      state.visitedFiles += 1;
      if (fileMatcher(entry.name)) {
        const relative = join5(dir, entry.name).slice(root.length + 1).replace(/\\/g, "/");
        results.push(relative);
      }
    }
  }
}
function walkMarkdownFiles(dir, root, results, ignoredDirs, extra) {
  const matcher = buildAnnotatableTextRegex(extra);
  try {
    walkFiles(dir, root, results, ignoredDirs, (name) => matcher.test(name), { visitedFiles: 0, limit: getFileBrowserMaxFiles() });
  } catch {}
}
var fileListCache = new Map;
function resolveMarkdownFileCore(input, projectRoot, extra) {
  const normalizedInput = normalizeUserPathInput(input);
  const searchInput = normalizeSeparators(normalizedInput);
  const isBareFilename = !searchInput.includes("/");
  const targetLookupKey = getLookupKey(searchInput, isBareFilename);
  if (!isSearchableMarkdownPath(normalizedInput, extra)) {
    return { kind: "not_found", input };
  }
  if (isAbsoluteNormalizedUserPath(normalizedInput)) {
    const absolutePath = resolveAbsolutePath(normalizedInput);
    if (fileExists2(absolutePath)) {
      return { kind: "found", path: absolutePath };
    }
    return { kind: "not_found", input };
  }
  const fromRoot = resolve4(projectRoot, searchInput);
  if (fileExists2(fromRoot) && (isWithinProjectRoot(fromRoot, projectRoot) || searchInput.includes("/"))) {
    return { kind: "found", path: fromRoot };
  }
  const allFiles = [];
  walkMarkdownFiles(projectRoot, projectRoot, allFiles, IGNORED_DIRS, extra);
  const matches = [];
  for (const match of allFiles) {
    const normalizedMatch = normalizeSeparators(match);
    const matchLookupKey = getLookupKey(normalizedMatch, isBareFilename);
    if (matchLookupKey === targetLookupKey) {
      const full = resolve4(projectRoot, normalizedMatch);
      if (isWithinProjectRoot(full, projectRoot)) {
        matches.push(full);
      }
    }
  }
  if (matches.length === 1) {
    return { kind: "found", path: matches[0] };
  }
  if (matches.length > 1) {
    const projectRootPrefix = `${normalizeComparablePath(projectRoot)}/`;
    const relative = matches.map((match) => normalizeComparablePath(match).replace(projectRootPrefix, ""));
    return { kind: "ambiguous", input, matches: relative };
  }
  return { kind: "not_found", input };
}
function resolveMarkdownFile(input, projectRoot, options) {
  const originalInput = input.trim();
  const unquotedInput = stripWrappingQuotes(originalInput);
  const extra = options?.extraMarkdownExtensions ?? getExtraMarkdownExtensions();
  const primary = resolveMarkdownFileCore(unquotedInput, projectRoot, extra);
  if (primary.kind === "found") {
    return primary;
  }
  if (primary.kind === "ambiguous") {
    return { ...primary, input: originalInput };
  }
  if (!unquotedInput.startsWith("@")) {
    return { kind: "not_found", input: originalInput };
  }
  const normalizedInput = unquotedInput.replace(/^@+/, "");
  if (!normalizedInput) {
    return { kind: "not_found", input: originalInput };
  }
  const fallback = resolveMarkdownFileCore(normalizedInput, projectRoot, extra);
  if (fallback.kind === "found") {
    return fallback;
  }
  if (fallback.kind === "ambiguous") {
    return { ...fallback, input: originalInput };
  }
  return { kind: "not_found", input: originalInput };
}

// ../../packages/shared/at-reference.ts
function stripAtPrefix(input) {
  const unquoted = stripWrappingQuotes(input);
  return unquoted.startsWith("@") ? unquoted.slice(1) : unquoted;
}
function resolveAtReference(input, exists) {
  const stripped = stripAtPrefix(input);
  if (exists(stripped))
    return stripped;
  if (stripped !== input && exists(input))
    return input;
  return null;
}

// ../../packages/shared/annotate-args.ts
var FLAG_MAP = {
  "--gate": "gate",
  "--json": "json",
  "--hook": "hook",
  "--render-html": "renderHtml",
  "--markdown": "renderMarkdown",
  "--no-jina": "noJina"
};
var LIVE_FLAG_MAP = {
  "--app": "app",
  "--static": "static"
};
function parseAnnotateArgs(raw, opts) {
  const s = (raw ?? "").trim();
  const flags = { gate: false, json: false, hook: false, renderHtml: false, renderMarkdown: false, noJina: false, app: false, static: false };
  const flagMap = opts?.liveFlags ? { ...FLAG_MAP, ...LIVE_FLAG_MAP } : { ...FLAG_MAP };
  const segments = [];
  for (let i = 0;i < s.length; ) {
    const isWs = /\s/.test(s[i]);
    const start = i;
    while (i < s.length && /\s/.test(s[i]) === isWs)
      i++;
    segments.push({ type: isWs ? "ws" : "tok", text: s.slice(start, i) });
  }
  const keep = segments.map(() => true);
  for (let j = 0;j < segments.length; j++) {
    const seg = segments[j];
    if (seg.type !== "tok")
      continue;
    const key = flagMap[seg.text];
    if (!key)
      continue;
    flags[key] = true;
    keep[j] = false;
    if (j + 1 < segments.length && segments[j + 1].type === "ws") {
      keep[j + 1] = false;
    } else if (j > 0 && segments[j - 1].type === "ws") {
      keep[j - 1] = false;
    }
  }
  const rawFilePath = stripWrappingQuotes(segments.filter((_, j) => keep[j]).map((seg) => seg.text).join("").trim());
  if (flags.hook)
    flags.gate = true;
  return { filePath: stripAtPrefix(rawFilePath), rawFilePath, ...flags };
}
function annotateTargetWords(raw, opts) {
  const text = (raw ?? "").trim();
  const scanned = scanAnnotateWords(text);
  const words = scanned.unterminated ? text.split(/\s+/) : scanned.words;
  const flags = new Set([...Object.keys(FLAG_MAP), ...opts?.liveFlags ? Object.keys(LIVE_FLAG_MAP) : []]);
  return words.filter((word) => word && !flags.has(word));
}
function scanAnnotateWords(text) {
  const words = [];
  let current = "";
  let quote;
  const isSpace = (char) => char === undefined || /\s/.test(char);
  for (let i = 0;i < text.length; i++) {
    const char = text[i];
    if (quote) {
      if (char === quote && isSpace(text[i + 1])) {
        quote = undefined;
        if (current)
          words.push(current);
        current = "";
      } else {
        current += char;
      }
      continue;
    }
    if ((char === "'" || char === '"') && !current && isSpace(text[i - 1])) {
      quote = char;
      continue;
    }
    if (/\s/.test(char)) {
      if (current)
        words.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  if (current)
    words.push(current);
  return { words, unterminated: quote !== undefined };
}

// ../../packages/shared/annotate-target.ts
import { existsSync as existsSync5, realpathSync as realpathSync3, statSync as statSync4 } from "node:fs";

// ../../packages/shared/plannotator-tool.ts
var PLANNOTATOR_TOOL_NAME = "plannotator";
var PLANNOTATOR_TOOL_DESCRIPTION = [
  "Open Plannotator, the browser review UI, for the user, and return at once. Also lists and closes the reviews opened in this conversation (by this tool or the user's /plannotator-* commands).",
  '- action "annotate": annotate a file (markdown, text, config, HTML), a folder, or a URL; `target` is required. Pass a list as `target` to review several files together, in the order you want them read. `gate: true` adds an Approve button for an explicit sign-off. `options.markdown: true` converts HTML or a URL to markdown first.',
  '- action "review": review code changes; `target` is an optional repository directory or a GitHub/GitLab/Bitbucket pull request URL (default: the current repository). `options.base` sets the compare branch or ref (git only). `gate: true` when you wait for the sign-off: a bare Approve reaches you too.',
  '- action "last": annotate your own last assistant message; no target.',
  '- action "list": the reviews opened in this conversation that are still open, one line each: session id, what it shows, url, age, state, and how many comments the reviewer has not sent yet.',
  '- action "close": close a review opened in this conversation that is no longer needed; `session` is its id (pn-...) or "all". Nothing is sent to you, and the reviewer\'s unsent comments stay saved as a draft. Plan reviews are not closed this way: they end with the reviewer\'s decision.',
  "Opening only opens the page and names its session id (pn-...). The reviewer's feedback arrives later as a message in this conversation that names the same id, so end your turn after opening and wait for it. Use this tool instead of running the `plannotator` CLI. Plan review is not done with this tool: it opens by itself when you exit plan mode."
].join(`
`);
var PLANNOTATOR_TOOL_INPUT_SCHEMA = {
  type: "object",
  properties: {
    action: {
      type: "string",
      enum: ["annotate", "review", "last", "list", "close"],
      description: "What to do: open a file/folder/URL to annotate, code changes or a PR to review, or your last message; list your open reviews; close one."
    },
    target: {
      anyOf: [
        { type: "string" },
        { type: "array", items: { type: "string" }, minItems: 1 }
      ],
      description: "annotate: the file, folder or URL (required), or a list of file paths to review together in that order. review: a repository directory or PR URL (optional). Other actions: not used."
    },
    gate: {
      type: "boolean",
      description: "annotate: add an Approve button for an explicit sign-off. review: deliver a bare Approve too."
    },
    options: {
      type: "object",
      properties: {
        base: { type: "string", description: "review only: the branch or ref to compare against (git)." },
        markdown: { type: "boolean", description: "annotate only: convert an HTML file or URL to markdown before annotating." }
      },
      additionalProperties: false
    },
    session: {
      type: "string",
      description: 'close: the session id (pn-...) of a review opened in this conversation, or "all".'
    }
  },
  required: ["action"],
  additionalProperties: false
};
var PLANNOTATOR_TOOL_TAILSCALE_LINE = "- `tailscale: true` (annotate, review, last): serve the page over the user's tailnet (HTTPS, never public) for their phone or another device; \"Ask this session\" works there for this computer's owner. Only when the user asks for that.";
var PLANNOTATOR_TOOL_TAILSCALE_DESCRIPTION = (() => {
  const lines = PLANNOTATOR_TOOL_DESCRIPTION.split(`
`);
  const lastAction = lines.findIndex((line) => line.startsWith('- action "close"'));
  return [...lines.slice(0, lastAction + 1), PLANNOTATOR_TOOL_TAILSCALE_LINE, ...lines.slice(lastAction + 1)].join(`
`);
})();
var PLANNOTATOR_TOOL_TAILSCALE_INPUT_SCHEMA = {
  ...PLANNOTATOR_TOOL_INPUT_SCHEMA,
  properties: {
    ...PLANNOTATOR_TOOL_INPUT_SCHEMA.properties,
    tailscale: {
      type: "boolean",
      description: `annotate, review, last: serve the page over the user's tailnet (HTTPS, never public), to open on another device. "Ask this session" works there for the computer owner's Tailscale login.`
    }
  }
};
var PLANNOTATOR_TOOL_MAX_TEXT = 4096;
var PLANNOTATOR_SESSION_ID_PREFIX = "pn-";
var SESSION_ID = /^(?:pn-)?([0-9a-f]{6})$/i;
function normalizePlannotatorSessionId(value) {
  const match = SESSION_ID.exec(value.trim());
  return match ? `${PLANNOTATOR_SESSION_ID_PREFIX}${match[1].toLowerCase()}` : null;
}
function plannotatorSessionId(hex6) {
  return `${PLANNOTATOR_SESSION_ID_PREFIX}${hex6.toLowerCase()}`;
}
var TOOL_KEYS = ["action", "target", "gate", "options", "session"];
var OPTION_KEYS = ["base", "markdown"];
var ACTIONS = ["annotate", "review", "last", "list", "close"];
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function checkWord(name, value) {
  if (typeof value !== "string")
    return `${name} must be a string`;
  if (value.trim() === "")
    return `${name} must not be empty`;
  if (value.length > PLANNOTATOR_TOOL_MAX_TEXT)
    return `${name} is longer than ${PLANNOTATOR_TOOL_MAX_TEXT} characters`;
  if (/[\u0000-\u001f\u007f]/.test(value))
    return `${name} must not contain control characters or line breaks`;
  if (value.trim().startsWith("-"))
    return `${name} must not start with "-"`;
  return null;
}
function isPlannotatorToolOpenAction(action) {
  return action === "annotate" || action === "review" || action === "last";
}
function isEmptyOptional(value) {
  if (value === null || value === "")
    return true;
  if (Array.isArray(value))
    return value.length === 0;
  return isRecord(value) && Object.keys(value).length === 0;
}
function withoutEmptyOptionals(value) {
  const kept = {};
  for (const [key, member] of Object.entries(value)) {
    if (!isEmptyOptional(member))
      kept[key] = member;
  }
  return kept;
}
function parsePlannotatorToolInput(value, parseOptions = {}) {
  const fail = (error) => ({ ok: false, error: `Invalid plannotator call: ${error}.` });
  if (!isRecord(value))
    return fail("the input must be an object");
  for (const key of Object.keys(value)) {
    if (!TOOL_KEYS.includes(key) && !(key === "tailscale" && parseOptions.tailscale === true))
      return fail(`unknown field "${key}"`);
  }
  const action = value.action;
  if (typeof action !== "string" || !ACTIONS.includes(action)) {
    return fail('action must be "annotate", "review", "last", "list" or "close"');
  }
  const fields = withoutEmptyOptionals(value);
  if (isRecord(fields.options)) {
    for (const key of Object.keys(fields.options)) {
      if (!OPTION_KEYS.includes(key))
        return fail(`unknown option "${key}"`);
    }
    const options = withoutEmptyOptionals(fields.options);
    if (isEmptyOptional(options))
      delete fields.options;
    else
      fields.options = options;
  }
  const input = { action };
  const opens = isPlannotatorToolOpenAction(input.action);
  if (fields.target !== undefined) {
    if (!opens || action === "last")
      return fail(`action "${action}" takes no target`);
    if (Array.isArray(fields.target)) {
      if (action !== "annotate")
        return fail('a list of targets is for action "annotate" only');
      const targets = [];
      for (const [index, item] of fields.target.entries()) {
        const problem = checkWord(`target[${index}]`, item);
        if (problem)
          return fail(problem);
        const trimmed = item.trim();
        if (!targets.includes(trimmed))
          targets.push(trimmed);
      }
      input.target = targets.length === 1 ? targets[0] : targets;
    } else {
      const problem = checkWord("target", fields.target);
      if (problem)
        return fail(problem);
      input.target = fields.target.trim();
    }
  } else if (action === "annotate") {
    return fail('action "annotate" needs a target (a file, folder or URL)');
  }
  if (fields.gate !== undefined) {
    if (typeof fields.gate !== "boolean")
      return fail("gate must be true or false");
    if (fields.gate && action !== "annotate" && action !== "review")
      return fail('gate is for actions "annotate" and "review" only');
    if (fields.gate)
      input.gate = true;
  }
  if (fields.tailscale !== undefined) {
    if (typeof fields.tailscale !== "boolean")
      return fail("tailscale must be true or false");
    if (fields.tailscale && !opens)
      return fail('tailscale is for actions "annotate", "review" and "last" only');
    if (fields.tailscale)
      input.tailscale = true;
  }
  if (fields.options !== undefined) {
    const options = fields.options;
    if (!isRecord(options))
      return fail("options must be an object");
    const parsed = {};
    if (options.base !== undefined) {
      if (action !== "review")
        return fail('options.base is for action "review" only');
      const problem = checkWord("options.base", options.base);
      if (problem)
        return fail(problem);
      if (/\s/.test(options.base.trim()))
        return fail("options.base must not contain spaces");
      parsed.base = options.base.trim();
    }
    if (options.markdown !== undefined) {
      if (typeof options.markdown !== "boolean")
        return fail("options.markdown must be true or false");
      if (options.markdown && action !== "annotate")
        return fail('options.markdown is for action "annotate" only');
      if (options.markdown)
        parsed.markdown = true;
    }
    if (Object.keys(parsed).length > 0)
      input.options = parsed;
  }
  if (fields.session !== undefined) {
    if (action !== "close")
      return fail('session is for action "close" only');
    if (typeof fields.session !== "string")
      return fail("session must be a string");
    if (action === "close" && fields.session.trim().toLowerCase() === "all") {
      input.session = "all";
    } else {
      const id = normalizePlannotatorSessionId(fields.session);
      if (!id)
        return fail('session must be a session id such as "pn-3f2a9c" or "all"');
      input.session = id;
    }
  } else if (action === "close") {
    return fail('action "close" needs a session (the pn-... id a result named, or "all")');
  }
  return { ok: true, input };
}
function plannotatorToolTargets(input) {
  if (input.target === undefined)
    return [];
  return Array.isArray(input.target) ? [...input.target] : [input.target];
}
function plannotatorToolArgs(input) {
  switch (input.action) {
    case "annotate":
      return [
        ...Array.isArray(input.target) ? input.target.map((target) => looksLikeFilePath(target) || /^https?:\/\//i.test(target) ? target : `./${target}`) : plannotatorToolTargets(input),
        ...input.gate ? ["--gate"] : [],
        ...input.options?.markdown ? ["--markdown"] : [],
        ...input.tailscale ? ["--tailscale"] : []
      ];
    case "review":
      return [
        ...input.options?.base ? ["--base", input.options.base] : [],
        ...input.tailscale ? ["--tailscale"] : [],
        ...plannotatorToolTargets(input)
      ];
    case "last":
      return input.tailscale ? ["--tailscale"] : [];
    case "list":
    case "close":
      return [];
  }
}
function plannotatorTargetLines(target) {
  if (target === undefined)
    return "";
  if (typeof target === "string")
    return target.trim() ? `Target: ${target}` : "";
  const paths = target.filter((path) => path.trim() !== "");
  if (paths.length === 0)
    return "";
  if (paths.length === 1)
    return `Target: ${paths[0]}`;
  return ["Targets:", ...paths.map((path) => `- ${path}`)].join(`
`);
}
function plannotatorTailnetOpenedLine(tailnet) {
  return tailnet.ask ? `It is served over the user's tailnet (HTTPS, never public): they open the URL on their phone or another device. "Ask this session" answers there only for the Tailscale login that owns this computer.` : `It is served over the user's tailnet (HTTPS, never public): they open the URL on their phone or another device. "Ask this session" is not available on the other device for this review.`;
}
function plannotatorToolOpenedText(subject, url, gate, sessionId, target, tailnet) {
  const where = url ? `Opened ${subject} in Plannotator: ${url}` : `Plannotator is starting for ${subject}; it opens in the browser when ready.`;
  const outcome = gate ? "If they approve, an approval message arrives; if they send annotations, the feedback arrives. Closing it sends nothing." : "When they send annotations, the feedback arrives. Closing it with nothing to send sends nothing.";
  const targetLines = plannotatorTargetLines(target);
  return [
    ...sessionId ? [`Session: ${sessionId}`] : [],
    ...targetLines ? [targetLines] : [],
    where,
    ...tailnet ? [plannotatorTailnetOpenedLine(tailnet)] : [],
    'The reviewer is looking at it now. End your turn now and wait: their decision arrives later as a message in this conversation that starts with "Plannotator:".',
    outcome,
    "Do not poll, reopen it, or run the plannotator CLI for this session."
  ].join(`
`);
}
var PLANNOTATOR_OUTCOME_REVIEW_POSTED = "Review posted";
function plannotatorDecisionHeading(subject, sessionId, outcome, target) {
  const heading = `Plannotator: ${subject}${sessionId ? ` (${sessionId})` : ""} — ${outcome}.`;
  const targetLines = plannotatorTargetLines(target);
  return targetLines ? `${heading}
${targetLines}` : heading;
}
var PR_URL_PATTERN = /^https?:\/\/[^\s/]+\/.+\/(?:pull|pull-requests|merge_requests)\/(\d+)\b/i;
function plannotatorPrSubject(target) {
  if (typeof target !== "string")
    return null;
  const match = PR_URL_PATTERN.exec(target);
  if (!match)
    return null;
  return /merge_requests/i.test(target) ? `MR !${match[1]}` : `PR #${match[1]}`;
}
function plannotatorDecisionSubject(subject, launchTarget, decisionTarget) {
  if (decisionTarget === undefined || plannotatorSameTarget(launchTarget, decisionTarget))
    return subject;
  return plannotatorPrSubject(decisionTarget) ?? subject;
}
function targetEntries(target) {
  return (typeof target === "string" ? [target] : [...target]).map((value) => value.trim().replace(/[\\/]+$/, ""));
}
function plannotatorSameTarget(a, b) {
  if (a === undefined || b === undefined)
    return a === b;
  const left = targetEntries(a);
  const right = targetEntries(b);
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
function pathSegments(path) {
  return path.split(/[\\/]+/).filter((segment) => segment !== "");
}
function plannotatorDistinctSubjects(reviews) {
  const subjects = reviews.map((review) => review.subject);
  const groups = new Map;
  reviews.forEach((review, index) => {
    if (typeof review.target !== "string" || /^https?:\/\//i.test(review.target))
      return;
    const group = groups.get(review.subject) ?? [];
    group.push(index);
    groups.set(review.subject, group);
  });
  for (const [subject, members] of groups) {
    const paths = members.map((index) => pathSegments(targetEntries(reviews[index]?.target)[0]));
    const joined = paths.map((segments) => segments.join("/"));
    if (new Set(joined).size < 2)
      continue;
    const tail = (segments, depth) => segments.slice(-depth).join("/");
    members.forEach((index, position) => {
      const segments = paths[position];
      const last = segments[segments.length - 1];
      if (!last || !subject.endsWith(last))
        return;
      let depth = 2;
      while (depth < segments.length && paths.some((other, at) => joined[at] !== joined[position] && tail(other, depth) === tail(segments, depth))) {
        depth += 1;
      }
      subjects[index] = `${subject.slice(0, subject.length - last.length)}${tail(segments, depth)}`;
    });
  }
  return subjects;
}
var PLANNOTATOR_TOOL_BUNDLE_UNAVAILABLE_TEXT = "Plannotator did not open: the installed Plannotator is too old to open several files at once. Ask the user to update Plannotator to open several files at once, or open them one at a time for now.";
var PLANNOTATOR_BUNDLE_HINT_LINE = "To review several files together, pass only their paths: plannotator annotate a.md b.html";
function isOlderCliBundleRefusal(errorText) {
  return errorText.includes("Ambiguous annotate arguments:") && !errorText.includes(PLANNOTATOR_BUNDLE_HINT_LINE);
}
function fileNameOf(path) {
  const trimmed = path.replace(/[\\/]+$/, "");
  return trimmed.slice(Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\")) + 1) || trimmed;
}
function plannotatorBundleSubject(paths) {
  const names = paths.map(fileNameOf);
  const rest = names.length - 3;
  return `${names.length} files: ${names.slice(0, 3).join(", ")}${rest > 0 ? ` +${rest} more` : ""}`;
}
function plannotatorTargetSubject(kind, target) {
  if (target === undefined)
    return null;
  const entries = (typeof target === "string" ? [target] : [...target]).filter((entry) => entry.trim() !== "");
  if (entries.length === 0)
    return null;
  if (kind === "annotate" && entries.length > 1)
    return plannotatorBundleSubject(entries);
  if (entries.length !== 1)
    return null;
  const only = entries[0];
  if (kind === "review") {
    const pr = plannotatorPrSubject(only);
    if (pr)
      return pr;
    if (/^https?:\/\//i.test(only))
      return null;
    const name = fileNameOf(only);
    return name ? `changes in ${name}` : null;
  }
  if (/^https?:\/\//i.test(only)) {
    try {
      return new URL(only).host || only;
    } catch {
      return only;
    }
  }
  return fileNameOf(only) || null;
}
function looksLikeFilePath(word) {
  if (/^https?:\/\//i.test(word))
    return false;
  if (/[\\/]/.test(word) || /^[~.@]/.test(word))
    return true;
  return /\.[A-Za-z0-9]{1,12}$/.test(word);
}
function ageText(ms) {
  const minutes = Math.floor(Math.max(0, ms) / 60000);
  if (minutes < 1)
    return "under a minute";
  if (minutes < 60)
    return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48)
    return `${hours} h`;
  return `${Math.floor(hours / 24)} days`;
}
function plannotatorToolListText(sessions) {
  if (sessions.length === 0)
    return "No open Plannotator reviews from this conversation.";
  const lines = sessions.map((session) => [
    session.id,
    session.kind,
    session.subject,
    session.url ?? "no url yet",
    ageText(session.ageMs),
    session.state,
    `unsent: ${session.unsent === null ? "unknown" : session.unsent}`
  ].join(" · "));
  const plans = sessions.some((session) => session.kind === "plan");
  return [
    `${sessions.length} open Plannotator ${sessions.length === 1 ? "review" : "reviews"} from this conversation:`,
    ...lines,
    plans ? `Close one you no longer need with action "close" and its session id. Plan reviews close only with the reviewer's decision.` : 'Close one you no longer need with action "close" and its session id.'
  ].join(`
`);
}
function savedText(unsent) {
  if (unsent === null)
    return "any unsent comments stay saved as a draft";
  if (unsent === 0)
    return "no unsent comments";
  return `${unsent} unsent ${unsent === 1 ? "comment" : "comments"} saved as a draft`;
}
function plannotatorToolCloseText(outcomes) {
  if (outcomes.length === 0)
    return "No open Plannotator reviews from this conversation to close.";
  const lines = outcomes.map((outcome) => {
    if (outcome.closed)
      return `Closed ${outcome.subject} (${outcome.id}): ${savedText(outcome.unsent)}.`;
    switch (outcome.reason) {
      case "plan":
        return `Not closed: ${outcome.subject} (${outcome.id}) is a plan review; it ends with the reviewer's decision.`;
      case "decided":
        return `Not closed: ${outcome.subject} (${outcome.id}) was already decided; its decision arrives as a message.`;
      case "failed":
        return `Could not close ${outcome.subject} (${outcome.id})${outcome.detail ? `: ${outcome.detail}` : ""}.`;
    }
  });
  const closedAny = outcomes.some((outcome) => outcome.closed);
  return closedAny ? [...lines, "Nothing more arrives for a review you closed."].join(`
`) : lines.join(`
`);
}
function plannotatorUnknownSessionText(id) {
  return `No open Plannotator review ${id} from this conversation. Call the plannotator tool with action "list" to see yours.`;
}

// ../../packages/shared/annotate-target.ts
function probeAnnotateToken(token, projectRoot, options) {
  if (!token)
    return null;
  const unwrapped = stripAtPrefix(token);
  if (/^https?:\/\//i.test(unwrapped))
    return unwrapped;
  const allowBareDirectory = options?.bareDirectories !== false;
  if (allowBareDirectory || /[\\/]/.test(token)) {
    const folder = resolveAtReference(token, (candidate) => {
      try {
        return statSync4(resolveUserPath(candidate, projectRoot)).isDirectory();
      } catch {
        return false;
      }
    });
    if (folder !== null)
      return resolveUserPath(folder, projectRoot);
  }
  const html = resolveAtReference(token, (candidate) => {
    const abs = resolveUserPath(candidate, projectRoot);
    return /\.html?$/i.test(abs) && existsSync5(abs);
  });
  if (html !== null)
    return resolveUserPath(html, projectRoot);
  let doc = resolveMarkdownFile(unwrapped, projectRoot);
  if (doc.kind === "not_found" && unwrapped !== token) {
    doc = resolveMarkdownFile(token, projectRoot);
  }
  if (doc.kind === "found")
    return doc.path;
  if (doc.kind === "ambiguous")
    return unwrapped;
  const literal = resolveAtReference(token, (candidate) => {
    try {
      return statSync4(resolveUserPath(candidate, projectRoot)).isFile();
    } catch {
      return false;
    }
  });
  if (literal !== null)
    return resolveUserPath(literal, projectRoot);
  return null;
}
function annotateInputNamesExistingTarget(input, projectRoot) {
  const trimmed = (input ?? "").trim();
  if (!trimmed)
    return false;
  return probeAnnotateToken(trimmed, projectRoot) !== null;
}
function probeAnnotateBundlePath(token, projectRoot) {
  if (!token)
    return null;
  if (/^https?:\/\//i.test(stripAtPrefix(token)))
    return null;
  const candidate = resolveAtReference(token, (value) => {
    try {
      return statSync4(resolveUserPath(value, projectRoot)).isFile();
    } catch {
      return false;
    }
  });
  return candidate === null ? null : resolveUserPath(candidate, projectRoot);
}
function annotatePathExists(token, projectRoot) {
  return resolveAtReference(token, (value) => existsSync5(resolveUserPath(value, projectRoot))) !== null;
}
function bundleIdentity(path) {
  try {
    return realpathSync3(path);
  } catch {
    return path;
  }
}
function selectAnnotateTokenTarget(rawInput, probe, options = {}) {
  const tokens = (Array.isArray(rawInput) ? rawInput.map((token) => token.trim()) : (rawInput ?? "").trim().split(/\s+/)).filter(Boolean);
  const flagTokens = tokens.filter((token) => token.startsWith("-"));
  if (flagTokens.length > 0) {
    return { kind: "flagged", flagTokens };
  }
  const bundlePath = options.bundlePath;
  const uniqueTokens = [...new Set(tokens)];
  if (bundlePath && uniqueTokens.length > 1) {
    const files = [];
    const identities = new Set;
    let allFiles = true;
    for (const token of uniqueTokens) {
      const value = bundlePath(token);
      if (value === null) {
        allFiles = false;
        break;
      }
      const identity = bundleIdentity(value);
      if (identities.has(identity))
        continue;
      identities.add(identity);
      files.push({ token, value });
    }
    if (allFiles) {
      return files.length === 1 ? { kind: "single", candidate: files[0] } : { kind: "bundle", files };
    }
    const pathExists = options.pathExists;
    if (pathExists && uniqueTokens.every((token) => looksLikeFilePath(stripAtPrefix(token)))) {
      const missing = uniqueTokens.filter((token) => !pathExists(token) && probe(token) === null);
      if (missing.length > 0)
        return { kind: "missing", missing };
    }
  }
  const seen = new Set;
  const words = [];
  const candidates = [];
  for (const token of tokens) {
    if (seen.has(token))
      continue;
    seen.add(token);
    words.push(token);
    const value = probe(token);
    if (value !== null)
      candidates.push({ token, value });
  }
  if (candidates.length === 1) {
    return { kind: "single", candidate: candidates[0] };
  }
  if (candidates.length > 1) {
    return { kind: "multiple", candidates };
  }
  return { kind: "none", words };
}
function buildMissingAnnotateFilesMessage(missing) {
  return [
    `${missing.length === 1 ? "File" : "Files"} not found: ${missing.join(", ")}`,
    "Every file of a review of several files must exist; nothing was opened. Fix the path and run the command again."
  ].join(`
`);
}

// ../../packages/shared/annotate-bundle.ts
function annotateBundleTargetText(paths) {
  return paths.join(", ");
}

// ../../packages/shared/review-args.ts
import { statSync as statSync5 } from "node:fs";
var REVIEW_OPEN_DIFF_TYPES = [
  "since-base",
  "local-vs-remote",
  "uncommitted",
  "staged",
  "unstaged",
  "last-commit",
  "branch",
  "merge-base",
  "all"
];
function parseReviewArgs(input) {
  const tokens = Array.isArray(input) ? input.map((token) => stripWrappingQuotes(token.trim())).filter(Boolean) : tokenizeReviewArgs(input ?? "");
  let vcsType;
  let useLocal = true;
  let base;
  let diffType;
  let gitRemoteCheck;
  let gate = false;
  const errors = [];
  const positional = [];
  let patchFile;
  let localFlagSeen = false;
  for (let i = 0;i < tokens.length; i++) {
    const token = tokens[i];
    switch (token) {
      case "--git":
        vcsType = "git";
        break;
      case "--gitbutler":
        vcsType = "gitbutler";
        break;
      case "--patch-file": {
        const value = tokens[i + 1];
        if (value === undefined || value.startsWith("--")) {
          errors.push("--patch-file requires a path or -");
          break;
        }
        i++;
        if (patchFile !== undefined) {
          errors.push("--patch-file may only be specified once");
          break;
        }
        patchFile = value;
        break;
      }
      case "--no-git-remote-check":
        gitRemoteCheck = false;
        break;
      case "--gate":
        gate = true;
        break;
      case "--local":
        useLocal = true;
        localFlagSeen = true;
        break;
      case "--no-local":
        useLocal = false;
        localFlagSeen = true;
        break;
      case "--base": {
        const value = tokens[i + 1];
        if (value === undefined || value.startsWith("-")) {
          errors.push("Missing value for --base");
          break;
        }
        i++;
        if (base !== undefined) {
          errors.push("--base may only be specified once");
          break;
        }
        if (/\s/.test(value) || value.includes("..")) {
          errors.push(`Invalid base ref: ${value}`);
          break;
        }
        base = value;
        break;
      }
      case "--diff-type": {
        const value = tokens[i + 1];
        if (value === undefined || value.startsWith("-")) {
          errors.push("Missing value for --diff-type");
          break;
        }
        i++;
        if (diffType !== undefined) {
          errors.push("--diff-type may only be specified once");
          break;
        }
        if (!REVIEW_OPEN_DIFF_TYPES.includes(value)) {
          errors.push(`Unknown diff type: ${value}. Expected one of: ${REVIEW_OPEN_DIFF_TYPES.join(", ")}`);
          break;
        }
        diffType = value;
        break;
      }
      default:
        if (token.startsWith("-")) {
          errors.push(`Unknown review option: ${token}`);
        } else {
          positional.push(token);
        }
        break;
    }
  }
  const urls = positional.filter(isReviewUrl);
  const words = positional.filter((token) => !isReviewUrl(token));
  if (urls.length > 1) {
    errors.push("Review accepts only one PR/MR URL");
  }
  const prUrl = urls[0];
  if (patchFile !== undefined) {
    if (prUrl) {
      errors.push("--patch-file cannot be combined with a PR/MR URL");
    }
    if (base)
      errors.push("--patch-file cannot be combined with --base");
    if (diffType)
      errors.push("--patch-file cannot be combined with --diff-type");
    if (vcsType)
      errors.push("--patch-file cannot be combined with --git/--gitbutler");
    if (localFlagSeen)
      errors.push("--patch-file cannot be combined with --local/--no-local");
  }
  return {
    prUrl,
    ...words.length === 0 ? {} : { words },
    patchFile,
    vcsType,
    useLocal,
    base,
    diffType,
    ...gitRemoteCheck === undefined ? {} : { gitRemoteCheck },
    ...gate ? { gate } : {},
    errors
  };
}
function looksLikePath(word) {
  return /[\\/]/.test(word) || word.startsWith(".") || word.startsWith("~");
}
function resolveReviewTarget(parsed, cwd) {
  const words = parsed.words ?? [];
  const sole = words.length === 1 && parsed.prUrl === undefined;
  const directories = [];
  const ignored = [];
  for (const word of words) {
    const pathLike = looksLikePath(word);
    if (!sole && !pathLike) {
      ignored.push(word);
      continue;
    }
    const resolved = resolveUserPath(word, cwd);
    let isDirectory;
    try {
      isDirectory = statSync5(resolved).isDirectory();
    } catch {
      isDirectory = undefined;
    }
    if (!sole && !isDirectory) {
      ignored.push(word);
      continue;
    }
    if (isDirectory === undefined) {
      if (pathLike)
        throw new Error(`Review directory does not exist or is not accessible: ${resolved}`);
      ignored.push(word);
      continue;
    }
    if (!isDirectory)
      throw new Error(`Review target is not a directory: ${resolved}`);
    directories.push(resolved);
  }
  if (directories.length + (parsed.prUrl ? 1 : 0) > 1) {
    throw new Error("Review accepts only one directory or PR/MR URL. Quote paths containing spaces.");
  }
  if (directories.length > 0 && parsed.patchFile !== undefined) {
    throw new Error("--patch-file cannot be combined with a review directory");
  }
  return { ...directories[0] === undefined ? {} : { directory: directories[0] }, ignored };
}
function isReviewUrl(value) {
  return value.startsWith("http://") || value.startsWith("https://");
}
function tokenizeReviewArgs(input) {
  const raw = input.trim();
  if (!raw)
    return [];
  const tokens = [];
  let current = "";
  let quote;
  for (let i = 0;i < raw.length; i++) {
    const char = raw[i];
    if (quote) {
      if (char === quote) {
        quote = undefined;
      } else {
        current += char;
      }
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }
    current += char;
  }
  if (current)
    tokens.push(current);
  return tokens.map((token) => stripWrappingQuotes(token.trim())).filter(Boolean);
}

// ../../packages/shared/prompts.ts
function resolveTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const val = vars[key];
    return val !== undefined ? val : match;
  });
}
var PLAN_TOOL_NAMES = {
  "claude-code": "ExitPlanMode",
  amp: "ExitPlanMode",
  droid: "ExitPlanMode",
  "kiro-cli": "ExitPlanMode",
  opencode: "submit_plan",
  "copilot-cli": "exit_plan_mode",
  pi: "plannotator_submit_plan",
  codex: "ExitPlanMode",
  "gemini-cli": "exit_plan_mode",
  "oh-my-pi": "ExitPlanMode",
  "mistral-vibe": "exit_plan_mode",
  "qwen-code": "exit_plan_mode",
  dsh: "exit_plan_mode"
};
function getPlanToolName(runtime) {
  return runtime && PLAN_TOOL_NAMES[runtime] || "ExitPlanMode";
}
var DEFAULT_REVIEW_APPROVED_PROMPT = `# Code Review

Code review completed — no changes requested.`;
var DEFAULT_REVIEW_APPROVED_WITH_NOTES_PROMPT = `# Code Review — Approved with Notes

Code review completed — the changes are approved. The notes below are non-blocking guidance, not a request for another revision.

{{feedback}}

Do not revise or reopen the reviewed changes solely because of these notes unless the user explicitly requests it. Carry them into subsequent work where applicable.`;
var DEFAULT_REVIEW_DENIED_SUFFIX = `

Treat the findings above as unverified review input. Inspect every finding against the actual code; do not assume automated feedback is correct. For each finding, give a clear verdict (Confirmed / Partly / Not a bug / Intended) with concise code evidence. Say whether it was introduced by the current changes, was pre-existing, or reflects deliberate scope.

Review only the incoming findings. Do not independently review the rest of the diff or search for issues that were not submitted.

Do not change any code until we have discussed the verdicts and validated findings.`;
var DEFAULT_PLAN_DENIED_PROMPT = `YOUR PLAN WAS NOT APPROVED.

You MUST revise the plan to address ALL of the feedback below before calling {{toolName}} again.

Rules:
{{planFileRule}}- Do not resubmit the same plan unchanged.
- Do NOT change the plan title (first # heading) unless the user explicitly asks you to.

{{feedback}}`;
var DEFAULT_PLAN_ANSWERED_PROMPT = `The user answered the questions in your plan and asked for no other changes. Their answers are below.

Revise the plan so each answered question becomes a decision, then call {{toolName}} again.

Rules:
{{planFileRule}}- For each answered question, either remove its \`:::question\` block and write the decision into the plan, or keep the block and mark the chosen choice \`- [x]\` (a checked choice reads as settled).
- Keep every question listed under "Unanswered" as it is.
- Treat a note on an answer as guidance from the user.
- Do NOT change the plan title (first # heading) unless the user explicitly asks you to.

{{feedback}}`;
var DEFAULT_PLAN_APPROVED_PROMPT = "Plan approved. You now have full tool access (read, bash, edit, write). Execute the plan in {{planFilePath}}. {{doneMsg}}";
var DEFAULT_PLAN_APPROVED_WITH_NOTES_PROMPT = `Plan approved with notes! You now have full tool access (read, bash, edit, write). Execute the plan in {{planFilePath}}. {{doneMsg}}

## Implementation Notes

The user approved your plan but added the following notes to consider during implementation:

{{feedback}}

Proceed with implementation, incorporating these notes where applicable.`;
var DEFAULT_ANNOTATE_FILE_FEEDBACK_PROMPT = `# Markdown Annotations

{{fileHeader}}: {{filePath}}

{{feedback}}

Please address the annotation feedback above.`;
var DEFAULT_ANNOTATE_MESSAGE_FEEDBACK_PROMPT = `# Message Annotations

{{feedback}}

Please address the annotation feedback above.`;
var DEFAULT_ANNOTATE_APPROVED_WITH_NOTES_PROMPT = `# Approved with Notes

The artifact is approved. The notes below are non-blocking guidance, not a request for another revision.

{{contextBlock}}{{feedback}}

Do not revise or reopen the artifact solely because of these notes unless the user explicitly requests it. Carry the notes into subsequent work where applicable.`;
function normalizePrompt(prompt) {
  if (typeof prompt !== "string")
    return;
  return prompt.trim() ? prompt : undefined;
}
function getConfiguredPrompt(options) {
  const resolvedConfig = options.config ?? loadConfig();
  const section = resolvedConfig.prompts?.[options.section];
  const runtimePrompt = options.runtime ? normalizePrompt(section?.runtimes?.[options.runtime]?.[options.key]) : undefined;
  const genericPrompt = normalizePrompt(section?.[options.key]);
  const runtimeFallback = options.runtime ? options.runtimeFallbacks?.[options.runtime] : undefined;
  return runtimePrompt ?? genericPrompt ?? runtimeFallback ?? options.fallback;
}
function getReviewApprovedPrompt(runtime, config) {
  return getConfiguredPrompt({
    section: "review",
    key: "approved",
    runtime,
    config,
    fallback: DEFAULT_REVIEW_APPROVED_PROMPT
  });
}
var LEGACY_REVIEW_APPROVAL_PLACEHOLDER = "LGTM - no changes requested.";
function getReviewApprovedWithNotesPrompt(runtime, config, vars) {
  const template = getConfiguredPrompt({
    section: "review",
    key: "approvedWithNotes",
    runtime,
    config,
    fallback: DEFAULT_REVIEW_APPROVED_WITH_NOTES_PROMPT
  });
  return vars ? resolveTemplate(template, vars) : template;
}
function composeReviewApprovedMessage(runtime, feedback, config) {
  const note = typeof feedback === "string" ? feedback.trim() : "";
  if (!note || note === LEGACY_REVIEW_APPROVAL_PLACEHOLDER) {
    return getReviewApprovedPrompt(runtime, config);
  }
  return getReviewApprovedWithNotesPrompt(runtime, config, { feedback: note });
}
function getReviewDeniedSuffix(runtime, config) {
  return getConfiguredPrompt({
    section: "review",
    key: "denied",
    runtime,
    config,
    fallback: DEFAULT_REVIEW_DENIED_SUFFIX
  });
}
function getPlanDeniedPrompt(runtime, config, vars) {
  const template = getConfiguredPrompt({
    section: "plan",
    key: "denied",
    runtime,
    config,
    fallback: DEFAULT_PLAN_DENIED_PROMPT
  });
  return resolveTemplate(template, vars ?? {});
}
function getPlanAnsweredPrompt(runtime, config, vars) {
  const template = getConfiguredPrompt({
    section: "plan",
    key: "answered",
    runtime,
    config,
    fallback: DEFAULT_PLAN_ANSWERED_PROMPT
  });
  return resolveTemplate(template, vars ?? {});
}
function composePlanDeniedMessage(runtime, config, vars, options) {
  return options?.answersOnly === true ? getPlanAnsweredPrompt(runtime, config, vars) : getPlanDeniedPrompt(runtime, config, vars);
}
var PLAN_APPROVED_RUNTIME_DEFAULTS = {
  opencode: "Plan approved!{{doneMsg}}"
};
function getPlanApprovedPrompt(runtime, config, vars) {
  const template = getConfiguredPrompt({
    section: "plan",
    key: "approved",
    runtime,
    config,
    fallback: DEFAULT_PLAN_APPROVED_PROMPT,
    runtimeFallbacks: PLAN_APPROVED_RUNTIME_DEFAULTS
  });
  return resolveTemplate(template, vars ?? {});
}
var PLAN_APPROVED_WITH_NOTES_RUNTIME_DEFAULTS = {
  opencode: `Plan approved with notes!
{{doneMsg}}

## Implementation Notes

The user approved your plan but added the following notes to consider during implementation:

{{feedback}}{{proceedSuffix}}`,
  dsh: `Plan approved with notes!{{doneMsg}}

## Implementation Notes

The user approved your plan but added the following notes to consider during implementation:

{{feedback}}

Proceed with implementation, incorporating these notes where applicable.`
};
function getPlanApprovedWithNotesPrompt(runtime, config, vars) {
  const template = getConfiguredPrompt({
    section: "plan",
    key: "approvedWithNotes",
    runtime,
    config,
    fallback: DEFAULT_PLAN_APPROVED_WITH_NOTES_PROMPT,
    runtimeFallbacks: PLAN_APPROVED_WITH_NOTES_RUNTIME_DEFAULTS
  });
  return resolveTemplate(template, { proceedSuffix: "", ...vars });
}
function getAnnotateFileFeedbackTemplate(runtime, config) {
  return getConfiguredPrompt({
    section: "annotate",
    key: "fileFeedback",
    runtime,
    config,
    fallback: DEFAULT_ANNOTATE_FILE_FEEDBACK_PROMPT
  });
}
function getAnnotateMessageFeedbackTemplate(runtime, config) {
  return getConfiguredPrompt({
    section: "annotate",
    key: "messageFeedback",
    runtime,
    config,
    fallback: DEFAULT_ANNOTATE_MESSAGE_FEEDBACK_PROMPT
  });
}
function getAnnotateFileFeedbackPrompt(runtime, config, vars) {
  return resolveTemplate(getAnnotateFileFeedbackTemplate(runtime, config), vars ?? {});
}
function getAnnotateMessageFeedbackPrompt(runtime, config, vars) {
  return resolveTemplate(getAnnotateMessageFeedbackTemplate(runtime, config), vars ?? {});
}
function getAnnotateApprovedWithNotesPrompt(runtime, config, vars) {
  const template = getConfiguredPrompt({
    section: "annotate",
    key: "approvedWithNotes",
    runtime,
    config,
    fallback: DEFAULT_ANNOTATE_APPROVED_WITH_NOTES_PROMPT
  });
  return resolveTemplate(template, {
    ...vars,
    context: vars?.context ?? "",
    contextBlock: vars?.contextBlock ?? (vars?.context ? `${vars.context}

` : "")
  });
}

// v2-client.ts
function isRecord2(value) {
  return !!value && typeof value === "object";
}
function readEntries(response) {
  if (Array.isArray(response))
    return response;
  if (isRecord2(response) && Array.isArray(response.data))
    return response.data;
  return [];
}
function readListPayload(response) {
  const entries = [];
  for (const entry of readEntries(response)) {
    if (!isRecord2(entry) || typeof entry.name !== "string")
      continue;
    entries.push({
      name: entry.name,
      description: typeof entry.description === "string" ? entry.description : undefined
    });
  }
  return entries;
}
function normalizeAgentList(response) {
  const entries = readEntries(response);
  const agents = [];
  for (const entry of entries) {
    if (!isRecord2(entry))
      continue;
    const name = typeof entry.id === "string" ? entry.id : typeof entry.name === "string" ? entry.name : undefined;
    if (!name)
      continue;
    agents.push({
      name,
      description: typeof entry.description === "string" ? entry.description : undefined,
      mode: typeof entry.mode === "string" ? entry.mode : undefined,
      hidden: entry.hidden === true,
      model: normalizeAgentModel(entry.model)
    });
  }
  return agents;
}
function normalizeAgentModel(value) {
  if (!isRecord2(value))
    return;
  if (typeof value.providerID !== "string" || !value.providerID)
    return;
  if (typeof value.id !== "string" || !value.id)
    return;
  if (value.variant !== undefined && typeof value.variant !== "string")
    return;
  return {
    providerID: value.providerID,
    id: value.id,
    ...value.variant ? { variant: value.variant } : {}
  };
}
function supportsSwitchAgent(ctx) {
  return typeof ctx.session?.switchAgent === "function";
}
function supportsSwitchModel(ctx) {
  return typeof ctx.session?.switchModel === "function";
}
function toBridgeMessages(context) {
  if (!Array.isArray(context))
    return [];
  return context.filter(isRecord2).map((message) => ({
    info: {
      id: typeof message.id === "string" ? message.id : undefined,
      role: typeof message.type === "string" ? message.type : undefined,
      time: isRecord2(message.time) ? { created: message.time.created } : undefined,
      ...typeof message.agent === "string" && message.agent ? { agent: message.agent } : {}
    },
    parts: Array.isArray(message.content) ? message.content : []
  }));
}
function joinTextParts(parts) {
  return parts.filter((part) => isRecord2(part) && part.type === "text" && typeof part.text === "string").map((part) => part.text).join(`
`);
}
async function readSessionAgent(ctx, sessionID) {
  try {
    const session = await ctx.session?.get?.({ sessionID });
    return isRecord2(session) && typeof session.agent === "string" ? session.agent : undefined;
  } catch {
    return;
  }
}
function readSessionId(request) {
  if (!isRecord2(request) || !isRecord2(request.path))
    return;
  return typeof request.path.id === "string" ? request.path.id : undefined;
}
var FEEDBACK_DELIVERY = "queue";
var CO_PROMOTED_DELIVERY = "steer";
var NOTICE_SETTLED_EVENT_TYPES = new Set([
  "session.inbox.delivered",
  "session.inbox.cancelled",
  "session.input.promoted"
]);
function readSettledInboxRef(event) {
  if (!isRecord2(event) || typeof event.type !== "string")
    return;
  if (!NOTICE_SETTLED_EVENT_TYPES.has(event.type))
    return;
  const data = isRecord2(event.data) ? event.data : undefined;
  if (!data || typeof data.sessionID !== "string")
    return;
  const inboxID = typeof data.inboxID === "string" ? data.inboxID : typeof data.inputID === "string" ? data.inputID : undefined;
  if (!inboxID)
    return;
  return { sessionID: data.sessionID, inboxID };
}
function createNoticePendingTracker(ctx, sessionID) {
  let pending = false;
  let noticeID;
  const settled = new Set;
  let controller;
  let disposed = false;
  const stop = () => {
    const own = controller;
    controller = undefined;
    own?.abort();
  };
  return {
    posting: () => {
      if (disposed)
        return;
      pending = true;
      const subscribe = ctx.event?.subscribe;
      if (controller || typeof subscribe !== "function" || !sessionID)
        return;
      const own = new AbortController;
      controller = own;
      (async () => {
        try {
          for await (const event of subscribe({ signal: own.signal })) {
            const ref = readSettledInboxRef(event);
            if (!ref || ref.sessionID !== sessionID)
              continue;
            settled.add(ref.inboxID);
            if (noticeID !== undefined && ref.inboxID === noticeID) {
              pending = false;
              break;
            }
          }
        } catch {} finally {
          if (controller === own)
            controller = undefined;
        }
      })();
    },
    admitted: (inboxID) => {
      if (disposed)
        return;
      noticeID = inboxID;
      pending = !(inboxID !== undefined && settled.has(inboxID));
      if (!pending)
        stop();
    },
    rejected: () => {
      pending = false;
      stop();
    },
    pending: () => pending,
    settle: () => {
      pending = false;
      stop();
    },
    dispose: () => {
      disposed = true;
      pending = false;
      stop();
    }
  };
}
var SESSION_URL_NOTICE_PREFIX = "Plannotator session ready: ";
function formatSessionUrlNotice(url) {
  return `${SESSION_URL_NOTICE_PREFIX}${url}`;
}
function formatCommandFailureNotice(command, message) {
  return `Plannotator /${command} failed: ${message.trim()}`;
}
var COMMAND_FAILURE_NOTICE_MARKER = `

(Plannotator notice for the person; not a request.)`;
function commandFailureNoticeText(command, message) {
  return `${formatCommandFailureNotice(command, message)}${COMMAND_FAILURE_NOTICE_MARKER}`;
}
var COMMAND_FAILURE_NOTICE_RE = /^Plannotator \/plannotator-(?:review|annotate|last|inbox) failed: \S[\s\S]*\n\n\(Plannotator notice for the person; not a request\.\)$/;
function formatInboxNotice(url, detail) {
  const note = detail?.trim();
  return `Plannotator Inbox: ${url}${note ? `
${note}` : ""}`;
}
function inboxNoticeText(url, detail) {
  return `${formatInboxNotice(url, detail)}${COMMAND_FAILURE_NOTICE_MARKER}`;
}
var INBOX_NOTICE_RE = /^Plannotator Inbox: https?:\/\/\S+[\s\S]*\n\n\(Plannotator notice for the person; not a request\.\)$/;
function userMessageText(message) {
  if (!isRecord2(message) || message.role !== "user")
    return;
  const content = message.content;
  const text = typeof content === "string" ? content : Array.isArray(content) && content.length === 1 && isRecord2(content[0]) && content[0].type === "text" ? content[0].text : undefined;
  return typeof text === "string" ? text : undefined;
}
function hasInboxNotice(messages) {
  return messages.some((message) => INBOX_NOTICE_RE.test(userMessageText(message) ?? ""));
}
function createInboxBriefings() {
  const sessions = new Set;
  return {
    mark: (sessionID) => void sessions.add(sessionID),
    wants: (event) => sessions.has(event.sessionID) || hasInboxNotice(event.messages)
  };
}
function isSessionUrlNoticeMessage(message) {
  const text = userMessageText(message);
  if (typeof text !== "string")
    return false;
  if (COMMAND_FAILURE_NOTICE_RE.test(text) || INBOX_NOTICE_RE.test(text))
    return true;
  return text.startsWith(SESSION_URL_NOTICE_PREFIX) && /^https?:\/\/\S+$/.test(text.slice(SESSION_URL_NOTICE_PREFIX.length));
}
function dropSessionUrlNotices(messages) {
  const notices = [];
  messages.forEach((message, index) => {
    if (isSessionUrlNoticeMessage(message))
      notices.push(index);
  });
  if (notices.length === 0)
    return 0;
  let keep;
  const lastNotice = notices[notices.length - 1];
  if (lastNotice === messages.length - 1) {
    let previous = lastNotice - 1;
    while (previous >= 0 && notices.includes(previous))
      previous--;
    const before = messages[previous];
    if (previous < 0 || isRecord2(before) && before.role === "assistant")
      keep = lastNotice;
  }
  let removed = 0;
  for (let i = notices.length - 1;i >= 0; i--) {
    if (notices[i] === keep)
      continue;
    messages.splice(notices[i], 1);
    removed++;
  }
  return removed;
}
function createSessionUrlNotifier(ctx, sessionID, notice) {
  const synthetic = ctx.session?.synthetic;
  if (typeof synthetic !== "function" || !sessionID)
    return;
  return async ({ url }) => {
    const text = formatSessionUrlNotice(url);
    notice?.posting?.();
    let admitted;
    try {
      admitted = await synthetic({
        sessionID,
        text,
        description: text,
        resume: false,
        delivery: CO_PROMOTED_DELIVERY
      });
    } catch (error) {
      notice?.rejected?.();
      throw error;
    }
    notice?.admitted?.(readAdmittedInboxID(admitted));
    return admitted;
  };
}
function readAdmittedInboxID(response) {
  if (!isRecord2(response) || typeof response.id !== "string" || !response.id)
    return;
  return response.id;
}
function createCommandFailureNotifier(ctx, sessionID) {
  const synthetic = ctx.session?.synthetic;
  if (typeof synthetic !== "function" || !sessionID)
    return;
  return async ({ command, message }) => {
    const description = formatCommandFailureNotice(command, message);
    const text = commandFailureNoticeText(command, message);
    return await synthetic({ sessionID, text, description, resume: false, delivery: CO_PROMOTED_DELIVERY });
  };
}
function createInboxNotifier(ctx, sessionID) {
  const synthetic = ctx.session?.synthetic;
  if (typeof synthetic !== "function" || !sessionID)
    return;
  return async ({ url, detail }) => {
    const description = formatInboxNotice(url, detail);
    const text = inboxNoticeText(url, detail);
    return await synthetic({ sessionID, text, description, resume: false, delivery: CO_PROMOTED_DELIVERY });
  };
}
function createV2BridgeClient(input) {
  const warn = input.warn ?? ((message) => console.error(message));
  const loggedUrls = new Set;
  const noticeSessionID = input.notice?.sessionID ?? input.sessionID;
  const notice = createNoticePendingTracker(input.ctx, noticeSessionID);
  const postNotice = createSessionUrlNotifier(input.ctx, noticeSessionID, {
    posting: notice.posting,
    admitted: notice.admitted,
    rejected: notice.rejected
  });
  const noticeOpen = input.notice?.open;
  const notifyUrl = postNotice && noticeOpen ? async (url) => noticeOpen() ? postNotice(url) : undefined : postNotice;
  const notifyFailure = input.failureNotices ? createCommandFailureNotifier(input.ctx, input.sessionID) : undefined;
  const notifyInbox = input.failureNotices ? createInboxNotifier(input.ctx, input.sessionID) : undefined;
  return {
    ...notifyUrl && { notifyUrl },
    ...notifyFailure && { notifyFailure },
    ...notifyInbox && { notifyInbox },
    ...input.onInboxOpened && { briefInbox: input.onInboxOpened },
    dispose: notice.dispose,
    app: {
      agents: async () => ({ data: await input.getAgents() }),
      log: ({ message }) => {
        const url = /https?:\/\/\S+/.exec(message)?.[0];
        if (url && loggedUrls.has(url))
          return;
        if (url)
          loggedUrls.add(url);
        console.error(message);
      }
    },
    session: {
      messages: async (request) => {
        const sessionID = readSessionId(request);
        if (!sessionID)
          return { data: [] };
        const context = await input.ctx.session?.context?.({ sessionID });
        return { data: toBridgeMessages(context) };
      },
      prompt: async (request) => {
        const sessionID = readSessionId(request);
        if (!sessionID)
          throw new Error("Plannotator feedback has no OpenCode session to deliver to.");
        const body = isRecord2(request) && isRecord2(request.body) ? request.body : {};
        const agent = typeof body.agent === "string" ? body.agent : undefined;
        if (agent && typeof input.ctx.session?.switchAgent === "function") {
          try {
            if (await readSessionAgent(input.ctx, sessionID) !== agent) {
              await input.ctx.session.switchAgent({ sessionID, agent });
            }
          } catch (error) {
            warn(`[Plannotator] Could not switch the OpenCode session to "${agent}": ${error instanceof Error ? error.message : String(error)}`);
          }
        }
        const prompt = input.ctx.session?.prompt;
        if (typeof prompt !== "function") {
          throw new Error("OpenCode 2 host exposes no session.prompt; cannot deliver Plannotator feedback.");
        }
        const delivered = await prompt({
          sessionID,
          text: joinTextParts(Array.isArray(body.parts) ? body.parts : []),
          delivery: notice.pending() && !input.alwaysQueue && sessionID === noticeSessionID ? CO_PROMOTED_DELIVERY : FEEDBACK_DELIVERY
        });
        notice.settle();
        return delivered;
      }
    }
  };
}

// agent-switch.ts
function resolveTargetAgent(agentSwitch) {
  const trimmed = agentSwitch?.trim();
  return trimmed && trimmed !== "disabled" ? trimmed : undefined;
}
function warnAgentUnavailable(client, targetAgent, delivery) {
  const action = delivery === "plan-approval" ? "approving the plan" : "sending feedback";
  const message = `Configured OpenCode agent "${targetAgent}" is not available; ` + `${action} without switching agents.`;
  try {
    client.app?.log?.({ level: "info", message: `[Plannotator] ${message}` });
  } catch {}
  try {
    const result = client.tui?.showToast?.({
      body: { title: "Plannotator", message, variant: "warning" }
    });
    if (result && typeof result.catch === "function") {
      result.catch(() => {});
    }
  } catch {}
}
async function resolveValidatedTargetAgent(input) {
  const targetAgent = resolveTargetAgent(input.targetAgent);
  if (!targetAgent)
    return;
  try {
    const response = await input.client.app?.agents?.({
      query: { directory: input.directory }
    });
    const agents = response?.data ?? [];
    if (agents.some((agent) => agent.name === targetAgent)) {
      return targetAgent;
    }
  } catch {}
  warnAgentUnavailable(input.client, targetAgent, input.delivery ?? "feedback");
  return;
}
async function switchV2SessionAgent(input) {
  const warn = input.warn ?? ((message) => console.error(message));
  const targetAgent = resolveTargetAgent(input.requestedAgent);
  if (!targetAgent)
    return;
  const selected = (await input.getAgents()).find((agent) => agent.name === targetAgent);
  if (!selected) {
    warn(`[Plannotator] Configured OpenCode agent "${targetAgent}" is not available; ` + "approving the plan without switching agents.");
    return;
  }
  if (!supportsSwitchAgent(input.ctx)) {
    warn("[Plannotator] This OpenCode 2 host does not expose agent switching to plugins; " + "approving the plan without switching agents.");
    return;
  }
  try {
    await input.ctx.session.switchAgent({ sessionID: input.sessionID, agent: targetAgent });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    warn(`[Plannotator] Could not switch the OpenCode session to "${targetAgent}": ${detail}`);
    return;
  }
  if (!selected.model)
    return targetAgent;
  if (!supportsSwitchModel(input.ctx)) {
    warn(`[Plannotator] Switched the OpenCode session to "${targetAgent}", but this host cannot ` + "select its configured model.");
    return targetAgent;
  }
  try {
    await input.ctx.session.switchModel({
      sessionID: input.sessionID,
      model: selected.model
    });
  } catch (error) {
    warn(`[Plannotator] Switched the OpenCode session to "${targetAgent}", but could not select ` + `its configured model: ${error instanceof Error ? error.message : String(error)}`);
  }
  return targetAgent;
}

// prompt-delivery-error.ts
var OPENCODE_PROMPT_DELIVERY_ERROR_CODE = "PLANNOTATOR_OPENCODE_PROMPT_DELIVERY";

class OpenCodePromptDeliveryError extends Error {
  code = OPENCODE_PROMPT_DELIVERY_ERROR_CODE;
  constructor(message, options) {
    super(message, options);
    this.name = "OpenCodePromptDeliveryError";
  }
}
function isOpenCodePromptDeliveryError(error) {
  return error instanceof OpenCodePromptDeliveryError || error instanceof Error && error.code === OPENCODE_PROMPT_DELIVERY_ERROR_CODE;
}
async function deliverOpenCodePrompt(input) {
  try {
    if (typeof input.client.session?.prompt !== "function") {
      throw new Error("OpenCode session prompt API is unavailable.");
    }
    await input.client.session.prompt(input.prompt);
  } catch (error) {
    try {
      input.client.app?.log?.({
        level: "error",
        message: `[Plannotator] ${input.failureMessage}`
      });
    } catch {}
    throw new OpenCodePromptDeliveryError(input.failureMessage, {
      cause: error
    });
  }
}

// message-agent.ts
function readMessageAgent(info) {
  if (!info || typeof info !== "object")
    return;
  const agent = info.agent;
  return typeof agent === "string" && agent.trim() ? agent.trim() : undefined;
}
function resolveAnnotatedMessageAgent(messages, selection) {
  if (selection.selectedMessageId && selection.feedbackScope !== "messages") {
    const selected = messages.find((message) => message.messageId === selection.selectedMessageId);
    if (selected)
      return selected.agent;
  }
  if (messages.length === 0)
    return;
  const first = messages[0].agent;
  if (!first)
    return;
  return messages.every((message) => message.agent === first) ? first : undefined;
}
function readLastUserAgent(messages) {
  if (!messages)
    return;
  for (let i = messages.length - 1;i >= 0; i--) {
    const info = messages[i]?.info;
    if (info?.role !== "user")
      continue;
    const agent = readMessageAgent(info);
    if (agent)
      return agent;
  }
  return;
}
async function resolveAddressableAgent(input) {
  const agent = input.agent?.trim();
  if (!agent)
    return;
  try {
    const response = await input.client.app?.agents?.({ query: { directory: input.directory } });
    const match = (response?.data ?? []).find((entry) => entry?.name === agent);
    if (match && match.hidden !== true && match.mode !== "subagent")
      return agent;
  } catch {}
  try {
    input.client.app?.log?.({
      level: "info",
      message: `[Plannotator] OpenCode agent "${agent}" is not addressable; delivering feedback without naming an agent.`
    });
  } catch {}
  return;
}

// cli-bridge.ts
function cliTargetOf(value) {
  if (typeof value === "string")
    return value.trim() ? value : undefined;
  if (Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === "string" && item.trim() !== "")) {
    return value;
  }
  return;
}
function log(client, level, message) {
  try {
    client.app?.log?.({ level, message });
  } catch {}
}
function getPlannotatorBin() {
  return process.env.PLANNOTATOR_BIN?.trim() || "plannotator";
}
var TOAST_URL_RE = /https?:\/\/\S+/;
function toastPlannotatorUrl(client, message, toastedUrls) {
  const url = TOAST_URL_RE.exec(message)?.[0];
  if (!url || toastedUrls.has(url))
    return;
  toastedUrls.add(url);
  try {
    const notify = client.notifyUrl;
    const result = typeof notify === "function" ? notify({ url, message }) : client.tui?.showToast?.({
      body: { title: "Plannotator", message, variant: "info" }
    });
    if (result && typeof result.catch === "function") {
      result.catch(() => {
        toastedUrls.delete(url);
        log(client, "info", `[Plannotator] URL delivery failed for ${url}`);
      });
    }
  } catch {}
}
function showCommandFailure(client, command, message) {
  try {
    const notify = client.notifyFailure;
    const result = typeof notify === "function" ? notify({ command, message }) : client.tui?.showToast?.({
      body: { title: "Plannotator", message: `/${command} failed: ${message}`, variant: "error" }
    });
    if (result && typeof result.catch === "function") {
      result.catch((error) => {
        log(client, "info", `[Plannotator] Could not show the /${command} failure: ${error instanceof Error ? error.message : String(error)}`);
      });
    }
  } catch {}
}
function getWindowsPathCandidates(bin, env) {
  if (path.extname(bin))
    return [bin];
  const extensions = (env.PATHEXT || ".COM;.EXE;.BAT;.CMD").split(";").map((ext) => ext.trim().toLowerCase()).filter(Boolean);
  const executableExtensions = extensions.filter((ext) => ext !== ".cmd" && ext !== ".bat");
  const preferred = [".exe", ".com"];
  const orderedExtensions = [
    ...preferred.filter((ext) => executableExtensions.includes(ext)),
    ...executableExtensions.filter((ext) => !preferred.includes(ext))
  ];
  return [...orderedExtensions.map((ext) => `${bin}${ext}`), bin];
}
function resolveWindowsCliCommand(bin, env = process.env) {
  const pathValue = env.PATH || "";
  if (!pathValue)
    return;
  const candidates = getWindowsPathCandidates(bin, env);
  for (const dir of pathValue.split(path.delimiter)) {
    if (!dir)
      continue;
    for (const candidate of candidates) {
      const fullPath = path.join(dir, candidate);
      if (existsSync6(fullPath))
        return fullPath;
    }
  }
  return;
}
function buildCliSpawnConfig(bin, args, platform = process.platform, env = process.env) {
  if (platform === "win32" && !path.isAbsolute(bin)) {
    return {
      command: resolveWindowsCliCommand(bin, env) || bin,
      args,
      shell: false
    };
  }
  return { command: bin, args, shell: false };
}
function parseLastJson(stdout) {
  const lines = stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  for (let i = lines.length - 1;i >= 0; i--) {
    const line = lines[i];
    if (!line.startsWith("{"))
      continue;
    return JSON.parse(line);
  }
  throw new Error("Plannotator CLI did not return JSON.");
}
function buildCliBridgeEnv(bridge) {
  return {
    ...bridge?.sharingEnabled !== undefined && {
      PLANNOTATOR_SHARE: bridge.sharingEnabled ? "enabled" : "disabled"
    },
    ...bridge?.shareBaseUrl && { PLANNOTATOR_SHARE_URL: bridge.shareBaseUrl },
    ...bridge?.pasteApiUrl && { PLANNOTATOR_PASTE_URL: bridge.pasteApiUrl },
    ...bridge?.toolCapable && { PLANNOTATOR_OPENCODE_TOOL_CAPABLE: "1" }
  };
}
function buildBridgePayload(bridge) {
  return {
    ...bridge?.sharingEnabled !== undefined && { sharingEnabled: bridge.sharingEnabled },
    ...bridge?.shareBaseUrl && { shareBaseUrl: bridge.shareBaseUrl },
    ...bridge?.pasteApiUrl && { pasteApiUrl: bridge.pasteApiUrl },
    ...bridge?.agents && { agents: bridge.agents }
  };
}
function logCliWarnings(client, stderr) {
  const warningLines = stderr.split(/\r?\n/).map((line) => line.trim()).filter((line) => /\bwarn(?:ing)?\b/i.test(line));
  for (const line of warningLines) {
    log(client, "info", `[Plannotator] ${line}`);
  }
}
function formatUserFacingCliStderrLine(line) {
  const trimmed = line.trim();
  if (!trimmed)
    return;
  if (/^Open (?:this link|it) on your local machine\b/.test(trimmed))
    return trimmed;
  if (/^Plannotator session ready\b/.test(trimmed))
    return trimmed;
  if (/^Could not open a browser automatically\b/.test(trimmed))
    return trimmed;
  if (/^https?:\/\/\S+/.test(trimmed))
    return trimmed;
  if (/^\(.+annotations added in browser\)$/.test(trimmed))
    return trimmed;
  return;
}
function createCliStderrForwarder(client, toastedUrls) {
  let pending = "";
  const forwarded = new Set;
  const forwardLine = (line) => {
    const message = formatUserFacingCliStderrLine(line);
    if (!message || forwarded.has(message))
      return;
    forwarded.add(message);
    log(client, "info", `[Plannotator] ${message}`);
    toastPlannotatorUrl(client, message, toastedUrls);
  };
  return {
    push(chunk) {
      pending += chunk;
      const lines = pending.split(/\r?\n/);
      pending = lines.pop() ?? "";
      for (const line of lines)
        forwardLine(line);
    },
    flush() {
      if (!pending)
        return;
      forwardLine(pending);
      pending = "";
    }
  };
}
function logReadyFile(client, readyFile, readyLabel, loggedUrls, toastedUrls, onServer) {
  if (!existsSync6(readyFile))
    return;
  const contents = readFileSync4(readyFile, "utf-8");
  for (const line of contents.split(/\r?\n/)) {
    if (!line.trim())
      continue;
    try {
      const metadata = JSON.parse(line);
      if (!metadata.url || loggedUrls.has(metadata.url))
        continue;
      const target = cliTargetOf(metadata.target);
      onServer?.({
        url: metadata.url,
        ...typeof metadata.port === "number" ? { port: metadata.port } : {},
        isRemote: metadata.isRemote === true,
        ...target !== undefined ? { target } : {}
      });
      loggedUrls.add(metadata.url);
      log(client, "info", `[Plannotator] Open ${readyLabel}: ${metadata.url}`);
      toastPlannotatorUrl(client, `Open ${readyLabel}: ${metadata.url}`, toastedUrls);
    } catch {}
  }
}
function getAbortReason(signal) {
  return signal.reason ?? new DOMException("The operation was aborted", "AbortError");
}
function getErrorCode(error) {
  if (!(error instanceof Error))
    return;
  const code = Reflect.get(error, "code");
  return typeof code === "string" ? code : undefined;
}
function signalChildProcess(child, signal, detached) {
  if (detached && child.pid !== undefined) {
    try {
      process.kill(-child.pid, signal);
      return;
    } catch (error) {
      if (getErrorCode(error) !== "ESRCH")
        throw error;
    }
  }
  child.kill(signal);
}
function reviewIdOf(observer) {
  const id = observer?.sessionId;
  return typeof id === "string" && /^pn-[0-9a-f]{6}$/.test(id) ? id : undefined;
}
async function runPlannotatorCli(options) {
  options.abortSignal?.throwIfAborted();
  const readyFile = path.join(tmpdir(), `plannotator-opencode-${process.pid}-${Date.now()}-${randomUUID2()}.jsonl`);
  const loggedUrls = new Set;
  const toastedUrls = new Set;
  const cwd = options.cwd ?? process.cwd();
  const sessionBridge = options.sessionBridge;
  const bridgeToken = sessionBridge ? randomBytes(32).toString("base64url") : undefined;
  const bridgeClient = new AbortController;
  let bridgeClientStarted = false;
  const onServer = (metadata) => {
    try {
      options.observer?.onServer?.(metadata);
    } catch {}
    const { port, isRemote } = metadata;
    if (port === undefined || !sessionBridge || !bridgeToken || bridgeClientStarted || isRemote)
      return;
    bridgeClientStarted = true;
    runPullSessionBridgeClient({
      baseUrl: `http://127.0.0.1:${port}`,
      token: bridgeToken,
      bridge: sessionBridge,
      signal: bridgeClient.signal,
      log: (message) => log(options.client, "info", message)
    }).catch((error) => {
      log(options.client, "info", `[Plannotator] Session bridge stopped: ${error instanceof Error ? error.message : String(error)}`);
    });
  };
  const env = {
    ...process.env,
    ...options.extraEnv,
    ...buildCliBridgeEnv(options.bridge),
    OPENCODE: "1",
    PLANNOTATOR_ORIGIN: "opencode",
    PLANNOTATOR_CWD: cwd,
    PLANNOTATOR_READY_FILE: readyFile,
    ...reviewIdOf(options.observer) ? { PLANNOTATOR_HOST_REVIEW_ID: reviewIdOf(options.observer) } : {},
    ...sessionBridge && bridgeToken ? {
      [SESSION_BRIDGE_TOKEN_ENV]: bridgeToken,
      [SESSION_BRIDGE_HOST_ENV]: "opencode",
      [SESSION_BRIDGE_MODES_ENV]: [
        sessionBridge.modes.turn ? "turn" : "",
        sessionBridge.modes.transient ? "transient" : ""
      ].filter(Boolean).join(",")
    } : {}
  };
  const bin = getPlannotatorBin();
  const spawnConfig = buildCliSpawnConfig(bin, options.args);
  log(options.client, "info", `[Plannotator] Starting ${options.readyLabel}...`);
  const abortSignal = options.abortSignal;
  const detached = abortSignal !== undefined && process.platform !== "win32";
  let child;
  let interval;
  let forceKillTimer;
  let abortListener;
  let stderrForwarder;
  try {
    return await new Promise((resolve, reject) => {
      let stdout = "";
      let stderr = "";
      let processError;
      let aborted = false;
      const requestTermination = () => {
        if (!child || child.exitCode !== null || child.signalCode !== null)
          return;
        try {
          signalChildProcess(child, "SIGTERM", detached);
        } catch (error) {
          processError = error instanceof Error ? error : new Error(String(error));
        }
        if (forceKillTimer !== undefined)
          return;
        forceKillTimer = setTimeout(() => {
          if (!child || child.exitCode !== null || child.signalCode !== null)
            return;
          try {
            signalChildProcess(child, "SIGKILL", detached);
          } catch {}
        }, 1000);
      };
      child = spawn2(spawnConfig.command, spawnConfig.args, {
        cwd,
        env,
        shell: spawnConfig.shell,
        stdio: ["pipe", "pipe", "pipe"],
        detached
      });
      const spawned = child;
      try {
        options.observer?.onSpawn?.({
          pid: spawned.pid,
          token: bridgeToken,
          terminate: () => {
            if (spawned.exitCode !== null || spawned.signalCode !== null)
              return false;
            try {
              return spawned.kill("SIGTERM");
            } catch {
              return false;
            }
          }
        });
      } catch {}
      stderrForwarder = createCliStderrForwarder(options.client, toastedUrls);
      interval = setInterval(() => logReadyFile(options.client, readyFile, options.readyLabel, loggedUrls, toastedUrls, onServer), 250);
      if (!child.stdin || !child.stdout || !child.stderr) {
        processError = new Error("Failed to open pipes for the plannotator CLI process.");
        requestTermination();
      } else {
        child.stdout.setEncoding("utf-8");
        child.stderr.setEncoding("utf-8");
        child.stdout.on("data", (chunk) => {
          stdout += chunk;
        });
        child.stderr.on("data", (chunk) => {
          stderr += chunk;
          stderrForwarder?.push(chunk);
        });
        child.stdin.once("error", (error) => {
          processError ??= error;
          requestTermination();
        });
        child.stdin.end(options.input ?? "");
      }
      child.once("error", (error) => {
        processError ??= error;
        requestTermination();
      });
      child.once("close", (exitCode) => {
        if (aborted && abortSignal) {
          reject(getAbortReason(abortSignal));
          return;
        }
        if (processError?.code === "ENOENT") {
          reject(new Error("Could not find the plannotator CLI. Install it with: curl -fsSL https://plannotator.ai/install.sh | bash"));
          return;
        }
        if (processError) {
          reject(processError);
          return;
        }
        resolve({ stdout, stderr, exitCode });
      });
      if (abortSignal) {
        abortListener = () => {
          aborted = true;
          requestTermination();
        };
        abortSignal.addEventListener("abort", abortListener, { once: true });
        if (abortSignal.aborted)
          abortListener();
      }
    });
  } finally {
    bridgeClient.abort();
    if (interval !== undefined)
      clearInterval(interval);
    if (forceKillTimer !== undefined)
      clearTimeout(forceKillTimer);
    if (abortSignal && abortListener)
      abortSignal.removeEventListener("abort", abortListener);
    stderrForwarder?.flush();
    try {
      logReadyFile(options.client, readyFile, options.readyLabel, loggedUrls, toastedUrls);
    } catch {}
    rmSync2(readyFile, { force: true });
  }
}
function annotateCliTargets(parsed, rawArgs, cwd) {
  const urlWithProse = /^@?https?:\/\//i.test(parsed.rawFilePath) && /\s/.test(parsed.rawFilePath);
  if (!parsed.rawFilePath || !urlWithProse && annotateInputNamesExistingTarget(parsed.rawFilePath, cwd))
    return [parsed.rawFilePath];
  const words = annotateTargetWords(rawArgs);
  if (words.length < 2 || words.some((word) => word.startsWith("-")))
    return [parsed.rawFilePath];
  return words;
}
function annotateBundleCliPaths(words, cwd) {
  if (words.length < 2)
    return null;
  const selection = selectAnnotateTokenTarget([...words], (token) => probeAnnotateToken(token, cwd, { bareDirectories: false }), { bundlePath: (token) => probeAnnotateBundlePath(token, cwd), pathExists: (token) => annotatePathExists(token, cwd) });
  if (selection.kind === "missing")
    return { missing: selection.missing };
  return selection.kind === "bundle" ? selection.files.map((file) => file.value) : null;
}
function buildAnnotateCliArgs(parsed, targets) {
  const args = ["annotate", ...targets && targets.length > 0 ? targets : [parsed.rawFilePath], "--json"];
  if (parsed.gate)
    args.push("--gate");
  if (parsed.renderHtml)
    args.push("--render-html");
  if (parsed.renderMarkdown)
    args.push("--markdown");
  if (parsed.noJina)
    args.push("--no-jina");
  return args;
}
function canLaunchGatedAnnotate(parsed, sessionId) {
  return !parsed.gate || Boolean(sessionId);
}
async function runCliPlanReview(input) {
  const result = await runPlannotatorCli({
    client: input.client,
    args: ["opencode-plan"],
    sessionBridge: input.sessionBridge,
    observer: input.observer,
    cwd: input.cwd,
    input: JSON.stringify({
      plan: input.planContent,
      timeoutSeconds: input.timeoutSeconds,
      ...buildBridgePayload(input.bridge)
    }),
    readyLabel: "plan review",
    bridge: input.bridge,
    abortSignal: input.abortSignal
  });
  if (result.exitCode !== 0) {
    throw new Error(result.stderr.trim() || `Plannotator CLI exited with code ${result.exitCode}`);
  }
  logCliWarnings(input.client, result.stderr);
  return parseLastJson(result.stdout);
}
async function injectSessionPrompt(client, sessionId, text, options) {
  if (!sessionId || !text.trim())
    return;
  await deliverOpenCodePrompt({
    client,
    prompt: {
      path: { id: sessionId },
      body: {
        ...options?.agent && { agent: options.agent },
        ...options?.noReply && { noReply: true },
        parts: [{ type: "text", text }]
      }
    },
    failureMessage: "Could not deliver Plannotator feedback to the OpenCode session."
  });
}
async function getRecentAssistantMessages(client, sessionId, limit = 25) {
  const messagesResponse = await client.session?.messages?.({
    path: { id: sessionId }
  });
  const messages = messagesResponse?.data;
  if (!messages)
    return [];
  const recentMessages = [];
  for (let i = messages.length - 1;i >= 0; i--) {
    if (recentMessages.length >= limit)
      break;
    const msg = messages[i];
    if (msg.info?.role !== "assistant")
      continue;
    const textParts = (msg.parts ?? []).filter((part) => part.type === "text" && part.text?.trim()).map((part) => part.text);
    if (textParts.length === 0)
      continue;
    const agent = readMessageAgent(msg.info);
    recentMessages.push({
      messageId: msg.info?.id ?? `opencode-${i}`,
      text: textParts.join(`
`),
      timestamp: msg.info?.time?.created ? new Date(msg.info.time.created).toISOString() : undefined,
      ...agent && { agent }
    });
  }
  return recentMessages;
}
async function readSessionUserAgent(client, sessionId) {
  try {
    const response = await client.session?.messages?.({ path: { id: sessionId } });
    return readLastUserAgent(response?.data);
  } catch {
    return;
  }
}
function isPlatformPost(outcome) {
  return typeof outcome.platform === "boolean" ? outcome.platform : outcome.isPRMode === true;
}
function buildReviewPromptFromBridgeOutcome(outcome) {
  if (outcome.decision === "dismissed")
    return { message: null };
  const targetAgent = resolveTargetAgent(outcome.agentSwitch);
  if (outcome.approved || outcome.decision === "approved") {
    return {
      message: composeReviewApprovedMessage("opencode", outcome.feedback),
      ...targetAgent && { agent: targetAgent }
    };
  }
  if (!outcome.feedback?.trim()) {
    return {
      message: null,
      ...targetAgent && { agent: targetAgent }
    };
  }
  const platformPost = isPlatformPost(outcome);
  return {
    message: platformPost ? outcome.feedback : `${outcome.feedback}${getReviewDeniedSuffix("opencode")}`,
    ...targetAgent && { agent: targetAgent }
  };
}
function getAnnotateFileHeader(filePath, cwd) {
  if (/^https?:\/\//i.test(filePath))
    return "File";
  try {
    const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(cwd || process.cwd(), filePath);
    return statSync6(resolved).isDirectory() ? "Folder" : "File";
  } catch {
    return "File";
  }
}
function buildAnnotatePromptFromBridgeOutcome(outcome, target) {
  if (outcome.decision === "dismissed" || !outcome.feedback?.trim())
    return null;
  if (outcome.decision !== "annotated" && outcome.decision !== "approved")
    return null;
  if (outcome.decision === "annotated" && outcome.nothingToSend === true)
    return null;
  if (outcome.decision === "approved") {
    return getAnnotateApprovedWithNotesPrompt("opencode", undefined, {
      context: target.kind === "file" ? `${target.fileHeader}: ${target.filePath}` : undefined,
      feedback: outcome.feedback
    });
  }
  return target.kind === "message" ? getAnnotateMessageFeedbackPrompt("opencode", undefined, {
    feedback: outcome.feedback
  }) : getAnnotateFileFeedbackPrompt("opencode", undefined, {
    fileHeader: target.fileHeader,
    filePath: target.filePath,
    feedback: outcome.feedback
  });
}
function withDecisionHeading(launch, outcome, message, recordTarget) {
  if (!launch)
    return message;
  const target = cliTargetOf(recordTarget) ?? launch.target;
  const subject = plannotatorDecisionSubject(launch.subject, launch.target, target);
  const heading = plannotatorDecisionHeading(subject, launch.sessionId, outcome, target);
  return message.trim() ? `${heading}

${message}` : heading;
}
function commentsSuffix(count) {
  if (typeof count !== "number" || !Number.isInteger(count) || count <= 0)
    return "";
  return ` · ${count} ${count === 1 ? "comment" : "comments"}`;
}
function reviewDecisionOutcome(outcome) {
  const comments = commentsSuffix(outcome.annotationCount);
  if (outcome.approved || outcome.decision === "approved") {
    return outcome.feedback?.trim() ? `Approved with notes${comments}` : "Approved";
  }
  if (isPlatformPost(outcome))
    return PLANNOTATOR_OUTCOME_REVIEW_POSTED;
  return `Changes requested${comments}`;
}
function annotateDecisionOutcome(outcome) {
  const comments = commentsSuffix(outcome.annotationCount);
  if (outcome.decision === "approved")
    return outcome.feedback?.trim() ? `Approved with notes${comments}` : "Approved";
  return `Feedback${comments}`;
}
var INBOX_COMMAND = "plannotator-inbox";
function inboxCommandTurnText(opened) {
  return `${opened}

Tell the user this address in one sentence. This command starts no new work and resumes none: do anything else the person asked in the same message, otherwise stop there.

${INBOX_COMMAND_BRIEFING}`;
}
async function handleCliCommand(input) {
  const cwd = input.cwd ?? process.cwd();
  const launch = input.launch;
  let ownedBridge;
  const sessionBridge = () => {
    if (!ownedBridge) {
      try {
        ownedBridge = input.createSessionBridge?.();
      } catch {
        ownedBridge = undefined;
      }
    }
    return ownedBridge;
  };
  let failureReported = false;
  const reportFailure = (message) => {
    if (failureReported)
      return;
    failureReported = true;
    showCommandFailure(input.client, input.command, message);
    try {
      launch?.onFailure?.(message);
    } catch {}
  };
  const cliFailure = (result) => {
    if (launch?.isClosedByAgent?.()) {
      log(input.client, "info", `[Plannotator] The agent closed ${launch.subject} (${launch.sessionId}); nothing is sent for it.`);
      return;
    }
    const message = result.stderr.trim() || `Plannotator CLI exited with code ${result.exitCode}`;
    log(input.client, "error", message);
    reportFailure(message);
  };
  try {
    if (input.command === INBOX_COMMAND) {
      const opened = await openInboxInBrowser();
      if ("error" in opened) {
        log(input.client, "error", `[Plannotator] ${opened.error}`);
        reportFailure(opened.error);
        return;
      }
      const text = inboxOpenedText(opened.url, opened.note);
      log(input.client, "info", `[Plannotator] ${text}`);
      if (typeof input.client.notifyInbox === "function") {
        try {
          await input.client.notifyInbox({ url: opened.url, ...opened.note ? { detail: opened.note } : {} });
        } catch (error) {
          log(input.client, "info", `[Plannotator] Could not show the Inbox notice: ${error instanceof Error ? error.message : String(error)}`);
        }
      } else {
        try {
          await input.client.tui?.showToast?.({ body: { title: "Plannotator", message: text, variant: "info" } });
        } catch {}
      }
      if (typeof input.client.briefInbox === "function")
        input.client.briefInbox();
      if (input.commandTurn) {
        await injectSessionPrompt(input.client, input.sessionId, inboxCommandTurnText(text));
      }
      return;
    }
    if (input.command === "plannotator-review") {
      const parsed = parseReviewArgs(input.rawArgs);
      if (parsed.errors.length)
        throw new Error(parsed.errors.join(`
`));
      let directoryTarget;
      try {
        directoryTarget = resolveReviewTarget(parsed, cwd).directory;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        log(input.client, "error", `[Plannotator] ${message}`);
        reportFailure(message);
        return;
      }
      const command = directoryTarget ? "opencode-review-directory" : "opencode-review";
      const result = await runPlannotatorCli({
        client: input.client,
        args: [command],
        cwd,
        input: JSON.stringify({
          arguments: input.rawArgs,
          supportsApprovalNotes: true,
          ...buildBridgePayload(input.bridge)
        }),
        readyLabel: "code review",
        bridge: input.bridge,
        sessionBridge: sessionBridge(),
        observer: launch
      });
      if (result.exitCode !== 0) {
        if (directoryTarget && /unknown (?:subcommand|command)|no plan content in hook event/i.test(result.stderr)) {
          log(input.client, "error", result.stderr.trim() || `Plannotator CLI exited with code ${result.exitCode}`);
          const update = "Update the Plannotator CLI to review a directory from OpenCode.";
          log(input.client, "error", update);
          reportFailure(update);
        } else {
          cliFailure(result);
        }
        return;
      }
      logCliWarnings(input.client, result.stderr);
      const outcome = parseLastJson(result.stdout);
      const prompt = buildReviewPromptFromBridgeOutcome(outcome);
      if (prompt.message) {
        const targetAgent = await resolveValidatedTargetAgent({
          client: input.client,
          targetAgent: prompt.agent,
          directory: cwd
        });
        await injectSessionPrompt(input.client, input.sessionId, withDecisionHeading(launch, reviewDecisionOutcome(outcome), prompt.message, outcome.target), { agent: targetAgent });
      }
      return;
    }
    if (input.command === "plannotator-annotate") {
      const parsed = input.annotateArgs ?? parseAnnotateArgs(input.rawArgs);
      if (!parsed.filePath) {
        const usage = "Usage: /plannotator-annotate <file.md | file.txt | file.html | https://... | folder/> [--markdown] [--no-jina] [--gate] [--json]";
        log(input.client, "error", usage);
        reportFailure(usage);
        return;
      }
      if (!canLaunchGatedAnnotate(parsed, input.sessionId)) {
        log(input.client, "error", "No active session.");
        reportFailure("No active session.");
        return;
      }
      const slashTargets = input.annotateArgs ? null : annotateCliTargets(parsed, input.rawArgs, cwd);
      const bundleSelection = input.annotateArgs ? input.annotateBundle && input.annotateBundle.length > 1 ? [...input.annotateBundle] : null : annotateBundleCliPaths(slashTargets ?? [], cwd);
      if (bundleSelection && !Array.isArray(bundleSelection)) {
        const missing = buildMissingAnnotateFilesMessage(bundleSelection.missing);
        log(input.client, "error", missing);
        reportFailure(missing);
        return;
      }
      const bundlePaths = bundleSelection;
      const result = await runPlannotatorCli({
        client: input.client,
        args: buildAnnotateCliArgs(parsed, bundlePaths ?? slashTargets),
        cwd,
        readyLabel: "annotation UI",
        bridge: input.bridge,
        sessionBridge: sessionBridge(),
        observer: launch
      });
      if (result.exitCode !== 0) {
        if (bundlePaths && isOlderCliBundleRefusal(result.stderr.trim()) && !launch?.isClosedByAgent?.()) {
          log(input.client, "error", PLANNOTATOR_TOOL_BUNDLE_UNAVAILABLE_TEXT);
          reportFailure(PLANNOTATOR_TOOL_BUNDLE_UNAVAILABLE_TEXT);
        } else {
          cliFailure(result);
        }
        return;
      }
      logCliWarnings(input.client, result.stderr);
      const outcome = parseLastJson(result.stdout);
      const resolvedTarget = cliTargetOf(outcome.target);
      const filePath = typeof resolvedTarget === "string" ? resolvedTarget : parsed.filePath;
      const bundleTargets = Array.isArray(resolvedTarget) ? resolvedTarget : bundlePaths;
      let prompt = buildAnnotatePromptFromBridgeOutcome(outcome, bundleTargets ? { kind: "file", fileHeader: "Files", filePath: annotateBundleTargetText(bundleTargets) } : {
        kind: "file",
        fileHeader: getAnnotateFileHeader(filePath, input.cwd),
        filePath
      });
      if (prompt === null && launch?.deliverApproval && outcome.decision === "approved")
        prompt = "";
      if (prompt !== null && input.sessionId) {
        const agent = await resolveAddressableAgent({
          client: input.client,
          agent: await readSessionUserAgent(input.client, input.sessionId),
          directory: cwd
        });
        await injectSessionPrompt(input.client, input.sessionId, withDecisionHeading(launch, annotateDecisionOutcome(outcome), prompt, outcome.target), { agent });
      }
      return;
    }
    if (input.command === "plannotator-last") {
      if (!input.sessionId) {
        log(input.client, "error", "No active session.");
        reportFailure("No active session.");
        return;
      }
      const recentMessages = await getRecentAssistantMessages(input.client, input.sessionId);
      if (recentMessages.length === 0) {
        log(input.client, "error", "No assistant message found in session.");
        reportFailure("There is no assistant message to annotate yet.");
        return;
      }
      const parsed = parseAnnotateArgs(input.rawArgs);
      const result = await runPlannotatorCli({
        client: input.client,
        args: ["opencode-annotate-last"],
        cwd,
        input: JSON.stringify({
          gate: parsed.gate,
          recentMessages: recentMessages.map(({ agent: _agent, ...message }) => message),
          ...buildBridgePayload(input.bridge)
        }),
        readyLabel: "annotation UI",
        bridge: input.bridge,
        sessionBridge: sessionBridge(),
        observer: launch
      });
      if (result.exitCode !== 0) {
        cliFailure(result);
        return;
      }
      logCliWarnings(input.client, result.stderr);
      const outcome = parseLastJson(result.stdout);
      const prompt = buildAnnotatePromptFromBridgeOutcome(outcome, {
        kind: "message"
      });
      if (prompt) {
        const agent = await resolveAddressableAgent({
          client: input.client,
          agent: resolveAnnotatedMessageAgent(recentMessages, outcome),
          directory: cwd
        });
        await injectSessionPrompt(input.client, input.sessionId, withDecisionHeading(launch, annotateDecisionOutcome(outcome), prompt), { agent });
      }
      return;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log(input.client, "error", `[Plannotator] ${message}`);
    if (isOpenCodePromptDeliveryError(error)) {
      failureReported = true;
      try {
        launch?.onFailure?.(message);
      } catch {}
      throw error;
    }
    reportFailure(message);
  } finally {
    ownedBridge?.dispose?.();
  }
}

// plannotator-tool.ts
import { randomBytes as randomBytes2 } from "node:crypto";
import path2 from "node:path";

// ../../packages/shared/host-control.ts
var HOST_STATUS_PATH = "/api/host/status";
var HOST_CLOSE_PATH = "/api/host/close";
var HOST_CONTROL_DISABLED_CODE = "host_control_disabled";
function jsonObjectOf(text) {
  try {
    const value = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}
function classifyHostCloseAnswer(answer) {
  if (!answer)
    return { kind: "unreachable" };
  const ok = answer.status >= 200 && answer.status < 300;
  const body = jsonObjectOf(answer.text);
  if (body) {
    if (ok && typeof body.unsentAnnotations === "number")
      return { kind: "closed", unsent: body.unsentAnnotations };
    if (answer.status === 409 && body.code === "already_decided")
      return { kind: "decided" };
    if (answer.status === 404 && body.code === HOST_CONTROL_DISABLED_CODE)
      return { kind: "disabled" };
    if (answer.status === 404 && typeof body.error === "string")
      return { kind: "older" };
    return { kind: "refused", status: answer.status };
  }
  if (answer.status === 200 && /<html|<!doctype html/i.test(answer.text))
    return { kind: "older" };
  return { kind: "refused", status: answer.status };
}
function readHostStatusAnswer(answer) {
  if (!answer || answer.status < 200 || answer.status >= 300)
    return null;
  const body = jsonObjectOf(answer.text);
  if (!body || typeof body.unsentAnnotations !== "number")
    return null;
  return { unsent: body.unsentAnnotations, decided: body.decided === true };
}

// plannotator-tool.ts
class OpenCodeLaunchRegistry {
  now;
  randomHex;
  launches = new Map;
  constructor(now = () => Date.now(), randomHex = () => randomBytes2(3).toString("hex")) {
    this.now = now;
    this.randomHex = randomHex;
  }
  nextId() {
    for (let attempt = 0;attempt < 64; attempt++) {
      const id = plannotatorSessionId(this.randomHex());
      if (!this.launches.has(id))
        return id;
    }
    throw new Error("Could not allocate a Plannotator session id.");
  }
  begin(owner, kind, subject, options = {}) {
    const launch = {
      id: this.nextId(),
      owner,
      kind,
      subject,
      baseSubject: subject,
      startedAt: this.now(),
      closedByAgent: false
    };
    this.launches.set(launch.id, launch);
    let settle;
    let settled = false;
    const started = new Promise((resolve) => {
      settle = (start) => {
        if (settled)
          return;
        settled = true;
        resolve(start);
      };
    });
    const observer = {
      sessionId: launch.id,
      get subject() {
        return launch.subject;
      },
      get target() {
        return launch.target;
      },
      ...options.deliverApproval ? { deliverApproval: true } : {},
      onSpawn: ({ token, terminate }) => {
        launch.token = token;
        launch.terminate = terminate;
      },
      onServer: ({ url, port, isRemote, target }) => {
        launch.url = url;
        launch.port = port ?? portFromUrl(url);
        launch.isRemote = isRemote;
        if (target !== undefined) {
          launch.target = target;
          const named = subjectFromServerTarget(kind, launch.baseSubject, target);
          if (named !== null)
            launch.baseSubject = named;
          this.relabel(owner);
        }
        settle({ state: "ready", url });
      },
      onFailure: (message) => settle({ state: "failed", message }),
      isClosedByAgent: () => launch.closedByAgent
    };
    return {
      launch,
      observer,
      started,
      end: () => {
        this.launches.delete(launch.id);
        settle({ state: "ended" });
      }
    };
  }
  relabel(owner) {
    const open = this.openFor(owner);
    const subjects = plannotatorDistinctSubjects(open.map((launch) => ({ subject: launch.baseSubject, ...launch.target !== undefined ? { target: launch.target } : {} })));
    open.forEach((launch, index) => {
      launch.subject = subjects[index] ?? launch.subject;
    });
  }
  openFor(owner) {
    return [...this.launches.values()].filter((launch) => launch.owner === owner && !launch.closedByAgent);
  }
}
function portFromUrl(url) {
  try {
    const parsed = new URL(url);
    if (!["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname))
      return;
    const port = Number(parsed.port);
    return Number.isInteger(port) && port > 0 ? port : undefined;
  } catch {
    return;
  }
}
function baseName(value) {
  const trimmed = value.replace(/[\\/]+$/, "");
  return path2.basename(trimmed) || trimmed;
}
var PR_URL = /^https?:\/\/[^\s/]+\/.+\/(?:pull|pull-requests|merge_requests)\/(\d+)\b/i;
function reviewSubject(words) {
  for (const word of words) {
    const match = PR_URL.exec(word);
    if (match)
      return /merge_requests/i.test(word) ? `MR !${match[1]}` : `PR #${match[1]}`;
  }
  const directory = words[words.length - 1];
  return directory ? `changes in ${baseName(directory)}` : LOCAL_CHANGES_SUBJECT;
}
var LOCAL_CHANGES_SUBJECT = "local changes";
function subjectFromServerTarget(kind, typed, target) {
  if (kind === "plan" || kind === "last")
    return null;
  if (kind === "review" && typed === LOCAL_CHANGES_SUBJECT)
    return null;
  return plannotatorTargetSubject(kind, target);
}
function annotateSubject(words) {
  const target = words.find((word) => /^https?:\/\//i.test(word) || /[./\\]/.test(word)) ?? words[0];
  if (!target)
    return "document";
  if (/^https?:\/\//i.test(target)) {
    try {
      return new URL(target).host;
    } catch {
      return target;
    }
  }
  return baseName(target.replace(/^@/, ""));
}
var LAST_SUBJECT = "your last message";
function commandSubject(command, rawArgs) {
  const words = rawArgs.trim().split(/\s+/).filter((word) => word && !word.startsWith("-"));
  switch (command) {
    case "plannotator-annotate": {
      const distinct = [...new Set(words)];
      if (distinct.length > 1 && distinct.every(looksLikeFilePath)) {
        return { kind: "annotate", subject: plannotatorBundleSubject(distinct) };
      }
      return { kind: "annotate", subject: annotateSubject(words) };
    }
    case "plannotator-review": {
      const all = rawArgs.trim().split(/\s+/).filter(Boolean);
      const targets = [];
      for (let index = 0;index < all.length; index++) {
        const word = all[index];
        if (word === "--base" || word === "--diff-type") {
          index++;
          continue;
        }
        if (!word.startsWith("-"))
          targets.push(word);
      }
      return { kind: "review", subject: reviewSubject(targets) };
    }
    case "plannotator-last":
      return { kind: "last", subject: LAST_SUBJECT };
    default:
      return null;
  }
}
function toolSubject(call) {
  const targets = plannotatorToolTargets(call);
  switch (call.action) {
    case "annotate":
      return Array.isArray(call.target) ? plannotatorBundleSubject(targets) : annotateSubject(targets);
    case "review":
      return reviewSubject(targets);
    default:
      return LAST_SUBJECT;
  }
}
function quoteReviewWord(word) {
  if (!/[\s"']/.test(word))
    return word;
  if (!word.includes('"'))
    return `"${word}"`;
  if (!word.includes("'"))
    return `'${word}'`;
  return null;
}
function toolLaunchRequest(call) {
  switch (call.action) {
    case "annotate": {
      const targets = plannotatorToolTargets(call);
      const target = targets[0];
      return {
        ok: true,
        command: "plannotator-annotate",
        rawArgs: targets.join(" "),
        ...targets.length > 1 ? { annotateBundle: targets } : {},
        annotateArgs: {
          filePath: target.replace(/^@/, ""),
          rawFilePath: target,
          gate: call.gate === true,
          json: false,
          hook: false,
          renderHtml: false,
          renderMarkdown: call.options?.markdown === true,
          noJina: false,
          app: false,
          static: false
        }
      };
    }
    case "review": {
      const words = [];
      for (const word of plannotatorToolArgs(call)) {
        const quoted = quoteReviewWord(word);
        if (quoted === null) {
          return { ok: false, error: `Invalid plannotator call: "${word}" holds both kinds of quote and a space, which cannot be passed on.` };
        }
        words.push(quoted);
      }
      return { ok: true, command: "plannotator-review", rawArgs: words.join(" ") };
    }
    default:
      return { ok: true, command: "plannotator-last", rawArgs: "" };
  }
}
var PLANNOTATOR_TOOL_SUBAGENT_LAST_TEXT = `Invalid plannotator call: action "last" annotates the main session's last message and is not available to a subagent.`;
function plannotatorLateFailureText(subject, sessionId, message) {
  return [
    plannotatorDecisionHeading(subject, sessionId, "Did not open"),
    "",
    `Plannotator could not start: ${message}`,
    `Nothing more arrives for ${sessionId}; do not wait for it.`
  ].join(`
`);
}
var READY_WAIT_MS = { review: 45000, other: 15000 };
var HOST_REQUEST_TIMEOUT_MS = 5000;
async function runPlannotatorTool(input, context, deps) {
  const parsed = parsePlannotatorToolInput(input);
  if (!parsed.ok)
    return parsed.error;
  const call = parsed.input;
  let owner = { root: context.sessionID, subagent: false };
  try {
    owner = await deps.resolveOwner?.(context.sessionID) ?? owner;
  } catch {}
  switch (call.action) {
    case "list":
      return await listText(owner.root, deps);
    case "close":
      return await closeText(owner.root, call.session, deps);
    case "last":
      if (owner.subagent)
        return PLANNOTATOR_TOOL_SUBAGENT_LAST_TEXT;
      break;
    case "annotate":
    case "review":
      break;
  }
  const request = toolLaunchRequest(call);
  if (!request.ok)
    return request.error;
  const gate = call.gate === true;
  const subject = toolSubject(call);
  const handle = deps.registry.begin(owner.root, call.action, subject, { deliverApproval: gate });
  let answered = false;
  deps.launch({
    sessionID: owner.root,
    command: request.command,
    rawArgs: request.rawArgs,
    ...request.annotateArgs ? { annotateArgs: request.annotateArgs } : {},
    ...request.annotateBundle ? { annotateBundle: request.annotateBundle } : {},
    launch: handle.observer,
    notice: { sessionID: context.sessionID, open: () => !answered }
  }).catch((error) => {
    handle.observer.onFailure?.(error instanceof Error ? error.message : String(error));
  }).finally(() => handle.end());
  const waits = deps.readyWaitMs ?? READY_WAIT_MS;
  const waitMs = call.action === "review" ? waits.review : waits.other;
  let timer;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve("timeout"), waitMs);
  });
  const start = await Promise.race([handle.started, timeout]);
  if (timer !== undefined)
    clearTimeout(timer);
  answered = true;
  if (start === "timeout") {
    handle.started.then(async (late) => {
      if (late.state !== "failed")
        return;
      try {
        await deps.reportLateFailure?.({
          sessionID: owner.root,
          text: plannotatorLateFailureText(subject, handle.launch.id, late.message)
        });
      } catch {}
    });
    return plannotatorToolOpenedText(handle.launch.subject, undefined, gate, handle.launch.id, handle.launch.target);
  }
  switch (start.state) {
    case "ready":
      return plannotatorToolOpenedText(handle.launch.subject, start.url, gate, handle.launch.id, handle.launch.target);
    case "failed":
      if (start.message === PLANNOTATOR_TOOL_BUNDLE_UNAVAILABLE_TEXT)
        return start.message;
      return `Plannotator could not start: ${start.message}`;
    case "ended":
      return "Plannotator could not start: it exited before opening the page.";
  }
}
async function hostRequest(launch, pathname, init, deps) {
  if (!launch.port)
    return null;
  const doFetch = deps.fetch ?? ((url, options) => fetch(url, options));
  try {
    const response = await doFetch(`http://127.0.0.1:${launch.port}${pathname}`, {
      ...init,
      headers: { ...init.headers, authorization: `Bearer ${launch.token ?? ""}` },
      signal: AbortSignal.timeout(HOST_REQUEST_TIMEOUT_MS)
    });
    return { status: response.status, text: await response.text() };
  } catch {
    return null;
  }
}
async function listText(sessionID, deps) {
  const now = (deps.now ?? (() => Date.now()))();
  const sessions = [];
  for (const launch of deps.registry.openFor(sessionID)) {
    const status = launch.url ? readHostStatusAnswer(await hostRequest(launch, HOST_STATUS_PATH, { method: "GET" }, deps)) : null;
    sessions.push({
      id: launch.id,
      kind: launch.kind,
      subject: launch.subject,
      ...launch.url ? { url: launch.url } : {},
      ageMs: now - launch.startedAt,
      state: !launch.url ? "starting" : status?.decided ? "decided" : "open",
      unsent: status ? status.unsent : null
    });
  }
  return plannotatorToolListText(sessions);
}
async function closeText(sessionID, session, deps) {
  const open = deps.registry.openFor(sessionID);
  if (session === "all") {
    const outcomes = [];
    for (const launch of open) {
      if (launch.kind === "plan")
        continue;
      outcomes.push(await closeLaunch(launch, deps));
    }
    return plannotatorToolCloseText(outcomes);
  }
  const launch = open.find((candidate) => candidate.id === session);
  if (!launch)
    return plannotatorUnknownSessionText(session);
  return plannotatorToolCloseText([await closeLaunch(launch, deps)]);
}
async function closeLaunch(launch, deps) {
  const { id, subject } = launch;
  if (launch.kind === "plan")
    return { id, subject, closed: false, reason: "plan" };
  if (!launch.port) {
    return { id, subject, closed: false, reason: "failed", detail: "its server has not started yet; try again in a moment" };
  }
  const answer = classifyHostCloseAnswer(await hostRequest(launch, HOST_CLOSE_PATH, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" }, deps));
  switch (answer.kind) {
    case "closed":
      launch.closedByAgent = true;
      return { id, subject, closed: true, unsent: answer.unsent };
    case "decided":
      return { id, subject, closed: false, reason: "decided" };
    case "unreachable":
      return { id, subject, closed: false, reason: "failed", detail: "its server is not answering" };
    case "refused":
      return { id, subject, closed: false, reason: "failed", detail: `its server refused the close (HTTP ${answer.status})` };
    case "disabled":
      return {
        id,
        subject,
        closed: false,
        reason: "failed",
        detail: launch.isRemote ? "it runs in remote mode, where Plannotator turns host close off; close it from the tab" : "its server has host close turned off (it was started without a host token); close it from the tab"
      };
    case "older": {
      if (launch.terminate?.()) {
        launch.closedByAgent = true;
        return { id, subject, closed: true, unsent: null };
      }
      return { id, subject, closed: false, reason: "failed", detail: "its server process is gone" };
    }
  }
}

// opencode-session-bridge.ts
var PLANNOTATOR_ASK_SOURCE = "plannotator-ask";
var DELIVERY_WATCHDOG_MS = 15000;
var IDLE_PROBE_MS = 1000;
var BUSY_PROBE_MS = 300;
var FALLBACK_ATTEMPTS = 40;
var planReviewPending = new Map;
function markPlanReviewPending(sessionID) {
  planReviewPending.set(sessionID, (planReviewPending.get(sessionID) ?? 0) + 1);
  let released = false;
  return () => {
    if (released)
      return;
    released = true;
    const count = (planReviewPending.get(sessionID) ?? 1) - 1;
    if (count <= 0)
      planReviewPending.delete(sessionID);
    else
      planReviewPending.set(sessionID, count);
  };
}
function isPlanReviewPending(sessionID) {
  return planReviewPending.has(sessionID);
}
var askTurns = new Map;
function markAskTurn(sessionID) {
  askTurns.set(sessionID, (askTurns.get(sessionID) ?? 0) + 1);
  let released = false;
  return () => {
    if (released)
      return;
    released = true;
    const count = (askTurns.get(sessionID) ?? 1) - 1;
    if (count <= 0)
      askTurns.delete(sessionID);
    else
      askTurns.set(sessionID, count);
  };
}
function isAskTurnActive(sessionID) {
  return askTurns.has(sessionID);
}
var ID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var lastIdTimestamp = 0;
var idCounter = 0;
function createOpenCodeMessageId(timestamp = Date.now()) {
  if (timestamp !== lastIdTimestamp) {
    lastIdTimestamp = timestamp;
    idCounter = 0;
  }
  idCounter++;
  const value = BigInt(timestamp) * 0x1000n + BigInt(idCounter);
  let time = "";
  for (let index = 0;index < 6; index++) {
    time += Number(value >> BigInt(40 - 8 * index) & 0xffn).toString(16).padStart(2, "0");
  }
  const bytes = crypto.getRandomValues(new Uint8Array(14));
  let random = "";
  for (const byte of bytes)
    random += ID_CHARS[byte % 62];
  return `msg_${time}${random}`;
}
var TAKEN_OVER_TEXT = "Another message entered this session while it was answering, so the rest of the reply went to that message.";
var TAKEN_OVER_INTERRUPT_TEXT = "The session is now answering another message, so Plannotator will not stop it. Ask when it finishes instead.";
var MAX_REMEMBERED_ROWS = 256;
function isRecord3(value) {
  return !!value && typeof value === "object";
}
function errorText2(error) {
  return error instanceof Error ? error.message : String(error);
}
function isNotFound(error) {
  if (!isRecord3(error))
    return false;
  const tag = Reflect.get(error, "_tag");
  if (typeof tag === "string" && /NotFound/i.test(tag))
    return true;
  return /not ?found/i.test(errorText2(error));
}
function readAnswerAfter(context, messageID) {
  if (!Array.isArray(context))
    return;
  const index = context.findIndex((message) => isRecord3(message) && message.id === messageID);
  if (index < 0)
    return;
  const texts = [];
  for (const message of context.slice(index + 1)) {
    if (!isRecord3(message))
      continue;
    if (message.type === "user")
      break;
    if (message.type !== "assistant" || !Array.isArray(message.content))
      continue;
    for (const part of message.content) {
      if (isRecord3(part) && part.type === "text" && typeof part.text === "string" && part.text)
        texts.push(part.text);
    }
  }
  return texts.join(`

`);
}
function createOpenCodeSessionBridge(options) {
  const { ctx, sessionID } = options;
  const modes = options.modes ?? { turn: true, transient: true };
  const deliveryWatchdogMs = options.deliveryWatchdogMs ?? DELIVERY_WATCHDOG_MS;
  const idleProbeMs = options.idleProbeMs ?? IDLE_PROBE_MS;
  const busyProbeMs = options.busyProbeMs ?? BUSY_PROBE_MS;
  const fallbackPollMs = options.fallbackPollMs ?? 500;
  const session = ctx.session;
  let gone = false;
  let disposed = false;
  let running;
  let lastStartedAt = 0;
  let active = null;
  let releaseAskTurn = null;
  const endAskTurn = () => {
    releaseAskTurn?.();
    releaseAskTurn = null;
  };
  const controller = new AbortController;
  let probeTimer = null;
  let probing = false;
  let takenOverRun = false;
  const rowKinds = new Map;
  const status = () => {
    if (gone || disposed)
      return "gone";
    if (isPlanReviewPending(sessionID))
      return "blocked";
    return running ? "busy" : "ready";
  };
  const markGone = () => {
    if (gone)
      return;
    gone = true;
    const turn = active;
    if (turn && !turn.finished)
      finishTurn(turn, () => turn.sink.error("gone"));
  };
  const probe = () => {
    probeTimer = null;
    if (disposed || gone || probing || typeof session?.wait !== "function")
      return;
    probing = true;
    const startedAt = Date.now();
    let settled = false;
    const busyTimer = setTimeout(() => {
      if (!settled)
        running = true;
    }, busyProbeMs);
    session.wait({ sessionID }).then(() => {
      settled = true;
      clearTimeout(busyTimer);
      probing = false;
      if (lastStartedAt <= startedAt)
        running = false;
      scheduleProbe(idleProbeMs);
    }, (error) => {
      settled = true;
      clearTimeout(busyTimer);
      probing = false;
      if (isNotFound(error))
        markGone();
      else
        scheduleProbe(idleProbeMs * 5);
    });
  };
  const scheduleProbe = (ms) => {
    if (disposed || gone || probeTimer)
      return;
    probeTimer = setTimeout(probe, ms);
    probeTimer.unref?.();
  };
  const clearWatchdog = (turn) => {
    if (turn.watchdog)
      clearTimeout(turn.watchdog);
    turn.watchdog = null;
  };
  const finishTurn = (turn, report) => {
    if (turn.finished)
      return;
    turn.finished = true;
    clearWatchdog(turn);
    if (active === turn) {
      active = null;
      endAskTurn();
    }
    report();
  };
  const appendText = (turn, text) => {
    if (!text)
      return;
    let delta = text;
    if (turn.needsSeparator) {
      delta = `

${delta}`;
      turn.needsSeparator = false;
    }
    turn.answer += delta;
    if (!turn.cancelled)
      turn.sink.delta(delta);
  };
  const finalizeFromContext = async (turn) => {
    try {
      const context = await session?.context?.({ sessionID });
      if (turn.finished)
        return;
      const answer = readAnswerAfter(context, turn.messageID);
      if (answer === undefined) {
        finishTurn(turn, () => turn.sink.error("failed", "The question did not reach the session."));
        return;
      }
      if (!turn.answer && answer)
        appendText(turn, answer);
      finishTurn(turn, () => turn.cancelled ? turn.sink.error("aborted") : turn.sink.done(turn.answer || answer));
    } catch (error) {
      if (turn.finished)
        return;
      finishTurn(turn, () => turn.sink.error(isNotFound(error) ? "gone" : "failed", errorText2(error)));
    }
  };
  const settleWithoutEvents = async (turn) => {
    for (let attempt = 0;!turn.finished; attempt++) {
      try {
        await session?.wait?.({ sessionID });
      } catch {}
      if (turn.finished)
        return;
      let context;
      try {
        context = await session?.context?.({ sessionID });
      } catch (error) {
        finishTurn(turn, () => turn.sink.error(isNotFound(error) ? "gone" : "failed", errorText2(error)));
        return;
      }
      if (turn.finished)
        return;
      const answer = readAnswerAfter(context, turn.messageID);
      if (answer) {
        appendText(turn, answer);
        finishTurn(turn, () => turn.cancelled ? turn.sink.error("aborted") : turn.sink.done(answer));
        return;
      }
      if (attempt >= FALLBACK_ATTEMPTS) {
        finishTurn(turn, () => turn.sink.error("failed", "The session did not answer the question."));
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, fallbackPollMs));
    }
  };
  const handleEvent = (event) => {
    if (!isRecord3(event) || typeof event.type !== "string")
      return;
    const data = isRecord3(event.data) ? event.data : undefined;
    if (!data || data.sessionID !== sessionID)
      return;
    const turn = active;
    switch (event.type) {
      case "session.deleted":
        markGone();
        return;
      case "session.execution.started":
        lastStartedAt = Date.now();
        running = true;
        return;
      case "session.inbox.enqueued": {
        const item = isRecord3(data.item) ? data.item : undefined;
        if (typeof data.inboxID === "string" && typeof item?.type === "string") {
          rowKinds.set(data.inboxID, item.type);
          if (rowKinds.size > MAX_REMEMBERED_ROWS)
            rowKinds.delete(rowKinds.keys().next().value);
        }
        return;
      }
      case "session.inbox.delivered":
        if (turn && data.inboxID === turn.messageID) {
          turn.delivered = true;
          clearWatchdog(turn);
          if (turn.cancelled)
            session?.interrupt?.({ sessionID }).catch(() => {});
        } else if (turn?.delivered && turn.answering && !turn.cancelled && typeof data.inboxID === "string" && rowKinds.get(data.inboxID) === "user") {
          takenOverRun = true;
          const complete = turn.lastFinish === "stop" && !turn.stepCalledTools && !!turn.answer;
          finishTurn(turn, () => complete ? turn.sink.done(turn.answer) : turn.sink.error("taken_over", TAKEN_OVER_TEXT));
        }
        if (typeof data.inboxID === "string")
          rowKinds.delete(data.inboxID);
        return;
      case "session.step.started":
        if (turn?.delivered) {
          turn.answering = true;
          turn.lastFinish = undefined;
          turn.stepCalledTools = false;
        }
        return;
      case "session.step.ended":
        if (turn?.delivered && typeof data.finish === "string")
          turn.lastFinish = data.finish;
        return;
      case "session.reasoning.started":
        if (turn?.delivered)
          turn.answering = true;
        return;
      case "session.text.started":
        if (turn?.delivered)
          turn.answering = true;
        if (turn?.delivered && turn.answer)
          turn.needsSeparator = true;
        return;
      case "session.text.delta":
        if (turn?.delivered)
          turn.answering = true;
        if (turn?.delivered && typeof data.delta === "string") {
          turn.streamed.add(`${String(data.assistantMessageID)}:${String(data.ordinal)}`);
          appendText(turn, data.delta);
        }
        return;
      case "session.text.ended":
        if (turn?.delivered && typeof data.text === "string") {
          const key = `${String(data.assistantMessageID)}:${String(data.ordinal)}`;
          if (!turn.streamed.has(key))
            appendText(turn, data.text);
        }
        return;
      case "session.tool.input.started":
        if (turn?.delivered) {
          turn.answering = true;
          turn.stepCalledTools = true;
        }
        if (turn?.delivered && !turn.cancelled && typeof data.name === "string")
          turn.sink.tool?.(data.name);
        return;
      case "session.execution.succeeded":
      case "session.execution.failed":
      case "session.execution.interrupted": {
        running = false;
        takenOverRun = false;
        if (!turn?.delivered)
          return;
        if (turn.cancelled) {
          finishTurn(turn, () => turn.sink.error("aborted"));
        } else if (event.type === "session.execution.succeeded") {
          finishTurn(turn, () => turn.sink.done(turn.answer));
        } else if (event.type === "session.execution.failed") {
          const error = isRecord3(data.error) && typeof data.error.message === "string" ? data.error.message : undefined;
          finishTurn(turn, () => turn.sink.error("failed", error || "The session hit an error while answering."));
        } else {
          finishTurn(turn, () => turn.sink.error("failed", "The turn was stopped in the session before it finished answering."));
        }
        return;
      }
    }
  };
  let eventsAvailable = false;
  const subscribe = ctx.event?.subscribe;
  if (typeof subscribe === "function") {
    eventsAvailable = true;
    (async () => {
      try {
        for await (const event of subscribe({ signal: controller.signal }))
          handleEvent(event);
      } catch {} finally {
        eventsAvailable = false;
      }
    })();
  }
  probe();
  const askTurn = (text, sink, signal) => {
    const prompt = session?.prompt;
    if (typeof prompt !== "function") {
      sink.error("failed", "This OpenCode host cannot receive a prompt from a plugin.");
      return;
    }
    const turn = {
      messageID: createOpenCodeMessageId(),
      sink,
      delivered: false,
      cancelled: false,
      finished: false,
      answer: "",
      streamed: new Set,
      needsSeparator: false,
      watchdog: null,
      answering: false,
      lastFinish: undefined,
      stepCalledTools: false
    };
    active = turn;
    endAskTurn();
    releaseAskTurn = markAskTurn(sessionID);
    signal.addEventListener("abort", () => {
      if (turn.finished || turn.cancelled)
        return;
      turn.cancelled = true;
      if (turn.delivered) {
        session?.interrupt?.({ sessionID }).catch(() => {
          finishTurn(turn, () => turn.sink.error("aborted"));
        });
      }
    }, { once: true });
    const watchdog = () => {
      turn.watchdog = null;
      if (turn.finished)
        return;
      if (running) {
        turn.watchdog = setTimeout(watchdog, deliveryWatchdogMs);
        return;
      }
      finalizeFromContext(turn);
    };
    turn.watchdog = setTimeout(watchdog, deliveryWatchdogMs);
    Promise.resolve().then(() => prompt({
      sessionID,
      id: turn.messageID,
      text,
      delivery: "steer",
      metadata: { source: PLANNOTATOR_ASK_SOURCE }
    })).then(() => {
      if (!eventsAvailable)
        settleWithoutEvents(turn);
    }, (error) => {
      finishTurn(turn, () => sink.error(isNotFound(error) ? "gone" : "failed", errorText2(error)));
      if (isNotFound(error))
        markGone();
    });
  };
  const askTransient = (text, sink, signal) => {
    const generate = session?.generate;
    if (typeof generate !== "function") {
      sink.error("blocked", "This OpenCode host cannot answer from the session's context.");
      return;
    }
    Promise.resolve().then(() => generate({ sessionID, prompt: text })).then((result) => {
      if (signal.aborted)
        return;
      const answer = isRecord3(result) && typeof result.text === "string" ? result.text.trim() : "";
      if (!answer) {
        sink.error("failed", "The session tried to use a tool instead of answering. Quick answers cannot run tools; ask again, or wait for the plan decision.");
        return;
      }
      sink.delta(answer);
      sink.done(answer);
    }, (error) => {
      if (signal.aborted)
        return;
      if (isNotFound(error))
        markGone();
      sink.error(isNotFound(error) ? "gone" : "failed", errorText2(error));
    });
  };
  return {
    host: "opencode",
    modes,
    status,
    ask(req, sink, signal) {
      if (gone || disposed) {
        sink.error("gone");
        return;
      }
      if (req.mode === "transient") {
        askTransient(req.text, sink, signal);
        return;
      }
      if (active) {
        sink.error("busy", "Another Plannotator question is still running in this session.");
        return;
      }
      if (isPlanReviewPending(sessionID)) {
        sink.error("blocked");
        return;
      }
      if (running) {
        sink.error("busy");
        return;
      }
      askTurn(req.text, sink, signal);
    },
    async interrupt() {
      if (isPlanReviewPending(sessionID))
        throw new Error("The session is waiting on a plan review.");
      if (takenOverRun && running)
        throw new Error(TAKEN_OVER_INTERRUPT_TEXT);
      const interrupt = session?.interrupt;
      if (typeof interrupt !== "function")
        throw new Error("This OpenCode host cannot interrupt a session from a plugin.");
      await interrupt({ sessionID });
      if (!eventsAvailable) {
        running = false;
        scheduleProbe(0);
      }
    },
    dispose() {
      if (disposed)
        return;
      disposed = true;
      controller.abort();
      if (probeTimer)
        clearTimeout(probeTimer);
      probeTimer = null;
      const turn = active;
      if (turn && !turn.delivered)
        finishTurn(turn, () => turn.sink.error("gone"));
      endAskTurn();
    }
  };
}

// native-commands.ts
var NATIVE_COMMANDS = [
  {
    name: "plannotator-review",
    description: "Open the Plannotator code review UI for current changes, a directory, or a PR URL; pass --git or --gitbutler to force that provider"
  },
  {
    name: "plannotator-annotate",
    description: "Open the Plannotator annotation UI for a file, folder, or URL"
  },
  {
    name: "plannotator-last",
    description: "Annotate the last assistant message in Plannotator"
  }
];
var RECLAIM_SCHEDULE_MS = [300, 1200, 4000, 1e4];
function createNativeCommandSessionBridge(ctx, sessionID) {
  if (!sessionID || typeof ctx.session?.prompt !== "function")
    return;
  return createOpenCodeSessionBridge({ ctx, sessionID });
}
async function resolveDirectory(ctx, sessionID) {
  try {
    const session = await ctx.session?.get?.({ sessionID });
    const directory = session?.location?.directory;
    if (typeof directory === "string" && directory)
      return directory;
  } catch {}
  return ctx.location?.directory || process.cwd();
}
async function runNativeCommand(command, invocation, deps, tool) {
  const sessionID = invocation.sessionID;
  const rawArgs = typeof invocation.prompt?.text === "string" ? invocation.prompt.text : "";
  const client = createV2BridgeClient({
    ctx: deps.ctx,
    getAgents: deps.getAgents,
    sessionID,
    ...tool ? { alwaysQueue: true } : {},
    ...tool?.notice ? { notice: tool.notice } : {},
    ...tool ? {} : { failureNotices: true },
    ...!tool && deps.inboxBriefings && sessionID ? { onInboxOpened: () => deps.inboxBriefings.mark(sessionID) } : {}
  });
  const described = !tool && deps.launches && sessionID ? commandSubject(command, rawArgs) : null;
  const tracked = described && deps.launches ? deps.launches.begin(sessionID, described.kind, described.subject) : undefined;
  const launch = tool?.launch ?? tracked?.observer;
  const run = deps.runCommand ?? ((request) => handleCliCommand(request));
  try {
    await run({
      command,
      client,
      sessionId: sessionID,
      rawArgs,
      cwd: await resolveDirectory(deps.ctx, sessionID),
      bridge: await deps.getBridgeContext(),
      createSessionBridge: () => createNativeCommandSessionBridge(deps.ctx, sessionID),
      ...tool?.annotateArgs ? { annotateArgs: tool.annotateArgs } : {},
      ...tool?.annotateBundle ? { annotateBundle: tool.annotateBundle } : {},
      ...launch ? { launch } : {}
    });
  } finally {
    tracked?.end();
    client.dispose();
  }
}
function defaultWait(ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    timer.unref?.();
  });
}
async function ownsNativeCommands(ctx) {
  const list = await ctx.command?.list?.();
  const commands = readListPayload(list);
  return NATIVE_COMMANDS.every((command) => commands.some((entry) => entry.name === command.name && entry.description === command.description));
}
async function reclaimNativeCommands(input) {
  const wait = input.wait ?? defaultWait;
  const list = input.ctx.command?.list;
  const reload = input.ctx.command?.reload;
  if (typeof list !== "function" || typeof reload !== "function")
    return;
  let reclaimed = false;
  for (const delay of RECLAIM_SCHEDULE_MS) {
    await wait(delay);
    if (!input.isSupported())
      continue;
    let owned;
    try {
      owned = await ownsNativeCommands(input.ctx);
    } catch {
      return;
    }
    if (owned) {
      if (reclaimed)
        return;
      continue;
    }
    try {
      await input.apply();
      await reload();
      reclaimed = true;
    } catch {
      return;
    }
  }
}
async function registerNativeCommands(deps) {
  const transform = deps.ctx.command?.transform;
  if (typeof transform !== "function")
    return false;
  let supported = false;
  const apply = async () => {
    await transform((draft) => {
      if (typeof draft?.add !== "function")
        return;
      supported = true;
      for (const command of NATIVE_COMMANDS) {
        draft.add({
          name: command.name,
          description: command.description,
          execute: async (invocation) => {
            try {
              await runNativeCommand(command.name, invocation, deps);
            } catch (error) {
              console.error(`[Plannotator] /${command.name} failed: ${error instanceof Error ? error.message : String(error)}`);
            }
          }
        });
      }
    });
  };
  await apply();
  reclaimNativeCommands({
    ctx: deps.ctx,
    apply,
    isSupported: () => supported,
    wait: deps.wait
  });
  return supported;
}

// submit-plan-executor.ts
import { existsSync as existsSync7, mkdirSync as mkdirSync3, readFileSync as readFileSync5, unlinkSync as unlinkSync2, writeFileSync as writeFileSync3 } from "node:fs";
import path4 from "node:path";

// ../../packages/core/project.ts
function sanitizeTag(name) {
  if (!name || typeof name !== "string")
    return null;
  const sanitized = name.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-/, "").slice(0, 30).replace(/-$/, "");
  return sanitized.length >= 2 ? sanitized : null;
}
// plan-edits.ts
import path3 from "node:path";
function getPlanBackingPath(project) {
  return path3.join(getPlannotatorDataDir(), "active", project, "_active-plan.md");
}
function applyEdits(existingLines, edits) {
  const sorted = [...edits].sort((a, b) => a.start - b.start);
  const lines = [...existingLines];
  let offset = 0;
  for (const edit of sorted) {
    const start = edit.start - 1 + offset;
    const end = edit.end != null ? edit.end + offset : lines.length;
    const newLines = edit.content ? edit.content.split(`
`) : [];
    const removedCount = end - start;
    lines.splice(start, removedCount, ...newLines);
    offset += newLines.length - removedCount;
  }
  return lines;
}
function validateEdits(existingLines, edits) {
  const lineCount = existingLines.length;
  for (const edit of edits) {
    if (!Number.isInteger(edit.start) || edit.start < 1) {
      return `start must be a positive integer >= 1, got ${edit.start}`;
    }
    if (edit.start > lineCount + 1) {
      return `start (${edit.start}) exceeds file length + 1 (${lineCount + 1})`;
    }
    if (edit.end != null) {
      if (!Number.isInteger(edit.end) || edit.end < edit.start) {
        return `end (${edit.end}) must be >= start (${edit.start})`;
      }
      if (edit.end > lineCount && lineCount > 0) {
        return `end (${edit.end}) exceeds file length (${lineCount})`;
      }
    }
  }
  const sorted = [...edits].sort((a, b) => a.start - b.start);
  for (let i = 1;i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    if (prev.start > lineCount)
      continue;
    const prevEnd = prev.end ?? lineCount;
    if (curr.start <= prevEnd) {
      return `edits overlap: [${prev.start},${prevEnd}] and [${curr.start},${curr.end ?? "end"}]`;
    }
  }
  return null;
}
function formatWithLineNumbers(content) {
  const lines = content.split(`
`);
  const width = String(lines.length).length;
  return lines.map((line, i) => `${String(i + 1).padStart(width)}| ${line}`).join(`
`);
}

// submit-plan-executor.ts
var MAX_PLAN_SIZE = 5 * 1024 * 1024;
async function executeSubmitPlan(invocation, host) {
  if (shouldRejectSubmitPlanForAgent(invocation.invokingAgent, invocation.workflowOptions)) {
    return `Plannotator is configured for plan-agent mode. submit_plan can only be called by: ${invocation.workflowOptions.planningAgents.join(", ")}.

Use /plannotator-last or /plannotator-annotate for manual review, or set workflow to all-agents to allow broader submit_plan access.`;
  }
  invocation.abortSignal?.throwIfAborted();
  if (!invocation.edits || invocation.edits.length === 0) {
    return "Error: No edits provided. Pass at least one edit with start and content.";
  }
  const project = sanitizeTag(path4.basename(invocation.directory)) || "_unknown";
  const backingPath = getPlanBackingPath(project);
  mkdirSync3(path4.dirname(backingPath), { recursive: true });
  const existingContent = existsSync7(backingPath) ? readFileSync5(backingPath, "utf-8") : "";
  const existingLines = existingContent ? existingContent.split(`
`) : [];
  const validationError = validateEdits(existingLines, invocation.edits);
  if (validationError)
    return `Error: ${validationError}`;
  let resultLines;
  try {
    resultLines = applyEdits(existingLines, invocation.edits);
  } catch (error) {
    return `Error applying edits: ${error instanceof Error ? error.message : String(error)}`;
  }
  const planContent = resultLines.join(`
`);
  if (planContent.length > MAX_PLAN_SIZE) {
    return `Error: Plan content exceeds the maximum size of ${MAX_PLAN_SIZE / (1024 * 1024)}MB.`;
  }
  if (!planContent.trim())
    return "Error: Plan content is empty after applying edits.";
  writeFileSync3(backingPath, planContent, "utf-8");
  let reviewResult;
  try {
    reviewResult = await host.reviewPlan({
      planContent,
      abortSignal: invocation.abortSignal
    });
  } catch (error) {
    invocation.abortSignal?.throwIfAborted();
    return `[Plannotator] Failed to open plan review: ${error instanceof Error ? error.message : String(error)}`;
  }
  if (!reviewResult.approved) {
    const lineNumberedPlan = formatWithLineNumbers(planContent);
    const totalLines = planContent.split(`
`).length;
    return composePlanDeniedMessage("opencode", undefined, {
      toolName: getPlanToolName("opencode"),
      planFileRule: "",
      feedback: reviewResult.feedback || "Plan changes requested"
    }, { answersOnly: reviewResult.answersOnly }) + `

## Current Plan (${totalLines} lines)

The plan below shows the current state with line numbers. Use these exact line numbers in your next \`submit_plan\` call:

\`\`\`
${lineNumberedPlan}
\`\`\`

Call \`submit_plan\` with targeted edits to address the feedback above.`;
  }
  try {
    unlinkSync2(backingPath);
  } catch {}
  const targetAgent = await host.resolveTargetAgent({
    requestedAgent: reviewResult.agentSwitch,
    directory: invocation.directory,
    delivery: "plan-approval"
  });
  const shouldStartImplementation = targetAgent ? shouldStartImplementationForAgent(targetAgent, invocation.workflowOptions) : false;
  if (targetAgent) {
    try {
      await host.sendApprovalHandoff({
        sessionId: invocation.sessionId,
        targetAgent,
        text: shouldStartImplementation ? "Proceed with implementation" : "Plan approved. Plan mode remains active; no implementation has been requested."
      });
    } catch {}
  }
  if (reviewResult.feedback) {
    return getPlanApprovedWithNotesPrompt("opencode", undefined, {
      planFilePath: backingPath,
      doneMsg: reviewResult.savedPath ? `Saved to: ${reviewResult.savedPath}` : "",
      feedback: reviewResult.feedback,
      proceedSuffix: shouldStartImplementation ? `

Proceed with implementation, incorporating these notes where applicable.` : ""
    });
  }
  return getPlanApprovedPrompt("opencode", undefined, {
    planFilePath: backingPath,
    doneMsg: reviewResult.savedPath ? ` Saved to: ${reviewResult.savedPath}` : ""
  });
}

// planning-prompt.ts
function getPlanningPrompt() {
  return `## Plannotator — Plan Review

You have a plan submission tool called \`submit_plan\`. It opens an interactive review UI where the user can annotate, approve, or request changes.

**How to use it:**

\`submit_plan\` accepts an array of line-range edits. On first submission, pass the full plan as a single edit starting at line 1:

\`\`\`json
{ "edits": [{ "start": 1, "content": "# My Plan\\n\\n## Goals\\n..." }] }
\`\`\`

If the user denies and requests changes, apply surgical edits using line ranges. The tool response includes your plan with line numbers so you can target specific ranges:

\`\`\`json
{ "edits": [
  { "start": 12, "end": 14, "content": "revised section content" },
  { "start": 30, "end": 30, "content": "" }
] }
\`\`\`

Edit semantics:
- \`start\` and \`end\` are 1-indexed, inclusive line numbers
- Omit \`end\` to replace from \`start\` through end of file (use this for the initial full write)
- Empty \`content\` with \`start\`/\`end\` deletes those lines
- Multiple edits in one call are applied in order; line numbers refer to the state before edits

### Before you write a plan

Do not jump straight to writing a plan. First:

1. **Explore** — Read the relevant code, trace dependencies, and look at existing patterns. The depth should match the task.
2. **Ask questions** — If you need information only the user can provide (requirements, preferences, tradeoffs), ask using the \`question\` tool. Don't guess at ambiguous requirements.

Only write and submit a plan once you have sufficient context.

### What NOT to do

- Don't proceed with implementation until the plan is approved.
- Don't use \`plan_exit\` — use \`submit_plan\` instead.
- Don't end your turn without either submitting a plan or asking the user a question.`;
}

// inbox.ts
import { existsSync as existsSync8, readFileSync as readFileSync6 } from "node:fs";
import path5 from "node:path";
import { fileURLToPath } from "node:url";
var OPENCODE_INBOX_HOST = "opencode";
function findPluginPackageJson(from) {
  for (const candidate of [path5.join(from, "package.json"), path5.join(from, "..", "package.json")]) {
    try {
      const pkg = JSON.parse(readFileSync6(candidate, "utf8"));
      if (pkg.name === "@plannotator/opencode")
        return candidate;
    } catch {}
  }
  return null;
}
function readVersionAt(file) {
  if (!file)
    return null;
  try {
    const pkg = JSON.parse(readFileSync6(file, "utf8"));
    return typeof pkg.version === "string" && pkg.version ? pkg.version : null;
  } catch {
    return null;
  }
}
var PLUGIN_PACKAGE_JSON = (() => {
  try {
    return findPluginPackageJson(path5.dirname(fileURLToPath(import.meta.url)));
  } catch {
    return null;
  }
})();
var LOADED_PLUGIN_VERSION = readVersionAt(PLUGIN_PACKAGE_JSON);
var ON_DISK_FRESH_MS = 2000;
function openCodePluginReporter(file = PLUGIN_PACKAGE_JSON, loaded = LOADED_PLUGIN_VERSION, now = Date.now) {
  let cache = null;
  return () => {
    if (!loaded)
      return null;
    if (!cache || now() - cache.at >= ON_DISK_FRESH_MS)
      cache = { at: now(), value: readVersionAt(file) };
    return { version: loaded, on_disk: cache.value };
  };
}
var OPENCODE_INBOX_AGENT_NAME = "OpenCode";
var RUNNING_CROSS_CHECK_MS = 20000;
var IDLE_PROBE_MS2 = 300;
var INBOX_PROMPT_SOURCE = "plannotator-inbox";
var STEER_IDLE_GRACE_MS = 3000;
var STEER_WATCH_MS = 2000;
function inboxRepeatLine(id) {
  return `If this same reply (${id}) already appears above, it is a repeat; answer it once.`;
}
function inboxRepeatPointer(id) {
  return `(A repeat of the Plannotator Inbox reply ${id}, which appears above: answer that reply once, and not again if you already have.)`;
}
var duplicatePairs = new Map;
var DUPLICATE_PAIRS_MAX = 200;
function recordInboxDuplicate(id, steerText, fallbackText) {
  duplicatePairs.delete(id);
  duplicatePairs.set(id, [steerText, fallbackText]);
  while (duplicatePairs.size > DUPLICATE_PAIRS_MAX)
    duplicatePairs.delete(duplicatePairs.keys().next().value);
}
function textParts(message) {
  if (!message || typeof message !== "object")
    return [];
  const record = message;
  if (record.role !== "user")
    return [];
  if (typeof record.content === "string") {
    return [{ text: record.content, only: true, drop: () => {
      return;
    }, replace: (text) => void (record.content = text) }];
  }
  if (!Array.isArray(record.content))
    return [];
  const content = record.content;
  return content.flatMap((part) => part && typeof part === "object" && part.type === "text" && typeof part.text === "string" ? [
    {
      text: part.text,
      only: content.length === 1,
      drop: () => void content.splice(content.indexOf(part), 1),
      replace: (text) => void (part.text = text)
    }
  ] : []);
}
function dropInboxDuplicates(messages) {
  if (duplicatePairs.size === 0)
    return 0;
  let dropped = 0;
  for (const [id, [steerText, fallbackText]] of duplicatePairs) {
    let seen = false;
    for (const message of messages) {
      for (const part of textParts(message)) {
        if (part.text !== steerText && part.text !== fallbackText)
          continue;
        if (!seen) {
          seen = true;
          continue;
        }
        dropped++;
        if (part.only)
          part.replace(inboxRepeatPointer(id));
        else
          part.drop();
        break;
      }
    }
  }
  return dropped;
}
async function findInboxConnection() {
  if (!resolveInboxTool(loadConfig(), process.env, "opencode"))
    return null;
  const dataDir = getPlannotatorDataDir();
  if (!existsSync8(inboxRegistryFileOf(dataDir)))
    return null;
  const tools = await discoverInboxTools(dataDir);
  return tools ? new InboxAgentConnection({ dataDir, host: OPENCODE_INBOX_HOST, agentName: OPENCODE_INBOX_AGENT_NAME, tools }) : null;
}
function inboxReminderAlreadyAdded(system, reminder) {
  if (reminder === INBOX_REMINDER_TEXT || reminder === INBOX_REMINDER_TEXT_NO_WAKE)
    return system.some((part) => part.includes(reminder));
  const last = system[system.length - 1];
  if (last === undefined)
    return false;
  const text = reminder.trim();
  return last.trim() === text || last.trimEnd().endsWith(`

${text}`);
}
async function registerInboxOpenCode2(toolDomain, v2, connection, resolveRoot, options = {}) {
  const transform = toolDomain?.transform;
  const spec = inboxAgentTool(connection.tools, { wakes: typeof v2.session?.prompt === "function" });
  if (typeof transform !== "function" || !spec)
    return false;
  const wakes = typeof v2.session?.prompt === "function" ? new OpenCode2Wakes(v2, connection, resolveRoot, options.plugin ?? openCodePluginReporter()) : null;
  if (wakes && options.signal) {
    if (options.signal.aborted)
      wakes.dispose();
    else
      options.signal.addEventListener("abort", () => wakes.dispose(), { once: true });
  }
  let added = false;
  await transform((tools) => {
    if (typeof tools?.add !== "function") {
      wakes?.dispose();
      return;
    }
    added = true;
    tools.add({
      name: spec.name,
      description: spec.description,
      input: spec.inputSchema,
      options: { codemode: false },
      execute: async (input, toolContext) => {
        const { root } = await resolveRoot(toolContext.sessionID);
        wakes?.watch(root);
        let cwd = v2.location?.directory ?? process.cwd();
        try {
          cwd = (await v2.session?.get?.({ sessionID: toolContext.sessionID }))?.location?.directory ?? cwd;
        } catch {}
        return { content: (await connection.callTool(input, { sessionId: root, cwd, wakes: wakes !== null })).text };
      }
    });
  });
  return added;
}
function openCodeSessionLabel(title) {
  if (typeof title !== "string")
    return "";
  return /^(New|Child) session - \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(title.trim()) ? "" : title;
}

class OpenCode2Wakes {
  v2;
  connection;
  resolveRoot;
  pluginReport;
  wakes = new Map;
  states = new Map;
  seen = new Set;
  controller = new AbortController;
  eventsAvailable = false;
  steering = new Map;
  constructor(v2, connection, resolveRoot, pluginReport = () => null) {
    this.v2 = v2;
    this.connection = connection;
    this.resolveRoot = resolveRoot;
    this.pluginReport = pluginReport;
    const subscribe = v2.event?.subscribe;
    if (typeof subscribe !== "function")
      return;
    this.eventsAvailable = true;
    (async () => {
      try {
        for await (const event of subscribe({ signal: this.controller.signal }))
          this.onEvent(event);
      } catch {} finally {
        this.eventsAvailable = false;
      }
    })();
  }
  awaitSteer(sessionID, id, text) {
    return new Promise((resolve) => {
      const entry = {
        sessionID,
        id,
        text,
        grace: null,
        watch: null,
        checking: false,
        settle: (outcome) => {
          if (this.steering.get(id) !== entry)
            return;
          this.steering.delete(id);
          if (entry.watch)
            clearInterval(entry.watch);
          if (entry.grace)
            clearTimeout(entry.grace);
          resolve(outcome);
        }
      };
      this.steering.set(id, entry);
      entry.watch = setInterval(() => void this.watchSteer(entry), STEER_WATCH_MS);
      if (!this.state(sessionID).running)
        this.startGrace(entry);
    });
  }
  startGrace(entry) {
    if (!entry.grace)
      entry.grace = setTimeout(() => entry.settle(false), STEER_IDLE_GRACE_MS);
  }
  async watchSteer(entry) {
    if (entry.grace || entry.checking || this.steering.get(entry.id) !== entry)
      return;
    entry.checking = true;
    try {
      const state = this.state(entry.sessionID);
      if (this.eventsAvailable) {
        if (!state.running || Date.now() - state.lastEventAt < RUNNING_CROSS_CHECK_MS)
          return;
        state.lastEventAt = Date.now();
        if (!await this.idleProbe(entry.sessionID))
          return;
        state.running = false;
        this.startGrace(entry);
        return;
      }
      if (!await this.idleProbe(entry.sessionID))
        return;
      state.running = false;
      entry.settle(await this.steerInContext(entry));
    } finally {
      entry.checking = false;
    }
  }
  async steerInContext(entry) {
    const context = this.v2.session?.context;
    if (typeof context !== "function")
      return false;
    try {
      const messages = await context({ sessionID: entry.sessionID });
      if (!Array.isArray(messages))
        return false;
      return messages.some((message) => {
        if (!message || typeof message !== "object")
          return false;
        const record = message;
        if (record.id === entry.id)
          return true;
        if (record.type !== "user" && record.role !== "user")
          return false;
        if (typeof record.content === "string")
          return record.content === entry.text;
        return Array.isArray(record.content) && record.content.some((part) => !!part && typeof part === "object" && part.text === entry.text);
      });
    } catch {
      return false;
    }
  }
  dispose() {
    for (const entry of [...this.steering.values()])
      entry.settle("abandoned");
    this.controller.abort();
    for (const wake of this.wakes.values())
      wake.dispose();
    this.wakes.clear();
  }
  watch(sessionID) {
    if (this.controller.signal.aborted)
      return;
    this.seen.add(sessionID);
    const known = this.wakes.get(sessionID);
    if (known) {
      known.touch();
      return;
    }
    const wake = new InboxWake(this.connection, sessionID, this.target(sessionID));
    this.wakes.set(sessionID, wake);
    wake.start();
  }
  state(sessionID) {
    let state = this.states.get(sessionID);
    if (!state) {
      state = { running: false, lastEventAt: Date.now() };
      this.states.set(sessionID, state);
    }
    return state;
  }
  onEvent(event) {
    if (!event || typeof event !== "object")
      return;
    const { type, data } = event;
    if (type === "session.inbox.delivered" && typeof data?.inboxID === "string")
      this.steering.get(data.inboxID)?.settle(true);
    if (type === "session.inbox.delivery.changed" && typeof data?.inboxID === "string" && data.delivery === "queue")
      this.steering.get(data.inboxID)?.settle(true);
    const sessionID = typeof data?.sessionID === "string" ? data.sessionID : null;
    if (typeof type !== "string" || !sessionID)
      return;
    const state = this.state(sessionID);
    state.lastEventAt = Date.now();
    switch (type) {
      case "session.execution.started":
        state.running = true;
        this.discover(sessionID);
        return;
      case "session.execution.succeeded":
      case "session.execution.failed":
      case "session.execution.interrupted":
        state.running = false;
        for (const entry of this.steering.values())
          if (entry.sessionID === sessionID)
            this.startGrace(entry);
        return;
      case "session.renamed":
        this.noteTitle(sessionID, data?.title);
        return;
      case "session.updated":
        this.noteTitle(sessionID, data?.info?.title);
        return;
      case "session.inbox.enqueued":
        if (data?.item?.type === "user") {
          this.wakes.get(sessionID)?.onForeignPrompt();
          this.wakes.get(sessionID)?.touch();
        }
        return;
      case "session.deleted":
        for (const entry of [...this.steering.values()])
          if (entry.sessionID === sessionID)
            entry.settle("abandoned");
        this.wakes.get(sessionID)?.dispose();
        this.wakes.delete(sessionID);
        this.titles.delete(sessionID);
        return;
    }
  }
  noteTitle(sessionID, title) {
    if (this.wakes.has(sessionID))
      this.titles.set(sessionID, openCodeSessionLabel(title));
  }
  discover(sessionID) {
    if (this.controller.signal.aborted || this.seen.has(sessionID))
      return;
    this.seen.add(sessionID);
    this.resolveRoot(sessionID).then(({ root }) => this.watch(root), () => {
      return;
    });
  }
  async idleProbe(sessionID) {
    const wait = this.v2.session?.wait;
    if (typeof wait !== "function")
      return true;
    let timer;
    const late = new Promise((resolve) => {
      timer = setTimeout(() => resolve(false), IDLE_PROBE_MS2);
    });
    try {
      return await Promise.race([wait({ sessionID }).then(() => true, () => false), late]);
    } finally {
      clearTimeout(timer);
    }
  }
  target(sessionID) {
    return {
      isBusy: async () => {
        const state = this.state(sessionID);
        if (!this.eventsAvailable)
          return !await this.idleProbe(sessionID);
        if (!state.running)
          return false;
        if (Date.now() - state.lastEventAt < RUNNING_CROSS_CHECK_MS)
          return true;
        state.lastEventAt = Date.now();
        if (!await this.idleProbe(sessionID))
          return true;
        state.running = false;
        return false;
      },
      deliver: async (text) => {
        const prompt = this.v2.session?.prompt;
        if (typeof prompt !== "function")
          throw new Error("this OpenCode cannot receive a prompt from a plugin");
        await prompt({ sessionID, id: createOpenCodeMessageId(), text, delivery: "queue", metadata: { source: INBOX_PROMPT_SOURCE } });
      },
      ...typeof this.v2.session?.prompt === "function" ? {
        canSteer: () => this.eventsAvailable && !isAskTurnActive(sessionID),
        steer: async (text, command) => {
          const prompt = this.v2.session?.prompt;
          if (typeof prompt !== "function")
            throw new Error("this OpenCode cannot receive a prompt from a plugin");
          const id = createOpenCodeMessageId();
          const delivered = this.awaitSteer(sessionID, id, text);
          await prompt({ sessionID, id, text, delivery: "steer", metadata: { source: INBOX_PROMPT_SOURCE } });
          const outcome = await delivered;
          if (outcome === true)
            return;
          if (outcome === "abandoned")
            throw new Error("the session was deleted or OpenCode is shutting down");
          const fallback = `${text}

${inboxRepeatLine(command.id)}`;
          recordInboxDuplicate(command.id, text, fallback);
          await prompt({ sessionID, id: createOpenCodeMessageId(), text: fallback, delivery: "queue", metadata: { source: INBOX_PROMPT_SOURCE } });
        }
      } : {},
      notify: (message) => {
        console.error(`[Plannotator] ${message}`);
      },
      projectPath: () => this.directory(sessionID),
      label: () => this.title(sessionID),
      plugin: () => this.pluginReport()
    };
  }
  titles = new Map;
  async title(sessionID) {
    const known = this.titles.get(sessionID);
    if (known !== undefined && this.eventsAvailable)
      return known;
    try {
      const asked = openCodeSessionLabel((await this.v2.session?.get?.({ sessionID }))?.title);
      if (!this.titles.has(sessionID) || !this.eventsAvailable)
        this.titles.set(sessionID, asked);
    } catch {}
    return this.titles.get(sessionID) ?? "";
  }
  directories = new Map;
  directory(sessionID) {
    let pending = this.directories.get(sessionID);
    if (!pending) {
      pending = (async () => {
        try {
          return (await this.v2.session?.get?.({ sessionID }))?.location?.directory ?? this.v2.location?.directory ?? null;
        } catch {
          return this.v2.location?.directory ?? null;
        }
      })();
      this.directories.set(sessionID, pending);
    }
    return pending;
  }
}

// server.ts
var DEFAULT_PLAN_TIMEOUT_SECONDS = 345600;
var moduleDir = path6.dirname(fileURLToPath2(import.meta.url));
var planHtml;
var serverPlugin = {
  id: "plannotator",
  setup: async (ctx) => {
    if (isAskAiChild(process.env))
      return;
    const lifetime = new AbortController;
    const cleanup = () => {
      lifetime.abort();
    };
    const workflowOptions = normalizeWorkflowOptions(ctx.options);
    let cachedAgents;
    const getAgents = async () => {
      if (cachedAgents)
        return cachedAgents;
      try {
        cachedAgents = normalizeAgentList(await ctx.agent.list());
      } catch {
        cachedAgents = [];
      }
      return cachedAgents;
    };
    const v2 = ctx;
    const launches = new OpenCodeLaunchRegistry;
    const hasSessionHooks = typeof ctx.session?.hook === "function";
    const hasToolTransform = typeof ctx.tool?.transform === "function";
    const inboxBriefings = createInboxBriefings();
    const nativeDeps = {
      ctx: v2,
      getAgents,
      inboxBriefings,
      getBridgeContext: () => getBridgeContext(getAgents, hasToolTransform),
      launches
    };
    try {
      await registerNativeCommands(nativeDeps);
    } catch (error) {
      console.error(`[Plannotator] Could not register the OpenCode 2 slash commands: ${error instanceof Error ? error.message : String(error)}`);
    }
    if (hasSessionHooks) {
      try {
        await ctx.session.hook("context", async (event) => {
          try {
            await addInboxBriefing(event, inboxBriefings, getAgents);
          } catch (error) {
            console.error(`[Plannotator] Could not add the Inbox briefing: ${error instanceof Error ? error.message : String(error)}`);
          }
          dropSessionUrlNotices(event.messages);
          dropInboxDuplicates(event.messages);
        });
        await ctx.session.hook("generate", (event) => {
          dropSessionUrlNotices(event.messages);
          dropInboxDuplicates(event.messages);
        });
      } catch (error) {
        console.error(`[Plannotator] Could not register the session-URL notice filter: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    if (hasToolTransform && resolveAgentTool(loadConfig(), process.env, "opencode")) {
      try {
        await registerPlannotatorTool(ctx.tool, v2, {
          registry: launches,
          launch: (request) => runNativeCommand(request.command, { sessionID: request.sessionID, prompt: { text: request.rawArgs } }, nativeDeps, { launch: request.launch, annotateArgs: request.annotateArgs, annotateBundle: request.annotateBundle, notice: request.notice }),
          resolveOwner: (sessionID) => resolveRootSession(v2, sessionID),
          reportLateFailure: async ({ sessionID, text }) => {
            console.error(`[Plannotator] ${text.split(`
`).find((line) => line.startsWith("Plannotator could not start")) ?? text}`);
            await v2.session?.prompt?.({ sessionID, text, delivery: "queue" });
          }
        });
      } catch (error) {
        console.error(`[Plannotator] Could not register the plannotator tool: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    if (hasToolTransform) {
      let inboxFound = false;
      try {
        const inbox = await findInboxConnection();
        if (inbox) {
          inboxFound = true;
          await registerInboxOpenCode2(ctx.tool, v2, inbox, (sessionID) => resolveRootSession(v2, sessionID), {
            signal: lifetime.signal
          });
        }
      } catch (error) {
        console.error(`[Plannotator] Could not register the plannotator_inbox tool: ${error instanceof Error ? error.message : String(error)}`);
      }
      const inboxConfig = inboxFound && hasSessionHooks ? loadConfig() : null;
      if (inboxConfig && resolveInboxReminder(inboxConfig, process.env, "opencode")) {
        try {
          const reminder = openCode2InboxReminder(v2, inboxConfig);
          await ctx.session.hook("context", async (event) => {
            await addInboxReminder(event, getAgents, reminder);
          });
        } catch (error) {
          console.error(`[Plannotator] Could not register the Inbox reminder: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }
    if (hasSessionHooks && shouldModifyPrompts(workflowOptions)) {
      await ctx.session.hook("context", async (event) => {
        if (workflowOptions.workflow === "plan-agent" && !isPlanningAgent(event.agent, workflowOptions)) {
          delete event.tools.submit_plan;
          return;
        }
        const currentAgent = workflowOptions.workflow === "all-agents" ? (await getAgents()).find((candidate) => candidate.name === event.agent) : undefined;
        if (!allowSubagents() && currentAgent?.mode === "subagent") {
          delete event.tools.submit_plan;
          return;
        }
        if (event.tools.plan_exit) {
          event.tools.plan_exit.description = "Do not call this tool. Use submit_plan instead - it opens a visual review UI for plan approval.";
        }
        if (event.tools.todowrite) {
          event.tools.todowrite.description = "While actively planning with the user, use submit_plan instead. Only use todos once implementation begins or unless the user explicitly asks.";
        }
        replacePlanModeReminders(event.messages);
        const systemText = event.system.map((part) => part.text).join(`
`).toLowerCase();
        if (systemText.includes("title generator") || systemText.includes("generate a title"))
          return;
        if (shouldInjectFullPlanningPrompt(event.agent, workflowOptions)) {
          const additions = [getPlanningPrompt()];
          const hook = readImprovementHook("enterplanmode-improve");
          const improveContext = composeImproveContext({
            pfmEnabled: loadConfig().pfmReminder === true,
            improvementHookContent: hook?.content ?? null
          });
          if (improveContext)
            additions.push(improveContext);
          replacePlanningSystemParts(event.system, additions);
          return;
        }
        if (!shouldInjectGenericPlanReminder(event.agent, currentAgent?.mode === "subagent", workflowOptions))
          return;
        pushComposedSystemReminder(event.system, getGenericPlanReminder());
      });
    }
    if (!hasToolTransform)
      return;
    if (!shouldRegisterSubmitPlan(workflowOptions))
      return cleanup;
    await ctx.tool.transform((tools) => {
      tools.add({
        name: "submit_plan",
        description: "Submit a plan for user review via line-range edits. First call: pass a single edit with start=1 and your full plan as content (omit end). Subsequent calls after denial: pass targeted edits using the line numbers from the previous response. The tool manages a backing file; you never touch the file directly.",
        input: {
          type: "object",
          properties: {
            edits: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  start: {
                    type: "number",
                    description: "1-indexed start line (inclusive)"
                  },
                  end: {
                    type: "number",
                    description: "1-indexed end line (inclusive). Omit to replace from start through end of file."
                  },
                  content: {
                    type: "string",
                    description: "Replacement content. Empty string deletes the line range."
                  }
                },
                required: ["start", "content"],
                additionalProperties: false
              },
              description: "Array of line-range edits to apply to the plan."
            }
          },
          required: ["edits"],
          additionalProperties: false
        },
        options: { codemode: false },
        execute: async (input, toolContext) => {
          const session = await ctx.session.get({ sessionID: toolContext.sessionID });
          const directory = session.location.directory;
          const bridge = await getBridgeContext(getAgents, hasToolTransform);
          const client = createV2BridgeClient({
            ctx: v2,
            getAgents,
            sessionID: toolContext.sessionID
          });
          const releasePlanPending = markPlanReviewPending(toolContext.sessionID);
          const planBridge = typeof v2.session?.generate === "function" ? createOpenCodeSessionBridge({
            ctx: v2,
            sessionID: toolContext.sessionID,
            modes: { turn: false, transient: true }
          }) : undefined;
          const planLaunch = launches.begin(toolContext.sessionID, "plan", "Plan");
          try {
            const result = await executeSubmitPlan({
              edits: getPlanEdits(input),
              invokingAgent: toolContext.agent,
              sessionId: toolContext.sessionID,
              directory,
              workflowOptions
            }, {
              reviewPlan: async ({ planContent }) => await runPlanReview({
                client,
                runtime: workflowOptions.runtime,
                planContent,
                sharingEnabled: bridge.sharingEnabled ?? true,
                shareBaseUrl: bridge.shareBaseUrl,
                pasteApiUrl: bridge.pasteApiUrl,
                timeoutSeconds: getPlanTimeoutSeconds(),
                directory,
                bridge,
                sessionBridge: planBridge,
                launch: planLaunch
              }),
              resolveTargetAgent: async ({ requestedAgent }) => await switchV2SessionAgent({
                ctx: v2,
                sessionID: toolContext.sessionID,
                requestedAgent,
                getAgents
              }),
              sendApprovalHandoff: async () => {}
            });
            return { content: result };
          } finally {
            planLaunch.end();
            planBridge?.dispose();
            releasePlanPending();
            client.dispose();
          }
        }
      });
    });
    return cleanup;
  }
};
function getPlanEdits(input) {
  if (!input || typeof input !== "object")
    return;
  const edits = Reflect.get(input, "edits");
  return Array.isArray(edits) ? edits : undefined;
}
function getPlanTimeoutSeconds() {
  const raw = process.env.PLANNOTATOR_PLAN_TIMEOUT_SECONDS?.trim();
  if (!raw)
    return DEFAULT_PLAN_TIMEOUT_SECONDS;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    console.error(`[Plannotator] Invalid PLANNOTATOR_PLAN_TIMEOUT_SECONDS="${raw}". Using default ${DEFAULT_PLAN_TIMEOUT_SECONDS}s.`);
    return DEFAULT_PLAN_TIMEOUT_SECONDS;
  }
  return parsed === 0 ? null : parsed;
}
function allowSubagents() {
  const value = process.env.PLANNOTATOR_ALLOW_SUBAGENTS?.trim();
  return value === "1" || value === "true";
}
async function getBridgeContext(getAgents, toolCapable) {
  return {
    sharingEnabled: resolveSharingEnabled(loadConfig()),
    shareBaseUrl: process.env.PLANNOTATOR_SHARE_URL || undefined,
    pasteApiUrl: process.env.PLANNOTATOR_PASTE_URL || undefined,
    agents: await getAgents(),
    ...toolCapable ? { toolCapable: true } : {}
  };
}
function hasEmbeddedRuntime() {
  return typeof globalThis.Bun?.serve === "function";
}
async function importEmbeddedRuntime() {
  const builtPath = path6.join(moduleDir, "embedded.js");
  if (existsSync9(builtPath)) {
    return await import(pathToFileURL(builtPath).href);
  }
  const sourceSpecifier = "./embedded";
  return await import(sourceSpecifier);
}
function getPlanHtml() {
  if (planHtml)
    return planHtml;
  const candidates = [
    path6.join(moduleDir, "plannotator.html"),
    path6.join(moduleDir, "..", "plannotator.html")
  ];
  const htmlPath = candidates.find((candidate) => existsSync9(candidate));
  if (!htmlPath)
    throw new Error("Could not find bundled HTML asset: plannotator.html");
  planHtml = readFileSync7(htmlPath, "utf-8");
  return planHtml;
}
function createPlanReadyNotifier(client, onServer) {
  return (url, isRemote, port) => {
    try {
      onServer?.({ url, ...port !== undefined ? { port } : {}, isRemote: isRemote === true });
    } catch {}
    const notify = client.notifyUrl;
    if (typeof notify !== "function") {
      try {
        client.app.log({ level: "info", message: formatSessionUrlNotice(url) });
      } catch {}
      return;
    }
    try {
      notify({ url, message: formatSessionUrlNotice(url) }).catch(() => {});
    } catch {}
  };
}
async function runPlanReview(input) {
  if (input.runtime === "embedded" && !hasEmbeddedRuntime()) {
    throw new Error('runtime "embedded" requires a Bun-hosted OpenCode plugin runtime. Use runtime "auto" or "cli" with this OpenCode host.');
  }
  if (input.runtime !== "cli" && hasEmbeddedRuntime()) {
    try {
      const embedded = await importEmbeddedRuntime();
      return await embedded.runEmbeddedPlanReview({
        client: input.client,
        planContent: input.planContent,
        sharingEnabled: input.sharingEnabled,
        shareBaseUrl: input.shareBaseUrl,
        pasteApiUrl: input.pasteApiUrl,
        htmlContent: getPlanHtml(),
        timeoutSeconds: input.timeoutSeconds,
        abortSignal: input.abortSignal,
        logReady: createPlanReadyNotifier(input.client, input.launch?.observer.onServer),
        sessionBridge: input.sessionBridge,
        ...input.bridge.toolCapable ? { opencodeToolCapable: true } : {}
      });
    } catch (error) {
      if (input.runtime === "embedded")
        throw error;
      console.error(`[Plannotator] Embedded runtime unavailable; falling back to CLI: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return await runCliPlanReview({
    client: input.client,
    planContent: input.planContent,
    cwd: input.directory,
    timeoutSeconds: input.timeoutSeconds,
    abortSignal: input.abortSignal,
    bridge: input.bridge,
    sessionBridge: input.sessionBridge,
    ...input.launch ? { observer: input.launch.observer } : {}
  });
}
async function resolveRootSession(v2, sessionID) {
  let current = sessionID;
  const seen = new Set([current]);
  for (let depth = 0;depth < 16; depth++) {
    let parentID;
    try {
      const session = await v2.session?.get?.({ sessionID: current });
      parentID = session && typeof session === "object" ? Reflect.get(session, "parentID") : undefined;
    } catch {
      break;
    }
    if (typeof parentID !== "string" || !parentID || seen.has(parentID))
      break;
    seen.add(parentID);
    current = parentID;
  }
  return { root: current, subagent: current !== sessionID };
}
async function registerPlannotatorTool(toolDomain, v2, deps) {
  const transform = toolDomain?.transform;
  if (typeof transform !== "function")
    return false;
  if (typeof v2.session?.prompt !== "function")
    return false;
  let added = false;
  await transform((tools) => {
    if (typeof tools?.add !== "function")
      return;
    added = true;
    tools.add({
      name: PLANNOTATOR_TOOL_NAME,
      description: PLANNOTATOR_TOOL_DESCRIPTION,
      input: PLANNOTATOR_TOOL_INPUT_SCHEMA,
      options: { codemode: false },
      execute: async (input, toolContext) => ({
        content: await runPlannotatorTool(input, { sessionID: toolContext.sessionID }, deps)
      })
    });
  });
  return added;
}
function replacePlanningSystemParts(system, additions) {
  const stripped = stripConflictingPlanModeRules(system.map((part) => part.text), { openCode2: true });
  const composed = composeSystemPrompt([], [...stripped, ...additions.filter(Boolean)]);
  system.length = 0;
  system.push(...composed.map((text) => ({ type: "text", text })));
}
function pushComposedSystemReminder(system, reminder) {
  const composed = composeSystemPrompt(system.map((part) => part.text), [reminder]);
  system.length = 0;
  system.push(...composed.map((text) => ({ type: "text", text })));
}
function openCode2InboxReminder(v2, config = {}) {
  return resolveInboxReminderText(config, "opencode", { toolName: INBOX_TOOL_NAME, wakes: typeof v2.session?.prompt === "function" });
}
async function addInboxReminder(event, getAgents, reminder = INBOX_REMINDER_TEXT) {
  if (!event.tools?.[INBOX_TOOL_NAME])
    return;
  const systemText = event.system.map((part) => part.text).join(`
`).toLowerCase();
  if (systemText.includes("title generator") || systemText.includes("generate a title"))
    return;
  const agent = (await getAgents()).find((candidate) => candidate.name === event.agent);
  if (agent?.mode === "subagent")
    return;
  const builtIn = reminder === INBOX_REMINDER_TEXT || reminder === INBOX_REMINDER_TEXT_NO_WAKE;
  if (builtIn ? systemText.includes(reminder.toLowerCase()) : inboxReminderAlreadyAdded(event.system.map((part) => part.text), reminder))
    return;
  pushComposedSystemReminder(event.system, reminder);
}
async function addInboxBriefing(event, briefings, getAgents) {
  if (!briefings.wants(event))
    return;
  const systemText = event.system.map((part) => part.text).join(`
`);
  if (systemText.includes(INBOX_COMMAND_BRIEFING))
    return;
  const lower = systemText.toLowerCase();
  if (lower.includes("title generator") || lower.includes("generate a title"))
    return;
  const agent = (await getAgents()).find((candidate) => candidate.name === event.agent);
  if (agent?.mode === "subagent")
    return;
  pushComposedSystemReminder(event.system, INBOX_COMMAND_BRIEFING);
}
function getGenericPlanReminder() {
  return `## Plan Submission

When you have completed your plan, call the \`submit_plan\` tool to submit it for user review. Pass your full plan as a single edit: \`{ "edits": [{ "start": 1, "content": "..." }] }\`.

The user will review your plan in a visual UI where they can annotate, approve, or request changes. If rejected, the response includes your plan with line numbers; use targeted edits to revise specific sections.

Do NOT proceed with implementation until your plan is approved.`;
}
var server_default = serverPlugin;
export {
  addInboxBriefing,
  addInboxReminder,
  createPlanReadyNotifier,
  server_default as default,
  openCode2InboxReminder,
  pushComposedSystemReminder,
  registerPlannotatorTool,
  replacePlanningSystemParts,
  resolveRootSession
};
