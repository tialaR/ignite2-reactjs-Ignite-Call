/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
}

/* 
-> pageExtensions -> Essa prop informar ao Next.js quais 
as extensões de arquivos queremos que ele transforme em 
rotas/páginas na aplicação. 
-> Assim a nomenclatura dos arquivos que serao rotas 
dentro da pasta pages muda (ex: inde.pages.tsx) 
*/

export default nextConfig
