<script setup>
import {onMounted, ref} from 'vue';
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
    },
    // Vous pouvez définir min et max ici pour contrôler la fenêtre de visualisation initiale
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
  // Initialiser le graphique avec des données existantes
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/daily-correct-answers');
      series.value[0].data = response.data.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.correctAnswers
      }));
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
