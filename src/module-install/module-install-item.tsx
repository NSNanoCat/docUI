import { AppTabContent, type AppTabContentProps } from "./app-tab-content";
import type { SupportedApp } from "./constants";

/**
 * 渲染模块安装标签页中的单个安装项。
 * Renders one installation item inside a module installation tab.
 *
 * @param props - 安装项属性。 / Installation item properties.
 * @returns 单个安装项。 / One installation item.
 */
export const ModuleInstallItem: React.FC<
  {
    // 由父级标签页注入当前应用类型。
    // Injected by the parent tab to identify the current app.
    __appType: SupportedApp;
    // 由父级安装组件注入 URL 前缀。
    // Injected by the parent installation component as the URL prefix.
    __urlPrefix?: string;
  } & Omit<AppTabContentProps, "appType">
> = ({ __appType, __urlPrefix = "", url, ...rest }) => {
  return <AppTabContent {...rest} appType={__appType} url={`${__urlPrefix}${url}`} />;
};

ModuleInstallItem.displayName = "ModuleInstallItem";
