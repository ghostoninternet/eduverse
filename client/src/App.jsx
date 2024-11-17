import React from "react";
import "./index.css";
import "./output.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="sticky top-0 z-10">
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
