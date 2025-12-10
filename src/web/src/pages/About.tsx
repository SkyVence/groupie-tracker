import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>À Propos de Nous</h1>
        <p className="hero-subtitle">
          Découvrez l'équipe derrière Groupie Tracker
        </p>
      </div>

      <div className="about-content">
        {/* Section Projet */}
        <section className="about-section">
          <div className="section-icon">🎵</div>
          <h2>Notre Projet</h2>
          <div className="content-card">
            <p>
              Groupie Tracker est une application web qui permet de découvrir
              et suivre vos artistes préférés. Explorez leurs concerts,
              leur histoire et restez informé de leurs prochaines dates de tournée.
            </p>
            <p>
              Ce projet a été créé avec passion en utilisant des technologies
              modernes comme React, TypeScript et Go.
            </p>
          </div>
        </section>

        {/* Section Équipe */}
        <section className="about-section">
          <div className="section-icon">👥</div>
          <h2>Notre Équipe</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">AM</div>
              <h3>Antoine Mathié</h3>
              <p className="team-role">Développeur Full-Stack</p>
              <div className="team-description">
                <p>
                  [Parle de toi ici - tes compétences, ce que tu aimes dans
                  le dev, tes technologies préférées...]
                </p>
              </div>
              <div className="team-social">
                <a href="#" className="social-link">
                  💼 LinkedIn
                </a>
                <a href="#" className="social-link">
                  🐙 GitHub
                </a>
              </div>
            </div>

            <div className="team-card">
              <div className="team-avatar">PA</div>
              <h3>Paolo Antonini</h3>
              <p className="team-role">Développeur Full-Stack</p>
              <div className="team-description">
                <p>
                  [Parle de toi ici - tes compétences, ce que tu aimes dans
                  le dev, tes technologies préférées...]
                </p>
              </div>
              <div className="team-social">
                <a href="#" className="social-link">
                  💼 LinkedIn
                </a>
                <a href="#" className="social-link">
                  🐙 GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section Technologies */}
        <section className="about-section">
          <div className="section-icon">⚡</div>
          <h2>Technologies Utilisées</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <span className="tech-icon">⚛️</span>
              <h4>React</h4>
              <p>Interface utilisateur moderne</p>
            </div>
            <div className="tech-card">
              <span className="tech-icon">📘</span>
              <h4>TypeScript</h4>
              <p>Typage statique robuste</p>
            </div>
            <div className="tech-card">
              <span className="tech-icon">🔵</span>
              <h4>Go</h4>
              <p>Backend performant</p>
            </div>
            <div className="tech-card">
              <span className="tech-icon">🎨</span>
              <h4>CSS3</h4>
              <p>Design responsive</p>
            </div>
          </div>
        </section>

        {/* Section Mission */}
        <section className="about-section">
          <div className="section-icon">🎯</div>
          <h2>Notre Mission</h2>
          <div className="content-card mission-card">
            <ul className="mission-list">
              <li>
                <span className="bullet">✨</span>
                <div>
                  <strong>Connecter les fans et les artistes</strong>
                  <p>
                    Créer un pont entre la musique et les mélomanes du monde
                    entier
                  </p>
                </div>
              </li>
              <li>
                <span className="bullet">🚀</span>
                <div>
                  <strong>Innovation constante</strong>
                  <p>
                    Utiliser les dernières technologies pour une expérience
                    optimale
                  </p>
                </div>
              </li>
              <li>
                <span className="bullet">🎵</span>
                <div>
                  <strong>Passion pour la musique</strong>
                  <p>
                    Célébrer tous les genres musicaux et toutes les cultures
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Section Contact */}
        <section className="about-section">
          <div className="section-icon">📧</div>
          <h2>Contactez-nous</h2>
          <div className="content-card contact-card">
            <p>
              Des questions ? Des suggestions ? N'hésitez pas à nous contacter !
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>contact@groupietracker.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🐙</span>
                <a href="#">GitHub Repository</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
