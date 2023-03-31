<script setup lang="ts">
import upload from "@assets/images/upload.svg";
import question from "@assets/images/question.svg";
import { downloadBlob, generateCode, socket } from "@/helpers";
import { ref, onBeforeUnmount } from "vue";
import FileItem from "./FileItem.vue";
import { notificationsStore } from "@/store";

interface IProps {
  code: string;
}

interface IFile {
  id: string;
  data: Uint8Array;
  fileName: string;
}

const props = defineProps<IProps>();
const files = ref<IFile[]>([]);
const notifications = notificationsStore();

const handleInputFile = (event: any) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  if (file.size > 10000000) {
    notifications.addNewNotification({
      id: generateCode(),
      text: "File size more than 1 mb ❌",
    });
    return;
  }

  const fileReader = new FileReader();
  let rawData = new ArrayBuffer(8);

  fileReader.onload = (event) => {
    rawData = event.target?.result as ArrayBuffer;
    socket.emit("send-file", {
      uid: props.code,
      data: rawData,
      fileName: file.name,
    });
  };

  fileReader.readAsArrayBuffer(file);

  event.target.value = "";
};

const removeFile = (fileId: string) => {
  files.value = files.value.filter((file) => file.id !== fileId);
};

socket.on("file", (file: IFile) => {
  console.log(file);
  files.value.unshift({ ...file, id: generateCode() });
});

onBeforeUnmount(() => {
  socket.emit("client-leave");
  socket.removeAllListeners();
  console.log("bebra: ", props.code);
});
</script>

<template>
  <header class="share__header">
    <h2 class="share__header-title">Send / Get files</h2>
  </header>
  <div class="share__content">
    <label class="input__file-label">
      <input
        class="share__input input__file"
        type="file"
        @change="handleInputFile"
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
</style>
