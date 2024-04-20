<script>
import axios from 'axios';
import ShowExerciceTable from '@/views/pages/tables/ShowExerciceTable.vue';
import DemoSimpleTableFixedHeader from "@/views/pages/tables/DemoSimpleTableFixedHeader.vue";  // Assurez-vous que le chemin est correct

export default {
  components: {
    DemoSimpleTableFixedHeader,
    ShowExerciceTable
  },
  data() {
    return {
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
        const response = await axios.get('http://localhost:3000/api/tables');
        this.allTables = response.data;
      } catch (error) {
        console.error('Error fetching table names:', error);
      }
    },
    saveTableSelections() {
      console.log('Selected tables:', this.selectedTables);
      // Store the selection in the session or send to backend
      axios.post('http://localhost:3000/api/save-tables', { tables: this.selectedTables });
    },
    async submitExercice() {
      if (!this.validateExercice()) {
        alert('Veuillez remplir tous les champs requis correctement.');
        return;
      }
      try {
        const url = 'http://localhost:3000/api/addexercices';
        const response = await axios.post(url, this.exercice, { withCredentials: true });
        if (response.data) {
          alert('Exercice ajouté avec succès: ' + response.data.message);
          this.fetchExercices(); // Re-fetch exercices after adding
        }
      } catch (error) {
        console.error('Erreur lors de l’ajout de l’exercice:', error);
        alert('Échec de l’ajout de l’exercice');
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
        <ShowExerciceTable/>
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
                  Ajouter Exercice
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
                  :value="table">
              </v-checkbox>
            </v-card-text>
            <v-btn @click="saveTableSelections">Envoyer</v-btn>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
