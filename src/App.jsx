import { useMemo, useState } from 'react';
import AuthModal from './components/AuthModal/AuthModal.jsx';
import TeamSlider from './components/TeamSlider/TeamSlider.jsx';
import ToolCard from './components/ToolCard/ToolCard.jsx';
import { newcomerTools, popularTools } from './data/tools.js';
import { icon, image } from './lib/assets.js';

export default function App() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [query, setQuery] = useState('');
  const [visibleTools, setVisibleTools] = useState(3);
  const [savedTools, setSavedTools] = useState([]);
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [user, setUser] = useState(() =>
    localStorage.getItem('antools-account'),
  );

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return normalizedQuery
      ? popularTools.filter(
          (tool) =>
            tool.name.toLowerCase().includes(normalizedQuery) ||
            tool.category.toLowerCase().includes(normalizedQuery),
        )
      : popularTools;
  }, [query]);

  function toggleSaved(name) {
    setSavedTools((tools) =>
      tools.includes(name)
        ? tools.filter((tool) => tool !== name)
        : [...tools, name],
    );
  }

  function handleSearch(event) {
    event.preventDefault();
    document.querySelector('.popular')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleNewsletter(event) {
    event.preventDefault();
    setNewsletterMessage('Thanks — you are on the list.');
    event.currentTarget.reset();
  }

  function handleLogout() {
    localStorage.removeItem('antools-account');
    setUser(null);
  }

  return (
    <>
      <header className="header container">
        <a href="#top" className="header__logo logo" aria-label="Antools home">
          <img
            src={icon('named-logo.png')}
            alt="Antools"
            height="38"
            width="140"
          />
        </a>
        <nav className="header__menu" aria-label="Main navigation">
          <ul className="header__menu-list">
            <li className="header__menu-item">
              <a href="#top" className="header__menu-link">
                Home
              </a>
            </li>
            <li className="header__menu-item">
              <button
                className="header__menu-link dropdown__menu-button"
                type="button"
                aria-expanded={isCategoriesOpen}
                onClick={() => setIsCategoriesOpen((open) => !open)}
              >
                <span>Categories</span>
                <svg
                  className="dropdown__chevron"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m1 1.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isCategoriesOpen && (
                <div className="dropdown__menu dropdown__menu--is-open">
                  <a href="#popular" onClick={() => setIsCategoriesOpen(false)}>
                    Design
                  </a>
                  <a href="#popular" onClick={() => setIsCategoriesOpen(false)}>
                    Development
                  </a>
                  <a href="#popular" onClick={() => setIsCategoriesOpen(false)}>
                    Productivity
                  </a>
                </div>
              )}
            </li>
            <li className="header__menu-item">
              <a href="#popular" className="header__menu-link">
                My Collections
                {savedTools.length ? ` (${savedTools.length})` : ''}
              </a>
            </li>
            <li className="header__menu-item">
              <a href="#footer" className="header__menu-link">
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <div className="header__authorization-menu">
          {user ? (
            <div className="header__account">
              <span className="header__account-email" title={user}>
                {user}
              </span>
              <button
                className="header__authorization-menu-button--transparent"
                type="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <ul className="header__authorization-menu-list">
              <li>
                <button
                  className="header__authorization-menu-button--transparent"
                  type="button"
                  onClick={() => setAuthMode('login')}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="header__authorization-menu-button button"
                  type="button"
                  onClick={() => setAuthMode('register')}
                >
                  Sign Up
                </button>
              </li>
            </ul>
          )}
        </div>
      </header>

      <main id="top" className="main">
        <section className="hero container">
          <div className="hero-body">
            <div className="hero-info">
              <h1 className="hero-title">
                Awesome tools for
                <br />
                Designer &amp; Developer<span className="text--ascent">.</span>
              </h1>
              <p className="hero-description">
                Antools is a web collection of paid and free Design and
                Development tools.
              </p>
            </div>
            <div className="hero-actions">
              <form
                className="hero__search-form input-form"
                onSubmit={handleSearch}
              >
                <label className="visually-hidden" htmlFor="search-input">
                  Search tools
                </label>
                <input
                  className="input-form__input"
                  type="search"
                  placeholder="Find more than 430+ tools…"
                  id="search-input"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setVisibleTools(3);
                  }}
                />
                <button className="input-form__button button" type="submit">
                  Search
                </button>
              </form>
              <ul className="hero-socials-list">
                <li className="hero-socials-item">
                  <a
                    href="https://facebook.com/"
                    className="hero-social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={icon('facebook-logo.png')} alt="Facebook" />
                  </a>
                </li>
                <li className="hero-socials-item">
                  <a
                    href="https://instagram.com/"
                    className="hero-social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={icon('instagram-logo.png')} alt="Instagram" />
                  </a>
                </li>
                <li className="hero-socials-item">
                  <a
                    href="https://twitter.com/"
                    className="hero-social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={icon('twitter-logo.png')} alt="Twitter" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <img
            src={image('hero-Illustration.png')}
            alt="Abstract illustration of a designer at work"
            className="hero-banner"
            width="600"
            height="900"
          />
        </section>

        <section className="popular container" id="popular">
          <header className="popular__header">
            <h2 className="popular__title">Most Popular Tools</h2>
            <p className="popular__description">
              Tools for the best Designers and Developers
              <br />
              most popularly used in the world
            </p>
          </header>
          <div className="popular__body">
            <ul className="popular__list">
              {filteredTools.slice(0, visibleTools).map((tool) => (
                <li className="popular__item" key={tool.name}>
                  <ToolCard
                    tool={tool}
                    savedTools={savedTools}
                    onToggleSaved={toggleSaved}
                  />
                </li>
              ))}
            </ul>
            {filteredTools.length === 0 && (
              <p className="popular__empty">
                No tools found. Try a different search.
              </p>
            )}
          </div>
          {visibleTools < filteredTools.length && (
            <button
              className="popular__pagination-button button button--transparent"
              type="button"
              onClick={() => setVisibleTools((amount) => amount + 3)}
            >
              Load more
            </button>
          )}
        </section>

        <section className="trusted-brands container">
          <h2 className="trusted-brands__title">
            Trusted more than 150+ brand
          </h2>
          <ul className="trusted-brands__list">
            {[
              ['microsoft-logo.png', 'Microsoft', 'https://www.microsoft.com/'],
              ['google-logo.png', 'Google', 'https://www.google.com/'],
              ['named-slack-logo.png', 'Slack', 'https://slack.com/'],
              ['wordpress-logo.png', 'WordPress', 'https://wordpress.com/'],
            ].map(([iconName, name, url]) => (
              <li className="trusted-brands__item" key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="trusted-brands__link icon--transparent"
                >
                  <img src={icon(iconName)} alt={name} height="50" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="new-tools container">
          <div className="new-tools__header">
            <h2 className="new-tools__title">Newcomer Tools</h2>
            <p className="new-tools__description">
              See the latest recommended tools from reliable designers and
              developers.
            </p>
            <a href="#popular" className="new-tools__button button">
              Explore more
            </a>
          </div>
          <div className="new-tools__body">
            <ul className="new-tools__list">
              {newcomerTools.map((tool) => (
                <li className="new-tools__item" key={tool.name}>
                  <ToolCard
                    tool={tool}
                    savedTools={savedTools}
                    onToggleSaved={toggleSaved}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <TeamSlider />

        <section className="join-us container">
          <h2 className="join-us__title">Become a contributor?</h2>
          <p className="join-us__description">
            Join us and get tips &amp; tricks to become a great
            <br />
            Designer and Developer
          </p>
          <form
            className="join-us__mail-form input-form"
            onSubmit={handleNewsletter}
          >
            <label className="visually-hidden" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              className="input-form__input"
              type="email"
              placeholder="Enter your email..."
              id="newsletter-email"
              required
            />
            <button className="input-form__button button" type="submit">
              Join Us
            </button>
          </form>
          {newsletterMessage && (
            <p className="join-us__message" role="status">
              {newsletterMessage}
            </p>
          )}
        </section>
      </main>

      <footer className="footer container" id="footer">
        <div className="footer__header">
          <a href="#top" className="footer__logo logo">
            <img
              src={icon('named-logo.png')}
              alt="Antools"
              height="38"
              width="140"
            />
          </a>
          <p>Copyright {new Date().getFullYear()}. Antools</p>
          <p className="footer__description">
            Antools is a web collection of information on paid or free Design
            and Development tools.
          </p>
        </div>
        <div className="footer__columns">
          <div className="footer__column">
            <h3 className="footer__column-title">Contact Us</h3>
            <ul className="footer__column-list">
              <li>
                <a href="tel:+621987463" className="footer__column-link">
                  +621987463
                </a>
              </li>
              <li>M Building, No.10 A</li>
              <li>
                <a
                  href="mailto:antools@awesome.com"
                  className="footer__column-link"
                >
                  antools@awesome.com
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__column">
            <h3 className="footer__column-title">Categories</h3>
            <ul className="footer__column-list">
              <li>Design</li>
              <li>Development</li>
            </ul>
          </div>
          <div className="footer__column">
            <h3 className="footer__column-title">Company Info</h3>
            <ul className="footer__column-list">
              <li>
                <a href="#top" className="footer__column-link text--ascent">
                  About Us
                </a>
              </li>
              <li>Our Partners</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </footer>
      {authMode && (
        <AuthModal
          mode={authMode}
          onAuthenticated={setUser}
          onClose={() => setAuthMode(null)}
          onSwitch={setAuthMode}
        />
      )}
    </>
  );
}
