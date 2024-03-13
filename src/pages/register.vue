<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue';
import logo from '@images/logo.svg?raw';
import { useRouter } from 'vue-router'
import ErrorHeader from "@/components/ErrorHeader.vue";
import router from "@/router";


const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
});
const showError = ref(false);
const errorDetails = ref({});
const isPasswordVisible = ref(false);

// Fonction pour gérer l'inscription
const handleSignUp = async () => {
  showError.value = false; // Réinitialiser l'état de l'erreur avant chaque tentative

  if (!form.value.privacyPolicies) {
    showError.value = true;
    errorDetails.value = {
      errorCode: '⚠️',
      errorTitle: 'Validation de la politique de confidentialité',
      errorDescription: 'Vous devez accepter la politique de confidentialité pour continuer.',
    };
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/register', form.value);
    if (response.status === 201) {
      await router.push('/login')
    }
  } catch (error) {
    showError.value = true;
    if (error.response) {
      if (error.response.status === 400) {
        errorDetails.value = {
          errorCode: '🤔',
          errorTitle: 'Données manquantes',
          errorDescription: 'Tous les champs sont requis. Veuillez les remplir pour continuer.',
        };
      } else if (error.response.status === 500) {
        errorDetails.value = {
          errorCode: '😤',
          errorTitle: 'Erreur Serveur',
          errorDescription: 'Problème de serveur interne. Veuillez réessayer plus tard.',
        };
      } else if (error.response.status === 404){
        errorDetails.value = {
          errorCode: '🙈',
          errorTitle: 'Problème de connexion',
          errorDescription: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion.',
        };
      }
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
          :errorTitle="errorDetails.errorTitle"
          :errorDescription="errorDetails.errorDescription"
      />

      <VCardText>
        <VForm @submit.prevent="handleSignUp">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                autofocus
                label="Nom Complet"
                placeholder="Pierre Coussot"
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
                label="Mot de passe"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
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
                    href="javascript:void(0)"
                    class="text-primary"
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
              cols="12"
              class="text-center text-base"
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
