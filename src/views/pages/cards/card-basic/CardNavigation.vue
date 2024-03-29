<script setup>
import { computed, ref, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();

// Utilisation de computed pour réagir aux changements de l'état exercices dans le store
const exercices = computed(() => store.state.exercices);
const chapitreSelectionne = ref(null);
const navigationTab = ref(null);

watch(chapitreSelectionne, (nouveauChapitreId) => {
  if (nouveauChapitreId) {
    store.dispatch('chargerExercices', nouveauChapitreId);
  }
});
</script>




<template>
  <VRow>
    <VCol md="12" cols="12">
      <VCard>
        <!-- Onglets de navigation -->
        <VTabs v-model="navigationTab">
          <VTab v-for="exercice in exercices" :key="exercice.id" :value="exercice.id" class="black--text">
            {{ exercice.titre }}
          </VTab>
        </VTabs>

        <VWindow v-model="navigationTab">
          <VWindowItem v-for="exercice in exercices" :key="exercice.id" :value="exercice.id">
            <VCardTitle>{{ exercice.titre }}</VCardTitle>
            <VCardText>{{ exercice.description }}</VCardText>
          </VWindowItem>
          <VCardText>
            <VBtn>Je m'entraîne !</VBtn>
          </VCardText>
        </VWindow>

        <VDivider />

      </VCard>
    </VCol>
  </VRow>
</template>
