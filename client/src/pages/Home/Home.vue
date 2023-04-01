<script setup lang="ts"></script>

<template>
  <div class="hero">
    <div class="container">
      <div class="hero__inner">
        <div class="hero__offer">
          <h1 class="hero__title">Share files with FILE'ИК</h1>
          <p class="hero__description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum sequi,
            cumque animi laudantium aut ea quasi necessitatibus perspiciatis
            nisi atque.
          </p>
          <span class="hero__span">Get started 👇</span>
          <div class="hero__btns">
            <RouterLink to="/connection" class="hero__btn btn btn-secondary">
              Connect
            </RouterLink>
            <RouterLink to="/share-files" class="hero__btn btn">
              Create
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.hero
  padding: 50px 0
  &__inner
    text-align: center
  &__description
    margin: 20px auto 30px
    max-width: 600px
  &__btns
    display: flex
    justify-content: center
    align-items: center
    gap: 0 20px
    margin: 10px 0 0

@media (max-width: 480px)
  .hero
    padding: 30px 0
    &__description
      margin: 10px 0 15px
    &__btns
      gap: 0 10px
      margin: 5px 0 0
</style>
