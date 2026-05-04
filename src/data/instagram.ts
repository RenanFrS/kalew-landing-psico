export interface InstagramPost {
  id: string
  username: string
  displayName: string
  avatarSrc: string
  videoSrc: string | null
  thumbnailSrc: string
  productName: string
}

const POSTS: InstagramPost[] = [
  {
    id: '1',
    username: 'passerparlamer',
    displayName: 'Passer Par La Mer',
    avatarSrc: '/instagram/avatar.jpg',
    videoSrc: '/instagram/post-1.mp4',
    thumbnailSrc: '/instagram/thumb-1.jpg',
    productName: 'Pai Ausente Presente ',
  },
  {
    id: '2',
    username: 'passerparlamer',
    displayName: 'Passer Par La Mer',
    avatarSrc: '/instagram/avatar.jpg',
    videoSrc: '/instagram/post-2.mp4',
    thumbnailSrc: '/instagram/thumb-2.jpg',
    productName: 'As Palavras não significam nada',
  },
  {
    id: '3',
    username: 'passerparlamer',
    displayName: 'Passer Par La Mer',
    avatarSrc: '/instagram/avatar.jpg',
    videoSrc: '/instagram/post-3.mp4',
    thumbnailSrc: '/instagram/thumb-3.jpg',
    productName: 'O Choro é nosso primeiro idioma',
  },
  {
    id: '4',
    username: 'passerparlamer',
    displayName: 'Passer Par La Mer',
    avatarSrc: '/instagram/avatar.jpg',
    videoSrc: '/instagram/post-4.mp4',
    thumbnailSrc: '/instagram/thumb-4.jpg',
    productName: 'O Psicanalista não é pago para te dar conselhos',
  },
  {
    id: '5',
    username: 'passerparlamer',
    displayName: 'Passer Par La Mer',
    avatarSrc: '/instagram/avatar.jpg',
    videoSrc: '/instagram/post-5.mp4',
    thumbnailSrc: '/instagram/thumb-5.jpg',
    productName: 'Os textos de IA são chatos por um motivo',
  },
]

export { POSTS }