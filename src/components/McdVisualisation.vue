<template>
  <div ref="mcdContainer" style="overflow-x: auto;"></div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import * as d3 from 'd3';

const mcdContainer = ref(null);

onMounted(async () => {
  const {data: mcdData} = await axios.get('http://localhost:3000/api/mcd');
  drawMcd(mcdData);
});

function drawMcd(mcdData) {
  const width = 800;
  const tableHeight = 100;
  const svg = d3.select(mcdContainer.value).append('svg')
      .attr('width', width)
      .attr('height', mcdData.database.tables.length * (tableHeight + 20));

  const tables = svg.selectAll('.table')
      .data(mcdData.database.tables)
      .enter().append('g')
      .attr('class', 'table')
      .attr('transform', (d, i) => `translate(10, ${i * (tableHeight + 20)})`);

  // Dessiner les rectangles pour chaque table
  tables.append('rect')
      .attr('width', width - 20)
      .attr('height', tableHeight)
      .attr('fill', 'lightblue')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);

  // Ajouter le nom de chaque table
  tables.append('text')
      .attr('x', 5)
      .attr('y', 20)
      .text(d => d.name)
      .attr('font-weight', 'bold')
      .attr('fill', 'darkblue');

  // Ajouter les colonnes pour chaque table
  tables.each(function (tableData, i) {
    d3.select(this).selectAll('.column')
        .data(tableData.columns)
        .enter()
        .append('text')
        .attr('x', 10)
        .attr('y', (d, i) => 40 + i * 20)
        .text(d => `${d.name} (${d.type}${d.primaryKey ? ', PK' : ''}${d.autoIncrement ? ', AI' : ''})`)
        .attr('fill', 'black');
  });
}
</script>
