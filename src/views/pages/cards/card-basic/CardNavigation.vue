<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import DemoFormLayoutHorizontalFormWithIcons from "@/views/pages/form-layouts/DemoFormLayoutHorizontalFormWithIcons.vue";
import DemoSimpleTableFixedHeader from "@/views/pages/tables/DemoSimpleTableFixedHeader.vue";
import ConfettiExplosion from "vue-confetti-explosion";

const store = useStore();
const exercices = computed(() => store.state.exercices);
const chapitreSelectionne = ref(null);
const navigationTab = ref(null);
const employes = ref([]);
const showConfetti = ref(false); // Ajouté pour contrôler l'affichage des confettis

// Pas besoin de réimporter onMounted, c'était fait en double

onMounted(async () => {
  await chargerEmployes();
});

const chargerEmployes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/tables/employe');
    employes.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données des employés:", error);
  }
};


const submitQuery = async (questionId, userQuery) => {
  try {
    const response = await axios.post('http://localhost:3000/verify-query', {
      QuestionID: questionId,
      UserQuery: userQuery
    }, { withCredentials: true });
    if (response.data.isCorrect) {
      showConfetti.value = true; // Déclenche les confettis
      setTimeout(() => { showConfetti.value = false; }, 5000); // Masque les confettis après 5 secondes
    } else {
      alert('Désolé, votre réponse est incorrecte. Réessayez !');
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la requête:', error);
  }
};

watch(chapitreSelectionne, (nouveauChapitreId) => {
  if (nouveauChapitreId) {
    store.dispatch('chargerExercices', nouveauChapitreId);
  }
});
</script>


<template>
  <ConfettiExplosion v-if="showConfetti" :duration="7000" :force="0.5" :stageHeight="2000" :stageWidth="2000" :particleCount="300"/>
  <VRow>
    <VCol md="12" cols="12">
      <VCard>
        <VTabs v-model="navigationTab">
          <VTab v-for="exercice in exercices" :key="exercice.id" :value="exercice.id" class="black--text">
            {{ exercice.titre }}
          </VTab>
        </VTabs>

        <VWindow v-model="navigationTab">
          <VWindowItem v-for="exercice in exercices" :key="exercice.id" :value="exercice.id">
            <VCardTitle>{{ exercice.titre }}</VCardTitle>
            <VCardText>{{ exercice.description }}</VCardText>
            <VCard title="Réponse">
              <VCardText>
                <DemoFormLayoutHorizontalFormWithIcons @submit="submitQuery(exercice.id, $event)" />
              </VCardText>
            </VCard>
          </VWindowItem>
        </VWindow>

        <VCol cols="5">
        <VCard title="Employés">
          <VCardText>
            Voici la liste des employés du jeu de données. Bonne lecture 😉
          </VCardText>
          <DemoSimpleTableFixedHeader :employes="employes" />
        </VCard>
          </VCol>
        <VDivider/>
      </VCard>
    </VCol>


  </VRow>
</template>
