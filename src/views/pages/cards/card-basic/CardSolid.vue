<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar8 from '@images/avatars/avatar-8.png'

const solidCardData = [
  {
    cardBg: '#16B1FF',
    title: 'Twitter Card',
    icon: 'bxl-twitter',
    text: '"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."',
    avatarImg: avatar4,
    avatarName: 'Mary Vaughn',
    likes: '1.2k',
    share: '80',
  },
  {
    cardBg: '#3B5998',
    title: 'Facebook Card',
    icon: 'bxl-facebook',
    text: 'You\'ve read about the importance of being courageous, rebellious and imaginative. These are all vital ingredients.',
    avatarImg: avatar1,
    avatarName: 'Eugene Clarke',
    likes: '3.2k',
    share: '49',
  },
  {
    cardBg: '#007BB6',
    title: 'Linkedin Card',
    icon: 'bxl-linkedin',
    text: 'With the Internet spreading like wildfire and reaching every part of our daily life, more and more traffic is directed.',
    avatarImg: avatar8,
    avatarName: 'Anne Burke1',
    likes: '1.2k',
    share: '80',
  },
]
</script>

<template>
  <VRow>
    <VCol
        v-for="data in solidCardData"
        :key="data.icon"
        cols="12"
        lg="4"
        md="6"
    >
      <VCard :color="data.cardBg">
        <VCardItem>
          <template #prepend>
            <VIcon
                :icon="data.icon"
                color="white"
                size="1.9rem"
            />
          </template>
          <VCardTitle class="text-white">
            {{ data.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <p class="clamp-text text-white mb-0">
            {{ data.text }}
          </p>
        </VCardText>

        <VCardText class="d-flex justify-space-between align-center flex-wrap">
          <div class="text-no-wrap">
            <VAvatar
                :image="data.avatarImg"
                size="34"
            />
            <span class="text-white ms-2">{{ data.avatarName }}</span>
          </div>

          <div class="d-flex align-center">
            <IconBtn
                class="me-1"
                color="white"
                icon="bx-heart"
            />
            <span class="text-subtitle-2 text-white me-4">{{ data.likes }}</span>

            <IconBtn
                class="me-1"
                color="white"
                icon="bx-share-alt"
            />
            <span class="text-subtitle-2 text-white">{{ data.share }}</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
