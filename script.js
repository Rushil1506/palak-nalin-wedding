(() => {
  const cfg = window.INVITE_CONFIG || {};
  const $ = (s) => document.querySelector(s);

  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[c]));

  // ============================================================
  // Helpers
  // ============================================================

  function applyTheme() {
    const root = document.documentElement;

    Object.entries(cfg.colors || {}).forEach(([key, value]) => {
      root.style.setProperty('--' + key, value);
    });

    if (cfg.assets?.background) {
      document.body.style.setProperty(
        '--invite-background',
        `url("${cfg.assets.background}")`
      );
    }
  }

  function applyMetadata() {
    const title = `${cfg.bride} & ${cfg.groom} — Wedding Invitation`;
    const description =
      `${cfg.dateLabel} · ${cfg.city} · ${cfg.venue}`;

    const baseUrl = (cfg.siteUrl || window.location.href)
      .replace(/#.*$/, '')
      .replace(/\/$/, '');

    const pageUrl = `${baseUrl}/`;

    const shareImage = cfg.assets?.shareCard
      ? new URL(
          cfg.assets.shareCard,
          `${baseUrl}/`
        ).href
      : '';

    document.title = title;

    const setMeta = (selector, attribute, value) => {
      const el = document.querySelector(selector);

      if (el) {
        el.setAttribute(attribute, value);
      }
    };

    setMeta(
      'meta[name="description"]',
      'content',
      description
    );

    setMeta(
      'meta[property="og:title"]',
      'content',
      title
    );

    setMeta(
      'meta[property="og:description"]',
      'content',
      description
    );

    setMeta(
      'meta[property="og:image"]',
      'content',
      shareImage
    );

    setMeta(
      'meta[property="og:url"]',
      'content',
      pageUrl
    );

    const canonical =
      document.querySelector('link[rel="canonical"]');

    if (canonical) {
      canonical.setAttribute(
        'href',
        pageUrl
      );
    }
  }

  // ============================================================
  // SVG Decorations
  // ============================================================

  function svgDefsHTML() {
    return `<svg
      class="svg-defs"
      aria-hidden="true"
      focusable="false"
    >
      <defs>

        <symbol id="orn-sprig" viewBox="0 0 120 200">
          <path
            d="M60 196 C52 140 66 90 58 10"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
          />

          <path
            d="M58 40 C40 34 30 20 28 6 C44 10 54 24 58 40 Z"
            fill="currentColor"
          />

          <path
            d="M59 70 C78 64 90 50 92 34 C74 40 63 54 59 70 Z"
            fill="currentColor"
          />

          <path
            d="M56 105 C37 99 26 84 24 68 C42 74 53 89 56 105 Z"
            fill="currentColor"
          />

          <path
            d="M58 138 C77 132 89 118 91 102 C73 108 62 122 58 138 Z"
            fill="currentColor"
          />

          <path
            d="M55 168 C38 163 28 150 26 136 C42 141 52 153 55 168 Z"
            fill="currentColor"
          />
        </symbol>

        <symbol id="orn-bloom" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="currentColor"
          />

          <g
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M50 12 C58 26 58 38 50 44 C42 38 42 26 50 12 Z"
            />
            <path
              d="M50 88 C42 74 42 62 50 56 C58 62 58 74 50 88 Z"
            />
            <path
              d="M12 50 C26 42 38 42 44 50 C38 58 26 58 12 50 Z"
            />
            <path
              d="M88 50 C74 58 62 58 56 50 C62 42 74 42 88 50 Z"
            />
          </g>
        </symbol>

        <symbol id="orn-divider" viewBox="0 0 240 24">
          <line
            x1="0"
            y1="12"
            x2="96"
            y2="12"
            stroke="currentColor"
            stroke-width="1.4"
          />

          <line
            x1="144"
            y1="12"
            x2="240"
            y2="12"
            stroke="currentColor"
            stroke-width="1.4"
          />

          <path
            d="M120 3 L129 12 L120 21 L111 12 Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          />

          <circle
            cx="120"
            cy="12"
            r="2.2"
            fill="currentColor"
          />

          <circle
            cx="102"
            cy="12"
            r="1.8"
            fill="currentColor"
          />

          <circle
            cx="138"
            cy="12"
            r="1.8"
            fill="currentColor"
          />
        </symbol>

      </defs>
    </svg>`;
  }

  const sprig = (cls) =>
    `<svg
      class="${cls}"
      aria-hidden="true"
      focusable="false"
    >
      <use href="#orn-sprig"></use>
    </svg>`;

  const dividerHTML = () =>
    `<svg
      class="divider reveal"
      aria-hidden="true"
      focusable="false"
    >
      <use href="#orn-divider"></use>
    </svg>`;

  // ============================================================
  // Extra Styles
  // ============================================================

  function enhancementStylesHTML() {
    return `
      <style id="wedding-enhancements">

        /* ------------------------------------------------------
           Hero CTA
           ------------------------------------------------------ */

        .hero__begin {
          appearance: none;
          border: 1px solid rgba(194, 161, 92, .65);
          background: rgba(255, 253, 248, .84);
          color: var(--ink, #43403a);
          min-height: 48px;
          padding: 12px 28px;
          margin-top: 30px;
          border-radius: 999px;
          font-family: var(--sans, sans-serif);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .24em;
          text-transform: uppercase;
          box-shadow: 0 12px 34px rgba(90, 72, 40, .10);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition:
            transform .25s ease,
            background-color .25s ease,
            box-shadow .25s ease;
        }

        .hero__begin:hover {
          transform: translateY(-2px);
          background: rgba(255, 253, 248, .96);
          box-shadow: 0 16px 40px rgba(90, 72, 40, .15);
        }

        .hero__begin:active {
          transform: translateY(0);
        }

        /* ------------------------------------------------------
           NP Navigation Logo
           ------------------------------------------------------ */

        .nav__logo {
          width: 52px;
          height: 52px;
          object-fit: contain;
          display: block;
          transition: transform .3s ease;
        }

        .nav__brand:hover .nav__logo {
          transform: scale(1.04);
        }

        @media (max-width: 700px) {
          .nav__logo {
            width: 42px;
            height: 42px;
          }

          .hero__begin {
            min-height: 46px;
            padding: 11px 22px;
            font-size: 10px;
          }
        }

        /* ------------------------------------------------------
           Invitation Card Section
           ------------------------------------------------------ */

        .invitation-card-section {
          position: relative;
          overflow: hidden;
          padding: clamp(52px, 8vw, 100px) 18px;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(255,255,255,.07) 0 1px,
              transparent 1.5px
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(255,255,255,.05) 0 1px,
              transparent 1.5px
            ),
            #06162f;
          background-size: 18px 18px, 23px 23px, auto;
        }

        .invitation-card-section::before,
        .invitation-card-section::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          pointer-events: none;
          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.035),
              transparent 68%
            );
        }

        .invitation-card-section::before {
          top: -130px;
          left: -130px;
        }

        .invitation-card-section::after {
          bottom: -140px;
          right: -120px;
        }

        .invitation-card__wrapper {
          width: min(100%, 900px);
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .invitation-card {
          position: relative;
          overflow: hidden;
          padding: clamp(48px, 6vw, 74px)
                   clamp(24px, 7vw, 88px)
                   clamp(42px, 6vw, 64px);
          background:
            radial-gradient(
              circle at 20% 15%,
              rgba(194,161,92,.06) 0 1px,
              transparent 1.5px
            ),
            radial-gradient(
              circle at 80% 85%,
              rgba(194,161,92,.05) 0 1px,
              transparent 1.5px
            ),
            #faf4e7;
          background-size: 12px 12px, 14px 14px, auto;
          color: #0c2854;
          border-radius: 24px;
          border: 2px solid #c2a15c;
          box-shadow:
            0 0 0 5px #faf4e7,
            0 0 0 7px rgba(194,161,92,.9),
            0 24px 80px rgba(0,0,0,.32);
          text-align: center;
        }

        .invitation-card::before {
          content: "";
          position: absolute;
          inset: 8px;
          pointer-events: none;
          border: 1px solid rgba(194,161,92,.75);
          border-radius: 16px;
        }

        .invitation-card__corner {
          position: absolute;
          width: 118px;
          height: 118px;
          color: #78906b;
          opacity: .95;
          pointer-events: none;
        }

        .invitation-card__corner--tl {
          top: 6px;
          left: 8px;
          transform: rotate(-20deg);
        }

        .invitation-card__corner--tr {
          top: 6px;
          right: 8px;
          transform: scaleX(-1) rotate(-20deg);
        }

        .invitation-card__corner--bl {
          bottom: 8px;
          left: 8px;
          transform: scaleY(-1) rotate(-20deg);
        }

        .invitation-card__corner--br {
          bottom: 8px;
          right: 8px;
          transform: scale(-1) rotate(-20deg);
        }

        .invitation-card__om {
          margin: 0 auto 10px;
          font-family: Georgia, serif;
          font-size: clamp(34px, 6vw, 52px);
          line-height: 1;
          color: #ca4261;
        }

        .invitation-card__ganesh {
          margin: 0;
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(22px, 4vw, 33px);
          color: #ce4561;
          line-height: 1.2;
        }

        .invitation-card__host {
          margin-top: clamp(28px, 4vw, 38px);
          font-family: Georgia, serif;
          font-size: clamp(20px, 3.5vw, 29px);
          line-height: 1.35;
          color: #07285b;
        }

        .invitation-card__host span {
          display: block;
        }

        .invitation-card__host-note {
          margin: 24px auto 0;
          max-width: 590px;
          font-family: Georgia, serif;
          font-size: clamp(15px, 2.2vw, 20px);
          line-height: 1.55;
          font-style: italic;
          color: #cb3e5c;
        }

        .invitation-card__grand {
          margin: 7px 0 0;
          font-family: var(--sans, sans-serif);
          font-weight: 500;
          letter-spacing: .27em;
          font-size: 11px;
          color: #0c2854;
        }

        .invitation-card__name {
          margin: 20px 0 0;
          font-family: var(--serif, Georgia, serif);
          font-size: clamp(37px, 7vw, 63px);
          line-height: .98;
          font-weight: 500;
          color: #0a2b63;
        }

        .invitation-card__relationship {
          margin: 12px 0 0;
          font-family: Georgia, serif;
          font-size: clamp(14px, 2vw, 18px);
          font-style: italic;
          color: #d24763;
        }

        .invitation-card__parents {
          margin: 3px 0 0;
          font-family: Georgia, serif;
          font-size: clamp(17px, 2.8vw, 22px);
          line-height: 1.35;
          color: #0a2b63;
        }

        .invitation-card__with {
          margin: 15px 0 5px;
          font-family: var(--sans, sans-serif);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .42em;
          color: #d6a746;
        }

        .invitation-card__divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 23px auto 18px;
          width: min(340px, 75%);
        }

        .invitation-card__divider::before,
        .invitation-card__divider::after {
          content: "";
          height: 1px;
          flex: 1;
          background: #d8ad50;
        }

        .invitation-card__divider-mark {
          width: 9px;
          height: 9px;
          transform: rotate(45deg);
          border: 1px solid #d8ad50;
          position: relative;
        }

        .invitation-card__divider-mark::after {
          content: "";
          position: absolute;
          inset: 2px;
          background: #d8ad50;
        }

        .invitation-card__details {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: clamp(12px, 4vw, 32px);
          margin: 32px auto 0;
          max-width: 620px;
        }

        .invitation-card__detail {
          font-family: Georgia, serif;
          font-size: clamp(15px, 2.3vw, 19px);
          line-height: 1.45;
          color: #0a2b63;
        }

        .invitation-card__detail em {
          display: block;
          margin-top: 2px;
          font-size: .88em;
          color: #c94461;
        }

        .invitation-card__detail-divider {
          width: 38px;
          height: 1px;
          background: #d8ad50;
        }

        .invitation-card__monogram {
          display: block;
          width: 86px;
          height: 86px;
          object-fit: contain;
          margin: 27px auto 0;
        }

        .invitation-card__bottom-space {
          height: 2px;
        }

        @media (max-width: 600px) {
          .invitation-card-section {
            padding-left: 12px;
            padding-right: 12px;
          }

          .invitation-card {
            padding:
              42px
              20px
              42px;
            border-radius: 18px;
            box-shadow:
              0 0 0 4px #faf4e7,
              0 0 0 6px rgba(194,161,92,.9),
              0 18px 55px rgba(0,0,0,.30);
          }

          .invitation-card__corner {
            width: 83px;
            height: 83px;
          }

          .invitation-card__host {
            margin-top: 28px;
          }

          .invitation-card__details {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .invitation-card__detail-divider {
            width: 32px;
            margin: 2px auto;
          }

          .invitation-card__monogram {
            width: 76px;
            height: 76px;
          }
        }

        /* ------------------------------------------------------
           Music Control
           ------------------------------------------------------ */

        .music-control {
          position: fixed;
          z-index: 80;
          right: 20px;
          bottom: 20px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          min-height: 42px;
          padding: 9px 15px;
          border: 1px solid rgba(194,161,92,.60);
          border-radius: 999px;
          background: rgba(255,253,248,.92);
          color: var(--ink, #43403a);
          box-shadow: 0 12px 30px rgba(45,35,20,.14);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          font-family: var(--sans, sans-serif);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: .16em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            background-color .25s ease;
        }

        .music-control:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(45,35,20,.18);
        }

        .music-control__icon {
          font-size: 14px;
          line-height: 1;
        }

        .music-control.is-playing {
          background: rgba(255,253,248,.98);
        }

        @media (max-width: 600px) {
          .music-control {
            right: 12px;
            bottom: 12px;
            min-height: 40px;
            padding: 8px 13px;
          }
        }

      </style>
    `;
  }

  // ============================================================
  // Navigation
  // ============================================================

  function navHTML() {
    return `<header
      class="nav"
      id="siteNav"
    >
      <a
        class="nav__brand"
        href="#home"
        data-testid="nav-brand"
        aria-label="${esc(cfg.bride)} and ${esc(cfg.groom)} — back to top"
      >
        <img
          class="nav__logo"
          src="assets/favicon.png"
          alt="${esc(cfg.bride)} and ${esc(cfg.groom)}"
        >
      </a>

      <nav
        class="nav__links"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          data-testid="nav-home"
        >
          Home
        </a>

        <a
          href="#story"
          data-testid="nav-story"
        >
          Our Story
        </a>

        <a
          href="#events"
          data-testid="nav-events"
        >
          Events
        </a>

        <a
          href="#venue"
          data-testid="nav-venue"
        >
          Venue
        </a>
      </nav>

      <button
        class="nav__burger"
        id="menuBtn"
        data-testid="mobile-menu-button"
        aria-label="Open menu"
        aria-expanded="false"
        aria-controls="mobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <div
      class="mobile-menu"
      id="mobileMenu"
      data-testid="mobile-menu"
    >
      <nav aria-label="Mobile navigation">
        <a
          href="#home"
          data-testid="mobile-nav-home"
        >
          Home
        </a>

        <a
          href="#story"
          data-testid="mobile-nav-story"
        >
          Our Story
        </a>

        <a
          href="#events"
          data-testid="mobile-nav-events"
        >
          Events
        </a>

        <a
          href="#venue"
          data-testid="mobile-nav-venue"
        >
          Venue
        </a>
      </nav>
    </div>`;
  }

  // ============================================================
  // Hero
  // ============================================================

  function heroHTML() {
    return `<section
      class="hero"
      id="home"
    >
      ${
        cfg.assets?.background
          ? `<div
              class="hero__photo"
              aria-hidden="true"
            ></div>`
          : ''
      }

      ${sprig('hero__sprig hero__sprig--tl')}
      ${sprig('hero__sprig hero__sprig--tr')}
      ${sprig('hero__sprig hero__sprig--bl')}
      ${sprig('hero__sprig hero__sprig--br')}

      <div
        class="hero__frame"
        aria-hidden="true"
      ></div>

      <div class="hero__inner">

        <p
          class="hero__eyebrow hero-anim"
          style="--d:.15s"
        >
          ${esc(cfg.heroEyebrow)}
        </p>

        <h1
          class="hero__names hero-anim"
          style="--d:.35s"
        >
          <span class="hero__name">
            ${esc(cfg.bride)}
          </span>

          <span
            class="hero__amp"
            aria-hidden="true"
          >
            &amp;
          </span>

          <span class="hero__name">
            ${esc(cfg.groom)}
          </span>
        </h1>

        <p
          class="hero__invite hero-anim"
          style="--d:.55s"
        >
          ${esc(cfg.heroInvite)}
        </p>

        <svg
          class="hero__divider hero-anim"
          style="--d:.7s"
          aria-hidden="true"
          focusable="false"
        >
          <use href="#orn-divider"></use>
        </svg>

        <p
          class="hero__date hero-anim"
          style="--d:.85s"
        >
          ${esc(cfg.dateLabel)}
          <span>·</span>
          ${esc(String(cfg.city).toUpperCase())}
        </p>

        <p
          class="hero__line hero-anim"
          style="--d:1s"
        >
          ${esc(cfg.heroLine)}
        </p>

        <button
          type="button"
          class="hero__begin hero-anim"
          id="beginInvitation"
          style="--d:1.15s"
          data-testid="begin-invitation-button"
        >
          Begin the Celebration
        </button>

      </div>

      <a
        class="hero__scroll hero-anim"
        style="--d:1.4s"
        href="#story"
        data-testid="hero-scroll-indicator"
        aria-label="Scroll to our story"
      >
        <span class="hero__scroll-text">
          Scroll
        </span>

        <span
          class="hero__scroll-line"
          aria-hidden="true"
        ></span>
      </a>
    </section>`;
  }

  // ============================================================
  // Our Story
  // ============================================================

  function storyHTML() {
    const imgs =
      (cfg.gallery || []).filter(Boolean);

    const family =
      cfg.family || {};

    const brideParents =
      (family.brideParents || [])
        .filter(Boolean)
        .join(' & ');

    const groomParents =
      (family.groomParents || [])
        .filter(Boolean)
        .join(' & ');

    return `<section
      class="section story"
      id="story"
    >
      ${sprig('section-sprig story__sprig')}

      <div class="section-head reveal">

        <p class="section-eyebrow">
          Our Story
        </p>

        <h2 class="section-title">
          ${esc(cfg.bride)}
          <em>&amp;</em>
          ${esc(cfg.groom)}
        </h2>

        ${dividerHTML()}

      </div>

      <div class="story__grid">

        <div class="story__text reveal">

          <p class="story__names">
            ${esc(cfg.brideFull)}
            <span class="story__amp">
              &amp;
            </span>
            ${esc(cfg.groomFull)}
          </p>

          <p class="story__message">
            ${esc(cfg.storyMessage)}
          </p>

          <p class="story__date">
            ${esc(cfg.dateLabel)}
            ·
            ${esc(cfg.city)}
          </p>

          ${
            brideParents || groomParents
              ? `
                <div class="story__blessings">
                  <p>With the blessings of</p>

                  ${
                    brideParents
                      ? `<span>${esc(brideParents)}</span>`
                      : ''
                  }

                  ${
                    groomParents
                      ? `<span>${esc(groomParents)}</span>`
                      : ''
                  }
                </div>
              `
              : ''
          }

        </div>

        <div
          class="polaroid reveal${imgs.length ? '' : ' polaroid--empty'}"
          id="polaroid"
          data-testid="gallery"
        >

          ${
            imgs.length
              ? `
                <img
                  id="galleryImg"
                  src="${esc(imgs[0])}"
                  alt="${esc(cfg.bride)} and ${esc(cfg.groom)}"
                  loading="lazy"
                  decoding="async"
                  onerror="
                    this.onerror=null;
                    this.closest('.polaroid').classList.add('polaroid--empty');
                    this.remove();
                  "
                >
              `
              : ''
          }

          <div
            class="polaroid__placeholder"
            aria-hidden="true"
          >
            <svg>
              <use href="#orn-bloom"></use>
            </svg>

            <span>
              ${esc(cfg.bride)}
              &amp;
              ${esc(cfg.groom)}
            </span>
          </div>

          ${
            imgs.length > 1
              ? `
                <button
                  class="poly-nav poly-prev"
                  id="galleryPrev"
                  data-testid="gallery-prev"
                  aria-label="Previous photo"
                >
                  ‹
                </button>

                <button
                  class="poly-nav poly-next"
                  id="galleryNext"
                  data-testid="gallery-next"
                  aria-label="Next photo"
                >
                  ›
                </button>

                <div
                  class="poly-dots"
                  aria-label="Gallery navigation"
                >
                  ${imgs
                    .map(
                      (_, i) =>
                        `<button
                          class="poly-dot${i === 0 ? ' active' : ''}"
                          data-i="${i}"
                          data-testid="gallery-dot-${i}"
                          aria-label="Photo ${i + 1}"
                        ></button>`
                    )
                    .join('')}
                </div>
              `
              : ''
          }

        </div>
      </div>
    </section>`;
  }

  // ============================================================
  // Invitation Card
  // ============================================================

  function invitationCardHTML() {
    return `<section
      class="invitation-card-section"
      id="invitation-card"
    >

      <div class="invitation-card__wrapper">

        <div
          class="invitation-card reveal"
          data-testid="invitation-card"
        >

          ${sprig(
            'invitation-card__corner invitation-card__corner--tl'
          )}

          ${sprig(
            'invitation-card__corner invitation-card__corner--tr'
          )}

          ${sprig(
            'invitation-card__corner invitation-card__corner--bl'
          )}

          ${sprig(
            'invitation-card__corner invitation-card__corner--br'
          )}

          <p class="invitation-card__om">
            ॐ
          </p>

          <p class="invitation-card__ganesh">
            श्री गणेशाय नमः:
          </p>

          <div class="invitation-card__host">
            <span>Mr. Bimal Jindal</span>
            <span>(Late) Mrs. Murti Jindal</span>
          </div>

          <p class="invitation-card__host-note">
            feels immense pleasure in inviting you<br>
            on the auspicious occasion of the wedding of her beloved
          </p>

          <p class="invitation-card__grand">
            GRAND DAUGHTER
          </p>

          <h2 class="invitation-card__name">
            Palak Jindal
          </h2>

          <p class="invitation-card__relationship">
            daughter of
          </p>

          <p class="invitation-card__parents">
            Mrs. Nisha Jindal and<br>
            Mr. Vinod Jindal
          </p>

          <p class="invitation-card__with">
            WITH
          </p>

          <h2 class="invitation-card__name">
            Nalin Chandra Goel
          </h2>

          <p class="invitation-card__relationship">
            son of
          </p>

          <p class="invitation-card__parents">
            Dr. Namita Chandra and<br>
            Dr. Shaleen Chandra
          </p>

          <div class="invitation-card__divider">
            <span class="invitation-card__divider-mark"></span>
          </div>

          <div class="invitation-card__details">

            <div class="invitation-card__detail">
              Thursday, 3rd December 2026
              <em>
                7:30 PM ONWARDS
              </em>
            </div>

            <span
              class="invitation-card__detail-divider"
              aria-hidden="true"
            ></span>

            <div class="invitation-card__detail">
              The Hilton
              <em>
                Lucknow
              </em>
            </div>

          </div>

          <img
            class="invitation-card__monogram"
            src="assets/favicon.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          >

          <div class="invitation-card__bottom-space"></div>

        </div>
      </div>
    </section>`;
  }

  // ============================================================
  // Timeline
  // ============================================================

  function timelineHTML() {
    const events =
      cfg.events || [];

    if (!events.length) {
      return '';
    }

    return `<section
      class="section timeline"
      id="timeline"
    >

      <div class="section-head reveal">

        <p class="section-eyebrow">
          The Journey
        </p>

        <h2 class="section-title">
          Wedding Timeline
        </h2>

        ${dividerHTML()}

      </div>

      <ol class="timeline__list">

        ${events
          .map(
            (e, i) => `
              <li
                class="timeline__item reveal"
                data-testid="timeline-${esc(
                  e.theme || i
                )}"
              >

                <div
                  class="timeline__marker"
                  aria-hidden="true"
                >
                  <span>
                    ${i + 1}
                  </span>
                </div>

                <div
                  class="timeline__card timeline__card--${esc(
                    e.theme || 'default'
                  )}"
                >

                  <p class="timeline__day">
                    ${esc(e.day)}
                  </p>

                  <h3 class="timeline__name">
                    ${esc(e.name)}
                  </h3>

                  <p class="timeline__meta">
                    ${esc(e.date)}
                    ${
                      e.time
                        ? ` · ${esc(e.time)}`
                        : ''
                    }
                  </p>

                </div>

              </li>
            `
          )
          .join('')}

      </ol>
    </section>`;
  }

  // ============================================================
  // Event Cards
  // ============================================================

  function eventCardHTML(e) {
    const venue =
      e.venue || '';

    return `<article
      class="event-card event-card--${esc(
        e.theme || 'default'
      )} reveal"
      data-testid="event-${esc(
        (
          e.theme ||
          e.name ||
          ''
        ).toLowerCase()
      )}"
    >

      <figure class="event-card__media">

        <div
          class="event-card__motif"
          aria-hidden="true"
        >
          <svg>
            <use href="#orn-bloom"></use>
          </svg>
        </div>

        ${
          e.image
            ? `
              <img
                src="${esc(e.image)}"
                alt="${esc(e.name)} celebration"
                loading="lazy"
                decoding="async"
                onerror="
                  this.onerror=null;
                  this.remove();
                "
              >
            `
            : ''
        }

      </figure>

      <div class="event-card__body">

        <p class="event-card__day">
          ${esc(e.day)}
          ·
          ${esc(e.date)}
        </p>

        <h3 class="event-card__name">
          ${esc(e.name)}
        </h3>

        <svg
          class="event-card__divider"
          aria-hidden="true"
          focusable="false"
        >
          <use href="#orn-divider"></use>
        </svg>

        ${
          e.time
            ? `
              <p class="event-card__time">
                ${esc(e.time)}
              </p>
            `
            : ''
        }

        ${
          venue
            ? `
              <p class="event-card__venue">
                ${esc(venue)}
              </p>
            `
            : ''
        }

        ${
          e.description
            ? `
              <p class="event-card__desc">
                ${esc(e.description)}
              </p>
            `
            : ''
        }

      </div>
    </article>`;
  }

  function eventsHTML() {
    const events =
      cfg.events || [];

    if (!events.length) {
      return '';
    }

    return `<section
      class="section events"
      id="events"
    >

      <div class="section-head reveal">

        <p class="section-eyebrow">
          The Festivities
        </p>

        <h2 class="section-title">
          Celebrations
        </h2>

        ${dividerHTML()}

      </div>

      <div class="events__grid">
        ${events
          .map(eventCardHTML)
          .join('')}
      </div>

    </section>`;
  }

  // ============================================================
  // Countdown
  // ============================================================

  function countdownHTML() {
    return `<section
      class="section countdown-section"
      id="countdown"
    >

      ${sprig(
        'section-sprig countdown__sprig countdown__sprig--l'
      )}

      ${sprig(
        'section-sprig countdown__sprig countdown__sprig--r'
      )}

      <div class="section-head reveal">

        <p class="section-eyebrow">
          Save the Date
        </p>

        <h2 class="section-title">
          Counting Down
        </h2>

        ${dividerHTML()}

      </div>

      <div
        class="countdown__box reveal"
        id="countdownBox"
        data-testid="countdown"
        role="timer"
        aria-label="Countdown to the wedding"
      >

        <div class="countdown__cell">
          <strong
            data-unit="days"
            data-testid="countdown-days"
          >
            --
          </strong>
          <small>Days</small>
        </div>

        <div class="countdown__cell">
          <strong
            data-unit="hours"
            data-testid="countdown-hours"
          >
            --
          </strong>
          <small>Hours</small>
        </div>

        <div class="countdown__cell">
          <strong
            data-unit="minutes"
            data-testid="countdown-minutes"
          >
            --
          </strong>
          <small>Minutes</small>
        </div>

        <div class="countdown__cell">
          <strong
            data-unit="seconds"
            data-testid="countdown-seconds"
          >
            --
          </strong>
          <small>Seconds</small>
        </div>

      </div>

      <p
        class="countdown__done reveal"
        id="countdownDone"
        data-testid="countdown-done"
        hidden
      >
        The celebration has begun!
      </p>

      <p class="countdown__target reveal">
        ${esc(cfg.dateLabel)}
        ·
        ${esc(cfg.venue)}
      </p>

    </section>`;
  }

  // ============================================================
  // Venue
  // ============================================================

  function venueHTML() {
    const query =
      encodeURIComponent(
        `${cfg.venue}, ${cfg.venueAddress}`
      );

    const embedSrc =
      cfg.mapEmbedUrl ||
      `https://www.google.com/maps?q=${query}&output=embed`;

    const directionsHref =
      `https://www.google.com/maps/search/?api=1&query=${query}`;

    return `<section
      class="section venue"
      id="venue"
    >

      <div class="section-head reveal">

        <p class="section-eyebrow">
          Where
        </p>

        <h2 class="section-title">
          The Venue
        </h2>

        ${dividerHTML()}

      </div>

      <div class="venue__grid">

        <div class="venue__info reveal">

          <h3
            class="venue__name"
            data-testid="venue-name"
          >
            ${esc(cfg.venue)}
          </h3>

          <p class="venue__address">
            ${esc(cfg.venueAddress)}
          </p>

          <p class="venue__desc">
            ${esc(cfg.venueDescription)}
          </p>

          <a
            class="venue__btn"
            data-testid="get-directions-button"
            href="${directionsHref}"
            target="_blank"
            rel="noopener"
          >
            Get Directions

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>

        </div>

        <div
          class="venue__map reveal"
          data-testid="venue-map"
        >

          <iframe
            src="${embedSrc}"
            title="Map showing ${esc(cfg.venue)}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>

        </div>

      </div>

    </section>`;
  }

  // ============================================================
  // Footer
  // ============================================================

  function footerHTML() {
    return `<footer class="footer">

      <svg
        class="footer__bloom"
        aria-hidden="true"
        focusable="false"
      >
        <use href="#orn-bloom"></use>
      </svg>

      <p class="footer__love">
        With love,
      </p>

      <p class="footer__names">
        ${esc(cfg.bride)}
        <em>&amp;</em>
        ${esc(cfg.groom)}
      </p>

      <p class="footer__date">
        ${esc(cfg.dateLabel)}
      </p>

    </footer>`;
  }

  // ============================================================
  // Music
  // ============================================================

  function musicHTML() {
    const musicSrc =
      cfg.assets?.music ||
      cfg.music ||
      '';

    if (!musicSrc) {
      return '';
    }

    return `
      <button
        class="music-control"
        id="musicControl"
        data-testid="music-control"
        type="button"
        aria-pressed="false"
        aria-label="Play music"
      >
        <span
          class="music-control__icon"
          id="musicControlIcon"
          aria-hidden="true"
        >
          ♪
        </span>

        <span id="musicControlLabel">
          Play Music
        </span>
      </button>

      <audio
        id="audio"
        src="${esc(musicSrc)}"
        loop
        preload="auto"
      ></audio>
    `;
  }

  function setupMusic() {
    const audio =
      $('#audio');

    const button =
      $('#musicControl');

    const label =
      $('#musicControlLabel');

    const icon =
      $('#musicControlIcon');

    const beginButton =
      $('#beginInvitation');

    const story =
      $('#story');

    if (!audio) {
      return;
    }

    audio.volume = 0.65;

    let started =
      !audio.paused;

    let storyReached =
      false;

    const updateControl =
      () => {
        if (!button) {
          return;
        }

        if (!audio.paused) {
          button.classList.add(
            'is-playing'
          );

          button.setAttribute(
            'aria-pressed',
            'true'
          );

          button.setAttribute(
            'aria-label',
            'Pause music'
          );

          if (label) {
            label.textContent =
              'Pause Music';
          }

          if (icon) {
            icon.textContent =
              '♫';
          }
        } else {
          button.classList.remove(
            'is-playing'
          );

          button.setAttribute(
            'aria-pressed',
            'false'
          );

          button.setAttribute(
            'aria-label',
            'Play music'
          );

          if (label) {
            label.textContent =
              'Play Music';
          }

          if (icon) {
            icon.textContent =
              '♪';
          }
        }
      };

    const startMusic =
      async () => {
        if (!audio) {
          return false;
        }

        if (!audio.paused) {
          started = true;
          updateControl();
          return true;
        }

        try {
          await audio.play();

          started = true;

          updateControl();

          return true;
        } catch {
          updateControl();
          return false;
        }
      };

    const toggleMusic =
      async () => {
        try {
          if (audio.paused) {
            await audio.play();
          } else {
            audio.pause();
          }

          updateControl();
        } catch {
          updateControl();
        }
      };

    if (button) {
      button.addEventListener(
        'click',
        toggleMusic
      );
    }

    audio.addEventListener(
      'play',
      updateControl
    );

    audio.addEventListener(
      'pause',
      updateControl
    );

    /*
     * The main hero button:
     * 1. Starts the music.
     * 2. Smoothly scrolls to Our Story.
     *
     * Because this is triggered by a click, browsers generally
     * permit the audio playback.
     */
    if (beginButton) {
      beginButton.addEventListener(
        'click',
        async () => {
          await startMusic();

          const target =
            document.querySelector(
              '#story'
            );

          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      );
    }

    /*
     * If somebody ignores the hero button and simply scrolls,
     * attempt to start music when Our Story appears.
     */
    if (
      story &&
      'IntersectionObserver' in window
    ) {
      const storyObserver =
        new IntersectionObserver(
          entries => {
            entries.forEach(
              entry => {
                if (
                  entry.isIntersecting
                ) {
                  storyReached =
                    true;

                  startMusic();

                  storyObserver.disconnect();
                }
              }
            );
          },
          {
            threshold: 0.20
          }
        );

      storyObserver.observe(
        story
      );
    }

    /*
     * Fallback for browsers that reject autoplay.
     * Once the user interacts with the page after
     * reaching Our Story, try again.
     */
    const retryAfterInteraction =
      () => {
        if (
          storyReached &&
          !started &&
          audio.paused
        ) {
          startMusic();
        }
      };

    document.addEventListener(
      'pointerdown',
      retryAfterInteraction,
      {
        passive: true,
        once: true
      }
    );

    document.addEventListener(
      'keydown',
      retryAfterInteraction,
      {
        passive: true,
        once: true
      }
    );

    document.addEventListener(
      'touchstart',
      retryAfterInteraction,
      {
        passive: true,
        once: true
      }
    );

    updateControl();
  }

  // ============================================================
  // Gallery
  // ============================================================

  function setupGallery() {
    const imgs =
      (cfg.gallery || [])
        .filter(Boolean);

    if (imgs.length <= 1) {
      return;
    }

    const img =
      $('#galleryImg');

    const dots =
      document.querySelectorAll(
        '.poly-dot'
      );

    let idx = 0;

    const show =
      (n) => {
        idx =
          (n + imgs.length) %
          imgs.length;

        if (img) {
          img.src =
            imgs[idx];
        }

        dots.forEach(
          (dot, i) => {
            dot.classList.toggle(
              'active',
              i === idx
            );
          }
        );
      };

    const prev =
      $('#galleryPrev');

    const next =
      $('#galleryNext');

    if (prev) {
      prev.addEventListener(
        'click',
        () => {
          show(idx - 1);
        }
      );
    }

    if (next) {
      next.addEventListener(
        'click',
        () => {
          show(idx + 1);
        }
      );
    }

    dots.forEach(
      dot => {
        dot.addEventListener(
          'click',
          () => {
            show(
              Number(
                dot.dataset.i
              )
            );
          }
        );
      }
    );

    const el =
      $('#polaroid');

    if (!el) {
      return;
    }

    let sx =
      null;

    el.addEventListener(
      'touchstart',
      e => {
        sx =
          e.touches[0].clientX;
      },
      {
        passive: true
      }
    );

    el.addEventListener(
      'touchend',
      e => {
        if (sx === null) {
          return;
        }

        const dx =
          e.changedTouches[0].clientX -
          sx;

        if (
          Math.abs(dx) >
          40
        ) {
          show(
            idx +
            (dx < 0
              ? 1
              : -1)
          );
        }

        sx =
          null;
      },
      {
        passive: true
      }
    );
  }

  // ============================================================
  // Reveal Animations
  // ============================================================

  function setupRevealAnimations() {
    const elements =
      document.querySelectorAll(
        '.reveal'
      );

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      elements.forEach(
        el =>
          el.classList.add(
            'visible'
          )
      );

      return;
    }

    if (
      !(
        'IntersectionObserver' in
        window
      )
    ) {
      elements.forEach(
        el =>
          el.classList.add(
            'visible'
          )
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        entries => {
          entries.forEach(
            entry => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  'visible'
                );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            '0px 0px -8% 0px'
        }
      );

    elements.forEach(
      el =>
        observer.observe(el)
    );
  }

  // ============================================================
  // Navigation
  // ============================================================

  function setupNavigation() {
    const nav =
      $('#siteNav');

    const menuBtn =
      $('#menuBtn');

    const menu =
      $('#mobileMenu');

    const onScroll =
      () => {
        if (nav) {
          nav.classList.toggle(
            'nav--scrolled',
            window.scrollY > 24
          );
        }
      };

    onScroll();

    window.addEventListener(
      'scroll',
      onScroll,
      {
        passive: true
      }
    );

    const closeMenu =
      () => {
        document.body.classList.remove(
          'menu-open'
        );

        if (menuBtn) {
          menuBtn.setAttribute(
            'aria-expanded',
            'false'
          );

          menuBtn.setAttribute(
            'aria-label',
            'Open menu'
          );
        }
      };

    if (menuBtn) {
      menuBtn.addEventListener(
        'click',
        () => {
          const open =
            document.body.classList.toggle(
              'menu-open'
            );

          menuBtn.setAttribute(
            'aria-expanded',
            String(open)
          );

          menuBtn.setAttribute(
            'aria-label',
            open
              ? 'Close menu'
              : 'Open menu'
          );
        }
      );
    }

    if (menu) {
      menu
        .querySelectorAll('a')
        .forEach(
          link => {
            link.addEventListener(
              'click',
              closeMenu
            );
          }
        );
    }

    document.addEventListener(
      'keydown',
      e => {
        if (
          e.key === 'Escape' &&
          document.body.classList.contains(
            'menu-open'
          )
        ) {
          closeMenu();

          if (menuBtn) {
            menuBtn.focus();
          }
        }
      }
    );
  }

  // ============================================================
  // Render
  // ============================================================

  function render() {
    applyTheme();
    applyMetadata();

    const sec =
      cfg.sections || {};

    const show =
      (key) =>
        sec[key] !== false;

    const app =
      $('#app');

    if (!app) {
      return;
    }

    app.innerHTML = `

      ${svgDefsHTML()}

      ${enhancementStylesHTML()}

      ${navHTML()}

      <main>

        ${
          show('hero')
            ? heroHTML()
            : ''
        }

        ${
          show('story')
            ? storyHTML()
            : ''
        }

        ${
          show('invitationCard')
            ? invitationCardHTML()
            : invitationCardHTML()
        }

        ${
          show('timeline')
            ? timelineHTML()
            : ''
        }

        ${
          show('events')
            ? eventsHTML()
            : ''
        }

        ${
          show('countdown')
            ? countdownHTML()
            : ''
        }

        ${
          show('venue')
            ? venueHTML()
            : ''
        }

      </main>

      ${
        show('footer')
          ? footerHTML()
          : ''
      }

      ${musicHTML()}

    `;

    if (
      show('countdown')
    ) {
      setupCountdown();
    }

    setupMusic();
    setupGallery();
    setupRevealAnimations();
    setupNavigation();
  }

  // ============================================================
  // Countdown
  // ============================================================

  function setupCountdown() {
    const target =
      new Date(
        cfg.weddingDateTime ||
        `${cfg.dateISO}T20:00:00+05:30`
      ).getTime();

    const box =
      $('#countdownBox');

    if (
      !box ||
      Number.isNaN(target)
    ) {
      return;
    }

    const cells = {
      days:
        box.querySelector(
          '[data-unit="days"]'
        ),

      hours:
        box.querySelector(
          '[data-unit="hours"]'
        ),

      minutes:
        box.querySelector(
          '[data-unit="minutes"]'
        ),

      seconds:
        box.querySelector(
          '[data-unit="seconds"]'
        )
    };

    const done =
      $('#countdownDone');

    let timer =
      null;

    const tick =
      () => {
        const diff =
          target -
          Date.now();

        if (diff <= 0) {
          Object.values(
            cells
          ).forEach(
            cell => {
              if (cell) {
                cell.textContent =
                  '00';
              }
            }
          );

          if (done) {
            done.hidden =
              false;
          }

          if (timer) {
            clearInterval(
              timer
            );
          }

          return;
        }

        const vals = {
          days:
            Math.floor(
              diff /
              86400000
            ),

          hours:
            Math.floor(
              diff /
              3600000
            ) % 24,

          minutes:
            Math.floor(
              diff /
              60000
            ) % 60,

          seconds:
            Math.floor(
              diff /
              1000
            ) % 60
        };

        Object.entries(
          vals
        ).forEach(
          ([key, value]) => {
            if (
              cells[key]
            ) {
              cells[key]
                .textContent =
                String(
                  value
                ).padStart(
                  2,
                  '0'
                );
            }
          }
        );
      };

    tick();

    timer =
      setInterval(
        tick,
        1000
      );
  }

  // ============================================================
  // Start
  // ============================================================

  render();
})();
