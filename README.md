<p align="center">
  <img alt="" src="./public/logo.svg" width="80" height="80">
</p>

<p align="center">
  <i>Artwork from <a href="https://nuxt.com/">Nuxt</a></i>
</p>
<h1 align="center">Nuxt-Naive-Admin</h1>
<p align="center">使用 Nuxt 框架, 基于 Naive UI 组件库, 以及 Supabase 服务所开发的管理系统</p>

<p align="center"
<a href="https://stackblitz.com/github/kuizuo/nuxt-naive-admin"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nuxt/v/rc"><img alt="size" src="https://img.shields.io/github/package-json/dependency-version/kuizuo/nuxt-naive-admin/dev/nuxt?style=flat&colorA=002438&colorB=28CF8D"></a>
  <a href="https://img.shields.io/github/languages/code-size/kuizuo/nuxt-naive-admin"><img alt="size" src="https://img.shields.io/github/languages/code-size/kuizuo/nuxt-naive-admin"></a>
  <a href="https://github.com/kuizuo/nuxt-naive-admin/tree/HEAD/LICENSE"><img alt="License" src="https://img.shields.io/github/license/kuizuo/nuxt-naive-admin?style=flat&colorA=002438&colorB=28CF8D" /></a>
</p>

<p>
  <a href="##一些话">🗺️ Project Introduce</a> |
  <a href="https://docs.nuxt-naive-admin.vercel.app/">📚 Documentation</a>
</p>

<br>

> **Warning**: 本项目还处于开发阶段, 暂不建议用于生产环境。

<br>

## ✨ 特性

- 一个完整的 Nuxt 全栈项目
- 使用 naive-ui 组件
- 集成 supabase 服务

## 🖥️ 演示

- [nuxt-naive-admin.vercel.app](https://nuxt-naive-admin.vercel.app)

管理员账号：admin@kuizuo.cn 密码：Aa123456

## 🚀 快速开始

```
git clone https://github.com/kuizuo/nuxt-naive-admin
cd nuxt-naive-admin
pnpm i
pnpm run dev
```

## 🎉 部署

### 服务器

这里使用 pm2 进行部署，创建 `ecosystem.config.js` 文件：

```js
module.exports = {
  apps: [
    {
      name: 'Nuxt-Naive-Admin',
      exec_mode: 'cluster',
      instances: '1',
      env: {
        NITRO_PORT: 8010,
        NITRO_HOST: '127.0.0.1',
        NODE_ENV: 'production',
      },
      script: './.output/server/index.mjs',
    },
  ],
}
```

执行 `pm2 start ecosystem.config.js` 即可。

## 一些话

起初这个项目是我用于做 Node.js 来请求api接口或者爬虫，并且部署在 Web 上，所编写的一个模版，名 Protocol（即用于协议复现的）。

有次使用该模块的时候需要管理用户数据，与其搭建一个 vben + nest 的管理网站，不如直接在 nuxt 的 page 下创建 admin 目录，将管理端的页面都写在该目录下，故这个项目便改名为 nuxt-naive-admin。

于是我开始使用 nitro 来实现后端服务，如身份效验，数据库查询等等。期间用到了 [nuxt-auth](https://nuxt.com/modules/nuxt-auth) 与 [prisma](https://www.prisma.io/)，相信使用 ts 全栈框架肯定不陌生。

但后来我思考到，既然要自己实现后端服务，为何不考虑使用更全面的 [nest.js](https://nestjs.com/) 框架。可这样违背了我一开始所想要编写这个项目的初心，即我只希望**所有的代码都在全栈框架体系下**。这不同于 monorepo，就仅仅只是一个 nuxt 或 next 仓库。

加之在开发期间受 serverless 影响较重，与其自己在 server 目录下实现后端服务接口，不如直接使用一些第三方平台，综合考量下选用 supabase。

虽然本项目使用 supabase cloud，但 supabase 支持[私有化部署](https://supabase.com/docs/guides/self-hosting)（会阉割许多功能）。后续可能会考虑私有化部署，这样你就能通过 [supabase.kuizuo.cn](http://supabase.kuizuo.cn/) 来访问 supabase 后台。

使用 supabase 肯定也是有一些缺点的，后续或许会根据实际业务该用其他baas 平台或者自行编写相关服务。

## 📝 License 

[MIT](./LICENSE) License &copy; 2023-PRESENT [Kuizuo](https://github.com/kuizuo)
