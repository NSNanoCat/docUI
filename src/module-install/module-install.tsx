import { Children, cloneElement, isValidElement, useCallback, useEffect, useMemo, useState } from "react";
import { Tab, Tabs } from "rspress/theme";
import { AppTabContent } from "./app-tab-content";
import { APP_LABEL_MAP, SUPPORTED_APPS, type SupportedApp } from "./constants";
import styles from "./module-install.module.scss";
import { ModuleInstallItem } from "./module-install-item";
import { ModuleInstallTab } from "./module-install-tab";

// 使用应用类型而非位置同步不同实例，避免标签数量或顺序不同时错配。
// Synchronize instances by app type instead of position to avoid mismatches across different tab sets.
const MODULE_INSTALL_STORAGE_KEY = "rspress.tabs.module.install";
const MODULE_INSTALL_SYNC_EVENT = "nsnanocat.module-install.tab-change";

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
    const result: Array<{ label: React.ReactNode; value: SupportedApp }> = [];
    if (urls) {
      Object.keys(urls).forEach((item) => {
        const appType = item as SupportedApp;
        if (SUPPORTED_APPS.includes(appType)) {
          result.push({
            label: renderTabLabel(appType),
            value: appType,
          });
        }
      });
    } else if (children) {
      Children.map(children, (child) => {
        if (isValidElement(child)) {
          const appType = child.props.type;
          if (SUPPORTED_APPS.includes(appType)) {
            result.push({
              label: renderTabLabel(appType),
              value: appType,
            });
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
          const appType = child.props.type;
          if (SUPPORTED_APPS.includes(appType)) {
            return cloneElement(child, { __urlPrefix: urlPrefix } as any);
          }
        }
        return null;
      });
    }
    const result: React.ReactNode[] = [];
    Object.keys(urls ?? {}).forEach((item) => {
      const appType = item as SupportedApp;
      if (SUPPORTED_APPS.includes(appType)) {
        result.push(
          <Tab key={appType} value={appType}>
            <AppTabContent key={appType} appType={appType} url={`${urlPrefix}${urls?.[appType]}`} />
          </Tab>,
        );
      }
    });
    return result;
  }, [urlPrefix, urls, children]);

  const [activeTab, setActiveTab] = useState<SupportedApp | undefined>(() => tabLabels[0]?.value);

  useEffect(() => {
    const syncActiveTab = (value: string | null) => {
      const matchingTab = tabLabels.find((tab) => tab.value === value);
      if (matchingTab) {
        setActiveTab(matchingTab.value);
      }
    };
    setActiveTab((currentTab) =>
      tabLabels.some((tab) => tab.value === currentTab) ? currentTab : tabLabels[0]?.value,
    );
    syncActiveTab(window.localStorage.getItem(MODULE_INSTALL_STORAGE_KEY));

    const handleTabSync = (event: Event) => {
      syncActiveTab((event as CustomEvent<SupportedApp>).detail);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === MODULE_INSTALL_STORAGE_KEY) {
        syncActiveTab(event.newValue);
      }
    };
    window.addEventListener(MODULE_INSTALL_SYNC_EVENT, handleTabSync);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(MODULE_INSTALL_SYNC_EVENT, handleTabSync);
      window.removeEventListener("storage", handleStorage);
    };
  }, [tabLabels]);

  const handleTabChange = useCallback(
    (index: number) => {
      const selectedTab = tabLabels[index];
      if (!selectedTab) {
        return;
      }
      setActiveTab(selectedTab.value);
      window.localStorage.setItem(MODULE_INSTALL_STORAGE_KEY, selectedTab.value);
      window.dispatchEvent(
        new CustomEvent<SupportedApp>(MODULE_INSTALL_SYNC_EVENT, {
          detail: selectedTab.value,
        }),
      );
    },
    [tabLabels],
  );

  return (
    <Tabs key={activeTab} values={tabLabels} defaultValue={activeTab} onChange={handleTabChange}>
      {renderTabContent}
    </Tabs>
  );
}

ModuleInstall.Tab = ModuleInstallTab;
ModuleInstall.Item = ModuleInstallItem;
