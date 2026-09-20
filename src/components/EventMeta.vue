<script setup lang="ts">
import type { Event } from '@/types'
defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-class">
    <div class="event-card">
      <p class="meta-text">{{ event.category }}</p>
      <p class="meta-text">{{ event.organizer.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.event-class {
  display: flex;
  justify-content: center;
}
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.meta-text {
  font-size: 16px;
  text-align: right;
  margin: 0;
}
</style>
