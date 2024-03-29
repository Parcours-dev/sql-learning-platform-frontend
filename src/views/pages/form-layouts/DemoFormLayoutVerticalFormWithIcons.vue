<script setup>
const firstName = ref('')
</script>

<template>
  <VForm @submit.prevent>
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="firstName"
          prepend-inner-icon="bx-user"
          label="First Name"
          placeholder="John"
        />
      </VCol>
    </VRow>
  </VForm>
</template>
