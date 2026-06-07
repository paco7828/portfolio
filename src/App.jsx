import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [lang, setLang] = useState("hu");

  const toggleLang = () => {
    setLang((prev) => (prev === "hu" ? "en" : "hu"));
  };

  return (
    <div className="cv-container">
      <Header lang={lang} toggleLang={toggleLang} />
      <div className="cv-main-content">
        <LeftSide lang={lang} />
        <Body lang={lang} />
        <RightSide lang={lang} />
      </div>
      <Footer lang={lang} />
    </div>
  );
}

export default App;