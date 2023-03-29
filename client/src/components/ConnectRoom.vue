<script setup lang="ts">
import { generateCode, socket } from "@/helpers";
import { notificationsStore } from "@/store";
import question from "@assets/images/question.svg";
import { ref } from "vue";

const code = ref<string>("");
const emits = defineEmits(["connected"]);
const notifications = notificationsStore();

const connectToRoom = () => {
  socket.emit("receiver-join", {
    uid: code.value,
  });
};

socket.on("room-not-exist", () => {
  notifications.addNewNotification({
    id: generateCode(),
    text: "Room with this id not exist ❌",
  });
});

socket.on("connected-to-room", () => {
  console.log("click: ", socket.id);
  notifications.addNewNotification({
    id: generateCode(),
    text: "Connected to room ✅",
  });
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
