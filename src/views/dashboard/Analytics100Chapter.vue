<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';

const series = ref([]);
const chartOptions = ref({
  chart: {
    height: 390,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: '30%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: true,
        },
        value: {
          show: true,
        }
      },
      barLabels: {
        enabled: true,
        useSeriesColors: true,
        margin: 8,
        fontSize: '16px',
        formatter: function (seriesName, opts) {
          const label = chartOptions.value.labels[opts.seriesIndex];
          return label + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
        },
      },
    }
  },
  colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
  labels: [], // Les labels seront remplis avec les noms des chapitres
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        show: false
      }
    }
  }]
});
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/chapter-completion');
    series.value = response.data.map(item => item.completionPercentage);
    chartOptions.value.labels = response.data.map(item => "Chapitre " + item.chapterId); // Change "chapterID" to "chapterId"

  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<template>
  <VCard>
    <v-card-title class="text-wrap">Complétion des Chapitres</v-card-title>
    <v-card-text>
      <p class="text-h8 text-wrap mb-0">
        Part des questions répondues correctement pour chaque chapitre par chaque étudiant
      </p>
    </v-card-text>
    <div id="chart">
      <VueApexCharts :options="chartOptions" :series="series" height="390" type="radialBar"/>
    </div>
  </VCard>
</template>