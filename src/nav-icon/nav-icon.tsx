import { Popover } from "../popover";
import IconNav from "./assets/icon.svg";
import styles from "./nav-icon.module.scss";
import { PopoverContent } from "./popover-content";

/**
 * 渲染带有 NSNanoCat 项目入口弹层的导航图标。
 * Renders the navigation icon with an NSNanoCat project popover.
 *
 * @returns 导航图标。 / The navigation icon.
 */
export const NavIcon: React.FC = () => {
  return (
    <Popover overlay={<PopoverContent />} placement="bottomLeft">
      <span className={styles.icon}>
        <IconNav />
      </span>
    </Popover>
  );
};
