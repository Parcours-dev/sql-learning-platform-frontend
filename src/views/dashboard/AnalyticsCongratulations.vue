<script setup>
import {useTheme} from 'vuetify'
import illustrationJohnDark from '@images/cards/illustration-john-dark.png'
import illustrationJohnLight from '@images/cards/illustration-john-light.png'
import axios from 'axios'
import {ref} from 'vue'

const {global} = useTheme()
const illustrationJohn = computed(() => global.name.value === 'dark' ? illustrationJohnDark : illustrationJohnLight)

// Ajouter une référence pour stocker les données de l'utilisateur
const userData = ref({nom: ''});

// Appel API pour récupérer les informations de l'utilisateur
axios.get('http://localhost:3000/user-info', {withCredentials: true})
    .then(response => {
      userData.value = response.data;  // Assurez-vous que la réponse a la structure attendue
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
    });


// Données réactives pour stocker le pourcentage
const progressPercentage = ref(0);

// Appel API pour récupérer le pourcentage de progression
axios.get('http://localhost:3000/api/progress', {withCredentials: true})
    .then(response => {
      progressPercentage.value = response.data.progressPercentage;  // Assurez-vous que la réponse a la structure attendue
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du pourcentage de progression:', error);
    });
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
          cols="12"
          order="2"
          order-sm="1"
          sm="8"
      >
        <VCardItem>
          <VCardTitle class="text-md-h5 text-primary">
            Félicitations {{ userData.Prenom }} ! 🎉
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <span>
            Tu as résolu {{ progressPercentage }} % 🤩 des exercices.
            <br>
            Consulte les exercices restants pour continuer à progresser.
          </span>
          <br>
          <VBtn
              class="mt-4"
              size="small"
              to="/cards"
              variant="tonal"
          >
            Je m'améliore !
          </VBtn>
        </VCardText>
      </VCol>

      <VCol
          class="text-center"
          cols="12"
          order="1"
          order-sm="2"
          sm="4"
      >
        <img
            :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'"
            :height="$vuetify.display.xs ? '150' : '175'"
            :src="illustrationJohn"
            class="john-illustration flip-in-rtl"
        >
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}
</style>
