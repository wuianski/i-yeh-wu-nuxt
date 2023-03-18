<template>
    <nuxt-img fit="inside" :src="/url/ + img.item.image.id" class="h-auto w-full" style="width: 100%;"/>
    <div v-html="img.item.image_summary" class="imgSummary pt-0 text-caption"></div>
</template>

<script setup>
    const {img} = defineProps(['img'])
</script>

<style scoped>

</style>