const Footer = ({ lang }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="cv-footer">
      <p>
        © {year} Kőszegi Patrik
        {" | "}
        <a href="https://www.linkedin.com/in/patrik-k%C5%91szegi-60b2922ba/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        {" | "}
        <a href="https://github.com/paco7828" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
    </footer>
  );
};

export default Footer;