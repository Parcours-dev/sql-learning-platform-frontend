<script setup>
import axios from 'axios';
import {onMounted, ref} from 'vue';
import avatar1 from '@images/avatars/avatar-1.png';
import {useRouter} from 'vue-router';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const accountDataLocal = ref({
  avatarImg: avatar1,
  prenom: '',
  nom: '',
  email: '',
  numero_etudiant: '',
});

const refInputEl = ref(null);
const isAccountDeactivated = ref(false);


const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const {files} = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}


const loadUserInfo = async () => {
  try {
    const response = await axios.get('http://localhost:3000/user-info', {withCredentials: true});
    // Mise à jour de accountDataLocal avec les données récupérées
    accountDataLocal.value = {
      ...accountDataLocal.value,
      prenom: response.data.Prenom,
      nom: response.data.Nom,
      email: response.data.Email,
      numero_etudiant: response.data.NumEtudiant
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error);
  }
};


const saveProfile = async () => {
  try {
    await axios.post('http://localhost:3000/update-profile', accountDataLocal.value, {withCredentials: true});
    console.log('Profil sauvegardé avec succès !');
    toast('Utilisateur mis à jour avec succès !', {
      theme: 'auto',
      type: 'success',
      position: 'top-center',
      dangerouslyHTMLString: true,
      timeout: 1000
    });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du profil:', error);
  }
};


const router = useRouter();
const deleteAccount = async () => {
  try {
    await axios.delete('http://localhost:3000/delete-account', {withCredentials: true});
    toast('Compte supprimé avec succès !', {
      theme: 'auto',
      type: 'success',
      position: 'top-center',
      dangerouslyHTMLString: true
    });
    setTimeout(() => {
      router.push('/login'); // Redirige vers la page de connexion
    }, 3000); // Redirige après 5 secondes, le temps que le toast soit affiché
  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error);
  }
};

// Appeler `loadUserInfo` au montage du composant
onMounted(loadUserInfo);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Mon Compte 👩‍🎓">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
              :image="accountDataLocal.avatarImg"
              class="me-6"
              rounded="lg"
              size="100"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                  color="primary"
                  @click="refInputEl?.click()"
              >
                <VIcon
                    class="d-sm-none"
                    icon="bx-cloud-upload"
                />
                <span class="d-none d-sm-block">Changer la photo</span>
              </VBtn>

              <input
                  ref="refInputEl"
                  accept=".jpeg,.png,.jpg,GIF"
                  hidden
                  name="file"
                  type="file"
                  @input="changeAvatar"
              >

              <VBtn
                  color="error"
                  type="reset"
                  variant="tonal"
                  @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Réinitialiser</span>
                <VIcon
                    class="d-sm-none"
                    icon="bx-refresh"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Format JPG, GIF ou PNG.
            </p>
          </form>
        </VCardText>

        <VDivider/>

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                  cols="12"
                  md="6"
              >
                <VTextField
                    v-model="accountDataLocal.prenom"
                    label="Prénom"
                    placeholder="John"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                  cols="12"
                  md="6"
              >
                <VTextField
                    v-model="accountDataLocal.nom"
                    label="Nom"
                    placeholder="Doe"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                  cols="12"
                  md="6"
              >
                <VTextField
                    v-model="accountDataLocal.email"
                    label="E-mail"
                    placeholder="johndoe@gmail.com"
                    type="email"
                />
              </VCol>

              <!-- 👉 Organization -->
              <VCol
                  cols="12"
                  md="6"
              >
                <VTextField
                    v-model="accountDataLocal.numero_etudiant"
                    label="Numéro étudiant"
                    placeholder="0987478J"
                />
              </VCol>


              <!-- 👉 Form Actions -->
              <VCol
                  class="d-flex flex-wrap gap-4"
                  cols="12"
              >


                <VBtn @click="saveProfile">Sauvegarder</VBtn>

                <VBtn
                    color="secondary"
                    type="reset"
                    variant="tonal"
                    @click.prevent="resetForm"
                >
                  Réinitialiser
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Deactivate Account -->
      <VCard title="Désactiver mon compte 🙁">
        <VCardText>
          <div>
            <VCheckbox
                v-model="isAccountDeactivated"
                label="Je confirme la désactivation de mon compte"
            />
          </div>

          <VBtn
              :disabled="!isAccountDeactivated"
              class="mt-3"
              color="error"
              @click="deleteAccount"
          >
            Desactiver
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
