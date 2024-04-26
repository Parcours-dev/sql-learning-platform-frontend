<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stats: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
})

const studentData = ref({
  title: 'Bad Étudiant',
  image: 'chart', // Un avatar par défaut ou une image générique
  name: '',
  nb: '',
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/least-successful-student');
    studentData.value.name = `${response.data.Nom} ${response.data.Prenom}`;
    studentData.value.nb = `${response.data.CorrectAnswersCount} 😔`;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de létudiant ayant le plus de difficultés:', error);
    // Gérer les erreurs, par exemple, en affichant un message ou en utilisant une valeur par défaut
  }
});
</script>


<template>
  <VCard>
    <VCardText class="d-flex align-center pb-4">
      <img
          :src="props.image"
          alt="image"
          width="42"
      >

      <VSpacer/>

    </VCardText>

    <VCardText>
      <p class="text-h7 text-no-wrap mb-0">
        Moins bon étudiant
      </p>
      <p class="text-h6 text-no-wrap mb-0">
        {{ studentData.name }}
      </p>
      <h5 class="text-h8 text-no-wrap mb-0">
        Réponses correctes :
      </h5>
      <h5 class="text-h5 text-no-wrap mb-1">
        {{ studentData.nb }}
      </h5>
      <span
          :class="isPositive ? 'text-success' : 'text-error'"
          class="d-flex align-center gap-1 text-sm"
      >
      </span>
    </VCardText>
  </VCard>
</template>
