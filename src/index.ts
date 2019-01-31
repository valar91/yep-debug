import { JS_ERROR } from "./constants";
import JSErrorInfo from "./JSErrorInfo";
let jsMonitorStarted = false;

function catchJSError() {
  const oldError = console.error;
  console.error = function() {
    // arguments的长度为2时，才是error上报的时机
    // if (arguments.length < 2) return;
    const errorMsg: string = arguments[0] && arguments[0].message;
    const url: string = window.location.href;
    const lineNumber: number = 0;
    const columnNumber: number = 0;
    let errorObj = arguments[0] && arguments[0].stack;
    if (!errorObj) {
      errorObj = arguments[0];
    }
    // 如果onerror重写成功，就无需在这里进行上报了
    !jsMonitorStarted &&
      siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorObj);
    return oldError.apply(console, arguments);
  };

  // 重写 onerror 进行jsError的监听
  window.onerror = function(errorMsg, url, lineNumber, columnNumber, errorObj) {
    jsMonitorStarted = true;
    const errorStack = errorObj ? errorObj.stack : null;
    siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorStack);
  };

  function siftAndMakeUpMessage(
    origin_errorMsg,
    origin_url,
    origin_lineNumber,
    origin_columnNumber,
    origin_errorObj
  ) {
    const errorMsg = origin_errorMsg ? origin_errorMsg : "";
    const errorObj = origin_errorObj ? origin_errorObj : "";
    let errorType = "";

    const lowerErrorMsg = errorMsg.toLowerCase();
    if (lowerErrorMsg.indexOf("script error") != -1) return;
    if (errorMsg) {
      const errorStackStr = JSON.stringify(errorObj);
      errorType = errorStackStr.split(": ")[0].replace('"', "");
    }
    const javaScriptErrorInfo = new JSErrorInfo(JS_ERROR, errorType + ": " + errorMsg, errorObj);
    javaScriptErrorInfo.handleLogInfo(JS_ERROR, javaScriptErrorInfo);
  }
}

const  init = () =>{
  catchJSError()
}

init()
