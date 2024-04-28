<script setup>
import { ref } from 'vue';
import axios from 'axios';
import logo from '@images/logo.svg?raw';
import ErrorHeader from "@/components/ErrorHeader.vue";
import router from "@/router";

const form = ref({
  username: '',
  nom: '',  // Added field
  prenom: '',  // Added field
  numEtudiant: '',  // Added field
  email: '',
  password: '',
  privacyPolicies: false,
});
const showError = ref(false);
const errorDetails = ref({});
const isPasswordVisible = ref(false);

// Function to handle registration
const handleSignUp = async () => {
  showError.value = false;

  if (!form.value.privacyPolicies) {
    showError.value = true;
    errorDetails.value = {
      errorCode: '⚠️',
      errorTitle: 'Privacy Policy Validation',
      errorDescription: 'You must accept the privacy policy to continue.',
    };
    return;
  }

  // Include additional data checks or validation if necessary

  try {
    const response = await axios.post('http://localhost:3000/register', {
      username: form.value.username,
      nom: form.value.nom,
      prenom: form.value.prenom,
      numEtudiant: form.value.numEtudiant,
      email: form.value.email,
      password: form.value.password
    });
    if (response.status === 201) {
      showError.value = false;
      errorDetails.value = {};
      // Redirect to login page after successful registration
      await router.push('/login');
    }
  } catch (error) {
    showError.value = true;
    if (error.response) {
      errorDetails.value =   {
        errorCode: error.response.status === 400 ? '🤔' : '😤',
        errorTitle: error.response.status === 400 ? 'Missing Data' : 'Server Error',
        errorDescription: error.response.data.message || 'An internal server error occurred. Please try again later.'
      };
    }
  }
};
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
          L'apprentissage commence ici 🚀
        </h5>
        <p class="mb-0">
          Apprends le SQL de manière intuitive
        </p>
      </VCardText>

      <ErrorHeader
          v-if="showError"
          :errorCode="errorDetails.errorCode"
          :errorDescription="errorDetails.errorDescription"
          :errorTitle="errorDetails.errorTitle"
      />

      <VCardText>
        <VForm @submit.prevent="handleSignUp">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                  v-model="form.username"
                  autofocus
                  label="Pseudo"
                  placeholder="Parcours"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                  v-model="form.nom"
                  autofocus
                  label="Nom"
                  placeholder="Pierre Coussot"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                  v-model="form.prenom"
                  autofocus
                  label="Prénom"
                  placeholder="Pierre Coussot"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                  v-model="form.numEtudiant"
                  autofocus
                  label="Numéro Etduiant"
                  placeholder="123456"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                  v-model="form.email"
                  label="Email"
                  placeholder="antoinedupont@gmail.com"
                  type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                  v-model="form.password"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Mot de passe"
                  placeholder="············"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                    id="privacy-policy"
                    v-model="form.privacyPolicies"
                    inline
                />
                <VLabel
                    for="privacy-policy"
                    style="opacity: 1;"
                >
                  <span class="me-1">J'accepte la</span>
                  <a
                      class="text-primary"
                      href="javascript:void(0)"
                  >politique de confidentialité</a>
                </VLabel>
              </div>

              <VBtn
                  block
                  type="submit"
              >
                S'inscrire
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
                class="text-center text-base"
                cols="12"
            >
              <span>Tu as déjà un compte ?</span>
              <RouterLink
                  class="text-primary ms-2"
                  to="/login"
              >
                Se Connecter
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
