<script>
import axios from 'axios';
import ShowExerciceTable from '@/views/pages/tables/ShowExerciceTable.vue';
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    ShowExerciceTable
  },
  data() {
    return {
      exercice: {
        id: null,
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
        numeric: value => !isNaN(Number(value)) || 'Doit être numérique.'
      },
      isEditing: false,
      exercices: []
    };
  },
  methods: {
    async fetchExercices() {
      try {
        const response = await axios.get('http://localhost:3000/api/exercices');
        this.exercices = response.data;
      } catch (error) {
        console.error('Error loading exercises:', error);
      }
    },
    async submitExercice() {
      const method = this.isEditing ? 'put' : 'post';
      const url = this.isEditing ? `http://localhost:3000/api/questions/${this.exercice.id}` : 'http://localhost:3000/api/addexercices';
      try {
        const response = await axios[method](url, this.exercice);
        if (response.status === 200 || response.status === 201) {
          toast.success(`Exercice ${this.isEditing ? 'modifié' : 'ajouté'} avec succès.`, {
            position: 'top-center',
            autoClose: 1500,
          });
          this.resetForm();
          window.location.reload();
        }
      } catch (error) {
        console.error(`Error submitting exercise: ${error}`);
        toast.error(`Erreur lors de l'${this.isEditing ? 'modification' : 'ajout'} de l'exercice.`, {
          position: 'top-center',
          autoClose: 2500,
        });
      }
    },
    setEditExercice(exercice) {
      this.exercice = { ...exercice };
      this.isEditing = true;
    },
    resetForm() {
      this.exercice = {
        id: null,
        titre: '',
        description: '',
        correctQuery: '',
        niveau: '',
        categorie: '',
        texteQuestion: '',
        instructions: '',
        chapitreId: ''
      };
      this.isEditing = false;
    }
  },
  mounted() {
    this.fetchExercices();
  }
}
</script>

<template>
  <v-container fluid>
    <v-col cols="12" md="12">
      <v-card title="Liste des exercices">
        <v-card-text>
          Voici la liste des exercices actuellement disponibles.
          <ShowExerciceTable @edit-exercice="setEditExercice" />
        </v-card-text>
      </v-card>
    </v-col>
    <VCard>
    <v-row>
      <v-col cols="12">
        <v-container fluid>
          <v-form @submit.prevent="submitExercice">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                    label="Titre de l'Exercice"
                    v-model="exercice.titre"
                    prepend-icon="mdi-format-title"
                    :rules="[rules.required]"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    label="Catégorie"
                    v-model="exercice.categorie"
                    prepend-icon="mdi-bookshelf"
                    :rules="[rules.required]"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                    label="Description"
                    v-model="exercice.description"
                    prepend-icon="mdi-text"
                    :rules="[rules.required]"
                    auto-grow
                    required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                    label="Texte de la Question"
                    v-model="exercice.texteQuestion"
                    prepend-icon="mdi-comment-question-outline"
                    :rules="[rules.required]"
                    auto-grow
                    required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                    label="Instructions"
                    v-model="exercice.instructions"
                    prepend-icon="mdi-format-list-bulleted"
                    auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                    label="Requête Correcte"
                    v-model="exercice.correctQuery"
                    prepend-icon="mdi-code-tags"
                    :rules="[rules.required]"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    label="Niveau"
                    v-model="exercice.niveau"
                    prepend-icon="mdi-school"
                    :rules="[rules.required]"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Numéro du Chapitre"
                    v-model="exercice.chapitreId"
                    prepend-icon="mdi-book-open-page-variant"
                    :rules="[rules.required, rules.numeric]"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn color="primary" type="submit">{{ isEditing ? 'Modifier' : 'Ajouter' }} Exercice</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
    </VCard>
  </v-container>
</template>
