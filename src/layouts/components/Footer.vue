//
<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <VIcon
          class="mx-1"
          color="error"
          icon="bx-heart"
          size="1.25rem"
      />
      By <a
        class="text-primary ms-1"
        href="https://themeselection.com"
        rel="noopener noreferrer"
        target="_blank"
    >ThemeSelection</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
          href="https://themeselection.com/license/"
          target="noopener noreferrer"
      >License</a>
      <a
          href="https://themeselection.com/"
          target="noopener noreferrer"
      >More Themes</a>
      <a
          href="https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/documentation/"
          target="noopener noreferrer"
      >Documentation</a>
    </span>
  </div>
</template>
