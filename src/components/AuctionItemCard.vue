<script setup lang="ts">
import type { AuctionItem } from '@/types'
defineProps<{
  item: AuctionItem
}>()
</script>

<template>
  <div class="p-5 w-[250px] border border-[#39495c] mb-[18px] text-[#2c3e50]">
    <h2>{{ item.description }}</h2>
    <span>{{ item.type }}</span>
    <h5>{{ item.bids.length }} bids</h5>
    <span v-if="item.successfulBid">Sold for {{ item.successfulBid.amount }}</span>
    <span v-else>No successful bid yet</span>
  </div>
</template>
