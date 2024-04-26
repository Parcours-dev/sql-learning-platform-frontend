<script setup>
import { onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';
import dayjs from 'dayjs';

// Options de configuration du graphique
const chartOptions = ref({
  chart: {
    id: 'realtime',
    type: 'line',
    height: 350,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      },
      autoSelected: 'zoom' // Par défaut, sélectionner l'outil de zoom
    },
    zoom: {
      enabled: true,
      type: 'x', // Permet le zoom et le panoramique sur l'axe des x
      autoScaleYaxis: true // Ajuste automatiquement l'axe des y lors du zoom
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 10, // Contrôle le nombre de ticks sur l'axe des x
    labels: {
      formatter: function (value) {
        return dayjs(new Date(value)).format('DD-MM');
      }
    }
  },
  yaxis: {
    floating: false
  },
  legend: {
    show: true
  }
});

// Données de série pour le graphique
const series = ref([{
  data: []
}]);

onMounted(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/daily-correct-answers');
      console.log("Data fetched:", response.data);
      const seriesData = response.data.map(item => ({
        x: new Date(item.date).getTime(), // Assurez-vous que les dates sont converties correctement
        y: item.correctAnswers
      }));
      series.value[0].data = seriesData;
      chartOptions.value.xaxis.min = Math.min(...seriesData.map(item => item.x)); // Définit le min de l'axe x
      chartOptions.value.xaxis.max = Math.max(...seriesData.map(item => item.x)); // Définit le max de l'axe x
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
});
</script>
<template>
  <VCard>
    <v-card-item>
      <v-card-title>Nombre de bonnes réponses par jour</v-card-title>
      <div id="realtime-chart">
        <VueApexCharts :options="chartOptions" :series="series" height="350" type="line"/>
      </div>
    </v-card-item>
  </VCard>
</template>
