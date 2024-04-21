<script setup>
import { ref, computed, watch, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import DemoFormLayoutHorizontalFormWithIcons from "@/views/pages/form-layouts/DemoFormLayoutHorizontalFormWithIcons.vue";
import DemoSimpleTableFixedHeader from "@/views/pages/tables/DemoSimpleTableFixedHeader.vue";
import ConfettiExplosion from "vue-confetti-explosion";

const store = useStore();
const exercices = computed(() => store.state.exercices);
const chapitreSelectionne = ref(null);
const navigationTab = ref(null);
const employes = ref([]);
const showConfetti = ref(false);
const tentativesIncorrectes = reactive({});
const indicesParQuestion = reactive({});
const exerciceMaxReussi = ref(null);
const columnNames = ref({}); // Define columnNames as a reactive reference
const selectedTables = ref([]);

onMounted(async () => {
  await chargerProgression();
  await fetchColumnNames();

});

const chargerProgression = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/progression`, { withCredentials: true });
    if (response.data.length > 0 && response.data[0].QuestionID !== null) {
      exerciceMaxReussi.value = response.data[0].QuestionID;
    } else {
      console.log("Aucune progression trouvée ou l'utilisateur n'a pas encore complété d'exercice.");
      exerciceMaxReussi.value = null; // Handle as needed for your app logic
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la progression:", error);
  }
};

const fetchColumnNames = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/columns');
    columnNames.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des noms de colonnes:', error);
  }
};

const submitQuery = async (questionId, userQuery) => {
  try {
    const response = await axios.post('http://localhost:3000/verify-query', {
      QuestionID: questionId,
      UserQuery: userQuery
    }, { withCredentials: true });

    if (response.data.isCorrect) {
      showConfetti.value = true;
      setTimeout(() => { showConfetti.value = false; }, 5000);
      tentativesIncorrectes[questionId] = 0;
      const indexExerciceActuel = exercices.value.findIndex(ex => ex.id === questionId);
      const indexExerciceMaxReussi = exercices.value.findIndex(ex => ex.id === exerciceMaxReussi.value);
      if (indexExerciceActuel > indexExerciceMaxReussi) {
        exerciceMaxReussi.value = questionId;
      }
    } else {
      alert('Désolé, votre réponse est incorrecte. Réessayez !');
      tentativesIncorrectes[questionId] = (tentativesIncorrectes[questionId] || 0) + 1;
      if (tentativesIncorrectes[questionId] >= 3) {
        obtenirIndice(questionId);
      }
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la requête:', error);
  }
};

const obtenirIndice = async (questionId) => {
  try {
    const response = await axios.get(`http://localhost:3000/questions/${questionId}/indice`, { withCredentials: true });
    indicesParQuestion[questionId] = response.data.indice;
  } catch (error) {
    console.error("Erreur lors de l'obtention de l'indice :", error);
  }
};

const estExerciceDisponible = (exercice) => {
  const indexExerciceActuel = exercices.value.findIndex(ex => ex.id === exercice.id);
  const indexExerciceMaxReussi = exercices.value.findIndex(ex => ex.id === exerciceMaxReussi.value);
  return indexExerciceActuel <= indexExerciceMaxReussi + 1;
};

watch(chapitreSelectionne, (nouveauChapitreId) => {
  if (nouveauChapitreId) {
    store.dispatch('chargerExercices', nouveauChapitreId);
  }
});

</script>


<template>
  <ConfettiExplosion v-if="showConfetti" :duration="7000" :force="0.5" :stageHeight="2000" :stageWidth="2000" :particleCount="300"/>
  <VRow>
    <VCol md="12" cols="12">
      <VCard>
        <VTabs v-model="navigationTab">
          <!-- Utilisez estExerciceDisponible pour conditionner la classe de grisé des exercices -->
          <VTab
              v-for="exercice in exercices"
              :key="exercice.id"
              :value="exercice.id"
              :class="{ 'grey--text text--lighten-1': !estExerciceDisponible(exercice), 'black--text': estExerciceDisponible(exercice) }"
          >
            {{ exercice.titre }}
          </VTab>
        </VTabs>

        <VWindow v-model="navigationTab">
          <VWindowItem
              v-for="exercice in exercices"
              :key="exercice.id"
              :value="exercice.id"
          >
            <VCardTitle>{{ exercice.titre }}</VCardTitle>
            <VCardText>{{ exercice.description }}</VCardText>
            <VCard title="Réponse" v-if="estExerciceDisponible(exercice)">
              <VCardText>
                <!-- Le formulaire est affiché seulement si l'exercice est disponible -->
                <DemoFormLayoutHorizontalFormWithIcons @submit="submitQuery(exercice.id, $event)" :indice="indicesParQuestion[exercice.id]" />
              </VCardText>
            </VCard>
            <div v-else>
              <VCardText>Cet exercice n'est pas encore disponible. Résous le précédent et reviens ici 💪🏼</VCardText>
            </div>
          </VWindowItem>
        </VWindow>
        <VDivider/>

        <v-row>
          <v-col cols="12" md="12" offset-md="0">
            <v-card>
              <v-card-title>Noms des tables et colonnes</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(columns, table) in columnNames" :key="table">
                      <v-list-item-content>
                        <v-list-item-title>
                          <strong>{{ table }}</strong>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Colonnes : {{ columns.join(', ') }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </VCard>
    </VCol>
  </VRow>
</template>
