const FORM_ENDPOINT = ''; // Replace with your real Formspree endpoint, e.g. https://formspree.io/f/abcdwxyz
const OWNER_EMAIL = 'robert.z.lehr@gmail.com';

const frameworkSections = [
  ['What (Observation)', 'Define the core issue or fact observed.'],
  ['Why (Significance / Non-significance)', 'Explain why it matters or might not matter.'],
  ['How (Methodology)', 'Describe how it was addressed and how it could be addressed.'],
  ['Who (Impact Distribution)', 'Identify who benefits, who is harmed, and who is unaffected.'],
  ['Where (Scope)', 'Specify where it applies or does not apply.'],
  ['When (Timing)', 'Define when it matters or does not matter.'],
  ['If (Decision Path)', 'Evaluate whether action or inaction aligns with objectives.'],
  ['Which (Constraints)', 'Identify limiting conditions.'],
  ['Which (Resources)', 'Identify required resources such as time, funding, and expertise.'],
  ['What If (Failures & Mitigation)', 'Define failure scenarios and how to respond.']
];

const concepts = [
  {
    id: 'index',
    title: 'Index',
    acronym: 'CATALOGUE',
    description: 'Central index of concepts, prototypes, frameworks, systems, public infrastructure ideas, educational tools, and design experiments.',
    image: 'Concept Navigation',
    links: [
      'SMS: Stoplight Mounted Shade',
      'PFYT: Penny For Your Thoughts?',
      'CVATC: Community Voice at the Corner',
      'MR IF: Model-To-Reality Invariants Framework Atlas',
      'TWSH: Tools-Widgets-Services Hub',
      'OKT: Origami-Kirigami Templates',
      'TT: Twin Towers',
      'ES: EarthScrapers',
      'IT: Important Trivia',
      'Bable Clef & Anamorphic Sculptures',
      'TBR: Thematic Bike Racks',
      'HCGS: Heat Code Color System',
      'FEE: Free Energy Engagement',
      'THH: Transformable High Heels',
      'TYFTOTB: Thank You For Thinking Outside The Box',
      'Chroma',
      'CUTF: Cool UT Fans',
      'RSF: Robert\'s Scientific Method'
    ]
  },
  {
    id: 'sms',
    title: 'Stoplight Mounted Shade',
    acronym: 'SMS',
    description: 'Modular retrofit shade systems attached to traffic signal poles for pedestrian heat mitigation, thermal comfort, and urban resilience.'
  },
  {
    id: 'mrif',
    title: 'Model-To-Reality Invariants Framework Atlas',
    acronym: 'MR IF',
    description: 'A structured ontology for mapping real-world problem structures to mathematical models, solver families, assumptions, and uncertainty domains.'
  },
  {
    id: 'twsh',
    title: 'Tools Widgets Services Hub',
    acronym: 'TWSH',
    description: 'A modular ecosystem of utilities, widgets, templates, services, and educational tooling.'
  }
];

const tabsContainer = document.getElementById('tabs');
const contentContainer = document.getElementById('content');

function createTabs() {
  concepts.forEach((concept, index) => {
    const button = document.createElement('button');
    button.className = 'tab';
    button.textContent = concept.acronym;
    button.addEventListener('click', () => renderConcept(index));
    tabsContainer.appendChild(button);
  });
}

function renderConcept(index) {
  document.querySelectorAll('.tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  const concept = concepts[index];

  const frameworkHtml = frameworkSections.map(([title, description]) => `
    <article class="framework-card">
      <h3>${title}</h3>
      <p>${description}</p>
    </article>
  `).join('');

  const indexHtml = concept.links ? `
    <div class="framework-grid">
      ${concept.links.map(link => `<article class="framework-card"><h3>${link}</h3><p>Placeholder summary and hyperlink target.</p></article>`).join('')}
    </div>
  ` : `
    <div class="framework-grid">
      ${frameworkHtml}
    </div>
  `;

  contentContainer.innerHTML = `
    <section class="hero">
      <div class="image-placeholder">
        <span>${concept.image || 'Concept Image Placeholder'}</span>
      </div>

      <div class="concept-meta">
        <p class="acronym">${concept.acronym}</p>
        <h2>${concept.title}</h2>
        <p class="tagline">${concept.description}</p>
      </div>
    </section>

    ${indexHtml}

    <section class="feedback">
      <h2>Feedback</h2>
      <p class="tagline">Submit feedback, ideas, critiques, collaboration proposals, references, or implementation suggestions.</p>

      <form class="feedback-form" data-concept="${concept.title}">
        <input type="hidden" name="concept" value="${concept.title}" />
        <input type="hidden" name="_subject" value="Concepts Catalogue Feedback: ${concept.title}" />

        <label>
          Optional Email
          <input type="email" name="email" placeholder="your@email.com" />
        </label>

        <label>
          Feedback
          <textarea name="message" placeholder="Enter feedback or commentary here." required></textarea>
        </label>

        <button type="submit">Submit Feedback</button>
        <p class="form-status" aria-live="polite"></p>
      </form>
    </section>
  `;

  attachFeedbackHandler();
}

function attachFeedbackHandler() {
  const form = document.querySelector('.feedback-form');
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const concept = formData.get('concept');
    const visitorEmail = formData.get('email');
    const message = formData.get('message');

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Concepts Catalogue Feedback: ${concept}`);
      const body = encodeURIComponent(
        `Concept: ${concept}\n` +
        `Visitor email: ${visitorEmail || 'Not provided'}\n\n` +
        `Feedback:\n${message}`
      );
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email app because no live Formspree endpoint has been configured yet.';
      return;
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Form service rejected the submission.');
      }

      form.reset();
      status.textContent = 'Feedback submitted.';
    } catch (error) {
      status.textContent = 'Submission failed. Check the form endpoint or try again later.';
    }
  });
}

createTabs();
renderConcept(0);

document.getElementById('year').textContent = new Date().getFullYear();