<script setup lang="ts">
import { generateCode, socket } from "@/helpers";
import { notificationsStore } from "@/store";
import question from "@assets/images/question.svg";
import { ref, computed } from "vue";

const code = ref<string>("Empty code");
const { addNewNotification } = notificationsStore();
const emits = defineEmits(["chooseCode"]);
const checkCodeToNullable = computed(() => code.value === "Empty code");

const createCode = () => (code.value = generateCode());
const copyCode = () => {
  if (!checkCodeToNullable.value) {
    navigator.clipboard.writeText(code.value);
    addNewNotification({
      id: generateCode(),
      text: "Code copied to clipboard 😋",
    });
  }
};
const chooseCode = () => {
  if (!checkCodeToNullable.value) {
    emits("chooseCode", code.value);
    socket.emit("sender-join", {
      uid: code.value,
    });
  }
};
</script>

<template>
  <header class="generation__header">
    <h2 class="generation__header-title">Generate code</h2>
  </header>
  <div class="generation__content">
    <h2 class="generation__content-code" @click="copyCode">{{ code }}</h2>
    <button class="btn generation__content-btn" @click="createCode">
      Generate code
    </button>
  </div>
  <footer class="generation__footer">
    <div class="generation__footer-left">
      <a
        href="https://vk.com/lyoshavv"
        target="_blank"
        class="generation__footer-link"
      >
        <img :src="question" alt="question" />
        Help Center
      </a>
    </div>
    <div class="generation__footer-right">
      <button
        class="btn generation__footer-btn"
        @click="chooseCode"
        :disabled="checkCodeToNullable"
      >
        Create room
      </button>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@import @assets/styles/vars

.generation
  margin: 20px 0 0
  &__inner
    padding: 30px 0 0
    background-color: $four
    border-radius: 10px
    border: 2px solid $secondary
  &__content
    &-code
      cursor: pointer
  &__header,
  &__content,
  &__footer
    padding: 0 20px
  &__content
    margin: 25px 0 35px
    &-code
      margin: 0 0 15px
  &__footer
    display: flex
    align-items: center
    justify-content: space-between
    gap: 0 40px
    background-color: $third
    border-radius: 0 0 10px 10px
    padding: 10px 20px 30px
    &-link
      display: flex
      align-items: center
      gap: 0 10px
      color: $five
</style>
