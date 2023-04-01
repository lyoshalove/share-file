<script setup lang="ts">
import ShareForm from "@/components/ShareForm.vue";
import GenerateCode from "@/components/GenerateCode.vue";
import { onUnmounted, ref } from "vue";
import { socket } from "@/helpers";

const code = ref<string>("");
const isChoosenCode = ref<boolean>(false);

const chooseCode = (newCode: string) => {
  isChoosenCode.value = true;
  code.value = newCode;
};

onUnmounted(() => {
  socket.removeAllListeners();
});
</script>

<template>
  <section class="share">
    <div class="container">
      <div class="share__inner">
        <GenerateCode
          v-if="!isChoosenCode"
          @choose-code="(newCode: string) => chooseCode(newCode)"
        />
        <ShareForm v-else :roomCode="code" />
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import @assets/styles/vars

.share
  padding: 20px 0
  &__inner
    padding: 30px 0 0
    background-color: $four
    border-radius: 10px
    border: 2px solid $secondary

@media (max-width: 480px)
  .share
    &__inner
      padding: 15px 0 0
</style>
