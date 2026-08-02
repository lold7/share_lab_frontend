<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  event: Event
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const edit = () => {
  // If the edit API call is successful
  // Set the flash message, then push back to the event details view
  store.updateMessage(`The data of ${props.event.title} has been updated!`)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template>
  <p>Edit event here</p>
  <button @click="edit">Edit Me!</button>
</template>
