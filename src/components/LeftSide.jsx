import { useEffect } from "react";

function Achievement({ href, children }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="achievement-item achievement-link">
        <span className="achievement-text">{children}</span>
        <span className="achievement-ext">↗</span>
      </a>
    );
  }
  return (
    <div className="achievement-item">
      <span className="achievement-text">{children}</span>
    </div>
  );
}

function Hobby({ href, children }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hobby-item hobby-link">
        <span className="hobby-text">{children}</span>
        <span className="hobby-arrow">↗</span>
      </a>
    );
  }
  return (
    <div className="hobby-item">
      <span className="hobby-text">{children}</span>
    </div>
  );
}

const LeftSide = ({ lang }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        }),
        { threshold: 0.1 }
      );
      document.querySelectorAll(".achievement-item, .hobby-item").forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    hu: {
      skills: "Készségek",
      achievements: "Eredmények",
      hobbies: "Hobbik",
      s1: "Beágyazott fejlesztés: C/C++, Arduino",
      s2: "Mikrokontrollerek: ESP32, AVR, RISC-V",
      s3: "Hardver: NYÁK-tervezés (EasyEDA), áramkörtervezés",
      s4: "Eszközök: Git, forrasztás, mérőeszközök",
      s5: "Egyéb: 3D tervezés és nyomtatás",
      a1: "1. helyezett - CanSat Hungary 2026",
      a2: "Médiamegjelenés - PécsiTV (2026)",
      a3: "Pályán a Hunity műhold a csapatunkkal - SpaceX Transporter 15 (2025)",
      a4: "Megemlítve - SpaceJunkie élő YouTube adás (2025)",
      a5: "Kiállító - II. Hazai Űrkongresszus (2025)",
      a6: "Kiállító - Pécsi Tudományfesztivál (2025)",
      a7: "Tudományos különdíj - CanSat-verseny (2025)",
      h1: "Elektronika és barkácsolás",
      h2: "3D nyomtatás",
      h3: "Robogó szerelés",
      h4: "Retro kijelzők restaurálása",
    },
    en: {
      skills: "Skills",
      achievements: "Achievements",
      hobbies: "Hobbies",
      s1: "Embedded Development: C/C++, Arduino",
      s2: "Microcontrollers: ESP32, AVR, RISC-V",
      s3: "Hardware: PCB Design (EasyEDA), Circuit Design",
      s4: "Tools: Git, Soldering, Measuring Tools",
      s5: "Other: 3D Design & Printing",
      a1: "1st place - CanSat Hungary 2026",
      a2: "Media Appearance - PécsiTV (2026)",
      a3: "Hunity Satellite in Orbit with Our Team - SpaceX Transporter 15 (2025)",
      a4: "Mentioned - SpaceJunkie Live YouTube Broadcast (2025)",
      a5: "Exhibitor - II. National Space Congress (2025)",
      a6: "Exhibitor - Pécs Science Festival (2025)",
      a7: "Scientific Special Prize - CanSat Competition (2025)",
      h1: "Electronics and DIY",
      h2: "3D Printing",
      h3: "Scooter Repair",
      h4: "Restoring Retro Displays",
    }
  }[lang];

  return (
    <aside className="cv-left-sidebar">
      <h2>{content.skills}</h2>
      <ul>
        <li>{content.s1}</li>
        <li>{content.s2}</li>
        <li>{content.s3}</li>
        <li>{content.s4}</li>
        <li>{content.s5}</li>
      </ul>

      <h2>{content.achievements}</h2>
      <Achievement href="https://blog.urvilag.hu/20260806/muhold-uditosdobozban-a-donto-tudas-kitartas-es-lelkesedes/">{content.a1}</Achievement>
      <Achievement href="https://www.youtube.com/watch?v=oTBJO4NMzr4&t">{content.a2}</Achievement>
      <Achievement href="https://gnd.bme.hu/hunity">{content.a3}</Achievement>
      <Achievement href="https://www.youtube.com/watch?v=VsbMyYeY6XA">{content.a4}</Achievement>
      <Achievement href="https://canseat.hu/ii-hazai-urkongresszus/">{content.a5}</Achievement>
      <Achievement href="https://tudomanyfesztival.hu/program-2025/">{content.a6}</Achievement>
      <Achievement href="https://nmhh.hu/cikk/251203/Kihirdetek_a_CanSat_verseny_idei_dontoseit">{content.a7}</Achievement>

      <h2>{content.hobbies}</h2>
      <Hobby>{content.h1}</Hobby>
      <Hobby href="https://bambulab.com/en/a1-mini">{content.h2}</Hobby>
      <Hobby href="https://en.wikipedia.org/wiki/Gilera_Runner">{content.h3}</Hobby>
      <Hobby href="https://github.com/paco7828/retro-displays">{content.h4}</Hobby>
    </aside>
  );
};

export default LeftSide;