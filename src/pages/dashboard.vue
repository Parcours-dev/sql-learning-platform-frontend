<script setup>
import AnalyticsCongratulations from '@/views/dashboard/AnalyticsCongratulations.vue'

// Images
import chart from '@images/cards/chart-success.png'
import CardStaticTopChapter from "@core/components/cards/CardStaticTopChapter.vue";
import AnalyticsResponseDay from "@/views/dashboard/AnalyticsResponseDay.vue";
import Analytics100Chapter from "@/views/dashboard/Analytics100Chapter.vue";
import AnalyticsLastParticipation from "@/views/dashboard/AnalyticsLastParticipation.vue";
import AnalyticsRankingStudent from "@/views/dashboard/AnalyticsRankingStudent.vue";
import AnalyticsNews from "@/views/dashboard/AnalyticsNews.vue";
import {computed} from "vue";
import {useStore} from 'vuex';



const store = useStore();
const isAdmin = computed(() => {
  console.log("Current user role:", store.state.userRole);  // Ce log doit afficher 'Admin' pour un admin
  return store.state.userRole === "Admin";
});

</script>

<template>
  <VRow>
    <VCol
        cols="12"
        md="8"
    >
      <AnalyticsCongratulations/>
    </VCol>

    <VCol
        cols="12"
        sm="4"
    >
      <VRow>
        <VCol
            cols="12"
            md="6"
        >
          <CardStaticTopStudent v-if="isAdmin"
              v-bind="{
            image: chart,
            }"
          />
        </VCol>

        <VCol
            cols="12"
            md="6"
        >
          <CardStaticBadStudent v-if="isAdmin"
              v-bind="{
            image: chart,
            }"
          />
        </VCol>
      </VRow>
    </VCol>

    <VCol
        cols="12"
        md="8"
        order="2"
        order-md="1"
    >
      <AnalyticsResponseDay v-if="isAdmin"/>
    </VCol>

    <VCol
        cols="12"
        md="4"
        order="1"
        order-md="2"
        sm="8"
    >
      <VRow>
        <VCol
            cols="12"
            sm="6"
        >
          <CardStaticBadChapter v-if="isAdmin"
              v-bind=" {
              title: 'Payments',
              image: chart,
              stats: '$2,468',
              change: -14.82,
            }"
          />
        </VCol>


        <VCol
            cols="12"
            sm="6"
        >
          <CardStaticTopChapter v-if="isAdmin"
              v-bind="{
            image: chart,
            }"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol
            cols="12"
            sm="12"
        >
          <AnalyticsNews v-if="isAdmin"/>
        </VCol>
      </VRow>
    </VCol>

    <VCol
        cols="12"
        md="4"
        order="3"
        sm="6"
    >
      <Analytics100Chapter v-if="isAdmin"/>
    </VCol>

    <VCol
        cols="12"
        md="4"
        order="3"
        sm="6"
    >
      <AnalyticsRankingStudent v-if="isAdmin"/>
    </VCol>

    <VCol
        cols="12"
        md="4"
        order="3"
        sm="6"
    >
      <AnalyticsLastParticipation v-if="isAdmin"/>
    </VCol>
  </VRow>
</template>
