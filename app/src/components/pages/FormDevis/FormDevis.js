import React, { useReducer, useEffect } from 'react';

import H1 from 'components/shared/H1';
import useFetch from 'components/hooks/useFetch';


const initialDevis = {
  largeur: 0,
  hauteur: 0,
  couleur: "blanc",
  vitrage: { type: "4fe/16arg/4", options: null },
  chassis: { vantaux: 1, ouverture: "OF" },
  prix: 0
}

const reducer = (state = initialDevis, action) => {
  switch (action.type) {
    case 'FENETRE/LARGEUR':
      return { ...state, largeur: action.payload }
    case 'FENETRE/HAUTEUR':
      return { ...state, hauteur: action.payload }
    case 'CHASSIS/COULEUR':
      return { ...state, chassis: { ...state.chassis, couleur: action.payload } }
    case 'CHASSIS/OUVERTURE':
      return { ...state, chassis: { ...state.chassis, ouverture: action.payload } }
    case 'CHASSIS/SOUSBASSEMENT':
      return { ...state, chassis: { ...state.chassis, sousbassement: action.payload } }
    case 'CHASSIS/BEQUILLEDOUBLE':
      return { ...state, chassis: { ...state.chassis, bequilleDouble: action.payload } }
    case 'VITRAGE/TYPE':
      return { ...state, vitrage: { ...state.vitrage, type: action.payload } }
    case 'VITRAGE/OPTION':
      return { ...state, vitrage: { ...state.vitrage, type: action.payload || null } }
    case 'CHASSIS/VANTAUX':
      return { ...state, chassis: { ...state.chassis, vantaux: +action.payload } }
    case 'PRIX':
      return { ...state, prix: action.payload }
    default:
      return state
  }
}

//ACTIONS
const actions = {
  largeur: value => ({ type: 'FENETRE/LARGEUR', payload: value }),
  hauteur: value => ({ type: 'FENETRE/HAUTEUR', payload: value }),
  couleur: value => ({ type: 'CHASSIS/COULEUR', payload: value }),
  vantaux: value => ({ type: 'CHASSIS/VANTAUX', payload: value }),
  ouverture: value => ({ type: 'CHASSIS/OUVERTURE', payload: value }),
  sousbassement: value => ({ type: 'CHASSIS/SOUSBASSEMENT', payload: value }),
  bequilleDouble: value => ({ type: 'CHASSIS/BEQUILLEDOUBLE', payload: value }),
  typeVitrage: value => ({ type: 'VITRAGE/TYPE', payload: value }),
  optionVitrage: value => ({ type: 'VITRAGE/OPTION', payload: value }),
  prix: value => ({ type: 'PRIX', payload: value })
}


const FormDevis = () => {
  const [devis, dispatch] = useReducer(reducer, initialDevis)
  const [doFetch, initData, initError, initLoading] = useFetch()
  const [doPost, tarifData, tarifError, tarifLoading] = useFetch()

  const handleChange = (e) => {
    const action = actions[e.target.name]

    var payload
    if (e.target.type === "checkbox")
      payload = e.target.checked
    else if (e.target.type === 'number')
      payload = +e.target.value
    else if (e.target.value === 'false' || e.target.value === 'true')
      payload = (e.target.value === 'true')
    else
      payload = e.target.value
    console.log(e.target.name,payload, e.target.value, e.target.type)
    dispatch(action(payload))
    console.log(devis)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    doPost('http://localhost:8080/api/devis', { method: 'POST', data: devis })
  }

  useEffect(() => {
    dispatch(actions.prix(tarifData))
  }, [tarifData])

  useEffect(() => {
    dispatch(actions.prix(0))
  }, [tarifError])

  useEffect(() => {
    doFetch('http://localhost:8080/api/initiate')
  }, [doFetch])

  return (
    <>
      <H1>Nouveau devis</H1>
      {initLoading === true ? "...Chargement" :
        <><form onSubmit={handleSubmit}>
          <div>
            <h2>Fenêtre : </h2>
            <label>Largeur (mm) :<br />
              <input type="number" name="largeur" value={devis.largeur} onChange={handleChange} />
            </label><br />
            <label>Hauteur (mm) :<br />
              <input type="number" name="hauteur" value={devis.hauteur} onChange={handleChange} />
            </label>
          </div>
          <div>
            <h2>Châssis : </h2>
            <label>Couleur :<br />
              <select name="couleur" value={devis.couleur} onChange={handleChange}>
                {initData && initData.couleurs.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </label><br />
            <label>Vantaux :<br />
              <select name="vantaux" value={devis.chassis.vantaux} onChange={handleChange}>
                {initData && initData.vantaux.map((v, i) => <option key={i} value={v}>{v}</option>)}
              </select>
            </label><br />
            <label>Type d'ouverture :<br />
              <select name="ouverture" value={devis.chassis.ouverture} onChange={handleChange}>
                {initData && initData.ouvertures.map((o, i) => <option key={i} value={o}>{o}</option>)}
              </select>
            </label><br />
            <label>Bequille :<br />
              <select name="bequilleDouble" value={devis.chassis.bequilleDouble} onChange={handleChange}>
                {initData && initData.bequilleDoubles.map((o, i) => <option key={i} value={o}>{o ? "Double" : "Simple"}</option>)}
              </select>
            </label>
            <br />
            <label>Soubassement :<br />
              <select name="sousbassement" value={devis.chassis.sousbassement} onChange={handleChange}>
                {initData && initData.sousbassements.map((o, i) => <option key={i} value={o}>{o ? "Avec" : "Sans"}</option>)}
              </select>
            </label>
          </div>
          <div>
            <h2>Vitrage : </h2>
            <label>Type :<br />
              <select name="typeVitrage" value={devis.vitrage.type} onChange={handleChange}>
                {initData && initData.typesvitrages.map((o, i) => <option key={i} value={o}>{o}</option>)}
              </select>
            </label><br />
            <label>Options :<br />
              <select name="optionVitrage" value={devis.vitrage.options} onChange={handleChange}>
                {initData && initData.optionsvitrages.map((o, i) => <option key={i} value={o ? o : ""}>{o ? o : "Sans options"}</option>)}
              </select>
            </label>
          </div>
          <div>
            <h2>Valider : </h2>
            <button type="submit">Valider le devis</button>
          </div>
        </form>
          <h2>Tarif : </h2>
          <input type="text" value={`${devis.prix} €`} readOnly disabled />
          {tarifError && tarifError.message}
        </>
      }
    </>
  );
};

FormDevis.propTypes = {
  //
};
export default FormDevis