<script setup>
import { ref } from 'vue'
import axios from 'axios'
import ErrorHeader from '@/components/ErrorHeader.vue'
import { useRouter } from 'vue-router'

const form = ref({
  //email: '',
  username:'',
  password: '',
  //remember: false,
})
const showError = ref(false)
const errorDetails = ref({
  errorCode: '',
  errorTitle: '',
  errorDescription: '',
})

const router = useRouter()

const isPasswordVisible = ref(false)

const submitForm = async () => {
  showError.value = false // Réinitialiser l'état de l'erreur avant chaque tentative

  try {
    const response = await axios.post('http://localhost:3000/login', form.value)
    if (response.status === 200) {
      router.push('/dashboard')
    }
  } catch (error) {
    showError.value = true
    if (error.response && error.response.status === 401) {
      errorDetails.value = {
        errorCode: '😤',
        errorTitle: 'Erreur d\'authentification',
        errorDescription: 'Identifiants invalides. Veuillez réessayer.'
      }
    } else {
      errorDetails.value = {
        errorCode: '🙈',
        errorTitle: 'Problème de connexion',
        errorDescription: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      }
    }
  }
}
</script>


<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
        <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          BabbelSQL
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bienvenue sur BabbelSQL 👋🏻
        </h5>
        <p class="mb-0">
          Connecte toi pour commencer ton apprentissage
        </p>
      </VCardText>

      <VCardText>
        <ErrorHeader
            v-if="showError"
            :errorCode="errorDetails.errorCode"
            :errorTitle="errorDetails.errorTitle"
            :errorDescription="errorDetails.errorDescription"
        />
        <VForm @submit.prevent="submitForm">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                autofocus
                placeholder="antoinedupont@gmail.com"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Mot de passe"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Se souvenir de moi"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Mot de passe oublié
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Connexion
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>C'est ta première fois ?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Créer mon compte
              </RouterLink>
            </VCol>

          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
