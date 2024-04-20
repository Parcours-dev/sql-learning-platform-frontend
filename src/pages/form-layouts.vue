<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue';
import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue';
import AccountSettingsSecurity from '@/views/pages/account-settings/AccountSettingsSecurity.vue';
import AddChapitre from "@/views/pages/form-layouts/AddChapitre.vue";
import AddExercice from "@/views/pages/form-layouts/AddExercices.vue";

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.params.tab || 'chapitre');

const tabs = [
  { title: 'Chapitre', icon: 'bx-user', tab: 'chapitre' },
  { title: 'Exercice', icon: 'bx-lock-open', tab: 'exercice' },
  // Uncomment if Notifications are added back
  // { title: 'Notifications', icon: 'bx-bell', tab: 'notification' },
];

// Setup redirection to default tab if no tab is specified
onMounted(() => {
  if (!route.params.tab) {
    router.replace({ query: { tab: 'chapitre' } });
  }
});

// Listen for tab changes
watch(activeTab, (newTab) => {
  router.push({ query: { tab: newTab } });
});
</script>
<template>
  <div>
    <VTabs v-model="activeTab" show-arrows>
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
      <VWindowItem value="chapitre">
          <AddChapitre/>
      </VWindowItem>
      <VWindowItem value="exercice">
        <AddExercice/>
      </VWindowItem>
      <VWindowItem value="notification">
        <AccountSettingsNotification />
      </VWindowItem>
    </VWindow>
  </div>
</template>
