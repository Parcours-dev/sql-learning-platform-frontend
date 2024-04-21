<script setup>
import { ref } from 'vue';
import ShowExerciceTable from '@/views/pages/tables/ShowExerciceTable.vue';
import ShowChapitreTable from "@/views/pages/tables/ShowChapitreTable.vue";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';


const nomChapitre = ref('');
const descriptionChapitre = ref('');

const soumettreChapitre = async () => {
  const chapitre = {
    nom: nomChapitre.value,
    description: descriptionChapitre.value
  };

  // Envoyer les données au serveur
  await fetch('http://localhost:3000/api/addchapitres', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chapitre),
    credentials: 'include'
  });
  toast('Chapitre ajouté', {
    theme: 'auto',
    type: 'success',
    position: 'top-center',
    dangerouslyHTMLString: true,
    "autoClose": 1500,
  });
  setTimeout(() => {
    window.location.reload();
  }, 1800);
}
</script>
<template>
  <v-container>
    <!-- Section for displaying chapters -->
    <VCol cols="12">
    <v-card class="pa-4 mb-5"> <!-- Added margin-bottom for spacing -->
      <v-card-title>Liste des Chapitres</v-card-title>
      <v-card-text>
        Voici la liste des Chapitres actuellement disponibles.
      </v-card-text>
      <ShowChapitreTable/>
    </v-card>
    </VCol>
    <!-- Section for adding a new chapter -->
    <v-form @submit.prevent="soumettreChapitre">
      <v-card class="pa-4">
        <v-card-title>Ajouter un nouveau Chapitre</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <label for="nomChapitre">Nom du Chapitre</label>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                  id="nomChapitre"
                  v-model="nomChapitre"
                  placeholder="Entrez le nom du chapitre"
                  persistent-placeholder
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <label for="descriptionChapitre">Description</label>
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                  id="descriptionChapitre"
                  v-model="descriptionChapitre"
                  placeholder="Entrez une description"
                  persistent-placeholder
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col offset-md="3" cols="12" md="9" class="d-flex gap-4">
              <v-btn type="submit" color="primary">
                Envoyer
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
