import axios from 'axios'

export default defineEventHandler(async (event) => {
  const params = event.context.params

  const response = await (await axios.get(`https://api.github.com/users/${params.all ?? ''}`)).data

  return response
})
