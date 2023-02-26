<template>
    <NuxtLink :to="`/works/${work.id}`" class="flex pb-[13px]">
    <span class="self-end mr-2">#{{ work.title }}</span><span><nuxt-img :src="/url/ + work.coverImg.id" height="38"/></span>
    </NuxtLink>
</template>

<script setup>
    const {work} = defineProps(['work'])
</script>

<style scoped>

</style>