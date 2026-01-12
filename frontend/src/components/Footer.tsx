import { useState } from "react";

function Footer() {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <>
      <footer className="bg-dark-800 border-t border-dark-500 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-gray-500">
            © 2025 <span className="text-gray-400">Antoine Mathié</span> & <span className="text-gray-400">Paolo Antonini</span>
          </p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLegal(true)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              Mentions légales
            </button>
            <a
              href="https://github.com/SkyVence/groupie-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Modal Mentions Légales */}
      {showLegal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeInBackdrop"
          onClick={() => setShowLegal(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          <div 
            className="relative bg-dark-700 border border-dark-500 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-dark-500">
              <h2 className="text-xl font-bold text-white">Mentions légales</h2>
              <button
                onClick={() => setShowLegal(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[60vh] space-y-4 text-gray-300">
              <section>
                <h3 className="text-white font-semibold mb-2">Éditeurs du site</h3>
                <p>Ce site a été réalisé dans le cadre d'un projet scolaire par :</p>
                <ul className="list-disc list-inside mt-2 text-gray-400">
                  <li>Antoine Mathié</li>
                  <li>Paolo Antonini</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">Hébergement</h3>
                <p className="text-gray-400">
                  Ce site est un projet open source hébergé sur GitHub.
                </p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">Données personnelles</h3>
                <p className="text-gray-400">
                  Ce site ne collecte aucune donnée personnelle. Aucun cookie n'est utilisé.
                </p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">API utilisée</h3>
                <p className="text-gray-400">
                  Les données des artistes proviennent de l'API Groupie Trackers fournie dans le cadre du projet.
                </p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">Propriété intellectuelle</h3>
                <p className="text-gray-400">
                  Les images et informations des artistes sont la propriété de leurs détenteurs respectifs. 
                  Ce site est réalisé à des fins éducatives uniquement.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-dark-500">
              <button
                onClick={() => setShowLegal(false)}
                className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
