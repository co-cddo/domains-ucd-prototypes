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




// Q: a3a - routing
router.post('/a3a-answer', function(request, response) {

    var achieved1 = request.session.data['a3a-outcome1-achieved']
    var achieved2 = request.session.data['a3a-outcome2-achieved']
    var achieved3 = request.session.data['a3a-outcome3-achieved']
    var achieved4 = request.session.data['a3a-outcome4-achieved']
    var achieved5 = request.session.data['a3a-outcome5-achieved']
    var notachieved1 = request.session.data['a3a-outcome1-not-achieved']
    var notachieved2 = request.session.data['a3a-outcome2-not-achieved']
    var notachieved3 = request.session.data['a3a-outcome3-not-achieved']
    var notachieved4 = request.session.data['a3a-outcome4-not-achieved']
    var notachieved5 = request.session.data['a3a-outcome5-not-achieved']
    
    
    
    
    if (achieved1 == "yes" &&  achieved2 == "yes" &&  achieved3 == "yes" &&  achieved4 == "yes" &&  achieved5 == "yes" &&  notachieved1 == "no" &&  notachieved2 == "no" &&  notachieved3 == "no" &&  notachieved4 == "no" &&  notachieved5 == "no" ) {
        response.redirect("a3a-outcome-achieved")
    }
    else 
     {
        response.redirect("a3a-outcome-not-achieved")
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


//Error
// GET – show page (prefill from session if present)
router.get('/outcome', (req, res) => {
  // pick up any validation stored by the error route (then clear it)
  const validation = req.session?.validation || null;
  if (req.session) req.session.validation = null;

  res.render('outcome', {
    hasErrors: !!validation,
    errorList: validation ? validation.errorList : null,
    errors: validation ? validation.errors : null,
    values: { a3a: req.session?.data?.a3a }
  });
});

// POST – validate from req.body (not session!)
router.post('/outcome-answer', (req, res) => {
  const answer = req.body.a3a;           // "yes" | "no" | undefined
  const valid = ['yes', 'no'];

  if (!answer || !valid.includes(answer)) {
    // store errors in session, then redirect to /outcome-answer (your request)
    const msg = 'Select yes if you have changed your name';
    if (!req.session) req.session = {};
    req.session.validation = {
      hasErrors: true,
      errors: { a3a: { text: msg } },
      errorList: [{ text: msg, href: '#a3a' }]
    };
    return res.redirect('/outcome-answer');
  }

  // success: save and go to next step
  if (!req.session.data) req.session.data = {};
  req.session.data.a3a = answer;
  return res.redirect('webcaf/current/errors/next-step');
});

// When blank, we redirect here; it immediately shows the page with the error
router.get('/outcome-answer', (req, res) => {
  // just reuse the /outcome renderer; it will read the session validation
  return res.redirect('/outcome');
});

// Tiny next step so you can see it working
router.get('webcaf/current/errors/next-step', (req, res) => {
  res.send(`Next step reached. Answer = ${req.session?.data?.a3a || 'n/a'}`);
});


module.exports = router

  