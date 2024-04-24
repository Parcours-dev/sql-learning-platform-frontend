<script setup>
import AnalyticsCongratulations from '@/views/dashboard/AnalyticsCongratulations.vue'
import AnalyticsFinanceTabs from '@/views/dashboard/AnalyticsFinanceTab.vue'
import AnalyticsOrderStatistics from '@/views/dashboard/AnalyticsOrderStatistics.vue'
import AnalyticsProfitReport from '@/views/dashboard/AnalyticsProfitReport.vue'
import AnalyticsTotalRevenue from '@/views/dashboard/AnalyticsTotalRevenue.vue'
import AnalyticsTransactions from '@/views/dashboard/AnalyticsTransactions.vue'

// Images
import chart from '@images/cards/chart-success.png'
import card from '@images/cards/credit-card-primary.png'
import paypal from '@images/cards/paypal-error.png'
import wallet from '@images/cards/wallet-info.png'
import success from "@images/cards/success.png";
import CardStaticTopChapter from "@core/components/cards/CardStaticTopChapter.vue";
import AnalyticsResponseDay from "@/views/dashboard/AnalyticsResponseDay.vue";
import Analytics100Chapter from "@/views/dashboard/Analytics100Chapter.vue";
</script>

<template>
  <VRow>
    <VCol
        cols="12"
        md="8"
    >
      <AnalyticsCongratulations />
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
          <CardStaticTopStudent
              v-bind="{
            image: chart,
            }"
          />
        </VCol>

        <VCol
            cols="12"
            md="6"
        >
          <CardStaticBadStudent
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
      <AnalyticsResponseDay/>
    </VCol>

    <VCol
        cols="12"
        sm="8"
        md="4"
        order="1"
        order-md="2"
    >
      <VRow>
        <VCol
            cols="12"
            sm="6"
        >
          <CardStaticBadChapter
              v-bind=" {
              title: 'Payments',
              image: paypal,
              stats: '$2,468',
              change: -14.82,
            }"
          />
        </VCol>


        <VCol
            cols="12"
            sm="6"
        >
          <CardStaticTopChapter
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
          <AnalyticsProfitReport />
        </VCol>
      </VRow>
    </VCol>

    <VCol
        cols="12"
        md="4"
        sm="6"
        order="3"
    >
      <Analytics100Chapter />
    </VCol>

    <VCol
        cols="12"
        md="4"
        sm="6"
        order="3"
    >
      <AnalyticsFinanceTabs />
    </VCol>

    <VCol
        cols="12"
        md="4"
        sm="6"
        order="3"
    >
      <AnalyticsTransactions />
    </VCol>
  </VRow>
</template>
