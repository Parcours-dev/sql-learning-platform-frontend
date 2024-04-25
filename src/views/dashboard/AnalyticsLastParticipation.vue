<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';

const lastGoodResponses = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/last-good-responses');
    lastGoodResponses.value = response.data.map(item => {
      item.formattedDate = dayjs(item.LastGoodResponse).format('DD-MM-YY');
      return item;
    });
    console.log("Data fetched:", lastGoodResponses.value)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>
<template>
  <VCard title="Dernières bonnes réponses 📚">
    <VCardText>
      <VList class="card-list">
        <VListItem v-for="response in lastGoodResponses" :key="response.UserID">

          <VListItemSubtitle class="text-disabled mb-1">
            {{ response.Prenom }} {{ response.Nom }}
          </VListItemSubtitle>
          <VListItemTitle class="text-wrap">
            {{ response.QuestionTitle }}
          </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="me-1">{{ response.formattedDate }}</span>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
