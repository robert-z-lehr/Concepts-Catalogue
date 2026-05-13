const FORM_ENDPOINT = 'https://formspree.io/f/mdabjdal';
const OWNER_EMAIL = 'robert.z.lehr@gmail.com';

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
  { acronym:'CATALOGUE', title:'Concepts Index', description:'Central index of experimental systems, public infrastructure concepts, educational tools, and design frameworks.', sections:['An organized atlas of concepts and research directions.','Creates continuity across otherwise disconnected projects.','Structured as a navigable GitHub Pages knowledge system.','Useful to collaborators, reviewers, students, and institutions.','Applicable across engineering, design, education, and systems thinking.','Expands continuously as concepts evolve.','Used to evaluate which concepts deserve deeper development.','Requires maintenance and information architecture discipline.','Requires GitHub Pages, documentation effort, and media assets.','Without organization, concepts become fragmented and difficult to revisit.'] },
  { acronym:'SMS', title:'Stoplight Mounted Shade', description:'Retrofit modular shade systems attached to traffic signal poles to reduce pedestrian heat exposure.', sections:['Urban intersections expose pedestrians to dangerous radiant heat.','Could reduce thermal stress, improve walkability, and support equity.','Uses modular cantilevered shade systems mounted to existing poles.','Benefits pedestrians, transit users, and heat-vulnerable populations.','Applicable primarily in dense urban corridors.','Most important during extreme heat periods.','Deployment depends on safety, cost, and maintenance tradeoffs.','Structural loads, permitting, and liability are major constraints.','Requires engineering analysis, municipal partnerships, and funding.','Improper designs could create visibility, wind, or maintenance issues.'] },
  { acronym:'PFYT', title:'Penny For Your Thoughts?', description:'A physical or digital token system encouraging public engagement and idea sharing.', sections:['Public feedback systems are often ignored or inaccessible.','Creates playful engagement around participation and feedback.','Uses symbolic tokens, QR systems, or business-card-like exchanges.','Benefits civic organizations and community engagement efforts.','Applicable in campuses, public events, and urban spaces.','Most effective during campaigns or public interaction periods.','Can be scaled from analog tokens to digital platforms.','Participation fatigue and vandalism are constraints.','Requires design, printing, and lightweight digital infrastructure.','Without moderation, systems may attract spam or misuse.'] },
  { acronym:'CVATC', title:'Community Voice At The Corner', description:'Intersection-based public feedback and civic engagement system.', sections:['Cities often lack hyperlocal pedestrian feedback mechanisms.','Could provide geographically precise civic sentiment data.','Uses QR-linked interaction systems mounted near intersections.','Benefits planners, residents, and local governments.','Applicable at transit stops and major pedestrian nodes.','Useful during infrastructure changes or planning processes.','Can complement traditional public meetings.','Data quality and abuse prevention are constraints.','Requires web infrastructure and institutional cooperation.','Without moderation, collected data may become unreliable.'] },
  { acronym:'MR IF', title:'Model-To-Reality Invariants Framework Atlas', description:'A taxonomy mapping real-world problems to mathematical structures and solver families.', sections:['Many people misuse analytical tools outside their valid domains.','Could improve reasoning, education, and model selection.','Uses invariant dimensions such as agents, uncertainty, and objectives.','Benefits researchers, students, and engineers.','Applicable across scientific and engineering disciplines.','Most valuable during problem formulation stages.','Acts as a decision-support and educational framework.','Completeness and ontology definition are difficult constraints.','Requires domain expertise, examples, and iterative refinement.','Oversimplification could reduce practical credibility.'] },
  { acronym:'TWSH', title:'Tools Widgets Services Hub', description:'A modular digital ecosystem for utilities, widgets, educational tools, and lightweight services.', sections:['Useful micro-tools are often scattered and poorly integrated.','Could centralize productivity and educational tooling.','Built as modular web-based utilities.','Benefits students, researchers, and creators.','Applicable online through lightweight web interfaces.','Expands over time as new tools are added.','Allows progressive scaling from utilities to platforms.','Long-term maintenance is a major challenge.','Requires frontend development and hosting.','Without curation, the hub could become cluttered.'] },
  { acronym:'OKT', title:'Origami Kirigami Templates', description:'Printable educational folding templates with guided fold logic.', sections:['Many beginners struggle understanding fold sequencing.','Could improve spatial reasoning and educational accessibility.','Uses printable labeled fold templates and diagrams.','Benefits educators, students, and hobbyists.','Applicable in STEAM education and design learning.','Useful during instructional workshops and self-learning.','Can evolve into interactive digital tools.','Template clarity and print usability are constraints.','Requires graphics, instructional systems, and testing.','Poor instructional clarity could frustrate users.'] },
  { acronym:'TT', title:'Twin Towers', description:'A conceptual architectural or symbolic dual-structure system.', sections:['A dual-structure concept needs a defined symbolic or functional purpose.','Could serve as an architectural, memorial, or systems-comparison concept.','Would use paired forms, mirrored logic, or contrasting towers.','Could affect visitors, institutions, designers, and surrounding communities.','Best suited to sites where paired vertical forms have spatial meaning.','Most relevant during early architectural or public-art concept development.','Proceed only if the duality communicates a clear idea.','Ambiguity, cost, site fit, and symbolic interpretation are constraints.','Requires drawings, narrative framing, structural review, and site context.','If the symbolism is unclear, the concept may read as arbitrary massing.'] },
  { acronym:'ES', title:'EarthScrapers', description:'Downward-oriented mega-structures integrated into the earth.', sections:['Traditional skyscrapers prioritize vertical exposure above ground.','Could improve thermal stability and land-use efficiency.','Explores subterranean megastructure feasibility.','Benefits dense cities and climate-resilient infrastructure research.','Applicable where geology and groundwater conditions permit.','Most relevant under extreme urban density or climate stress.','Could integrate geothermal and passive climate strategies.','Excavation, psychology, and safety are major constraints.','Requires advanced engineering and large capital investment.','Flooding, ventilation failure, or evacuation complexity are risks.'] },
  { acronym:'IT', title:'Important Trivia', description:'A curated trivia and knowledge engagement platform.', sections:['Useful facts are often isolated from context and retention systems.','Curated trivia can make knowledge memorable and socially shareable.','Uses concise entries, categories, sources, and recall prompts.','Benefits learners, educators, presenters, and curious general audiences.','Applicable in classrooms, websites, social media, and exhibits.','Most useful when paired with recurring learning or discussion formats.','Use when the fact teaches a larger pattern or misconception.','Accuracy, sourcing, and trivialization are constraints.','Requires research, citation management, and editorial standards.','Poor sourcing can turn educational trivia into misinformation.'] },
  { acronym:'BC', title:'Bable Clef & Anamorphic Sculptures', description:'Large-scale anamorphic sculptures resolving into musical symbols from precise viewpoints.', sections:['Public art rarely integrates engineered perceptual geometry.','Could create memorable civic landmarks tied to music identity.','Uses anamorphic geometry and controlled sightlines.','Benefits cities, tourism, and public art programs.','Applicable in plazas, campuses, and cultural districts.','Most effective in high pedestrian visibility areas.','Can scale from prototypes to monumental installations.','Fabrication complexity and funding are major constraints.','Requires artists, fabricators, sponsors, and structural review.','If geometry is poorly executed, the illusion fails.'] },
  { acronym:'TBR', title:'Thematic Bike Racks', description:'Bike racks integrated with thematic identity and placemaking.', sections:['Bike racks are often treated as purely utilitarian objects.','Thematic racks can combine mobility infrastructure with place identity.','Uses functional rack geometries shaped around local themes.','Benefits cyclists, districts, artists, and public-realm programs.','Applicable in campuses, corridors, parks, and commercial districts.','Most useful during streetscape upgrades or public-art campaigns.','Deploy if the form still preserves secure bicycle locking.','ADA clearance, durability, and theft resistance are constraints.','Requires fabrication, siting, permitting, and maintenance planning.','Overly sculptural racks may fail if they are hard to use.'] },
  { acronym:'HCGS', title:'Heat Code Color System', description:'A public-facing thermal risk communication standard using intuitive colors.', sections:['Heat danger communication is inconsistent and confusing.','Could improve public heat awareness and behavior.','Uses standardized color-coded heat severity levels.','Benefits the public, workers, and vulnerable populations.','Applicable in cities, campuses, and weather systems.','Most critical during dangerous heat events.','Can integrate with apps, signs, and forecasts.','Public interpretation consistency is a challenge.','Requires meteorological integration and design standards.','Poor calibration could reduce trust in the system.'] },
  { acronym:'FEE', title:'Free Energy Engagement', description:'Gamified public engagement around energy use and demand response.', sections:['Demand response programs may not reach all user groups equally.','Could make energy education and conservation more participatory.','Uses social incentives, credits, influencers, or gamified challenges.','Benefits utilities, households, educators, and grid operators.','Applicable in cities, campuses, and utility service areas.','Most useful during peak demand and energy-education campaigns.','Deploy if incentives align with real grid benefits.','Privacy, equity, and measurement integrity are constraints.','Requires utility partnerships, outreach, and behavioral data design.','Bad incentives could reward superficial engagement rather than savings.'] },
  { acronym:'THH', title:'Transformable High Heels', description:'Adaptive footwear capable of changing form or functionality.', sections:['Fashion footwear often sacrifices comfort, mobility, or adaptability.','Transformable heels could bridge aesthetics and practical movement.','Uses mechanical transformation between heel heights or modes.','Benefits wearers seeking style flexibility and comfort.','Applicable in fashion, performance, accessibility, and travel contexts.','Most useful across long events or transitions between settings.','Proceed if the mechanism is stable, safe, and elegant.','Load-bearing safety, durability, and comfort are constraints.','Requires product design, prototyping, materials testing, and user trials.','Mechanical failure could create injury or reputational risk.'] },
  { acronym:'TYFTOTB', title:'Thank You For Thinking Outside The Box', description:'A symbolic recognition system rewarding unconventional thinking.', sections:['Creative thinking is often praised abstractly but rarely recognized tangibly.','A recognition system can reinforce constructive unconventional thought.','Uses cards, tokens, digital badges, or social acknowledgments.','Benefits teams, students, innovators, and facilitators.','Applicable in classrooms, workshops, labs, and organizations.','Most useful during brainstorming, critique, and project reviews.','Use when recognition encourages rigor rather than empty novelty.','Risk of performative creativity and vague criteria is a constraint.','Requires criteria, visual identity, and distribution workflow.','If overused, the recognition loses meaning.'] },
  { acronym:'CHROMA', title:'Chroma', description:'A musically and chromatically linked album concept.', sections:['Music and color are often linked subjectively but not structurally.','A chromatic album can create a coherent sensory and thematic identity.','Uses color palettes, harmonic language, titles, and visual systems.','Benefits listeners, performers, designers, and multimedia audiences.','Applicable in albums, live shows, installations, and digital releases.','Most relevant during composition, branding, and performance design.','Proceed if musical content remains primary rather than decorative.','Synesthetic claims, coherence, and production scope are constraints.','Requires composition, visual design, recording, and release planning.','A weak color-music mapping could feel arbitrary.'] },
  { acronym:'CUTF', title:'Cool UT Fans', description:'Cooling-oriented public engagement or fan distribution concept.', sections:['Outdoor campus heat can reduce comfort and participation.','Fans or cooling engagement tools could support thermal relief.','Uses branded fans, passive cooling prompts, or event-based distribution.','Benefits students, visitors, event staff, and heat-exposed groups.','Applicable on campus paths, events, queues, and outdoor venues.','Most useful during hot months and high-attendance events.','Deploy if comfort benefits justify cost and waste management.','Battery use, litter, durability, and safety are constraints.','Requires procurement, distribution, and maintenance planning.','Poorly designed giveaways may become waste rather than infrastructure.'] },
  { acronym:'RSF', title:"Robert's Scientific Framework", description:'A structured reasoning methodology integrating systems thinking and inquiry.', sections:['Many workflows lack structured interrogation methods.','Could improve analytical rigor and interdisciplinary reasoning.','Uses discretized interrogative dimensions and system framing.','Benefits researchers, students, and decision-makers.','Applicable across technical and conceptual domains.','Useful during framing, debugging, and evaluation.','Acts as a generalized reasoning scaffold.','Can become overly abstract without examples.','Requires iteration, examples, and refinement.','Rigid usage may suppress creative flexibility.'] },
  { acronym:'UTEET', title:'UT Engineering Elevator Tabs', description:'Removable informational elevator tabs highlighting UT engineering research and initiatives.', sections:['Elevator spaces are underutilized communication surfaces.','Could expose students and visitors to active research.','Uses removable QR-linked informational tabs between elevator gaps.','Benefits departments, students, and research visibility.','Applicable in engineering and academic buildings.','Useful during events, showcases, and recruiting.','Can rotate dynamically with new projects.','Building permissions and durability are constraints.','Requires fabrication, curation, and institutional approval.','Poor design could create visual clutter or maintenance issues.'] }
];

const tabsContainer = document.getElementById('tabs');
const contentContainer = document.getElementById('content');

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

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
  document.querySelectorAll('.tab').forEach((tab, i) => tab.classList.toggle('active', i === index));
  const concept = concepts[index];
  const imagePath = `assets/concepts/${slugify(concept.acronym)}.svg`;
  const cards = frameworkLabels.map((label, i) => `<article class="framework-card"><h3>${label}</h3><p>${concept.sections[i]}</p></article>`).join('');

  contentContainer.innerHTML = `
    <section class="hero">
      <figure class="concept-image-frame">
        <img class="concept-image" src="${imagePath}" alt="Illustration for ${concept.title}" loading="lazy" />
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
  attachFeedbackHandler();
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