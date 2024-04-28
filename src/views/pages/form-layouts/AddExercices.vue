<script>
import axios from 'axios';
import ShowExerciceTable from '@/views/pages/tables/ShowExerciceTable.vue';
import DemoSimpleTableFixedHeader from "@/views/pages/tables/DemoSimpleTableFixedHeader.vue";  // Assurez-vous que le chemin est correct
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
export default {
  components: {
    DemoSimpleTableFixedHeader,
    ShowExerciceTable
  },
  data() {
    return {
      idEditing: false,
      exercice: {
        titre: '',
        description: '',
        correctQuery: '',
        niveau: '',
        categorie: '',
        texteQuestion: '',
        instructions: '',
        chapitreId: ''
      },
      selectedTables: [],
      allTables: [],
      rules: {
        required: value => !!value || 'Ce champ est requis.',
        numeric: value => !isNaN(Number(value)) || 'Ce champ doit être numérique.'
      },
      exercices: []  // Supposons que vous chargerez cette liste via une API
    };
  },
  methods: {
    async fetchAllTables() {
      try {
        const [tablesResponse, selectedResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/tables'),
          axios.get('http://localhost:3000/api/get-selected-tables')
        ]);
        this.allTables = tablesResponse.data;
        this.selectedTables = selectedResponse.data.tables;
      } catch (error) {
        console.error('Error fetching table names or selected tables:', error);
      }
    },
    fillFormWithExerciceData(exercice) {
      this.exercice = {
        id: exercice.id,  // Assurez-vous que l'ID est correctement assigné ici
        titre: exercice.titre,
        description: exercice.description,
        correctQuery: exercice.correctQuery,
        niveau: exercice.niveau,
        categorie: exercice.categorie,
        texteQuestion: exercice.texteQuestion,
        instructions: exercice.instructions,
        chapitreId: exercice.chapitreId
      };
      this.$nextTick(() => {
        this.isEditing = true;
      });
    },
    saveTableSelections() {
      console.log('Selected tables:', this.selectedTables);
      // Store the selection in the session or send to backend
      axios.post('http://localhost:3000/api/save-tables', {tables: this.selectedTables})
          .then(response => {
            // Affichage d'un toast de succès
            toast("Sélection des tables enregistrée avec succès.", {
              position: 'top-center', // adaptez selon vos besoins
              timeout: 5000,
              type: 'success',
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: true,
              rtl: false
            });
          })
          .catch(error => {
            // Affichage d'un toast d'erreur
            console.error('Erreur lors de la sauvegarde des tables sélectionnées:', error);
            toast("Erreur lors de la sauvegarde des tables sélectionnées.", {
              position: 'top-center', // adaptez selon vos besoins
              timeout: 5000,
              closeOnClick: true,
              type: 'error',
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: true,
              rtl: false
            });
          });
    },
    async submitExercice() {
      if (!this.validateExercice()) {
        alert('Veuillez remplir tous les champs requis correctement.');
        return;
      }
      try {
        let url;
        let method;
        if (this.isEditing) {
          url = `http://localhost:3000/api/questions/${this.exercice.id}`;
          method = 'put';
        } else {
          url = 'http://localhost:3000/api/addexercices';
          method = 'post';
        }
        const response = await axios({ url, method, data: this.exercice, withCredentials: true });
        if (response.data) {
          this.isEditing = false;
          toast(response.data.message, {
            theme: 'auto',
            type: 'success',
            position: 'top-center',
            dangerouslyHTMLString: true,
            "autoClose": 1500,
          });
          setTimeout(() => {
          }, 1800);
          this.fetchExercices(); // Re-fetch exercices after adding
        }
      } catch (error) {
        toast(error.response.data.message, {
          theme: 'auto',
          type: 'error',
          position: 'top-center',
          dangerouslyHTMLString: true,
          "autoClose": 2500,
        });
      }
    },
    validateExercice() {
      return Object.values(this.exercice).every(value => value !== '') &&
          !isNaN(Number(this.exercice.chapitreId));
    },
    async fetchExercices() {
      try {
        const response = await axios.get('http://localhost:3000/api/exercices');
        if (response.ok) {
          this.exercices = await response.json();
        }
      } catch (error) {
        console.error('Erreur lors du chargement des exercices:', error);
      }
    }
  },
  mounted() {
    this.fetchAllTables();
    this.fetchExercices();
  }
}
</script>
<template>
  <v-container fluid>
    <!-- Colonne de droite pour la table -->
    <VCol cols="12" md="12">
      <VCard title="Lise des exercices">
        <VCardText>
          Voici la liste des exercices actuellement disponibles.
        </VCardText>
        <ShowExerciceTable @edit-exercice="fillFormWithExerciceData"/>
      </VCard>
    </VCol>
    <v-row>
      <!-- Colonne de gauche pour le formulaire -->
      <v-col cols="4" md="12">
        <v-card outlined class="pa-4">
          <v-form @submit.prevent="submitExercice">
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Titre de l'Exercice"
                    v-model="exercice.titre"
                    :rules="[rules.required]"
                    outlined
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Catégorie"
                    v-model="exercice.categorie"
                    :rules="[rules.required]"
                    outlined
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                    label="Description"
                    v-model="exercice.description"
                    :rules="[rules.required]"
                    outlined
                    required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                    label="Texte de la Question"
                    v-model="exercice.texteQuestion"
                    :rules="[rules.required]"
                    outlined
                    required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                    label="Instructions"
                    v-model="exercice.instructions"
                    outlined
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Requête Correcte"
                    v-model="exercice.correctQuery"
                    :rules="[rules.required]"
                    outlined
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Niveau"
                    v-model="exercice.niveau"
                    :rules="[rules.required]"
                    outlined
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Numéro du Chapitre"
                    v-model="exercice.chapitreId"
                    :rules="[rules.required, rules.numeric]"
                    outlined
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn color="primary" type="submit">
                  {{ isEditing ? 'Modifier' : 'Ajouter' }} Exercice
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <!-- Zone de sélection de table -->
        <v-card outlined class="pa-4 mt-3">
          <v-card-title>Sélectionnez les tables</v-card-title>
          <v-card-text>
            <v-checkbox
                v-for="table in allTables"
                :key="table"
                v-model="selectedTables"
                :label="table"
                :value="table"
            ></v-checkbox>
          </v-card-text>
          <v-btn @click="saveTableSelections">Envoyer</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>