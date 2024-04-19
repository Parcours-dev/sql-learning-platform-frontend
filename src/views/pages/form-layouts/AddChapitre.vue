<script setup>
import { ref } from 'vue';

const nomChapitre = ref('');
const descriptionChapitre = ref('');

const soumettreChapitre = async () => {
  const chapitre = {
    nom: nomChapitre.value,
    description: descriptionChapitre.value
  };

  // Envoyer les données au serveur
  await fetch('http://localhost:3000/api/addchapitres', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chapitre),
    credentials: 'include'
  });
}
</script>

<template>
  <VForm @submit.prevent="soumettreChapitre">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- Nom du chapitre -->
          <VCol cols="12" md="3">
            <label for="nomChapitre">Nom du Chapitre</label>
          </VCol>
          <VCol cols="12" md="9">
            <VTextField
                id="nomChapitre"
                v-model="nomChapitre"
                placeholder="Entrez le nom du chapitre"
                persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- Description du chapitre -->
          <VCol cols="12" md="3">
            <label for="descriptionChapitre">Description</label>
          </VCol>
          <VCol cols="12" md="9">
            <VTextField
                id="descriptionChapitre"
                v-model="descriptionChapitre"
                placeholder="Entrez une description"
                persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- Bouton Envoyer -->
      <VCol offset-md="3" cols="12" md="9" class="d-flex gap-4">
        <VBtn type="submit">
          Envoyer
        </VBtn>
      </VCol>
    </VRow>


  </VForm>
</template>
