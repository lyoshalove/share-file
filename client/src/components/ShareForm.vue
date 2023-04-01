<script setup lang="ts">
import upload from "@assets/images/upload.svg";
import question from "@assets/images/question.svg";
import { downloadBlob, generateCode, socket, readFile } from "@/helpers";
import { ref, onBeforeUnmount } from "vue";
import FileItem from "./FileItem.vue";
import { notificationsStore } from "@/store";
import { maxFileSize, notificationsMessages } from "@/constants";
import { IFile } from "@/types";

interface IProps {
  roomCode: string;
}

const props = defineProps<IProps>();
const files = ref<IFile[]>([]);
const notifications = notificationsStore();
const fileInputLabelRef = ref();

const handleInputFile = (event: any) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  if (file.size > maxFileSize) {
    notifications.addNewNotification(notificationsMessages.bigFileSize);
    return;
  }

  readFile(props.roomCode, file);
  event.target.value = "";
  dragLeaveHandle();
};

const dragEnterHandle = () => {
  fileInputLabelRef.value.classList.add("enter");
};

const dragLeaveHandle = () => {
  fileInputLabelRef.value.classList.remove("enter");
};

const removeFile = (fileId: string) => {
  files.value = files.value.filter((file) => file.id !== fileId);
};

socket.on("file", (file: IFile) => {
  files.value.unshift({ ...file, id: generateCode() });
});

onBeforeUnmount(() => {
  socket.emit("client-leave");
  socket.removeAllListeners();
});
</script>

<template>
  <header class="share__header">
    <h2 class="share__header-title">Send / Get files</h2>
  </header>
  <div class="share__content">
    <label class="input__file-label" ref="fileInputLabelRef">
      <input
        class="share__input input__file"
        type="file"
        @change="handleInputFile"
        @dragenter="dragEnterHandle"
        @dragleave="dragLeaveHandle"
      />
      <img class="input__file-image" :src="upload" alt="upload" />
      <p class="input__file-description">
        Drag and Drop here or
        <span class="input__file-span">Choose&nbsp;file</span>
      </p>
    </label>
    <ul class="share__files">
      <FileItem
        v-for="file in files"
        :fileName="file.fileName"
        :downloadFile="() => downloadBlob(file.data, file.fileName)"
        :removeFile="() => removeFile(file.id)"
        :key="file.id"
      />
    </ul>
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
  &__files
    margin: 25px 0 0
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

@media (max-width: 480px)
  .share
    &__header,
    &__content
      padding: 0 15px
    &__content
      margin: 15px 0 20px
      &-code
        margin: 0 0 10px
    &__footer
      padding: 10px 10px 20px
      gap: 0 15px
      &-link
        gap: 0 5px
        font-size: 14px
</style>
