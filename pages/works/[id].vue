<template>
  <v-app>
    <v-layout>
      <!-- NAV -->
      <v-navigation-drawer 
        left
        class="navBg px-4 py-4 "
        v-model="drawer"
      >
      <div class="d-flex flex-column h-100">
        <!-- NAV - work list -->
        <div class="workList layout-cell layout-scrollbar">
          <span v-for=" ws in worksLIst.works">
            <WorkLIst :work="ws" />
          </span>
        </div>
        <!-- NAV - site name and cv -->
        <div class="h-25 d-flex align-end">
          <div class="w-100 d-flex justify-space-between text-white">
            <span>
              <span>WU I-YEH</span><span class="ml-2">吳 宜 曄</span>
            </span>
            <span>
              <a class="reviewLink" :href="config.DIRECTUS_FILE_URL + myCV.cv[0].cv.filename_disk" target="_blank">
                CV
              </a>
            </span>
          </div>
        </div>
      </div>
      </v-navigation-drawer>  
      <!-- CONTENT -->
      <v-main>
  
        <div class="d-flex "> 
          <!-- CONTENT - nav btn -->
          <div class="d-flex h-screen navBtnBlock px-2">
            <div class="align-self-center navBtn text-h5" @click="drawer = !drawer">ll</div>
          </div>
          <!-- CONTENT - main content -->
          <div class="w-75 mx-auto pt-4">
            <!-- CONTENT - main content - title&info -->
            <v-row>
              <v-col cols="12" sm="8">
                <v-sheet class="text-caption" >
                    <p class="font-weight-bold font-italic">{{ singleWork.works_by_id.title }}</p>
                    <p class="" v-html="singleWork.works_by_id.info"></p>
                </v-sheet>
              </v-col>
            </v-row>

            <!-- #segments_of_violence #wttiotr -->
            <div v-if="content_imgs_length === 1 && content_vids_length === 0">            
                <v-row>
                  <v-col v-for="img in singleWork.works_by_id.content_imgs" :key="img.id" cols="12" sm="8">          
                    <v-sheet>
                      <ImageList :img="img" />
                    </v-sheet > 
                  </v-col>
                </v-row>
                <v-row class="text-caption">
                  <v-col cols="12" sm="8">
                    <div class=""><p v-html="singleWork.works_by_id.statement"></p></div>
                  </v-col>
                </v-row>
            </div>

            <!-- #wave #falling -->
            <div v-else-if="content_imgs_length === 1 && content_vids_length === 1">
              <v-row>
                <!-- CONTENT - main content - 1st row - 1st col -- video -->
                <v-col v-for="vid in singleWork.works_by_id.content_videos" :key="vid.id" cols="12" sm="8">
                  <v-sheet>
                    <VideoList :vid="vid" />
                  </v-sheet>
                </v-col>
                <!-- CONTENT - main content - 1st row - 2nd col -- image -->
                <v-col v-for="img in singleWork.works_by_id.content_imgs" :key="img.id" cols="12" sm="4">          
                  <v-sheet>
                    <ImageList :img="img" />
                  </v-sheet >         
                </v-col>                
              </v-row>
              <!-- CONTENT - main content - 2nd row - statement-->
              <div v-if="singleWork.works_by_id.statement">
                <v-row class="text-caption">
                  <v-col cols="12" sm="8">
                    <div class=""><p v-html="singleWork.works_by_id.statement"></p></div>
                  </v-col>
                </v-row>
              </div>
              <!-- CONTENT - main content - 3nd row - review-->
              <v-row class="text-caption">
                <v-col cols="12" sm="8">
                  <div v-if="content_reviews_length > 0">
                    <!-- <div class="pb-2">texts</div> -->
                    <div v-for="review in singleWork.works_by_id.content_reviews">
                      <ReviewList :review="review" />
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>

            <!-- #i_was_wondering -->
            <div v-else-if="content_imgs_length === 1 && content_vids_length === 3">
                <v-row>
                  <v-col v-for="img in singleWork.works_by_id.content_imgs" :key="img.id" cols="12" sm="8">          
                    <v-sheet>
                      <ImageList :img="img" />
                    </v-sheet >         
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-for="vid in singleWork.works_by_id.content_videos" :key="vid.id" cols="12" sm="4">
                    <v-sheet>
                      <VideoList :vid="vid" />
                    </v-sheet>
                  </v-col>
                </v-row>
            </div>

            <!-- #colors #never_never_land #waterfall #machine_whispers_2015 #dollar-post -->
            <div v-else-if="content_imgs_length === 2 && content_vids_length === 0">
              <!-- CONTENT - main content - 1st row -->
              <v-row class="two-cols" >
                <!-- CONTENT - main content - 1st row -- image -->
                <v-col v-for="img in singleWork.works_by_id.content_imgs" :key="img.id" >          
                  <v-sheet>
                    <ImageList :img="img" />
                  </v-sheet >         
                </v-col>
              </v-row>
              <!-- CONTENT - main content - 2nd row - statement-->
              <div v-if="singleWork.works_by_id.statement">
                <v-row class="text-caption">
                  <v-col cols="12" sm="8">
                    <div class=""><p v-html="singleWork.works_by_id.statement"></p></div>
                  </v-col>
                </v-row>
              </div>
              <!-- CONTENT - main content - 3nd row - review-->
              <v-row class="text-caption">
                <v-col cols="12" sm="8">
                  <div v-if="content_reviews_length > 0">
                    <!-- <div class="pb-2">texts</div> -->
                    <div v-for="review in singleWork.works_by_id.content_reviews">
                      <ReviewList :review="review" />
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>

            <!-- #in_the_future #machine_whispers -->
            <div v-else-if="content_imgs_length === 2 && content_vids_length === 1">
                <v-row>
                  <v-col v-for="vid in singleWork.works_by_id.content_videos" :key="vid.id" cols="12" sm="8">
                    <v-sheet>
                      <VideoList :vid="vid" />
                    </v-sheet>
                  </v-col>
                  <v-col>
                    <v-row no-gutters>
                      <v-col v-for="img in singleWork.works_by_id.content_imgs" :key="img.id" cols="12" sm="12">          
                        <v-sheet>
                          <ImageList :img="img" />
                        </v-sheet >         
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
            </div>

            <!-- #adaptation -->
            <div v-else-if="content_imgs_length === 3">
              <!-- CONTENT - main content - 1nd row - statement -->
              <v-row class="text-caption">
                <v-col cols="12" sm="12">
                  <div><p v-html="singleWork.works_by_id.statement"></p></div>
                </v-col>
              </v-row>
              <!-- CONTENT - main content - 2nd row - image -->
              <v-row>
                <v-col v-for="img in singleWork.works_by_id.content_imgs" :key="img.id" cols="12" sm="8">          
                  <v-sheet class="py-8">
                    <ImageList :img="img" />
                  </v-sheet >         
                </v-col>
              </v-row>
            </div>

          </div>
        </div>
      
      </v-main>
    </v-layout>
  </v-app>
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
        content_videos {
            id
            item{
                ... on block_video {
                    videoCaption
                    videoStream 
                    videoLocal {
                        id
                        filename_disk
                    }
                }              
            } 
        }
        content_reviews {
            id
            item{
                ... on block_review {
                    id 
                    review {
                        filename_disk
                        description
                    }
                   
                },
                
            }
        }

      }
    }
    `
    const { data:singleWork } = await useAsyncQuery(query)
    //console.log(route.params.id)

    /* count the length of images in content */
    const content_imgs_length = singleWork._rawValue.works_by_id.content_imgs.length
    // console.log("content_imgs_length:" + content_imgs_length)

    /* count the length of videos in content */
    const content_vids_length = singleWork._rawValue.works_by_id.content_videos.length
    // console.log("content_vids_length:" + content_vids_length)

    /* count the length of reviews in content */
    const content_reviews_length = singleWork._rawValue.works_by_id.content_reviews.length
 
    /* query works list */
    const query2 = gql`
    query getWorks($limit: Int!) {
      works(limit: $limit, filter: { status: { _eq: "published" } }, sort: ["-sort"]) {
        id
        title
        coverImg {
            id
            filename_disk
        },
      }
    }
    `
    const variables = { limit: -1 }
    const { data:worksLIst } = await useAsyncQuery(query2, variables)

    /* query CV */
    const queryCV = gql`
    query getCV($limit: Int!) {
      cv(limit: $limit) {
        cv {
            id
            filename_disk
        },
      }
    }
    `
    const variablesCV = { limit: -1 }
    const { data:myCV } = await useAsyncQuery(queryCV, variablesCV)
</script>

<script>
  export default {
    data() {
      return {
        drawer: null,
      }
    },
  }
</script>

<style scoped src="../../assets/css/main.css">
 
</style>