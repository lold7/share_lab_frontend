<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const store = useMessageStore()
const authStore = useAuthStore()
const router = useRouter()
const { message } = storeToRefs(store)
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiAccountPlus, mdiLogin, mdiLogout } from '@mdi/js'

function logout() {
  authStore.logout()
  router.push({ name: 'login-view' })
}
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialiased">
    <header class="max-h-screen leading-normal">
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <nav class="flex">
            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus" />
                    <span class="ml-3">Sign Up</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <router-link to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin" />
                    <span class="ml-3">Login</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount" />
                    <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link hover:cursor-pointer" @click="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogout" />
                    <span class="ml-3">LogOut</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink :to="{ name: 'student-list-view' }">Student</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
          <span v-if="authStore.isAdmin">
            |
            <RouterLink :to="{ name: 'add-event' }">New Event</RouterLink>
          </span>
          |
          <RouterLink :to="{ name: 'add-organizer' }">New Organizer</RouterLink> |
          <RouterLink :to="{ name: 'auction-item-list-view' }">Auction</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}

@keyframes yellowFade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellowFade 3s ease-in-out;
}
</style>
