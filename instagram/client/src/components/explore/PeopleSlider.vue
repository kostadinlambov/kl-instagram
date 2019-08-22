<template>
  <section class="slider-container">
    <div class="slider-card-wrapper">
      <slider-card
        v-for="user in users"
        v-bind:key="user.id"
        v-bind:user="user"
        @follow="(userId) => $emit('follow', userId)"
        @unfollow="(userId) => $emit('unfollow', userId)"
      ></slider-card>
    </div>
  </section>
</template>

<script>
import SliderCard from "./SliderCard";

export default {
  name: "people-slider",
  components: {
    SliderCard
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
/* .slider-container {
  max-width: 935px;
  width: 100%;
  padding: 40px 0 0;
  margin: auto;
} */
.slider-card-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>