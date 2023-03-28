<script setup lang="ts">
import Header from "@/components/Header.vue";
import Notifications from "@/components/Notifications.vue";
</script>

<template>
  <Header />
  <slot />
  <Notifications />
</template>
