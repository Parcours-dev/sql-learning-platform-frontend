import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        chapitreSelectionne: null,
        exercices: [],
    },
    mutations: {
        setChapitreSelectionne(state, id) {
            state.chapitreSelectionne = id;
        },
        setExercices(state, exercices) {
            state.exercices = exercices || [];
        },
    },
    actions: {
        async chargerExercices({ commit }, chapitreId) {
            try {
                const reponse = await axios.get(`http://localhost:3000/api/chapitres/${chapitreId}/exercices`);
                commit('setExercices', reponse.data.map(ex => ({
                    id: ex.QuestionID,
                    titre: ex.Title, // Assurez-vous que cette clé correspond exactement à ce que renvoie l'API
                    description: ex.Description,
                })));

            } catch (erreur) {
                console.error("Erreur lors de la récupération des exercices :", erreur);
                commit('setExercices', []); // Assurez-vous de définir une valeur par défaut en cas d'erreur
            }
        },
    },

});
