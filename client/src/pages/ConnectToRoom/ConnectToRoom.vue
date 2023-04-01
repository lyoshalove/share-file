<script setup lang="ts">
import ConnectRoom from "@/components/ConnectRoom.vue";
import ShareForm from "@/components/ShareForm.vue";
import { socket } from "@/helpers";
import { onUnmounted, ref } from "vue";

const code = ref<string>("");
const isConnected = ref<boolean>(false);

const handleConnected = (newCode: string) => {
  isConnected.value = true;
  code.value = newCode;
};

onUnmounted(() => {
  socket.removeAllListeners();
});
</script>

<template>
  <section class="connection">
    <div class="container">
      <div class="connection__inner">
        <ConnectRoom
          v-if="!isConnected"
          @connected="(newCode) => handleConnected(newCode)"
        />
        <ShareForm v-else :roomCode="code" />
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import @assets/styles/vars

.connection
  padding: 20px 0
  &__inner
    padding: 30px 0 0
    background-color: $four
    border-radius: 10px
    border: 2px solid $secondary

@media (max-width: 480px)
  .connection
    &__inner
      padding: 15px 0 0
</style>
