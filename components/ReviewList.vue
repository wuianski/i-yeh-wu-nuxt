<template>
    <a class="reviewLink" :href="config.DIRECTUS_FILE_URL + review.item.review.filename_disk" target="_blank">
        *{{ review.item.review.description }}
    </a>
</template>

<script setup>
    /* access your runtimeConfig variables */
    const config = useRuntimeConfig();
  
    const {review} = defineProps(['review'])
</script>

<style scoped>

</style>