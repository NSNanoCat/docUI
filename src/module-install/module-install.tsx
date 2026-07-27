import { Children, cloneElement, isValidElement, useCallback, useMemo } from "react";
import { Tab, Tabs } from "rspress/theme";
import { AppTabContent } from "./app-tab-content";
import { APP_LABEL_MAP, SUPPORTED_APPS, type SupportedApp } from "./constants";
import styles from "./module-install.module.scss";
import { ModuleInstallItem } from "./module-install-item";
import { ModuleInstallTab } from "./module-install-tab";

export interface ModuleInstallProps {
  urlPrefix?: string;
  urls?: {
    [Key in SupportedApp]?: string;
  };
  children?: React.ReactNode;
}

/**
 * 渲染适用于多个代理工具的模块安装标签页。
 * Renders module installation tabs for supported proxy tools.
 *
 * @param props - 模块安装属性。 / Module installation properties.
 * @returns 模块安装标签页。 / The module installation tabs.
 */
export function ModuleInstall({ urlPrefix = "", urls, children }: ModuleInstallProps) {
  const renderTabLabel = useCallback((appType: SupportedApp) => {
    return (
      <div className={styles.label}>
        <div className={[styles.icon, styles[`icon-${appType}`]].join(" ")} />
        {APP_LABEL_MAP[appType]}
      </div>
    );
  }, []);

  const tabLabels = useMemo(() => {
    const result: React.ReactNode[] = [];
    if (urls) {
      Object.keys(urls).forEach((item) => {
        const appType = item as SupportedApp;
        if (SUPPORTED_APPS.includes(appType)) {
          result.push(renderTabLabel(appType));
        }
      });
    } else if (children) {
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          const appType = child.props.type;
          if (SUPPORTED_APPS.includes(appType)) {
            result.push(renderTabLabel(appType));
          }
        }
      });
    }
    return result;
  }, [urls, children, renderTabLabel]);

  const renderTabContent = useMemo(() => {
    if (children) {
      return Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { __urlPrefix: urlPrefix } as any);
        }
        return null;
      });
    }
    const result: React.ReactNode[] = [];
    Object.keys(urls ?? {}).forEach((item) => {
      const appType = item as SupportedApp;
      if (SUPPORTED_APPS.includes(appType)) {
        result.push(
          <Tab key={appType}>
            <AppTabContent key={appType} appType={appType} url={`${urlPrefix}${urls?.[appType]}`} />
          </Tab>,
        );
      }
    });
    return result;
  }, [urlPrefix, urls, children]);

  return (
    <Tabs groupId="module.install" values={tabLabels}>
      {renderTabContent}
    </Tabs>
  );
}

ModuleInstall.Tab = ModuleInstallTab;
ModuleInstall.Item = ModuleInstallItem;
