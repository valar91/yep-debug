/**
 * 封装简单的ajax方法
 * @param method
 * @param url
 * @param param
 * @param successCallback
 * @param failCallback
 */
const ajax = function(method:string, url:string, param:object, successCallback, failCallback) {
  const ajaxHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  ajaxHttp.open(method,url,true)
  ajaxHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  ajaxHttp.onreadystatechange = function () {
    if (ajaxHttp.readyState == 4 && ajaxHttp.status == 200) {
      const res = JSON.parse(ajaxHttp.responseText);
      typeof successCallback == 'function' && successCallback(res);
    } else {
      typeof failCallback == 'function' && failCallback();
    }
  };
  ajaxHttp.send("data=" + JSON.stringify(param));
}


const getDevice = function() {
  const device = {};
  const ua = navigator.userAgent;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

}