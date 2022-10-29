module.exports = {
  apps: [
    {
      name: 'Protocol',
      exec_mode: 'cluster',
      instances: '1',
      env: {
        NITRO_PORT: 8040,
        NITRO_HOST: '127.0.0.1',
        NODE_ENV: 'production',
      },
      script: './.output/server/index.mjs',
    },
  ],
}
