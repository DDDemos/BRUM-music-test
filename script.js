/**
 * ==============================================================================
 * BIRMINGHAM MUSIC STORIES — JAVASCRIPT ENGINE
 * ==============================================================================
 * This script powers the interactive features of the Birmingham Music Stories
 * digital exhibition:
 * 1. Story Data Store: Clean separation of exhibition content and code logic.
 * 2. Genre Filtering: Instant client-side filtering without reloading the page.
 * 3. Birmingham Sound Map: Interactive map coordinates and sector inspector.
 * 4. Story Modal / Panel: Accessible overlay for reading full archival entries.
 * 5. Timeline Interactivity: Visual feedback on chronological milestones.
 * 6. Archival Search & Ambient Audio: Search drawer and warm vinyl crackle synthesis.
 * ==============================================================================
 */

// Ensure code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================================
   * 1. STORY DATA STORE (Where the exhibition data lives)
   * ============================================================================
   * All historical facts, artist profiles, and dates are stored in plain JavaScript
   * objects. This keeps content easily maintainable and separated from UI logic.
   */

  const musicStories = [
    {
      id: 'black-sabbath',
      artist: 'Black Sabbath',
      genre: 'Heavy Metal',
      genreCategory: 'metal',
      location: 'Aston',
      year: '1968',
      era: 'Late 1960s',
      headline: 'The sound that helped define heavy metal.',
      description: 'Black Sabbath formed in Aston in 1968 and became one of the groups most closely associated with the emergence of heavy metal.',
      readTime: '14 MIN READ',
      curatorialNote: 'Forged in the industrial din of Aston foundries, tuning guitars down to create doom-laden, thunderous power chords.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYqbX_JrLzPgLFSRAG11GS_4CQRih-WgOLROL4hRhT6yOzp5kIgKr9iMg_LIKY7Y3CtpNSib2zSJUVb408tf8Ns4kQrIM_6sxDmyftUwVE1-bCsHTuMo2WTPS4monaiGxJbK3jPmBENnMvz5axxe4S1zuScsyjwFNECl66Wq6XCvfxHke0ZIhI2Q7lrrso69EkFPvvwZDwXHNUH0n8xSsNHtEg69UsnW3AYguyRh-7lVLvuEPBX3hQ'
    },
    {
      id: 'steel-pulse',
      artist: 'Steel Pulse',
      genre: 'Reggae',
      genreCategory: 'reggae',
      location: 'Handsworth',
      year: '1975',
      era: '1970s',
      headline: 'Reggae, identity and Birmingham’s multicultural sound.',
      description: 'Steel Pulse emerged from Handsworth and became internationally recognised for politically conscious reggae rooted in Birmingham’s multicultural communities.',
      readTime: '11 MIN READ',
      curatorialNote: 'Handsworth became the crucible of British reggae, addressing social reality with soulful brass, roots drumming, and poetic conscience.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Vk8HS8ZS3MHHIDM0eQDNqYbK6EYNrCxvMLtb9XHo4uWPbIK07qtRai_Gcj808CiuAIU6gQ7gNA6fEXO9nI9Xz25UNOKV5aRiDPuk4g3MUJ0OCEbjJ5_C4vM1QwA-ZOk-GXTkIsoWf53Kj6DShX6KWyXdhcacJCjEe3FSFKfFjoAbece98sv9CTT-QfJe4_JKCKnRzKIFAbEb0NL55140VRgRYlUWiSsKKkLj-GtLFI1FpcTlIyNn'
    },
    {
      id: 'ub40',
      artist: 'UB40',
      genre: 'Reggae',
      genreCategory: 'reggae',
      location: 'Birmingham',
      year: '1978',
      era: 'Late 1970s',
      headline: 'Reggae from the city to audiences around the world.',
      description: 'UB40 formed in Birmingham in 1978 and took a distinctly Birmingham reggae sound to an international audience.',
      readTime: '12 MIN READ',
      curatorialNote: 'Named after the Department of Health and Social Security unemployment benefit attendance card, channeling urban working-class solidarity into global anthems.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAWDXI_9sdurlIEbHTSN-Tu3W7Z-c7AnWBRbz0EWvFrljVFbvu4hk4s6BCHy_v_vyxA3hbyHRqfZMcGTXLN5DTvEEmTx5dBLZgNknQam5S52R6hQKW35z0lkGNxO-J9Sg0Zd8CvqUtSZ8diy-4hovoucmTL-dvwArhPNVJ0nQB0i3IzW2B9_hSEqGZRgs6duQ5iZhpn5dD949eBopoqPEdGWrYOJPCKcHND9S9vTNOZZf5d9Px7i_f'
    },
    {
      id: 'duran-duran',
      artist: 'Duran Duran',
      genre: 'New Wave / New Romantic',
      genreCategory: 'newwave',
      location: 'The Rum Runner, Birmingham',
      year: '1978',
      era: '1978 - 1980s',
      headline: 'New Romantic music emerging from Birmingham nightlife.',
      description: 'Duran Duran formed in Birmingham in 1978 and developed around the city’s Rum Runner nightclub before becoming internationally successful.',
      readTime: '10 MIN READ',
      curatorialNote: 'Broad Street’s Rum Runner provided the rehearsal rooms, styling labs, and stage where synth arpeggios met dancefloor fashion.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAUwmHKAfCU8lLN6IFudrJ7TMedDWxX7nUj92YelSRbHIMhq0TXsZlm92NiJX7WyLgSipj5D1O07jP1hAsrFYFkBub82SbAblW9rqT1UgIGs01geOOkrjUlDuAF6WwyYxBdR7xsQP5gqB30NelnlRWf-TX7FYgWcYSdlejul2E3aweOJ3_NflHJOnmieCHHU-ezGnV-AR_s7KeKZUtXkwBzBTk9ASK7WsxmRIe6DDc4zjzhC2KX4Fc'
    },
    {
      id: 'elo',
      artist: 'Electric Light Orchestra',
      genre: 'Rock & Pop',
      genreCategory: 'rock',
      location: 'Birmingham',
      year: 'Early 1970s',
      era: 'Early 1970s',
      headline: 'Orchestral rock and symphonic pop from the Midlands.',
      description: 'Electric Light Orchestra emerged from Birmingham and combined rock and pop songwriting with orchestral arrangements.',
      readTime: '13 MIN READ',
      curatorialNote: 'Roy Wood and Jeff Lynne merged classical string sections with classic Beatlesque harmonies and stadium synthesizers.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbO9nUpmhLK3ubvMbR5ymDBJGRGD-QSGT89wT9u-ooNzfOlJWZist14FlETbMyCmMRTS8qP5ez61NPpOIYJQtS9-UxQpc4kCeNTy6XxvGC_0AD2A0Gqq__GK2_swEcy42lMzNjRPufq7wMW3WETc4lCwPgSGliHs9ullJpegOrrIFNmlJk82_839J9USLIu-ytJDjVtqddSOWGIH65Fw3hgfw_BdwAtlceYVWEd0AQol2oOxBit3g2'
    }
  ];

  /* Map Locations Data */
  const mapLocations = {
    'Aston': {
      sector: 'Sector: Aston',
      title: 'The Crown Inn & Aston Roots',
      description: 'Where Black Sabbath formed in 1968. The atmospheric Victorian surroundings of Aston served as the crucible for heavy guitar riffs and the origins of heavy metal.',
      era: '1968 - 1972',
      landmark: 'The Crown Inn, Aston',
      status: 'Verified Heritage Site',
      associatedStoryId: 'black-sabbath'
    },
    'Handsworth': {
      sector: 'Sector: Handsworth',
      title: 'Steel Pulse & Cultural Hubs',
      description: 'Steel Pulse emerged from Handsworth and became internationally recognised for politically conscious reggae rooted in Birmingham’s multicultural communities.',
      era: '1970s - 1980s',
      landmark: 'Handsworth Cultural Centres',
      status: 'Civil Rights & Music Landmark',
      associatedStoryId: 'steel-pulse'
    },
    'City Centre': {
      sector: 'Sector: City Centre',
      title: 'Urban Venues & Musical Movements',
      description: 'Birmingham’s city centre venues fostered cross-pollinating movements from British Bhangra gatherings to early rock and reggae showcases.',
      era: '1970s - Present',
      landmark: 'Digbeth & Town Hall Circuit',
      status: 'City Cultural Core',
      associatedStoryId: 'elo'
    },
    'Broad Street': {
      sector: 'Sector: Broad Street',
      title: 'The Rum Runner Nightclub',
      description: 'Duran Duran formed in Birmingham in 1978 and developed around the city’s Rum Runner nightclub on Broad Street before becoming internationally successful.',
      era: '1978 - 1982',
      landmark: 'The Rum Runner (Broad Street)',
      status: 'New Romantic Epicentre',
      associatedStoryId: 'duran-duran'
    }
  };

  /* ============================================================================
   * 2. DYNAMIC RENDERING: FEATURED STORIES
   * ============================================================================
   * Generates the featured story cards into the grid from the data array.
   */

  const storiesContainer = document.getElementById('stories-grid');

  function renderStories(items) {
    if (!storiesContainer) return;
    storiesContainer.innerHTML = '';

    if (items.length === 0) {
      storiesContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.1rem; color: var(--brass-light); margin-bottom: 1rem;">No archival stories match this selected category.</p>
          <button class="btn-secondary" onclick="window.resetGenreFilter()">Show All Archives</button>
        </div>
      `;
      return;
    }

    items.forEach((story, index) => {
      const card = document.createElement('article');
      card.className = `story-card ${index % 2 === 1 ? 'offset-card' : ''}`;
      card.setAttribute('data-genre', story.genreCategory);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Read archive for ${story.artist}`);

      card.innerHTML = `
        <div class="story-visual-frame">
          <img class="story-visual-image" src="${story.image}" alt="${story.artist} archival portrait" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="story-poster-art" style="display: none;">
            <span style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--brass);">${story.artist}</span>
            <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-dim); margin-top: 0.5rem;">${story.location} • ${story.year || story.era}</span>
          </div>
        </div>
        <div>
          <div class="story-meta-header">
            <span class="story-location-genre">${story.artist} • ${story.location}</span>
            <span class="story-read-time">${story.readTime}</span>
          </div>
          <h3 class="story-heading serif-heading">${story.headline}</h3>
          <p class="story-excerpt">${story.description}</p>
        </div>
        <div class="story-read-action">
          <span>Read Exhibition Archive</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      `;

      // Event listener to open modal on click or Enter key
      const openHandler = () => openStoryModal(story);
      card.addEventListener('click', openHandler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openHandler();
        }
      });

      storiesContainer.appendChild(card);
    });
  }

  // Initial render of all stories
  renderStories(musicStories);

  /* ============================================================================
   * 3. GENRE FILTERING LOGIC (Instant dynamic filtering)
   * ============================================================================
   * When a genre control button is selected, the list is filtered instantly
   * without a page reload, and the active button state is highlighted.
   */

  const genreButtons = document.querySelectorAll('.genre-btn');
  const sonicMovementCards = document.querySelectorAll('.movement-card');

  function filterGenre(genreKey) {
    // 1. Update filter button visual states
    genreButtons.forEach(btn => {
      const btnGenre = btn.getAttribute('data-genre');
      if (btnGenre === genreKey) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // 2. Filter featured stories grid
    if (genreKey === 'all') {
      renderStories(musicStories);
    } else {
      const filtered = musicStories.filter(story => story.genreCategory === genreKey);
      renderStories(filtered);
    }

    // 3. Highlight / filter the 5 sonic movement cards
    sonicMovementCards.forEach(card => {
      const cardGenre = card.getAttribute('data-genre');
      if (genreKey === 'all' || cardGenre === genreKey) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  // Attach click listeners to all genre filter buttons
  genreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const genre = e.currentTarget.getAttribute('data-genre');
      filterGenre(genre);
    });
  });

  // Global helper for resetting filters
  window.resetGenreFilter = () => filterGenre('all');

  /* ============================================================================
   * 4. BIRMINGHAM SOUND MAP INTERACTION
   * ============================================================================
   * Clicking a coordinate node updates the sector inspector panel dynamically.
   */

  const mapNodeButtons = document.querySelectorAll('.map-node-button');
  const inspectorSector = document.getElementById('inspector-sector');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorDesc = document.getElementById('inspector-desc');
  const inspectorEra = document.getElementById('inspector-era');
  const inspectorLandmark = document.getElementById('inspector-landmark');
  const inspectorStatus = document.getElementById('inspector-status');
  const inspectorActionBtn = document.getElementById('inspector-action-btn');

  let currentSelectedLocation = 'Aston';

  function selectMapLocation(locationName) {
    const data = mapLocations[locationName];
    if (!data) return;

    currentSelectedLocation = locationName;

    // Update active node styling
    mapNodeButtons.forEach(node => {
      if (node.getAttribute('data-location') === locationName) {
        node.classList.add('active');
        node.setAttribute('aria-selected', 'true');
      } else {
        node.classList.remove('active');
        node.setAttribute('aria-selected', 'false');
      }
    });

    // Update inspector panel content
    if (inspectorSector) inspectorSector.textContent = data.sector;
    if (inspectorTitle) inspectorTitle.textContent = data.title;
    if (inspectorDesc) inspectorDesc.textContent = data.description;
    if (inspectorEra) inspectorEra.textContent = data.era;
    if (inspectorLandmark) inspectorLandmark.textContent = data.landmark;
    if (inspectorStatus) inspectorStatus.textContent = data.status;

    // Pulse feedback on inspector
    const inspectorCard = document.querySelector('.map-inspector-card');
    if (inspectorCard) {
      inspectorCard.style.borderColor = 'var(--brass)';
      setTimeout(() => {
        inspectorCard.style.borderColor = 'var(--border-subtle)';
      }, 400);
    }
  }

  // Attach click listeners to map node buttons
  mapNodeButtons.forEach(node => {
    node.addEventListener('click', () => {
      const loc = node.getAttribute('data-location');
      selectMapLocation(loc);
    });
  });

  // Wire up the inspector panel action button
  if (inspectorActionBtn) {
    inspectorActionBtn.addEventListener('click', () => {
      const data = mapLocations[currentSelectedLocation];
      if (data && data.associatedStoryId) {
        const found = musicStories.find(s => s.id === data.associatedStoryId);
        if (found) {
          openStoryModal(found);
          return;
        }
      }
      // Fallback sector record
      openStoryModal({
        artist: `${currentSelectedLocation} Sector Archive`,
        genre: 'Geographic Watershed',
        location: currentSelectedLocation,
        year: data.era,
        headline: data.title,
        description: data.description,
        curatorialNote: `Preserved record of ${data.landmark}. Official status: ${data.status}.`
      });
    });
  }

  /* ============================================================================
   * 5. STORY MODAL (Accessible pop-up for reading archival records)
   * ============================================================================
   * Includes keyboard trapping, ESC key listener, and focus restoration.
   */

  const storyModal = document.getElementById('story-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalAudioBtn = document.getElementById('modal-audio-btn');
  const modalKicker = document.getElementById('modal-kicker');
  const modalTitle = document.getElementById('modal-title');
  const modalMetaRow = document.getElementById('modal-meta-row');
  const modalBody = document.getElementById('modal-body');

  let previousActiveElement = null;

  function openStoryModal(item) {
    if (!storyModal) return;

    previousActiveElement = document.activeElement;

    if (modalKicker) modalKicker.textContent = `Permanent Archive • ${item.genre || 'Exhibition Entry'}`;
    if (modalTitle) modalTitle.textContent = item.artist;

    if (modalMetaRow) {
      modalMetaRow.innerHTML = `
        <div><strong>Location:</strong> ${item.location}</div>
        <div><strong>Year/Era:</strong> ${item.year || item.era || 'Historical Watershed'}</div>
        <div><strong>Movement:</strong> ${item.genre}</div>
      `;
    }

    if (modalBody) {
      modalBody.innerHTML = `
        <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--brass-light); margin-bottom: 1rem;">
          ${item.headline || item.artist}
        </h4>
        <p style="margin-bottom: 1.25rem; font-size: 1.05rem; color: var(--text-body); line-height: 1.7;">
          ${item.description}
        </p>
        ${item.curatorialNote ? `
          <div style="background: rgba(14,14,14,0.6); border-left: 2px solid var(--brass); padding: 1rem; margin-top: 1rem;">
            <span style="display: block; font-size: 0.725rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--brass); font-weight: 700; margin-bottom: 0.25rem;">Curator's Exhibition Note</span>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0; line-height: 1.5;">${item.curatorialNote}</p>
          </div>
        ` : ''}
      `;
    }

    // Show modal
    storyModal.classList.add('is-open');
    storyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeStoryModal() {
    if (!storyModal) return;

    storyModal.classList.remove('is-open');
    storyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus to trigger element
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  }

  // Close triggers
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeStoryModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeStoryModal);

  // Click outside dialog to close
  if (storyModal) {
    storyModal.addEventListener('click', (e) => {
      if (e.target === storyModal) {
        closeStoryModal();
      }
    });
  }

  // Keyboard accessibility: ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && storyModal && storyModal.classList.contains('is-open')) {
      closeStoryModal();
    }
  });

  // Attach modal trigger to the 5 Exhibition Poster cards
  sonicMovementCards.forEach(card => {
    card.addEventListener('click', () => {
      const genre = card.getAttribute('data-genre');
      const foundStory = musicStories.find(s => s.genreCategory === genre);
      if (foundStory) {
        openStoryModal(foundStory);
      } else {
        const title = card.querySelector('.movement-title')?.textContent || 'Exhibition Entry';
        const meta = card.querySelector('.movement-meta')?.textContent || 'Birmingham';
        const copy = card.querySelector('.movement-copy')?.textContent || '';
        openStoryModal({
          artist: title,
          genre: title,
          location: meta,
          year: meta,
          headline: title,
          description: copy
        });
      }
    });
  });

  /* ============================================================================
   * 6. MUSIC THROUGH TIME (Interactive timeline milestones)
   * ============================================================================
   * Hovering or selecting any timeline card provides interactive feedback
   * and opens the relevant archival story.
   */

  const timelineCards = document.querySelectorAll('.timeline-card');
  timelineCards.forEach(card => {
    card.addEventListener('click', () => {
      // Clear previous active states
      timelineCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const targetStoryId = card.getAttribute('data-story-id');
      if (targetStoryId) {
        const found = musicStories.find(s => s.id === targetStoryId);
        if (found) {
          openStoryModal(found);
          return;
        }
      }

      // Default card preview
      const year = card.querySelector('.timeline-card-year')?.textContent || '';
      const title = card.querySelector('.timeline-card-title')?.textContent || '';
      const copy = card.querySelector('.timeline-card-copy')?.textContent || '';
      openStoryModal({
        artist: title,
        genre: 'Timeline Archive',
        location: 'Birmingham',
        year: year,
        headline: `${year} — ${title}`,
        description: copy
      });
    });
  });

  /* ============================================================================
   * 7. ANALOG SOUND EFFECT SIMULATOR (Web Audio API)
   * ============================================================================
   * Simulates a subtle vintage vinyl needle-drop and ambient tape warmth
   * completely client-side without any external audio files or dependencies.
   */

  function playVinylNeedleEffect() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 1. Warm low-frequency thumb / needle drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);

      // 2. Vinyl hiss / crackle burst
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // intermittent vinyl pops
        data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.98 ? 0.4 : 0.04);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 850;
      filter.Q.value = 1.2;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();

      showToast('Archival acoustic sample stream active');
    } catch (e) {
      console.log('AudioContext initialized upon user engagement.');
    }
  }

  if (modalAudioBtn) {
    modalAudioBtn.addEventListener('click', () => {
      playVinylNeedleEffect();
    });
  }

  /* ============================================================================
   * 8. ARCHIVE SEARCH SYSTEM
   * ============================================================================
   * Lets users search across artists, genres, and neighbourhoods.
   */

  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('archive-search-input');
  const searchResults = document.getElementById('search-results');
  const searchCloseBtn = document.getElementById('search-close-btn');

  function toggleSearch(show) {
    if (!searchOverlay) return;
    const isActive = show !== undefined ? show : !searchOverlay.classList.contains('is-active');

    if (isActive) {
      searchOverlay.classList.add('is-active');
      searchOverlay.setAttribute('aria-hidden', 'false');
      if (searchInput) {
        searchInput.value = '';
        setTimeout(() => searchInput.focus(), 150);
      }
      renderSearchResults('');
    } else {
      searchOverlay.classList.remove('is-active');
      searchOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const clean = query.trim().toLowerCase();

    if (!clean) {
      searchResults.innerHTML = `
        <div style="padding: 1rem 0; color: var(--text-dim); font-size: 0.9rem;">
          Type an artist, genre (e.g. "Heavy Metal", "Reggae"), or location ("Aston", "Handsworth").
        </div>
      `;
      return;
    }

    const matches = musicStories.filter(story => {
      return (
        story.artist.toLowerCase().includes(clean) ||
        story.genre.toLowerCase().includes(clean) ||
        story.location.toLowerCase().includes(clean) ||
        story.description.toLowerCase().includes(clean) ||
        (story.year && story.year.toLowerCase().includes(clean))
      );
    });

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div style="padding: 1rem 0; color: var(--text-dim); font-size: 0.9rem;">
          No archival records found matching "${query}".
        </div>
      `;
      return;
    }

    searchResults.innerHTML = matches.map(m => `
      <div class="search-result-item" data-id="${m.id}" tabindex="0">
        <div>
          <strong style="color: var(--text-primary); font-family: var(--font-serif); font-size: 1.15rem;">${m.artist}</strong>
          <span style="font-size: 0.8rem; color: var(--brass); margin-left: 0.5rem;">[${m.genre}]</span>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${m.location} • ${m.year || m.era}</div>
        </div>
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--brass); letter-spacing: 0.1em;">Inspect →</span>
      </div>
    `).join('');

    // Attach click to results
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
      const id = item.getAttribute('data-id');
      const story = musicStories.find(s => s.id === id);
      const select = () => {
        toggleSearch(false);
        if (story) openStoryModal(story);
      };
      item.addEventListener('click', select);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') select();
      });
    });
  }

  if (searchToggleBtn) searchToggleBtn.addEventListener('click', () => toggleSearch(true));
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', () => toggleSearch(false));
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
  }

  // Close search overlay on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('is-active')) {
      toggleSearch(false);
    }
  });

  /* ============================================================================
   * 9. TOAST NOTIFICATIONS & SMOOTH NAVIGATION
   * ============================================================================
   */

  function showToast(msg) {
    const toast = document.getElementById('archive-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const siteNav = document.getElementById('site-nav');
  if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener('click', () => {
      siteNav.classList.toggle('mobile-open');
      const expanded = siteNav.classList.contains('mobile-open');
      mobileMenuBtn.setAttribute('aria-expanded', expanded);
    });

    // Close mobile nav on link click
    siteNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('mobile-open');
      });
    });
  }

  // Active navigation highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  console.log('Birmingham Music Stories digital exhibition initialized.');
});
