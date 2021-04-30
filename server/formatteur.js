//import fs from 'fs';
const fs = require('fs')
const Chassis = require('./models/chassis')
const prompts = require('prompts');
prompts.override(require('yargs').argv);

const file = process.argv[2]
if (!file) {
  console.log(`Merci de fournir un nom de fichier csv sans l'extension (ex : of2 si le fichier s'appelle of2.csv`)
  process.exit(0)
}
(async () => {
  const questions = [
    {
      type: 'select',
      name: 'couleur',
      message: `Couleur du châssis`,
      choices: [
        { title: 'Blanc', value: 'blanc' },
        { title: 'Gris / Beige teinte masse', value: 'masse' },
        { title: 'Film standard 1 face', value: 'film1' },
        { title: 'Film standard 2 faces', value: 'film2' },
      ]
    },
    {
      type: 'select',
      name: 'ouverture',
      message: `Type d'ouverture`,
      choices: [
        { title: 'Ouverture française', value: 'OF' },
        { title: 'Oscillo-battant', value: 'OB' }
      ]
    },
    {
      type: 'select',
      name: 'vantaux',
      message: `Nombre de vantaux`,
      choices: [
        { title: '1', value: 1 },
        { title: '2', value: 2 },
        { title: '3', value: 3 },
        { title: '4', value: 4 },
      ]
    },
    {
      type: 'select',
      name: 'bequilleDouble',
      message: `Avec ou sans habillage ?`,
      choices: [
        { title: 'Sans', value: false },
        { title: 'Avec', value: true },
      ]
    },
    {
      type: 'select',
      name: 'sousbassement',
      message: `Avec ou sans Sous-bassement ?`,
      choices: [
        { title: 'Sans', value: false },
        { title: 'Avec', value: true },
      ]
    },
    {
      type: 'number',
      name: 'epaisseurL',
      message: 'Epaisseur L (à soustraire de la largeur vitrage) ?',
    },
    {
      type: 'number',
      name: 'epaisseurH',
      message: 'Epaisseur H (à soustraire de la hauteur vitrage) ?',
    },
  ]
  const onCancel = prompt => {
    console.log('Processus interrompu');
    process.exit(0)
  }
  const response = await prompts(questions, { onCancel });


  const result = {
    name: `${response.ouverture}${response.vantaux}${response.sousbassement ? ' SB' : ''} ${response.color}`,
    ...response
  }
  fs.readFile(file + '.csv', 'utf8', (err, content) => {
    if (err) throw err;

    //supression des espaces
    content = content.replace(/ /g, '')

    // Lignes et entêtes de colonnes
    content = content.split('\r\n')
    const lines = content.filter((line, i) => i > 1)

    // Largeurs et hauteurs
    var largeurs = []
    var hauteurs = []
    var tarifs = []
    var largeurMax = 0
    var largeurMin = 0
    largeurs = lines[0].split(';').map(col => +col).filter((col, i) => i > 0 && col > 0)

    for (let i = 1; i < lines.length; i++) {
      const lineData = lines[i].split(';')
      const hauteur = +lineData[0]

      for (let j = 1; j < lineData.length; j++) {
        const tarifObject = {
          hauteur: hauteur,
          largeur: largeurs[j - 1],
          tarif: +lineData[j],
        }
        if (tarifObject.hauteur && tarifObject.largeur && tarifObject.tarif) {
          tarifs.push(tarifObject)
          hauteurs.push(hauteur)
          if (j === 1)
            largeurMin = tarifObject.largeur
          else
            largeurMax = tarifObject.largeur

        }
      }
    }

    result.hauteurMin = Math.min(...hauteurs)
    result.hauteurMax = Math.max(...hauteurs)
    result.largeurMin = largeurMin
    result.largeurMax = largeurMax
    result.tarifs = tarifs

    fs.writeFile(file + '.json', JSON.stringify(result), (err) => { if (err) throw err })
    const chassis = new Chassis(result);
    chassis.save(err => { if (err) console.log(err) })
  });
})();
