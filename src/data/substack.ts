export interface SubstackPost {
  id: string
  /** Nome da publicação exibido no topo do card (eyebrow) */
  publication: string
  title: string
  subtitle: string
  /** ISO date — usado no datetime do <time> */
  date: string
  /** Data formatada para exibição (igual ao Substack) */
  displayDate: string
  /** Texto do tempo de leitura, ex: "12 min de leitura" */
  readTime: string
  /** URL do post no Substack */
  url: string
  imageSrc: string
  likes: number
  comments: number
  restacks: number
}

export interface SubstackProfile {
  name: string
  handle: string
  avatarSrc: string
  bio: string
  publication: string
  publicationLogoSrc: string
  /** Nº de publicações associadas (chip ao lado da publicação) */
  publicationCount: number
  subscribers: string
  profileUrl: string
}

const SUBSTACK_PROFILE: SubstackProfile = {
  name: 'Kalew Nicholas',
  handle: '@kalewnicholas',
  avatarSrc: '/instagram/avatar.jpg',
  bio: 'Psicanalista por opção, poeta por teimosia e escritor por necessidade.',
  publication: 'passer par la mer',
  publicationLogoSrc: '/substack/logo.png',
  publicationCount: 2,
  subscribers: '525 assinantes',
  profileUrl: 'https://kalewnicholas.substack.com',
}

const SUBSTACK_POSTS: SubstackPost[] = [
  {
    id: '1',
    publication: 'passer par la mer',
    title: 'O homem contra a natureza?',
    subtitle: 'Ou: Atualizando um velho conflito',
    date: '2026-01-20',
    displayDate: '20 de jan.',
    readTime: '12 min de leitura',
    url: 'https://kalewnicholas.substack.com/p/o-homem-contra-a-natureza',
    imageSrc: '/substack/post-1.jpg',
    likes: 7,
    comments: 2,
    restacks: 1,
  },
  {
    id: '2',
    publication: 'passer par la mer',
    title: 'Depressão não é doença',
    subtitle:
      'E essa afirmação não resume um problema biológico, mas um problema de linguagem',
    date: '2025-12-01',
    displayDate: '1 de dezembro de 2025',
    readTime: '8 min de leitura',
    url: 'https://kalewnicholas.substack.com/p/depressao-nao-e-doenca',
    imageSrc: '/substack/post-2.jpg',
    likes: 9,
    comments: 1,
    restacks: 1,
  },
  {
    id: '3',
    publication: 'passer par la mer',
    title: 'A incapacidade de ir além dos símbolos e compreender a realidade',
    subtitle: 'Ou: Pra você dar nome',
    date: '2025-08-15',
    displayDate: '15 de agosto de 2025',
    readTime: '8 min de leitura',
    url: 'https://kalewnicholas.substack.com/p/a-incapacidade-de-ir-alem-dos-simbolos',
    imageSrc: '/substack/post-3.jpg',
    likes: 16,
    comments: 1,
    restacks: 1,
  },
]

export { SUBSTACK_PROFILE, SUBSTACK_POSTS }
