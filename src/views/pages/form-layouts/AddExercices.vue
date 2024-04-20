<script>
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
      rules: {
        required: value => !!value || 'Ce champ est requis.',
        numeric: value => !isNaN(Number(value)) || 'Ce champ doit être numérique.'
      },
      exercices: []  // Supposons que vous chargerez cette liste via une API
    };
  },
  methods: {
    async submitExercice() {
      if (!this.validateExercice()) {
        this.$toast.error('Veuillez remplir tous les champs requis correctement.');
        return;
      }
      try {
        const url = 'http://localhost:3000/api/addexercices';
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.exercice),
          credentials: 'include'
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          throw new Error('Échec de l’ajout de l’exercice');
        }

        const responseData = await response.json();
        console.log("Exercice ajouté avec succès: " + responseData.message);
        // Charger à nouveau les exercices après l'ajout
        this.fetchExercices();
      } catch (error) {
        console.error('Erreur lors de l’ajout de l’exercice:', error);
      }
    },
    validateExercice() {
      return Object.values(this.exercice).every(value => value !== '') &&
          !isNaN(Number(this.exercice.chapitreId));
    },
    async fetchExercices() {
      try {
        const response = await fetch('http://localhost:3000/api/exercices');
        if (response.ok) {
          this.exercices = await response.json();
        }
      } catch (error) {
        console.error('Erreur lors du chargement des exercices:', error);
      }
    }
  },
  mounted() {
    this.fetchExercices();
  }
}
</script>

<template>
  <v-container fluid>
    <!-- Colonne de droite pour la table -->
    <VCol cols="12" md="12" outlined class="pa-4">
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
      </v-col>


    </v-row>
  </v-container>
</template>
