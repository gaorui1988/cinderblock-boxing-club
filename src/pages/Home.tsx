import { ClassCards } from '../components/ClassCards.tsx'
import { Coaches } from '../components/Coaches.tsx'
import { Faq } from '../components/Faq.tsx'
import { Footer } from '../components/Footer.tsx'
import { Header } from '../components/Header.tsx'
import { Hero } from '../components/Hero.tsx'
import { Marquee } from '../components/Marquee.tsx'
import { Pricing } from '../components/Pricing.tsx'
import { Results } from '../components/Results.tsx'
import { Tape } from '../components/Tape.tsx'
import { TodayStrip } from '../components/TodayStrip.tsx'
import { TrialForm } from '../components/TrialForm.tsx'
import { Visit } from '../components/Visit.tsx'

export function Home() {
  return (
    <>
      <Header page="home" />
      <main>
        <Hero />
        <Tape />
        <Marquee />
        <ClassCards />
        <TodayStrip />
        <Pricing />
        <Coaches />
        <Results />
        <TrialForm />
        <Faq />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
