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
    const description = `${cfg.dateLabel} · ${cfg.city} · ${cfg.venue}`;

    const baseUrl = (cfg.siteUrl || window.location.href)
      .replace(/#.*$/, '')
      .replace(/\/$/, '');

    const pageUrl = `${baseUrl}/`;

    const shareImage = cfg.assets?.shareCard
      ? new URL(cfg.assets.shareCard, `${baseUrl}/`).href
      : '';

    document.title = title;

    const setMeta = (selector, attribute, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', shareImage);
    setMeta('meta[property="og:url"]', 'content', pageUrl);

    const canonical = document.querySelector('link[rel="canonical"]');

    if (canonical) {
      canonical.setAttribute('href', pageUrl);
    }
  }

  function svgDefsHTML() {
    return `<svg class="svg-defs" aria-hidden="true" focusable="false">
      <defs>
        <symbol id="orn-sprig" viewBox="0 0 120 200">
          <path d="M60 196 C52 140 66 90 58 10"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"/>

          <path d="M58 40 C40 34 30 20 28 6 C44 10 54 24 58 40 Z"
            fill="currentColor"/>

          <path d="M59 70 C78 64 90 50 92 34 C74 40 63 54 59 70 Z"
            fill="currentColor"/>

          <path d="M56 105 C37 99 26 84 24 68 C42 74 53 89 56 105 Z"
            fill="currentColor"/>

          <path d="M58 138 C77 132 89 118 91 102 C73 108 62 122 58 138 Z"
            fill="currentColor"/>

          <path d="M55 168 C38 163 28 150 26 136 C42 141 52 153 55 168 Z"
            fill="currentColor"/>
        </symbol>

        <symbol id="orn-bloom" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="currentColor"/>

          <g fill="none" stroke="currentColor" stroke-width="2">
            <path d="M50 12 C58 26 58 38 50 44 C42 38 42 26 50 12 Z"/>
            <path d="M50 88 C42 74 42 62 50 56 C58 62 58 74 50 88 Z"/>
            <path d="M12 50 C26 42 38 42 44 50 C38 58 26 58 12 50 Z"/>
            <path d="M88 50 C74 58 62 58 56 50 C62 42 74 42 88 50 Z"/>
          </g>
        </symbol>

        <symbol id="orn-divider" viewBox="0 0 240 24">
          <line x1="0" y1="12" x2="96" y2="12"
            stroke="currentColor"
            stroke-width="1.4"/>

          <line x1="144" y1="12" x2="240" y2="12"
            stroke="currentColor"
            stroke-width="1.4"/>

          <path d="M120 3 L129 12 L120 21 L111 12 Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"/>

          <circle cx="120" cy="12" r="2.2" fill="currentColor"/>
          <circle cx="102" cy="12" r="1.8" fill="currentColor"/>
          <circle cx="138" cy="12" r="1.8" fill="currentColor"/>
        </symbol>
      </defs>
    </svg>`;
  }

  const sprig = (cls) =>
    `<svg class="${cls}" aria-hidden="true" focusable="false">
      <use href="#orn-sprig"></use>
    </svg>`;

  const dividerHTML = () =>
    `<svg class="divider reveal" aria-hidden="true" focusable="false">
      <use href="#orn-divider"></use>
    </svg>`;

  // ---------- Sections ----------

 function navHTML() {
  return `<header class="nav" id="siteNav">
    <a
      class="nav__brand"
      href="#home"
      data-testid="nav-brand"
      aria-label="${esc(cfg.bride)} and ${esc(cfg.groom)} — back to top"
    >
      <img
        class="nav__logo"
        src="assets/favicon.png"
        alt="Palak and Nalin"
      >
    </a>

    <nav class="nav__links" aria-label="Main navigation">
      <a href="#home" data-testid="nav-home">Home</a>
      <a href="#story" data-testid="nav-story">Our Story</a>
      <a href="#events" data-testid="nav-events">Events</a>
      <a href="#venue" data-testid="nav-venue">Venue</a>
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
      <a href="#home" data-testid="mobile-nav-home">Home</a>
      <a href="#story" data-testid="mobile-nav-story">Our Story</a>
      <a href="#events" data-testid="mobile-nav-events">Events</a>
      <a href="#venue" data-testid="mobile-nav-venue">Venue</a>
    </nav>
  </div>`;
}

  function heroHTML() {
    return `<section class="hero" id="home">
      ${cfg.assets?.background ? `<div class="hero__photo" aria-hidden="true"></div>` : ''}

      ${sprig('hero__sprig hero__sprig--tl')}
      ${sprig('hero__sprig hero__sprig--tr')}
      ${sprig('hero__sprig hero__sprig--bl')}
      ${sprig('hero__sprig hero__sprig--br')}

      <div class="hero__frame" aria-hidden="true"></div>

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
          <span class="hero__name">${esc(cfg.bride)}</span>
          <span class="hero__amp" aria-hidden="true">&amp;</span>
          <span class="hero__name">${esc(cfg.groom)}</span>
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
      </div>

      <a
        class="hero__scroll hero-anim"
        style="--d:1.3s"
        href="#story"
        data-testid="hero-scroll-indicator"
        aria-label="Scroll to our story"
      >
        <span class="hero__scroll-text">Scroll</span>
        <span class="hero__scroll-line" aria-hidden="true"></span>
      </a>
    </section>`;
  }

  function storyHTML() {
    const imgs = (cfg.gallery || []).filter(Boolean);
    const family = cfg.family || {};

    const brideParents = (family.brideParents || [])
      .filter(Boolean)
      .join(' & ');

    const groomParents = (family.groomParents || [])
      .filter(Boolean)
      .join(' & ');

    return `<section class="section story" id="story">
      ${sprig('section-sprig story__sprig')}

      <div class="section-head reveal">
        <p class="section-eyebrow">Our Story</p>

        <h2 class="section-title">
          ${esc(cfg.bride)} <em>&amp;</em> ${esc(cfg.groom)}
        </h2>

        ${dividerHTML()}
      </div>

      <div class="story__grid">
        <div class="story__text reveal">
          <p class="story__names">
            ${esc(cfg.brideFull)}
            <span class="story__amp">&amp;</span>
            ${esc(cfg.groomFull)}
          </p>

          <p class="story__message">
            ${esc(cfg.storyMessage)}
          </p>

          <p class="story__date">
            ${esc(cfg.dateLabel)} · ${esc(cfg.city)}
          </p>

          ${(brideParents || groomParents) ? `
          <div class="story__blessings">
            <p>With the blessings of</p>
            ${brideParents ? `<span>${esc(brideParents)}</span>` : ''}
            ${groomParents ? `<span>${esc(groomParents)}</span>` : ''}
          </div>` : ''}
        </div>

        <div
          class="polaroid reveal${imgs.length ? '' : ' polaroid--empty'}"
          id="polaroid"
          data-testid="gallery"
        >
          ${imgs.length ? `
          <img
            id="galleryImg"
            src="${esc(imgs[0])}"
            alt="${esc(cfg.bride)} and ${esc(cfg.groom)}"
            loading="lazy"
            decoding="async"
            onerror="this.onerror=null;this.closest('.polaroid').classList.add('polaroid--empty');this.remove();"
          >` : ''}

          <div class="polaroid__placeholder" aria-hidden="true">
            <svg>
              <use href="#orn-bloom"></use>
            </svg>
            <span>${esc(cfg.bride)} &amp; ${esc(cfg.groom)}</span>
          </div>

          ${imgs.length > 1 ? `
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
              ${imgs.map((_, i) =>
                `<button
                  class="poly-dot${i === 0 ? ' active' : ''}"
                  data-i="${i}"
                  data-testid="gallery-dot-${i}"
                  aria-label="Photo ${i + 1}"
                ></button>`
              ).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </section>`;
  }

  function timelineHTML() {
    const events = cfg.events || [];

    if (!events.length) return '';

    return `<section class="section timeline" id="timeline">
      <div class="section-head reveal">
        <p class="section-eyebrow">The Journey</p>
        <h2 class="section-title">Wedding Timeline</h2>
        ${dividerHTML()}
      </div>

      <ol class="timeline__list">
        ${events.map((e, i) => `
        <li
          class="timeline__item reveal"
          data-testid="timeline-${esc(e.theme || i)}"
        >
          <div class="timeline__marker" aria-hidden="true">
            <span>${i + 1}</span>
          </div>

          <div class="timeline__card timeline__card--${esc(e.theme || 'default')}">
            <p class="timeline__day">${esc(e.day)}</p>

            <h3 class="timeline__name">
              ${esc(e.name)}
            </h3>

            <p class="timeline__meta">
              ${esc(e.date)}
              ${e.time ? ` · ${esc(e.time)}` : ''}
            </p>
          </div>
        </li>
        `).join('')}
      </ol>
    </section>`;
  }

  function eventCardHTML(e) {
    const venue = e.venue || '';

    return `<article
      class="event-card event-card--${esc(e.theme || 'default')} reveal"
      data-testid="event-${esc((e.theme || e.name || '').toLowerCase())}"
    >
      <figure class="event-card__media">
        <div class="event-card__motif" aria-hidden="true">
          <svg>
            <use href="#orn-bloom"></use>
          </svg>
        </div>

        ${e.image ? `
          <img
            src="${esc(e.image)}"
            alt="${esc(e.name)} celebration"
            loading="lazy"
            decoding="async"
            onerror="this.onerror=null;this.remove();"
          >
        ` : ''}
      </figure>

      <div class="event-card__body">
        <p class="event-card__day">
          ${esc(e.day)} · ${esc(e.date)}
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

        ${e.time ? `
          <p class="event-card__time">
            ${esc(e.time)}
          </p>
        ` : ''}

        ${venue ? `
          <p class="event-card__venue">
            ${esc(venue)}
          </p>
        ` : ''}

        ${e.description ? `
          <p class="event-card__desc">
            ${esc(e.description)}
          </p>
        ` : ''}
      </div>
    </article>`;
  }

  function eventsHTML() {
    const events = cfg.events || [];

    if (!events.length) return '';

    return `<section class="section events" id="events">
      <div class="section-head reveal">
        <p class="section-eyebrow">The Festivities</p>
        <h2 class="section-title">Celebrations</h2>
        ${dividerHTML()}
      </div>

      <div class="events__grid">
        ${events.map(eventCardHTML).join('')}
      </div>
    </section>`;
  }

  function countdownHTML() {
    return `<section
      class="section countdown-section"
      id="countdown"
    >
      ${sprig('section-sprig countdown__sprig countdown__sprig--l')}
      ${sprig('section-sprig countdown__sprig countdown__sprig--r')}

      <div class="section-head reveal">
        <p class="section-eyebrow">Save the Date</p>
        <h2 class="section-title">Counting Down</h2>
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
        ${esc(cfg.dateLabel)} · ${esc(cfg.venue)}
      </p>
    </section>`;
  }

  function venueHTML() {
    const query = encodeURIComponent(
      `${cfg.venue}, ${cfg.venueAddress}`
    );

    const embedSrc =
      cfg.mapEmbedUrl ||
      `https://www.google.com/maps?q=${query}&output=embed`;

    const directionsHref =
      `https://www.google.com/maps/search/?api=1&query=${query}`;

    return `<section class="section venue" id="venue">
      <div class="section-head reveal">
        <p class="section-eyebrow">Where</p>
        <h2 class="section-title">The Venue</h2>
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

  // ---------- Blessings ----------



  // ---------- Render ----------

  function render() {
    applyTheme();
    applyMetadata();

    const sec = cfg.sections || {};
    const show = (key) => sec[key] !== false;

    $('#app').innerHTML = `
      ${svgDefsHTML()}
      ${navHTML()}

      <main>
        ${show('hero') ? heroHTML() : ''}
        ${show('story') ? storyHTML() : ''}
        ${show('timeline') ? timelineHTML() : ''}
        ${show('events') ? eventsHTML() : ''}
        ${show('countdown') ? countdownHTML() : ''}
        ${show('venue') ? venueHTML() : ''}
        
      </main>

      ${show('footer') ? footerHTML() : ''}

      ${cfg.assets?.music ? `
      <button
        class="music-btn"
        id="musicBtn"
        data-testid="music-toggle-button"
        aria-pressed="false"
      >
        <span
          class="music-btn__note"
          aria-hidden="true"
        >
          ♪
        </span>

        <span
          class="music-btn__label"
          id="musicLabel"
        >
          Play Music
        </span>
      </button>

      <audio
        id="audio"
        src="${esc(cfg.assets.music)}"
        loop
        preload="none"
      ></audio>
      ` : ''}
    `;

    if (show('countdown')) {
      setupCountdown();
    }

    setupMusic();
    setupGallery();
    setupRevealAnimations();
    setupNavigation();
  }

  // ---------- Countdown ----------

  function setupCountdown() {
    const target = new Date(
      cfg.weddingDateTime ||
      `${cfg.dateISO}T20:00:00+05:30`
    ).getTime();

    const box = $('#countdownBox');

    if (!box || Number.isNaN(target)) {
      return;
    }

    const cells = {
      days: box.querySelector('[data-unit="days"]'),
      hours: box.querySelector('[data-unit="hours"]'),
      minutes: box.querySelector('[data-unit="minutes"]'),
      seconds: box.querySelector('[data-unit="seconds"]')
    };

    const done = $('#countdownDone');

    let timer = null;

    const tick = () => {
      const diff = target - Date.now();

      if (diff <= 0) {
        Object.values(cells).forEach(cell => {
          if (cell) {
            cell.textContent = '00';
          }
        });

        if (done) {
          done.hidden = false;
        }

        if (timer) {
          clearInterval(timer);
        }

        return;
      }

      const vals = {
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60
      };

      Object.entries(vals).forEach(([key, value]) => {
        if (cells[key]) {
          cells[key].textContent =
            String(value).padStart(2, '0');
        }
      });
    };

    tick();

    timer = setInterval(tick, 1000);
  }

  // ---------- Music ----------

  function setupMusic() {
    const audio = $('#audio');
    const button = $('#musicBtn');
    const label = $('#musicLabel');

    if (!audio || !button) {
      return;
    }

    button.addEventListener('click', async () => {
      try {
        if (audio.paused) {
          await audio.play();

          if (label) {
            label.textContent = 'Pause Music';
          }

          button.setAttribute(
            'aria-pressed',
            'true'
          );

          button.classList.add('is-playing');
        } else {
          audio.pause();

          if (label) {
            label.textContent = 'Play Music';
          }

          button.setAttribute(
            'aria-pressed',
            'false'
          );

          button.classList.remove('is-playing');
        }
      } catch {
        if (label) {
          label.textContent = 'Music unavailable';
        }
      }
    });
  }

  // ---------- Gallery ----------

  function setupGallery() {
    const imgs = (cfg.gallery || []).filter(Boolean);

    if (imgs.length <= 1) {
      return;
    }

    const img = $('#galleryImg');
    const dots = document.querySelectorAll('.poly-dot');

    let idx = 0;

    const show = (n) => {
      idx = (n + imgs.length) % imgs.length;

      if (img) {
        img.src = imgs[idx];
      }

      dots.forEach((dot, i) => {
        dot.classList.toggle(
          'active',
          i === idx
        );
      });
    };

    const prev = $('#galleryPrev');
    const next = $('#galleryNext');

    if (prev) {
      prev.addEventListener(
        'click',
        () => show(idx - 1)
      );
    }

    if (next) {
      next.addEventListener(
        'click',
        () => show(idx + 1)
      );
    }

    dots.forEach(dot => {
      dot.addEventListener(
        'click',
        () => show(Number(dot.dataset.i))
      );
    });

    const el = $('#polaroid');

    if (!el) {
      return;
    }

    let sx = null;

    el.addEventListener(
      'touchstart',
      e => {
        sx = e.touches[0].clientX;
      },
      { passive: true }
    );

    el.addEventListener(
      'touchend',
      e => {
        if (sx === null) {
          return;
        }

        const dx =
          e.changedTouches[0].clientX - sx;

        if (Math.abs(dx) > 40) {
          show(
            idx + (dx < 0 ? 1 : -1)
          );
        }

        sx = null;
      },
      { passive: true }
    );
  }

  // ---------- Reveal animations ----------

  function setupRevealAnimations() {
    const elements =
      document.querySelectorAll('.reveal');

    if (
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      elements.forEach(el =>
        el.classList.add('visible')
      );

      return;
    }

    if (
      !('IntersectionObserver' in window)
    ) {
      elements.forEach(el =>
        el.classList.add('visible')
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                'visible'
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -8% 0px'
        }
      );

    elements.forEach(el =>
      observer.observe(el)
    );
  }

  // ---------- Navigation ----------

  function setupNavigation() {
    const nav = $('#siteNav');
    const menuBtn = $('#menuBtn');
    const menu = $('#mobileMenu');

    const onScroll = () => {
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
      { passive: true }
    );

    const closeMenu = () => {
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
            open ? 'Close menu' : 'Open menu'
          );
        }
      );
    }

    if (menu) {
      menu
        .querySelectorAll('a')
        .forEach(link => {
          link.addEventListener(
            'click',
            closeMenu
          );
        });
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

  // ---------- Footer ----------

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

  render();
})();
