import { asset } from '@/lib/asset'
import type { CategorySlug, Product } from '@/types'

type Seed = Omit<Product, 'id' | 'slug'> & { slug?: string }

/** Slug em minúsculas, sem acento, usado nas rotas de produto. */
const toSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()

const build = (seeds: Seed[]): Product[] =>
  seeds.map((seed, index) => ({
    ...seed,
    id: String(index + 1).padStart(3, '0'),
    slug: seed.slug ?? toSlug(seed.name),
    image: asset(seed.image),
  }))

const COCKTAIL_VOLUMES = [300, 500]
const WINE_VOLUMES = [375, 750]

export const products: Product[] = build([
  // ---------- Alcoólicas ----------
  {
    name: 'Aperol Spritz',
    price: 532,
    seller: 'Elixir Lounge',
    rating: 4.8,
    reviews: 1352,
    delivery: [25, 30],
    image: '/img/home/aperol-spritz.webp',
    category: 'alcoolicas',
    abv: 11,
    volumes: COCKTAIL_VOLUMES,
    description:
      'O aperitivo italiano por excelência: Aperol, prosecco e água com gás sobre gelo, finalizado com uma fatia de laranja. Amargo na medida, leve e refrescante.',
  },
  {
    name: 'Gin and Tonic',
    price: 311,
    seller: 'The Beverage Bar',
    rating: 4.9,
    reviews: 1523,
    delivery: [25, 30],
    image: '/img/home/gin-and-tonic.webp',
    category: 'alcoolicas',
    abv: 12,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Gin London Dry com tônica premium, zimbro e casca de limão siciliano. Servido em taça ampla com muito gelo para manter o aroma vivo até o último gole.',
  },
  {
    name: 'Old Fashioned',
    price: 412,
    seller: 'Liquid Lounge',
    rating: 4.7,
    reviews: 1259,
    delivery: [20, 25],
    image: '/img/order/old-fashioned.webp',
    category: 'alcoolicas',
    abv: 32,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Bourbon, açúcar caramelizado e angostura, mexidos lentamente sobre uma pedra única de gelo. Casca de laranja torcida na borda para liberar os óleos cítricos.',
  },
  {
    name: 'Coquetel da Casa',
    price: 412,
    seller: 'Drink Delight',
    rating: 4.1,
    reviews: 589,
    delivery: [30, 35],
    image: '/img/home/coquetel.webp',
    category: 'alcoolicas',
    abv: 14,
    volumes: COCKTAIL_VOLUMES,
    description:
      'A criação da semana do nosso bartender: destilado da casa, xarope artesanal de especiarias e cítricos frescos. Muda toda semana, nunca decepciona.',
  },
  {
    name: 'Gin and Tonic Cítrico',
    price: 313,
    seller: 'Sip & Savor',
    rating: 4.2,
    reviews: 621,
    delivery: [40, 45],
    image: '/img/home/gin-and-tonic-2.webp',
    category: 'alcoolicas',
    abv: 12,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Versão cítrica do clássico, com gin infusionado em capim-limão, tônica seca e um toque de grapefruit. Mais floral e menos amargo que o tradicional.',
  },
  {
    name: 'Craft Beer',
    price: 331,
    seller: 'The Oasis',
    rating: 4.5,
    reviews: 854,
    delivery: [30, 35],
    image: '/img/home/craft-beer.webp',
    category: 'alcoolicas',
    abv: 6,
    volumes: [355, 500],
    description:
      'IPA artesanal de produção local, com lúpulo americano, amargor médio e notas de maracujá e pinho. Servida gelada, direto do barril.',
  },
  {
    name: 'Cosmopolitan',
    price: 489,
    seller: 'Elixir Lounge',
    rating: 4.6,
    reviews: 934,
    delivery: [25, 30],
    image: '/img/pagealcoholic/cosmopolitan.webp',
    category: 'alcoolicas',
    abv: 20,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Vodka cítrica, licor de laranja, cranberry e limão. Coado na taça gelada e servido com casca de laranja flambada.',
  },
  {
    name: 'Mojito',
    price: 421,
    seller: 'The Dive Inn',
    rating: 4.7,
    reviews: 1187,
    delivery: [20, 25],
    image: '/img/pagealcoholic/mijito.webp',
    category: 'alcoolicas',
    abv: 13,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Rum branco, hortelã macerada, limão e açúcar, completado com água com gás e gelo triturado. O clássico cubano, sem atalhos.',
  },
  {
    name: 'Sex On The Beach',
    price: 452,
    seller: 'The Buzzed Bull',
    rating: 4.3,
    reviews: 688,
    delivery: [30, 35],
    image: '/img/pagealcoholic/sex-on-the-beach.webp',
    category: 'alcoolicas',
    abv: 15,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Vodka, licor de pêssego, suco de laranja e cranberry em camadas. Doce, frutado e com aquele degradê de laranja para vermelho.',
  },
  {
    name: 'Whiskey Sour',
    price: 478,
    seller: 'Liquid Lounge',
    rating: 4.8,
    reviews: 1402,
    delivery: [25, 30],
    image: '/img/pagealcoholic/whiskey-sour.webp',
    category: 'alcoolicas',
    abv: 22,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Bourbon, limão, xarope simples e clara batida até formar espuma sedosa. Três gotas de angostura desenhadas no topo.',
  },
  {
    name: "Pimm's Cup",
    price: 466,
    seller: 'The Cozy Corner',
    rating: 4.4,
    reviews: 512,
    delivery: [30, 35],
    image: '/img/pagealcoholic/pimms-cup.webp',
    category: 'alcoolicas',
    abv: 10,
    volumes: COCKTAIL_VOLUMES,
    description:
      "Pimm's No.1 com limonada gaseificada, pepino, morango e hortelã. O drink de verão inglês, leve e cheio de fruta fresca.",
  },
  {
    name: 'Piña Colada',
    price: 512,
    seller: 'The Oasis',
    rating: 4.5,
    reviews: 976,
    delivery: [35, 40],
    image: '/img/pagealcoholic/pina-colada.webp',
    category: 'alcoolicas',
    abv: 13,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Rum, creme de coco e abacaxi batidos com gelo até ficar cremoso. Servido com fatia de abacaxi e cereja na borda.',
  },
  {
    name: 'Bloody Mary',
    price: 498,
    seller: 'The Midnight Owl',
    rating: 4.2,
    reviews: 743,
    delivery: [25, 30],
    image: '/img/pagealcoholic/bloody-mary.webp',
    category: 'alcoolicas',
    abv: 14,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Vodka, tomate temperado, worcestershire, limão e pimenta, com talo de aipo e borda de sal defumado. Salgado e encorpado.',
  },
  {
    name: 'Blue Lagoon',
    price: 435,
    seller: 'Drink Delight',
    rating: 4.1,
    reviews: 421,
    delivery: [30, 35],
    image: '/img/pagealcoholic/blue-lagoon.webp',
    category: 'alcoolicas',
    abv: 14,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Vodka, curaçau azul e limonada. O azul elétrico vem do licor de laranja — sabor cítrico, aparência impossível de ignorar.',
  },
  {
    name: "Dark 'N' Stormy",
    price: 472,
    seller: 'The Whistling',
    rating: 4.6,
    reviews: 833,
    delivery: [25, 30],
    image: '/img/pagealcoholic/dark-n-stormy.webp',
    category: 'alcoolicas',
    abv: 16,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Rum escuro despejado sobre ginger beer gelada, formando a nuvem que dá nome ao drink. Picante de gengibre e bem seco.',
  },
  {
    name: 'Mai Tai',
    price: 524,
    seller: 'The Bohemian Bistro',
    rating: 4.5,
    reviews: 657,
    delivery: [35, 40],
    image: '/img/pagealcoholic/mai-tai.webp',
    category: 'alcoolicas',
    abv: 20,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Blend de rum, orgeat de amêndoas, curaçau e limão. Tiki clássico: complexo, amendoado e mais forte do que parece.',
  },
  {
    name: 'Negroni',
    price: 508,
    seller: 'Elixir Lounge',
    rating: 4.9,
    reviews: 1611,
    delivery: [20, 25],
    image: '/img/pagealcoholic/negroni.webp',
    category: 'alcoolicas',
    abv: 24,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Partes iguais de gin, Campari e vermute tinto, mexidos sobre gelo. Amargo, direto e com casca de laranja torcida.',
  },
  {
    name: 'Vodka Red Bull',
    price: 398,
    seller: 'The Buzzed Bull',
    rating: 3.9,
    reviews: 389,
    delivery: [20, 25],
    image: '/img/pagealcoholic/vodka-red-bull.webp',
    category: 'alcoolicas',
    abv: 15,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Vodka premium com energético gelado e uma fatia de limão. Simples, forte e o pedido padrão de quem vai virar a noite.',
  },
  {
    name: 'Rum Punch',
    price: 445,
    seller: 'The Dive Inn',
    rating: 4.3,
    reviews: 574,
    delivery: [30, 35],
    image: '/img/pagealcoholic/rum-punch.webp',
    category: 'alcoolicas',
    abv: 17,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Rum, frutas tropicais, limão e um toque de granadina. Receita caribenha de ponche, feita para dividir — ou não.',
  },
  {
    name: 'Sidecar',
    price: 531,
    seller: 'The Golden Goblet',
    rating: 4.6,
    reviews: 486,
    delivery: [25, 30],
    image: '/img/pagealcoholic/sidecar.webp',
    category: 'alcoolicas',
    abv: 26,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Conhaque, licor de laranja e limão, servido em taça com borda de açúcar. Elegante, cítrico e afiado.',
  },
  {
    name: 'Screwdriver',
    price: 342,
    seller: 'Sip & Savor',
    rating: 4.0,
    reviews: 298,
    delivery: [20, 25],
    image: '/img/pagealcoholic/screwdriver.webp',
    category: 'alcoolicas',
    abv: 12,
    volumes: COCKTAIL_VOLUMES,
    description:
      'Vodka e suco de laranja espremido na hora, com muito gelo. Dois ingredientes, execução impecável.',
  },

  // ---------- Não alcoólicas ----------
  {
    name: 'Sunset Spritz',
    price: 289,
    seller: 'The Buzzed Bull',
    rating: 4.6,
    reviews: 952,
    delivery: [35, 40],
    image: '/img/home/senset-spritz.webp',
    category: 'nao-alcoolicas',
    volumes: COCKTAIL_VOLUMES,
    description:
      'Todo o ritual do spritz, zero álcool: aperitivo sem álcool, espumante de uva branca e laranja sanguínea. A cor do pôr do sol dentro da taça.',
  },
  {
    name: 'Minty Lime Delight',
    price: 111,
    seller: 'The Beverage Bar',
    rating: 4.1,
    reviews: 521,
    delivery: [60, 65],
    image: '/img/home/minty-lime-delight.webp',
    category: 'nao-alcoolicas',
    volumes: COCKTAIL_VOLUMES,
    description:
      'Limão taiti espremido na hora, hortelã macerada e água com gás. Simples, direto e absurdamente refrescante em dia de calor.',
  },
  {
    name: 'Minty Lime Splash',
    price: 412,
    seller: 'Liquid Lounge',
    rating: 4.7,
    reviews: 1259,
    delivery: [20, 25],
    image: '/img/home/minty-lime-splash.webp',
    category: 'nao-alcoolicas',
    volumes: COCKTAIL_VOLUMES,
    description:
      'Mocktail de limão e hortelã com xarope de agave e um toque de pepino. Servido em copo alto com gelo triturado.',
  },
  {
    name: 'Tropical Sunrise',
    price: 112,
    seller: 'The Dive Inn',
    rating: 3.5,
    reviews: 100,
    delivery: [70, 75],
    image: '/img/home/tropical-sunrise.webp',
    category: 'nao-alcoolicas',
    volumes: COCKTAIL_VOLUMES,
    description:
      'Camadas de manga, maracujá e laranja que se misturam do amarelo ao vermelho dentro do copo. Doce, frutado e feito para foto.',
  },
  {
    name: 'Cucumber Mint Bliss',
    price: 499,
    seller: 'Sip & Savor',
    rating: 4.2,
    reviews: 546,
    delivery: [40, 45],
    image: '/img/home/cucumber-mint-bliss.webp',
    category: 'nao-alcoolicas',
    volumes: COCKTAIL_VOLUMES,
    description:
      'Pepino, hortelã e limão em uma mistura leve e herbal. Perfeito para dias de sol e momentos de relaxamento — frescor e vitalidade em cada gole.',
  },
  {
    name: 'Minty Lime Breeze',
    price: 131,
    seller: 'The Dive Inn',
    rating: 4.4,
    reviews: 752,
    delivery: [30, 35],
    image: '/img/home/minty-lime-breeze.webp',
    category: 'nao-alcoolicas',
    volumes: COCKTAIL_VOLUMES,
    description:
      'Chá verde gelado com limão, hortelã e um toque de gengibre. Levemente adocicado, ótimo acompanhamento para comida apimentada.',
  },

  // ---------- Vinhos ----------
  {
    name: "Jacob's Creek",
    price: 3932,
    seller: 'The Cozy Corner',
    rating: 4.8,
    reviews: 1352,
    delivery: [25, 30],
    image: '/img/home/jacobs-creek.webp',
    category: 'vinhos',
    abv: 13,
    volumes: WINE_VOLUMES,
    description:
      'Tinto australiano de corpo médio, com amora madura, baunilha e taninos macios. Vai bem com carne vermelha e queijos curados.',
  },
  {
    name: 'Malbec Roble',
    price: 1033,
    seller: 'The Golden Goblet',
    rating: 4.9,
    reviews: 1523,
    delivery: [25, 30],
    image: '/img/home/malbec-roble.webp',
    category: 'vinhos',
    abv: 13.5,
    volumes: WINE_VOLUMES,
    description:
      'Malbec argentino com passagem por carvalho: ameixa, chocolate amargo e um final levemente defumado. Custo-benefício difícil de bater.',
  },
  {
    name: 'Malbec',
    price: 1012,
    seller: 'The Midnight Owl',
    rating: 4.7,
    reviews: 1259,
    delivery: [20, 25],
    image: '/img/home/malbac.webp',
    category: 'vinhos',
    abv: 13,
    volumes: WINE_VOLUMES,
    description:
      'Malbec jovem de Mendoza, frutado e fácil de beber. Sem passagem por madeira, feito para abrir no mesmo dia em que se compra.',
  },
  {
    name: 'Trumpeter Cabernet',
    price: 4512,
    seller: 'The Bohemian Bistro',
    rating: 4.8,
    reviews: 458,
    delivery: [30, 35],
    image: '/img/home/trumpeter-cabernet.webp',
    category: 'vinhos',
    abv: 14,
    volumes: WINE_VOLUMES,
    description:
      'Cabernet Sauvignon encorpado, com cassis, pimenta preta e taninos firmes. Ganha muito se for aberto meia hora antes de servir.',
  },
  {
    name: 'Costa y Roca',
    price: 2513,
    seller: 'The Crimson',
    rating: 4.2,
    reviews: 621,
    delivery: [40, 45],
    image: '/img/home/costa-y-roca.webp',
    category: 'vinhos',
    abv: 12.5,
    volumes: WINE_VOLUMES,
    description:
      'Corte chileno equilibrado, com fruta vermelha fresca e acidez viva. Versátil o bastante para acompanhar do risoto à pizza.',
  },
  {
    name: 'Gran Cabernet',
    price: 4831,
    seller: 'The Whistling',
    rating: 4.5,
    reviews: 854,
    delivery: [30, 35],
    image: '/img/home/gran-cabernet.webp',
    category: 'vinhos',
    abv: 14,
    volumes: WINE_VOLUMES,
    description:
      'Reserva com 12 meses de barrica: estrutura, couro, tabaco e fruta escura. O rótulo mais sério da nossa carta de tintos.',
  },
  {
    name: 'Cabernet Franc',
    price: 3890,
    seller: 'The Crimson',
    rating: 4.7,
    reviews: 612,
    delivery: [30, 35],
    image: '/img/pagealcoholic/cabernet-franc.webp',
    category: 'vinhos',
    abv: 13,
    volumes: WINE_VOLUMES,
    description:
      'Tinto de acidez viva, com pimentão verde, framboesa e final herbal. O corte favorito de quem já cansou de Cabernet Sauvignon.',
  },
])

export const productBySlug = new Map(products.map((product) => [product.slug, product]))

export const productsByCategory = (category: CategorySlug) =>
  products.filter((product) => product.category === category)

/** Busca por nome, vendedor ou descrição — usada na barra de pesquisa. */
export function searchProducts(query: string): Product[] {
  const term = query.trim().toLowerCase()
  if (!term) return []
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.seller.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term),
  )
}
