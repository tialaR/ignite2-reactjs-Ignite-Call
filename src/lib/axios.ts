import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

/*
  Como o backend está rodando na mesma code base do front
  eu não preciso colocar o host na baseURL. Pois o arquivo
  .env criado prelo prisma ja trará essa diferenciação de forma
  automática.
  -> No caso acima só preciso passar a pasta onde estão as rotas 
  backend de nossa aplicação Next.js. (ex: baseURL: '/api')
*/
