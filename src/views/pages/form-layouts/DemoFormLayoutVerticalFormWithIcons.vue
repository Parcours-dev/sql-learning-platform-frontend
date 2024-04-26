<script setup>
const firstName = ref('')
</script>

<template>
  <VForm @submit.prevent>
    <VRow>
      <VCol cols="12">
        <VTextField
            v-model="firstName"
            label="First Name"
            placeholder="John"
            prepend-inner-icon="bx-user"
        />
      </VCol>
    </VRow>
  </VForm>
</template>
