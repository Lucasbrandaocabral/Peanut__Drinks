/**
 * Ajustes no dist/ que só fazem sentido no GitHub Pages:
 *
 * 1. 404.html — o Pages serve arquivos estáticos, então abrir /carrinho
 *    direto (ou dar F5 nela) devolveria 404. Uma cópia do index.html nesse
 *    nome faz o Pages entregar o app, que então resolve a rota no cliente.
 * 2. legacy/ — a versão antiga vai junto, para o "antes" do README ter
 *    um link ao vivo e os endereços antigos continuarem abrindo.
 *
 * Uso: npm run build (roda automaticamente depois do vite build)
 */
import { cp, copyFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

await copyFile(join(dist, 'index.html'), join(dist, '404.html'))
console.log('404.html criado a partir do index.html')

const legacy = join(root, 'legacy')
try {
  await access(legacy)
  await cp(legacy, join(dist, 'legacy'), { recursive: true })
  console.log('legacy/ copiada para dist/legacy')
} catch {
  console.log('legacy/ não encontrada — ignorando')
}
