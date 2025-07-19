
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Feature from '@/components/Feature';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Demo from '@/components/Demo';
import Faq from '@/components/Faq';



export default function Home() {
  return (
    <main className="bg-background relative selection:bg-purple-800 ">
      <ScrollToTopButton />
      {/* Main background section */}
      <div className="bg-[url('/assets/images/background.png')] bg-cover bg-center bg-no-repeat">
        <Header />
        <Hero />
        <Feature />
      </div>

      {/* FAQ section with different background */}
      <div
        className="bg-[url('/assets/images/element.png')] bg-cover md:bg-contain bg-center bg-no-repeat relative">
        <Demo />
        <Faq />
        <Footer />
      </div>
    </main>
  );
}
