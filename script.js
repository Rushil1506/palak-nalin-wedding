(() => {
  /*
   * Site theme is explicit and dark by default.
   * The website should not inherit Android/Brave dark-mode behavior.
   */
  const savedTheme =
    localStorage.getItem('palak-theme');

  const initialTheme =
    savedTheme === 'light'
      ? 'light'
      : 'dark';

  document.documentElement.dataset.theme =
    initialTheme;

  document.documentElement.style.colorScheme =
    initialTheme;

  const cfg = window.INVITE_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));

  // ============================================================
  // THEME
  // ============================================================

  function applyTheme() {
    const root = document.documentElement;

    /*
     * These variables have deliberate light/dark values in styles.css.
     * Do not write the old config palette inline because inline custom
     * properties would override the theme selectors.
     */
    const themeControlledKeys = new Set([
      'ivory',
      'cream',
      'warmWhite',
      'blush',
      'blushDeep',
      'gold',
      'goldDeep',
      'sage',
      'leaf',
      'ink',
      'inkSoft',
      'hairline',
      'shadow-soft',
      'shadow-card'
    ]);

    Object.entries(cfg.colors || {}).forEach(([key, value]) => {
      if (!themeControlledKeys.has(key)) {
        root.style.setProperty(`--${key}`, value);
      }
    });

    const background =
      cfg.assets?.background ||
      cfg.background ||
      '';

    if (background) {
      document.body.style.setProperty(
        '--invite-background',
        `url("${background}")`
      );
    }
  }

  // ============================================================
  // METADATA
  // ============================================================

  function applyMetadata() {
    const title =
      `${cfg.bride || 'Palak'} & ${cfg.groom || 'Nalin'} — Wedding Invitation`;

    const description =
      `${cfg.dateLabel || ''} · ${cfg.city || ''} · ${cfg.venue || ''}`;

    const baseUrl = (
      cfg.siteUrl ||
      window.location.href
    )
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

    const setMeta = (
      selector,
      attribute,
      value
    ) => {
      const element =
        document.querySelector(selector);

      if (element) {
        element.setAttribute(
          attribute,
          value
        );
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
      document.querySelector(
        'link[rel="canonical"]'
      );

    if (canonical) {
      canonical.setAttribute(
        'href',
        pageUrl
      );
    }
  }

  // ============================================================
  // SVG DECORATIONS
  // ============================================================

  function svgDefsHTML() {
    return `
      <svg
        class="svg-defs"
        aria-hidden="true"
        focusable="false"
      >
        <defs>

          <symbol
            id="orn-sprig"
            viewBox="0 0 120 200"
          >
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

          <symbol
            id="orn-bloom"
            viewBox="0 0 100 100"
          >
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
              <path d="M50 12 C58 26 58 38 50 44 C42 38 42 26 50 12 Z"/>
              <path d="M50 88 C42 74 42 62 50 56 C58 62 58 74 50 88 Z"/>
              <path d="M12 50 C26 42 38 42 44 50 C38 58 26 58 12 50 Z"/>
              <path d="M88 50 C74 58 62 58 56 50 C62 42 74 42 88 50 Z"/>
            </g>
          </symbol>

          <symbol
            id="orn-divider"
            viewBox="0 0 240 24"
          >
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
      </svg>
    `;
  }

  const sprig = (classes) => `
    <svg
      class="${classes}"
      aria-hidden="true"
      focusable="false"
    >
      <use href="#orn-sprig"></use>
    </svg>
  `;

  const dividerHTML = () => `
    <svg
      class="divider reveal"
      aria-hidden="true"
      focusable="false"
    >
      <use href="#orn-divider"></use>
    </svg>
  `;

  // ============================================================
  // EXTRA CSS
  // ============================================================

  function installEnhancementStyles() {
    if (
      document.getElementById(
        'wedding-enhancement-styles'
      )
    ) {
      return;
    }

    const style =
      document.createElement('style');

    style.id =
      'wedding-enhancement-styles';

    style.textContent = `

      /* ======================================================
         NP LOGO
         ====================================================== */

      .nav__logo {
        width: 52px;
        height: 52px;
        display: block;
        object-fit: contain;
      }

      @media (max-width: 700px) {
        .nav__logo {
          width: 42px;
          height: 42px;
        }
      }

      /* ======================================================
         HERO BUTTON
         ====================================================== */

      .hero__begin {
        appearance: none;
        border: 1px solid rgba(194,161,92,.72);
        background: var(--button-bg, rgba(255,253,248,.90));
        color: var(--button-text, var(--ink, #43403a));
        min-height: 48px;
        padding: 12px 28px;
        margin-top: 30px;
        border-radius: 999px;
        font-family: var(--sans, sans-serif);
        font-size: 10px;
        font-weight: 500;
        letter-spacing: .22em;
        text-transform: uppercase;
        box-shadow:
          0 12px 35px rgba(80,60,30,.10);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition:
          transform .25s ease,
          box-shadow .25s ease,
          background-color .25s ease,
          color .25s ease;
      }

      .hero__begin:hover {
        transform: translateY(-2px);
        background: var(--button-bg-hover, rgba(255,253,248,.98));
        box-shadow:
          0 16px 42px rgba(80,60,30,.16);
      }

      .hero__begin:active {
        transform: translateY(0);
      }

      @media (max-width: 600px) {
        .hero__begin {
          min-height: 46px;
          padding: 11px 22px;
          font-size: 9px;
        }
      }

      /* ======================================================
         INVITATION CARD
         ====================================================== */

      .invitation-card-section {
        position: relative;
        overflow: hidden;
        padding:
          clamp(55px, 8vw, 100px)
          14px;
        background:
          radial-gradient(
            circle at 15% 20%,
            rgba(255,255,255,.025) 0 1px,
            transparent 1.5px
          ),
          radial-gradient(
            circle at 80% 70%,
            rgba(255,255,255,.018) 0 1px,
            transparent 1.5px
          ),
          var(--invite-section-bg, #1c1a17);
        background-size:
          18px 18px,
          23px 23px,
          auto;
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
        padding:
          clamp(48px, 6vw, 75px)
          clamp(22px, 7vw, 86px)
          clamp(44px, 6vw, 68px);

        background:
          radial-gradient(
            circle at 20% 15%,
            rgba(194,161,92,.045) 0 1px,
            transparent 1.5px
          ),
          radial-gradient(
            circle at 80% 85%,
            rgba(194,161,92,.035) 0 1px,
            transparent 1.5px
          ),
          var(--invite-card-bg, #24211c);

        background-size:
          12px 12px,
          14px 14px,
          auto;

        color: var(--invite-card-text, #f2ede2);
        text-align: center;
        border: 2px solid #c2a15c;
        border-radius: 24px;

        box-shadow:
          0 0 0 5px var(--invite-card-edge, #1c1a17),
          0 0 0 7px rgba(194,161,92,.92),
          0 24px 80px rgba(0,0,0,.34);
      }

      .invitation-card::before {
        content: "";
        position: absolute;
        inset: 8px;
        border:
          1px solid rgba(194,161,92,.74);
        border-radius: 16px;
        pointer-events: none;
      }

      .invitation-card__corner {
        position: absolute;
        width: 120px;
        height: 120px;
        color: var(--invite-green, #738c68);
        opacity: .94;
        pointer-events: none;
      }

      .invitation-card__corner--tl {
        top: 5px;
        left: 5px;
        transform: rotate(-20deg);
      }

      .invitation-card__corner--tr {
        top: 5px;
        right: 5px;
        transform:
          scaleX(-1)
          rotate(-20deg);
      }

      .invitation-card__corner--bl {
        bottom: 5px;
        left: 5px;
        transform:
          scaleY(-1)
          rotate(-20deg);
      }

      .invitation-card__corner--br {
        bottom: 5px;
        right: 5px;
        transform:
          scale(-1)
          rotate(-20deg);
      }

      .invitation-card__om {
        margin:
          0 auto 9px;
        font-family:
          Georgia,
          "Times New Roman",
          serif;
        font-size:
          clamp(36px, 6vw, 52px);
        line-height: 1;
        color: var(--invite-red, #ce4060);
      }

      .invitation-card__ganesh {
        margin: 0;
        font-family:
          var(--serif, Georgia, serif);
        font-size:
          clamp(23px, 4vw, 34px);
        color: var(--invite-red, #ce4060);
        line-height: 1.2;
      }

      .invitation-card__host {
        margin-top:
          clamp(28px, 4vw, 38px);
        font-family:
          Georgia,
          "Times New Roman",
          serif;
        font-size:
          clamp(20px, 3.5vw, 29px);
        line-height: 1.35;
        color: var(--invite-card-text, #f2ede2);
      }

      .invitation-card__host span {
        display: block;
      }

      .invitation-card__host-note {
        margin:
          24px auto 0;
        max-width: 610px;
        font-family:
          Georgia,
          "Times New Roman",
          serif;
        font-size:
          clamp(15px, 2.2vw, 20px);
        line-height: 1.55;
        font-style: italic;
        color: var(--invite-red, #ca3c5a);
      }

      .invitation-card__grand {
        margin:
          7px 0 0;
        font-family:
          var(--sans, sans-serif);
        font-weight: 500;
        letter-spacing:
          .27em;
        font-size: 10px;
        color: var(--invite-card-muted, #e0d7c7);
      }

      .invitation-card__name {
        margin:
          20px 0 0;
        font-family:
          var(--serif, Georgia, serif);
        font-size:
          clamp(38px, 7vw, 64px);
        line-height: .98;
        font-weight: 500;
        color: var(--invite-card-text, #f2ede2);
      }

      .invitation-card__relationship {
        margin:
          12px 0 0;
        font-family:
          Georgia,
          "Times New Roman",
          serif;
        font-size:
          clamp(14px, 2vw, 18px);
        font-style: italic;
        color: var(--invite-red, #d04661);
      }

      .invitation-card__parents {
        margin:
          3px 0 0;
        font-family:
          Georgia,
          "Times New Roman",
          serif;
        font-size:
          clamp(17px, 2.8vw, 22px);
        line-height: 1.35;
        color: var(--invite-card-text, #f2ede2);
      }

      .invitation-card__with {
        margin:
          15px 0 5px;
        font-family:
          var(--sans, sans-serif);
        font-size: 10px;
        font-weight: 600;
        letter-spacing:
          .42em;
        color: var(--invite-gold, #d2a33e);
      }

      .invitation-card__divider {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        width: min(350px, 76%);
        margin:
          24px auto 18px;
      }

      .invitation-card__divider::before,
      .invitation-card__divider::after {
        content: "";
        height: 1px;
        flex: 1;
        background: var(--invite-line, #d8ad50);
      }

      .invitation-card__divider-mark {
        width: 10px;
        height: 10px;
        border:
          1px solid var(--invite-line, #d8ad50);
        transform: rotate(45deg);
        position: relative;
      }

      .invitation-card__divider-mark::after {
        content: "";
        position: absolute;
        inset: 2px;
        background: var(--invite-line, #d8ad50);
      }

      .invitation-card__details {
        display: grid;
        grid-template-columns:
          1fr
          auto
          1fr;
        align-items: center;
        gap:
          clamp(12px, 4vw, 32px);
        max-width: 640px;
        margin:
          31px auto 0;
      }

      .invitation-card__detail {
        font-family:
          Georgia,
          "Times New Roman",
          serif;
        font-size:
          clamp(15px, 2.3vw, 19px);
        line-height: 1.45;
        color: var(--invite-card-text, #f2ede2);
      }

      .invitation-card__detail em {
        display: block;
        margin-top: 2px;
        font-size: .88em;
        color: var(--invite-red, #c84460);
      }

      .invitation-card__detail-divider {
        width: 38px;
        height: 1px;
        background: var(--invite-line, #d8ad50);
      }

      .invitation-card__monogram {
        display: block;
        width: 88px;
        height: 88px;
        object-fit: contain;
        margin:
          26px auto 0;
      }

      @media (max-width: 600px) {
        .invitation-card-section {
          padding-left: 10px;
          padding-right: 10px;
        }

        .invitation-card {
          padding:
            42px 18px 42px;
          border-radius: 18px;
          box-shadow:
            0 0 0 4px var(--invite-card-edge, #1c1a17),
            0 0 0 6px rgba(194,161,92,.92),
            0 18px 55px rgba(0,0,0,.30);
        }

        .invitation-card__corner {
          width: 84px;
          height: 84px;
        }

        .invitation-card__details {
          grid-template-columns: 1fr;
          gap: 12px;
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

      /* ======================================================
         MUSIC CONTROL
         ====================================================== */

      .music-control {
        position: fixed;
        z-index: 100;
        right: 18px;
        bottom: 18px;

        width: 44px;
        height: 44px;

        display: grid;
        place-items: center;

        border:
          1px solid rgba(194,161,92,.68);

        border-radius: 50%;

        background:
          var(--music-bg, rgba(255,253,248,.94));

        color:
          var(--music-text, var(--ink, #43403a));

        box-shadow:
          0 12px 30px rgba(45,35,20,.15);

        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);

        cursor: pointer;

        transition:
          transform .25s ease,
          box-shadow .25s ease,
          background-color .25s ease,
          color .25s ease;
      }

      .music-control:hover {
        transform: translateY(-2px);
        box-shadow:
          0 16px 36px rgba(45,35,20,.20);
      }

      .music-control__icon {
        font-size: 15px;
        line-height: 1;
      }

      .music-control.is-playing {
        box-shadow:
          0 0 0 4px rgba(194,161,92,.12),
          0 12px 32px rgba(45,35,20,.18);
      }

      @media (max-width: 600px) {
        .music-control {
          width: 42px;
          height: 42px;
          right: 12px;
          bottom: 12px;
        }
      }

    `;

    document.head.appendChild(style);
  }

  // ============================================================
  // NAVIGATION
  // ============================================================

  function navHTML() {
    return `
      <header
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
          type="button"
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
      </div>
    `;
  }

  // ============================================================
  // HERO
  // ============================================================

  function heroHTML() {
    return `
      <section
        class="hero"
        id="home"
      >

        ${
          cfg.assets?.background
            ? `
              <div
                class="hero__photo"
                aria-hidden="true"
              ></div>
            `
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
    class="hero__weds"
    aria-hidden="true"
  >
    weds
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
            ${esc(
              String(
                cfg.city || ''
              ).toUpperCase()
            )}
          </p>

          <p
            class="hero__line hero-anim"
            style="--d:1s"
          >
            ${esc(cfg.heroLine)}
          </p>

          <div
            class="hero__nalaks hero-anim"
            style="--d:1.08s"
            aria-label="NALAKS"
          >
            <img
              class="hero__nalaks-logo hero__nalaks-logo--dark"
              src="${esc(cfg.assets?.nalaksWhiteLogo || 'assets/nalaks-white-logo.webp')}"
              alt="NALAKS"
              decoding="async"
            >
            <img
              class="hero__nalaks-logo hero__nalaks-logo--light"
              src="${esc(cfg.assets?.nalaksBlueLogo || 'assets/nalaks-blue-logo.webp')}"
              alt="NALAKS"
              decoding="async"
            >
          </div>

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

      </section>
    `;
  }

  // ============================================================
  // OUR STORY
  // ============================================================

  function storyHTML() {
    const images =
      (cfg.gallery || [])
        .filter(Boolean);

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

    return `
      <section
        class="section story"
        id="story"
      >

        ${sprig(
          'section-sprig story__sprig'
        )}

        <div
          class="section-head reveal"
        >

          <p
            class="section-eyebrow"
          >
            Our Story
          </p>

          <h2
            class="section-title"
          >
            ${esc(cfg.bride)}
            <em>&amp;</em>
            ${esc(cfg.groom)}
          </h2>

          ${dividerHTML()}

        </div>

        <div class="story__grid">

          <div
            class="story__text reveal"
          >

            <p
              class="story__names"
            >
              ${esc(cfg.brideFull)}

              <span
                class="story__amp"
              >
                &amp;
              </span>

              ${esc(cfg.groomFull)}
            </p>

            <p
              class="story__message"
            >
              ${esc(cfg.storyMessage)}
            </p>

            <p
              class="story__date"
            >
              ${esc(cfg.dateLabel)}
              ·
              ${esc(cfg.city)}
            </p>

            ${
              brideParents ||
              groomParents
                ? `
                  <div
                    class="story__blessings"
                  >

                    <p>
                      With the blessings of
                    </p>

                    ${
                      brideParents
                        ? `
                          <span>
                            ${esc(brideParents)}
                          </span>
                        `
                        : ''
                    }

                    ${
                      groomParents
                        ? `
                          <span>
                            ${esc(groomParents)}
                          </span>
                        `
                        : ''
                    }

                  </div>
                `
                : ''
            }

          </div>

          <div
            class="polaroid reveal${
              images.length
                ? ''
                : ' polaroid--empty'
            }"
            id="polaroid"
            data-testid="gallery"
          >

            ${
              images.length
                ? `
                  <img
                    id="galleryImg"
                    src="${esc(images[0])}"
                    alt="${esc(
                      cfg.bride
                    )} and ${esc(
                      cfg.groom
                    )}"
                    loading="lazy"
                    decoding="async"
                    onerror="
                      this.onerror=null;
                      this.closest('.polaroid')
                        .classList.add('polaroid--empty');
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
              images.length > 1
                ? `
                  <button
                    class="poly-nav poly-prev"
                    id="galleryPrev"
                    data-testid="gallery-prev"
                    aria-label="Previous photo"
                    type="button"
                  >
                    ‹
                  </button>

                  <button
                    class="poly-nav poly-next"
                    id="galleryNext"
                    data-testid="gallery-next"
                    aria-label="Next photo"
                    type="button"
                  >
                    ›
                  </button>

                  <div
                    class="poly-dots"
                    aria-label="Gallery navigation"
                  >

                    ${images
                      .map(
                        (_, index) => `
                          <button
                            class="poly-dot${
                              index === 0
                                ? ' active'
                                : ''
                            }"
                            data-i="${index}"
                            data-testid="gallery-dot-${index}"
                            aria-label="Photo ${
                              index + 1
                            }"
                            type="button"
                          ></button>
                        `
                      )
                      .join('')}

                  </div>
                `
                : ''
            }

          </div>

        </div>

      </section>
    `;
  }

  // ============================================================
  // INVITATION CARD
  // ============================================================

  function invitationCardHTML() {
    const family =
      cfg.family || {};

    const grandparents =
      family.brideGrandparents || [
        'Mr. Bimal Jindal',
        '(Late) Mrs. Murti Jindal'
      ];

    const brideParents =
      family.brideParents || [
        'Mrs. Nisha Jindal',
        'Mr. Vinod Jindal'
      ];

    const groomParents =
      family.groomParents || [
        'Dr. Namita Chandra',
        'Dr. Shaleen Chandra'
      ];

    return `
      <section
        class="invitation-card-section"
        id="invitation-card"
      >

        <div
          class="invitation-card__wrapper"
        >

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

            <p
              class="invitation-card__om"
            >
              ॐ
            </p>

            <p
              class="invitation-card__ganesh"
            >
              श्री गणेशाय नमः:
            </p>

            <div
              class="invitation-card__host"
            >

              ${grandparents
                .map(
                  (name) => `
                    <span>
                      ${esc(name)}
                    </span>
                  `
                )
                .join('')}

            </div>

            <p
              class="invitation-card__host-note"
            >
              feels immense pleasure in inviting you
              <br>
              on the auspicious occasion of the wedding
              of her beloved
            </p>

            <p
              class="invitation-card__grand"
            >
              GRAND DAUGHTER
            </p>

            <h2
              class="invitation-card__name"
            >
              ${esc(cfg.brideFull)}
            </h2>

            <p
              class="invitation-card__relationship"
            >
              daughter of
            </p>

            <p
              class="invitation-card__parents"
            >
              ${esc(brideParents[0])}
              and
              <br>
              ${esc(brideParents[1])}
            </p>

            <p
              class="invitation-card__with"
            >
              WITH
            </p>

            <h2
              class="invitation-card__name"
            >
              ${esc(cfg.groomFull)}
            </h2>

            <p
              class="invitation-card__relationship"
            >
              son of
            </p>

            <p
              class="invitation-card__parents"
            >
              ${esc(groomParents[0])}
              and
              <br>
              ${esc(groomParents[1])}
            </p>

            <div
              class="invitation-card__divider"
            >
              <span
                class="invitation-card__divider-mark"
              ></span>
            </div>

            <div
              class="invitation-card__details"
            >

              <div
                class="invitation-card__detail"
              >
                Thursday, 3rd December 2026

                <em>
                  7:30 PM ONWARDS
                </em>
              </div>

              <span
                class="invitation-card__detail-divider"
                aria-hidden="true"
              ></span>

              <div
                class="invitation-card__detail"
              >
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

          </div>

        </div>

      </section>
    `;
  }

  // ============================================================
  // TIMELINE
  // ============================================================

  function timelineHTML() {
    const events =
      cfg.events || [];

    if (!events.length) {
      return '';
    }

    return `
      <section
        class="section timeline"
        id="timeline"
      >

        <div
          class="section-head reveal"
        >

          <p
            class="section-eyebrow"
          >
            The Journey
          </p>

          <h2
            class="section-title"
          >
            Wedding Timeline
          </h2>

          ${dividerHTML()}

        </div>

        <ol
          class="timeline__list"
        >

          ${events
            .map(
              (event, index) => `
                <li
                  class="timeline__item reveal"
                  data-testid="timeline-${
                    esc(
                      event.theme ||
                      index
                    )
                  }"
                >

                  <div
                    class="timeline__marker"
                    aria-hidden="true"
                  >
                    <span>
                      ${index + 1}
                    </span>
                  </div>

                  <div
                    class="timeline__card timeline__card--${esc(
                      event.theme ||
                      'default'
                    )}"
                  >

                    <p
                      class="timeline__day"
                    >
                      ${esc(event.day)}
                    </p>

                    <h3
                      class="timeline__name"
                    >
                      ${esc(event.name)}
                    </h3>

                    <p
                      class="timeline__meta"
                    >
                      ${esc(event.date)}
                      ${
                        event.time
                          ? ` · ${esc(
                              event.time
                            )}`
                          : ''
                      }
                    </p>

                  </div>

                </li>
              `
            )
            .join('')}

        </ol>

      </section>
    `;
  }

  // ============================================================
  // EVENT CARDS
  // ============================================================

  function eventCardHTML(event) {
    return `
      <article
        class="event-card event-card--${esc(
          event.theme ||
          'default'
        )} reveal"
        data-testid="event-${esc(
          (
            event.theme ||
            event.name ||
            ''
          ).toLowerCase()
        )}"
      >

        <figure
          class="event-card__media"
        >

          <div
            class="event-card__motif"
            aria-hidden="true"
          >
            <svg>
              <use href="#orn-bloom"></use>
            </svg>
          </div>

          ${
            event.image
              ? `
                <img
                  src="${esc(event.image)}"
                  alt="${esc(
                    event.name
                  )} celebration"
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

        <div
          class="event-card__body"
        >

          <p
            class="event-card__day"
          >
            ${esc(event.day)}
            ·
            ${esc(event.date)}
          </p>

          <h3
            class="event-card__name"
          >
            ${esc(event.name)}
          </h3>

          <svg
            class="event-card__divider"
            aria-hidden="true"
            focusable="false"
          >
            <use href="#orn-divider"></use>
          </svg>

          ${
            event.time
              ? `
                <p
                  class="event-card__time"
                >
                  ${esc(event.time)}
                </p>
              `
              : ''
          }

          ${
            event.venue
              ? `
                <p
                  class="event-card__venue"
                >
                  ${esc(event.venue)}
                </p>
              `
              : ''
          }

          ${
            event.description
              ? `
                <p
                  class="event-card__desc"
                >
                  ${esc(
                    event.description
                  )}
                </p>
              `
              : ''
          }

        </div>

      </article>
    `;
  }

  function eventsHTML() {
    const events =
      cfg.events || [];

    if (!events.length) {
      return '';
    }

    return `
      <section
        class="section events"
        id="events"
      >

        <div
          class="section-head reveal"
        >

          <p
            class="section-eyebrow"
          >
            The Festivities
          </p>

          <h2
            class="section-title"
          >
            Celebrations
          </h2>

          ${dividerHTML()}

        </div>

        <div
          class="events__grid"
        >
          ${events
            .map(eventCardHTML)
            .join('')}
        </div>

      </section>
    `;
  }

  // ============================================================
  // COUNTDOWN
  // ============================================================

  function countdownHTML() {
    return `
      <section
        class="section countdown-section"
        id="countdown"
      >

        ${sprig(
          'section-sprig countdown__sprig countdown__sprig--l'
        )}

        ${sprig(
          'section-sprig countdown__sprig countdown__sprig--r'
        )}

        <div
          class="section-head reveal"
        >

          <p
            class="section-eyebrow"
          >
            Save the Date
          </p>

          <h2
            class="section-title"
          >
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

          <div
            class="countdown__cell"
          >
            <strong
              data-unit="days"
              data-testid="countdown-days"
            >
              --
            </strong>
            <small>Days</small>
          </div>

          <div
            class="countdown__cell"
          >
            <strong
              data-unit="hours"
              data-testid="countdown-hours"
            >
              --
            </strong>
            <small>Hours</small>
          </div>

          <div
            class="countdown__cell"
          >
            <strong
              data-unit="minutes"
              data-testid="countdown-minutes"
            >
              --
            </strong>
            <small>Minutes</small>
          </div>

          <div
            class="countdown__cell"
          >
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
          hidden
        >
          The celebration has begun!
        </p>

        <p
          class="countdown__target reveal"
        >
          ${esc(cfg.dateLabel)}
          ·
          ${esc(cfg.venue)}
        </p>

      </section>
    `;
  }

  // ============================================================
  // VENUE
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

    return `
      <section
        class="section venue"
        id="venue"
      >

        <div
          class="section-head reveal"
        >

          <p
            class="section-eyebrow"
          >
            Where
          </p>

          <h2
            class="section-title"
          >
            The Venue
          </h2>

          ${dividerHTML()}

        </div>

        <div
          class="venue__grid"
        >

          <div
            class="venue__info reveal"
          >

            <h3
              class="venue__name"
              data-testid="venue-name"
            >
              ${esc(cfg.venue)}
            </h3>

            <p
              class="venue__address"
            >
              ${esc(
                cfg.venueAddress
              )}
            </p>

            <p
              class="venue__desc"
            >
              ${esc(
                cfg.venueDescription
              )}
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
              title="Map showing ${esc(
                cfg.venue
              )}"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>

          </div>

        </div>

      </section>
    `;
  }

  // ============================================================
  // FOOTER
  // ============================================================

  function footerHTML() {
    return `
      <footer
        class="footer"
      >

        <svg
          class="footer__bloom"
          aria-hidden="true"
          focusable="false"
        >
          <use href="#orn-bloom"></use>
        </svg>

        <p
          class="footer__love"
        >
          With love,
        </p>

        <p
          class="footer__names"
        >
          ${esc(cfg.bride)}
          <em>&amp;</em>
          ${esc(cfg.groom)}
        </p>

        <div
          class="footer__nalaks"
          aria-label="NALAKS"
        >
          <img
            class="footer__nalaks-logo footer__nalaks-logo--dark"
            src="${esc(cfg.assets?.nalaksWhiteLogo || 'assets/nalaks-white-logo.webp')}"
            alt="NALAKS"
            loading="lazy"
            decoding="async"
          >
          <img
            class="footer__nalaks-logo footer__nalaks-logo--light"
            src="${esc(cfg.assets?.nalaksBlueLogo || 'assets/nalaks-blue-logo.webp')}"
            alt="NALAKS"
            loading="lazy"
            decoding="async"
          >
        </div>

        <p
          class="footer__date"
        >
          ${esc(cfg.dateLabel)}
        </p>

        <button
          class="theme-toggle"
          id="themeToggle"
          type="button"
          aria-label="Switch to light mode"
          aria-pressed="false"
        >
          <span
            class="theme-toggle__icon"
            id="themeToggleIcon"
            aria-hidden="true"
          >☼</span>

          <span
            class="theme-toggle__label"
            id="themeToggleLabel"
          >
            Light Mode
          </span>
        </button>

      </footer>
    `;
  }

  // ============================================================
  // MUSIC HTML
  // ============================================================

  function musicHTML() {
  const musicSrc =
    cfg.assets?.music ||
    cfg.music ||
    'assets/music.mp3';

  return `
    <!-- MUSIC -->
    <button
      class="music-control"
      id="musicControl"
      type="button"
      aria-label="Play music"
      aria-pressed="false"
      title="Play / pause music"
    >
      <span
        class="music-control__icon"
        id="musicControlIcon"
        aria-hidden="true"
      >
        ♪
      </span>

      <span
        class="music-control__label"
        id="musicControlLabel"
      >
        Play Music
      </span>
    </button>

    <!-- FLOATING COUNTDOWN -->
    <div
      class="floating-countdown"
      id="floatingCountdown"
      aria-label="Countdown to the wedding"
    >
      <span
        class="floating-countdown__compact"
        aria-hidden="true"
      >
        ◷
      </span>

      <span
        class="floating-countdown__full"
        aria-hidden="true"
      >
        <span class="floating-countdown__intro">
          WEDDING IN
        </span>

        <span class="floating-countdown__values">
          <strong id="floatingDays">--</strong>
          <small>D</small>

          <strong id="floatingHours">--</strong>
          <small>H</small>

          <strong id="floatingMinutes">--</strong>
          <small>M</small>
        </span>
      </span>
    </div>

    <audio
      id="audio"
      src="${esc(musicSrc)}"
      loop
      preload="auto"
    ></audio>
  `;
}

   // ============================================================
  // MUSIC SETUP
  // ============================================================

  function setupMusic() {
    const audio = $('#audio');
    const button = $('#musicControl');
    const icon = $('#musicControlIcon');
    const beginButton = $('#beginInvitation');

    if (!audio) {
      return;
    }

    audio.volume = 0.65;

    /*
     * Music state rules:
     *
     * 1. The first successful Begin the Celebration click may start music.
     * 2. Later celebration clicks never start/restart/resume music.
     * 3. The corner button is the only control that can resume after a pause.
     * 4. Scrolling never starts music automatically.
     */
    let celebrationClickHandled = false;
    let manuallyPaused = false;
    let playInProgress = false;

    const updateButton = () => {
      if (!button) {
        return;
      }

      const playing = !audio.paused;

      button.classList.toggle(
        'is-playing',
        playing
      );

      button.setAttribute(
        'aria-pressed',
        String(playing)
      );

      button.setAttribute(
        'aria-label',
        playing
          ? 'Pause music'
          : 'Play music'
      );

      button.setAttribute(
        'title',
        playing
          ? 'Pause music'
          : 'Play music'
      );

      if (icon) {
        icon.textContent =
          playing ? 'Ⅱ' : '♪';
      }
      const label =
  $('#musicControlLabel');

if (label) {
  label.textContent =
    playing
      ? 'Pause Music'
      : 'Play Music';
}
    };

    const startMusic = async () => {
      if (!audio || !audio.paused) {
        updateButton();
        return true;
      }

      if (playInProgress) {
        return false;
      }

      playInProgress = true;

      try {
        await audio.play();
        manuallyPaused = false;
        updateButton();
        return true;
      } catch {
        updateButton();
        return false;
      } finally {
        playInProgress = false;
      }
    };

    const pauseMusic = () => {
      if (!audio.paused) {
        audio.pause();
      }

      manuallyPaused = true;
      updateButton();
    };

    const toggleMusic = async () => {
      if (audio.paused) {
        await startMusic();
      } else {
        pauseMusic();
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
      updateButton
    );

    audio.addEventListener(
      'pause',
      updateButton
    );

    audio.addEventListener(
      'ended',
      updateButton
    );

    audio.addEventListener(
      'error',
      () => {
        if (button) {
          button.setAttribute(
            'title',
            'Music file not found'
          );
        }
      }
    );

    if (beginButton) {
      beginButton.addEventListener(
        'click',
        () => {
          /* Scroll immediately; do not wait for audio. */
          const target =
            document.querySelector('#story');

          if (target) {
            smoothScrollTo(target);
          }

          /*
           * Only the first celebration-button click gets a chance to
           * start music. Mark it handled BEFORE calling play(), which
           * also prevents rapid double-clicks from making two play calls.
           * After a manual pause, this button cannot resume music.
           */
          if (
            celebrationClickHandled ||
            manuallyPaused
          ) {
            return;
          }

          celebrationClickHandled = true;
          void startMusic();
        }
      );
    }

    updateButton();
  }

  // ============================================================
  // GALLERY
  // ============================================================

  function setupGallery() {
    const images =
      (cfg.gallery || [])
        .filter(Boolean);

    if (images.length <= 1) {
      return;
    }

    const image =
      $('#galleryImg');

    const dots =
      document.querySelectorAll(
        '.poly-dot'
      );

    const previous =
      $('#galleryPrev');

    const next =
      $('#galleryNext');

    const gallery =
      $('#polaroid');

    let current =
      0;

    const show =
      (index) => {
        current =
          (index + images.length) %
          images.length;

        if (image) {
          image.src =
            images[current];
        }

        dots.forEach(
          (dot, i) => {
            dot.classList.toggle(
              'active',
              i === current
            );
          }
        );
      };

    if (previous) {
      previous.addEventListener(
        'click',
        () => {
          show(current - 1);
        }
      );
    }

    if (next) {
      next.addEventListener(
        'click',
        () => {
          show(current + 1);
        }
      );
    }

    dots.forEach(
      (dot) => {
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

    if (!gallery) {
      return;
    }

    let startX =
      null;

    gallery.addEventListener(
      'touchstart',
      (event) => {
        startX =
          event.touches[0].clientX;
      },
      {
        passive: true
      }
    );

    gallery.addEventListener(
      'touchend',
      (event) => {
        if (
          startX === null
        ) {
          return;
        }

        const delta =
          event.changedTouches[0]
            .clientX -
          startX;

        if (
          Math.abs(delta) > 40
        ) {
          show(
            current +
            (
              delta < 0
                ? 1
                : -1
            )
          );
        }

        startX =
          null;
      },
      {
        passive: true
      }
    );
  }

  // ============================================================
  // REVEAL ANIMATIONS
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
        (element) => {
          element.classList.add(
            'visible'
          );
        }
      );

      return;
    }

    if (
      !(
        'IntersectionObserver'
        in window
      )
    ) {
      elements.forEach(
        (element) => {
          element.classList.add(
            'visible'
          );
        }
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
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
      (element) => {
        observer.observe(
          element
        );
      }
    );
  }

  // ============================================================
  // NAVIGATION SETUP
  // ============================================================
  // ============================================================
  // SMOOTH SCROLLING
  // ============================================================

  // ============================================================
  // TRUE SMOOTH SCROLLING
  // ============================================================
  // Uses our own requestAnimationFrame animation instead of the
  // browser's native smooth-scroll implementation. This avoids
  // mobile-browser/reduced-motion settings turning the scroll
  // into an instant jump.

  let smoothScrollFrame = null;
  let smoothScrollToken = 0;

  function smoothScrollTo(target) {
    if (!target) {
      return;
    }

    if (smoothScrollFrame !== null) {
      cancelAnimationFrame(smoothScrollFrame);
      smoothScrollFrame = null;
    }

    smoothScrollToken += 1;
    const token = smoothScrollToken;

    const nav = document.querySelector('#siteNav');
    const navOffset = nav
      ? nav.getBoundingClientRect().height
      : 76;

    const startY = window.scrollY || window.pageYOffset || 0;
    const maxY = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    const targetY = Math.min(
      maxY,
      Math.max(
        0,
        target.getBoundingClientRect().top + startY - navOffset - 8
      )
    );

    const distance = targetY - startY;

    if (Math.abs(distance) < 1) {
      window.scrollTo(0, targetY);
      return;
    }

    const duration = Math.min(1100, Math.max(650, Math.abs(distance) * 0.55));
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (now) => {
      if (token !== smoothScrollToken) {
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);
      const y = startY + distance * eased;

      // Numeric scrollTo keeps every frame under our control.
      window.scrollTo(0, y);

      if (progress < 1) {
        smoothScrollFrame = requestAnimationFrame(animate);
      } else {
        smoothScrollFrame = null;
        window.scrollTo(0, targetY);
      }
    };

    smoothScrollFrame = requestAnimationFrame(animate);
  }

  function setupSmoothScrolling() {
    // Event delegation means links that are rendered later still work.
    // Capture phase prevents the browser's native anchor jump.
    document.addEventListener(
      'click',
      (event) => {
        const link = event.target.closest('a[href^="#"]');

        if (!link) {
          return;
        }

        const href = link.getAttribute('href');

        if (!href || href === '#' || href.length <= 1) {
          return;
        }

        let target = null;

        try {
          target = document.querySelector(href);
        } catch {
          return;
        }

        if (!target) {
          return;
        }

        event.preventDefault();

        // Close the mobile menu before the animation starts so
        // body.menu-open cannot prevent the page from scrolling.
        if (document.body.classList.contains('menu-open')) {
          document.body.classList.remove('menu-open');

          const menuButton = document.querySelector('#menuBtn');
          if (menuButton) {
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open menu');
          }
        }

        smoothScrollTo(target);

        // Update the URL without triggering a second scroll.
        try {
          history.replaceState(null, '', href);
        } catch {
          // Ignore history errors in restricted browser contexts.
        }
      },
      true
    );
  }

  function setupNavigation() {
    const nav =
      $('#siteNav');

    const menuButton =
      $('#menuBtn');

    const menu =
      $('#mobileMenu');

    const onScroll =
      () => {
        if (!nav) {
          return;
        }

        nav.classList.toggle(
          'nav--scrolled',
          window.scrollY > 24
        );
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

        if (menuButton) {
          menuButton.setAttribute(
            'aria-expanded',
            'false'
          );

          menuButton.setAttribute(
            'aria-label',
            'Open menu'
          );
        }
      };

    if (menuButton) {
      menuButton.addEventListener(
        'click',
        () => {
          const open =
            document.body.classList.toggle(
              'menu-open'
            );

          menuButton.setAttribute(
            'aria-expanded',
            String(open)
          );

          menuButton.setAttribute(
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
          (link) => {
            link.addEventListener(
              'click',
              closeMenu
            );
          }
        );
    }

    document.addEventListener(
      'keydown',
      (event) => {
        if (
          event.key === 'Escape' &&
          document.body.classList.contains(
            'menu-open'
          )
        ) {
          closeMenu();

          if (menuButton) {
            menuButton.focus();
          }
        }
      }
    );
  }

  // ============================================================
  // COUNTDOWN SETUP
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
        const difference =
          target -
          Date.now();

        if (
          difference <= 0
        ) {
          Object.values(
            cells
          ).forEach(
            (cell) => {
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

        const values = {
          days:
            Math.floor(
              difference /
              86400000
            ),

          hours:
            Math.floor(
              difference /
              3600000
            ) % 24,

          minutes:
            Math.floor(
              difference /
              60000
            ) % 60,

          seconds:
            Math.floor(
              difference /
              1000
            ) % 60
        };

        Object.entries(
          values
        ).forEach(
          ([key, value]) => {
            if (
              cells[key]
            ) {
              cells[key].textContent =
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
// FLOATING COUNTDOWN
// ============================================================

function setupFloatingCountdown() {
  const widget =
    $('#floatingCountdown');

  const countdownSection =
    $('#countdown');

  if (!widget || !countdownSection) {
    return;
  }

  const daysEl =
    $('#floatingDays');

  const hoursEl =
    $('#floatingHours');

  const minutesEl =
    $('#floatingMinutes');

  const target =
    new Date(
      cfg.weddingDateTime ||
      `${cfg.dateISO}T20:00:00+05:30`
    ).getTime();

  if (Number.isNaN(target)) {
    return;
  }

  const updateValues = () => {
    const difference =
      Math.max(
        0,
        target - Date.now()
      );

    const days =
      Math.floor(
        difference / 86400000
      );

    const hours =
      Math.floor(
        difference / 3600000
      ) % 24;

    const minutes =
      Math.floor(
        difference / 60000
      ) % 60;

    if (daysEl) {
      daysEl.textContent =
        String(days).padStart(2, '0');
    }

    if (hoursEl) {
      hoursEl.textContent =
        String(hours).padStart(2, '0');
    }

    if (minutesEl) {
      minutesEl.textContent =
        String(minutes).padStart(2, '0');
    }
  };

  updateValues();

  const timer =
    setInterval(
      updateValues,
      1000
    );

  /*
   * Expand only when the actual countdown section
   * enters the viewport.
   */
  if (
    'IntersectionObserver'
    in window
  ) {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              widget.classList.toggle(
                'is-expanded',
                entry.isIntersecting
              );
            }
          );
        },
        {
          threshold: 0.18,
          rootMargin:
            '-10% 0px -12% 0px'
        }
      );

    observer.observe(
      countdownSection
    );
  }

  window.addEventListener(
    'pagehide',
    () => {
      clearInterval(timer);
    },
    { once: true }
  );
}
  // ============================================================
  // THEME TOGGLE
  // ============================================================

  function setupThemeToggle() {
    const root =
      document.documentElement;

    const button =
      $('#themeToggle');

    const icon =
      $('#themeToggleIcon');

    const label =
      $('#themeToggleLabel');

    if (!button) {
      return;
    }

    const applySiteTheme =
      (theme) => {
        const isDark =
          theme === 'dark';

        root.dataset.theme =
          isDark ? 'dark' : 'light';

        root.style.colorScheme =
          isDark ? 'dark' : 'light';

        try {
          localStorage.setItem(
            'palak-theme',
            isDark ? 'dark' : 'light'
          );
        } catch {
          /* Storage may be unavailable; the theme still changes in-page. */
        }

        button.setAttribute(
          'aria-label',
          isDark
            ? 'Switch to light mode'
            : 'Switch to dark mode'
        );

        button.setAttribute(
          'aria-pressed',
          String(!isDark)
        );

        if (icon) {
          icon.textContent =
            isDark ? '☼' : '☾';
        }

        if (label) {
          label.textContent =
            isDark
              ? 'Light Mode'
              : 'Dark Mode';
        }
      };

    const currentTheme =
      root.dataset.theme === 'light'
        ? 'light'
        : 'dark';

    applySiteTheme(currentTheme);

    button.addEventListener(
      'click',
      () => {
        const nextTheme =
          root.dataset.theme === 'dark'
            ? 'light'
            : 'dark';

        applySiteTheme(nextTheme);
      }
    );
  }

  // ============================================================
  // RENDER
  // ============================================================

  function render() {
    applyTheme();
    applyMetadata();
    installEnhancementStyles();

    const sections =
      cfg.sections || {};

    const show =
      (key) =>
        sections[key] !== false;

    const app =
      $('#app');

    if (!app) {
      return;
    }

    app.innerHTML = `
      ${svgDefsHTML()}

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
          invitationCardHTML()
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

    setupFloatingCountdown();
    setupMusic();
    setupGallery();
    setupRevealAnimations();
    setupNavigation();
    setupSmoothScrolling();
    setupThemeToggle();
  }

  // ============================================================
  // START
  // ============================================================

  render();
})();
