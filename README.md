# Protocol

![preview](./public/img/preview.png)

## 目的

一个用于快速复现请求协议的 Web 开发模板。

如果你恰好使用 Node.js 来请求api接口或者爬虫，并且部署在 Web 上，那么基于本项目将会特别容易做到。

**本模板仅仅是web模板，任何开发者用该模板做什么样的站点都与本人无关。仅作为个人技术专研，仅供学习参考。**

## 用法

- 将 public/logo.svg 换成你想要展示的 logo。
- 修改 [app.config.ts](https://v3.nuxtjs.org/guide/directory-structure/app.config/) 中的配置，并通过 `useConfig()` 在页面中获取。
- 在 content 目录下修改 `help.md` 与 `changelog.md` 以更新使用说明与更新日志。支持 [MDC Syntax](https://content.nuxtjs.org/guide/writing/mdc/)
- 在 server/api 下编写你的后端请求接口。server/protocol 下编写协议请求核心逻辑便于调用。

## 部署

### 服务器部署

这里使用 pm2 进行部署，创建 `ecosystem.config.js` 文件：

```js
module.exports = {
  apps: [
    {
      name: 'Protocol',
      exec_mode: 'cluster',
      instances: '1',
      env: {
        NITRO_PORT: 8044,
        NITRO_HOST: '127.0.0.1',
        NODE_ENV: 'production',
      },
      script: './.output/server/index.mjs',
    },
  ],
}
```

接着执行 `pm2 start ecosystem.config.js` 即可。

### Vercel

转到 [Vercel](https://vercel.com/new) 并选择你的项目，点击  "Deploy"，您的应用程序将在一分钟内上线。

### Netlify

转到 [Netlify](https://app.netlify.com/start) 并选择您的项目，点击 "Deploy site"，您的应用程序将在一分钟内上线。

## License 

[MIT](./LICENSE) License &copy; 2022-PRESENT [Kuizuo](https://github.com/kuizuo)
