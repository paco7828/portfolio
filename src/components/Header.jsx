const Header = () => {
  return (
    <header className="cv-header">
      <h1>Kőszegi Patrik</h1>
      <p>
        <strong>Mérnökinformatikus hallgató</strong>
        <br />
        <strong>Szoftverfejlesztő és -tesztelő</strong>
      </p>
      <p>
        <a href="mailto:koszegipatrik@gmail.com">koszegipatrik@gmail.com</a>
        {" | "}
        <a href="tel:+36304649793">+36 30 464 9793</a>
        {" | "}
        <a
          href="https://github.com/paco7828"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        {" | "}
        <a
          href="https://maps.google.com/?q=Pécs,+Magyarország"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pécs, Magyarország
        </a>
      </p>
    </header>
  );
};

export default Header;
