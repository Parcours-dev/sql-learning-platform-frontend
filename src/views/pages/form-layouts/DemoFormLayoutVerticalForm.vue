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
      <VCol cols="12">
        <VTextField
            v-model="firstName"
            label="First Name"
            placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
            v-model="email"
            label="Email"
            placeholder="johndoe@example.com"
            type="email"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
            v-model="mobile"
            label="Mobile"
            placeholder="+1 123 456 7890"
            type="number"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
            v-model="password"
            label="Password"
            placeholder="············"
            type="password"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
            v-model="checkbox"
            label="Remember me"
        />
      </VCol>

      <VCol
          class="d-flex gap-4"
          cols="12"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
            color="secondary"
            type="reset"
            variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
