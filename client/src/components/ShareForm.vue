<script setup lang="ts">
import upload from "@assets/images/upload.svg";
import question from "@assets/images/question.svg";
</script>

<template>
  <header class="share__header">
    <h2 class="share__header-title">Send / Get files</h2>
  </header>
  <div class="share__content">
    <label class="input__file-label">
      <input class="share__input input__file" type="file" />
      <img class="input__file-image" :src="upload" alt="upload" />
      <p class="input__file-description">
        Drag and Drop here or
        <span class="input__file-span">Choose&nbsp;file</span>
      </p>
    </label>
  </div>
  <footer class="share__footer">
    <div class="share__footer-left">
      <a
        href="https://vk.com/lyoshavv"
        target="_blank"
        class="share__footer-link"
      >
        <img :src="question" alt="question" />
        Help Center
      </a>
    </div>
    <div class="share__footer-right">
      <RouterLink to="/" class="btn share__footer-btn">Go to home</RouterLink>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@import @assets/styles/vars

.share
  &__header,
  &__content,
  &__footer
    padding: 0 20px
  &__content
    margin: 25px 0 35px
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
