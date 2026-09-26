(() => {
  /* ============================================================
     PALAK & NALIN — WEDDING INVITATION
     ============================================================ */

  const $ = (selector) => document.querySelector(selector);

  const esc = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));

  const cfg = window.INVITE_CONFIG || {};

  /* ------------------------------------------------------------
     THEME
     ------------------------------------------------------------ */

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem('palak-theme');
  } catch {}

  const initialTheme =
    savedTheme === 'light' ? 'light' : 'dark';

  document.documentElement.dataset.theme = initialTheme;
  document.documentElement.style.colorScheme = initialTheme;

  function applyTheme() {
    /*
     * Theme colours are controlled by CSS.
     * Only non-theme config variables are copied inline.
     */
    const root = document.documentElement;

    const excluded = new Set([
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
      if (!excluded.has(key)) {
        root.style.setProperty(`--${key}`, value);
      }
    });
  }

  function setTheme(theme) {
    const next =
      theme === 'light' ? 'light' : 'dark';

    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;

    try {
      localStorage.setItem(
        'palak-theme',
        next
      );
    } catch {}
  }

  /* ------------------------------------------------------------
     METADATA
     ------------------------------------------------------------ */

  function applyMetadata() {
    const title =
      `${cfg.bride || 'Palak'} & ${cfg.groom || 'Nalin'} — Wedding Invitation`;

    const description =
      `${cfg.dateLabel || ''} · ${cfg.city || ''} · ${cfg.venue || ''}`;

    const baseUrl =
      (
        cfg.siteUrl ||
        window.location.href
      )
        .replace(/#.*$/, '')
        .replace(/\/$/, '');

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

    if (cfg.assets?.shareCard) {
      try {
        setMeta(
          'meta[property="og:image"]',
          'content',
          new URL(
            cfg.assets.shareCard,
            `${baseUrl}/`
          ).href
        );
      } catch {}
    }

    setMeta(
      'meta[property="og:url"]',
      'content',
      `${baseUrl}/`
    );

    const canonical =
      document.querySelector(
        'link[rel="canonical"]'
      );

    if (canonical) {
      canonical.href =
        `${baseUrl}/`;
    }
  }

  /* ------------------------------------------------------------
     DECORATIVE SVG
     ------------------------------------------------------------ */

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

  /* ------------------------------------------------------------
     NAVIGATION
     ------------------------------------------------------------ */

  function navHTML() {
    return `
      <header
        class="nav"
        id="siteNav"
      >

        <a
          class="nav__brand"
          href="#home"
          aria-label="${esc(
            cfg.bride || 'Palak'
          )} and ${esc(
            cfg.groom || 'Nalin'
          )} — back to top"
        >
          <img
            class="nav__logo"
            src="assets/favicon.png"
            alt="${esc(
              cfg.bride || 'Palak'
            )} and ${esc(
              cfg.groom || 'Nalin'
            )}"
          >
        </a>

        <nav
          class="nav__links"
          aria-label="Main navigation"
        >
          <a href="#home">Home</a>
          <a href="#story">Our Story</a>
          <a href="#events">Events</a>
          <a href="#venue">Venue</a>
        </nav>

        <button
          class="nav__burger"
          id="menuBtn"
          type="button"
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
      >
        <nav aria-label="Mobile navigation">
          <a href="#home">Home</a>
          <a href="#story">Our Story</a>
          <a href="#events">Events</a>
          <a href="#venue">Venue</a>
        </nav>
      </div>
    `;
  }

  /* ------------------------------------------------------------
     HERO
     ------------------------------------------------------------ */

  function heroHTML() {
    return `
      <section
        class="hero"
        id="home"
      >

        <div
          class="hero__photo"
          aria-hidden="true"
        ></div>

        ${sprig(
          'hero__sprig hero__sprig--tl'
        )}

        ${sprig(
          'hero__sprig hero__sprig--tr'
        )}

        ${sprig(
          'hero__sprig hero__sprig--bl'
        )}

        ${sprig(
          'hero__sprig hero__sprig--br'
        )}

        <div
          class="hero__frame"
          aria-hidden="true"
        ></div>

        <div class="hero__inner">

          <p
            class="hero__eyebrow hero-anim"
            style="--d:.10s"
          >
            ${esc(
              cfg.heroEyebrow ||
              'Lucknow · 03 December 2026'
            )}
          </p>

          <h1
            class="hero__names hero-anim"
            style="--d:.25s"
          >
            <span class="hero__name">
              ${esc(
                cfg.bride || 'Palak'
              )}
            </span>

            <span
              class="hero__weds"
              aria-hidden="true"
            >
              weds
            </span>

            <span class="hero__name">
              ${esc(
                cfg.groom || 'Nalin'
              )}
            </span>
          </h1>

          <p
            class="hero__invite hero-anim"
            style="--d:.42s"
          >
            ${esc(
              cfg.heroInvite ||
              'Together with their families'
            )}
          </p>

          <svg
            class="hero__divider hero-anim"
            style="--d:.54s"
            aria-hidden="true"
          >
            <use href="#orn-divider"></use>
          </svg>

          <p
            class="hero__date hero-anim"
            style="--d:.66s"
          >
            ${esc(
              cfg.dateLabel ||
              '03 DECEMBER 2026'
            )}

            <span>·</span>

            ${esc(
              String(
                cfg.city ||
                'LUCKNOW'
              ).toUpperCase()
            )}
          </p>

          <p
            class="hero__line hero-anim"
            style="--d:.78s"
          >
            ${esc(
              cfg.heroLine ||
              'Awaiting to celebrate with you.'
            )}
          </p>

          <div
            class="hero__nalaks hero-anim"
            style="--d:.90s"
            aria-label="NALAKS"
          >
            <img
              class="hero__nalaks-logo hero__nalaks-logo--dark"
              src="${esc(
                cfg.assets?.nalaksWhiteLogo ||
                'assets/nalaks-white-logo.webp'
              )}"
              alt="NALAKS"
              decoding="async"
            />

            <img
              class="hero__nalaks-logo hero__nalaks-logo--light"
              src="${esc(
                cfg.assets?.nalaksBlueLogo ||
                'assets/nalaks-blue-logo.webp'
              )}"
              alt="NALAKS"
              decoding="async"
            />
          </div>

          <button
            type="button"
            class="hero__begin hero-anim"
            id="beginInvitation"
            style="--d:1.02s"
          >
            Begin the Celebration
          </button>

        </div>

        <a
          class="hero__scroll hero-anim"
          style="--d:1.18s"
          href="#story"
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

  /* ------------------------------------------------------------
     STORY
     ------------------------------------------------------------ */

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
          <p class="section-eyebrow">
            Our Story
          </p>

          <h2 class="section-title">
            ${esc(
              cfg.bride || 'Palak'
            )}
            <em>&amp;</em>
            ${esc(
              cfg.groom || 'Nalin'
            )}
          </h2>

          ${dividerHTML()}
        </div>

        <div class="story__grid">

          <div
            class="story__text reveal"
          >

            <p class="story__names">
              ${esc(
                cfg.brideFull ||
                cfg.bride ||
                'Palak'
              )}

              <span class="story__amp">
                &amp;
              </span>

              ${esc(
                cfg.groomFull ||
                cfg.groom ||
                'Nalin'
              )}
            </p>

            <p class="story__message">
              ${esc(
                cfg.storyMessage ||
                'Prepped, plated, perfectly paired.'
              )}
            </p>

            <p class="story__date">
              ${esc(
                cfg.dateLabel ||
                '03 DECEMBER 2026'
              )}
              ·
              ${esc(
                cfg.city ||
                'Lucknow'
              )}
            </p>

            ${
              brideParents || groomParents
                ? `
                  <div class="story__blessings">
                    <p>
                      With the blessings of
                    </p>

                    ${
                      brideParents
                        ? `
                          <span>
                            ${esc(
                              brideParents
                            )}
                          </span>
                        `
                        : ''
                    }

                    ${
                      groomParents
                        ? `
                          <span>
                            ${esc(
                              groomParents
                            )}
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
          >

            ${
              images.length
                ? `
                  <img
                    id="galleryImg"
                    src="${esc(
                      images[0]
                    )}"
                    alt="${esc(
                      cfg.bride ||
                      'Palak'
                    )} and ${esc(
                      cfg.groom ||
                      'Nalin'
                    )}"
                    loading="lazy"
                    decoding="async"
                    onerror="
                      this.onerror=null;
                      this.closest('.polaroid')
                        .classList.add('polaroid--empty');
                      this.remove();
                    "
                  />
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
                ${esc(
                  cfg.bride ||
                  'Palak'
                )}
                &amp;
                ${esc(
                  cfg.groom ||
                  'Nalin'
                )}
              </span>
            </div>

            ${
              images.length > 1
                ? `
                  <button
                    class="poly-nav poly-prev"
                    id="galleryPrev"
                    type="button"
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>

                  <button
                    class="poly-nav poly-next"
                    id="galleryNext"
                    type="button"
                    aria-label="Next photo"
                  >
                    ›
                  </button>

                  <div class="poly-dots">
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
                            type="button"
                            aria-label="Photo ${
                              index + 1
                            }"
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

  /* ------------------------------------------------------------
     INVITATION CARD
     ------------------------------------------------------------ */

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

        <div class="invitation-card__wrapper">

          <div class="invitation-card reveal">

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

            <p class="invitation-card__host-note">
              feels immense pleasure in inviting you
              <br>
              on the auspicious occasion of the wedding
              of her beloved
            </p>

            <p class="invitation-card__grand">
              GRAND DAUGHTER
            </p>

            <h2 class="invitation-card__name">
              ${esc(
                cfg.brideFull ||
                cfg.bride ||
                'Palak'
              )}
            </h2>

            <p class="invitation-card__relationship">
              daughter of
            </p>

            <p class="invitation-card__parents">
              ${esc(
                brideParents[0] ||
                ''
              )}
              and
              <br>
              ${esc(
                brideParents[1] ||
                ''
              )}
            </p>

            <p class="invitation-card__with">
              WITH
            </p>

            <h2 class="invitation-card__name">
              ${esc(
                cfg.groomFull ||
                cfg.groom ||
                'Nalin'
              )}
            </h2>

            <p class="invitation-card__relationship">
              son of
            </p>

            <p class="invitation-card__parents">
              ${esc(
                groomParents[0] ||
                ''
              )}
              and
              <br>
              ${esc(
                groomParents[1] ||
                ''
              )}
            </p>

            <div class="invitation-card__divider">
              <span
                class="invitation-card__divider-mark"
              ></span>
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
            />

          </div>

        </div>

      </section>
    `;
  }

  /* ------------------------------------------------------------
     TIMELINE
     ------------------------------------------------------------ */

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
              (event, index) => `
                <li class="timeline__item reveal">

                  <div
                    class="timeline__marker"
                    aria-hidden="true"
                  >
                    <span>
                      ${index + 1}
                    </span>
                  </div>

                  <div class="timeline__card">

                    <p class="timeline__day">
                      ${esc(
                        event.day ||
                        ''
                      )}
                    </p>

                    <h3 class="timeline__name">
                      ${esc(
                        event.name ||
                        ''
                      )}
                    </h3>

                    <p class="timeline__meta">
                      ${esc(
                        event.date ||
                        ''
                      )}

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

  /* ------------------------------------------------------------
     EVENT CARDS
     ------------------------------------------------------------ */

  function eventCardHTML(event) {
    return `
      <article
        class="event-card reveal"
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
            event.image
              ? `
                <img
                  src="${esc(
                    event.image
                  )}"
                  alt="${esc(
                    event.name ||
                    'Wedding'
                  )} celebration"
                  loading="lazy"
                  decoding="async"
                  onerror="
                    this.onerror=null;
                    this.remove();
                  "
                />
              `
              : ''
          }

        </figure>

        <div class="event-card__body">

          <p class="event-card__day">
            ${esc(
              event.day ||
              ''
            )}
            ·
            ${esc(
              event.date ||
              ''
            )}
          </p>

          <h3 class="event-card__name">
            ${esc(
              event.name ||
              ''
            )}
          </h3>

          <svg
            class="event-card__divider"
            aria-hidden="true"
          >
            <use href="#orn-divider"></use>
          </svg>

          ${
            event.time
              ? `
                <p class="event-card__time">
                  ${esc(
                    event.time
                  )}
                </p>
              `
              : ''
          }

          ${
            event.venue
              ? `
                <p class="event-card__venue">
                  ${esc(
                    event.venue
                  )}
                </p>
              `
              : ''
          }

          ${
            event.description
              ? `
                <p class="event-card__desc">
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

      </section>
    `;
  }

  /* ------------------------------------------------------------
     COUNTDOWN
     ------------------------------------------------------------ */

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
          role="timer"
          aria-label="Countdown to the wedding"
        >

          <div class="countdown__cell">
            <strong data-unit="days">
              --
            </strong>
            <small>
              Days
            </small>
          </div>

          <div class="countdown__cell">
            <strong data-unit="hours">
              --
            </strong>
            <small>
              Hours
            </small>
          </div>

          <div class="countdown__cell">
            <strong data-unit="minutes">
              --
            </strong>
            <small>
              Minutes
            </small>
          </div>

          <div class="countdown__cell">
            <strong data-unit="seconds">
              --
            </strong>
            <small>
              Seconds
            </small>
          </div>

        </div>

        <p
          class="countdown__done reveal"
          id="countdownDone"
          hidden
        >
          The celebration has begun!
        </p>

        <p class="countdown__target reveal">
          ${esc(
            cfg.dateLabel ||
            '03 DECEMBER 2026'
          )}
          ·
          ${esc(
            cfg.venue ||
            'The Hilton Lucknow'
          )}
        </p>

      </section>
    `;
  }

  /* ------------------------------------------------------------
     VENUE
     ------------------------------------------------------------ */

  function venueHTML() {
    const venue =
      cfg.venue ||
      'The Hilton Lucknow';

    const address =
      cfg.venueAddress ||
      'Vibhuti Khand, Lucknow';

    const query =
      encodeURIComponent(
        `${venue}, ${address}`
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

            <h3 class="venue__name">
              ${esc(venue)}
            </h3>

            <p class="venue__address">
              ${esc(address)}
            </p>

            <p class="venue__desc">
              ${esc(
                cfg.venueDescription ||
                'An elegant evening of celebration in Lucknow.'
              )}
            </p>

            <a
              class="venue__btn"
              href="${directionsHref}"
              target="_blank"
              rel="noopener"
            >
              Get Directions

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
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

          <div class="venue__map reveal">

            <iframe
              src="${embedSrc}"
              title="Map showing ${esc(
                venue
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

  /* ------------------------------------------------------------
     FOOTER
     ------------------------------------------------------------ */

  function footerHTML() {
    return `
      <footer class="footer">

        <svg
          class="footer__bloom"
          aria-hidden="true"
        >
          <use href="#orn-bloom"></use>
        </svg>

        <p class="footer__love">
          With love,
        </p>

        <p class="footer__names">
          ${esc(
            cfg.bride ||
            'Palak'
          )}
          <em>&amp;</em>
          ${esc(
            cfg.groom ||
            'Nalin'
          )}
        </p>

        <div
          class="footer__nalaks"
          aria-label="NALAKS"
        >
          <img
            class="footer__nalaks-logo footer__nalaks-logo--dark"
            src="${esc(
              cfg.assets?.nalaksWhiteLogo ||
              'assets/nalaks-white-logo.webp'
            )}"
            alt="NALAKS"
            loading="lazy"
            decoding="async"
          />

          <img
            class="footer__nalaks-logo footer__nalaks-logo--light"
            src="${esc(
              cfg.assets?.nalaksBlueLogo ||
              'assets/nalaks-blue-logo.webp'
            )}"
            alt="NALAKS"
            loading="lazy"
            decoding="async"
          />
        </div>

        <p class="footer__date">
          ${esc(
            cfg.dateLabel ||
            '03 DECEMBER 2026'
          )}
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
          >
            ☼
          </span>

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

  /* ------------------------------------------------------------
     MUSIC + FLOATING COUNTDOWN HTML
     ------------------------------------------------------------ */

  function musicHTML() {
    const musicSrc =
      cfg.assets?.music ||
      cfg.music ||
      'assets/music.mp3';

    return `
      <button
        class="music-control"
        id="musicControl"
        type="button"
        aria-label="Play music"
        aria-pressed="false"
        title="Play music"
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
            <strong id="floatingDays">
              --
            </strong>
            <small>D</small>

            <strong id="floatingHours">
              --
            </strong>
            <small>H</small>

            <strong id="floatingMinutes">
              --
            </strong>
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

  /* ------------------------------------------------------------
     MUSIC SETUP
     ------------------------------------------------------------ */

  function setupMusic() {
    const audio =
      $('#audio');

    const button =
      $('#musicControl');

    const icon =
      $('#musicControlIcon');

    const label =
      $('#musicControlLabel');

    const beginButton =
      $('#beginInvitation');

    if (!audio) {
      return;
    }

    audio.volume = 0.65;

    /*
     * Music rules:
     *
     * 1. The FIRST Begin click gets one chance to start music.
     * 2. Later Begin clicks never start or resume music.
     * 3. The corner music button is the only manual resume control.
     * 4. Scrolling never starts music automatically.
     */

    let celebrationClickHandled = false;
    let manuallyPaused = false;
    let playInProgress = false;

    const updateButton = () => {
      if (!button) {
        return;
      }

      const playing =
        !audio.paused;

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
          playing
            ? 'Ⅱ'
            : '♪';
      }

      if (label) {
        label.textContent =
          playing
            ? 'Pause Music'
            : 'Play Music';
      }
    };

    const startMusic =
      async () => {
        if (!audio) {
          return false;
        }

        if (!audio.paused) {
          updateButton();
          return true;
        }

        if (playInProgress) {
          return false;
        }

        playInProgress = true;

        try {
          await audio.play();
          updateButton();
          return true;
        } catch {
          updateButton();
          return false;
        } finally {
          playInProgress = false;
        }
      };

    const pauseMusic =
      () => {
        audio.pause();
        manuallyPaused = true;
        updateButton();
      };

    const toggleMusic =
      async () => {
        if (audio.paused) {
          manuallyPaused = false;
          await startMusic();
        } else {
          pauseMusic();
        }
      };

    button?.addEventListener(
      'click',
      toggleMusic
    );

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
        button?.setAttribute(
          'title',
          'Music file not found'
        );
      }
    );

    beginButton?.addEventListener(
      'click',
      () => {
        const target =
          document.querySelector(
            '#story'
          );

        if (target) {
          smoothScrollTo(target);
        }

        /*
         * The celebration button can only initiate music once.
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

    updateButton();
  }

  /* ------------------------------------------------------------
     GALLERY
     ------------------------------------------------------------ */

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

    let current = 0;

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
          (dot, indexValue) => {
            dot.classList.toggle(
              'active',
              indexValue === current
            );
          }
        );
      };

    previous?.addEventListener(
      'click',
      () => show(
        current - 1
      )
    );

    next?.addEventListener(
      'click',
      () => show(
        current + 1
      )
    );

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

    let startX = null;

    gallery.addEventListener(
      'touchstart',
      (event) => {
        startX =
          event.touches[0]?.clientX ??
          null;
      },
      { passive: true }
    );

    gallery.addEventListener(
      'touchend',
      (event) => {
        if (startX === null) {
          return;
        }

        const endX =
          event.changedTouches[0]?.clientX ??
          startX;

        const delta =
          endX - startX;

        if (Math.abs(delta) > 40) {
          show(
            current +
            (
              delta < 0
                ? 1
                : -1
            )
          );
        }

        startX = null;
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------
     REVEAL ANIMATIONS
     ------------------------------------------------------------ */

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

  /* ------------------------------------------------------------
     TRUE SMOOTH SCROLL ENGINE
     ------------------------------------------------------------ */

  let smoothScrollFrame = null;
  let smoothScrollToken = 0;

  function smoothScrollTo(target) {
    if (!target) {
      return;
    }

    if (
      smoothScrollFrame !== null
    ) {
      cancelAnimationFrame(
        smoothScrollFrame
      );

      smoothScrollFrame = null;
    }

    smoothScrollToken += 1;

    const token =
      smoothScrollToken;

    const nav =
      document.querySelector(
        '#siteNav'
      );

    const navOffset =
      nav
        ? nav.getBoundingClientRect().height
        : 0;

    const startY =
      window.scrollY ||
      window.pageYOffset ||
      0;

    const maxY =
      Math.max(
        0,
        document.documentElement
          .scrollHeight -
        window.innerHeight
      );

    const targetY =
      Math.min(
        maxY,
        Math.max(
          0,
          target.getBoundingClientRect().top +
          startY -
          navOffset -
          8
        )
      );

    const distance =
      targetY -
      startY;

    if (
      Math.abs(distance) < 1
    ) {
      window.scrollTo(
        0,
        targetY
      );
      return;
    }

    const duration =
      Math.min(
        1200,
        Math.max(
          700,
          Math.abs(distance) *
          0.65
        )
      );

    const startTime =
      performance.now();

    const ease =
      (t) =>
        t < 0.5
          ? 4 * t * t * t
          : 1 -
            Math.pow(
              -2 * t + 2,
              3
            ) / 2;

    const animate =
      (now) => {
        if (
          token !==
          smoothScrollToken
        ) {
          return;
        }

        const progress =
          Math.min(
            1,
            (
              now -
              startTime
            ) / duration
          );

        const y =
          startY +
          distance *
          ease(progress);

        window.scrollTo(
          0,
          y
        );

        if (
          progress < 1
        ) {
          smoothScrollFrame =
            requestAnimationFrame(
              animate
            );
        } else {
          smoothScrollFrame =
            null;

          window.scrollTo(
            0,
            targetY
          );
        }
      };

    smoothScrollFrame =
      requestAnimationFrame(
        animate
      );
  }

  function closeMobileMenu() {
    document.body.classList.remove(
      'menu-open'
    );

    const button =
      document.querySelector(
        '#menuBtn'
      );

    if (button) {
      button.setAttribute(
        'aria-expanded',
        'false'
      );

      button.setAttribute(
        'aria-label',
        'Open menu'
      );
    }
  }

  function setupSmoothScrolling() {
    /*
     * Capture phase stops native anchor jumping before it can occur.
     */
    document.addEventListener(
      'click',
      (event) => {
        const source =
          event.target instanceof Element
            ? event.target
            : event.target?.parentElement;

        const link =
          source?.closest(
            'a[href^="#"]'
          );

        if (!link) {
          return;
        }

        const href =
          link.getAttribute(
            'href'
          );

        if (
          !href ||
          href === '#'
        ) {
          return;
        }

        let target = null;

        try {
          target =
            document.querySelector(
              href
            );
        } catch {
          return;
        }

        if (!target) {
          return;
        }

        event.preventDefault();

        closeMobileMenu();

        smoothScrollTo(
          target
        );

        try {
          history.replaceState(
            null,
            '',
            href
          );
        } catch {}
      },
      true
    );
  }

  /* ------------------------------------------------------------
     NAVIGATION
     ------------------------------------------------------------ */

  function setupNavigation() {
    const nav =
      $('#siteNav');

    const menuButton =
      $('#menuBtn');

    const menu =
      $('#mobileMenu');

    if (!nav) {
      return;
    }

    const onScroll =
      () => {
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

    menuButton?.addEventListener(
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

    document.addEventListener(
      'keydown',
      (event) => {
        if (
          event.key === 'Escape' &&
          document.body.classList.contains(
            'menu-open'
          )
        ) {
          closeMobileMenu();
          menuButton?.focus();
        }
      }
    );

    menu?.addEventListener(
      'click',
      (event) => {
        if (
          event.target instanceof Element &&
          event.target.closest('a')
        ) {
          closeMobileMenu();
        }
      }
    );
  }

  /* ------------------------------------------------------------
     MAIN COUNTDOWN
     ------------------------------------------------------------ */

  function weddingTimestamp() {
    const value =
      cfg.weddingDateTime ||
      `${cfg.dateISO || '2026-12-03'}T20:00:00+05:30`;

    return new Date(
      value
    ).getTime();
  }

  function setupCountdown() {
    const target =
      weddingTimestamp();

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

    const timer =
      window.setInterval(
        tick,
        1000
      );

    window.addEventListener(
      'pagehide',
      () => {
        window.clearInterval(
          timer
        );
      },
      {
        once: true
      }
    );
  }

  /* ------------------------------------------------------------
     FLOATING COUNTDOWN
     ------------------------------------------------------------ */

  function setupFloatingCountdown() {
    const widget =
      $('#floatingCountdown');

    const section =
      $('#countdown');

    if (
      !widget ||
      !section
    ) {
      return;
    }

    const days =
      $('#floatingDays');

    const hours =
      $('#floatingHours');

    const minutes =
      $('#floatingMinutes');

    const target =
      weddingTimestamp();

    if (
      Number.isNaN(target)
    ) {
      return;
    }

    const update =
      () => {
        const difference =
          Math.max(
            0,
            target -
            Date.now()
          );

        if (days) {
          days.textContent =
            String(
              Math.floor(
                difference /
                86400000
              )
            ).padStart(
              2,
              '0'
            );
        }

        if (hours) {
          hours.textContent =
            String(
              Math.floor(
                difference /
                3600000
              ) % 24
            ).padStart(
              2,
              '0'
            );
        }

        if (minutes) {
          minutes.textContent =
            String(
              Math.floor(
                difference /
                60000
              ) % 60
            ).padStart(
              2,
              '0'
            );
        }
      };

    update();

    const intervalId =
      window.setInterval(
        update,
        1000
      );

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
        section
      );
    }

    window.addEventListener(
      'pagehide',
      () => {
        window.clearInterval(
          intervalId
        );
      },
      {
        once: true
      }
    );
  }

  /* ------------------------------------------------------------
     THEME TOGGLE
     ------------------------------------------------------------ */

  function setupThemeToggle() {
    const button =
      $('#themeToggle');

    if (!button) {
      return;
    }

    const icon =
      $('#themeToggleIcon');

    const label =
      $('#themeToggleLabel');

    const current =
      document.documentElement
        .dataset.theme === 'light'
        ? 'light'
        : 'dark';

    const syncUi =
      () => {
        const isDark =
          document.documentElement
            .dataset.theme !==
          'light';

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
            isDark
              ? '☼'
              : '☾';
        }

        if (label) {
          label.textContent =
            isDark
              ? 'Light Mode'
              : 'Dark Mode';
        }
      };

    setTheme(current);

    syncUi();

    button.addEventListener(
      'click',
      () => {
        const next =
          document.documentElement
            .dataset.theme === 'dark'
            ? 'light'
            : 'dark';

        setTheme(next);
        syncUi();
      }
    );
  }

  /* ------------------------------------------------------------
     RENDER
     ------------------------------------------------------------ */

  function render() {
    applyTheme();
    applyMetadata();

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

        ${invitationCardHTML()}

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

  /* ------------------------------------------------------------
     START
     ------------------------------------------------------------ */

  render();
})();
