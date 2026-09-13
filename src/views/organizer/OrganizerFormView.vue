<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const organizer = ref<Organizer>({
  id: null,
  name: '',
  address: '',
})

const saved = ref<Organizer | null>(null)

const router = useRouter()
const store = useMessageStore()
function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      saved.value = response.data
      store.updateMessage('You are successfully add a new organizer for ' + response.data.name)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
      organizer.value = { id: null, name: '', address: '' }
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <h3>Who is organizing the event?</h3>
      <label class="block text-gray-500 font-bold">Name</label>
      <input
        v-model="organizer.name"
        type="text"
        placeholder="Name"
        class="h-13 w-1/4 px-2.5 text-xl border border-gray-400 focus:border-emerald-500 focus:outline-none mb-6"
      />
      <label class="block text-gray-500 font-bold">Address</label>
      <input
        v-model="organizer.address"
        type="text"
        placeholder="Address"
        class="h-13 w-1/4 px-2.5 text-xl border border-gray-400 focus:border-emerald-500 focus:outline-none mb-6"
      />
      <button
        class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus:border-emerald-500 transition-all duration-200 ease-linear hover:scale-105 hover:border-emerald-500 hover:shadow-lg active:scale-100 focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>

    <div v-if="saved">
      <h3>Saved to the database</h3>
      <pre>{{ saved }}</pre>
    </div>
  </div>
</template>
