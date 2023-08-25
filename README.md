<p align="center">
  <img alt="" src="./public/logo.svg" width="80" height="80">
</p>

<p align="center">
  <i>Artwork from <a href="https://nuxt.com/">Nuxt</a></i>
</p>
<h1 align="center">Nuxt Naive Admin</h1>
<p align="center">一站式管理系统，融合 Nuxt、Naive UI 和 Supabase。</p>

<p align="center"
<a href="https://stackblitz.com/github/kuizuo/nuxt-naive-admin"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nuxt/v/rc"><img alt="size" src="https://img.shields.io/github/package-json/dependency-version/kuizuo/nuxt-naive-admin/dev/nuxt?style=flat&colorA=002438&colorB=28CF8D"></a>
  <a href="https://img.shields.io/github/languages/code-size/kuizuo/nuxt-naive-admin"><img alt="size" src="https://img.shields.io/github/languages/code-size/kuizuo/nuxt-naive-admin"></a>
  <a href="https://github.com/kuizuo/nuxt-naive-admin/tree/HEAD/LICENSE"><img alt="License" src="https://img.shields.io/github/license/kuizuo/nuxt-naive-admin?style=flat&colorA=002438&colorB=28CF8D" /></a>
</p>

<p>
  <a href="https://nuxt-naive-admin-docs.vercel.app/introduction/getting-started">🗺️ 项目介绍</a> |
  <a href="https://nuxt-naive-admin-docs.vercel.app/">📚 文档</a>
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

## 📝 License 

[MIT](./LICENSE) License &copy; 2023-PRESENT [Kuizuo](https://github.com/kuizuo)
