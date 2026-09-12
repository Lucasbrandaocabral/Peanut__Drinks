/**
 * Converte as imagens originais (legacy/IMG) para WebP em public/img.
 * O projeto antigo servia 13 MB de PNG/JPG sem redimensionamento;
 * aqui cada imagem é limitada a 1600px de largura e recomprimida.
 *
 * Uso: npm run images
 */
import { readdir, mkdir, stat } from 'node:fs/promises'
import { join, relative, dirname, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(root, 'legacy', 'IMG')
const OUTPUT = join(root, 'public', 'img')

const MAX_WIDTH = 1600
const QUALITY = 78
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])

/** Normaliza nomes com espaço/acento para slugs seguros em URL. */
const slug = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

let count = 0
let before = 0
let after = 0

for await (const file of walk(SOURCE)) {
  if (!EXTENSIONS.has(extname(file).toLowerCase())) continue

  const rel = relative(SOURCE, file)
  const folder = slug(dirname(rel))
  const name = slug(basename(rel, extname(rel)))
  const target = join(OUTPUT, folder, `${name}.webp`)

  await mkdir(dirname(target), { recursive: true })
  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(target)

  before += (await stat(file)).size
  after += (await stat(target)).size
  count++
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2)
console.log(`${count} imagens convertidas`)
console.log(`${mb(before)} MB -> ${mb(after)} MB (-${Math.round((1 - after / before) * 100)}%)`)
