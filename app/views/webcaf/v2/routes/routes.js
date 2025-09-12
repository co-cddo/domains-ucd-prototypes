//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
//var NotifyClient = require('notifications-node-client').NotifyClient,
//    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

    
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// Q: Review type answer
router.post('/review-type-answer', function(request, response) {

    var cafPr = request.session.data['cafprofile']
    if (cafPr == "baseline"){
        response.redirect("draft-assessment3")
    } else {
        response.redirect("enhanced-review")
    }
})



// Q: Objective A navigation routing
router.post('/objective-a-nav-answer', function(request, response) {

    var objA = request.session.data['objective-a-nav']
    if (objA == "yes"){
        response.redirect("objective-b")
    } else {
        response.redirect("draft-assessment4")
    }
})

// Q: Objective B navigation routing
router.post('objective-b-nav-answer', function(request, response) {

    var objB = request.session.data['objective-b-nav']
    if (objB == "yes"){
        response.redirect("objective-c")
    } else {
        response.redirect("draft-assessment4")
    }
})

// Q: Objective C navigation routing
router.post('/objective-c-nav-answer', function(request, response) {

    var objC = request.session.data['objective-c-nav']
    if (objC == "yes"){
        response.redirect("objective-d")
    } else {
        response.redirect("draft-assessment4")
    }
})



  
// Q: b3a - routing
router.post('/b3a-answer', function(request, response) {

    var achieved1 = request.session.data['outcome1-achieved']
    var achieved2 = request.session.data['outcome2-achieved']
    var achieved3 = request.session.data['outcome3-achieved']
    var achieved4 = request.session.data['outcome4-achieved']
    var achieved5 = request.session.data['outcome5-achieved']
    var achieved6 = request.session.data['outcome6-achieved']
    var achieved7 = request.session.data['outcome7-achieved']
    var achieved8 = request.session.data['outcome8-achieved']
    var achieved9 = request.session.data['outcome9-achieved']
    var partiallyachieved1 = request.session.data['outcome1-partiallyachieved']
    var partiallyachieved2 = request.session.data['outcome2-partiallyachieved']
    var partiallyachieved3 = request.session.data['outcome3-partiallyachieved']
    var partiallyachieved4 = request.session.data['outcome4-partiallyachieved']
    var partiallyachieved5 = request.session.data['outcome5-partiallyachieved']
    var partiallyachieved6 = request.session.data['outcome6-partiallyachieved']
    var notachieved1 = request.session.data['outcome1-not-achieved']
    var notachieved2 = request.session.data['outcome2-not-achieved']
    var notachieved3 = request.session.data['outcome3-not-achieved']
    var notachieved4 = request.session.data['outcome4-not-achieved']
    
    
    
    if (achieved1 == "yes" &&  achieved2 == "yes" &&  achieved3 == "yes" &&  achieved4 == "yes" &&  achieved5 == "yes" &&  achieved6 == "yes" &&  achieved7 == "yes"&&  achieved8 == "yes" &&  achieved9 == "yes" &&  notachieved1 == "no" &&  notachieved2 == "no" &&  notachieved3 == "no" &&  notachieved4 == "no" ) {
        response.redirect("b3a-outcome-achieved")
    }
    else if (partiallyachieved1 == "yes" &&  partiallyachieved2 == "yes" &&  partiallyachieved3 == "yes" &&  partiallyachieved4 == "yes" &&  partiallyachieved5 == "yes" &&  partiallyachieved6 == "yes" &&  notachieved1 == "no" &&  notachieved2 == "no" &&  notachieved3 == "no" &&  notachieved4 == "no")
     {
        response.redirect("b3a-outcome-partially-achieved")
    }
    else 
     {
        response.redirect("b3a-outcome-not-achieved")
    }
})

// Q: b3a - routing
router.post('/b4b-answer', function(request, response) {

    var achieved1 = request.session.data['b4b-outcome1-achieved']
    var achieved2 = request.session.data['b4b-outcome2-achieved']
    var achieved3 = request.session.data['b4b-outcome3-achieved']
    var achieved4 = request.session.data['b4b-outcome4-achieved']
    var achieved5 = request.session.data['b4b-outcome5-achieved']
    var achieved6 = request.session.data['b4b-outcome6-achieved']
    var achieved7 = request.session.data['b4b-outcome7-achieved']
    var achieved8 = request.session.data['b4b-outcome8-achieved']
    var partiallyachieved1 = request.session.data['b4b-outcome1-partiallyachieved']
    var partiallyachieved2 = request.session.data['b4b-outcome2-partiallyachieved']
    var partiallyachieved3 = request.session.data['b4b-outcome3-partiallyachieved']
    var partiallyachieved4 = request.session.data['b4b-outcome4-partiallyachieved']
    var partiallyachieved5 = request.session.data['b4b-outcome5-partiallyachieved']
    var partiallyachieved6 = request.session.data['b4b-outcome6-partiallyachieved']
    var notachieved1 = request.session.data['b4b-outcome1-not-achieved']
    var notachieved2 = request.session.data['b4b-outcome2-not-achieved']
    var notachieved3 = request.session.data['b4b-outcome3-not-achieved']
    var notachieved4 = request.session.data['b4b-outcome4-not-achieved']
    var notachieved5 = request.session.data['b4b-outcome5-not-achieved']
    
    
    
    
    if (achieved1 == "yes" &&  achieved2 == "yes" &&  achieved3 == "yes" &&  achieved4 == "yes" &&  achieved5 == "yes" &&  achieved6 == "yes" &&  achieved7 == "yes"&&  achieved8 == "yes" &&  notachieved1 == "no" &&  notachieved2 == "no" &&  notachieved3 == "no" &&  notachieved4 == "no" &&  notachieved5 == "no" ) {
        response.redirect("b4b-outcome-achieved")
    }
    else if (partiallyachieved1 == "yes" &&  partiallyachieved2 == "yes" &&  partiallyachieved3 == "yes" &&  partiallyachieved4 == "yes" &&  partiallyachieved5 == "yes" &&  partiallyachieved6 == "yes" &&  notachieved1 == "no" &&  notachieved2 == "no" &&  notachieved3 == "no" &&  notachieved4 == "no" &&  notachieved5 == "no")
     {
        response.redirect("b4b-outcome-partially-achieved")
    }
    else 
     {
        response.redirect("b4b-outcome-not-achieved")
    }
})





// Q: Started assessment routing
router.post('/pathAorB-answer', function(request, response) {

    var pathAB = request.session.data['pathAorB']
    if (pathAB == "yes"){
        response.redirect("draft-assessment3")
    } else {
        response.redirect("view-systems")
    }
})

// Q: View systems routing
router.post('/pathMyaccount-answer', function(request, response) {

    var pathAB = request.session.data['pathMyaccount']
    if (pathAB == "no"){
        response.redirect("my-account")
    } else {
        response.redirect("add-system-ca")
    }
})

// Q: View systems routing
router.post('/pathMyaccountUser-answer', function(request, response) {

    var pathABuser = request.session.data['pathMyaccountUser']
    if (pathABuser == "no"){
        response.redirect("my-account")
    } else {
        response.redirect("add-user")
    }
})

// Q: Remove user routing
router.post('/pathMyaccountRemoveUser-answer', function(request, response) {

    var removeUser = request.session.data['removeUser']
    if (removeUser == "no"){
        response.redirect("view-users")
    } else {
        response.redirect("view-users2")
    }
})

// Q: Remove user routing (with validation)
router.get('/pathMyaccountRemoveUser', function (req, res) {
  // Render the page (pre-populate if user already answered)
  res.render('pathMyaccountRemoveUser', {
    values: { removeUser: req.session.data?.removeUser }
  })
})

//ERROR Messaging
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

// Use these for the legends (feel free to edit text)
const GROUPS = [
  { name: 'a3aAc1',  legend: 'Achieved statement 1' },
  { name: 'a3aAc2',  legend: 'Achieved statement 2' },
  { name: 'a3aAc3',  legend: 'Achieved statement 3' },
  { name: 'a3aAc4',  legend: 'Achieved statement 4' },
  { name: 'a3aAc5',  legend: 'Achieved statement 5' },
  { name: 'a3aNac1', legend: 'Not achieved statement 1' },
  { name: 'a3aNac2', legend: 'Not achieved statement 2' },
  { name: 'a3aNac3', legend: 'Not achieved statement 3' },
  { name: 'a3aNac4', legend: 'Not achieved statement 4' },
  { name: 'a3aNac5', legend: 'Not achieved statement 5' }
];

const ACHIEVED_FIELDS = ['a3aAc1','a3aAc2','a3aAc3','a3aAc4','a3aAc5'];
const NOT_ACH_FIELDS = ['a3aNac1','a3aNac2','a3aNac3','a3aNac4','a3aNac5'];

const ALLOWED = new Set(['yes', 'no', 'na']);
const normalise = v => (typeof v === 'string' ? v.trim().toLowerCase() : undefined);

// ---------- Routes ----------

// GET /a3a – render page (prefill from session)
router.get('/webcaf/current/a3a', (req, res) => {
  const values = { ...(req.session.data || {}) };
  res.render('/webcaf/current/a3a', {
    hasErrors: false,
    errors: null,
    errorList: null,
    groups: GROUPS,
    values
  });
});

// POST /a3a – validate; on error re-render same page with selections; on success route based on combo
router.post('/webcaf/current/a3a', (req, res) => {
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
    return res.status(400).render('/webcaf/current/a3a', {
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

  // ---------- NEW ROUTING LOGIC ----------
  // Achieved block passes if every Achieved field is "yes" OR "na" (i.e., no "no")
  const achievedBlockOK = ACHIEVED_FIELDS.every(n => values[n] === 'yes' || values[n] === 'na');

  // Not-achieved block passes if every Not-achieved field is "no" OR "na" (i.e., no "yes")
  const notAchievedBlockOK = NOT_ACH_FIELDS.every(n => values[n] === 'no' || values[n] === 'na');

  if (achievedBlockOK && notAchievedBlockOK) {
    // Examples that now route here:
    // - 5×"yes" on Achieved + 5×"no" on Not achieved
    // - 4×"yes"+1×"na" on Achieved + 4×"no"+1×"na" on Not achieved
    // - 5×"na" on Achieved + 5×"na" on Not achieved (still OK by your rule)
    return res.redirect('/webcaf/current/a3a-outcome-achieved');
  }

  return res.redirect('/webcaf/current/a3a-outcome-not-achieved');
});

// (Optional) Back-compat for old forms posting to /a3a-answer:
router.post('/webcaf/current/a3a-answer', (req, res) => {
  // Forward the same POST to /a3a, preserving method & body
  return res.redirect(307, '/webcaf/current/a3a');
});


// Q: a3a - routing
router.post('/a3a-answer', function(request, response) {

    var achieved1 = request.session.data['a3aAc1']
    var achieved2 = request.session.data['a3aAc2']
    var achieved3 = request.session.data['a3aAc3']
    var achieved4 = request.session.data['a3aAc4']
    var achieved5 = request.session.data['a3aAc5']
    var notachieved1 = request.session.data['a3aNac1']
    var notachieved2 = request.session.data['a3aNac2']
    var notachieved3 = request.session.data['a3aNac3']
    var notachieved4 = request.session.data['a3aNac4']
    var notachieved5 = request.session.data['a3aNac5']
    
    
    
    
    if (achieved1 == "yes" &&  achieved2 == "yes" &&  achieved3 == "yes" &&  achieved4 == "yes" &&  achieved5 == "yes" &&  notachieved1 == "no" &&  notachieved2 == "no" &&  notachieved3 == "no" &&  notachieved4 == "no" &&  notachieved5 == "no" ) {
        response.redirect("a3a-outcome-achieved")
    }
    else 
     {
        response.redirect("a3a-outcome-not-achieved")
    }
})


//End of Routes.js
module.exports = router

  