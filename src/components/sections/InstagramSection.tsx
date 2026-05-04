'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { INSTAGRAM_URL } from '@/lib/constants'
import { POSTS, InstagramPost } from '@/data/instagram'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

interface PostCardProps {
  post: InstagramPost
  /** Forçar play via IntersectionObserver no mobile */
  forcePlay?: boolean
}

function PostCard({ post, forcePlay = false }: PostCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const playVideo = useCallback(() => {
    const video = videoRef.current
    if (!video || !post.videoSrc) return
    video.play().catch(() => {
      // autoplay bloqueado pelo browser — silencioso
    })
    setIsPlaying(true)
  }, [post.videoSrc])

  const pauseVideo = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    setIsPlaying(false)
  }, [])

  // Mobile: forcePlay via IntersectionObserver (controlado pelo pai)
  useEffect(() => {
    if (forcePlay) {
      playVideo()
    } else {
      pauseVideo()
    }
  }, [forcePlay, playVideo, pauseVideo])

  return (
    <article className="relative flex-shrink-0 w-[280px] sm:w-[300px] rounded-2xl bg-white border border-brand-parchment overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header do card */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-brand-parchment relative shrink-0">
            <Image
              src={post.avatarSrc}
              alt={post.displayName}
              fill
              className="object-cover"
              sizes="36px"
              onError={(e) => {
                // fallback gracioso se a imagem não existir
                const target = e.currentTarget as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
          <div className="leading-tight">
            <p className="font-sans text-sm font-medium text-brand-umber">{post.displayName}</p>
            <p className="font-sans text-xs text-brand-fog">@{post.username}</p>
          </div>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver no Instagram"
          className="text-brand-fog hover:text-[#E1306C] transition-colors duration-200"
        >
          <InstagramIcon className="w-5 h-5" />
        </a>
      </div>

      {/* Media body */}
      <div
        className="relative aspect-[4/5] bg-brand-parchment overflow-hidden cursor-pointer group/media"
        onMouseEnter={() => {
          setIsHovering(true)
          playVideo()
        }}
        onMouseLeave={() => {
          setIsHovering(false)
          if (!forcePlay) pauseVideo()
        }}
      >
        {/* Thumbnail */}
        <Image
          src={post.thumbnailSrc}
          alt={post.productName}
          fill
          className={cn(
            'object-cover transition-opacity duration-500',
            isPlaying ? 'opacity-0' : 'opacity-100'
          )}
          sizes="300px"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            target.style.display = 'none'
          }}
        />

        {/* Vídeo (mudo, loop) */}
        {post.videoSrc && (
          <video
            ref={videoRef}
            src={post.videoSrc}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
              isPlaying ? 'opacity-100' : 'opacity-0'
            )}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        {/* Overlay play icon — aparece quando não está tocando */}
        {post.videoSrc && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
              isPlaying ? 'opacity-0' : 'opacity-100 group-hover/media:opacity-0'
            )}
          >
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <PlayIcon className="w-5 h-5 text-white ml-0.5" />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────
// NAV BUTTON
// ─────────────────────────────────────────────

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Anterior' : 'Próximo'}
      className={cn(
        'w-11 h-11 rounded-full flex items-center justify-center',
        'bg-brand-umber text-brand-cream',
        'hover:bg-brand-clay transition-colors duration-200',
        'disabled:opacity-30 disabled:cursor-not-allowed'
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
        {direction === 'prev'
          ? <path d="M15 18l-6-6 6-6" />
          : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  )
}

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────

export function InstagramSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // IntersectionObserver: no mobile, o card centralizado dá play automático
  useEffect(() => {
    if (!isMobile) {
      setActiveCardIndex(null)
      return
    }

    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            setActiveCardIndex(i)
          }
        },
        {
          root: trackRef.current,
          threshold: 0.7,
        }
      )
      observer.observe(card)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [isMobile])

  // Scroll para o card pelo índice
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current
    const card = cardRefs.current[index]
    if (!track || !card) return
    const trackLeft = track.getBoundingClientRect().left
    const cardLeft = card.getBoundingClientRect().left
    const offset = cardLeft - trackLeft + track.scrollLeft - (track.clientWidth / 2) + (card.clientWidth / 2)
    track.scrollTo({ left: offset, behavior: 'smooth' })
  }, [])

  const goTo = (dir: 'prev' | 'next') => {
    const next = dir === 'prev'
      ? Math.max(0, currentIndex - 1)
      : Math.min(POSTS.length - 1, currentIndex + 1)
    setCurrentIndex(next)
    scrollToIndex(next)
  }

  return (
    <section className="bg-brand-linen py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-brand-clay" />
              <span className="font-sans text-xs tracking-[0.3em] text-brand-clay uppercase">
                Instagram
              </span>
            </div>
            <h2
              className="font-serif font-light text-brand-umber leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              Do consultório<br />
              <em className="italic text-brand-clay">para o feed</em>
            </h2>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-brand-umber hover:text-brand-clay transition-colors duration-200 shrink-0 pb-1 border-b border-brand-clay/30 hover:border-brand-clay"
          >
            <InstagramIcon className="w-4 h-4" />
            @passerparlamer
          </a>
        </div>

        {/* Carrossel */}
        <div className="relative -mx-6 md:-mx-12">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-12 pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {POSTS.map((post, i) => (
              <div
                key={post.id}
                ref={(el) => { cardRefs.current[i] = el }}
                className="snap-center"
              >
                <PostCard
                  post={post}
                  forcePlay={isMobile ? activeCardIndex === i : false}
                />
              </div>
            ))}
            {/* Padding final para o último card não ficar colado */}
            <div className="shrink-0 w-6 md:w-12" aria-hidden="true" />
          </div>
        </div>

        {/* Controles */}
        <div className="flex justify-end gap-3 mt-8">
          <NavButton
            direction="prev"
            onClick={() => goTo('prev')}
            disabled={currentIndex === 0}
          />
          <NavButton
            direction="next"
            onClick={() => goTo('next')}
            disabled={currentIndex === POSTS.length - 1}
          />
        </div>
      </div>
    </section>
  )
}
