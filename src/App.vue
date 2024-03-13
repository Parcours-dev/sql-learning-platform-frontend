<script setup>
import { useTheme } from 'vuetify'
//import UpgradeToPro from '@/components/UpgradeToPro.vue'
import { hexToRgb } from '@layouts/utils'
import axios from "axios";
axios.defaults.withCredentials = true;

const { global } = useTheme()
</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <UpgradeToPro />
  </VApp>
</template>
