<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
})
const page = computed(() => props.page)
const size = computed(() => props.size)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / size.value)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(size.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = Number(response.headers['x-total-count'])
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <div class="size-links">
      Page size:
      <RouterLink
        v-for="s in [2, 3, 4, 6]"
        :key="s"
        :to="{ name: 'event-list-view', query: { page: 1, size: s } }"
        >{{ s }}</RouterLink
      >
    </div>

    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: size } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: size } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
.size-links {
  margin-bottom: 18px;
}
.size-links a {
  margin-left: 8px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
