<script setup lang="ts">
import download from "@assets/images/download.svg";
import cross from "@assets/images/cross.svg";
import { fileExtensions, filenameCharsCount } from "@/constants";
import { computed } from "vue";
import { sliceText } from "@/helpers";

interface IProps {
  fileName: string;
  downloadFile: () => void;
  removeFile: () => void;
}

const props = defineProps<IProps>();
const imageUrl = computed(() => {
  const fileExtension = props.fileName.split(".")[1];

  if (fileExtensions.includes(fileExtension)) {
    return `src/assets/images/extensions/${props.fileName.split(".")[1]}.svg`;
  }

  return `src/assets/images/extensions/unknown.svg`;
});
</script>

<template>
  <li class="share__files-item">
    <div class="share__files-left">
      <img :src="imageUrl" alt="file icon" class="share__files-icon" />
      <span class="share__files-name">{{ sliceText(fileName, filenameCharsCount) }}</span>
    </div>
    <button class="share__files-btn btn" @click="downloadFile">
      <img class="share__files-download" :src="download" alt="download" />
    </button>
    <img
      class="share__files-cross"
      :src="cross"
      alt="delete file"
      @click="removeFile"
    />
  </li>
</template>

<style lang="sass" scoped>
@import @assets/styles/vars

.share__files
  &-item
    display: flex
    align-items: center
    justify-content: space-between
    position: relative
    padding: 25px 15px 10px
    border-radius: 10px
    background-color: $third
    margin: 0 0 10px
  &-left
    display: flex
    align-items: center
    gap: 0 20px
  &-icon
    width: 55px
    height: 55px
  &-btn
    &:hover
      background-color: $secondary
  &-download
    width: 20px
    height: 20px
  &-cross
    position: absolute
    inset: 5px 5px auto auto
    width: 20px
    height: 20px
    cursor: pointer

@media (max-width: 480px)
  .share__files
    &-item
      padding: 20px 10px 10px
    &-left
      gap: 0 5px
    &-icon
      width: 35px
      height: 35px
    &-btn
      padding: 5px
    &-cross
      width: 15px
      height: 15px
</style>
