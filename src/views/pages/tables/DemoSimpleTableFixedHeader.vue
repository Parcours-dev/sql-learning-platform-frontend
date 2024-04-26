<script setup>
import {defineProps} from 'vue';

// Accepter les données des employés comme prop
const props = defineProps({
  employes: Array
});
</script>


<template>
  <VTable fixed-header height="500">
    <thead>
    <tr>
      <th>Nom</th>
      <th>Salaire</th>
      <th>DepartementID</th>
      <th>ManagerID</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="employe in props.employes" :key="employe.EmployeID">
      <td>{{ employe.Nom }}</td>
      <td class="text-center">{{ employe.Salaire }}</td>
      <td class="text-center">{{ employe.DepartementID }}</td>
      <td class="text-center">{{ employe.ManagerID }}</td>
    </tr>
    </tbody>
  </VTable>
</template>
