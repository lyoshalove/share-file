<script setup lang="ts">
import { notificationsMessages } from "@/constants";
import { socket } from "@/helpers";
import { notificationsStore } from "@/store";
import question from "@assets/images/question.svg";
import { ref } from "vue";

const code = ref<string>("");
const emits = defineEmits(["connected"]);
const notifications = notificationsStore();

const connectToRoom = () => {
  socket.emit("receiver-join", {
    id: code.value,
  });
};

socket.on("room-not-exist", () => {
  notifications.addNewNotification(notificationsMessages.roomNotExist);
});

socket.on("connected-to-room", () => {
  notifications.addNewNotification(notificationsMessages.connectedToRoom);
  emits("connected", code.value);
});
</script>

<template>
  <header class="connection__header">
    <h2 class="connection__header-title">Connect to room</h2>
  </header>
  <div class="connection__content">
    <input
      class="connection__input"
      type="text"
      placeholder="Write room code"
      v-model="code"
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
      <button
        class="btn connection__footer-btn"
        @click="connectToRoom"
        :disabled="code.length < 1"
      >
        Connect
      </button>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@import @assets/styles/vars

.connection
  &__header,
  &__content
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

@media (max-width: 480px)
  .connection
    &__header,
    &__content
      padding: 0 15px
    &__content
      margin: 15px 0 20px
    &__footer
      padding: 10px 10px 20px
      gap: 0 15px
      &-link
        gap: 0 5px
        font-size: 14px
    &__input
      width: 100%
</style>
