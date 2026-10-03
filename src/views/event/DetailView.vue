<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import EventService from '@/services/EventService'

const props = defineProps<{
  event: Event
}>()
// local copy of the event whose images are converted from storage keys to presigned urls
const event = ref<Event>({ ...props.event, images: [] })
watch(
  () => props.event,
  (newEvent) => {
    event.value = { ...newEvent, images: [] }
    EventService.getEventImages(newEvent.images ?? []).then((urls) => {
      event.value = { ...newEvent, images: urls }
    })
  },
  { immediate: true },
)
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div id="detailFlashMessage" v-if="message">
    <h4>{{ message }}</h4>
  </div>
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <div class="flex flex-row flex-wrap justify-center">
    <img
      v-for="image in event.images"
      :key="image"
      :src="image"
      alt="events image"
      class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
    />
  </div>
</template>

<style scoped>
@keyframes yellowFade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#detailFlashMessage {
  animation: yellowFade 3s ease-in-out;
}
</style>
