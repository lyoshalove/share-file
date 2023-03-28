<script setup lang="ts">
import logo from "@assets/images/logo.svg";
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <RouterLink to="/" class="header__logo-link">
          <img :src="logo" alt="logo" class="header__logo" />
        </RouterLink>
        <div class="header__actions">
          <RouterLink to="/connection" class="btn btn-secondary header__btn"
            >Receiver</RouterLink
          >
          <RouterLink to="/share-files" class="btn header__btn"
            >Sender</RouterLink
          >
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="sass" scoped>
.header
  padding: 10px 0
  &__inner
    display: flex
    align-items: center
    justify-content: space-between
    gap: 0 50px
  &__actions
    display: flex
    align-items: center
    gap: 0 20px
</style>
