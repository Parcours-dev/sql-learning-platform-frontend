<script setup>
import {useRoute} from 'vue-router'
import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue'
import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue'
import AccountSettingsSecurity from '@/views/pages/account-settings/AccountSettingsSecurity.vue'

const route = useRoute()
const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  {
    title: 'Compte',
    icon: 'bx-user',
    tab: 'account',
  },
  {
    title: 'Sécurité',
    icon: 'bx-lock-open',
    tab: 'security',
  },
  /*{
    title: 'Notifications',
    icon: 'bx-bell',
    tab: 'notification',
  },*/
]
</script>

<template>
  <div>
    <VTabs
        v-model="activeTab"
        show-arrows
    >
      <VTab
          v-for="item in tabs"
          :key="item.icon"
          :value="item.tab"
      >
        <VIcon
            :icon="item.icon"
            size="20"
            start
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider/>

    <VWindow
        v-model="activeTab"
        class="mt-5 disable-tab-transition"
    >
      <!-- Account -->
      <VWindowItem value="account">
        <AccountSettingsAccount/>
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecurity/>
      </VWindowItem>

      <!-- Notification -->
      <VWindowItem value="notification">
        <AccountSettingsNotification/>
      </VWindowItem>
    </VWindow>
  </div>
</template>
