<script setup>
import { ref, onMounted, reactive, defineEmits } from 'vue';
import axios from 'axios';
import {toast} from "vue3-toastify";

const emits = defineEmits(['edit-chapter']);
const chapters = ref([]);
const sortState = reactive({
  key: '',
  isAscending: true
});

const fetchChapters = async () => {
  const response = await axios.get('http://localhost:3000/api/chapitres');
  chapters.value = response.data;
};

const editChapter = (chapter) => {
  emits('edit-chapter', {
    ChapitreID: chapter.ChapitreID, // Utilisez la bonne clé pour l'ID
    Nom: chapter.Nom,
    Description: chapter.Description
  });
  console.log('Editing chapter:', chapter);
};


const deleteChapter = async (id) => {
  await axios.delete(`http://localhost:3000/api/deletechapitres/${id}`);
  if (response.status === 200) {
    toast('Chapitre supprimé', { type: 'success' });
    fetchChapters();
  }
  else{
    toast('Erreur lors de la suppression', {type: 'error'})
  }
};

// Function to handle sort
const sortChapters = (key) => {
  if (sortState.key === key) {
    // Toggle sort direction if the same column is clicked
    sortState.isAscending = !sortState.isAscending;
  } else {
    // Set new key and default to ascending sort
    sortState.key = key;
    sortState.isAscending = true;
  }
  chapters.value.sort((a, b) => {
    if (a[key] < b[key]) return sortState.isAscending ? -1 : 1;
    if (a[key] > b[key]) return sortState.isAscending ? 1 : -1;
    return 0;
  });
};

// Load chapters on component mount
onMounted(fetchChapters);

</script>
<template>
  <v-container>
    <v-table fixed-header height="500" density="comfortable">
      <thead>
      <tr>
        <th @click="sortChapters('ChapitreID')">ID</th>
        <th @click="sortChapters('Nom')">Nom</th>
        <th @click="sortChapters('Description')">Description</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="chapter in chapters" :key="chapter.ChapitreID">
        <td>{{ chapter.ChapitreID }}</td>
        <td>{{ chapter.Nom }}</td>
        <td>{{ chapter.Description }}</td>
        <td>
          <v-btn icon @click="editChapter(chapter)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="deleteChapter(chapter.ChapitreID)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>

        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>