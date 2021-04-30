const router = require('express').Router()
const initiateRouter = require('./init')
const devisRouter = require('./devis')

router.use('/initiate', initiateRouter)
router.use('/devis', devisRouter)

module.exports = router