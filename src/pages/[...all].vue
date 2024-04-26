<script setup>
import ErrorHeader from '@/components/ErrorHeader.vue'
import misc404 from '@images/pages/404.png'
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
        error-description="On ne trouve pas la page que tu souhaites afficher"
        error-title="Page introuvable ⚠️"
    />

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
          :max-width="500"
          :src="misc404"
          alt="Coming Soon"
          class="mx-auto"
      />
      <VBtn
          class="mt-10"
          to="/dashboard"
      >
        Retour à l'accueil
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
