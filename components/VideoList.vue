<template>
    <div v-if="vid.item.videoStream">
        <iframe class="myVideo" :src="vid.item.videoStream" frameborder="0" allow="accelerometer; muted; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div v-else-if="vid.item.videoLocal.filename_disk">
        <video ref="videoPlayer" muted controls autoplay class="myVideo">
            <source :src="config.DIRECTUS_FILE_URL + vid.item.videoLocal.filename_disk" type="video/mp4" />
        </video>
        <div v-html="vid.item.videoCaption" class="imgSummary pt-3 text-caption"></div>
    </div>
</template>

<script setup>
    /* access your runtimeConfig variables */
    const config = useRuntimeConfig();

    const {vid} = defineProps(['vid'])
</script>

<style scoped>

</style>