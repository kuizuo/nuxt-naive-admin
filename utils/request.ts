import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(
  ['message'],
)

export function getHeaders(defaultHeaders = {}) {
  return {
    ...defaultHeaders,
  }
}

const _fetch = $fetch.create({
  async onRequest({ options }) {
    options.headers = getHeaders(options.headers)
  },
  async onResponse({ response }) {

  },
  async onResponseError({ response, options }) {
    options?.params?.noMessage || message.error(response._data?.message || '服务器错误')
  },
})

const request = _fetch

export default request

