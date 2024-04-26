import {createStore} from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        chapitres: [],
        chapitreSelectionne: null,
        exercices: [],
        userRole: "",
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
        setUserRole(state, roleName) {
            console.log("Role received in mutation:", roleName); // Ce log devrait afficher 'Admin'
            if (roleName) {
                state.userRole = roleName;
                state.isAuthenticated = true;
            } else {
                console.error("No role name received in mutation");
            }
        },
        logout(state) {
            state.userRole = '';
            state.isAuthenticated = false;
        }
    },
    actions: {
        // Dans votre action de login, assurez-vous que la propriété 'role' est bien passée.
        async login({commit}, credentials) {
            console.log("test de log")
            try {
                const response = await axios.post('http://localhost:3000/login', credentials);
                console.log("Login response data:", response.data); // Assurez-vous que 'role' est correct
                if (response.data.role) {
                    commit('setUserRole', response.data.role);
                } else {
                    console.error("Role not received in response");
                }
            } catch (error) {
                console.error('Erreur lors de la tentative de connexion :', error);
            }
        },
        async chargerExercices({commit}, chapitreId) {
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
