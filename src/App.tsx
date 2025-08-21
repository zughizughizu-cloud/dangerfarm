import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  User,
  AlertCircle,
  Edit,
  ChevronDown,
} from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    // Track active section for navigation
    const sections = document.querySelectorAll("section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "Chi siamo" },
    { id: "services", label: "Servizi" },
    { id: "gallery", label: "Galleria" },
    { id: "contact", label: "Contatti" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-3xl font-black text-yellow-400 hover:text-yellow-500 transition-colors duration-300"
              >
                Danger<span className="text-red-700">farm</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 text-sm font-semibold transition-colors duration-300 hover:text-red-500 ${
                      activeSection === item.id ? "text-red-500" : "text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-red-500 transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/98 backdrop-blur-md border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-300 hover:text-red-500 w-full text-left ${
                    activeSection === item.id ? "text-red-500" : "text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("../banner.jpg")`,
          }}
        />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Dangerfarm
            </h1>
            <h2 className="text-1xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Nel dubbio... Accelera!💨
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Prima scuola di motocross freestyle del Centro-Sud Italia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-red-600 text-white font-bold py-3 px-8 rounded-full hover:from-yellow-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Prenota una Lezione
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-red-600 text-white font-bold py-3 px-8 rounded-full hover:from-yellow-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Prenota uno Show
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-16 relative">
            Chi siamo
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-20 h-1 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full"></div>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-500">
                Ride with the Best
              </h3>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Dangerfarm è la prima scuola di motocross freestyle del
                  Centro-Sud Italia, fondata dal pilota professionista Ciccio
                  White 24. Con anni di esperienza nelle competizioni e negli
                  show in tutto il mondo, Ciccio porta una competenza
                  ineguagliabile in ogni lezione e spettacolo.
                </p>
                <p>
                  Ci dedichiamo all'insegnamento delle tecniche appropriate
                  enfatizzando la sicurezza e il controllo. Il nostro approccio
                  combina lo sviluppo delle abilità con l'adrenalina pura che
                  rende il freestyle motocross così esilarante.
                </p>
                <p>
                  Che tu voglia apprendere le basi o padroneggiare trick
                  avanzati, Dangerfarm fornisce l'allenamento, l'attrezzatura e
                  l'ambiente per aiutarti a raggiungere i tuoi obiettivi nel
                  motocross.
                </p>
              </div>
            </div>

            <div className="fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="../ciccio1.jpg"
                  alt="Freestyle Motocross Rider"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-16 relative">
            I Nostri Servizi
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-20 h-1 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full"></div>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Lezioni di Motocross",
                description:
                  "Dai principianti ai rider avanzati, i nostri programmi di formazione personalizzati porteranno le tue abilità al livello successivo. Impara tecniche fondamentali o masterizza trick complessi in un ambiente controllato e sicuro.",
                image: "../lezione.png",
                color: "from-yellow-500 to-red-600",
              },
              {
                title: "Spettacoli di Motocross Freestyle",
                description:
                  "Prenota il team di Dangerfarm per uno spettacolo di motocross freestyle indimenticabile al tuo prossimo evento. I nostri piloti professionisti eseguono acrobazie mozzafiato che lasceranno il tuo pubblico a bocca aperta.",
                image: "../spettacolo.png",
                color: "from-yellow-500 to-red-600",
              },
            ].map((service, index) => (
              <div key={index} className="fade-in group">
                <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-500">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className={`w-full bg-gradient-to-r ${service.color} text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      {index === 0 ? "Prenota una Lezione" : "Prenota uno Show"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-16 relative">
            Galleria
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-20 h-1 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full"></div>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              // Example using a local image from public directory:
              {
                image: "../backflip.gif",
                title: "Giro Della Morte",
              },
              {
                image: "../airtricks.gif",
                title: "Air Tricks",
              },
              {
                image: "../Freestyle Training.gif",
                title: "Freestyle Training",
              },
            ].map((item, index) => (
              <div key={index} className="fade-in group relative">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl font-bold">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-16 relative">
            Contatta CiccioWhite24
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-20 h-1 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full"></div>
          </h2>

          <div className="fade-in text-center">
            <div className="bg-gray-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-yellow-500">
                Dettagli di Contatto
              </h3>

              <div className="space-y-6 mb-12">
                <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-300">
                  <Phone className="text-red-500 flex-shrink-0" size={24} />
                  <span className="text-lg">+39 347 304 6537</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-300">
                  <Mail className="text-red-500 flex-shrink-0" size={24} />
                  <span className="text-lg">info@dangerfarm.it</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-300">
                  <MapPin className="text-red-500 flex-shrink-0" size={24} />
                  <a
                    href="https://maps.app.goo.gl/MTgEihfLYU4iBoQ39"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg underline decoration-red-400 hover:text-red-500 transition-colors duration-300 font-semibold"
                  >
                    Strada Comunale Sovero, 10, Putignano BA
                  </a>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-yellow-500">
                I Nostri Social
              </h3>

              <div className="flex justify-center gap-7 mb-12">
                {[
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/_dangerfarm_",
                    label: "Instagram",
                  },
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/dangerfarm",
                    label: "Facebook",
                  },
                  {
                    icon: User,
                    href: "https://www.tiktok.com/@cicciowhite24",
                    label: "TikTok",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-600 p-4 rounded-full transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon
                      size={28}
                      className="text-white group-hover:text-white"
                    />
                  </a>
                ))}
              </div>

              <a
                href="https://wa.me/393473046537?text=Ciao%20Ciccio,%20sono%20interessato%20a%20Dangerfarm!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle size={24} />
                Contattaci su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
            {/* Logo Section */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <img
                src="/logo.jpg"
                alt="Dangerfarm Logo"
                className="h-10 w-auto"
              />
              <div className="text-2xl sm:text-3xl font-black text-yellow-400 whitespace-nowrap">
                Danger<span className="text-red-700">farm</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-left lg:text-center font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center lg:text-left">
            <p className="text-gray-400 text-sm">
              © 2025 Dangerfarm. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
