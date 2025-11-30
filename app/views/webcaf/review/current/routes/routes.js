//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
//var NotifyClient = require('notifications-node-client').NotifyClient,
//    notify = new NotifyClient(process.env.NOTIFYAPIKEY);


    
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

//Dinamically render report version history
router.get('/webcaf/review/current/report-history', function(req, res) {
  const reportVersions = [
    {
      version: "2 (current)",
      ref: "IARR-2024-0002",
      date: "29 November 2024",
      author: "Alex Smith",
      status: "Current"
    },
    {
      version: "1",
      ref: "IARR-2024-0001",
      date: "15 November 2024",
      author: "Alex Smith",
      status: "Superseded"
    }
  ];

  const rows = reportVersions.map(v => {
    return [
      { text: v.version },
      { text: v.ref },
      { text: v.date },
      { text: v.author },
      { html: v.status === "Current"
          ? "<strong class='govuk-tag govuk-tag--green'>Current</strong>"
          : "<strong class='govuk-tag govuk-tag--grey'>Superseded</strong>"
        },
      { html:
          `<a class='govuk-link' href='/webcaf/review/current/report/${v.ref}'>View</a><br>
           <a class='govuk-link' href='/webcaf/review/current/report/${v.ref}/download-pdf'>Download PDF</a>`
      }
    ];
  });

  res.render('report-history2', { rows });
});

//Show reopening logic
router.get('/webcaf/review/current/draft-review', function (req, res) {

  const reopened = req.query.reopened === 'true';

  // Mock version or fetch real version
  const latestVersion = 3;

  res.render('webcaf/review/current/draft-review', {
    reopened,
    latestVersion
  });
});


 
//End of Routes.js
module.exports = router

  