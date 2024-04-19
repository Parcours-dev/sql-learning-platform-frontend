<script setup>
//import DemoFormLayoutHorizontalForm from '@/views/pages/form-layouts/DemoFormLayoutHorizontalForm.vue'
import DemoFormLayoutHorizontalFormWithIcons from '@/views/pages/form-layouts/DemoFormLayoutHorizontalFormWithIcons.vue'
import DemoFormLayoutMultipleColumn from '@/views/pages/form-layouts/DemoFormLayoutMultipleColumn.vue'
import DemoFormLayoutVerticalForm from '@/views/pages/form-layouts/DemoFormLayoutVerticalForm.vue'
import DemoFormLayoutVerticalFormWithIcons from '@/views/pages/form-layouts/DemoFormLayoutVerticalFormWithIcons.vue'
import CardNavigation from '@/views/pages/cards/card-basic/CardNavigation.vue'
import AddChapitre from "@/views/pages/form-layouts/AddChapitre.vue";
import AddExercices from "@/views/pages/form-layouts/AddExercices.vue";

//DemoFormLayoutHorizontalForm.vue
</script>

<template>
  <div>
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <!-- 👉 Horizontal Form -->
        <VCard title="Créer un chapitre">
          <VCardText>
            <AddChapitre/>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
          cols="12"
          md="6"
      >
        <!-- 👉 Horizontal Form -->
        <VCard title="Ajouter un Exercice">
          <VCardText>
            <AddExercices/>
          </VCardText>
        </VCard>
      </VCol>


      <VCol
        cols="12"
        md="6"
      >
        <!-- 👉 Horizontal Form with Icons -->
        <VCard title="Horizontal Form with Icons">
          <VCardText>
            <DemoFormLayoutHorizontalFormWithIcons />
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <!-- 👉 Vertical Form -->
        <VCard title="Vertical Form">
          <VCardText>
            <DemoFormLayoutVerticalForm />
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <!-- 👉 Vertical Form with Icons -->
        <VCard title="Vertical Form with Icons">
          <VCardText>
            <DemoFormLayoutVerticalFormWithIcons />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <!-- 👉 Multiple Column -->
        <VCard title="Multiple Column">
          <VCardText>
            <DemoFormLayoutMultipleColumn />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
