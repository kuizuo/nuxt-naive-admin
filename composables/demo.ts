// import type { Ref } from 'vue'
// import { $ref } from 'vue/macros'
// import type { User } from '~~/types'

// export class Demo {
//   // [plugin:vite:vue] $ref can only be used as the initializer of a variable declaration.
//   user = $ref<User | null>(null)

//   constructor() {
//     this.user = $ref<User | null>(null)
//   }

//   async findUser(username: string) {
//     const json = await (await fetch(`/api/users/${username}`)).json()
//     this.user = json
//   }

//   async findRepos() {
//     if (!this.user)
//       return

//     const json = await (await fetch(`/api/users/${this.user!.login}repos`)).json()
//     this.user!.repos = json
//   }
// }
