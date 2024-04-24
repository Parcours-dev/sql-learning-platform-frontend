<script setup>
import { onMounted, ref } from 'vue';
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

const chapterData = ref({
  title: 'Chapitre le moins réussi',
  image: 'chart', // Chemin vers une image représentative d'échec, si désiré
  chapterName: '',
  correctAnswersCount: '',
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/least-successful-chapter');
    chapterData.value.chapterName = response.data.ChapterName;
    chapterData.value.correctAnswersCount = response.data.CorrectAnswersCount;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations du chapitre le moins réussi:', error);
    // Gérer les erreurs, par exemple, en affichant un message ou en utilisant une valeur par défaut
  }
});
</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center pb-4">
      <img
          width="42"
          :src="props.image"
          alt="Chapitre moins réussi"
      >
    </VCardText>

    <VCardText>
      <p class="mb-1">
        {{ chapterData.title }}
      </p>
      <h5 class="text-default text-wrap mb-3">
        {{ chapterData.chapterName }}
      </h5>
      <h5 class="text-h8 text-no-wrap mb-0">
        Réponses correctes :
      </h5>
      <h5 class="text-h5 text-no-wrap mb-1">
        {{ chapterData.correctAnswersCount }}
      </h5>
    </VCardText>
  </VCard>
</template>
