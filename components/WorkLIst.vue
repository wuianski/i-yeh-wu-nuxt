<template>
    <div class="myLink pb-2">
        <NuxtLink :to="`/works/${work.id}`" >
            <div class="d-inline-block text-white text-body-2 mr-4">
                <span class="mr-2">#{{ work.title }}</span><span><nuxt-img :src="/url/ + work.coverImg.id"  height="30" width="auto"/></span>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
    const {work} = defineProps(['work'])
</script>

<style scoped>

</style>