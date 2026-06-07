import { useEffect, useState, useRef, useCallback } from "react";

const IMAGES = [
  {
    src: "/assets/images/project1.jpg",
    alt: "TIL305-Clock",
    caption: "TIL305 óra",
  },
  {
    src: "/assets/images/project2.jpg",
    alt: "SAS-MK3",
    caption: "2026 CanSat",
  },
  {
    src: "/assets/images/project4.jpg",
    alt: "displays1",
    caption: "Vintage kijelző gyűjtemény",
  },
  {
    src: "/assets/images/project4A.jpg",
    alt: "displays2",
    caption: "Vintage kijelző gyűjtemény",
  },
  {
    src: "/assets/images/project5.jpg",
    alt: "Kép 3",
    caption: "CanSat LoRa kommunikáció tesztelés",
  },
  {
    src: "/assets/images/project6.jpg",
    alt: "timed-box",
    caption: "Időzítővel ellátott gyógyszeres doboz",
  },
  {
    src: "/assets/images/project7.jpg",
    alt: "interview",
    caption: "PécsiTV interjú előkészületek",
  },
  {
    src: "/assets/images/project8.jpg",
    alt: "cansat-finder",
    caption: "CanSat kereső eszköz prototípus",
  },
  {
    src: "/assets/images/project9.jpg",
    alt: "seven-segment-clock",
    caption: "7 szegmenses kijelzős óra",
  },
  {
    src: "/assets/images/project10.jpg",
    alt: "hdsp-clock",
    caption: "GPS & WiFi & RTC alapú óra",
  },
  {
    src: "/assets/images/project11.jpg",
    alt: "universal-remote-v1",
    caption: "Univerzális távirányító V1",
  },
  {
    src: "/assets/images/project13.jpg",
    alt: "universal-remote-v2",
    caption: "Univerzális távirányító V2",
  },
  {
    src: "/assets/images/project12.jpg",
    alt: "first-vintage-display-clock",
    caption: "Első retro kijelzős óra",
  },
];

function Gallery() {
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
  }, [animating]);

  const prev = useCallback(() => {
    if (animating) return;
    setDir("left");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
      setDir(null);
      setAnimating(false);
    }, 320);
  }, [animating]);

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
  }, []);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handlePrev = () => {
    prev();
    resetTimer();
  };
  const handleNext = () => {
    next();
    resetTimer();
  };
  const handleDot = (index) => {
    const direction = index > current ? "right" : "left";
    goTo(index, direction);
    resetTimer();
  };

  const animClass = animating
    ? dir === "right"
      ? " gallery-slide-out-left"
      : " gallery-slide-out-right"
    : " gallery-slide-in";

  return (
    <div className="gallery-wrapper">
      <button
        className="gallery-arrow gallery-arrow-left"
        onClick={handlePrev}
        aria-label="Előző"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="20"
          height="20"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="gallery-frame">
        <img
          key={current}
          src={`${baseUrl}${IMAGES[current].src.replace(/^\//, "")}`}
          alt={IMAGES[current].alt}
          className={"gallery-img" + animClass}
        />
      </div>
      <button
        className="gallery-arrow gallery-arrow-right"
        onClick={handleNext}
        aria-label="Következő"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="20"
          height="20"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <p className="gallery-caption">{IMAGES[current].caption}</p>
      <div className="gallery-dots">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            className={"gallery-dot" + (i === current ? " active" : "")}
            onClick={() => handleDot(i)}
            aria-label={`${i + 1}. kép`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, sub, github, link, detail, img }) {
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
    <div
      ref={cardRef}
      className={"project-card" + (flipped ? " flipped" : "")}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="project-card-inner">
        <div className="project-card-front">
          <div className="project-card-title">{title}</div>
          {sub && <div className="project-card-sub">{sub}</div>}
          <div className="project-hint">kattints a részletekért</div>
        </div>
        <div className="project-card-back" ref={backRef}>
          <div className="project-card-title">{title}</div>
          {img && <img src={img} className="project-card-img" alt={title} />}
          <div className="project-card-detail">{detail}</div>
          <div className="project-card-links">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github-link"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub →
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github-link"
                onClick={(e) => e.stopPropagation()}
              >
                Részletek →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Body = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              obs.unobserve(e.target);
            }
          }),
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".about-block")
        .forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="cv-body">
      <h2>Projektek</h2>
      <div className="project-section">
        <ProjectCard
          title="SAS-MK3"
          sub="CanSat · 2026"
          link="https://canseat.hu/cdr-video-2026/"
          detail="Kompakt, több funkciós rendszer CAN és kétirányú LoRa kommunikációval, hő- illetve, ejtőernyő kamerával."
        />
        <ProjectCard
          title="SAS-MK2"
          sub="CanSat · 2025"
          link="https://www.youtube.com/watch?v=VNeAm5GvCnE"
          detail="Az első CanSat melyhez a teljes működő szoftvert készítettem el és csapatommal Tudományos különdíjat érdemeltünk ki."
        />
        <ProjectCard
          title="Univerzális távirányító"
          sub="IR · ESP32 · 2023"
          github="https://github.com/paco7828/universal-remote"
          detail="IR jelek tárolása és visszajátszása érintőkijelzős felülettel."
        />
        <ProjectCard
          title="TIL305 Óra"
          sub="Retro · ESP32 · 2025"
          github="https://github.com/paco7828/TIL305-Clock"
          detail="Vintage LED kijelzős óra modern vezérléssel és időszinkronizációval."
        />
        <ProjectCard
          title="CanSat kereső"
          sub="ESP32 · LoRa · 2025"
          github="https://github.com/paco7828/Cansat-Finder"
          detail="Hordozható és paraméterezhető LoRa telemetria és GPS alapú keresőeszköz egy CanSat megtalálásához."
        />
        <ProjectCard
          title="Növényfelügyelő eszköz"
          sub="IoT · ESP32 · 2025"
          github="https://github.com/paco7828/plant-monitor"
          detail="Talajszenzoros eszköz ESP-NOW kommunikációval, alacsony fogyasztással és napelemes tápellátással."
        />
        <ProjectCard
          title="Közösségi média felület"
          sub="Web · Frontend · 2025"
          github="https://github.com/Cod-kd/UNIverse"
          detail="Egyetemi közösségi platform, ahol a teljes frontend fejlesztését végeztem."
        />
      </div>

      <h2>Galéria</h2>
      <Gallery />
    </main>
  );
};

export default Body;
