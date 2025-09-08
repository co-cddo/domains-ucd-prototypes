//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
//var NotifyClient = require('notifications-node-client').NotifyClient,
//    notify = new NotifyClient(process.env.NOTIFYAPIKEY);

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
// Tactical
router.use('/registration/current', require('./views/registration/current/routes/routes'))
router.use('/registration/v1', require('./views/registration/v1/routes/routes'))
router.use('/registration/v2-2', require('./views/registration/v2-2/routes/routes'))
router.use('/registration/v3', require('./views/registration/v3/routes/routes'))


// Strategic

router.use('/registration/strategic/', require('./views/registration/strategic/routes/routes'))
router.use('/registration/strategic/ver1/moving-your-parish', require('./views/registration/strategic/ver1/routes/routes'))
router.use('/registration/strategic/ver2/g0-moving-pc', require('./views/registration/strategic/ver2/routes/routes'))

// Webcaf
router.use('/webcaf/current', require('./views/webcaf/current/routes/routes'))
router.use('/webcaf/v1', require('./views/webcaf/v1/routes/routes'))
router.use('/webcaf/v-1-3', require('./views/webcaf/v1-3/routes/routes'))
module.exports = router
