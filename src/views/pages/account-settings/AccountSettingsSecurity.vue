<script setup>
import {ref} from 'vue';
import axios from 'axios';
import ErrorHeader from "@/components/ErrorHeader.vue";

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('12345678')
const newPassword = ref('87654321')
const confirmPassword = ref('87654321')

const passwordRequirements = [
  "Minimum 8 caractères - Plus il y en a, mieux c'est 😉",
  "Au moins un caractère majuscule",
  "Au moins un chiffre",
  "Au moins un symbole"
]


/*
const serverKeys = [
  {
    name: 'Server Key 1',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac',
    createdOn: '28 Apr 2021, 18:20 GTM+4:10',
    permission: 'Full Access',
  },
  {
    name: 'Server Key 2',
    key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99',
    createdOn: '12 Feb 2021, 10:30 GTM+2:30',
    permission: 'Read Only',
  },
  {
    name: 'Server Key 3',
    key: '2e915e59-3105-47f2-8838-6e46bf83b711',
    createdOn: '28 Dec 2020, 12:21 GTM+4:10',
    permission: 'Full Access',
  },
]

const recentDevicesHeaders = [
  {
    title: 'BROWSER',
    key: 'browser',
  },
  {
    title: 'DEVICE',
    key: 'device',
  },
  {
    title: 'LOCATION',
    key: 'location',
  },
  {
    title: 'RECENT ACTIVITY',
    key: 'recentActivity',
  },
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bx-mobile',
      color: 'error',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
  {
    browser: 'Chrome on MacOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'bxl-apple',
      color: 'secondary',
    },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'bxl-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'bxl-android',
      color: 'success',
    },
  },
]*/


const showError = ref(false);
const showSuccess = ref(false); // Nouvel état pour le succès
const errorDetails = ref({});
const successDetails = ref({}); // Nouvel objet pour les détails du succès

const updatePassword = async () => {
  showError.value = false;

  if (newPassword.value !== confirmPassword.value) {
    showError.value = true;
    errorDetails.value = {
      errorCode: '⚠️',
      errorTitle: 'Erreur de validation',
      errorDescription: 'Les nouveaux mots de passe ne correspondent pas.',
    };
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/updatemdpuser', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });
    if (response.status === 200) {
      showError.value = true; // Indiquer le succès
      errorDetails.value = {
        errorCode: '🎉',
        errorTitle: 'Succès !',
        errorDescription: 'Votre mot de passe a été mis à jour avec succès.',
      };
      // Optionnel : Redirection ou action supplémentaire ici
    }
  } catch (error) {
    showError.value = true;
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorDetails.value = {
            errorCode: '🔐',
            errorTitle: 'Critères de mot de passe non respectés',
            errorDescription: 'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un symbole. Veuillez réessayer avec un mot de passe conforme.',
          };
          break;
        case 401:
          errorDetails.value = {
            errorCode: '😤',
            errorTitle: 'Erreur d\'authentification',
            errorDescription: 'Mot de passe actuel incorrect.',
          };
          break;
        default:
          errorDetails.value = {
            errorCode: '🙈',
            errorTitle: 'Erreur serveur',
            errorDescription: 'Un problème est survenu. Veuillez réessayer plus tard.',
          };
      }
    } else {
      errorDetails.value = {
        errorCode: '🙈',
        errorTitle: 'Problème de connexion',
        errorDescription: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion.',
      };
    }
  }
};


</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Changer mon mot de passe">
        <VForm>
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow>
              <VCol
                  cols="12"
                  md="6"
              >
                <!-- 👉 current password -->
                <VTextField
                    v-model="currentPassword"
                    :append-inner-icon="isCurrentPasswordVisible ? 'bx-hide' : 'bx-show'"
                    :type="isCurrentPasswordVisible ? 'text' : 'password'"
                    label="Mot de passe actuel"
                    placeholder="············"
                    @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                  cols="12"
                  md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                    v-model="newPassword"
                    :append-inner-icon="isNewPasswordVisible ? 'bx-hide' : 'bx-show'"
                    :type="isNewPasswordVisible ? 'text' : 'password'"
                    label="Nouveau mot de passe"
                    placeholder="············"
                    @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                  cols="12"
                  md="6"
              >
                <!--    👉 confirm password -->
                <VTextField
                    v-model="confirmPassword"
                    :append-inner-icon="isConfirmPasswordVisible ? 'bx-hide' : 'bx-show'"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    label="Confirmation nouveau mot de passe"
                    placeholder="············"
                    @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <!--  👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">
              Construction du mot de passe :
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                  v-for="item in passwordRequirements"
                  :key="item"
                  class="d-flex"
              >
                <div>
                  <VIcon
                      class="me-3"
                      icon="bxs-circle"
                      size="7"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!--  👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn @click="updatePassword">Sauvegarder</VBtn>

            <VBtn
                color="secondary"
                type="reset"
                variant="tonal"
            >
              Annuler
            </VBtn>
          </VCardText>
          <ErrorHeader
              v-if="showError"
              :errorCode="errorDetails.errorCode"
              :errorDescription="errorDetails.errorDescription"
              :errorTitle="errorDetails.errorTitle"
          />

        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->
    <!--
     SECTION Two-steps verification
    <VCol cols="12">
      <VCard title="Two-steps verification">
        <VCardText>
          <p class="font-weight-semibold">
            Two factor authentication is not enabled yet.
          </p>
          <p>
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.
            <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >Learn more.</a>
          </p>

          <VBtn>
            Enable 2FA
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    !SECTION

    <VCol cols="12">
      SECTION: Create an API key
      <VCard title="Create an API key">
        <VRow>
           👉 Choose API Key
          <VCol
            cols="12"
            md="5"
            order-md="0"
            order="1"
          >
            <VCardText>
              <VForm @submit.prevent="() => {}">
                <VRow>
                   👉 Choose API Key
                  <VCol cols="12">
                    <VSelect
                      label="Choose the API key type you want to create"
                      placeholder="Select API key type"
                      :items="['Full Control', 'Modify', 'Read & Execute', 'List Folder Contents', 'Read Only', 'Read & Write']"
                    />
                  </VCol>

                   👉 Name the API Key
                  <VCol cols="12">
                    <VTextField
                      label="Name the API key"
                      placeholder="Name the API key"
                    />
                  </VCol>

                   👉 Create Key Button
                  <VCol cols="12">
                    <VBtn
                      type="submit"
                      block
                    >
                      Create Key
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCol>
        </VRow>
      </VCard>
     !SECTION
    </VCol>

    <VCol cols="12">
       SECTION: API Keys List
      <VCard title="API Key List &amp; Access">
        <VCardText>
          An API key is a simple encrypted string that identifies an application without any principal. They are useful for accessing public data anonymously, and are used to associate API requests with your project for quota and billing.
        </VCardText>

         👉 Server Status
        <VCardText class="d-flex flex-column gap-y-4">
          <div
            v-for="serverKey in serverKeys"
            :key="serverKey.key"
            class="bg-var-theme-background pa-4"
          >
            <div class="d-flex align-center flex-wrap mb-3">
              <h6 class="text-h6 mb-0 me-3">
                {{ serverKey.name }}
              </h6>
              <VChip
                label
                color="primary"
                size="small"
              >
                {{ serverKey.permission }}
              </VChip>
            </div>
            <p class="text-base font-weight-medium">
              <span class="me-3">{{ serverKey.key }}</span>
              <VIcon
                :size="18"
                icon="bx-copy"
                class="cursor-pointer"
              />
            </p>
            <span>Created on {{ serverKey.createdOn }}</span>
          </div>
        </VCardText>
      </VCard>
       !SECTION
    </VCol>

     SECTION Recent Devices
    <VCol cols="12">
       👉 Table
      <VCard title="Recent Devices">
        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          class="text-no-wrap rounded-0 text-sm"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                start
                :icon="item.raw.deviceIcon.icon"
                :color="item.raw.deviceIcon.color"
              />
              <span class="text-high-emphasis text-base">
                {{ item.raw.browser }}
              </span>
            </div>
          </template>
           TODO Refactor this after vuetify provides proper solution for removing default footer
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
     !SECTION -->
  </VRow>
</template>
