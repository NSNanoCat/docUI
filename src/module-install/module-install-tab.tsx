import { Children, cloneElement, createElement, isValidElement } from "react";
import { Tab } from "rspress/theme";
import type { SupportedApp } from "./constants";

export interface ModuleInstallTabProps {
  type: SupportedApp;
  // 由父级安装组件注入 URL 前缀。
  // Injected by the parent installation component as the URL prefix.
  __urlPrefix?: string;
  children?: React.ReactNode;
}

/**
 * 将自定义内容包装为指定应用的 Rspress 标签页。
 * Wraps custom content in an Rspress tab for the selected app.
 *
 * @param props - 标签页属性。 / Tab properties.
 * @returns 应用安装标签页。 / The app installation tab.
 */
export const ModuleInstallTab: React.FC<ModuleInstallTabProps> = ({ type: appType, __urlPrefix, children }) => {
  return (
    <Tab key={appType}>
      <div className="text-sm">
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            const childType = child.type;
            if (
              typeof childType !== "string" &&
              "displayName" in childType &&
              childType.displayName === "ModuleInstallItem"
            ) {
              return cloneElement(child, { __appType: appType, __urlPrefix } as any);
            }
            return createElement(
              "div",
              {
                className: "px-3",
              },
              child,
            );
          }
          return child;
        })}
      </div>
    </Tab>
  );
};
