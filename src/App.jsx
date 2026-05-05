import Header from "./components/Header";
import Body from "./components/Body";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="cv-container">
      <Header />
      <div className="cv-main-content">
        <LeftSide />
        <Body />
        <RightSide />
      </div>
      <Footer />
    </div>
  );
}

export default App;
