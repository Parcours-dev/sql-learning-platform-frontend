<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';

// Chapters array and sorting state
const chapters = ref([]);
const sortState = reactive({
  key: '',       // current column key being sorted
  isAscending: true  // sort direction
});

// Function to load chapters from the backend
const fetchChapters = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/chapitres');
    chapters.value = response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
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
      </tr>
      </thead>
      <tbody>
      <tr v-for="chapter in chapters" :key="chapter.ChapitreID">
        <td>{{ chapter.ChapitreID }}</td>
        <td>{{ chapter.Nom }}</td>
        <td>{{ chapter.Description }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
