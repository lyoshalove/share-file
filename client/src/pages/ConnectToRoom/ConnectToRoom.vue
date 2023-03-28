<script setup lang="ts">
import question from "@assets/images/question.svg";
</script>

<template>
  <section class="connection">
    <div class="container">
      <div class="connection__inner">
        <header class="connection__header">
          <h2 class="connection__header-title">Connect to room</h2>
        </header>
        <div class="connection__content">
          <input
            class="connection__input"
            type="text"
            placeholder="Write room code"
          />
        </div>
        <footer class="connection__footer">
          <div class="connection__footer-left">
            <a
              href="https://vk.com/lyoshavv"
              target="_blank"
              class="connection__footer-link"
            >
              <img :src="question" alt="question" />
              Help Center
            </a>
          </div>
          <div class="connection__footer-right">
            <button class="btn connection__footer-btn">Connect</button>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import @assets/styles/vars

.connection
  margin: 20px 0 0
  &__inner
    padding: 30px 0 0
    background-color: $four
    border-radius: 10px
    border: 2px solid $secondary
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
