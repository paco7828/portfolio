const Header = ({ lang, toggleLang }) => {
  const t = {
    hu: {
      download: "Önéletrajz letöltése",
      title1: "Mérnökinformatikus hallgató",
      title2: "Szoftverfejlesztő és -tesztelő",
      location: "Pécs, Magyarország",
    },
    en: {
      download: "Download CV",
      title1: "Computer Science Engineering Student",
      title2: "Software Developer and Tester",
      location: "Pécs, Hungary",
    },
  }[lang];

  return (
    <header className="cv-header" style={{ position: "relative" }}>
      <button 
        onClick={toggleLang} 
        className="cv-lang-btn" 
        style={{ position: "absolute", top: "10px", right: "10px", padding: "5px 10px", cursor: "pointer" }}
      >
        {lang === "hu" ? "EN" : "HU"}
      </button>
      <h1>Kőszegi Patrik</h1>
      <a href={`${import.meta.env.BASE_URL}cv.pdf`} download="cv.pdf" className="cv-download-btn">
        {t.download}
      </a>
      <p>
        <strong>{t.title1}</strong>
        <br />
        <strong>{t.title2}</strong>
      </p>
      <p>
        <a href="mailto:koszegipatrik@gmail.com">koszegipatrik@gmail.com</a>
        {" | "}
        <a href="tel:+36304649793">+36 30 464 9793</a>
        {" | "}
        <a href="https://github.com/paco7828" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {" | "}
        <a href="https://maps.google.com/?q=Pécs,+Magyarország" target="_blank" rel="noopener noreferrer">
          {t.location}
        </a>
      </p>
    </header>
  );
};

export default Header;