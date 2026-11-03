'use client';

import { useMemo, useState } from 'react';

const opportunities = [
  {
    id: 'google-it-support',
    name: 'Google IT Support Certificate',
    provider: 'Northstar Training Institute',
    amount: 149,
    category: 'Technology',
    initials: 'IT',
    color: 'blue',
    learner: 'Jordan M.',
    age: '2 hours ago',
    goal: 'I am ready to move from retail into an entry-level IT support role. This certificate gives me the foundation and credential employers are asking for.',
    deadline: 'Jun 28, 2027',
    hours: '6 months · flexible',
    tags: ['No degree required', 'Beginner friendly'],
    funded: false,
  },
  {
    id: 'cna-exam',
    name: 'Certified Nursing Assistant Exam',
    provider: 'Northstar Training Institute',
    amount: 115,
    category: 'Healthcare',
    initials: 'HC',
    color: 'green',
    learner: 'Aaliyah R.',
    age: 'Yesterday',
    goal: 'I care for my grandmother and discovered how much I love this work. Passing my CNA exam is my first step toward a stable career in healthcare.',
    deadline: 'Jul 12, 2027',
    hours: 'Exam voucher · self-paced',
    tags: ['Locally in demand', 'Exam voucher'],
    funded: false,
  },
  {
    id: 'comptia-a-plus',
    name: 'CompTIA A+ Certification',
    provider: 'Northstar Training Institute',
    amount: 150,
    category: 'Technology',
    initials: 'A+',
    color: 'purple',
    learner: 'Marcus T.',
    age: '2 days ago',
    goal: 'I have been fixing computers for my neighbors for years. This exam would make it possible to turn that experience into my first professional IT job.',
    deadline: 'Jul 20, 2027',
    hours: '2 exams · study at your pace',
    tags: ['Industry recognized', 'Two exam vouchers'],
    funded: false,
  },
  {
    id: 'bookkeeping',
    name: 'Professional Bookkeeping Certificate',
    provider: 'Northstar Training Institute',
    amount: 89,
    category: 'Business',
    initials: 'BK',
    color: 'amber',
    learner: 'Sam K.',
    age: '3 days ago',
    goal: 'I help a local business with their books after my day job. A certificate would help me find steady, remote work and spend more time with my kids.',
    deadline: 'Aug 1, 2027',
    hours: '4 months · flexible',
    tags: ['Remote-friendly', 'Beginner friendly'],
    funded: false,
  },
];

const coursePaths = {
  Technology: [
    { name: 'Google IT Support Certificate', detail: 'Start here · beginner friendly', amount: '$149' },
    { name: 'CompTIA A+ Certification', detail: 'Industry-recognized · 2 exams', amount: '$150' },
    { name: 'Google Data Analytics Certificate', detail: 'Build practical, job-ready skills', amount: '$99' },
  ],
  Healthcare: [
    { name: 'Certified Nursing Assistant Exam', detail: 'Local, in-demand credential', amount: '$115' },
    { name: 'Medical Terminology Certificate', detail: 'Flexible · beginner friendly', amount: '$79' },
    { name: 'Pharmacy Technician Exam Prep', detail: 'Build a path into patient care', amount: '$129' },
  ],
  Business: [
    { name: 'Professional Bookkeeping Certificate', detail: 'Remote-friendly career path', amount: '$89' },
    { name: 'Google Project Management Certificate', detail: 'Learn on your own schedule', amount: '$149' },
    { name: 'QuickBooks Online Certification', detail: 'Practical skills for small business', amount: '$59' },
  ],
  'Skilled trades': [
    { name: 'OSHA 10-Hour Construction Safety', detail: 'A practical first credential', amount: '$65' },
    { name: 'EPA 608 Technician Certification', detail: 'In-demand HVAC qualification', amount: '$120' },
    { name: 'Electrical Foundations Certificate', detail: 'Prepare for an apprenticeship', amount: '$135' },
  ],
};

const initialReviews = [
  {
    id: 'REQ-208',
    course: 'Medical Terminology Certificate',
    learner: 'Tiana W.',
    provider: 'Northstar Training Institute',
    amount: '$79',
    date: 'Submitted today',
    status: 'Needs review',
  },
  {
    id: 'REQ-205',
    course: 'OSHA 10-Hour Construction Safety',
    learner: 'Devon L.',
    provider: 'Northstar Training Institute',
    amount: '$65',
    date: 'Submitted yesterday',
    status: 'Needs review',
  },
];

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    path: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" /><path d="m9 12 2 2 4-4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
    sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3z" /><path d="m19 14 1.3 2.7L23 18l-2.7 1.3L19 22l-1.3-2.7L15 18l2.7-1.3L19 14z" /></>,
    external: <><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Modal({ title, eyebrow, onClose, children, wide = false }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className={`modal ${wide ? 'modal-wide' : ''}`}
        role="dialog"
      >
        <button aria-label="Close dialog" className="icon-button modal-close" onClick={onClose} type="button">
          <Icon name="close" />
        </button>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id="modal-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}

export default function OpportunityApp({ checkoutEnabled, paymentStatus, requestId }) {
  const [activePage, setActivePage] = useState('browse');
  const [category, setCategory] = useState('All opportunities');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestedCourse, setRequestedCourse] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('');
  const [role, setRole] = useState('Technology');
  const [submitted, setSubmitted] = useState(false);
  const [requestCount, setRequestCount] = useState(1);
  const [reviews, setReviews] = useState(initialReviews);
  const [toast, setToast] = useState('');

  const filteredOpportunities = useMemo(() => opportunities.filter((opportunity) => {
    const matchesCategory = category === 'All opportunities' || opportunity.category === category;
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || [
      opportunity.name,
      opportunity.provider,
      opportunity.category,
      opportunity.learner,
    ].some((value) => value.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesQuery && !opportunity.funded;
  }), [category, query]);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 3500);
  }

  function handleRequestSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setRequestCount((count) => count + 1);
  }

  function openRequest(courseName = '', amount = '') {
    setSubmitted(false);
    setRequestedCourse(courseName);
    setRequestedAmount(amount);
    setRequestOpen(true);
  }

  function handleReview(id, status) {
    setReviews((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  }

  const heading = activePage === 'journey'
    ? ['Your next step, made possible.', 'YOUR JOURNEY']
    : activePage === 'provider'
      ? ['Good things start with a yes.', 'PROVIDER PORTAL']
      : ['A small step can change everything.', 'THE OPPORTUNITY BOARD'];
  const paymentOpportunity = opportunities.find((opportunity) => opportunity.id === requestId);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button aria-label="Stepwise home" className="brand" onClick={() => setActivePage('browse')} type="button">
          <span className="brand-mark"><span /></span>
          <span>stepwise<span className="brand-dot">.</span></span>
        </button>

        <p className="nav-label">YOUR SPACE</p>
        <nav aria-label="Main navigation" className="main-nav">
          <button className={`nav-item ${activePage === 'browse' ? 'is-active' : ''}`} onClick={() => setActivePage('browse')}>
            <Icon name="grid" /><span>Explore opportunities</span>
          </button>
          <button className={`nav-item ${activePage === 'journey' ? 'is-active' : ''}`} onClick={() => setActivePage('journey')}>
            <Icon name="path" /><span>My learning journey</span>
            <span className="nav-count">2</span>
          </button>
          <button className={`nav-item ${activePage === 'provider' ? 'is-active' : ''}`} onClick={() => setActivePage('provider')}>
            <Icon name="shield" /><span>Provider portal</span>
          </button>
        </nav>

        <div className="sidebar-spacer" />
        <div className="sidebar-note">
          <div className="note-icon"><Icon name="heart" size={18} /></div>
          <p>Opportunity shouldn&apos;t depend on what you can afford today.</p>
          <button className="text-button" onClick={() => openRequest()}>
            Request a course <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="sidebar-user">
          <div className="avatar avatar-user">JM</div>
          <div className="user-copy"><strong>Jordan Miller</strong><span>Future IT professional</span></div>
          <button aria-label="Open your learning journey" className="more-button" onClick={() => setActivePage('journey')}>···</button>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <span className="topbar-context"><span className="status-dot" /> A little help goes a long way</span>
          <button className="profile-button" onClick={() => setActivePage('journey')}>
            <span className="avatar avatar-small">JM</span><span>My account</span><span className="chevron-down">⌄</span>
          </button>
        </header>

        {paymentStatus && (
          <div className={`payment-banner ${paymentStatus === 'success' ? 'payment-success' : 'payment-canceled'}`} role="status">
            <span className="banner-check">{paymentStatus === 'success' ? '✓' : '!'}</span>
            <div>
              <strong>{paymentStatus === 'success' ? 'Thank you for backing someone’s next step.' : 'No worries — your payment was not completed.'}</strong>
              <p>{paymentStatus === 'success'
                  ? `Your sponsorship for ${paymentOpportunity?.name ?? 'this opportunity'} is being processed. Enrollment is only confirmed after the provider verifies it.`
                : 'The opportunity is still here if you would like to try again.'}</p>
            </div>
            <button aria-label="Dismiss message" className="icon-button banner-dismiss" onClick={() => window.history.replaceState({}, '', '/')}>
              <Icon name="close" size={17} />
            </button>
          </div>
        )}

        <div className="content-wrap">
          <div className="welcome-row">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" />{heading[1]}</p>
              <h1>{heading[0]}</h1>
              <p className="page-description">
                {activePage === 'provider'
                  ? 'Review course requests, verify the details, and help learners get enrolled.'
                  : activePage === 'journey'
                    ? 'You are closer than you think. Here is what is next on your path.'
                    : 'Real people. Real goals. One course can open a whole new door.'}
              </p>
            </div>
            <button className="button button-dark request-button" onClick={() => openRequest()}>
              <Icon name="plus" size={18} /> Request a course
            </button>
          </div>

          {activePage === 'browse' && (
            <>
              <section aria-label="Impact so far" className="impact-strip">
                <div className="impact-intro"><span className="impact-icon"><Icon name="sparkles" size={17} /></span><span>GOOD THINGS HAPPEN HERE</span></div>
                <div className="impact-stat"><strong>12</strong><span>opportunities funded</span></div>
                <div className="impact-divider" />
                <div className="impact-stat"><strong>$1,840</strong><span>toward brighter futures</span></div>
                <div className="impact-decoration" aria-hidden="true"><span /><span /><span /></div>
              </section>

              <section className="board-section">
                <div className="section-heading">
                  <div><h2>Someone&apos;s next step</h2><p>Every request is reviewed with the provider before it appears here.</p></div>
                  <button className="sort-button" onClick={() => setCategory('All opportunities')}><Icon name="clock" size={16} /> Recently added <span>⌄</span></button>
                </div>

                <div className="filter-row">
                  <label className="search-field">
                    <Icon name="search" size={18} />
                    <input aria-label="Search opportunities" onChange={(event) => setQuery(event.target.value)} placeholder="Search a course, provider, or career" value={query} />
                    <kbd>/</kbd>
                  </label>
                  <div aria-label="Filter by career field" className="category-filters">
                    {['All opportunities', 'Technology', 'Healthcare', 'Business'].map((item) => (
                      <button aria-pressed={category === item} className={`filter-chip ${category === item ? 'chip-active' : ''}`} key={item} onClick={() => setCategory(item)}>
                        {item === 'Technology' ? 'Tech' : item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="opportunity-grid">
                  {filteredOpportunities.map((opportunity, index) => (
                    <article className={`opportunity-card ${index === 0 ? 'featured-card' : ''}`} key={opportunity.id}>
                      {index === 0 && <div className="card-ribbon"><span /> JUST ADDED</div>}
                      <div className="card-top">
                        <div className={`course-monogram monogram-${opportunity.color}`}>{opportunity.initials}</div>
                        <span className="verified-badge"><Icon name="check" size={13} /> VERIFIED</span>
                      </div>
                      <div className="card-category">{opportunity.category} <span>·</span> {opportunity.age}</div>
                      <h3>{opportunity.name}</h3>
                      <p className="provider-name"><Icon name="book" size={15} /> {opportunity.provider}</p>
                      <div className="learner-note">
                        <div className={`avatar avatar-${opportunity.color}`}>{opportunity.learner.split(' ').map((part) => part[0]).join('')}</div>
                        <p><span>{opportunity.learner} is working toward:</span><br />{opportunity.goal}</p>
                      </div>
                      <div className="card-bottom">
                        <div className="funding-amount"><strong>${opportunity.amount}</strong><span>funds the full course</span></div>
                        <button aria-label={`View ${opportunity.name} details`} className="card-arrow" onClick={() => setSelected(opportunity)}><Icon name="arrow" size={19} /></button>
                      </div>
                    </article>
                  ))}
                  {filteredOpportunities.length === 0 && (
                    <div className="empty-state"><span className="empty-icon"><Icon name="search" size={22} /></span><h3>No opportunities found</h3><p>Try a different search or explore all career fields.</p><button className="text-button" onClick={() => { setQuery(''); setCategory('All opportunities'); }}>Clear filters <Icon name="arrow" size={15} /></button></div>
                  )}
                </div>
                <div className="board-footer"><span>Showing {filteredOpportunities.length} of 18 verified opportunities</span><button className="text-button" onClick={() => showToast('You are all caught up — check back for new opportunities!')}>See all opportunities <Icon name="arrow" size={16} /></button></div>
              </section>

              <section className="bottom-note"><div className="note-sparkle"><Icon name="sparkles" size={19} /></div><p><strong>A note about how this works</strong><span>Providers verify every course and its cost before a request is shared. Your payment goes directly to the provider—not to the learner.</span></p><span className="note-illustration" aria-hidden="true">✳</span></section>
            </>
          )}

          {activePage === 'journey' && (
            <div className="journey-layout">
              <section className="journey-card">
                <div className="journey-card-heading"><div><p className="eyebrow">YOUR CAREER DIRECTION</p><h2>Where would you like to go?</h2></div><span className="journey-step">STEP 1 OF 3</span></div>
                <p className="journey-copy">Choose a field and we will suggest flexible, job-ready courses to help you get started.</p>
                <label className="field-label" htmlFor="career-select">I&apos;m interested in</label>
                <select id="career-select" onChange={(event) => setRole(event.target.value)} value={role}>
                  {Object.keys(coursePaths).map((field) => <option key={field}>{field}</option>)}
                </select>
                <div className="recommendation-title"><span><Icon name="sparkles" size={16} /> A few ideas for you</span><span>{coursePaths[role].length} COURSES</span></div>
                <div className="recommendations">
                  {coursePaths[role].map((course, index) => (
                    <div className="recommendation" key={course.name}>
                      <span className={`recommendation-number rec-${index + 1}`}>0{index + 1}</span>
                      <span className="recommendation-info"><strong>{course.name}</strong><small>{course.detail}</small></span>
                      <span className="recommendation-price">{course.amount}</span>
                      <button aria-label={`Request ${course.name}`} className="recommendation-add" onClick={() => openRequest(course.name, course.amount.slice(1))}><Icon name="plus" size={17} /></button>
                    </div>
                  ))}
                </div>
                <button className="button button-dark full-button" onClick={() => openRequest()}>Request a different course <Icon name="arrow" size={17} /></button>
              </section>
              <aside className="journey-aside">
                <div className="journey-quote"><span className="quote-mark">“</span><p>You don&apos;t have to do it all at once. Just take the next step.</p><div className="quote-signature"><span className="avatar avatar-user">JM</span><span><strong>That&apos;s you, Jordan.</strong><small>One step at a time.</small></span></div><div className="quote-decoration" aria-hidden="true">✳</div></div>
                <div className="journey-update"><span className="update-icon"><Icon name="check" size={17} /></span><p><strong>Your profile is ready</strong><small>Get matched with courses built for your goals.</small></p><span className="update-arrow"><Icon name="arrow" size={16} /></span></div>
                <div className="journey-update"><span className="update-icon update-soft"><Icon name="heart" size={17} /></span><p><strong>{requestCount} request{requestCount === 1 ? '' : 's'} submitted</strong><small>Providers will review your course details.</small></p><span className="update-arrow"><Icon name="arrow" size={16} /></span></div>
              </aside>
            </div>
          )}

          {activePage === 'provider' && (
            <section className="provider-section">
              <div className="provider-summary">
                <div><div className="provider-summary-icon"><Icon name="shield" size={22} /></div><p className="eyebrow">NORTHSTAR TRAINING INSTITUTE</p><h2>Your review queue</h2><p>Review the course, confirm the price, and make sure enrollment is available before approving.</p></div>
                <div className="queue-number"><strong>{reviews.filter((item) => item.status === 'Needs review').length.toString().padStart(2, '0')}</strong><span>awaiting review</span></div>
              </div>
              <div className="review-list">
                <div className="review-list-heading"><h3>Course requests</h3><span>{reviews.length} requests</span></div>
                {reviews.map((item) => (
                  <article className="review-row" key={item.id}>
                    <span className="review-monogram"><Icon name="book" size={19} /></span>
                    <div className="review-main"><span className="review-id">{item.id} <span>·</span> {item.date}</span><strong>{item.course}</strong><small>{item.learner} <span>·</span> {item.provider}</small></div>
                    <strong className="review-amount">{item.amount}</strong>
                    {item.status === 'Needs review'
                      ? <button className="button button-approve" onClick={() => handleReview(item.id, 'Verified')}>Verify course <Icon name="check" size={16} /></button>
                      : <span className="review-approved"><Icon name="check" size={15} /> Verified</span>}
                  </article>
                ))}
                {reviews.some((item) => item.status === 'Verified') && <p className="provider-disclaimer">Review decisions are shown for this demo only; connect a database and provider workflow to persist approvals.</p>}
              </div>
            </section>
          )}
        </div>

        <footer className="site-footer"><span>Made for every next step <span className="footer-heart">♥</span></span><span>Thoughtful support. Real opportunity.</span></footer>
      </section>

      {selected && (
        <Modal eyebrow={`${selected.category.toUpperCase()} · PROVIDER VERIFIED`} onClose={() => setSelected(null)} title="Help make the next step possible." wide>
          <div className="detail-layout">
            <div className="detail-main">
              <div className="detail-course"><div className={`course-monogram monogram-${selected.color}`}>{selected.initials}</div><div><h3>{selected.name}</h3><p>{selected.provider}</p></div></div>
              <div className="detail-story"><p className="eyebrow">A NOTE FROM {selected.learner.toUpperCase()}</p><blockquote>“{selected.goal}”</blockquote></div>
              <div className="detail-tags">{selected.tags.map((tag) => <span key={tag}><Icon name="check" size={14} />{tag}</span>)}</div>
              <div className="detail-facts"><span><Icon name="clock" size={17} /> {selected.hours}</span><span><Icon name="path" size={17} /> Needed by {selected.deadline}</span></div>
            </div>
            <aside className="funding-panel"><p className="eyebrow">ONE COURSE. ONE NEXT STEP.</p><div className="funding-price">${selected.amount}<small> USD</small></div><p>Funds the full course or exam voucher, paid directly to the participating provider.</p>
              {checkoutEnabled
                ? <form action="/api/checkout" method="POST"><input name="opportunityId" type="hidden" value={selected.id} /><button className="button button-dark fund-button" type="submit">Fund this opportunity <Icon name="arrow" size={17} /></button></form>
                : <button className="button button-dark fund-button" disabled title="Configure Stripe Connect to accept sponsorships">Fund this opportunity <Icon name="arrow" size={17} /></button>}
              {!checkoutEnabled && <p className="checkout-hint">Add your Stripe test key and a participating provider&apos;s connected account to enable Checkout.</p>}
              <div className="secure-note"><Icon name="shield" size={15} /><span>Secure checkout by Stripe</span><Icon name="external" size={13} /></div>
              <p className="funding-disclaimer">The provider will confirm enrollment. A payment alone does not guarantee a course or exam voucher.</p>
            </aside>
          </div>
        </Modal>
      )}

      {requestOpen && (
        <Modal eyebrow="YOUR NEXT STEP STARTS HERE" onClose={() => setRequestOpen(false)} title={submitted ? 'Your request is on its way.' : 'What would you like to learn?'} wide>
          {submitted ? (
            <div className="success-state"><span className="success-icon"><Icon name="check" size={27} /></span><h3>We&apos;ll help you find a way forward.</h3><p>Your request is saved in this demo. A participating provider can review the course and confirm its price before a sponsor sees it.</p><button className="button button-dark" onClick={() => { setRequestOpen(false); setActivePage('journey'); }}>Explore your learning path <Icon name="arrow" size={17} /></button></div>
          ) : (
            <form className="request-form" onSubmit={handleRequestSubmit}>
              <p>Tell us what you are working toward. We&apos;ll help match you with a flexible course and the right provider.</p>
              <div className="form-grid">
                <label className="form-field"><span>Your first name</span><input autoComplete="given-name" maxLength={60} name="name" placeholder="e.g. Maya" required /></label>
                <label className="form-field"><span>Career field</span><select onChange={(event) => setRole(event.target.value)} value={role}>{Object.keys(coursePaths).map((field) => <option key={field}>{field}</option>)}</select></label>
                <label className="form-field form-full"><span>Course or certification you have in mind</span><input defaultValue={requestedCourse} maxLength={120} name="course" placeholder="e.g. CompTIA A+ certification" required /></label>
                <label className="form-field"><span>Estimated cost (USD)</span><div className="input-prefix"><span>$</span><input defaultValue={requestedAmount} max="5000" min="1" name="amount" placeholder="150" required type="number" /></div></label>
                <label className="form-field"><span>When do you hope to start?</span><input min={new Date().toISOString().split('T')[0]} name="deadline" required type="date" /></label>
                <label className="form-field form-full"><span>What would this opportunity make possible?</span><textarea maxLength={500} name="goal" placeholder="Share a little about your goal. Sponsors want to know what this next step means to you." required rows={3} /></label>
              </div>
              <div className="request-form-bottom"><span><Icon name="shield" size={15} /> Your story is only shared after the course is verified.</span><button className="button button-dark" type="submit">Send my request <Icon name="arrow" size={17} /></button></div>
            </form>
          )}
        </Modal>
      )}

      {toast && <div className="toast-message" role="status">{toast}<button aria-label="Dismiss notification" onClick={() => setToast('')}><Icon name="close" size={15} /></button></div>}
    </main>
  );
}
