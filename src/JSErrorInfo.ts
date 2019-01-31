import BaseInfo, { IBaseInfo } from "./BaseInfo";
interface IJSErrorInfo extends IBaseInfo{
  type: string;
  msg: string;
  errorObj: object;
}
export default class JSErrorInfo extends BaseInfo implements IJSErrorInfo {
  type: string;
  msg: string;
  errorObj: object;
  constructor(type, msg, errorObj) {
    super();
    this.type = type;
    this.msg = msg;
    this.errorObj = errorObj;
  }
}
