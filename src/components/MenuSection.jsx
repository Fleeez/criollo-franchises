import React, { useState } from 'react';
import TiltCard from './TiltCard';

const MENU_DATA = {
  entradas: [
    { name: "LA QUE COMÍA SAN MARTÍN", desc: "Clásica empanada criolla argentina acompañada de salsa yasgua. Opción carne salada, carne dulce o humita.", tag: "Tradicional" },
    { name: "PROVO Y GUSTÓ", desc: "Provoleta a la parrilla, bien pulenta. (Sale con cazuela de salsa criolla)", tag: "Parrilla" },
    { name: "PROVOLETA A CABALLO", desc: "Provoleta a la parrilla, bien pulenta. (Sale con huevo frito y morrón asado)", tag: "Especial" },
    { name: "PAPITAS A LO CRIOLLO", desc: "Papas fritas en bastones con queso fundido y salchicha parrillera en trozos.", tag: "Para Compartir" },
    { name: "MATRIMONIO", desc: "Chorizo bombón y morcilla bombón para arrancar a disfrutar.", tag: "Clásico" },
    { name: "GLOTONA", desc: "Tradicional tortilla de papas rellena de chorizo y queso. (Sale babé)", tag: "Babé" },
    { name: "GLOTONA A CABALLO", desc: "Tradicional tortilla de papas rellena de chorizo y queso con huevo frito y morrón asado.", tag: "Especialidad" }
  ],
  tablas: [
    { name: "LA INDOMABLE", desc: "Empanadas criollas, vacío de cerdo a la pizza y a caballo con papas fritas.", tag: "Recomendado" },
    { name: "CRIOLLA", desc: "Empanadas criollas, bife de chorizo, costilla ternera ancha y papas a caballo.", tag: "Para 2 o 3" },
    { name: "DE BODEGÓN", desc: "Empanadas criollas, provoleta, costilla de cerdo, tapa de asado y papas a caballo.", tag: "Completo" },
    { name: "PALADAR ARGENTO", desc: "Empanadas criollas, provoleta, entrecot de ternera, matambrito de cerdo y papas Criollo.", tag: "Premium" },
    { name: "LA DE MANUEL BELGRANO", desc: "Empanadas criollas, chorizo bombón, morcilla bombón, tira de asado banderita y tortilla Glotona.", tag: "Patria" }
  ],
  carnes: [
    { name: "EL CHÚCARO", desc: "Rack de ojo de bife de 500 gr. Elegí tu punto. Sale con guarnición a elección.", tag: "500g" },
    { name: "ARGENTO", desc: "Entrecot de ternera de 400 gr. Elegí tu punto. Sale con guarnición a elección.", tag: "400g" },
    { name: "SEÑOR GULA", desc: "Bife de chorizo de 400 gr. Elegí tu punto. Sale con guarnición a elección.", tag: "Favorito" },
    { name: "GAUCHA", desc: "Porción de 300 gr de entraña. Elegí tu punto. Sale con guarnición a elección.", tag: "Corte tierno" },
    { name: "ATRACÓN", desc: "Matambrito de cerdo. Podés elegirlo al limón o a la pizza. Sale con guarnición a elección.", tag: "Cerdo" },
    { name: "MANCHA MANTEL", desc: "Milanesón de ternera frita. Podés elegirla a la napolitana o a caballo. Sale con guarnición a elección.", tag: "Gigante" },
    { name: "INTERMINABLE", desc: "Sanguchazo de milanesa de ternera con tomate, lechuga, jamón, queso y huevo. (Comen 2)", tag: "Para 2" }
  ],
  especiales: [
    { name: "SORRENTINOS A LO CRIOLLO", desc: "Sorrentinos rellenos de jamón y queso con salsa de quesos fundidos y salchicha parrillera.", tag: "Pastas" },
    { name: "LA MILA DE LA NONA", desc: "Milanesa a la napolitana extra grande sobre un colchón de fideos cinta con crema.", tag: "Bodegón" },
    { name: "DON PASTEL", desc: "Pastel de papas casero relleno con carne desmenuzada con tres horas de cocción en vasija de barro con queso gratinado. (Sale en invierno)", tag: "Cocción lenta" }
  ]
};

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('entradas');

  const tabs = [
    { id: 'entradas', label: 'Entradas' },
    { id: 'tablas', label: 'Tablas' },
    { id: 'carnes', label: 'Carnes Asadas' },
    { id: 'especiales', label: 'Especiales' }
  ];

  return (
    <section id="menu" className="section" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
      {/* Grill Grid lines and Embers/Coals */}
      <div className="grill-grid"></div>
      <div className="ember ember-1"></div>
      <div className="ember ember-2"></div>
      <div className="ember ember-3"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-tag">NUESTRA PROPUESTA</span>
          <h2 className="section-title">El Menú del Bodegón</h2>
          <p className="section-desc" style={{ color: 'var(--text-muted)' }}>
            Recetas tradicionales criollas preparadas con ingredientes frescos, cortes de ternera seleccionados y el inconfundible sabor del asado argentino.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '50px'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}
              style={{
                fontSize: '13px',
                padding: '10px 24px',
                borderRadius: '30px',
                transition: 'all 0.3s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="perspective-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {MENU_DATA[activeTab].map((item, idx) => (
            <TiltCard
              key={`${activeTab}-${idx}`}
              className="interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '30px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-accent)',
                  padding: '3px 8px',
                  borderRadius: '12px'
                }}>
                  {item.tag}
                </span>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '800',
                marginBottom: '12px',
                lineHeight: '1.3',
                letterSpacing: '-0.5px'
              }}>
                {item.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                flexGrow: 1
              }}>
                {item.desc}
              </p>
              
              {/* Decorative accent element in card bottom */}
              <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(166, 90, 42, 0.15)',
                marginTop: '24px'
              }}></div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
