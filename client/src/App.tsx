import React from "react";
import Header from "./components/Header";
import Contact from "./components/Contact";
import GoldCarousel from "./components/GoldCarousel";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { GoldRateProvider } from "./contexts/GoldRateContext";

const App: React.FC = () => {
  return (
      <GoldRateProvider>
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <GoldCarousel/>
        <Contact/>
      </main>
      <Footer/>
      <ToastContainer/>
    </div>
    </GoldRateProvider>
  );
};

export default App;
