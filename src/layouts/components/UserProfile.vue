<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
</script>

<template>
  <VBadge
      bordered
      color="success"
      dot
      location="bottom right"
      offset-x="3"
      offset-y="3"
  >
    <VAvatar
        class="cursor-pointer"
        color="primary"
        variant="tonal"
    >
      <VImg :src="avatar1"/>

      <!-- SECTION Menu -->
      <VMenu
          activator="parent"
          location="bottom end"
          offset="14px"
          width="230"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                    color="success"
                    dot
                    location="bottom right"
                    offset-x="3"
                    offset-y="3"
                >
                  <VAvatar
                      color="primary"
                      variant="tonal"
                  >
                    <VImg :src="avatar1"/>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              Nom Prenom
            </VListItemTitle>
            <VListItemSubtitle>Rôle admin/user</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2"/>

          <!-- 👉 Profile -->
          <VListItem link to="/account-settings">
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="bx-user"
                  size="22"
              />
            </template>

            <VListItemTitle>Mon Profil</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link to="/account-settings">
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="bx-cog"
                  size="22"
              />
            </template>

            <VListItemTitle>Paramètres</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-dollar"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem> -->

          <!-- 👉 FAQ
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-help-circle"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>-->

          <!-- Divider -->
          <VDivider class="my-2"/>

          <!-- 👉 Logout -->
          <VListItem to="/login">
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="bx-log-out"
                  size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
