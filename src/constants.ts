// 判断是http或是https
const HTTP_TYPE =
  window.location.href.indexOf("https") === -1 ? "http://" : "https://";
// 本地IP, 用于区分本地开发环境
const DEBUG_LOCAL_IP: string = "localhost";
// 监控平台地址
const DEBUG_SERVER_IP: string = "yep-debug.jd.com";
// 监控接口地址，区分本地和线上
const API_FETCH_URI: string =
  window.location.href.indexOf(DEBUG_LOCAL_IP) === -1
    ? HTTP_TYPE + DEBUG_SERVER_IP
    : HTTP_TYPE + DEBUG_LOCAL_IP + ":3000";

const UPLOAD_LOG_PATH: string = "/api/v1/log";

// 接口日志类型
const API_LOG: string = "API_LOG";

// 接口错误日志类型
const API_ERROR: string = "API_ERROR";

// js报错日志类型
const JS_ERROR: string = "JS_ERROR";
