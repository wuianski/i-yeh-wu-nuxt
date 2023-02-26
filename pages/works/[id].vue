<template>
  <div class="flex">
    <!-- MENU -->
    <div class="basis-1/4 max-w-[300px] min-w-[300px]">
      <div class="fixed max-w-[300px] min-w-[300px] bg-[#0000ff] h-screen text-[#fff] text-sm p-[30px]">
        <div class="pb-[30px]">
          <span>WU I-YEH</span><span class="ml-2">吳 宜 曄</span>
        </div>
        <div class="block">
          <span v-for=" ws in worksLIst.works">
            <WorkLIst :work="ws" />
          </span>
        </div>
      </div>
    </div>
    <!-- CONTENT -->
    <div class="basis-3/4">
      <div class="flex justify-center text-[#00000080] text-sm">
        <div class="w-[90%] pt-[30px]">
          <p class="font-semibold italic">{{ singleWork.works_by_id.title }}</p>
          <p class="font-normal" v-html="singleWork.works_by_id.info"></p>
          <p class="font-normal pb-[30px] pt-[30px]" v-html="singleWork.works_by_id.statement"></p>
          <!-- <img :src="config.DIRECTUS_FILE_URL + w.coverImg.filename_disk "/> -->
          <!-- <nuxt-img :src="config.DIRECTUS_FILE_URL + w.coverImg.filename_disk "/> -->
          <!-- <nuxt-img :src="/url/ + w.coverImg.id" /> -->

          <div v-if="content_imgs_length === 1">
            <div class="grid gap-8 grid-cols-3 grid-rows-1">
              <div v-for=" img in singleWork.works_by_id.content_imgs" class="first:col-span-2">          
                <div>
                  <nuxt-img fit="inside" width="600" height="450" :src="/url/ + img.item.image.id" class="h-auto w-full"/>
                  <div v-html="img.item.image_summary" class="imgSummary pt-[13px] text-xs"></div>
                </div>         
              </div>
              <video ref="videoPlayer" muted controls autoplay>
                  <source :src="config.DIRECTUS_FILE_URL + singleWork.works_by_id.videoFile.filename_disk" type="video/mp4" />
              </video>
            </div>
          </div>
          <div v-else-if="content_imgs_length === 2">
            <div class="grid gap-6 grid-cols-3 grid-rows-1 ">
              <div v-for=" img in singleWork.works_by_id.content_imgs" class="first:col-span-2">          
                <div>
                  <nuxt-img fit="inside" width="600" height="450" :src="/url/ + img.item.image.id" class="h-auto w-full"/>
                  <div v-html="img.item.image_summary" class="imgSummary pt-[13px] text-xs"></div>
                </div>         
              </div>
            </div>
          </div>
          <div v-else-if="content_imgs_length === 3">
            <div class="grid gap-6 grid-cols-3 grid-rows-1 ">
              <div v-for=" img in singleWork.works_by_id.content_imgs" class="first:col-span-1">          
                <div>
                  <nuxt-img fit="inside" width="600" height="450" :src="/url/ + img.item.image.id" class="h-auto w-full"/>
                  <div v-html="img.item.image_summary" class="imgSummary pt-[13px] text-xs"></div>
                </div> 
              </div>
            </div>
          </div>

          

          

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    /* access your runtimeConfig variables */
    const config = useRuntimeConfig();
    
    /* query single work */
    const route = useRoute()
    const query = gql`
    query getWork {
      works_by_id ( id:${route.params.id} ) {
        id
        title
        info
        statement
        coverImg {
          id
          filename_disk
        }
        content_imgs {
            id
            item{
                ... on block_img {
                    image_summary
                    image {
                        id
                    }
                }
            }            
        }
        videoFile {
          id
          filename_disk
        }
      }
    }
    `
    const { data:singleWork } = await useAsyncQuery(query)
    //console.log(route.params.id)

    /* count the length of images in content */
    const content_imgs_length = singleWork._rawValue.works_by_id.content_imgs.length
    //console.log(content_imgs_length)
 
    /* query works list */
    const query2 = gql`
    query getWorks($limit: Int!) {
      works(limit: $limit) {
        id
        title
        coverImg {
            id
            filename_disk
        },
      }
    }
    `
    const variables = { limit: 5 }
    const { data:worksLIst } = await useAsyncQuery(query2, variables)
</script>


<style scoped>

</style>