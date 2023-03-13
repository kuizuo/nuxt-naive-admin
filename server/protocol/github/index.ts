import got from 'got'

const api = got.extend({
  prefixUrl: 'https://api.github.com/',
  responseType: 'json',
})

export class Github {
  static async getUser(username: string) {
    return await api.get(`users/${username}`).json<API.User>()
  }

  static async getRepos(username: string) {
    return await api.get(`users/${username}/repos`).json<API.Repo[]>()
  }
}
