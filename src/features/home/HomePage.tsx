import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CATEGORIES } from '../../mocks/categories.mock';
import { Button } from '../../components/ui/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 pb-32">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-primary">
        <img
          alt="Seasonal Editorial Collection"
          className="w-full h-full object-cover object-top"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhsDE-a4ChHKniOaaSNcJGPUiAdooTqSGn6fs5OmpH-pIThHIJWCHdhMMsW3NDq6O1MsCGlsibX93KZfnQmsKII5u1P6V1rGrn0cbJWU3bzLFDYaEkDTzK61-AtJhX0daktTP2p3VEEGsNsGI1jL0GTXj_Oo6g_Ic5V7Z8dPfTtmn8mbTQ60ezZUmB5bWeNAhKioDnbb2BOvxuHdMPIbymFzKG1Ll1gUbRL1p5QS03fyMngE3KuDmTpGXK9wbwSXQ9ieLQzbKN4vg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-6">
          <h2 className="font-headline text-5xl md:text-7xl text-on-primary-fixed mb-8 leading-tight max-w-2xl drop-shadow-sm">
            The Winter <br /> Anthology
          </h2>
          <Button
            variant="primary"
            onClick={() => navigate('/products')}
            className="px-10 py-5 text-sm tracking-[0.2em] font-label shadow-lg"
          >
            SHOP THE LOOK
          </Button>
        </div>
      </section>

      {/* Category Carousel */}
      <section className="mt-20 px-6 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-headline text-2xl">Collections</h3>
          <button
            onClick={() => navigate('/products')}
            className="font-label text-xs tracking-widest border-b border-primary pb-1 cursor-pointer hover:opacity-70 transition-opacity"
          >
            VIEW ALL
          </button>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-10 sm:gap-14 pb-4">
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/products?category=${cat.slug}`)}
              className="flex flex-col items-center flex-shrink-0 group text-center cursor-pointer focus:outline-none"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-outline-variant/30 p-1 mb-4 group-hover:border-primary transition-colors">
                <img
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  src={cat.imageUrl}
                />
              </div>
              <span className="font-label text-xs tracking-widest uppercase text-on-surface group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Editorial Grid */}
      <section className="mt-24 px-6 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16">
        <div className="col-span-12 mb-4">
          <h3 className="font-label text-[10px] tracking-[0.4em] text-outline uppercase">
            Issue No. 04 — Essentialism
          </h3>
        </div>

        {/* Feature 1: The Monolith Coat */}
        <div className="md:col-span-7 md:pr-8 group cursor-pointer" onClick={() => navigate('/products/the-archival-trench')}>
          <div className="bg-surface-container-lowest h-[400px] sm:h-[480px] w-full overflow-hidden">
            <img
              alt="Editorial 1"
              className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjT8Yi2sesfMugzSPwC2ObE0tGGPcdSRc-qH5uSTeIwN9n7fN-C9Kww-kbi0cAEK0Swc2vufkOyFs800ecT0kAQcD5_r_7W-076YQZ-Cp6fMb9So3fOpUkq_Sc1445QxNR6oCn6V6yf5ZOorFaQjDvXeCIiQxuzWFVYilA-ge7QA2b1-M7eARcfDTGnngddVpTQPuG-STk8NvmpQi57GNLAgNAnZkFrgX8UOzS9ljZOKlOFbI264Jf7yf-jXE2fTDNjN5Hpi4t98k"
            />
          </div>
          <div className="mt-6">
            <h4 className="font-headline text-2xl mb-2">The Monolith Coat</h4>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-md">
              Structural integrity meets raw silk. A study in architectural volume for the modern nomad.
            </p>
          </div>
        </div>

        {/* Feature 2: Editorial Detail */}
        <div className="md:col-span-5 md:col-start-8 md:pt-20 group cursor-pointer" onClick={() => navigate('/products/fluid-silk-slip-dress')}>
          <div className="bg-surface-container-lowest h-[300px] sm:h-[380px] w-full overflow-hidden">
            <img
              alt="Editorial 2"
              className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3qwjL2PuB2ZO_9Bh-m0J3PSRBVhmxsw-Xlhfzb57zurw9NZbsHXwrpaDtxPzij28CCUTaF7j2hIj-tScbOY9oSZRoKo47Go6clWeidbYUf7Tu5g3_lCd-mKioWqdZ2oUkiSVX1RZTxl9WKj-AJqmIWwLTCv9n5g_Ypzr10XitLOwAu-ugwJ_pZvrQqkamydJitPn5ZHbPRNOKCroUI9jsguKBrrnpZoebRRhjHpM7NY3MLTRDORDmEyZO-SG9I-YaHcsr-zga17c"
            />
          </div>
          <div className="mt-6">
            <span className="font-label text-[10px] tracking-widest text-primary border-b border-primary pb-1 cursor-pointer">
              DISCOVER FLUID SILK
            </span>
          </div>
        </div>
      </section>

      {/* Quote / Brand Statement */}
      <section className="my-32 px-12 text-center">
        <p className="font-headline italic text-2xl sm:text-3xl leading-relaxed text-on-surface/80 max-w-xl mx-auto">
          &ldquo;Fashion is the most powerful art we have. It is how we present our souls to the world.&rdquo;
        </p>
        <div className="h-16 w-px bg-outline-variant mx-auto mt-12 opacity-30"></div>
      </section>

      {/* Floating Filter Button / FAB to navigate directly to Collection */}
      <div className="fixed bottom-24 right-6 z-30">
        <button
          onClick={() => navigate('/products')}
          className="bg-primary text-on-primary w-14 h-14 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-200"
          aria-label="Filter collection"
          title="Browse Catalog & Filter"
        >
          <span className="material-symbols-outlined text-2xl" data-icon="filter_list">
            filter_list
          </span>
        </button>
      </div>
    </div>
  );
};
