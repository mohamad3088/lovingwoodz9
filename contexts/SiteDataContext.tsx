import React, { createContext, useContext, useState, useCallback } from 'react';

export interface PortfolioProject {
  id: string;
  title: string;
  sub: string;
  loc: string;
  cat: string;
  video: string;
  img: string;
  gallery: string[];
  description: string;
  year: string;
}

export interface HomeProject {
  title: string;
  cat: string;
  loc: string;
  video: string;
  img: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface StatItem {
  val: number;
  suffix: string;
  label: string;
}

export interface SiteData {
  home: {
    heroTitle1: string;
    heroTitle2: string;
    heroVideo: string;
    heroLabel: string;
    philosophyTitle: string;
    philosophyEmphasis: string;
    philosophyText: string;
    philosophyVideo: string;
    stats: StatItem[];
    featuredProjects: HomeProject[];
    processTitle: string;
    processEmphasis: string;
    processSteps: ProcessStep[];
    ctaLabel: string;
    ctaTitle: string;
    ctaEmphasis: string;
    ctaVideo: string;
  };
  portfolio: {
    projects: PortfolioProject[];
  };
  about: {
    heroTitle: string;
    heroText: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
  };
}

const DEFAULT_DATA: SiteData = {
  home: {
    heroTitle1: 'Timeless',
    heroTitle2: 'Woodcraft.',
    heroVideo: '/images/home1.mp4',
    heroLabel: 'Est. 2010 · Geleen, Nederland',
    philosophyTitle: 'De kracht',
    philosophyEmphasis: 'van hout.',
    philosophyText: 'Ik geloof in hout, niet alleen omdat het mooi is maar omdat het leeft, het verbindt, het vertelt verhalen. Dat gebruiken we om interieurs te maken die echt iets voor je doen. Wij maken interieurs voor de mooiste momenten in je leven.',
    philosophyVideo: '/images/tv.mp4',
    stats: [
      { val: 14, suffix: '+', label: 'Jaar ervaring' },
      { val: 120, suffix: '+', label: 'Projecten voltooid' },
      { val: 100, suffix: '%', label: 'Maatwerk' },
      { val: 4, suffix: '', label: 'Houtsoorten' },
    ],
    featuredProjects: [
      {
        title: 'The Slat Wall Suite',
        cat: 'Woonkamer',
        loc: 'Amsterdam',
        video: '/images/zwartkeuken.mp4',
        img: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1400',
      },
      {
        title: 'Fluted Oak Kitchen',
        cat: 'Keuken',
        loc: 'Rotterdam',
        video: '/images/kast.mp4',
        img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400',
      },
      {
        title: 'Minimalist Vanity',
        cat: 'Badkamer',
        loc: 'Utrecht',
        video: '/images/tv.mp4',
        img: 'https://images.unsplash.com/photo-1620626011761-9963d7521477?q=80&w=1400',
      },
    ],
    processTitle: 'Van idee tot',
    processEmphasis: 'meesterwerk.',
    processSteps: [
      { num: '01', title: 'Ontwerp', desc: 'We luisteren naar jouw wens en vertalen die naar een op maat ontwerp dat past bij jouw ruimte en leven.' },
      { num: '02', title: 'Materiaal', desc: 'Selectie van de beste houtsoorten. Elke plank wordt persoonlijk gekozen voor karakter en schoonheid.' },
      { num: '03', title: 'Vakmanschap', desc: 'Ambachtelijk gemaakt in eigen werkplaats. Van ruwe plank tot afgewerkt meubel, alles met eigen handen.' },
      { num: '04', title: 'Plaatsing', desc: 'Professionele installatie in jouw ruimte. We zorgen dat elk detail klopt tot op de millimeter.' },
    ],
    ctaLabel: 'Klaar voor jouw project?',
    ctaTitle: 'Start a',
    ctaEmphasis: 'conversation.',
    ctaVideo: '/images/home.mp4',
  },
  portfolio: {
    projects: [
      {
        id: '1', title: 'The Slat Wall Suite', sub: 'Luxe woonkamer', loc: 'Amsterdam, NL', cat: 'Woonkamer', year: '2024',
        video: '/images/zwartkeuken.mp4',
        img: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1400',
        description: 'Een totaalconcept waarbij verticale houten lamellen de ruimte definiëren. In dit project vloeit de wand naadloos over in een op maat gemaakt tv-meubel van massief eiken.',
        gallery: ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1400', 'https://images.unsplash.com/photo-1507652313519-d4c9174996dd?q=80&w=1400', 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1400'],
      },
      {
        id: '2', title: 'Fluted Oak Kitchen', sub: 'Keuken op maat', loc: 'Rotterdam, NL', cat: 'Keuken', year: '2024',
        video: '/images/kast.mp4',
        img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400',
        description: 'Een harmonieus samenspel tussen verticale eiken lamellen en modern marmer. De tactiele ervaring van het hout staat centraal in dit project.',
        gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400', 'https://images.unsplash.com/photo-1556912177-c54030639a4c?q=80&w=1400', 'https://images.unsplash.com/photo-1556909212-d5b6043bc573?q=80&w=1400'],
      },
      {
        id: '3', title: 'Tambour Media Wall', sub: 'Wandmeubel', loc: 'Rotterdam, NL', cat: 'Wandmeubel', year: '2023',
        video: '/images/home1.mp4',
        img: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1400',
        description: 'Dit zwevende meubel in Amerikaans Notenhout dient als het visuele anker van de woonkamer. Tijdloze elegantie in een hedendaagse setting.',
        gallery: ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1400', 'https://images.unsplash.com/photo-1507652313519-d4c9174996dd?q=80&w=1400'],
      },
      {
        id: '4', title: 'Minimalist Vanity', sub: 'Badkamer meubel', loc: 'Utrecht, NL', cat: 'Badkamer', year: '2023',
        video: '/images/tv.mp4',
        img: 'https://images.unsplash.com/photo-1620626011761-9963d7521477?q=80&w=1400',
        description: 'Een oase van rust gecreëerd door gerookt eiken. Het meubel vloeit naadloos over in de architectuur van de ruimte.',
        gallery: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1400', 'https://images.unsplash.com/photo-1507652313519-d4c9174996dd?q=80&w=1400'],
      },
    ],
  },
  about: {
    heroTitle: 'Vakmanschap met een ziel.',
    heroText: 'Iedere plank heeft een verhaal. Wij zijn de vertellers.',
  },
  contact: {
    email: 'info@lovingwoodz.com',
    phone: '+31 6 45066847',
    address: 'Nijverheidsweg 24',
    city: '6163 BZ, Geleen',
  },
};

function loadFromStorage(): SiteData {
  try {
    const saved = localStorage.getItem('lw_site_data');
    if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_DATA;
}

interface SiteDataContextType {
  data: SiteData;
  updateHome: (updates: Partial<SiteData['home']>) => void;
  updatePortfolioProjects: (projects: PortfolioProject[]) => void;
  addPortfolioProject: (project: PortfolioProject) => void;
  removePortfolioProject: (id: string) => void;
  updatePortfolioProject: (id: string, updates: Partial<PortfolioProject>) => void;
  updateAbout: (updates: Partial<SiteData['about']>) => void;
  updateContact: (updates: Partial<SiteData['contact']>) => void;
  resetAll: () => void;
}

const SiteDataContext = createContext<SiteDataContextType>({
  data: DEFAULT_DATA,
  updateHome: () => {},
  updatePortfolioProjects: () => {},
  addPortfolioProject: () => {},
  removePortfolioProject: () => {},
  updatePortfolioProject: () => {},
  updateAbout: () => {},
  updateContact: () => {},
  resetAll: () => {},
});

export const useSiteData = () => useContext(SiteDataContext);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(loadFromStorage);

  const save = useCallback((newData: SiteData) => {
    setData(newData);
    localStorage.setItem('lw_site_data', JSON.stringify(newData));
  }, []);

  const updateHome = useCallback((updates: Partial<SiteData['home']>) => {
    setData(prev => {
      const next = { ...prev, home: { ...prev.home, ...updates } };
      localStorage.setItem('lw_site_data', JSON.stringify(next));
      return next;
    });
  }, []);

  const updatePortfolioProjects = useCallback((projects: PortfolioProject[]) => {
    setData(prev => {
      const next = { ...prev, portfolio: { ...prev.portfolio, projects } };
      localStorage.setItem('lw_site_data', JSON.stringify(next));
      return next;
    });
  }, []);

  const addPortfolioProject = useCallback((project: PortfolioProject) => {
    setData(prev => {
      const next = { ...prev, portfolio: { ...prev.portfolio, projects: [...prev.portfolio.projects, project] } };
      localStorage.setItem('lw_site_data', JSON.stringify(next));
      return next;
    });
  }, []);

  const removePortfolioProject = useCallback((id: string) => {
    setData(prev => {
      const next = { ...prev, portfolio: { ...prev.portfolio, projects: prev.portfolio.projects.filter(p => p.id !== id) } };
      localStorage.setItem('lw_site_data', JSON.stringify(next));
      return next;
    });
  }, []);

  const updatePortfolioProject = useCallback((id: string, updates: Partial<PortfolioProject>) => {
    setData(prev => {
      const next = {
        ...prev,
        portfolio: {
          ...prev.portfolio,
          projects: prev.portfolio.projects.map(p => p.id === id ? { ...p, ...updates } : p),
        },
      };
      localStorage.setItem('lw_site_data', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateAbout = useCallback((updates: Partial<SiteData['about']>) => {
    setData(prev => {
      const next = { ...prev, about: { ...prev.about, ...updates } };
      localStorage.setItem('lw_site_data', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateContact = useCallback((updates: Partial<SiteData['contact']>) => {
    setData(prev => {
      const next = { ...prev, contact: { ...prev.contact, ...updates } };
      localStorage.setItem('lw_site_data', JSON.stringify(next));
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    save(DEFAULT_DATA);
  }, [save]);

  return (
    <SiteDataContext.Provider value={{
      data, updateHome, updatePortfolioProjects,
      addPortfolioProject, removePortfolioProject, updatePortfolioProject,
      updateAbout, updateContact, resetAll,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};
