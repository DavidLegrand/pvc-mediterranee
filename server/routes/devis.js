const router = require('express').Router()
const Chassis = require('../models/chassis')
const Vitrage = require('../models/vitrage')

router.post('/', async (req, res) => {
  const devis = req.body
  console.log("devis router")
  const chassis = await Chassis.aggregate([
    { $unwind: '$tarifs' },
    {
      $match: {
        couleur: devis.couleur,
        ouverture: devis.chassis.ouverture,
        vantaux: devis.chassis.vantaux,
        bequilleDouble: devis.chassis.bequilleDouble,
        sousbassement: devis.chassis.sousbassement,
        'tarifs.hauteur': { $gte: devis.hauteur },
        'tarifs.largeur': { $gte: devis.largeur }
      },
    },
    { $sort: { 'tarifs.tarif': 1 } },
    { $limit: 1 },
    { $addFields: { "largeur": "$tarifs.largeur", "hauteur": "$tarifs.hauteur", "tarif": "$tarifs.tarif" } },
    { $project: { _id: 0, largeurMin: 0, largeurMax: 0, hauteurMin: 0, hauteurMax: 0, tarifs: 0 } }
  ]).then(res => res[0])
  if (!chassis) {
    return res.status(404).json({ message: 'Aucun chassis ne correspond à ces dimensions' });
  }

  const vitrage = await Vitrage.find({ "type": devis.vitrage.type }).then(res => res[0])
  const largeurV = (chassis.largeur - chassis.epaisseurL) / chassis.vantaux
  const hauteurV = (chassis.hauteur - chassis.epaisseurH)
  const rapport = Math.max(largeurV, hauteurV) / Math.min(largeurV, hauteurV)

  const surfaceV = Math.max(hauteurV * largeurV / 1000000, vitrage.surfaceMin)
  const coef = rapport >= vitrage.rapport1 ? vitrage.coef1 : rapport >= vitrage.rapport2 ? vitrage.coef2 : 1
  const tarifV = +(surfaceV * vitrage.tarifM2 * coef).toFixed(2) * chassis.vantaux;
  const tarif = (chassis.tarif + tarifV)

  console.log(chassis)
  console.log('largeur chassis:', chassis.largeur)
  console.log('hauteur chassis:', chassis.hauteur)
  console.log('epaisseurL chassis:', chassis.epaisseurL)
  console.log('epaisserH chassis:', chassis.epaisseurH)
  console.log('tarif chassis :', chassis.tarif)

  console.log('largeur vitrage:', largeurV)
  console.log('hauteur vitrage:', hauteurV)
  console.log('rapport vitrage:', rapport)
  console.log('surface vitrage:', surfaceV)
  console.log('coef vitrage:', coef)
  console.log('tarif vitrage:', tarifV)

  console.log('tarif:', tarif)
  res.json(tarif)

})

module.exports = router