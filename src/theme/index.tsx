import { Layout as DefaultLayout, HomeLayout, NotFoundLayout, useBindingAsideScroll, useSetup } from "rspress/theme";
import { NavIcon } from "../nav-icon";

const Layout = () => {
  return <DefaultLayout beforeNavTitle={<NavIcon />} />;
};

export default {
  Layout,
  NotFoundLayout,
  HomeLayout,
  useBindingAsideScroll,
  useSetup,
};

export * from "rspress/theme";
