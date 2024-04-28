<script setup>
import {useTheme} from 'vuetify'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import {computed} from 'vue';
import {useStore} from 'vuex';
// Components
//import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

const vuetifyTheme = useTheme()
const store = useStore();
  const isAdmin = computed(() => {
    console.log("Current user role:", store.state.userRole);  // Ce log doit afficher 'Admin' pour un admin
    return store.state.userRole === "Admin";
  });

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
            class="ms-n3 d-lg-none"
            @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu"/>
        </IconBtn>

        <!-- 👉 Search -->
        <div
            class="d-flex align-center cursor-pointer"
            style="user-select: none;"
        >
          <!-- 👉 Search Trigger button -->
          <IconBtn>
            <VIcon icon="bx-search"/>
          </IconBtn>

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Recherche</span>
          </span>
        </div>

        <VSpacer/>

        <!--
        <IconBtn
          class="me-2"
          href="https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VIcon icon="bxl-github" />
        </IconBtn> -->

        <IconBtn class="me-2">
          <VIcon icon="bx-bell"/>
        </IconBtn>

        <NavbarThemeSwitcher class="me-2"/>

        <UserProfile/>
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
          :item="{
          title: 'Accueil',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />
      <VerticalNavLink
          :item="{
          title: 'Mon Compte',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      />

      <!-- 👉 Pages -->
      <VerticalNavSectionTitle
          :item="{
          heading: 'Pages',
        }"
      />
      <VerticalNavLink
          :item="{
          title: 'Login',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <VerticalNavLink
          :item="{
          title: 'Register',
          icon: 'bx-user-plus',
          to: '/register',
        }"
      />
      <VerticalNavLink
          :item="{
          title: 'Error',
          icon: 'bx-info-circle',
          to: '/no-existence',
        }"
      />

      <!-- 👉 Inerface Exos -->
      <VerticalNavSectionTitle
          :item="{
          heading: 'Les Exercices',
        }"
      />
      <VerticalNavLink
          :item="{
          title: 'Chapitres',
          icon: 'bx-award',
          to: '/cards',
        }"
      />
      <!--
      <VerticalNavLink
        :item="{
          title: 'Typography',
          icon: 'mdi-alpha-t-box-outline',
          to: '/typography',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Icons',
          icon: 'bx-show',
          to: '/icons',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Tables',
          icon: 'bx-table',
          to: '/tables',
        }"
      />-->

      <!-- On affiche que si c'est un admin -->
      <VerticalNavLink v-if="isAdmin"
                       :item="{
          title: 'Administation',
          icon: 'mdi-form-select',
          to: '/form-layouts',
        }"
      />

    </template>

    <!-- 👉 Pages -->
    <slot/>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer/>
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
