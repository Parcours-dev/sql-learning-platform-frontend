<script setup>

import pages3 from '@images/pages/3.png'
import { useStore } from 'vuex';

import { ref, onMounted } from 'vue';
import axios from 'axios';

const isCardDetailsVisible = ref(false)
const store = useStore();
const cards = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/chapitres'); // Adaptez avec votre URL
    cards.value = response.data.map(chapitre => ({
      title: chapitre.Nom,
      description: chapitre.Description,
      chapitreId: chapitre.ChapitreID
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des chapitres :", error);
  }
});

function selectionnerChapitre(chapitreId) {
  store.commit('setChapitreSelectionne', chapitreId);
  store.dispatch('chargerExercices', chapitreId);
}

const hoveredCard = ref(null)

</script>
<template>
  <VRow>
    <!-- Boucle sur chaque chapitre pour créer une carte -->
    <VCol
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        md="4"
        sm="6"
    >
      <VCard>
        <VImg
            :src="pages3"
            cover
            max-height="280"
        />
        <VCardItem>
          <!-- Titre dynamique basé sur les données de chapitre -->
          <VCardTitle>{{ card.title }}</VCardTitle>
        </VCardItem>
        <VCardText>
          <!-- Description dynamique basée sur les données de chapitre -->
          <div class="mb-4">
            {{ card.description }}
          </div>
          <VBtn
              variant="text"
              density="comfortable"
              @click="selectionnerChapitre(card.chapitreId)"
          >
            Accès aux exercices 🧠
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>


</template>



<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}


// membership pricing
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}


.membership-pricing {
  sup {
    inset-block-start: 9px;
  }
}

body {
  background-color: #100e17;
  font-family: 'Open Sans', sans-serif;
}

.container {
  height: 300px;
  width: 600px;
  margin-top: 60px; /* Remplacez 'top' par 'margin-top' */
  display: flex;
  justify-content: center; /* Centre les cartes horizontalement */
}


.card {
  display: flex;
  height: 280px;
  width: 200px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}


.card:not(:first-child) {
  margin-left: -50px;
}


.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}


.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}


.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}


.bar {
  position: absolute;
  top: 100px;
  left: 20px;
  height: 5px;
  width: 150px;
}


.emptybar {
  background-color: #2e3033;
  width: 100%;
  height: 100%;
}


.filledbar {
  position: absolute;
  top: 0px;
  z-index: 3;
  width: 0px;
  height: 100%;
  background: rgb(0,154,217);
  background: linear-gradient(90deg, rgba(0,154,217,1) 0%, rgba(217,147,0,1) 65%, rgba(255,186,0,1) 100%);
  transition: 0.6s ease-out;
}


.card:hover .filledbar {
  width: 120px;
  transition: 0.4s ease-out;
}


.circle {
  position: absolute;
  top: 150px;
  left: calc(50% - 60px);
}


.stroke {
  stroke: white;
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  transition: 0.6s ease-out;
}


svg {
  fill: #17141d;
  stroke-width: 2px;
}


.card:hover .stroke {
  stroke-dashoffset: 100;
  transition: 0.6s ease-out;
}

</style>

