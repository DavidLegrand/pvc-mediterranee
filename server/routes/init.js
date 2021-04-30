const router = require('express').Router()
const Chassis = require('../models/chassis')
const Vitrage = require('../models/vitrage')

router.get('/', async (req, res) => {

  const chassis = await Chassis.aggregate([
    {
      $group: {
        _id: false,
        ouvertures: { $addToSet: "$ouverture" },
        vantaux: { $addToSet: "$vantaux" },
        couleurs: { $addToSet: "$couleur" },
        bequilleDoubles: { $addToSet: "$bequilleDouble" },
        sousbassements: { $addToSet: "$sousbassement" },
      }
    },
    { $project: { _id: false } }
  ]).then(res => res[0])

  const vitrages = await Vitrage.aggregate([
    {
      $group: {
        _id: false,
        typesvitrages: { $addToSet: "$type" },
        optionsvitrages: { $addToSet: "$option" },
      }
    },
    { $project: { _id: false } }
  ]).then(res => res[0])
  console.log(chassis)
  console.log(vitrages)
  res.send({ ...chassis, ...vitrages })
})

module.exports = router