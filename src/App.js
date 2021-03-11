import Sidebar from "./Sidebar";
import Home from "./Home";
import { useState } from "react";
import "./App.css";
import 'react-phone-number-input/style.css'

function App() {
  const [view, setView] = useState("list");
  const [isOpen, setOpen] = useState(false);
  const [blurHome, setBlurHome] = useState(false);
  return (
    <div className="App">
      <div className={isOpen ? ".darkenContainer" : "container"}>
        <aside className={isOpen ? ".blurredSidenav" : "sidenav"}>
          <Sidebar
            changeView={(view) => setView(view)}
            blurBg={(set) => setBlurHome(set)}
          />
        </aside>
        <main className={blurHome ? "blurmainContent" : "mainContent"}>
          <Home view={view} openModal={(isOpen) => setOpen(!isOpen)} />
        </main>
      </div>
    </div>
  );
}

export default App;
