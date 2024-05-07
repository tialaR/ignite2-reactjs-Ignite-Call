import NextAuth from 'next-auth'

/* ARQUIVO DE DEFINICAO DE TIPOS */

declare module 'next-auth' {
  /* Sobrescrevendo a tipagem de 'User' da lib do 'next-auth' */
  export interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
  }
}