<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ShowChapitreTable from "@/views/pages/tables/ShowChapitreTable.vue";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const nomChapitre = ref('');
const descriptionChapitre = ref('');
const chapitreId = ref(null);
const isEditing = ref(false);

const fetchChapitres = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/chapitres');
    // Directement assigner les données aux chapitres, si vous les affichez quelque part
  } catch (error) {
    console.error('Error fetching chapters:', error);
  }
}

const soumettreChapitre = async () => {
  const chapitre = {
    nom: nomChapitre.value,
    description: descriptionChapitre.value
  };

  // Debug: Afficher l'ID du chapitre
  console.log('Submitting chapitre ID:', chapitreId.value);

  try {
    let response;
    if (isEditing.value && chapitreId.value) {
      response = await axios.put(`http://localhost:3000/api/chapitres/${chapitreId.value}`, chapitre);
      if (response.status === 200) {
        toast('Chapitre modifié', { type: 'success' });
        resetForm();
        window.location.reload();

      }
    } else {
      response = await axios.post('http://localhost:3000/api/addchapitres', chapitre);
      if (response.status === 200) {
        toast('Chapitre ajouté', { type: 'success' });
        resetForm();
        window.location.reload();
      }
    }
  } catch (error) {
    console.error('Error submitting chapter:', error);
    toast('Erreur lors de la soumission', { type: 'error' });
  }
}

function resetForm() {
  nomChapitre.value = '';
  descriptionChapitre.value = '';
  isEditing.value = false;
  chapitreId.value = null;
  fetchChapitres();  // Rafraîchir la liste des chapitres
}


const setEditChapter = (chapitre) => {
  console.log('Received chapter for edit:', chapitre);
  nomChapitre.value = chapitre.Nom; // Assurez-vous que les clés sont correctement casées
  descriptionChapitre.value = chapitre.Description; // Assurez-vous que les clés sont correctement casées
  chapitreId.value = chapitre.ChapitreID; // Changez 'id' par 'ChapitreID'
  isEditing.value = true;
};

</script>


<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4 mb-5">
          <v-card-title>Liste des Chapitres</v-card-title>
          <v-card-text>
            <ShowChapitreTable @edit-chapter="setEditChapter"/>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-form @submit.prevent="soumettreChapitre">
          <v-card class="pa-4">
            <v-card-title>{{ isEditing ? 'Modifier' : 'Ajouter un nouveau' }} Chapitre</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <label for="nomChapitre">Nom du Chapitre</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field id="nomChapitre" v-model="nomChapitre" placeholder="Entrez le nom du chapitre" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3">
                  <label for="descriptionChapitre">Description</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field id="descriptionChapitre" v-model="descriptionChapitre" placeholder="Entrez une description" />
                </v-col>
              </v-row>
              <v-row>
                <v-col offset-md="3" cols="12" md="9">
                  <v-btn type="submit" color="primary">{{ isEditing ? 'Modifier' : 'Envoyer' }}</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
