<script setup lang="ts">
import AuctionItemCard from '@/components/AuctionItemCard.vue'
import BaseInput from '@/components/BaseInput.vue'
import type { AuctionItem } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import AuctionItemService from '@/services/AuctionItemService'

const router = useRouter()
const items = ref<AuctionItem[] | null>(null)
const totalItems = ref(0)
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
  const totalPages = Math.ceil(totalItems.value / size.value)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    updateKeyword()
  })
})

const keyword = ref('')
function updateKeyword() {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = AuctionItemService.getAuctionItems(size.value, page.value)
  } else {
    queryFunction = AuctionItemService.getAuctionItemsByKeyword(
      keyword.value,
      size.value,
      page.value,
    )
  }
  queryFunction
    .then((response) => {
      items.value = response.data
      totalItems.value = Number(response.headers['x-total-count'])
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <h1>Auction Items</h1>
  <div class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        type="text"
        label="Search description or type..."
        class="w-full"
        @input="updateKeyword"
      />
    </div>
    <div class="size-links">
      Page size:
      <RouterLink
        v-for="s in [1, 2, 3, 4, 6]"
        :key="s"
        :to="{ name: 'auction-item-list-view', query: { page: 1, size: s } }"
        >{{ s }}</RouterLink
      >
    </div>

    <AuctionItemCard v-for="item in items" :key="item.id" :item="item" />

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'auction-item-list-view', query: { page: page - 1, size: size } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'auction-item-list-view', query: { page: page + 1, size: size } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
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
