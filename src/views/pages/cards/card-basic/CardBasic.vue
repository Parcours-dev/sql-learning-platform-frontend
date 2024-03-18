<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import eCommerce2 from '@images/eCommerce/2.png'
import pages1 from '@images/pages/1.png'
import pages2 from '@images/pages/2.png'
import pages3 from '@images/pages/3.png'
import pages5 from '@images/pages/5.jpg'
import pages6 from '@images/pages/6.jpg'

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
]

const isCardDetailsVisible = ref(false)





import { ref } from 'vue'

const cards = ref([
  { title: 'Chapitre 1 ' },
  { title: 'Chapitre 2' },
  { title: 'Chapitre 3' },
  { title: 'Chapitre 4' },
])

const hoveredCard = ref(null)





</script>

<template>
  <VRow>
    <!-- 👉 Influencing The Influencer -->
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <VCard>
        <VImg
          :src="pages1"
          cover
        />

        <VCardItem>
          <VCardTitle>Influencing The Influencer</VCardTitle>
        </VCardItem>

        <VCardText>
          Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago.
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Robert Meyer -->
    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <VCard>
        <VImg :src="pages2" />

        <VCardText class="position-relative">
          <!-- User Avatar -->
          <VAvatar
            size="75"
            class="avatar-center"
            :image="avatar1"
          />

          <!-- Title, Subtitle & Action Button -->
          <div class="d-flex justify-space-between flex-wrap pt-8">
            <div class="me-2 mb-2">
              <VCardTitle class="pa-0">
                Robert Meyer
              </VCardTitle>
              <VCardSubtitle class="text-caption pa-0">
                London, UK
              </VCardSubtitle>
            </div>
            <VBtn>send request</VBtn>
          </div>

          <!--  Mutual Friends -->
          <div class="d-flex justify-space-between align-center mt-4">
            <span class="font-weight-medium">18 mutual friends</span>

            <div class="v-avatar-group">
              <VAvatar
                v-for="avatar in avatars"
                :key="avatar"
                :image="avatar"
                size="40"
              />
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Popular Uses Of The Internet -->
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <VCard>
        <VImg
          :src="pages3"
          cover
          max-height="280"
        />

        <VCardItem>
          <VCardTitle>Popular Uses Of The Internet</VCardTitle>
        </VCardItem>

        <VCardText>
          <div class="mb-4">
            Although cards can support multiple actions, UI controls, and an overflow menu.
          </div>

          <VBtn
            variant="text"
            density="comfortable"
            @click="isCardDetailsVisible = !isCardDetailsVisible"
          >
            Details
          </VBtn>
        </VCardText>

        <VExpandTransition>
          <div v-show="isCardDetailsVisible">
            <VDivider />
            <VCardText>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </VCardText>
          </div>
        </VExpandTransition>
      </VCard>
    </VCol>

    <!-- 👉 Apple iPhone 11 Pro -->
    <VCol
      sm="6"
      cols="12"
    >
      <VCard>
        <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
          <div class="ma-auto pa-5">
            <VImg
              width="137"
              height="176"
              :src="eCommerce2"
            />
          </div>

          <VDivider :vertical="$vuetify.display.mdAndUp" />

          <div>
            <VCardItem>
              <VCardTitle>Apple iPhone 11 Pro</VCardTitle>
            </VCardItem>

            <VCardText>
              Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8″ display Apple A13 Bionic
            </VCardText>

            <VCardText class="text-subtitle-1">
              <span>Price :</span> <span class="font-weight-medium">$899</span>
            </VCardText>

            <VCardActions class="justify-space-between">
              <VBtn>
                <VIcon icon="bx-cart-add" />
                <span class="ms-2">Add to cart</span>
              </VBtn>

              <VBtn
                color="secondary"
                icon="bx-share-alt"
              />
            </VCardActions>
          </div>
        </div>
      </VCard>
    </VCol>

    <!-- 👉 Stump town Roasters. -->
    <VCol
      sm="6"
      cols="12"
    >
      <VCard>
        <div class="d-flex flex-column-reverse flex-md-row">
          <div>
            <VCardItem>
              <VCardTitle>Stumptown Roasters</VCardTitle>
            </VCardItem>

            <VCardText class="d-flex align-center flex-wrap text-body-1">
              <VRating
                :model-value="5"
                readonly
                class="me-3"
                density="compact"
              />
              <span>5 Star | 98 reviews</span>
            </VCardText>

            <VCardText>
              Before there was a United States of America, there were coffee houses, because how are you supposed to build.
            </VCardText>

            <VCardActions>
              <VBtn>Location</VBtn>
              <VBtn>Reviews</VBtn>
            </VCardActions>
          </div>

          <div class="ma-auto pa-5">
            <VImg
              :width="176"
              :src="pages5"
              class="rounded"
            />
          </div>
        </div>
      </VCard>
    </VCol>

    <!-- 👉 Apple Watch card -->
    <VCol
      lg="4"
      sm="6"
      cols="12"
    >
      <VCard>
        <VImg :src="pages6" />

        <VCardItem>
          <VCardTitle>Apple Watch</VCardTitle>
        </VCardItem>

        <VCardText>
          <p class="font-weight-medium text-base">
            $249.40
          </p>

          <p class="mb-0">
            3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost up to 4.5GHz
          </p>
        </VCardText>

        <VBtn
          block
          class="rounded-t-0"
        >
          Add to cart
        </VBtn>
      </VCard>
    </VCol>

    <!-- 👉 Lifetime Membership -->
    <VCol
      md="6"
      lg="8"
      cols="12"
    >
      <VCard>
        <VRow no-gutters>
          <VCol
            cols="12"
            sm="8"
            md="12"
            lg="7"
            order="2"
            order-lg="1"
          >
            <VCardItem>
              <VCardTitle>Lifetime Membership</VCardTitle>
            </VCardItem>

            <VCardText>
              Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men.
            </VCardText>

            <VCardText>
              <VDivider />
            </VCardText>

            <VCardText class="d-flex justify-center">
              <div class="me-auto pe-4">
                <p class="d-flex align-center mb-6">
                  <VIcon
                    color="primary"
                    icon="bx-lock-open"
                  />
                  <span class="ms-3">Full Access</span>
                </p>

                <p class="d-flex align-center mb-0">
                  <VIcon
                    color="primary"
                    icon="bx-user"
                  />
                  <span class="ms-3">15 Members</span>
                </p>
              </div>

              <VDivider
                v-if="$vuetify.display.smAndUp"
                vertical
                inset
              />

              <div class="ms-auto ps-4">
                <p class="d-flex align-center mb-6">
                  <VIcon
                    color="primary"
                    icon="bx-star"
                  />
                  <span class="ms-3">Access all Features</span>
                </p>

                <p class="d-flex align-center mb-0">
                  <VIcon
                    color="primary"
                    icon="bx-trending-up"
                  />
                  <span class="ms-3">Lifetime Free Update</span>
                </p>
              </div>
            </VCardText>
          </VCol>

          <VCol
            cols="12"
            sm="4"
            md="12"
            lg="5"
            order="1"
            order-lg="2"
            class="member-pricing-bg text-center"
          >
            <div class="membership-pricing d-flex flex-column align-center py-14 h-100 justify-center">
              <p class="mb-5">
                <sub class="text-h5">$</sub>
                <sup class="text-h2 font-weight-medium">899</sup>
                <sub class="text-h5">USD</sub>
              </p>

              <p class="text-sm">
                5 Tips For Offshore <br> Software Development
              </p>

              <VBtn class="mt-8">
                Contact Now
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCard>
    </VCol>

    <!-- 👉 Influencing The Influencer -->
    <VCol
      cols="12"
      lg="4"
      md="6"
    >
      <VCard title="Influencing The Influencer">
        <VCardText>
          Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend hours in front of their desktops, while delivery people scan bar codes with handhelds and workers in the field stay in touch.
        </VCardText>

        <VCardText>
          If you're in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here's a rundown of some of the best systems available.
        </VCardText>

        <VCardActions>
          <VBtn>Read More</VBtn>
        </VCardActions>
      </VCard>
    </VCol>

    <!-- 👉 The Best Answers -->
    <VCol
      cols="12"
      lg="4"
      md="6"
    >
      <VCard title="The Best Answers">
        <VCardText class="d-flex align-center flex-wrap">
          <VRating
            :model-value="5"
            readonly
            density="compact"
            class="me-3"
          />
          <span class="text-subtitle-2">5 Star | 98 reviews</span>
        </VCardText>

        <VCardText>
          <p>
            If you are looking for a new way to promote your business that won't cost you more money, maybe printing is one of the options you won't resist.
          </p>

          <p class="mb-0">
            become fast, easy and simple. If you want your promotional material to be an eye-catching
          </p>
        </VCardText>

        <VCardActions>
          <VBtn>Location</VBtn>
          <VBtn>Reviews</VBtn>
        </VCardActions>
      </VCard>
    </VCol>

    <!-- 👉 Support -->
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <VCard class="text-center">
        <VCardText class="d-flex flex-column justify-center align-center">
          <VAvatar
            color="primary"
            variant="tonal"
            size="50"
            class="mb-4"
          >
            <VIcon
              size="2rem"
              icon="bx-help-circle"
            />
          </VAvatar>

          <h6 class="text-h6">
            Support
          </h6>
        </VCardText>

        <VCardText>
          <p>
            According to us blisters are a very common thing and we come across them very often in our daily lives. It is a very common occurrence like cold or fever depending upon your lifestyle.
          </p>
        </VCardText>
        <VCardText>
          <VBtn variant="elevated">
            Contact Now
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>




  <div class="container">
    <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        @mouseover="hoveredCard = index"
        @mouseout="hoveredCard = null"
    >
      <h3 class="title">{{ card.title }}</h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar" :class="{ 'is-hovered': hoveredCard === index }"></div>
      </div>
      <div class="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle class="stroke" :class="{ 'is-hovered': hoveredCard === index }" cx="60" cy="60" r="50"/>
        </svg>
      </div>
    </div>
  </div>



</template>










<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}

// membership pricing
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}

.membership-pricing {
  sup {
    inset-block-start: 9px;
  }
}





body {
  background-color: #100e17;
  font-family: 'Open Sans', sans-serif;
}

.container {
  height: 300px;
  width: 600px;
  margin-top: 60px; /* Remplacez 'top' par 'margin-top' */
  display: flex;
  justify-content: center; /* Centre les cartes horizontalement */
}

.card {
  display: flex;
  height: 280px;
  width: 200px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
}

.card:not(:first-child) {
  margin-left: -50px;
}

.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}

.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}

.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}

.bar {
  position: absolute;
  top: 100px;
  left: 20px;
  height: 5px;
  width: 150px;
}

.emptybar {
  background-color: #2e3033;
  width: 100%;
  height: 100%;
}

.filledbar {
  position: absolute;
  top: 0px;
  z-index: 3;
  width: 0px;
  height: 100%;
  background: rgb(0,154,217);
  background: linear-gradient(90deg, rgba(0,154,217,1) 0%, rgba(217,147,0,1) 65%, rgba(255,186,0,1) 100%);
  transition: 0.6s ease-out;
}

.card:hover .filledbar {
  width: 120px;
  transition: 0.4s ease-out;
}

.circle {
  position: absolute;
  top: 150px;
  left: calc(50% - 60px);
}

.stroke {
  stroke: white;
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  transition: 0.6s ease-out;
}

svg {
  fill: #17141d;
  stroke-width: 2px;
}

.card:hover .stroke {
  stroke-dashoffset: 100;
  transition: 0.6s ease-out;
}





</style>
