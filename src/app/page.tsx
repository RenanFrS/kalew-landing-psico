import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { QuoteSection } from '@/components/sections/QuoteSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { InstagramSection } from '@/components/sections/InstagramSection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProcessSection />
        <AboutSection />
        <QuoteSection />
        <HowItWorksSection />
        <InstagramSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
