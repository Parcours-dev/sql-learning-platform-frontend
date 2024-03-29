<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol cols="12">
        <VRow no-gutters>
        </VRow>
        <VRow>
          <VCol
              cols="12"
              md="2"
          >
            <VTextField
                id="firstName"
                v-model="firstName"
                placeholder="Requête SQL"
                persistent-placeholder
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" class="mt-1 mb-1">&nbsp;</VCol>
        </VRow>
      </VCol>
    </VRow>
  </VForm>
</template>