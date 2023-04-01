<script setup lang="ts">
import { notificationsStore } from "@/store";
import { storeToRefs } from "pinia";

const { notifications } = storeToRefs(notificationsStore());
</script>

<template>
  <TransitionGroup name="notifications" tag="ul" class="notifications">
    <li
      class="notifications__item"
      v-for="notification in notifications"
      :key="notification.id"
    >
      {{ notification.text }}
    </li>
  </TransitionGroup>
</template>

<style lang="sass">
@import @assets/styles/vars

.notifications
  position: fixed
  inset: auto 5px 5px auto
  max-height: 200px
  width: 300px
  overflow: hidden auto
  &__item
    width: 100%
    padding: 5px 10px
    border-radius: 8px
    border: 2px solid $secondary
    margin: 5px 0
    text-align: right
  &-move,
  &-enter-active,
  &-leave-active
    transition: .3s
  &-enter-from,
  &-leave-to
    opacity: 0
    transform: translate(25px, 0)

@media (max-width: 480px)
  .notifications
    &__item
      font-size: 14px
</style>
