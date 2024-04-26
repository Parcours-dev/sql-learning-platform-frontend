<template>
  <VBtn
      class="product-upgrade-to-pro"
      color="error"
      href="https://themeselection.com/item/sneat-vuetify-vuejs-admin-template/"
      rel="noopener noreferrer"
      target="_blank"
  >
    Upgrade to Pro

    <VMenu
        :close-on-content-click="false"
        activator="parent"
        max-width="400px"
        offset="15"
        open-on-hover
        transition="slide-y-reverse-transition"
    >
      <VCard>
        <VImg
            src="https://cdn.jsdelivr.net/gh/themeselection/ts-assets/sneat/sneat-vuetify-vuejs-admin-template/banner/banner.png"/>
        <VCardTitle>Sneat - Vuetify Admin Template</VCardTitle>
        <VCardText>
          Sneat Admin is the most developer friendly & highly customisable Admin Dashboard Template based on Vuetify.
        </VCardText>
        <VCardText>Click on below button to explore PRO version.</VCardText>
        <VCardText>
          <VBtn
              class="me-4"
              href="https://themeselection.com/item/sneat-vuetify-vuejs-admin-template/?tab=details#details"
              rel="noopener noreferrer"
              target="_blank"
          >
            Demo
          </VBtn>
          <VBtn
              href="https://themeselection.com/item/sneat-vuetify-vuejs-admin-template/"
              rel="noopener noreferrer"
              target="_blank"
              variant="outlined"
          >
            Download
          </VBtn>
        </VCardText>
      </VCard>
    </VMenu>
  </VBtn>
</template>

<style lang="scss" scoped>
.product-upgrade-to-pro {
  position: fixed;

  // To keep upgrade to pro button on top of v-layout
  z-index: 999;
  inset-block-end: 5%;
  inset-inline-end: 79px;

  .v-application &.v-btn.v-btn--elevated {
    box-shadow: 0 1px 20px 1px rgb(var(--v-theme-error)) !important;

    &:hover {
      box-shadow: none !important;
    }
  }
}
</style>
