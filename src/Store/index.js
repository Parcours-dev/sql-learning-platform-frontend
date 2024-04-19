import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        chapitres: [],
        chapitreSelectionne: null,
        exercices: [],
        userRole: '',
        isAuthenticated: false,
    },
    mutations: {
        setChapitres(state, chapitres) {
            state.chapitres = chapitres;
        },
        setChapitreSelectionne(state, id) {
            state.chapitreSelectionne = id;
        },
        setExercices(state, exercices) {
            state.exercices = exercices || [];
        },
        setUserRole(state, role) {
            state.userRole = role;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.userRole = '';
            state.isAuthenticated = false;
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post('http://localhost:3000/login', credentials);
                commit('setUserRole', response.data.role);
                // Vous pouvez également enregistrer l'état de la session ici, par exemple en utilisant localStorage ou autre
            } catch (error) {
                console.error('Erreur lors de la tentative de connexion :', error);
            }
        },
        async chargerChapitres({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/api/chapitres');
                commit('setChapitres', response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des chapitres:", error);
                commit('setChapitres', []);
            }
        },
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
