module.exports = {
  apps: [
    {
      name: 'Protocol',
      exec_mode: 'cluster',
      instances: '1',
      env: {
        NITRO_PORT: 8010,
        NITRO_HOST: 'localhost',
        NODE_ENV: 'production',
      },
      script: './.output/server/index.mjs',
    },
  ],
}
