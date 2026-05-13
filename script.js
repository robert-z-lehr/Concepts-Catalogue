const FORM_ENDPOINT = 'https://formspree.io/f/mdabjdal';
const OWNER_EMAIL = 'robert.z.lehr@gmail.com';
const DEFAULT_CONCEPT_IMAGE = './assets/concepts/default.svg';

const frameworkLabels = [
  'What (Observation)',
  'Why (Significance)',
  'How (Methodology)',
  'Who (Impact Distribution)',
  'Where (Scope)',
  'When (Timing)',
  'If (Decision Path)',
  'Which (Constraints)',
  'Which (Resources)',
  'What If (Failures & Mitigation)'
];

const concepts = [
  {
    acronym:'CATALOGUE',
    title:'Concepts Index',
    theme:'#9b8cff',
    images:[
      './assets/concepts/default.svg',
      './assets/concepts/catalogue-2.svg'
    ],
    description:'Central index of experimental systems, public infrastructure concepts, educational tools, and design frameworks.',
    sections:['An organized atlas of concepts and research directions.','Creates continuity across otherwise disconnected projects.','Structured as a navigable GitHub Pages knowledge system.','Useful to collaborators, reviewers, students, and institutions.','Applicable across engineering, design, education, and systems thinking.','Expands continuously as concepts evolve.','Used to evaluate which concepts deserve deeper development.','Requires maintenance and information architecture discipline.','Requires GitHub Pages, documentation effort, and media assets.','Without organization, concepts become fragmented and difficult to revisit.']
  },
  {
    acronym:'SMS',
    title:'Stoplight Mounted Shade',
    theme:'#f59e0b',
    description:'Retrofit modular shade systems attached to traffic signal poles to reduce pedestrian heat exposure.',
    sections:['Urban intersections expose pedestrians to dangerous radiant heat.','Could reduce thermal stress, improve walkability, and support equity.','Uses modular cantilevered shade systems mounted to existing poles.','Benefits pedestrians, transit users, and heat-vulnerable populations.','Applicable primarily in dense urban corridors.','Most important during extreme heat periods.','Deployment depends on safety, cost, and maintenance tradeoffs.','Structural loads, permitting, and liability are major constraints.','Requires engineering analysis, municipal partnerships, and funding.','Improper designs could create visibility, wind, or maintenance issues.']
  }
];

let carouselIndex = 0;
let currentCarouselImages = [];

const tabsContainer = document.getElementById('tabs');
const contentContainer = document.getElementById('content');

function createTabs() {
  concepts.forEach((concept, index) => {
    const button = document.createElement('button');
    button.className = 'tab';
    button.textContent = concept.acronym;
    button.style.background = `linear-gradient(180deg, ${concept.theme}55 0%, #1c2230 100%)`;
    button.style.borderColor = `${concept.theme}66`;
    button.addEventListener('click', () => renderConcept(index));
    tabsContainer.appendChild(button);
  });
}

function getCarouselImages(concept) {
  if (Array.isArray(concept.images) && concept.images.length > 0) return concept.images;
  return [DEFAULT_CONCEPT_IMAGE];
}

function renderConcept(index) {
  document.querySelectorAll('.tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
    if (i === index) {
      tab.style.boxShadow = `0 10px 30px ${concepts[index].theme}44`;
      tab.style.background = `linear-gradient(180deg, ${concepts[index].theme}aa 0%, #232c3f 100%)`;
    }
  });

  const concept = concepts[index];
  currentCarouselImages = getCarouselImages(concept);
  carouselIndex = 0;

  document.documentElement.style.setProperty('--accent', concept.theme);

  const cards = frameworkLabels.map((label, i) => `
    <article class="framework-card">
      <h3>${label}</h3>
      <p>${concept.sections[i] || ''}</p>
    </article>
  `).join('');

  contentContainer.innerHTML = `
    <section class="hero">
      <figure class="concept-image-frame carousel" aria-label="Image carousel for ${concept.title}">
        <button class="carousel-button carousel-button-left" type="button">‹</button>

        <img class="concept-image" src="${currentCarouselImages[carouselIndex]}" alt="Illustration for ${concept.title}" loading="lazy" />

        <button class="carousel-button carousel-button-right" type="button">›</button>

        <figcaption class="carousel-count">${carouselIndex + 1} / ${currentCarouselImages.length}</figcaption>
      </figure>

      <div class="concept-meta">
        <p class="acronym">${concept.acronym}</p>
        <h2>${concept.title}</h2>
        <p class="tagline">${concept.description}</p>
      </div>
    </section>

    <div class="framework-grid">${cards}</div>

    <section class="feedback">
      <h2>Feedback</h2>
      <form class="feedback-form">
        <input type="hidden" name="concept" value="${concept.title}" />
        <label>Optional Email<input type="email" name="email" placeholder="your@email.com" /></label>
        <label>Feedback<textarea name="message" required></textarea></label>
        <button type="submit">Submit Feedback</button>
        <p class="form-status"></p>
      </form>
    </section>`;

  attachCarouselHandlers(concept.title);
  attachFeedbackHandler();
}

function attachCarouselHandlers(conceptTitle) {
  const frame = document.querySelector('.concept-image-frame');
  const image = document.querySelector('.concept-image');
  const count = document.querySelector('.carousel-count');
  const prev = document.querySelector('.carousel-button-left');
  const next = document.querySelector('.carousel-button-right');

  function updateCarousel(direction) {
    carouselIndex = (carouselIndex + direction + currentCarouselImages.length) % currentCarouselImages.length;
    image.src = currentCarouselImages[carouselIndex];
    image.alt = `Illustration ${carouselIndex + 1} for ${conceptTitle}`;
    count.textContent = `${carouselIndex + 1} / ${currentCarouselImages.length}`;
  }

  prev.addEventListener('click', (event) => {
    event.stopPropagation();
    updateCarousel(-1);
  });

  next.addEventListener('click', (event) => {
    event.stopPropagation();
    updateCarousel(1);
  });

  frame.addEventListener('click', (event) => {
    if (event.target.closest('.carousel-button')) return;

    frame.classList.toggle('expanded');

    if (frame.classList.contains('expanded')) {
      frame.style.transform = 'scale(1.18)';
      frame.style.zIndex = '20';
      frame.style.position = 'relative';
    } else {
      frame.style.transform = 'scale(1)';
    }
  });
}

function attachFeedbackHandler() {
  const form = document.querySelector('.feedback-form');
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    formData.append('submitted_at_local', new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'full',
      timeStyle: 'long'
    }));

    formData.append('submitted_timezone', 'America/Chicago');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error();

      form.reset();
      status.textContent = 'Feedback submitted successfully.';
    } catch (error) {
      status.textContent = 'Submission failed. Your Formspree endpoint may still be inactive or unconfirmed.';
    }
  });
}

createTabs();
renderConcept(0);

document.getElementById('year').textContent = new Date().getFullYear();