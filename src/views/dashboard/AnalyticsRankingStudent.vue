<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userRanking = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/user-ranking');
    userRanking.value = response.data;
  } catch (error) {
    console.error("Error fetching user ranking:", error);
  }
});



// Fonction pour déterminer l'emoji en fonction du rang
function rankEmoji(rank) {
  if (rank === 1) {
    return '🥇'; // Médaille d'or
  } else if (rank === 2) {
    return '🥈'; // Médaille d'argent
  } else if (rank === 3) {
    return '🥉'; // Médaille de bronze
  } else {
    return ''; // Pas d'émoji pour les autres rangs
  }
}
</script>

<template>
  <VCard>
    <VCardTitle>Classement des élèves</VCardTitle>
    <VCardBody>
      <VRow>
        <VCol>
          <VTable height="430" fixed-header>
            <thead>
            <tr>
              <th>Rang</th>
              <th>Nom Complet</th>
              <th>Nb Bonnes Réponses</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in userRanking" :key="user.UserID">
              <td class="text-center">{{ user.Rang }} {{ rankEmoji(user.Rang) }}</td>
              <td class="text-center">{{ user.NomComplet }}</td>
              <td class="text-center">{{ user.BonnesReponses }}</td>
            </tr>
            </tbody>
          </VTable>
          </VCol>
      </VRow>
    </VCardBody>
    </VCard>

</template>




<style>
.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}
</style>
