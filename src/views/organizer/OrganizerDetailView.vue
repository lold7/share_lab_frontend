<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Organizer } from '@/types'
import OrganizerService from '@/services/OrganizerService'

const props = defineProps<{
  id: number
}>()

const router = useRouter()
const organizer = ref<Organizer | null>(null)
// presigned url of the organizer image (the database keeps only the storage key)
const imageUrl = ref<string | null>(null)

watch(
  () => props.id,
  (id) => {
    organizer.value = null
    imageUrl.value = null
    OrganizerService.getOrganizer(id)
      .then((response) => {
        organizer.value = response.data
        if (response.data.image) {
          OrganizerService.getOrganizerImage(response.data.image).then((url) => {
            imageUrl.value = url
          })
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          router.push({ name: '404-resource-view', params: { resource: 'organizer' } })
        } else {
          router.push({ name: 'network-error-view' })
        }
      })
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="organizer">
    <h1>{{ organizer.name }}</h1>
    <p>Organizer ID: {{ organizer.id }}</p>
    <div class="flex flex-row flex-wrap justify-center">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="organizer image"
        class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
      />
      <p v-else-if="!organizer.image">This organizer has no image</p>
    </div>
    <h3>Events by this organizer</h3>
    <ul v-if="organizer.ownEvents && organizer.ownEvents.length > 0">
      <li v-for="event in organizer.ownEvents" :key="event.id">
        <RouterLink :to="{ name: 'event-detail-view', params: { id: event.id } }">
          {{ event.title }}
        </RouterLink>
        @ {{ event.location }}
      </li>
    </ul>
    <p v-else>No events yet</p>
  </div>
</template>
