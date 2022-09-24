# 协议复现/模拟请求模板

![protocol](https://img.kuizuo.cn/protocol.png)

## 目的

本项目旨在提供一个协议复现的模板，用作敏捷开发，快速复现协议/模拟请求。

如果你恰好使用 Node.js 来做爬虫，api接口等等。那么基于本项目复现一个协议请求将会特别容易。

**本项目仅用于学习研究使用，请勿将本项目的任何内容用于商业或非法目的，否则后果自负。**

## 用法

- 将 public/logo.png 换成你想要展示的 logo。
- 修改 package.json 中的name、author，versopm信息，默认以这些属性设置为网站标题，作者，版本信息。
- 在  content/help.md 与 content/changelog.md 编写项目的使用说明和更新日志。
- 在 server/api 编写你要后端请求接口。
- 在 pages 与 components 编写你的前端页面与组件。

## 技术栈

Nuxt3 + Unocss + Naive UI

## 部署

### 服务器部署

```bash
npm run build
node .output/server/index.mjs 
```

### Vercel

转到 [Vercel](https://vercel.com/new) 并选择你的项目，点击  "Deploy"，您的应用程序将在一分钟内上线。

### Netlify

转到 [Netlify](https://app.netlify.com/start) 并选择您的项目，点击 "Deploy site"，您的应用程序将在一分钟内上线。
