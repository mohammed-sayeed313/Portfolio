import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Marquee } from './components/ui/Marquee';
import { ProfessionalSummary } from './components/sections/ProfessionalSummary';
import { WhoIAm } from './components/sections/WhoIAm';
import { TechArsenal } from './components/sections/TechArsenal';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { FlagshipProject } from './components/sections/FlagshipProject';
import { AdditionalProjects } from './components/sections/AdditionalProjects';
import { Certifications } from './components/sections/Certifications';
import { Achievements } from './components/sections/Achievements';
import { LanguagesAndInnovation } from './components/sections/LanguagesAndInnovation';
import { Education } from './components/sections/Education';
import { Vision } from './components/sections/Vision';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ProfessionalSummary />
        <WhoIAm />
        <TechArsenal />
        <Experience />
        <Projects />
        <FlagshipProject />
        <AdditionalProjects />
        <Certifications />
        <Achievements />
        <LanguagesAndInnovation />
        <Education />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
