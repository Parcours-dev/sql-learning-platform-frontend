<script setup>
import {defineEmits, defineProps, ref} from 'vue';

const {indice} = defineProps(['indice']);
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
        <!-- Affiche l'indice si disponible -->
        <VRow v-if="indice">
          <VCol class="mt-1 mb-1" cols="12">
            Voici ton indice 🕵🏼 : {{ indice }}
          </VCol>
        </VRow>

        <VRow>
          <VCol class="mt-1 mb-1" cols="12">&nbsp;</VCol>
        </VRow>
        <VBtn type="submit">Valider</VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>