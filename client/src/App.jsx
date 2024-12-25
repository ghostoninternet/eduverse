import "./index.css";
import "./output.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { pingServer } from "./apis/ping.js";

function App() {

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await pingServer()
        if (response?.statusCode) {
          throw new Error(response.message)
        }
        console.log(response)
      } catch (error) {
        console.log(error)
      }
      
    return () => clearInterval(interval)
    }, 30000)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10">
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
