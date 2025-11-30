//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
//var NotifyClient = require('notifications-node-client').NotifyClient,
//    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

    
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// If you're not using the Prototype Kit, ensure body parsing in your app:
// app.use(express.urlencoded({ extended: false }))



//Error for routing different logics, and formats (e.g. macros)

// ---------- Config ----------
const FIELDS = [
  { name: 'a3aAc1',  msg: 'You must respond to Achieved statement 1' },
  { name: 'a3aAc2',  msg: 'You must respond to Achieved statement 2' },
  { name: 'a3aAc3',  msg: 'You must respond to Achieved statement 3' },
  { name: 'a3aAc4',  msg: 'You must respond to Achieved statement 4' },
  { name: 'a3aAc5',  msg: 'You must respond to Achieved statement 5' },
  { name: 'a3aNac1', msg: 'You must respond to Not achieved statement 1' },
  { name: 'a3aNac2', msg: 'You must respond to Not achieved statement 2' },
  { name: 'a3aNac3', msg: 'You must respond to Not achieved statement 3' },
  { name: 'a3aNac4', msg: 'You must respond to Not achieved statement 4' },
  { name: 'a3aNac5', msg: 'You must respond to Not achieved statement 5' }
];

const GROUPS = FIELDS.map(f => {
  const n = (f.name.match(/\d+$/) || [''])[0];
  return {
    name: f.name,
    legend: f.name.startsWith('a3aAc')
      ? `Achieved statement ${n}`
      : `Not achieved statement ${n}`
  };
});

const ACHIEVED_FIELDS = ['a3aAc1','a3aAc2','a3aAc3','a3aAc4','a3aAc5'];
const NOT_ACH_FIELDS = ['a3aNac1','a3aNac2','a3aNac3','a3aNac4','a3aNac5'];

const ALLOWED = new Set(['yes', 'no', 'na']);
const normalise = v => (typeof v === 'string' ? v.trim().toLowerCase() : undefined);

// ---------- Routes ----------

// GET /a3a – render page (prefill from session)
router.get('/a3a', (req, res) => {
  const values = { ...(req.session.data || {}) };
  res.render('a3a', {
    hasErrors: false,
    errors: null,
    errorList: null,
    groups: GROUPS,
    values
  });
});

// POST /a3a – validate; on error re-render same page with selections; on success route based on combo
router.post('/a3a', (req, res) => {
  const errors = {};
  const errorList = [];
  const values = {};

  // Build values from this POST and validate each field
  for (const { name, msg } of FIELDS) {
    const v = values[name] = normalise(req.body[name]); // "yes" | "no" | "na" | undefined
    if (!v || !ALLOWED.has(v)) {
      errors[name] = { text: msg };
      errorList.push({ text: msg, href: `#${name}` });
    }
  }

  if (errorList.length) {
    // Stay on /a3a and show current selections + errors
    return res.status(400).render('a3a', {
      hasErrors: true,
      errors,
      errorList,
      groups: GROUPS,
      values
    });
  }

  // Success: save to session (optional, if you need it later)
  if (!req.session.data) req.session.data = {};
  for (const { name } of FIELDS) req.session.data[name] = values[name];

  // Routing logic:
  // Achieved if ALL Achieved fields are "yes" AND ALL Not-achieved fields are "no"
  const achievedAllYes = ACHIEVED_FIELDS.every(n => values[n] === 'yes');
  const notAchievedAllNo = NOT_ACH_FIELDS.every(n => values[n] === 'no');

  if (achievedAllYes && notAchievedAllNo) {
    return res.redirect('/webcaf/current/a3a-outcome-achieved');
  } else {
    return res.redirect('/webcaf/current/a3a-outcome-not-achieved');
  }
});

// (Optional) Back-compat for old forms posting to /a3a-answer:
router.post('/a3a-answer', (req, res) => {
  // Forward the same POST to /a3a, preserving method & body
  return res.redirect(307, '/a3a');
});

module.exports = router;


//End of Routes.js
module.exports = router

  