import React, { useState, useEffect } from 'react';
import logoFinal from './assets/rsp.jpg'; // Adapte le chemin et le nom
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Maximize2, 
  BedDouble, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Phone, 
  Mail, 
  Menu, 
  X,
  ArrowRight,
  CheckCircle2,
  Home
} from 'lucide-react';
import { cn, MOCK_PROPERTIES, type Property } from './types';

// --- Components ---

const Header = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          {/* Placeholder for the logo provided in the prompt */}
          <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white overflow-hidden border-2 border-brand-accent/30">
             <img 
  src={logoFinal} // Utilise la variable importée ici
  alt="Réseau & Patrimoine" 
  className="w-full h-full object-cover"
/>
          </div>
          <div className={cn("flex flex-col", isScrolled ? "text-brand-primary" : "text-white")}>
            <span className="font-serif text-xl font-bold tracking-tight leading-none uppercase">Réseau & Patrimoine</span>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">Immobilier d'Exception</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Acheter', 'Vendre', 'Estimation', 'Agence', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => onNavigate(item.toLowerCase())}
              className={cn(
                "text-sm font-medium uppercase tracking-widest hover:text-brand-accent transition-colors",
                isScrolled ? "text-brand-primary" : "text-white"
              )}
            >
              {item}
            </button>
          ))}
        </nav>

        <button 
          className={cn("md:hidden", isScrolled ? "text-brand-primary" : "text-white")}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-brand-primary z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12">
              {['Acheter', 'Vendre', 'Estimation', 'Agence', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => {
                    onNavigate(item.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white text-3xl font-serif text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl text-white mb-6 leading-tight"
        >
          Le luxe, tout simplement <br /> <span className="italic font-light">d'Exception</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white/80 text-lg md:text-xl mb-12 font-light tracking-wide"
        >
          Découvrez une sélection confidentielle des plus beaux patrimoines immobiliers.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl md:rounded-full border border-white/20 shadow-2xl max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 w-full flex items-center px-6 py-3 gap-3 border-b md:border-b-0 md:border-r border-white/10">
              <Search size={20} className="text-brand-accent" />
              <input 
                type="text" 
                placeholder="Ville, quartier, code postal..." 
                className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50 w-full"
              />
            </div>
            <button className="w-full md:w-auto bg-brand-accent text-white px-10 py-4 rounded-full font-semibold uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-all">
              Rechercher
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PropertyCard: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.isExclusive && (
            <span className="bg-brand-primary text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">Exclusivité</span>
          )}
          {property.status === 'Vendu' && (
            <span className="bg-brand-accent text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">Vendu</span>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 text-brand-accent mb-2">
          <MapPin size={14} />
          <span className="text-[11px] uppercase tracking-widest font-semibold">{property.location}</span>
        </div>
        <h3 className="text-xl mb-4 line-clamp-1">{property.title}</h3>
        <div className="flex items-center gap-6 text-brand-primary/60 text-sm mb-6">
          <div className="flex items-center gap-2">
            <Maximize2 size={16} />
            <span>{property.surface} m²</span>
          </div>
          <div className="flex items-center gap-2">
            <BedDouble size={16} />
            <span>{property.bedrooms} Ch.</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-brand-primary/5">
          <span className="text-2xl font-bold">{property.price.toLocaleString('fr-FR')} €</span>
          <div className="w-10 h-10 rounded-full border border-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EstimationTunnel = ({ defaultType }: { defaultType?: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    category: defaultType || 'Estimation Vente'
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, category: defaultType || 'Estimation Vente' }));
  }, [defaultType]);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <section className="py-24 px-6 bg-brand-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full border-l border-white transform skew-x-12" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Vendez votre bien au <span className="italic">juste prix</span></h2>
          <p className="text-white/60 max-w-xl mx-auto">Estimation confidentielle et expertise patrimoniale sous 48h.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 flex flex-col gap-2">
                <div className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  step >= i ? "bg-brand-accent" : "bg-white/20"
                )} />
                <span className={cn(
                  "text-[10px] uppercase tracking-widest",
                  step === i ? "text-brand-accent" : "text-white/40"
                )}>Étape {i}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {['Appartement', 'Maison', 'Hôtel Particulier', 'Terrain'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => {
                      setFormData({...formData, type});
                      nextStep();
                    }}
                    className={cn(
                      "aspect-square rounded-2xl border flex flex-col items-center justify-center gap-4 transition-all",
                      formData.type === type ? "bg-brand-accent border-brand-accent" : "bg-white/5 border-white/10 hover:bg-white/10"
                    )}
                  >
                    <Home size={32} />
                    <span className="text-sm font-medium">{type}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase tracking-widest text-white/60">Localisation du bien</label>
                  <input 
                    type="text" 
                    placeholder="Adresse ou Ville..."
                    className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-brand-accent outline-none"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white transition-colors">Retour</button>
                  <button 
                    onClick={nextStep} 
                    disabled={!formData.location}
                    className="bg-brand-accent text-white px-12 py-4 rounded-full font-semibold uppercase tracking-widest disabled:opacity-50"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm uppercase tracking-widest text-white/60">Nom Complet</label>
                    <input 
                      type="text" 
                      className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-brand-accent outline-none"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm uppercase tracking-widest text-white/60">Téléphone</label>
                    <input 
                      type="tel" 
                      className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-brand-accent outline-none"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase tracking-widest text-white/60">Email</label>
                  <input 
                    type="email" 
                    className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-brand-accent outline-none"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="text-white/60 hover:text-white transition-colors">Retour</button>
                  <button 
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/estimation', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(formData)
                        });
                        if (response.ok) {
                          alert('Votre demande d\'estimation a été transmise avec succès. Un expert vous contactera sous 48h.');
                          setStep(1);
                          setFormData({ type: '', location: '', name: '', email: '', phone: '' });
                        }
                      } catch (error) {
                        console.error(error);
                        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
                      }
                    }} 
                    className="bg-brand-accent text-white px-12 py-4 rounded-full font-semibold uppercase tracking-widest"
                  >
                    Obtenir mon estimation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SellView = () => {
  const [formData, setFormData] = useState({
    type: 'Appartement',
    location: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    price: '',
    description: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vendre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Votre projet de vente a été transmis. Un consultant vous contactera pour une étude approfondie.');
        setFormData({
          type: 'Appartement',
          location: '',
          surface: '',
          rooms: '',
          bedrooms: '',
          price: '',
          description: '',
          name: '',
          email: '',
          phone: ''
        });
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'envoi du formulaire.');
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-warm-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Confiez-nous votre bien</span>
          <h1 className="text-5xl md:text-6xl mb-6">Vendre avec <span className="italic">Excellence</span></h1>
          <p className="text-brand-primary/60 text-lg max-w-2xl mx-auto">
            Bénéficiez de notre réseau international et d'une stratégie marketing sur mesure pour valoriser votre patrimoine.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-brand-primary/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h3 className="text-xl font-serif border-b border-brand-primary/10 pb-2">Caractéristiques du bien</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-primary/40">Type de bien</label>
                <select 
                  className="bg-warm-gray border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option>Appartement</option>
                  <option>Maison</option>
                  <option>Hôtel Particulier</option>
                  <option>Terrain</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-primary/40">Localisation</label>
                <input 
                  type="text" 
                  placeholder="Ville, Quartier..."
                  className="bg-warm-gray border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-primary/40">Surface (m²)</label>
                  <input 
                    type="number" 
                    className="bg-warm-gray border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent"
                    value={formData.surface}
                    onChange={(e) => setFormData({...formData, surface: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-primary/40">Pièces</label>
                  <input 
                    type="number" 
                    className="bg-warm-gray border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent"
                    value={formData.rooms}
                    onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-serif border-b border-brand-primary/10 pb-2">Vos Coordonnées</h3>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-primary/40">Nom Complet</label>
                <input 
                  type="text" 
                  className="bg-warm-gray border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-primary/40">Email</label>
                <input 
                  type="email" 
                  className="bg-warm-gray border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-primary/40">Téléphone</label>
                <input 
                  type="tel" 
                  className="bg-warm-gray border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-12">
            <label className="text-[10px] uppercase tracking-widest text-brand-primary/40">Informations complémentaires</label>
            <textarea 
              rows={4}
              placeholder="Décrivez brièvement votre bien..."
              className="bg-warm-gray border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-xl"
          >
            Soumettre mon bien
          </button>
        </form>
      </div>
    </div>
  );
};

const EstimationView = () => {
  const [estimationType, setEstimationType] = useState('Estimation Vente');
  
  const renderForm = () => {
    switch (estimationType) {
      case 'Estimation Locative':
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-serif text-brand-primary">Détails Locatifs</h4>
            <p className="text-sm text-brand-primary/60">Optimisez votre rendement locatif avec notre expertise.</p>
            <EstimationTunnel defaultType="Estimation Locative" />
          </div>
        );
      case 'Avis de Valeur Successoral':
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-serif text-brand-primary">Cadre Successoral</h4>
            <p className="text-sm text-brand-primary/60">Un document officiel pour vos démarches notariales.</p>
            <EstimationTunnel defaultType="Avis de Valeur Successoral" />
          </div>
        );
      case 'Estimation Vente':
      default:
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-serif text-brand-primary">Projet de Vente</h4>
            <p className="text-sm text-brand-primary/60">Estimez la valeur de marché de votre bien.</p>
            <EstimationTunnel defaultType="Estimation Vente" />
          </div>
        );
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-warm-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Expertise & Valeur</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-tight">Estimez votre <br /><span className="italic">Patrimoine</span></h1>
            <p className="text-brand-primary/60 text-lg mb-12 leading-relaxed">
              Nous réalisons des avis de valeur précis basés sur une analyse comparative du marché et les caractéristiques intrinsèques de votre bien.
            </p>
            
            <div className="flex flex-col gap-6">
              {[
                { title: 'Estimation Vente', desc: 'Pour une mise en vente au prix optimal.' },
                { title: 'Estimation Locative', desc: 'Pour maximiser votre rendement locatif.' },
                { title: 'Avis de Valeur Successoral', desc: 'Pour vos démarches administratives et notariales.' }
              ].map((item) => (
                <div 
                  key={item.title}
                  onClick={() => setEstimationType(item.title)}
                  className={cn(
                    "p-6 rounded-2xl border transition-all cursor-pointer",
                    estimationType === item.title ? "bg-brand-primary text-white border-brand-primary shadow-xl" : "bg-white border-brand-primary/5 hover:border-brand-accent"
                  )}
                >
                  <h4 className="font-serif text-xl mb-1">{item.title}</h4>
                  <p className={cn("text-sm", estimationType === item.title ? "text-white/60" : "text-brand-primary/40")}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-brand-primary/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={estimationType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderForm()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgencyView = () => {
  return (
    <div className="pt-32 pb-24 bg-warm-bg">
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Notre Histoire</span>
            <h1 className="text-5xl md:text-6xl mb-8">Un héritage de <br /><span className="italic">confiance</span></h1>
            <div className="prose prose-lg text-brand-primary/70">
              <p className="mb-6">
                Fondée en 1998 par Jean-Marc Réseau, l'agence Réseau & Patrimoine est née d'une vision simple : offrir un service d'exception aux propriétaires de biens de prestige.
              </p>
              <p>
                Depuis plus de 25 ans, nous avons bâti notre réputation sur la discrétion, l'expertise technique et une connaissance inégalée du marché immobilier de luxe parisien et international.
              </p>
            </div>
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
              alt="Bureau de l'agence" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-primary py-24 text-white mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif mb-16 text-center">Nos Dirigeants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: "Jean-Marc Réseau", role: "Fondateur & Directeur Associé", bio: "Expert en immobilier de luxe depuis 30 ans, Jean-Marc supervise la stratégie globale de l'agence." },
              { name: "Hélène de Patrimoine", role: "Directrice Associée", bio: "Spécialiste du droit immobilier et de la gestion de patrimoine, Hélène accompagne nos clients dans leurs montages complexes." }
            ].map((leader) => (
              <div key={leader.name} className="flex flex-col md:flex-row gap-8 items-center bg-white/5 p-8 rounded-3xl border border-white/10">
                <div className="w-32 h-32 rounded-full overflow-hidden flex-none bg-warm-gray">
                  <img src={`https://picsum.photos/seed/${leader.name}/200/200`} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-1">{leader.name}</h3>
                  <span className="text-brand-accent text-sm uppercase tracking-widest block mb-4">{leader.role}</span>
                  <p className="text-white/60 text-sm leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-serif mb-16 text-center">Nos Collaborateurs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Marc Dupont", role: "Consultant Senior" },
            { name: "Alice Vasseur", role: "Responsable Marketing" },
            { name: "Thomas Leroy", role: "Expert Estimation" },
            { name: "Julie Martin", role: "Chargée de Clientèle" }
          ].map((emp) => (
            <div key={emp.name} className="text-center group">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-warm-gray">
                <img 
                  src={`https://picsum.photos/seed/${emp.name}/300/300`} 
                  alt={emp.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <h4 className="font-bold text-lg">{emp.name}</h4>
              <span className="text-xs uppercase tracking-widest text-brand-primary/40">{emp.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ContactView = () => {
  return (
    <div className="pt-32 pb-24 bg-warm-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Nous Contacter</span>
          <h1 className="text-5xl md:text-7xl mb-8">À votre <span className="italic">écoute</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-primary/5 text-center">
            <div className="w-16 h-16 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-serif mb-4">Téléphone</h3>
            <p className="text-brand-primary/60 mb-2">Siège Social : +33 (0)1 45 67 89 10</p>
            <p className="text-brand-primary/60">Ligne Directe : +33 (0)1 45 67 89 11</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-primary/5 text-center">
            <div className="w-16 h-16 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6">
              <Mail size={28} />
            </div>
            <h3 className="text-xl font-serif mb-4">Email</h3>
            <p className="text-brand-primary/60 mb-2">contact@reseau-patrimoine.fr</p>
            <p className="text-brand-primary/60">presse@reseau-patrimoine.fr</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-primary/5 text-center">
            <div className="w-16 h-16 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-serif mb-4">Adresse</h3>
            <p className="text-brand-primary/60 mb-2">12 Avenue Montaigne</p>
            <p className="text-brand-primary/60">75008 Paris, France</p>
          </div>
        </div>

        <div className="bg-brand-primary rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl mb-8">Envoyez-nous un <span className="italic">message</span></h2>
              <p className="text-white/60 text-lg mb-8">
                Un projet immobilier ? Une question sur nos services ? Nos experts vous répondent dans les plus brefs délais.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-brand-accent">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-medium">Réponse sous 24h ouvrées</span>
                </div>
                <div className="flex items-center gap-4 text-brand-accent">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-medium">Confidentialité garantie</span>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Nom" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent" />
                <input type="email" placeholder="Email" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent" />
              </div>
              <input type="text" placeholder="Sujet" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 w-full outline-none focus:ring-2 focus:ring-brand-accent" />
              <textarea rows={5} placeholder="Votre message..." className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 w-full outline-none focus:ring-2 focus:ring-brand-accent resize-none"></textarea>
              <button className="bg-brand-accent text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-all">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyDetail = ({ property, onBack }: { property: Property, onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-warm-bg overflow-y-auto"
    >
      <div className="relative h-[70vh] w-full">
        <div className="absolute top-8 left-8 z-10">
          <button 
            onClick={onBack}
            className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl hover:bg-brand-primary hover:text-white transition-all"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {property.images.map((img, i) => (
            <div key={i} className="flex-none w-full h-full snap-center">
              <img 
                src={img} 
                alt={`${property.title} - ${i}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest">
          1 / {property.images.length} Photos
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-brand-accent mb-4">
            <MapPin size={18} />
            <span className="text-sm uppercase tracking-widest font-bold">{property.location}</span>
          </div>
          <h1 className="text-5xl mb-8">{property.title}</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-brand-primary/10 mb-12">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-brand-primary/40 mb-1">Surface</span>
              <span className="text-xl font-semibold">{property.surface} m²</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-brand-primary/40 mb-1">Pièces</span>
              <span className="text-xl font-semibold">{property.rooms}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-brand-primary/40 mb-1">Chambres</span>
              <span className="text-xl font-semibold">{property.bedrooms}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-brand-primary/40 mb-1">Type</span>
              <span className="text-xl font-semibold">{property.type}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-brand-primary/80">
            <h2 className="text-2xl font-serif mb-4">Description</h2>
            <p className="leading-relaxed">{property.description}</p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-serif mb-8">Prestations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.features.map((f) => (
                <div key={f} className="flex items-center gap-3 p-4 bg-warm-gray rounded-xl">
                  <CheckCircle2 size={20} className="text-brand-accent" />
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white p-8 rounded-3xl shadow-2xl border border-brand-primary/5">
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-widest text-brand-primary/40 block mb-2">Prix de vente</span>
              <span className="text-4xl font-bold">{property.price.toLocaleString('fr-FR')} €</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <button className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-xl">
                Prendre rendez-vous
              </button>
              <button className="w-full border border-brand-primary/10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-warm-gray transition-all">
                Demander le dossier
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-primary/5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-warm-gray overflow-hidden">
                <img src="https://picsum.photos/seed/agent/100/100" alt="Agent" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-sm font-bold block">Jean-Marc Réseau</span>
                <span className="text-xs text-brand-primary/40">Directeur Associé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Famille de V.", text: "Une expertise rare et un accompagnement sur mesure pour la vente de notre hôtel particulier.", stars: 5 },
    { name: "Marc A.", text: "Réseau & Patrimoine a su trouver le bien qui correspondait exactement à nos attentes confidentielles.", stars: 5 },
    { name: "Sophie L.", text: "Professionnalisme, discrétion et efficacité. Je recommande vivement.", stars: 5 }
  ];

  return (
    <section className="py-24 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Ils nous font <span className="italic">confiance</span></h2>
          <div className="flex justify-center gap-1 text-brand-accent">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all">
              <p className="text-lg italic mb-8 text-brand-primary/70">"{r.text}"</p>
              <span className="font-bold uppercase tracking-widest text-sm">— {r.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
  <img 
    src={logoFinal} 
    alt="Logo Réseau & Patrimoine" 
    className="w-10 h-10 rounded-full object-cover border border-white/20"
  />
  <span className="font-serif text-2xl font-bold tracking-tight uppercase">Réseau & Patrimoine</span>
</div>
            <p className="text-white/40 max-w-md leading-relaxed">
              L'excellence immobilière au service de votre patrimoine. Nous accompagnons nos clients dans leurs projets les plus ambitieux avec discrétion et expertise.
            </p>
          </div>
          
          <div>
            <h4 className="text-brand-accent uppercase tracking-[0.2em] text-xs font-bold mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/60">
              <li className="hover:text-white cursor-pointer transition-colors">Nos Biens</li>
              <li className="hover:text-white cursor-pointer transition-colors">Estimation</li>
              <li className="hover:text-white cursor-pointer transition-colors">L'Agence</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-accent uppercase tracking-[0.2em] text-xs font-bold mb-8">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/60">
              <li className="flex items-center gap-3"><MapPin size={16} /> 12 Avenue Montaigne, 75008 Paris</li>
              <li className="flex items-center gap-3"><Phone size={16} /> +33 (0)1 45 67 89 10</li>
              <li className="flex items-center gap-3"><Mail size={16} /> contact@reseau-patrimoine.fr</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-widest text-white/20">
          <span>© 2026 Réseau & Patrimoine. Tous droits réservés.</span>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer">Mentions Légales</span>
            <span className="hover:text-white cursor-pointer">Politique de Confidentialité</span>
            <span className="hover:text-white cursor-pointer">Plan du Site</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [view, setView] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case 'vendre':
        return <SellView />;
      case 'estimation':
        return <EstimationView />;
      case 'agence':
        return <AgencyView />;
      case 'contact':
        return <ContactView />;
      case 'acheter':
        return (
          <section className="py-32 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Notre Catalogue</span>
                <h2 className="text-4xl md:text-5xl">Tous nos biens de <span className="italic">Prestige</span></h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {MOCK_PROPERTIES.map((p) => (
                <PropertyCard 
                  key={p.id} 
                  property={p} 
                  onClick={() => setSelectedProperty(p)} 
                />
              ))}
            </div>
          </section>
        );
      case 'home':
      default:
        return (
          <>
            <Hero />
            
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                  <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Notre Sélection</span>
                  <h2 className="text-4xl md:text-5xl">Propriétés de <span className="italic">Prestige</span></h2>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setView('acheter')}
                    className="px-8 py-3 rounded-full border border-brand-primary/10 text-sm font-semibold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all"
                  >
                    Tous les biens
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {MOCK_PROPERTIES.map((p) => (
                  <PropertyCard 
                    key={p.id} 
                    property={p} 
                    onClick={() => setSelectedProperty(p)} 
                  />
                ))}
              </div>
            </section>

            <EstimationTunnel defaultType="Estimation Vente" />
            
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={setView} />
      
      <main>
        {renderContent()}
      </main>

      <Footer />

      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetail 
            property={selectedProperty} 
            onBack={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
