<script setup>
// Import des composants comme avant
import CardNavigation from '@/views/pages/cards/card-basic/CardNavigation.vue'
//import DemoFormLayoutHorizontalForm from '@/views/pages/form-layouts/DemoFormLayoutHorizontalForm.vue'

const cards = ref([
  {title: 'Chapitre 1324234243234 '},
  {title: 'Chapitre 2'},
  {title: 'Chapitre 3'},
  {title: 'Chapitre 4'},
])

const hoveredCard = ref(null)
</script>


<template>
  <div>
    <p class="text-2xl mb-6">
      EXERCICES - Découvres les exercices !
    </p>
    <!-- <CardBasic /> -->
  </div>

  <CardNavigation/>


  <!--
          <p class="text-2xl mt-14 mb-6 ">
            Solid Cards
          </p>

          <CardSolid />
          <McdVisualization />
        </div> -->
</template>
