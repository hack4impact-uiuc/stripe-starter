'use client';

import { useEffect, useMemo, useState } from 'react';

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
    deadline: 'Dec 20, 2026',
    hours: '6 months · flexible',
    tags: ['No degree required', 'Beginner friendly'],
    deadlineDate: '2026-12-20',
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
    deadline: 'Nov 10, 2026',
    hours: 'Exam voucher · self-paced',
    tags: ['Locally in demand', 'Exam voucher'],
    deadlineDate: '2026-11-10',
  },
  {
    id: 'comptia-a-plus',
    name: 'CompTIA A+ Certification Exam Voucher',
    provider: 'Northstar Training Institute',
    amount: 150,
    category: 'Technology',
    initials: 'A+',
    color: 'purple',
    learner: 'Maya R.',
    age: '2 days ago',
    goal: 'I work full time and want to move into IT support. This $150 exam voucher is a step toward earning a credential employers recognize.',
    deadline: 'Dec 1, 2026',
    hours: '2 exams · study at your pace',
    tags: ['Industry recognized', 'Two exam vouchers'],
    deadlineDate: '2026-12-01',
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
    deadline: 'Jan 5, 2027',
    hours: '4 months · flexible',
    tags: ['Remote-friendly', 'Beginner friendly'],
    deadlineDate: '2027-01-05',
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

const workflowLabels = {
  pending_review: 'Pending review',
  open: 'Open to sponsors',
  locked: 'Being funded',
  funded: 'Paid · awaiting enrollment',
  enrolled: 'Enrollment confirmed',
  completed: 'Completed',
  rejected: 'Request declined',
  expired: 'Expired',
  refunded: 'Refunded',
};

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

export default function OpportunityApp() {
  const [activeRole, setActiveRole] = useState('student');
  const [activePage, setActivePage] = useState('journey');
  const [category, setCategory] = useState('All opportunities');
  const [query, setQuery] = useState('');
  const [maxAmount, setMaxAmount] = useState('all');
  const [deadlineWindow, setDeadlineWindow] = useState('all');
  const [selected, setSelected] = useState(null);
  const [checkoutRequest, setCheckoutRequest] = useState(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestedCourse, setRequestedCourse] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('');
  const [role, setRole] = useState('Technology');
  const [studyHours, setStudyHours] = useState('4-6');
  const [budget, setBudget] = useState(200);
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState(() => opportunities.map((opportunity, index) => ({
    ...opportunity,
    requestId: `REQ-${204 - index}`,
    status: opportunity.id === 'comptia-a-plus' ? 'pending_review' : 'open',
    verified: opportunity.id !== 'comptia-a-plus',
    voucherCode: '',
    rejectionReason: '',
  })));
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [voucherCodes, setVoucherCodes] = useState({});
  const [toast, setToast] = useState('');

  function switchRole(nextRole) {
    setActiveRole(nextRole);
    setActivePage(nextRole === 'student' ? 'journey' : 'browse');
  }

  useEffect(() => {
    const activeLocks = requests.filter((request) => request.status === 'locked' && request.lockExpiresAt);
    const activeDeadlines = requests
      .filter((request) => ['pending_review', 'open'].includes(request.status))
      .map((request) => new Date(`${request.deadlineDate}T23:59:59`).getTime());
    const expiries = [...activeLocks.map((request) => request.lockExpiresAt), ...activeDeadlines];
    if (expiries.length === 0) return undefined;
    const nextExpiry = Math.min(...expiries);
    const timer = window.setTimeout(() => {
      const now = Date.now();
      const expiredLock = activeLocks.some((request) => request.lockExpiresAt <= now);
      setRequests((items) => items.map((item) => {
        if (['pending_review', 'open'].includes(item.status)
          && new Date(`${item.deadlineDate}T23:59:59`).getTime() <= now) {
          return { ...item, status: 'expired' };
        }
        if (item.status === 'locked' && item.lockExpiresAt <= now) {
          return { ...item, status: 'open', lockExpiresAt: null };
        }
        return item;
      }));
      setCheckoutRequest((current) => current && current.lockExpiresAt <= Date.now() ? null : current);
      showToast(expiredLock
        ? 'Checkout expired. The opportunity is open for another sponsor.'
        : 'A request deadline passed and it is no longer available to sponsors.');
    }, Math.max(0, nextExpiry - Date.now()));
    return () => window.clearTimeout(timer);
  }, [requests]);

  const filteredOpportunities = useMemo(() => requests.filter((opportunity) => {
    const matchesCategory = category === 'All opportunities' || opportunity.category === category;
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || [
      opportunity.name,
      opportunity.provider,
      opportunity.category,
      opportunity.learner,
    ].some((value) => value.toLowerCase().includes(normalizedQuery));
    const matchesAmount = maxAmount === 'all' || opportunity.amount <= Number(maxAmount);
    const daysUntilDeadline = Math.ceil((new Date(`${opportunity.deadlineDate}T23:59:59`) - new Date()) / 86400000);
    const matchesDeadline = deadlineWindow === 'all'
      || (daysUntilDeadline > 0 && daysUntilDeadline <= Number(deadlineWindow));

    return opportunity.status === 'open' && matchesCategory && matchesQuery && matchesAmount
      && matchesDeadline && daysUntilDeadline > 0;
  }), [category, deadlineWindow, maxAmount, query, requests]);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 3500);
  }

  function handleRequestSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const field = formData.get('field');
    const course = formData.get('course');
    const amount = Number(formData.get('amount'));
    const name = formData.get('name');
    const deadlineDate = formData.get('deadline');
    const colorByCategory = { Technology: 'blue', Healthcare: 'green', Business: 'amber', 'Skilled trades': 'purple' };
    const request = {
      id: `request-${Date.now()}`,
      requestId: `REQ-${String(Date.now()).slice(-5)}`,
      name: String(course).trim(),
      provider: 'Northstar Training Institute',
      amount,
      category: field,
      initials: String(course).trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase(),
      color: colorByCategory[field] || 'blue',
      learner: `${String(name).trim()} (you)`,
      age: 'Just now',
      goal: String(formData.get('goal')).trim(),
      deadline: new Date(`${deadlineDate}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deadlineDate: String(deadlineDate),
      hours: `${studyHours} hours per week`,
      tags: ['Flexible schedule', 'Pending provider review'],
      status: 'pending_review',
      verified: false,
      voucherCode: '',
      rejectionReason: '',
    };
    setRequests((items) => [request, ...items]);
    setSubmitted(true);
    setRequestedCourse('');
    setRequestedAmount('');
  }

  function openRequest(courseName = '', amount = '') {
    setSubmitted(false);
    setRequestedCourse(courseName);
    setRequestedAmount(amount);
    setRequestOpen(true);
  }

  function handleReview(id, status) {
    const reason = rejectionReasons[id]?.trim();
    if (status === 'rejected' && !reason) {
      showToast('Add a short reason before declining a request.');
      return;
    }
    setRequests((items) => items.map((item) => item.id === id
      ? { ...item, status, verified: status === 'open', rejectionReason: status === 'rejected' ? reason : '' }
      : item));
    showToast(status === 'open' ? 'Request approved and listed for sponsors.' : 'Request declined with a reason.');
  }

  function beginDemoCheckout(request) {
    if (request.status !== 'open') {
      showToast(request.status === 'locked' ? 'This request is being funded by another sponsor.' : 'This request is no longer available.');
      return;
    }
    const lockedRequest = { ...request, status: 'locked', lockExpiresAt: Date.now() + 30 * 60 * 1000 };
    setRequests((items) => items.map((item) => item.id === request.id ? lockedRequest : item));
    setSelected(lockedRequest);
    setCheckoutRequest(lockedRequest);
  }

  function finishDemoCheckout() {
    if (!checkoutRequest || checkoutRequest.status !== 'locked') return;
    setRequests((items) => items.map((item) => item.id === checkoutRequest.id
      ? { ...item, status: 'funded', paidAt: new Date().toISOString(), paymentMode: 'simulated' }
      : item));
    setCheckoutRequest(null);
    setSelected(null);
    showToast('Demo payment simulated. The provider can now confirm enrollment.');
  }

  function cancelDemoCheckout() {
    if (checkoutRequest?.status === 'locked') {
      setRequests((items) => items.map((item) => item.id === checkoutRequest.id
        ? { ...item, status: 'open', lockExpiresAt: null }
        : item));
    }
    setCheckoutRequest(null);
    setSelected((item) => item?.status === 'locked' ? { ...item, status: 'open' } : item);
  }

  function updateProviderStatus(id, status) {
    if (status === 'enrolled' && !voucherCodes[id]?.trim()) {
      showToast('Enter the enrollment confirmation or voucher code first.');
      return;
    }
    setRequests((items) => items.map((item) => item.id === id
      ? {
        ...item,
        status,
        voucherCode: status === 'enrolled' ? voucherCodes[id].trim() : item.voucherCode,
        enrollmentConfirmedAt: status === 'enrolled' ? new Date().toISOString() : item.enrollmentConfirmedAt,
      }
      : item));
    showToast(status === 'refunded' ? 'Demo refund recorded. No Stripe refund was issued.' : 'Enrollment confirmed in the demo.');
  }

  const heading = {
    journey: ['Your next step, made possible.', 'LEARNER DASHBOARD'],
    admin: ['Good things start with a careful review.', 'ADMIN REVIEW QUEUE'],
    sponsor: ['A small step can change everything.', 'SPONSOR OPPORTUNITIES'],
    provider: ['Good things start with a yes.', 'PROVIDER & SPONSOR DASHBOARD'],
    browse: ['A small step can change everything.', 'SPONSOR OPPORTUNITIES'],
  }[activePage];
  const workspaceLabel = activePage === 'admin'
    ? 'Admin demo tool'
    : activePage === 'provider'
      ? 'Provider demo tool'
      : activeRole === 'student' ? 'Student' : 'Sponsor';
  const activeRequests = requests.filter((item) => !['rejected', 'expired'].includes(item.status));
  const sponsorImpact = requests.filter((item) => ['funded', 'enrolled', 'completed', 'refunded'].includes(item.status));

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button aria-label="NextStep home" className="brand" onClick={() => switchRole('student')} type="button">
          <span className="brand-mark"><span /></span>
          <span>nextstep<span className="brand-dot">.</span></span>
        </button>

        <div className="role-context">
          <span className={`role-context-avatar ${activeRole === 'student' ? 'role-avatar-student' : 'role-avatar-sponsor'}`}>
            <Icon name={activeRole === 'student' ? 'user' : 'heart'} size={16} />
          </span>
          <span><small>VIEWING AS</small><strong>{workspaceLabel}</strong></span>
        </div>
        <p className="nav-label">{activeRole === 'student' ? 'STUDENT MENU' : 'SPONSOR MENU'}</p>
        <nav aria-label={`${activeRole} navigation`} className="main-nav">
          {activeRole === 'student' ? (
            <button aria-current={activePage === 'journey' ? 'page' : undefined} className={`nav-item ${activePage === 'journey' ? 'is-active' : ''}`} onClick={() => setActivePage('journey')}>
              <Icon name="path" /><span>My learning journey</span>
            </button>
          ) : (
            <>
              <button aria-current={activePage === 'browse' ? 'page' : undefined} className={`nav-item ${activePage === 'browse' ? 'is-active' : ''}`} onClick={() => setActivePage('browse')}>
                <Icon name="grid" /><span>Find opportunities</span>
              </button>
              <button aria-current={activePage === 'sponsor' ? 'page' : undefined} className={`nav-item ${activePage === 'sponsor' ? 'is-active' : ''}`} onClick={() => setActivePage('sponsor')}>
                <Icon name="heart" /><span>My impact</span>
              </button>
            </>
          )}
        </nav>
        <details className="demo-tools">
          <summary><Icon name="shield" size={16} /><span>Demo tools</span></summary>
          <nav aria-label="Demo tools navigation" className="demo-tools-nav">
            <button aria-current={activePage === 'admin' ? 'page' : undefined} className={`nav-item ${activePage === 'admin' ? 'is-active' : ''}`} onClick={() => setActivePage('admin')}>
              <Icon name="shield" /><span>Admin review</span>
              <span className="nav-count">{requests.filter((item) => item.status === 'pending_review').length}</span>
            </button>
            <button aria-current={activePage === 'provider' ? 'page' : undefined} className={`nav-item ${activePage === 'provider' ? 'is-active' : ''}`} onClick={() => setActivePage('provider')}>
              <Icon name="book" /><span>Provider fulfillment</span>
            </button>
          </nav>
        </details>

        <div className="sidebar-spacer" />
        <div className="sidebar-note">
          <div className="note-icon"><Icon name="heart" size={18} /></div>
          <p>{activeRole === 'student' ? 'Opportunity shouldn’t depend on what you can afford today.' : 'One verified request can open a whole new door.'}</p>
          {activeRole === 'student'
            ? <button className="text-button" onClick={() => openRequest()}>Request a course <Icon name="arrow" size={16} /></button>
            : <button className="text-button" onClick={() => setActivePage('sponsor')}>See your impact <Icon name="arrow" size={16} /></button>}
        </div>
        <div className="sidebar-user">
          <div className="avatar avatar-user">MR</div>
          <div className="user-copy"><strong>Maya R.</strong><span>Future IT professional</span></div>
          <button aria-label="Open your learning journey" className="more-button" onClick={() => setActivePage('journey')}>···</button>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <span className="topbar-context"><span className="status-dot" /> {activePage === 'admin'
            ? 'Review learner requests before they reach sponsors.'
            : activePage === 'provider'
              ? 'Confirm enrollment or report a fulfillment issue.'
              : activeRole === 'student' ? 'Your goals, your pace, your next step.' : 'Fund a verified opportunity. Follow the outcome.'}</span>
          <div aria-label="Switch between student and sponsor views" className="role-switch" role="group">
            <button aria-pressed={activeRole === 'student'} className={`role-switch-button ${activeRole === 'student' ? 'role-switch-active' : ''}`} onClick={() => switchRole('student')}>
              <Icon name="user" size={15} /><span>Student</span>
            </button>
            <button aria-pressed={activeRole === 'sponsor'} className={`role-switch-button ${activeRole === 'sponsor' ? 'role-switch-active' : ''}`} onClick={() => switchRole('sponsor')}>
              <Icon name="heart" size={15} /><span>Sponsor</span>
            </button>
          </div>
        </header>

        <div className="content-wrap">
          <div className="demo-notice"><span>DEMO MODE</span> You’re viewing the {workspaceLabel} screen. Switch roles above; admin and provider tools are separate.</div>
          <div className="welcome-row">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" />{heading[1]}</p>
              <h1>{heading[0]}</h1>
              <p className="page-description">
                {activePage === 'provider'
                  ? 'Assign an enrollment or voucher, then share the outcome with the learner and sponsor.'
                  : activePage === 'admin'
                    ? 'Verify the provider, price, prerequisites, and availability before a sponsor can see a request.'
                  : activePage === 'journey'
                    ? 'Set your goals, get flexible course recommendations, and follow your request.'
                    : 'Real people. Real goals. One course can open a whole new door.'}
              </p>
            </div>
            {activeRole === 'student' && <button className="button button-dark request-button" onClick={() => openRequest()}>
              <Icon name="plus" size={18} /> Request a course
            </button>}
          </div>

          {activePage === 'browse' && (
            <>
              <section aria-label="Impact so far" className="impact-strip">
                <div className="impact-intro"><span className="impact-icon"><Icon name="sparkles" size={17} /></span><span>GOOD THINGS HAPPEN HERE</span></div>
                <div className="impact-stat"><strong>{requests.filter((item) => ['funded', 'enrolled', 'completed'].includes(item.status)).length}</strong><span>opportunities funded</span></div>
                <div className="impact-divider" />
                <div className="impact-stat"><strong>${requests.filter((item) => ['funded', 'enrolled', 'completed'].includes(item.status)).reduce((total, item) => total + item.amount, 0).toLocaleString()}</strong><span>toward brighter futures</span></div>
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
                <div className="filter-row extra-filters">
                  <label className="field-label">Maximum cost
                    <select aria-label="Filter by maximum cost" onChange={(event) => setMaxAmount(event.target.value)} value={maxAmount}>
                      <option value="all">Any price</option><option value="100">Up to $100</option><option value="150">Up to $150</option><option value="200">Up to $200</option>
                    </select>
                  </label>
                  <label className="field-label">Deadline
                    <select aria-label="Filter by deadline" onChange={(event) => setDeadlineWindow(event.target.value)} value={deadlineWindow}>
                      <option value="all">Any deadline</option><option value="7">Within 7 days</option><option value="30">Within 30 days</option><option value="90">Within 90 days</option>
                    </select>
                  </label>
                </div>

                <div className="opportunity-grid">
                  {filteredOpportunities.map((opportunity, index) => (
                    <article className={`opportunity-card ${index === 0 ? 'featured-card' : ''}`} key={opportunity.id}>
                      {index === 0 && <div className="card-ribbon"><span /> VERIFIED REQUEST</div>}
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
                <div className="board-footer"><span>{filteredOpportunities.length} verified requests open for funding</span><button className="text-button" onClick={() => setActivePage('journey')}>Start a learner request <Icon name="arrow" size={16} /></button></div>
              </section>

              <section className="bottom-note"><div className="note-sparkle"><Icon name="sparkles" size={19} /></div><p><strong>One sponsor. One verified request. One provider.</strong><span>The provider is fictional and the checkout here is simulated. A real version needs provider onboarding and a verified Stripe webhook.</span></p><span className="note-illustration" aria-hidden="true">✳</span></section>
            </>
          )}

          {activePage === 'journey' && (
            <div className="journey-layout">
              <section className="journey-card">
                <div className="journey-card-heading"><div><p className="eyebrow">YOUR SIGN-UP QUIZ</p><h2>Make a plan that fits your life.</h2></div><span className="journey-step">3 QUICK QUESTIONS</span></div>
                <p className="journey-copy">Tell us about your career goal, available study time, and budget. We’ll find flexible courses to explore.</p>
                <label className="field-label" htmlFor="career-select">I&apos;m interested in</label>
                <select id="career-select" onChange={(event) => setRole(event.target.value)} value={role}>
                  {Object.keys(coursePaths).map((field) => <option key={field}>{field}</option>)}
                </select>
                <div className="quiz-fields">
                <label className="field-label">Study time per week
                  <select onChange={(event) => setStudyHours(event.target.value)} value={studyHours}><option value="1-3">1–3 hours</option><option value="4-6">4–6 hours</option><option value="7-10">7–10 hours</option></select>
                </label>
                <label className="field-label">Course budget
                  <select onChange={(event) => setBudget(Number(event.target.value))} value={budget}><option value="75">Up to $75</option><option value="125">Up to $125</option><option value="200">Up to $200</option></select>
                </label>
                </div>
                <div className="recommendation-title"><span><Icon name="sparkles" size={16} /> A few ideas for you</span><span>{coursePaths[role].filter((course) => Number(course.amount.slice(1)) <= budget).length} MATCHES</span></div>
                <div className="recommendations">
                {coursePaths[role].filter((course) => Number(course.amount.slice(1)) <= budget).map((course, index) => (
                  <div className="recommendation" key={course.name}>
                      <span className={`recommendation-number rec-${index + 1}`}>0{index + 1}</span>
                      <span className="recommendation-info"><strong>{course.name}</strong><small>{course.detail}</small></span>
                      <span className="recommendation-price">{course.amount}</span>
                      <button aria-label={`Request ${course.name}`} className="recommendation-add" onClick={() => openRequest(course.name, course.amount.slice(1))}><Icon name="plus" size={17} /></button>
                    </div>
                  ))}
                  {coursePaths[role].every((course) => Number(course.amount.slice(1)) > budget) && <p className="quiz-no-matches">No catalog courses fit this budget yet. Request a course and we’ll look for a sponsor.</p>}
                </div>
                <button className="button button-dark full-button" onClick={() => openRequest()}>Request a different course <Icon name="arrow" size={17} /></button>
              </section>
              <aside className="journey-aside">
                <div className="journey-quote"><span className="quote-mark">“</span><p>You don&apos;t have to do it all at once. Just take the next step.</p><div className="quote-signature"><span className="avatar avatar-user">MR</span><span><strong>That&apos;s you, Maya.</strong><small>One step at a time.</small></span></div><div className="quote-decoration" aria-hidden="true">✳</div></div>
                {requests.filter((item) => item.learner.includes('(you)') || item.id === 'comptia-a-plus').map((item) => (
                  <div className="journey-update journey-request" key={item.id}>
                    <span className="update-icon"><Icon name={item.status === 'completed' ? 'check' : 'clock'} size={17} /></span>
                    <p><strong>{item.name}</strong><small>{workflowLabels[item.status]}{item.status === 'rejected' ? `: ${item.rejectionReason}` : ''}</small></p>
                    {item.status === 'enrolled' && <button className="text-button" onClick={() => setRequests((all) => all.map((request) => request.id === item.id ? { ...request, status: 'completed' } : request))}>Mark completed</button>}
                  </div>
                ))}
                <button className="button button-dark full-button" onClick={() => openRequest()}>Request a course <Icon name="plus" size={16} /></button>
              </aside>
            </div>
          )}

          {activePage === 'admin' && (
            <section className="provider-section">
              <div className="provider-summary">
                <div><div className="provider-summary-icon"><Icon name="shield" size={22} /></div><p className="eyebrow">ADMIN · COURSE VERIFICATION</p><h2>Requests awaiting review</h2><p>Confirm the provider, price, prerequisites, and availability before a request opens to sponsors.</p></div>
                <div className="queue-number"><strong>{requests.filter((item) => item.status === 'pending_review').length.toString().padStart(2, '0')}</strong><span>pending review</span></div>
              </div>
              <div className="review-list">
                <div className="review-list-heading"><h3>Pending requests</h3><span>{requests.filter((item) => item.status === 'pending_review').length} awaiting review</span></div>
                {requests.filter((item) => item.status === 'pending_review').map((item) => (
                  <article className="admin-request" key={item.id}>
                    <div className="review-row">
                      <span className="review-monogram"><Icon name="book" size={19} /></span>
                      <div className="review-main"><span className="review-id">{item.requestId} · {item.category}</span><strong>{item.name}</strong><small>{item.learner} · {item.provider}</small></div>
                      <label className="admin-price">Verified price ($)
                        <input aria-label={`Verified price for ${item.name}`} max="5000" min="1" onChange={(event) => {
                          const amount = Number(event.target.value);
                          if (amount > 0) setRequests((all) => all.map((request) => request.id === item.id ? { ...request, amount } : request));
                        }} type="number" value={item.amount} />
                      </label>
                    </div>
                    <p className="admin-goal">“{item.goal}”</p>
                    <div className="admin-controls">
                      <span className="deadline-copy">Needed by {item.deadline} · Verify price, prerequisites & availability</span>
                      <button className="button button-approve" onClick={() => handleReview(item.id, 'open')}><Icon name="check" size={15} /> Approve & publish</button>
                      <input aria-label={`Reason for declining ${item.name}`} maxLength={140} onChange={(event) => setRejectionReasons((all) => ({ ...all, [item.id]: event.target.value }))} placeholder="Reason if declining" value={rejectionReasons[item.id] || ''} />
                      <button className="button button-reject" onClick={() => handleReview(item.id, 'rejected')}>Decline</button>
                    </div>
                  </article>
                ))}
                {requests.filter((item) => item.status === 'pending_review').length === 0 && <div className="empty-state"><h3>Review queue is clear</h3><p>New learner requests will appear here before going to sponsors.</p></div>}
              </div>
            </section>
          )}

          {activePage === 'provider' && (
            <section className="provider-section">
              <div className="provider-summary">
                <div><div className="provider-summary-icon"><Icon name="book" size={22} /></div><p className="eyebrow">NORTHSTAR TRAINING INSTITUTE</p><h2>Fulfill funded opportunities</h2><p>Confirm enrollment or a voucher after a sponsor funds the verified request. If you cannot fulfill it, record a refund in this demo.</p></div>
                <div className="queue-number"><strong>{requests.filter((item) => item.status === 'funded').length.toString().padStart(2, '0')}</strong><span>awaiting enrollment</span></div>
              </div>
              <div className="review-list">
                <div className="review-list-heading"><h3>Provider fulfillment</h3><span>{activeRequests.length} active requests</span></div>
                {activeRequests.map((item) => (
                  <article className="fulfillment-row" key={item.id}>
                    <div className="fulfillment-heading"><div><span className="review-id">{item.requestId} · {item.learner}</span><strong>{item.name}</strong><small>${item.amount} · {workflowLabels[item.status]}</small></div><span className={`status-pill status-${item.status}`}>{workflowLabels[item.status]}</span></div>
                    {item.status === 'funded' && <div className="fulfillment-actions"><input aria-label={`Voucher or enrollment reference for ${item.name}`} maxLength={80} onChange={(event) => setVoucherCodes((all) => ({ ...all, [item.id]: event.target.value }))} placeholder="Voucher or enrollment confirmation" value={voucherCodes[item.id] || ''} /><button className="button button-approve" onClick={() => updateProviderStatus(item.id, 'enrolled')}>Confirm enrollment <Icon name="check" size={15} /></button><button className="button button-reject" onClick={() => updateProviderStatus(item.id, 'refunded')}>Cannot fulfill · refund</button></div>}
                    {item.status === 'enrolled' && <div className="fulfillment-actions"><span className="voucher-note">Enrollment reference: {item.voucherCode}</span><button className="button button-approve" onClick={() => setRequests((all) => all.map((request) => request.id === item.id ? { ...request, status: 'completed' } : request))}>Mark completed</button></div>}
                    {item.status === 'refunded' && <p className="provider-disclaimer">Demo refund recorded. No payment or Stripe refund was processed.</p>}
                  </article>
                ))}
                {activeRequests.every((item) => !['funded', 'enrolled', 'refunded'].includes(item.status)) && <p className="provider-disclaimer">Funded requests will appear here for provider enrollment or refund.</p>}
              </div>
            </section>
          )}

          {activePage === 'sponsor' && (
            <section className="provider-section">
              <div className="provider-summary">
                <div><div className="provider-summary-icon"><Icon name="heart" size={22} /></div><p className="eyebrow">SPONSOR IMPACT</p><h2>See where your support goes.</h2><p>Follow each request from funding through provider-confirmed enrollment and completion.</p></div>
                <div className="queue-number"><strong>{sponsorImpact.length.toString().padStart(2, '0')}</strong><span>requests supported</span></div>
              </div>
              <div className="review-list">
                <div className="review-list-heading"><h3>Funding outcomes</h3><span>One sponsor · one request</span></div>
                {sponsorImpact.map((item) => (
                  <article className="impact-request" key={item.id}>
                    <div className="fulfillment-heading"><div><span className="review-id">{item.requestId} · {item.learner}</span><strong>{item.name}</strong><small>{item.provider} · ${item.amount} · No platform fee</small></div><span className={`status-pill status-${item.status}`}>{workflowLabels[item.status]}</span></div>
                    <div className="lifecycle" aria-label={`Request status: ${workflowLabels[item.status]}`}>
                      {['funded', 'enrolled', 'completed'].map((step) => <span className={['refunded'].includes(item.status) ? '' : ['funded', 'enrolled', 'completed'].indexOf(item.status) >= ['funded', 'enrolled', 'completed'].indexOf(step) ? 'lifecycle-done' : ''} key={step}>{step === 'funded' ? 'Paid' : step === 'enrolled' ? 'Enrolled' : 'Completed'}</span>)}
                      {item.status === 'refunded' && <span className="lifecycle-refund">Provider unable to fulfill · refunded</span>}
                    </div>
                  </article>
                ))}
                {sponsorImpact.length === 0 && <div className="empty-state"><h3>No sponsorships yet</h3><p>Fund an approved request to follow its enrollment and outcome.</p><button className="text-button" onClick={() => setActivePage('browse')}>Explore requests <Icon name="arrow" size={15} /></button></div>}
                <p className="provider-disclaimer">This prototype simulates payments and refunds. Only a verified Stripe webhook should confirm a real payment.</p>
              </div>
            </section>
          )}
        </div>

        <footer className="site-footer"><span>Made for every next step <span className="footer-heart">♥</span></span><span>Thoughtful support. Real opportunity.</span></footer>
      </section>

      {selected && (
        <Modal eyebrow={`${selected.category.toUpperCase()} · ${selected.verified ? 'PROVIDER VERIFIED' : workflowLabels[selected.status].toUpperCase()}`} onClose={() => setSelected(null)} title="Help make the next step possible." wide>
          <div className="detail-layout">
            <div className="detail-main">
              <div className="detail-course"><div className={`course-monogram monogram-${selected.color}`}>{selected.initials}</div><div><h3>{selected.name}</h3><p>{selected.provider}</p></div></div>
              <div className="detail-story"><p className="eyebrow">A NOTE FROM {selected.learner.toUpperCase()}</p><blockquote>“{selected.goal}”</blockquote></div>
              <div className="detail-tags">{selected.tags.map((tag) => <span key={tag}><Icon name="check" size={14} />{tag}</span>)}</div>
              <div className="detail-facts"><span><Icon name="clock" size={17} /> {selected.hours}</span><span><Icon name="path" size={17} /> Needed by {selected.deadline}</span></div>
            </div>
            <aside className="funding-panel"><p className="eyebrow">ONE SPONSOR · ONE REQUEST</p><div className="funding-price">${selected.amount}<small> USD</small></div><p>Full course or exam-voucher cost. The provider receives the full amount; platform fee is $0.</p>
              {selected.status === 'open'
                ? <button className="button button-dark fund-button" onClick={() => beginDemoCheckout(selected)}>Fund this certification — ${selected.amount} <Icon name="arrow" size={17} /></button>
                : <button className="button button-dark fund-button" disabled>{selected.status === 'locked' ? 'Being funded by another sponsor' : workflowLabels[selected.status]}</button>}
              <div className="secure-note"><Icon name="shield" size={15} /><span>Demo checkout · no payment processed</span></div>
              <p className="funding-disclaimer">A real payment requires Stripe Checkout, a verified webhook, and atomic request locking. Enrollment is confirmed by the provider—not Stripe.</p>
            </aside>
          </div>
        </Modal>
      )}

      {checkoutRequest && (
        <Modal eyebrow="SPONSOR CHECKOUT · DEMO" onClose={cancelDemoCheckout} title="Review your sponsorship">
          <div className="demo-checkout">
            <div className="checkout-opportunity"><div className={`course-monogram monogram-${checkoutRequest.color}`}>{checkoutRequest.initials}</div><div><strong>{checkoutRequest.name}</strong><small>{checkoutRequest.provider} · request {checkoutRequest.requestId}</small></div></div>
            <div className="checkout-total"><span>One-time sponsorship</span><strong>${checkoutRequest.amount}.00</strong></div>
            <div className="checkout-total checkout-no-fee"><span>Platform fee</span><strong>$0.00</strong></div>
            <p className="checkout-demo-warning"><strong>This is a simulation.</strong> No card is charged and no money is transferred. A real Checkout Session and verified webhook are not configured in this demo.</p>
            <button className="button button-dark fund-button" onClick={finishDemoCheckout}>Simulate successful checkout <Icon name="check" size={16} /></button>
            <button className="checkout-cancel" onClick={cancelDemoCheckout}>Cancel checkout and reopen this request</button>
            <p className="lock-expiry">This request is temporarily locked for 30 minutes while checkout is open.</p>
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
                <label className="form-field"><span>Career field</span><select name="field" onChange={(event) => setRole(event.target.value)} value={role}>{Object.keys(coursePaths).map((field) => <option key={field}>{field}</option>)}</select></label>
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
