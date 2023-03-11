export class Github {
  static async getUser(username: string) {
    const data = await (await fetch(`/users/${username}`)).json() as API.User
    return data
  }

  static async getRepos(username: string) {
    const data = await (await fetch(`/users/${username}/repos`)).json() as API.Repo[]
    return data
  }
}
