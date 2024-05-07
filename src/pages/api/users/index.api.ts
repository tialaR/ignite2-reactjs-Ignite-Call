import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  /* Validando o método da requisição pois o sistema 
  de api routes do Next não faz essa diferenciação de forma automatica
  quando chamamos a rota com qualquer método HTTP */
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  // Validando se o usuário já existe no BD através de algum identificador unico nesse caso username
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  // Caso o usuario exista no BD retornamos um erro 400 (Bad Request) e uma mensagem de erro
  if (userExists) {
    return res.status(400).json({
      message: 'Username already taken.',
    })
  }

  /* Caso o usuario não exista no BD criamos 
    ele e retornamos ele com o status 201 (Created) */
  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  /* Para identificar o usuario na aplicação utilizaremos
    os cookies (uma abordagem comum entre varias aplicações web
    para identificar o usuário) 
    -> Aqui eu quero salvar informações do usuário mesmo q ele 
    dê um F5 ou vá p outra página (utilizar um identificador unico p isso) 
    -> Os cookies são trafegados através dos cabeçalhos das nossas 
    requisições e respostas. Etão p eu criar um cookie preciso criar 
    um Header (cabeçalho na resposta) */
  /* Os cookies são uma ótima maneira de persistir informações do usário
    tanto no front quanto no back. 
    Se usassemos somente o localStorage teriamos acesso a essas informações
    somente do lado do front e não do back */
  // Salvando o ID do usuario no cookie de chave @ignitecall:userId
  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days to expire
    path: '/', // Determinando q/ todas as rotas da aplicação vai acessar esse cookie
  })

  return res.status(201).json(user)
}
