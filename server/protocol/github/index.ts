import { AHttp } from '@kuizuo/http'

const http = new AHttp({ baseURL: 'https://api.github.com' })

export class Github {
  /**
   * 获取用户信息
   * @param username 用户名
   */
  static async getUser(username: string) {
    const { data } = await http.get<API.User>(`/users/${username}`)
    if (data.login)
      return data

    else
      throw new Error('用户不存在')
  }

  static async getRepos(username: string) {
    const { data } = await http.get<API.Repo[]>(`/users/${username}/repos`)
    return data
  }
}
