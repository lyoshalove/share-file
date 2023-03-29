<script setup lang="ts">
import ConnectRoom from "@/components/ConnectRoom.vue";
import ShareForm from "@/components/ShareForm.vue";
import { ref } from "vue";

const code = ref<string>("");
const isConnected = ref<boolean>(false);

const handleConnected = (newCode: string) => {
  isConnected.value = true;
  code.value = newCode;
};
</script>

<template>
  <section class="connection">
    <div class="container">
      <div class="connection__inner">
        <ConnectRoom
          v-if="!isConnected"
          @connected="(newCode) => handleConnected(newCode)"
        />
        <ShareForm :code="code" v-else />
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
</style>
