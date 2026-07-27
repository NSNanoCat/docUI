# @nsnanocat/doc-ui

`@nsnanocat/doc-ui` 是供 NSNanoCat 项目的 Rspress 文档站使用的 React 组件包。

## 功能

- `ModuleInstall`：生成 Loon、Surge、Quantumult X、Stash、Egern 与 Shadowrocket 的模块安装标签页。
- `NavIcon`：在 Rspress 导航栏展示 NSNanoCat 项目入口。
- `Contributors`：按需加载 GitHub 仓库贡献者及用户信息。
- `@nsnanocat/doc-ui/theme`：在 Rspress 默认主题的导航栏中注入 `NavIcon`。

## 安装

GitHub Packages 需要 GitHub 身份认证。先在项目或用户级 `.npmrc` 中配置：

```ini
@nsnanocat:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Token 至少需要 `read:packages` 权限，然后安装：

```shell
npm install @nsnanocat/doc-ui
```

本包要求消费项目提供 React 18、React DOM 18 与 Rspress 1：

```shell
npm install react@^18.3.1 react-dom@^18.3.1 rspress@^1.36.0
```

## 使用组件

```mdx
import { Contributors, ModuleInstall } from "@nsnanocat/doc-ui";

<ModuleInstall
  urlPrefix="https://example.com/releases/latest/download/"
  urls={{
    loon: "Example.plugin",
    surge: "Example.sgmodule",
  }}
/>

<Contributors repo="NSNanoCat/docUI" />
```

## 使用主题

在 Rspress 主题入口中直接重新导出：

```tsx
export { default } from "@nsnanocat/doc-ui/theme";
export * from "@nsnanocat/doc-ui/theme";
```

## 开发

```shell
npm install
npm run dev
```

完整检查：

```shell
npm run check
```

## 发布

仓库只发布到 GitHub Packages，不发布到 npm。推送符合 SemVer 的 `v*` tag 后，GitHub Actions 会使用 tag
中的版本构建并发布：

```shell
git tag -a v2.4.2 -m "v2.4.2"
git push origin v2.4.2
```

## License

[Apache-2.0](LICENSE)
