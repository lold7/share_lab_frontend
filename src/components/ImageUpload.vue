<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
interface UploadMedia {
  name: string
  url?: string
  size?: number
  type?: string
}
const modelValue = defineModel<string[]>({
  default: () => [],
})
// optional limit on the number of images (e.g. 1 for the organizer)
defineProps<{
  max?: number
}>()
const convertStringToMedia = (str: string[]): UploadMedia[] => {
  return str.map((element) => {
    return {
      name: element,
    }
  })
}
const convertMediaToString = (media: UploadMedia[]): string[] => {
  const output: string[] = []
  media.forEach((element) => {
    output.push(element.name)
  })
  return output
}
const media = ref<UploadMedia[]>(convertStringToMedia(modelValue.value))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)
const authorizeHeader = computed(() => {
  return { authorization: authStore.authorizationHeader }
})
const onChanged = (files: UploadMedia[]): void => {
  modelValue.value = convertMediaToString(files)
}
</script>
<template>
  <Uploader
    :server="uploadUrl"
    @change="onChanged"
    :media="media"
    :max="max"
    :headers="authorizeHeader"
  ></Uploader>
</template>
