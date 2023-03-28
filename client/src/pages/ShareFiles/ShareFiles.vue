<script setup lang="ts">
import ShareForm from "@/components/ShareForm.vue";
import GenerateCode from "@/components/GenerateCode.vue";
import { ref } from "vue";

const isChoosenCode = ref<boolean>(false);
</script>

<template>
  <section class="share">
    <div class="container">
      <div class="share__inner">
        <GenerateCode
          v-if="!isChoosenCode"
          @choose-code="isChoosenCode = true"
        />
        <ShareForm v-else />
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import @assets/styles/vars

.share
  margin: 20px 0 0
  &__inner
    padding: 30px 0 0
    background-color: $four
    border-radius: 10px
    border: 2px solid $secondary
</style>
