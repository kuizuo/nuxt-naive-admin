import { AHttp } from '@kuizuo/http'

const http = new AHttp({ baseURL: 'https://api.github.com' })

export class Github {
  static async getUser(username: string) {
    const { data } = await http.get<API.User>(`/users/${username}`)
    return data
  }

  static async getRepos(username: string) {
    const { data } = await http.get<API.Repo[]>(`/users/${username}/repos`)
    return data
  }
}
