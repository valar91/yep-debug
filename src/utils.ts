import { PIN, PT_PIN } from "./constants";
/**
 * 封装简单的ajax方法
 * @param method
 * @param url
 * @param param
 * @param successCallback
 * @param failCallback
 */
export const ajax = function(
  method: string,
  url: string,
  param: object,
  successCallback,
  failCallback
) {
  const xmlHttp = (<any>window).XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  xmlHttp.open(method, url, true);
  xmlHttp.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      const res = JSON.parse(xmlHttp.responseText);
      typeof successCallback == "function" && successCallback(res);
    } else {
      typeof failCallback == "function" && failCallback();
    }
  };
  xmlHttp.send("data=" + JSON.stringify(param));
};

export const getDevice = function() {
  const device = {};
  const ua = navigator.userAgent;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
};
/**
 * 获取京东用户的pin
 */
export const getUserPin = function(): string {
  return getCookie(PIN) || getCookie(PT_PIN);
};
/**
 * 获取cookie
 * @param key
 */
export const getCookie = function(key): string {
  let t;
  const r: RegExp = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  return (t = document.cookie.match(r)) ? unescape(t[2]) : "";
};
