import { getUserPin } from "./utils";
import { APP_ID } from "./constants";

export interface IBaseInfo {
  happenTime: number;
  appId: string;
  simpleUrl: string;
  completeUrl: string;
  pin: string;
}
export default class BaseInfo implements IBaseInfo {
  happenTime: number;
  appId: string;
  simpleUrl: string;
  completeUrl: string;
  pin: string;

  constructor() {
    this.happenTime = new Date().getTime(); // 日志发生时间
    this.appId = APP_ID; // 用于区分应用的唯一标识（一个项目对应一个）
    this.simpleUrl = window.location.href.split("?")[0].replace("#", ""); // 页面的url
    this.completeUrl = encodeURIComponent(window.location.href); // 页面的完整url
    this.pin = getUserPin(); // 用于区分用户，所对应唯一的标识，清理本地数据后失效，
  }

  handleLogInfo(type: string, info: IBaseInfo) {
    console.log(info);
  }
}
