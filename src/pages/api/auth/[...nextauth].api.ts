import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '../../../lib/auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar?error=permissions'
      }

      return true
    },
  },
}

export default NextAuth(authOptions)

/* ### LOGIN SOCIAL ###
  -> Configuracao para realizar o LOGIN SOCIAL com Google
      utilizando o oAuth e o NextAuth 
  -> Esse login solicita permissoes para o Google Calendar 
  -> O Login social tem um tempo especifico de expiracao (serve
    para trazer as informacoes que precisamos e salvarmos elas 
    em nosso BD/aplicacao)
  -> Esse Login somente tras as informacoes necessarias apenas
    p nossa aplicacao conseguir salvar essas informacoes no BD
    p depois termos essas informacoes do nosso BD (isso p nao
    precisar bater toda vez na api do google por exemplo p consultar 
    as informacoes q colhemos durante o login social com o google)
    -> No Login social por exemplo. Por mais que o usuario tenha feito 
    o Login pelo google por ex. Eu nao devo depender totalemnet do google
    p q o usuario consiga trabalhar em nossa aplicacao. Por isso 'e importante
    que a gente tenha esses dados tb do nosso lado caso seja necessario
    (ex: salvando em algum BD ou algo do tipo)
  */
