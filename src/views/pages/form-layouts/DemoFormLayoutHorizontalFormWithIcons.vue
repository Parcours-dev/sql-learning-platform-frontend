<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const firstName = ref('');
const emits = defineEmits(['submit']);

const handleSubmit = () => {
  emits('submit', firstName.value); // Émettre l'événement avec la requête SQL
};
</script>

<template>
  <VForm @submit.prevent="handleSubmit">
    <VRow>
      <VCol cols="12">
        <VRow>
          <VCol cols="12" md="15">
            <VTextField
                id="firstName"
                v-model="firstName"
                label="Requête SQL"
                persistent-placeholder
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" class="mt-1 mb-1">&nbsp;</VCol>
        </VRow>
        <!-- Bouton de soumission ajouté directement dans le composant pour la cohérence -->
        <VBtn type="submit">Valider</VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
