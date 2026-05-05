import { useEffect } from "react";

function Achievement({ href, children }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="achievement-item achievement-link"
      >
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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hobby-item hobby-link"
      >
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

const LeftSide = () => {
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

  return (
    <aside className="cv-left-sidebar">
      <h2>Készségek</h2>
      <ul>
        <li>Beágyazott fejlesztés: C/C++, Arduino</li>
        <li>Mikrokontrollerek: ESP32, AVR, RISC-V</li>
        <li>Hardver: NYÁK-tervezés (EasyEDA), áramkörtervezés</li>
        <li>Eszközök: Git, forrasztás, mérőeszközök</li>
        <li>Egyéb: 3D tervezés és nyomtatás</li>
      </ul>

      <h2>Eredmények</h2>
      <Achievement href="https://www.cansatverseny.hu/">Top 10 - CanSat-verseny (2026)</Achievement>
      <Achievement href="https://www.youtube.com/watch?v=oTBJO4NMzr4&t">Médiamegjelenés - PécsiTV (2026)</Achievement>
      <Achievement href="https://gnd.bme.hu/hunity">Pályán a Hunity műhold a csapatunkkal - SpaceX Transporter 15 (2025)</Achievement>
      <Achievement href="https://www.youtube.com/watch?v=VsbMyYeY6XA">Megemlítve - SpaceJunkie élő YouTube adás (2025)</Achievement>
      <Achievement href="https://canseat.hu/ii-hazai-urkongresszus/">Kiállító - II. Hazai Űrkongresszus (2025)</Achievement>
      <Achievement href="https://tudomanyfesztival.hu/program-2025/">Kiállító - Pécsi Tudományfesztivál (2025)</Achievement>
      <Achievement href="https://nmhh.hu/cikk/251203/Kihirdetek_a_CanSat_verseny_idei_dontoseit">Tudományos különdíj - CanSat-verseny (2025)</Achievement>

      <h2>Hobbik</h2>
      <Hobby>Elektronika és barkácsolás</Hobby>
      <Hobby href="https://bambulab.com/en/a1-mini">3D nyomtatás</Hobby>
      <Hobby href="https://en.wikipedia.org/wiki/Gilera_Runner">Robogó szerelés</Hobby>
      <Hobby href="https://github.com/paco7828/retro-displays">Retro kijelzők restaurálása</Hobby>
    </aside>
  );
};

export default LeftSide;
