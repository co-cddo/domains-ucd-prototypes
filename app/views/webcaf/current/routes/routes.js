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



// a3a ERROR Messaging and routing
const TEMPLATE = 'webcaf/current/a3a'; // your actual view path

// Helpers
const toArray = v => Array.isArray(v) ? v : (v ? [v] : []);
const clean = arr =>
  toArray(arr)
    .map(s => String(s).trim())
    .filter(s => s !== '' && s !== '_unchecked');


const equalsSet = (arr, target) => {
  const s = new Set(arr);
  if (s.size !== target.length) return false;
  for (const v of target) if (!s.has(v)) return false;
  return true;
};

// “All achieved” exact set (order-independent)
const ALL_ACHIEVED = ['yes-1','yes-2','yes-3','yes-4','yes-5'];

// ---------- GET /a3a ----------
router.get('/a3a', (req, res) => {
  const values = {
    a3aAc: toArray(req.session?.data?.a3aAc),
    a3aNa: toArray(req.session?.data?.a3aNa)
  };

  res.render(TEMPLATE, {
    hasErrors: false,
    errors: null,
    errorList: null,
    values
  });
});

// ---------- POST /a3a ----------
router.post('/a3a', (req, res) => {
  // Read + clean arrays (remove the hidden empty string)
  const ac = clean(req.body.a3aAc); // e.g. ['yes-2','yes-5'] or []
  const na = clean(req.body.a3aNa); // e.g. ['na','na'] or []

  // add this single line:
console.log(`[A3A] ac=${JSON.stringify(ac)} na=${JSON.stringify(na)} anyNot=${na.length>0} allAch=${equalsSet(ac, ALL_ACHIEVED)}`);

  // Uncomment once to sanity-check incoming values:
  // console.log('RAW:', req.body.a3aAc, req.body.a3aNa, 'CLEAN:', ac, na);

  // 1) VALIDATION: require at least one selection anywhere
  if (ac.length === 0 && na.length === 0) {
    const msg = 'You must select at least one statement. ';

    if (!req.session.data) req.session.data = {};
    req.session.data.a3aAc = ac;
    req.session.data.a3aNa = na;

    return res.status(400).render(TEMPLATE, {
      hasErrors: true,
      errors: {
        a3aAc: { text: msg },
        a3aNa: { text: msg }
      },
      // ids from govukCheckboxes are "<name>-<value>"
      errorList: [{ text: msg, href: '#a3aAc-yes-1' }],
      values: { a3aAc: ac, a3aNa: na }
    });
  }

  // 2) Persist (optional, helps checked() + later pages)
  if (!req.session.data) req.session.data = {};
  req.session.data.a3aAc = ac;
  req.session.data.a3aNa = na;

  // 3) ROUTING
  // Any “Not achieved” ticked → Not achieved
  if (na.length > 0) {
    return res.redirect('/webcaf/current/a3a-outcome-not-achieved'); // ABSOLUTE path
  }

  // All 5 Achieved ticked (order-independent) → Achieved
  if (equalsSet(ac, ALL_ACHIEVED)) {
    return res.redirect('/webcaf/current/a3a-outcome-achieved'); // ABSOLUTE path
  }

  // Fallback (until you add “Partially achieved”)
  return res.redirect('/webcaf/current/a3a-outcome-not-achieved'); // ABSOLUTE path
});

// (Optional) legacy endpoint if anything still posts here
router.post('/a3a-answer2', function (request, response) {
  const notachieved = request.session.data['a3aNa'];
  if (notachieved == 'yes') {
    response.redirect('/webcaf/current/a3a-outcome-not-achieved'); // ABSOLUTE
  } else {
    response.redirect('/webcaf/current/a3a-outcome-achieved');     // ABSOLUTE
  }
});

// a3a Outcome achieved answer routing
router.post('/a3a-outcome-achieved-answer', function(request, response) {
    var a3aAchieved = request.session.data['a3a-achieved']
    if (a3aAchieved === "no") {
        response.redirect("a3a")
    }
    else {
        response.redirect("objective-a-status")
    }
})


// a3a Outcome not achieved answer routing
router.post('/a3a-outcome-not-achieved-answer', function(request, response) {
    var a3aNotAchieved = request.session.data['a3a-not-achieved']
    if (a3aNotAchieved === "no") {
        response.redirect("a3a")
    }
    else {
        response.redirect("objective-a-status")
    }
})

 
//End of Routes.js
module.exports = router

  