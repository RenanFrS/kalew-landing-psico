import type { ReactNode } from 'react'
import Image from 'next/image'
import { SUBSTACK_URL } from '@/lib/constants'
import {
  SUBSTACK_PROFILE,
  SUBSTACK_POSTS,
  SubstackPost,
} from '@/data/substack'

// ─────────────────────────────────────────────
// ICONS (feather-style, 24×24)
// ─────────────────────────────────────────────

type IconProps = { className?: string }

function Stroke({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const HeartIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Stroke>
)

const CommentIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </Stroke>
)

const RestackIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M17 1l4 4-4 4" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <path d="M7 23l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </Stroke>
)

const ShareIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M16 6l-4-4-4 4" />
    <path d="M12 2v13" />
  </Stroke>
)

const LinkIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Stroke>
)

const DotsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="5" cy="12" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="19" cy="12" r="1.6" />
  </svg>
)

// ─────────────────────────────────────────────
// ENGAGEMENT
// ─────────────────────────────────────────────

function Engagement({ post }: { post: SubstackPost }) {
  return (
    <div className="flex items-center gap-5 text-brand-fog">
      <span className="flex items-center gap-1.5">
        <HeartIcon className="w-4 h-4" />
        <span className="font-sans text-xs">{post.likes}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <CommentIcon className="w-4 h-4" />
        <span className="font-sans text-xs">{post.comments}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <RestackIcon className="w-4 h-4" />
        <span className="font-sans text-xs">{post.restacks}</span>
      </span>
      <ShareIcon className="w-4 h-4" />
    </div>
  )
}

// ─────────────────────────────────────────────
// POST ROW
// ─────────────────────────────────────────────

function PostRow({ post }: { post: SubstackPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 sm:gap-6 py-6 border-b border-brand-clay/15"
    >
      {/* Texto */}
      <div className="flex-1 min-w-0">
        {/* Publicação */}
        <div className="flex items-center gap-2 mb-2">
          <span className="relative w-4 h-4 rounded-sm overflow-hidden bg-brand-parchment shrink-0">
            <Image
              src={SUBSTACK_PROFILE.publicationLogoSrc}
              alt=""
              fill
              className="object-cover"
              sizes="16px"
            />
          </span>
          <span className="font-sans text-[11px] tracking-[0.15em] text-brand-fog uppercase truncate">
            {post.publication}
          </span>
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-medium text-brand-umber leading-snug group-hover:text-brand-clay transition-colors duration-300">
          {post.title}
        </h3>
        <p className="font-sans text-sm font-light text-brand-soil/60 leading-relaxed mt-1.5 line-clamp-2">
          {post.subtitle}
        </p>

        <p className="font-sans text-[11px] tracking-[0.12em] text-brand-fog uppercase mt-3">
          {SUBSTACK_PROFILE.name} · {post.readTime}
        </p>

        <div className="mt-3">
          <Engagement post={post} />
        </div>
      </div>

      {/* Coluna direita: data + miniatura */}
      <div className="shrink-0 flex flex-col items-end gap-2">
        <time
          dateTime={post.date}
          className="font-sans text-[11px] tracking-[0.1em] text-brand-fog uppercase whitespace-nowrap"
        >
          {post.displayDate}
        </time>
        <div className="relative w-[104px] h-[72px] sm:w-[124px] sm:h-[84px] rounded-md overflow-hidden bg-brand-parchment">
          <Image
            src={post.imageSrc}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 104px, 124px"
          />
        </div>
      </div>
    </a>
  )
}

// ─────────────────────────────────────────────
// PROFILE HEADER
// ─────────────────────────────────────────────

const TABS = ['Atividade', 'Publicações', 'Likes e respostas', 'Leituras (6)']

function ProfileHeader() {
  const p = SUBSTACK_PROFILE
  return (
    <div>
      {/* Nome + avatar */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-2xl font-medium text-brand-umber leading-tight">
            {p.name}
          </h3>
          <p className="font-sans text-sm text-brand-fog mt-0.5">{p.handle}</p>
        </div>
        <span className="relative w-14 h-14 rounded-full overflow-hidden bg-brand-parchment shrink-0">
          <Image src={p.avatarSrc} alt={p.name} fill className="object-cover" sizes="56px" />
        </span>
      </div>

      {/* Bio */}
      <p className="font-sans text-sm font-light text-brand-soil/70 leading-relaxed mt-4">
        {p.bio}
      </p>

      {/* Publicação */}
      <div className="flex items-center gap-2.5 mt-4">
        <span className="relative w-6 h-6 rounded-md overflow-hidden bg-brand-parchment shrink-0">
          <Image src={p.publicationLogoSrc} alt="" fill className="object-cover" sizes="24px" />
        </span>
        <span className="font-sans text-sm font-medium text-brand-umber truncate">
          {p.publication}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-brand-clay/25 text-brand-fog">
          <LinkIcon className="w-3 h-3" />
          <span className="font-sans text-xs">{p.publicationCount}</span>
        </span>
      </div>

      {/* Assinantes */}
      <p className="font-sans text-sm text-brand-fog mt-3">{p.subscribers}</p>

      {/* Botões → Substack */}
      <div className="flex items-center gap-2.5 mt-5">
        <a
          href={p.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none text-center font-sans text-sm font-medium text-brand-cream bg-brand-clay px-6 py-2.5 rounded-md hover:bg-brand-umber transition-colors duration-300"
        >
          Atualize
        </a>
        <a
          href={p.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none text-center font-sans text-sm font-medium text-brand-umber border border-brand-clay/30 px-6 py-2.5 rounded-md hover:border-brand-clay hover:text-brand-clay transition-colors duration-300"
        >
          Mensagem
        </a>
        <span className="flex items-center justify-center w-10 h-10 rounded-md border border-brand-clay/30 text-brand-fog">
          <DotsIcon className="w-5 h-5" />
        </span>
      </div>

      {/* Abas */}
      <div className="flex items-center gap-6 mt-7 border-b border-brand-clay/15 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
        {TABS.map((tab, i) => (
          <span
            key={tab}
            className={
              i === 1
                ? 'font-sans text-sm font-medium text-brand-umber whitespace-nowrap pb-3 border-b-2 border-brand-umber -mb-px'
                : 'font-sans text-sm text-brand-fog whitespace-nowrap pb-3'
            }
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────

export function SubstackSection() {
  return (
    <section id="substack" className="bg-brand-linen py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-8 h-px bg-brand-clay" />
          <span className="font-sans text-xs tracking-[0.3em] text-brand-clay uppercase">
            Substack
          </span>
          <div className="w-8 h-px bg-brand-clay" />
        </div>

        {/* Card do perfil */}
        <div className="bg-brand-cream rounded-2xl border border-brand-clay/15 shadow-sm p-6 sm:p-8">
          <ProfileHeader />

          {/* Lista de posts */}
          <div>
            {SUBSTACK_POSTS.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-6">
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-medium text-brand-umber hover:text-brand-clay transition-colors duration-200 pb-1 border-b border-brand-clay/30 hover:border-brand-clay"
            >
              Ver todos no Substack →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
