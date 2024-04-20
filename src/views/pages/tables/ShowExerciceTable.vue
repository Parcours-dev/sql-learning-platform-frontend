<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';

// Questions array and sorting state
const questions = ref([]);
const sortState = reactive({
  key: '',       // current column key being sorted
  isAscending: true  // sort direction
});

// Function to load questions from the backend
const fetchQuestions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/questions');
    questions.value = response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};

// Function to handle sort
const sortQuestions = (key) => {
  if (sortState.key === key) {
    // Toggle sort direction if the same column is clicked
    sortState.isAscending = !sortState.isAscending;
  } else {
    // Set new key and default to ascending sort
    sortState.key = key;
    sortState.isAscending = true;
  }
  questions.value.sort((a, b) => {
    if (a[key] < b[key]) return sortState.isAscending ? -1 : 1;
    if (a[key] > b[key]) return sortState.isAscending ? 1 : -1;
    return 0;
  });
};

// Load questions on component mount
onMounted(fetchQuestions);
</script>
<template>
  <v-table fixed-header height="500" density="comfortable">
    <thead>
    <tr>
      <th @click="sortQuestions('QuestionID')">ID</th>
      <th @click="sortQuestions('Title')">Titre</th>
      <th @click="sortQuestions('Description')">Description</th>
      <th @click="sortQuestions('CorrectQuery')">Requête Correcte</th>
      <th @click="sortQuestions('Level')">Niveau</th>
      <th @click="sortQuestions('Category')">Catégorie</th>
      <th @click="sortQuestions('QuestionText')">Texte de la Question</th>
      <th @click="sortQuestions('Instructions')">Instructions</th>
      <th @click="sortQuestions('ChapitreID')">ID du Chapitre</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="question in questions" :key="question.QuestionID">
      <td>{{ question.QuestionID }}</td>
      <td>{{ question.Title }}</td>
      <td>{{ question.Description }}</td>
      <td>{{ question.CorrectQuery }}</td>
      <td>{{ question.Level }}</td>
      <td>{{ question.Category }}</td>
      <td>{{ question.QuestionText }}</td>
      <td>{{ question.Instructions }}</td>
      <td>{{ question.ChapitreID }}</td>
    </tr>
    </tbody>
  </v-table>
</template>
