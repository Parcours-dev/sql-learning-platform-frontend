<script setup>
import {defineEmits, onMounted, reactive, ref} from 'vue';
import axios from 'axios';

const emits = defineEmits(['edit-exercice', 'delete-exercice']);
const questions = ref([]);
const sortState = reactive({
  key: '',
  isAscending: true
});

const fetchQuestions = async () => {
  const response = await axios.get('http://localhost:3000/api/questions');
  questions.value = response.data;
};

const editExercice = (question) => {
  emits('edit-exercice', {
    id: question.QuestionID, // Assurez-vous d'utiliser les bons noms de propriétés
    titre: question.Title,
    description: question.Description,
    correctQuery: question.CorrectQuery,
    niveau: question.Level,
    categorie: question.Category,
    texteQuestion: question.QuestionText,
    instructions: question.Instructions,
    chapitreId: question.ChapitreID
  });
  console.log('Editing exercise:', question);
};

const deleteExercice = async (questionId) => {
  try {
    await axios.delete(`http://localhost:3000/api/questions/${questionId}`);
    fetchQuestions();  // Recharger les questions après suppression
  } catch (error) {
    console.error('Error deleting question:', error);
  }
};

const sortQuestions = (key) => {
  if (sortState.key === key) {
    sortState.isAscending = !sortState.isAscending;
  } else {
    sortState.key = key;
    sortState.isAscending = true;
  }
  questions.value.sort((a, b) => {
    if (a[key] < b[key]) return sortState.isAscending ? -1 : 1;
    if (a[key] > b[key]) return sortState.isAscending ? 1 : -1;
    return 0;
  });
};

onMounted(fetchQuestions);
</script>

<template>
  <v-table density="comfortable" fixed-header height="500">
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
      <th>Actions</th>
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
      <td>
        <v-btn icon @click="editExercice(question)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red" icon @click="deleteExercice(question.QuestionID)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>
