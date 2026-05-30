import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, 
  Lock, 
  Phone, 
  MapPin, 
  Clock, 
  X, 
  ArrowRight, 
  Star, 
  Check, 
  TrendingUp, 
  ChevronRight,
  Shield,
  FileText,
  Menu,
  Video
} from 'lucide-react';

export default function App() {
  // Navigation states
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ROI Calculator states
  const [capital, setCapital] = useState(120000);
  const [locationType, setLocationType] = useState('avenida');

  // Modal Wizard states
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFreno, setIsFreno] = useState(false);

  // Form Fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [formCapital, setFormCapital] = useState('');
  const [region, setRegion] = useState('');
  const [experience, setExperience] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [callSlot, setCallSlot] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [experienceDetail, setExperienceDetail] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  // Refs for interactive elements
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const timelineProgressRef = useRef(null);

  // Scroll reveal references
  useEffect(() => {
    const handleScroll = () => {
      // Header scrolled state
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }

      // Active section tracking
      const sections = ['inicio', 'adn', 'ventaja', 'simulador', 'proceso', 'metricas', 'acceso'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Timeline scroll progress animation
      const timeline = document.querySelector('.process-timeline');
      const progressFill = timelineProgressRef.current;
      const steps = document.querySelectorAll('.timeline-step');
      
      if (timeline && progressFill) {
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const topOffset = timelineRect.top - (windowHeight / 2);
        const timelineHeight = timelineRect.height;
        
        let progressPercentage = 0;
        if (topOffset < 0) {
          progressPercentage = Math.min(100, Math.max(0, (-topOffset / timelineHeight) * 100));
        }
        progressFill.style.height = `${progressPercentage}%`;

        steps.forEach(step => {
          const stepRect = step.getBoundingClientRect();
          if (stepRect.top < (windowHeight * 0.65)) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Cursor mousemove handler
  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    document.body.classList.add('has-custom-cursor');

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateCircle = () => {
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      circle.style.left = `${circleX}px`;
      circle.style.top = `${circleY}px`;
      requestAnimationFrame(updateCircle);
    };
    updateCircle();

    // Hover interactive triggers
    const updateInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, .card-3d, .location-btn, [role="button"]');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovered'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovered'));
      });
    };
    
    // Run after DOM settles
    const timeoutId = setTimeout(updateInteractiveListeners, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [showModal, currentStep, isSuccess]);

  // 3D Tilt interaction logic
  useEffect(() => {
    const cards = document.querySelectorAll('.card-3d');
    
    const handleMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      let clientX, clientY;
      
      if (e.type === 'touchmove') {
        if (!e.touches || e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // boundaries check for touch
      if (e.type === 'touchmove') {
        if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
          handleLeave(e);
          return;
        }
      }
      
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${pctX}%`);
      card.style.setProperty('--mouse-y', `${pctY}%`);
      
      const maxRotate = 15; // Deeper and more immersive tilt
      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;
      
      const rotateX = (-normY * maxRotate).toFixed(2);
      const rotateY = (normX * maxRotate).toFixed(2);
      
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    };

    const handleLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s';
    };

    const handleEnter = (e) => {
      const card = e.currentTarget;
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s';
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
      card.addEventListener('mouseenter', handleEnter);
      
      // Mobile touch listeners with passive mode for scroll performance
      card.addEventListener('touchmove', handleMove, { passive: true });
      card.addEventListener('touchstart', handleEnter, { passive: true });
      card.addEventListener('touchend', handleLeave, { passive: true });
      card.addEventListener('touchcancel', handleLeave, { passive: true });
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
        card.removeEventListener('mouseenter', handleEnter);
        
        card.removeEventListener('touchmove', handleMove);
        card.removeEventListener('touchstart', handleEnter);
        card.removeEventListener('touchend', handleLeave);
        card.removeEventListener('touchcancel', handleLeave);
      });
    };
  }, [showModal]);

  // Scroll reveal intersection observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ROI Projections math
  const projections = useMemo(() => {
    const multiplier = locationType === 'avenida' ? 3.12 : 2.58;
    const revenue = Math.round(capital * multiplier);

    const scaleFactor = (capital - 60000) / (250000 - 60000);
    const baseMargin = 18.5 + (scaleFactor * 4.3);
    const margin = locationType === 'avenida' ? baseMargin - 1.2 : baseMargin;

    const ebitda = Math.round((revenue * (margin / 100)) / 12);
    const payback = ebitda > 0 ? Math.round(capital / ebitda) : 0;

    return {
      revenue,
      margin: margin.toFixed(1),
      ebitda,
      payback
    };
  }, [capital, locationType]);

  // Modal handlers
  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    setCurrentStep(1);
    setIsSuccess(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = '';
    // reset form fields
    setName('');
    setEmail('');
    setWhatsapp('');
    setFormCapital('');
    setRegion('');
    setExperience('');
    setTimeframe('');
    setCallSlot('');
    setLinkedin('');
    setNdaAccepted(false);
    setExperienceDetail('');
    setUploadedFile(null);
    setIsFreno(false);
  };

  const nextStep = (step) => {
    if (step === 1) {
      if (name && email && whatsapp) {
        setCurrentStep(2);
      } else {
        alert('Por favor complete los campos requeridos.');
      }
    } else if (step === 2) {
      if (formCapital) {
        if (formCapital === 'less-40k' || formCapital === '40k-60k') {
          setIsFreno(true);
        } else {
          setCurrentStep(3);
        }
      } else {
        alert('Por favor complete los campos requeridos.');
      }
    } else if (step === 3) {
      if (linkedin && experience && experienceDetail) {
        setCurrentStep(4);
      } else {
        alert('Por favor ingrese su enlace de LinkedIn, complete los detalles de su experiencia y seleccione la respuesta de experiencia.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ndaAccepted) {
      alert('Debe aceptar los términos del Acuerdo de Confidencialidad.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Custom Cursor Followers */}
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-circle" ref={circleRef}></div>

      {/* Grain texture overlay */}
      <div className="grain-overlay"></div>

      {/* Header Sticky Navigation */}
      <header className={headerScrolled ? 'scrolled' : ''}>
        <div className="container header-content">
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            CRIOLLO <span className="logo-accent">| FRANCHISE SYSTEM</span>
          </a>
          <nav className="nav-links desktop-only">
            <a href="#adn" onClick={(e) => { e.preventDefault(); scrollToSection('adn'); }} className={`nav-link ${activeSection === 'adn' ? 'active' : ''}`}>El ADN</a>
            <a href="#ventaja" onClick={(e) => { e.preventDefault(); scrollToSection('ventaja'); }} className={`nav-link ${activeSection === 'ventaja' ? 'active' : ''}`}>Ventaja Tech</a>
            <a href="#simulador" onClick={(e) => { e.preventDefault(); scrollToSection('simulador'); }} className={`nav-link ${activeSection === 'simulador' ? 'active' : ''}`}>Simulador ROI</a>
            <a href="#proceso" onClick={(e) => { e.preventDefault(); scrollToSection('proceso'); }} className={`nav-link ${activeSection === 'proceso' ? 'active' : ''}`}>Cronograma</a>
            <a href="#metricas" onClick={(e) => { e.preventDefault(); scrollToSection('metricas'); }} className={`nav-link ${activeSection === 'metricas' ? 'active' : ''}`}>Métricas</a>
            <a href="#acceso" onClick={openModal} className="nav-link btn-secondary" style={{ padding: '10px 22px', fontSize: '0.75rem' }}>DOSSIER PRIVADO</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <a href="#adn" onClick={(e) => { e.preventDefault(); scrollToSection('adn'); setMobileMenuOpen(false); }} className={`nav-link ${activeSection === 'adn' ? 'active' : ''}`}>El ADN</a>
            <a href="#ventaja" onClick={(e) => { e.preventDefault(); scrollToSection('ventaja'); setMobileMenuOpen(false); }} className={`nav-link ${activeSection === 'ventaja' ? 'active' : ''}`}>Ventaja Tech</a>
            <a href="#simulador" onClick={(e) => { e.preventDefault(); scrollToSection('simulador'); setMobileMenuOpen(false); }} className={`nav-link ${activeSection === 'simulador' ? 'active' : ''}`}>Simulador ROI</a>
            <a href="#proceso" onClick={(e) => { e.preventDefault(); scrollToSection('proceso'); setMobileMenuOpen(false); }} className={`nav-link ${activeSection === 'proceso' ? 'active' : ''}`}>Cronograma</a>
            <a href="#metricas" onClick={(e) => { e.preventDefault(); scrollToSection('metricas'); setMobileMenuOpen(false); }} className={`nav-link ${activeSection === 'metricas' ? 'active' : ''}`}>Métricas</a>
            <a href="#acceso" onClick={(e) => { openModal(e); setMobileMenuOpen(false); }} className="nav-link btn-secondary" style={{ padding: '12px 22px', fontSize: '0.8rem', justifyContent: 'center' }}>DOSSIER PRIVADO</a>
          </div>
        )}
      </header>

      {/* Decorative Embers & Grids */}
      <div className="grid-overlay"></div>
      <div className="grill-grid"></div>
      
      <div className="ember ember-1"></div>
      <div className="ember ember-2"></div>
      <div className="ember ember-3"></div>

      {/* SECTION 1: HERO (With local video) */}
      <section className="hero-section" id="inicio">
        <div className="hero-bg-container">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="hero-bg-video"
          >
            <source src="/assets/video.mp4" type="video/mp4" />
          </video>
          <div className="hero-bg-mask"></div>
        </div>
        <div className="container">
          <div className="hero-content reveal-on-scroll">
            <div className="hero-badge">
              <Shield size={12} style={{ marginRight: '6px' }} />
              ACTIVO FINANCIERO RESPALDADO POR IA
            </div>
            <h1 className="hero-title">
              <span>Criollo Paladar Argento</span>
              El Bodegón Argentino, Diseñado para Escalar.
            </h1>
            <p className="hero-desc">
              Un modelo de negocio gastronómico validado, con la eficiencia operativa de una startup tecnológica. Únicamente para inversores con visión de expansión y alta rentabilidad.
            </p>
            <div className="hero-ctas">
              <a href="#" onClick={openModal} className="btn-primary">EXPLORAR EL MODELO</a>
              <a href="#simulador" onClick={(e) => { e.preventDefault(); scrollToSection('simulador'); }} className="btn-secondary">CALCULAR RETORNO</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ADN CRIOLLO (Dynamic variations with background video) */}
      <section className="section" id="adn">
        <div className="section-bg-container">
          <video autoPlay loop muted playsInline className="section-bg-video">
            <source src="/assets/adn_video.mp4" type="video/mp4" />
          </video>
          <div className="section-bg-mask"></div>
        </div>
        <div className="ambient-glow" style={{ top: '20%', left: '-200px', backgroundColor: 'rgba(197, 160, 89, 0.03)' }}></div>
        <div className="container">
          <div style={{ textAlign: 'center' }} className="reveal-on-scroll">
            <span className="section-tag">Fundamentos</span>
            <h2 className="section-title">El Peso de Nuestra Tradición</h2>
            <p className="section-desc">Combinamos la mística indiscutible del bodegón posta con procesos de manufactura automatizados y distribución de insumos centralizada.</p>
          </div>

          <div className="adn-grid">
            {/* Card A (theme-brick) */}
            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="card-3d adn-card theme-brick">
                <span className="card-hover-tag">Mística</span>
                <div className="card-3d-inner">
                  <div className="card-num">01</div>
                  <div>
                    <h3 className="card-title">BODEGÓN POSTA</h3>
                    <p className="card-desc">Sabor auténtico. Porciones reales. Cero pretensiones. La cocina que los argentinos eligen todos los días, elevada al estándar máximo de calidad corporativa.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card B (theme-gold - middle offset) */}
            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="card-3d adn-card theme-gold">
                <span className="card-hover-tag">Ubicación</span>
                <div className="card-3d-inner">
                  <div className="card-num">02</div>
                  <div>
                    <h3 className="card-title">CORAZÓN DEL BARRIO</h3>
                    <p className="card-desc">Ubicaciones urbanas estratégicas con alto tráfico peatonal y vehicular. Traccionamos clientes orgánicamente desde el primer día de apertura mediante posicionamiento geográfico.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card C (theme-bronze) */}
            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="card-3d adn-card theme-bronze">
                <span className="card-hover-tag">Sistema</span>
                <div className="card-3d-inner">
                  <div className="card-num">03</div>
                  <div>
                    <h3 className="card-title">SISTEMA OPERATIVO</h3>
                    <p className="card-desc">Tecnología invisible y propietaria que simplifica la administración diaria, optimiza el stock, elimina el desperdicio y garantiza la misma experiencia en cada mesa.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LA VENTAJA TECH-ENABLED (No BOT terminology, dynamic variations with background video) */}
      <section className="section tech-section" id="ventaja">
        <div className="section-bg-container">
          <video autoPlay loop muted playsInline className="section-bg-video">
            <source src="/assets/tech_video.mp4" type="video/mp4" />
          </video>
          <div className="section-bg-mask"></div>
        </div>
        <div className="ambient-glow" style={{ bottom: 0, right: '-250px', backgroundColor: 'rgba(166, 90, 42, 0.03)' }}></div>
        <div className="container">
          <div style={{ textAlign: 'center' }} className="reveal-on-scroll">
            <span className="section-tag">Infraestructura Inteligente</span>
            <h2 className="section-title">Menos Costos Fijos, Más Margen</h2>
            <p className="section-desc">Desplazamos el peso administrativo tradicional hacia agentes automatizados y software propietario, maximizando el EBITDA de la sucursal.</p>
          </div>

          <div className="tech-grid">
            {/* Card 1 (theme-brick) */}
            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="card-3d tech-card theme-brick">
                <span className="card-hover-tag">Autonomía</span>
                <div className="card-3d-inner">
                  <div className="tech-icon-container">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title">RESERVAS AUTOMÁTICAS</h3>
                    <p className="card-desc">Gestión y confirmación de mesas 24/7 sin intermediarios. Reducción total de fricción en la experiencia del cliente y cero desvíos de personal en el salón.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 (theme-gold - middle offset - SOP Agent) */}
            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="card-3d tech-card theme-gold">
                <span className="card-hover-tag">Onboarding</span>
                <div className="card-3d-inner">
                  <div className="tech-icon-container">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title">Agente de SOP (Manual Vivo)</h3>
                    <p className="card-desc">Inducción y capacitación digital interactiva para el equipo. Respuestas inmediatas sobre recetas, procesos y estándares para un onboarding de personal de salón y cocina ultra veloz.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 (theme-bronze) */}
            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="card-3d tech-card theme-bronze">
                <span className="card-hover-tag">Rentabilidad</span>
                <div className="card-3d-inner">
                  <div className="tech-icon-container">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title">INFRAESTRUCTURA ESCALABLE</h3>
                    <p className="card-desc">Supervisión integrada de compras, costos en tiempo real y márgenes brutos. Una suite de analítica financiera diseñada para inversores corporativos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3.5: ROI CALCULATOR */}
      <section className="section roi-section" id="simulador">
        <div className="container">
          <div style={{ textAlign: 'center' }} className="reveal-on-scroll">
            <span className="section-tag" style={{ color: 'var(--color-gold)' }}>Simulador Financiero</span>
            <h2 className="section-title">Proyectá tu Retorno de Inversión</h2>
            <p className="section-desc">Deslizá el selector de capital inicial para proyectar los ingresos anuales, márgenes operativos estimados y el tiempo de recuperación de tu activo.</p>
          </div>

          <div className="roi-simulator-wrapper reveal-on-scroll">
            <div className="roi-control-panel">
              <div className="roi-slider-group">
                <div className="slider-label-row">
                  <span className="slider-title">CAPITAL A INVERTIR (USD)</span>
                  <span className="slider-value">USD {capital.toLocaleString('en-US')}</span>
                </div>
                <input 
                  type="range" 
                  min="60000" 
                  max="250000" 
                  step="10000" 
                  value={capital}
                  onChange={(e) => setCapital(parseInt(e.target.value))}
                  className="roi-slider" 
                />
                <div className="slider-limits">
                  <span>USD 60K (Express)</span>
                  <span>USD 250K (Premium)</span>
                </div>
              </div>

              <div className="roi-select-group">
                <span className="slider-title" style={{ display: 'block', marginBottom: '12px' }}>TIPO DE UBICACIÓN COMERCIAL</span>
                <div className="location-selectors">
                  <button 
                    className={`location-btn ${locationType === 'avenida' ? 'active' : ''}`}
                    onClick={() => setLocationType('avenida')}
                  >
                    Avenida Principal
                  </button>
                  <button 
                    className={`location-btn ${locationType === 'barrio' ? 'active' : ''}`}
                    onClick={() => setLocationType('barrio')}
                  >
                    Residencial Alto Tráfico
                  </button>
                </div>
              </div>
            </div>

            <div className="roi-results-panel">
              <div className="roi-results-grid">
                <div className="roi-result-card">
                  <span className="roi-result-label">RETORNO ESTIMADO (PAYBACK)</span>
                  <div className="roi-result-value">{projections.payback} meses</div>
                  <p className="roi-result-desc">Tiempo de recuperación del capital inicial invertido.</p>
                </div>

                <div className="roi-result-card">
                  <span className="roi-result-label">EBITDA MENSUAL PROMEDIO</span>
                  <div className="roi-result-value">USD {projections.ebitda.toLocaleString('en-US')}</div>
                  <p className="roi-result-desc">Flujo de caja neto operativo mensual estimado.</p>
                </div>

                <div className="roi-result-card">
                  <span className="roi-result-label">MARGEN NETO PROYECTADO</span>
                  <div className="roi-result-value">{projections.margin}%</div>
                  <p className="roi-result-desc">Rentabilidad operativa final sobre la facturación bruta.</p>
                </div>

                <div className="roi-result-card text-accent-card">
                  <span className="roi-result-label" style={{ color: 'var(--color-gold)' }}>FACTURACIÓN ANUAL ESTIMADA</span>
                  <div className="roi-result-value gold-text">USD {projections.revenue.toLocaleString('en-US')}</div>
                  <p className="roi-result-desc">Volumen estimado de ventas anuales consolidadas en el local.</p>
                </div>
              </div>
              
              <div className="roi-disclaimer">
                <p>* Proyecciones simuladas en base al desempeño histórico de sucursales modelo en 2025. El volumen exacto está sujeto al tamaño final del local y variables microeconómicas locales.</p>
                <button onClick={openModal} className="btn-primary" style={{ marginTop: '15px', width: '100%', justifyContent: 'center', backgroundColor: 'var(--color-gold)', borderColor: 'rgba(255,255,255,0.15)' }}>
                  CUALIFICAR MI LOCALIZACIÓN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SOCIAL PROOF */}
      <section className="section" id="metricas">
        <div className="container">
          <div style={{ textAlign: 'center' }} className="reveal-on-scroll">
            <span className="section-tag">Viabilidad Financiera</span>
            <h2 className="section-title">Un Modelo Validado por el Mercado</h2>
            <p className="section-desc">Métricas consolidadas que respaldan la viabilidad comercial de Criollo en múltiples territorios.</p>
          </div>

          <div className="metrics-grid">
            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="card-3d metric-card">
                <div className="card-3d-inner">
                  <div className="metric-val">+34k</div>
                  <div className="metric-label">Seguidores</div>
                  <p className="metric-desc">Audiencia orgánica altamente fidelizada en redes que tracciona demanda directa nativa.</p>
                </div>
              </div>
            </div>

            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="card-3d metric-card">
                <div className="card-3d-inner">
                  <div className="metric-val">Llave</div>
                  <div className="metric-label">En Mano</div>
                  <p className="metric-desc">Obra civil, equipamiento pesado, software configurado y cadena de suministro lista.</p>
                </div>
              </div>
            </div>

            <div className="perspective-container reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="card-3d metric-card">
                <div className="card-3d-inner">
                  <div className="metric-val">Limitadas</div>
                  <div className="metric-label">Disponibilidad</div>
                  <p className="metric-desc">Aperturas controladas por provincia para asegurar el máximo soporte del equipo técnico.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4.5: PIPELINE PROCESS */}
      <section className="section process-section" id="proceso">
        <div className="ambient-glow" style={{ top: '10%', right: '10%', backgroundColor: 'rgba(197, 160, 89, 0.025)' }}></div>
        <div className="container">
          <div style={{ textAlign: 'center' }} className="reveal-on-scroll">
            <span className="section-tag" style={{ color: 'var(--color-gold)' }}>Expansión Controlada</span>
            <h2 className="section-title">El Camino Hacia tu Apertura</h2>
            <p className="section-desc">Estructura paso a paso desde el análisis inicial de tu perfil inversor hasta el encendido de los fuegos en tu sucursal.</p>
          </div>

          <div className="process-timeline reveal-on-scroll">
            <div className="timeline-progress-bar">
              <div className="timeline-progress-fill" ref={timelineProgressRef}></div>
            </div>

            <div className="timeline-step active" data-step="1">
              <div className="timeline-node">1</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Postulación & Cualificación</h3>
                <p className="timeline-desc">Filtro de capacidad financiera y experiencia comercial. Firma del Acuerdo de Confidencialidad (NDA) para entrega de balances.</p>
              </div>
            </div>

            <div className="timeline-step" data-step="2">
              <div className="timeline-node">2</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Reserva de Territorio & Local</h3>
                <p className="timeline-desc">Estudio de geomarketing mediante analítica digital de flujo peatonal para validar el local antes de firmar el contrato de alquiler.</p>
              </div>
            </div>

            <div className="timeline-step" data-step="3">
              <div className="timeline-node">3</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Obra Civil Llave en Mano</h3>
                <p className="timeline-desc">Estandarización arquitectónica homologada. Montaje del layout de cocina, salón y mobiliario de bodegón posta.</p>
              </div>
            </div>

            <div className="timeline-step" data-step="4">
              <div className="timeline-node">4</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Configuración Tech & Training</h3>
                <p className="timeline-desc">Instalación del sistema de reservas de inteligencia artificial, terminales de control de stock y capacitación del staff con el Agente de SOP.</p>
              </div>
            </div>

            <div className="timeline-step" data-step="5">
              <div className="timeline-node">5</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Lanzamiento & Apertura</h3>
                <p className="timeline-desc">Inauguración oficial impulsada con campañas geolocalizadas a nuestra base de seguidores de +34,000 entusiastas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ACCESO RESTRINGIDO */}
      <section className="section gatekeeper-section" id="acceso">
        <div className="container">
          <div className="gatekeeper-card reveal-on-scroll" style={{ borderColor: 'rgba(197, 160, 89, 0.25)' }}>
            <div className="lock-badge" style={{ color: 'var(--color-gold)', backgroundColor: 'rgba(197, 160, 89, 0.08)', borderColor: 'rgba(197, 160, 89, 0.35)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 className="gatekeeper-title">Accedé al Dossier Confidencial</h2>
            <p className="gatekeeper-desc">
              Para proteger la información estratégica de la firma, el acceso a las carpetas técnicas y proyecciones completas de flujo de caja está restringido. Por favor, postulá tu perfil financiero para obtener acceso de forma exclusiva.
            </p>
            <button onClick={openModal} className="btn-primary" style={{ backgroundColor: 'var(--color-gold)', borderColor: 'rgba(255,255,255,0.15)' }}>
              POSTULAR MI INVERSIÓN
            </button>
          </div>
        </div>
      </section>

      {/* Multi-Step Qualification Modal */}
      {showModal && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) closeModal(); }}>
          <div className="modal-box">
            <button className="modal-close" onClick={closeModal} aria-label="Cerrar modal">
              <X size={24} />
            </button>

            {!isSuccess && !isFreno && (
              <div className="modal-progress-container">
                <div className={`modal-progress-step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}><span>1</span>Datos</div>
                <div className={`modal-progress-step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}><span>2</span>Capital</div>
                <div className={`modal-progress-step ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}><span>3</span>Perfil</div>
                <div className={`modal-progress-step ${currentStep === 4 ? 'active' : ''}`}><span>4</span>NDA</div>
              </div>
            )}

            {!isSuccess && !isFreno && (
              <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {!isSuccess && currentStep === 1 && (
                <div className="modal-step-section active">
                  <div className="modal-header">
                    <h3 className="modal-title">Solicitud de Admisión a Franquicia</h3>
                    <p className="modal-subtitle">Ingrese sus datos de contacto para iniciar el proceso formal de evaluación. Este es el primer paso para integrarse al ecosistema gastronómico más escalable del sector.</p>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nombre y Apellido / Razón Social</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="form-control" 
                      placeholder="Nombre y Apellido completo / Razón Social" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Correo Electrónico</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="form-control" 
                      placeholder="Correo electrónico corporativo o personal" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Número de WhatsApp</label>
                    <input 
                      type="tel" 
                      value={whatsapp} 
                      onChange={(e) => setWhatsapp(e.target.value)} 
                      className="form-control" 
                      placeholder="Número de WhatsApp (con código de área)" 
                      required 
                    />
                  </div>
                  <button type="button" onClick={() => nextStep(1)} className="btn-primary form-submit-btn">CONTINUAR EVALUACIÓN →</button>
                </div>
              )}

              {/* Step 2 */}
              {!isSuccess && currentStep === 2 && (
                <div className="modal-step-section active">
                  <div className="modal-header">
                    <h3 className="modal-title">Estructura de Capital</h3>
                    <p className="modal-subtitle">Indique el rango de liquidez disponible que tiene proyectado para este negocio. Este dato es excluyente para avanzar a la etapa de métricas financieras.</p>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Capital Disponible</label>
                    <select 
                      value={formCapital} 
                      onChange={(e) => setFormCapital(e.target.value)} 
                      className="form-control form-select" 
                      required
                    >
                      <option value="" disabled>Seleccione su capital disponible...</option>
                      <option value="less-40k">Menos de USD 40k</option>
                      <option value="40k-60k">USD 40k - USD 60k</option>
                      <option value="60k-100k">USD 60k - USD 100k (Express)</option>
                      <option value="100k-200k">USD 100k - USD 200k (Avenida)</option>
                      <option value="200k+">Más de USD 200k (Sucursal Premium / Multiunit)</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <button type="button" onClick={() => setCurrentStep(1)} className="btn-secondary" style={{ width: '100%' }}>VOLVER</button>
                    <button type="button" onClick={() => nextStep(2)} className="btn-primary" style={{ width: '100%', backgroundColor: 'var(--color-gold)' }}>VALIDAR CAPACIDAD</button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {!isSuccess && currentStep === 3 && (
                <div className="modal-step-section active">
                  <div className="modal-header">
                    <h3 className="modal-title">Perfil Operativo e Historial</h3>
                    <p className="modal-subtitle">Buscamos socios estratégicos, no solo capital. El directorio requiere conocer su trayectoria antes de liberar información sensible de la marca.</p>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Enlace a su perfil de LinkedIn</label>
                    <input 
                      type="url" 
                      value={linkedin} 
                      onChange={(e) => setLinkedin(e.target.value)} 
                      className="form-control" 
                      placeholder="https://www.linkedin.com/in/su-perfil" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>
                      ¿Posee experiencia previa en dirección de negocios o el sector gastronómico?
                    </label>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: experience === 'yes' ? 'var(--color-gold)' : 'var(--text-muted)',
                        border: '1px solid',
                        borderColor: experience === 'yes' ? 'var(--color-gold)' : 'var(--border-color)',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        backgroundColor: experience === 'yes' ? 'rgba(197, 160, 89, 0.05)' : 'transparent',
                        transition: 'all 0.3s ease',
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                        <input 
                          type="radio" 
                          name="experience" 
                          value="yes"
                          checked={experience === 'yes'}
                          onChange={() => setExperience('yes')}
                          style={{ display: 'none' }}
                        />
                        Sí
                      </label>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: experience === 'no' ? 'var(--color-gold)' : 'var(--text-muted)',
                        border: '1px solid',
                        borderColor: experience === 'no' ? 'var(--color-gold)' : 'var(--border-color)',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        backgroundColor: experience === 'no' ? 'rgba(197, 160, 89, 0.05)' : 'transparent',
                        transition: 'all 0.3s ease',
                        flex: 1,
                        justifyContent: 'center'
                      }}>
                        <input 
                          type="radio" 
                          name="experience" 
                          value="no"
                          checked={experience === 'no'}
                          onChange={() => setExperience('no')}
                          style={{ display: 'none' }}
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Detalle su trayectoria y experiencia comercial o gastronómica</label>
                    <textarea 
                      value={experienceDetail} 
                      onChange={(e) => setExperienceDetail(e.target.value)} 
                      className="form-control" 
                      placeholder="Describa brevemente su historial en gestión de negocios, dirección de equipos o rubro comercial..." 
                      style={{ minHeight: '80px', resize: 'vertical' }}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Adjuntar CV, Portfolio o Dossier (PDF - Opcional)</label>
                    <div 
                      style={{
                        border: '1px dashed rgba(197, 160, 89, 0.3)',
                        borderRadius: '8px',
                        padding: '16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255, 255, 255, 0.01)',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.3)'}
                    >
                      <input 
                        type="file" 
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setUploadedFile(e.target.files[0]);
                          }
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <FileText size={20} style={{ color: 'var(--color-gold)' }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          {uploadedFile ? uploadedFile.name : 'Haga clic para subir su archivo PDF'}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : 'PDF de hasta 10MB'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Describa brevemente la zona geográfica de su interés (Opcional)</label>
                    <input 
                      type="text" 
                      value={region} 
                      onChange={(e) => setRegion(e.target.value)} 
                      className="form-control" 
                      placeholder="Ej. Córdoba Capital, Zona Norte" 
                    />
                  </div>
                  
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <button type="button" onClick={() => setCurrentStep(2)} className="btn-secondary" style={{ width: '100%' }}>VOLVER</button>
                    <button type="button" onClick={() => nextStep(3)} className="btn-primary" style={{ width: '100%', backgroundColor: 'var(--color-gold)' }}>VERIFICAR IDENTIDAD</button>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {!isSuccess && currentStep === 4 && (
                <div className="modal-step-section active">
                  <div className="modal-header">
                    <h3 className="modal-title">Acuerdo de Confidencialidad (NDA)</h3>
                    <p className="modal-subtitle">Para acceder a la agenda de los fundadores y a los balances operativos, requerimos su conformidad legal.</p>
                  </div>
                  
                  <div style={{
                    maxHeight: '120px',
                    overflowY: 'auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '14px',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    textAlign: 'justify'
                  }}>
                    La información que será provista en las próximas etapas de este proceso de evaluación—incluyendo, pero sin limitarse a: facturación histórica, manuales de operaciones, márgenes de rentabilidad y arquitectura tecnológica—es propiedad exclusiva de Criollo y de carácter estrictamente confidencial. Al aceptar este documento, el aplicante se compromete a no divulgar, reproducir ni utilizar dicha información para fines ajenos a la evaluación de esta inversión.
                  </div>

                  <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px' }}>
                    <input 
                      type="checkbox" 
                      id="ndaAccepted"
                      checked={ndaAccepted}
                      onChange={(e) => setNdaAccepted(e.target.checked)}
                      style={{ marginTop: '4px', cursor: 'pointer' }}
                      required
                    />
                    <label htmlFor="ndaAccepted" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: '1.4', textAlign: 'left' }}>
                      Acepto los términos del Acuerdo de Confidencialidad y declaro bajo juramento que los datos de identidad y capital provistos son exactos y veraces.
                    </label>
                  </div>

                  <div className="form-row">
                    <button type="button" onClick={() => setCurrentStep(3)} className="btn-secondary" style={{ width: '100%' }}>VOLVER</button>
                    <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', backgroundColor: 'var(--color-gold)' }}>
                      {isSubmitting ? 'FIRMANDO Y ENVIANDO...' : 'FIRMAR Y ENVIAR SOLICITUD'}
                    </button>
                  </div>
                </div>
              )}
              </form>
            )}

            {/* Success State */}
            {isSuccess && (
              <div className="qualify-success" style={{ display: 'block' }}>
                <div className="success-check-badge">
                  <Check size={28} />
                </div>
                <h3 className="modal-title" style={{ color: 'var(--color-gold)' }}>Postulación Recibida</h3>
                <p className="modal-subtitle" style={{ marginBottom: '24px', lineHeight: '1.6' }}>
                  Estimado/a <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{name}</span>, sus datos y perfil financiero han sido registrados correctamente en nuestra suite de expansión.
                </p>
                
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.01)', 
                  border: '1px solid rgba(197, 160, 89, 0.15)', 
                  borderRadius: '12px', 
                  padding: '24px', 
                  marginBottom: '24px',
                  textAlign: 'left',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  color: 'var(--text-muted)'
                }}>
                  <p style={{ marginBottom: '12px' }}>
                    Para salvaguardar la información estratégica confidencial de la firma, los balances consolidados y el Dossier Técnico no se distribuyen de forma automatizada.
                  </p>
                  <p>
                    Nuestro Comité de Expansión auditará la viabilidad y disponibilidad de su postulación para la escala de inversión de <strong>{formCapital === '60k-100k' ? 'USD 60k - USD 100k (Express)' : formCapital === '100k-200k' ? 'USD 100k - USD 200k (Avenida)' : 'Más de USD 200k (Premium / Multiunit)'}</strong>.
                  </p>
                </div>

                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.5', fontWeight: 600, marginBottom: '24px' }}>
                  De ser cualificado, un Director General de la firma se comunicará de forma directa al número <span style={{ color: 'var(--color-gold)' }}>{whatsapp}</span> para pactar una reunión formal de negocios o coordinar una videollamada de presentación.
                </div>

                <div style={{ 
                  marginTop: '28px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'center'
                }}>
                  <p style={{ 
                    fontSize: '0.82rem', 
                    color: 'var(--text-muted)', 
                    marginBottom: '16px',
                    lineHeight: '1.5' 
                  }}>
                    ¿Deseás agilizar el proceso de cualificación? Agendá una videollamada directa de 15 minutos en nuestro calendario:
                  </p>
                  <a 
                    href="https://calendly.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary" 
                    style={{ 
                      backgroundColor: 'var(--color-gold)', 
                      borderColor: 'rgba(255,255,255,0.15)',
                      padding: '12px 24px',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%'
                    }}
                  >
                    <Video size={16} />
                    AGENDAR VIDEOLLAMADA
                  </a>
                </div>
              </div>
            )}

            {/* Rejection/Freno State */}
            {isFreno && (
              <div className="qualify-success" style={{ display: 'block' }}>
                <div className="success-check-badge" style={{ 
                  backgroundColor: 'rgba(166, 90, 42, 0.1)', 
                  borderColor: 'rgba(166, 90, 42, 0.3)',
                  color: 'var(--color-accent)'
                }}>
                  <Lock size={28} />
                </div>
                <h3 className="modal-title" style={{ color: 'var(--color-accent)', marginBottom: '16px' }}>Agradecemos su Interés</h3>
                
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.01)', 
                  border: '1px solid rgba(166, 90, 42, 0.15)', 
                  borderRadius: '12px', 
                  padding: '24px', 
                  marginBottom: '28px',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)'
                }}>
                  Agradecemos su interés en formar parte del ecosistema Criollo. Actualmente, nuestras rondas de expansión corporativa requieren un ticket de inversión superior al perfil indicado. Hemos resguardado de forma segura su contacto para notificarle sobre futuras aperturas de formatos más accesibles.
                </div>

                <button type="button" onClick={closeModal} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  CERRAR
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div className="footer-brand">
            CRIOLLO <span style={{ color: 'var(--color-gold)' }}>| FRANCHISE SYSTEM</span>
          </div>
          <div>
            © 2026 Criollo Paladar Argento. Todos los derechos reservados.
          </div>
          <div className="footer-links">
            <a href="#adn" onClick={(e) => { e.preventDefault(); scrollToSection('adn'); }} className="footer-link">El ADN</a>
            <a href="#ventaja" onClick={(e) => { e.preventDefault(); scrollToSection('ventaja'); }} className="footer-link">Operaciones IA</a>
            <a href="#simulador" onClick={(e) => { e.preventDefault(); scrollToSection('simulador'); }} className="footer-link">Proyectar ROI</a>
            <a href="#proceso" onClick={(e) => { e.preventDefault(); scrollToSection('proceso'); }} className="footer-link">Expansión</a>
          </div>
        </div>
      </footer>
    </>
  );
}
