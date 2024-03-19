<script setup>
import { ref, onMounted } from 'vue';

const employees = ref([]); // Utilisez ref pour réagir aux changements de données

// Fonction pour charger les données des employés depuis l'API
const loadEmployees = async () => {
  try {
    const response = await fetch('http://localhost:3000/tables');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des employés');
    }
    const data = await response.json();
    employees.value = data; // Met à jour les données des employés
  } catch (error) {
    console.error("Erreur : ", error.message);
  }
};

// Utilisez onMounted pour charger les données lors du montage du composant
onMounted(loadEmployees);
</script>


<template>
  <VTable>
    <thead>
    <tr>
      <th>EmployeID</th>
      <th>Nom</th>
      <th>Salaire</th>
      <th>DepartementID</th>
      <th>ManagerID</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="employee in employees" :key="employee.EmployeID">
      <td class="text-center">{{ employee.EmployeID }}</td>
      <td>{{ employee.Nom }}</td>
      <td class="text-center">{{ employee.Salaire }}</td>
      <td class="text-center">{{ employee.DepartementID }}</td>
      <td class="text-center">{{ employee.ManagerID || 'N/A' }}</td>
    </tr>
    </tbody>
  </VTable>
</template>
