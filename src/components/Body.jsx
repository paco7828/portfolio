import { useEffect, useState, useRef, useCallback } from "react";

const getImages = (lang) => [
  { src: "/assets/images/project1.jpg", alt: "TIL305-Clock", caption: lang === "hu" ? "TIL305 óra" : "TIL305 Clock" },
  { src: "/assets/images/project2.jpg", alt: "SAS-MK3", caption: "2026 CanSat" },
  { src: "/assets/images/project3.jpg", alt: "CanSatFinder", caption: lang === "hu" ? "CanSat Kereső eszköz" : "CanSat Finder device" },
  { src: "/assets/images/project4.jpg", alt: "timed-box", caption: lang === "hu" ? "Időzítővel ellátott gyógyszeres doboz" : "Timed Medication Box" },
  { src: "/assets/images/project5.jpg", alt: "retro-clock", caption: lang === "hu" ? "Retró kijelzős óra" : "Retro display clock" },
  { src: "/assets/images/project6.jpg", alt: "interview", caption: lang === "hu" ? "PécsiTV interjú előkészületek" : "PécsiTV Interview Preparations" },
  { src: "/assets/images/project7.jpg", alt: "universal-remote", caption: lang === "hu" ? "Univerzális távirányító" : "Universal Remote" },
];

function Gallery({ lang }) {
  const IMAGES = getImages(lang);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(null);
  const [animating, setAnimating] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;
  const timerRef = useRef(null);

  const next = useCallback(() => {
    if (animating) return;
    setDir("right");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
      setDir(null);
      setAnimating(false);
    }, 320);
  }, [animating, IMAGES.length]);

  const prev = useCallback(() => {
    if (animating) return;
    setDir("left");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
      setDir(null);
      setAnimating(false);
    }, 320);
  }, [animating, IMAGES.length]);

  const goTo = useCallback(
    (index, direction) => {
      if (animating) return;
      setDir(direction);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setDir(null);
        setAnimating(false);
      }, 320);
    },
    [animating],
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir("right");
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % IMAGES.length);
        setDir(null);
        setAnimating(false);
      }, 320);
    }, 5000);
  }, [IMAGES.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot = (index) => {
    const direction = index > current ? "right" : "left";
    goTo(index, direction);
    resetTimer();
  };

  const animClass = animating
    ? dir === "right" ? " gallery-slide-out-left" : " gallery-slide-out-right"
    : " gallery-slide-in";

  return (
    <div className="gallery-wrapper">
      <button className="gallery-arrow gallery-arrow-left" onClick={handlePrev} aria-label={lang === "hu" ? "Előző" : "Previous"}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="gallery-frame">
        <img key={current} src={`${baseUrl}${IMAGES[current].src.replace(/^\//, "")}`} alt={IMAGES[current].alt} className={"gallery-img" + animClass} />
      </div>
      <button className="gallery-arrow gallery-arrow-right" onClick={handleNext} aria-label={lang === "hu" ? "Következő" : "Next"}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <p className="gallery-caption">{IMAGES[current].caption}</p>
      <div className="gallery-dots">
        {IMAGES.map((_, i) => (
          <button key={i} className={"gallery-dot" + (i === current ? " active" : "")} onClick={() => handleDot(i)} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, sub, github, link, detail, img, lang }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !backRef.current) return;
    const card = cardRef.current;
    const back = backRef.current;
    if (flipped) {
      card.style.height = back.scrollHeight + "px";
      back.style.overflowY = "visible";
    } else {
      card.style.height = "82px";
    }
  }, [flipped]);

  return (
    <div ref={cardRef} className={"project-card" + (flipped ? " flipped" : "")} onClick={() => setFlipped((f) => !f)}>
      <div className="project-card-inner">
        <div className="project-card-front">
          <div className="project-card-title">{title}</div>
          {sub && <div className="project-card-sub">{sub}</div>}
          <div className="project-hint">{lang === "hu" ? "kattints a részletekért" : "click for details"}</div>
        </div>
        <div className="project-card-back" ref={backRef}>
          <div className="project-card-title">{title}</div>
          {img && <img src={img} className="project-card-img" alt={title} />}
          <div className="project-card-detail">{detail}</div>
          <div className="project-card-links">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="project-github-link" onClick={(e) => e.stopPropagation()}>
                GitHub →
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="project-github-link" onClick={(e) => e.stopPropagation()}>
                {lang === "hu" ? "Részletek" : "Details"} →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Body = ({ lang }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        }),
        { threshold: 0.1 },
      );
      document.querySelectorAll(".about-block").forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    hu: {
      projects: "Projektek",
      gallery: "Galéria",
      p1_det: "Kompakt, több funkciós rendszer CAN és kétirányú LoRa kommunikációval, hő- illetve, ejtőernyő kamerával.",
      p2_det: "Az első CanSat melyhez a teljes működő szoftvert készítettem el és csapatommal Tudományos különdíjat érdemeltünk ki.",
      p3_det: "IR jelek tárolása és visszajátszása érintőkijelzős felülettel.",
      p4_det: "Vintage LED kijelzős óra modern vezérléssel és időszinkronizációval.",
      p5_det: "Hordozható és paraméterezhető LoRa telemetria és GPS alapú keresőeszköz egy CanSat megtalálásához.",
      p6_det: "Talajszenzoros eszköz ESP-NOW kommunikációval, alacsony fogyasztással és napelemes tápellátással.",
      p7_det: "Egyetemi közösségi platform, ahol a teljes frontend fejlesztését végeztem.",
    },
    en: {
      projects: "Projects",
      gallery: "Gallery",
      p1_det: "Compact, multi-functional system with CAN and bidirectional LoRa communication, thermal and parachute cameras.",
      p2_det: "The first CanSat for which I developed the entire working software, earning a Scientific Special Prize with my team.",
      p3_det: "Storage and playback of IR signals with a touchscreen interface.",
      p4_det: "Vintage LED display clock with modern control and time synchronization.",
      p5_det: "Portable and configurable LoRa telemetry and GPS-based tracking device to locate a CanSat.",
      p6_det: "Soil sensor device with ESP-NOW communication, low power consumption, and solar power supply.",
      p7_det: "University social platform where I handled the entire frontend development.",
    },
  }[lang];

  return (
    <main className="cv-body">
      <h2>{content.projects}</h2>
      <div className="project-section">
        <ProjectCard title="SAS-MK3" sub="CanSat · 2026" link="https://www.youtube.com/watch?v=jxtnfJbKNK4" detail={content.p1_det} lang={lang} />
        <ProjectCard title="SAS-MK2" sub="CanSat · 2025" link="https://www.youtube.com/watch?v=VNeAm5GvCnE" detail={content.p2_det} lang={lang} />
        <ProjectCard title={lang === "hu" ? "Univerzális távirányító" : "Universal Remote"} sub="IR · ESP32 · 2023" github="https://github.com/paco7828/universal-remote" detail={content.p3_det} lang={lang} />
        <ProjectCard title={lang === "hu" ? "TIL305 Óra" : "TIL305 Clock"} sub="Retro · ESP32 · 2025" github="https://github.com/paco7828/TIL305-Clock" detail={content.p4_det} lang={lang} />
        <ProjectCard title={lang === "hu" ? "CanSat kereső" : "CanSat Finder"} sub="ESP32 · LoRa · 2025" github="https://github.com/paco7828/Cansat-Finder" detail={content.p5_det} lang={lang} />
        <ProjectCard title={lang === "hu" ? "Növényfelügyelő eszköz" : "Plant Monitor"} sub="IoT · ESP32 · 2025" github="https://github.com/paco7828/plant-monitor" detail={content.p6_det} lang={lang} />
        <ProjectCard title={lang === "hu" ? "Közösségi média felület" : "Social Media Platform"} sub="Web · Frontend · 2025" github="https://github.com/Cod-kd/UNIverse" detail={content.p7_det} lang={lang} />
      </div>

      <h2>{content.gallery}</h2>
      <Gallery lang={lang} />
    </main>
  );
};

export default Body;