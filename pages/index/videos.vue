<template>
  <div>
    <div v-if="$fetchState.pending"><MainLoading /></div>
    <div v-else-if="$fetchState.error"></div>
    <div  v-else class="max-w-7xl mx-auto py-6 px-6 lg:px-8">
      <div class="pb-6 flex justify-between px-0">
        <breadcrumbs :items="items" />
      </div>
     <div>
       <min-loading v-if="loading"/>
       <div v-else class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-4">
         <div v-for="(video, index) in $store.state.videos.videosList" :key="index" class="h-72 relative border shadow-md rounded-md">
           <div class="container h-auto cursor-pointer w-full">
             <iframe
               v-if="checkVideoUrl(video.video_path)"
               loading="lazy"
               :src="video.video_path"
               frameborder="0"
               allowfullscreen
               class="responsive-iframe rounded-md"
             />
             <video v-else controls class="responsive-iframe rounded-md">
               <source :src="video.video_path" type="video/mp4">
             </video>
           </div>
           <p class="text-gray-700 font-medium absolute lg:bottom-2 bottom-3 inset-x-3 line-clamp-2 text-base">
             {{ video.title}}
           </p>
         </div>
       </div>
       <pagination
         v-if="$store.state.videos.pagTotal >= 1"
         :current-page="$route.query.page ? parseInt($route.query.page) : 1"
         :page-count="$store.state.videos.pagTotal"
         @callback="pageChanged($event)"
       />
     </div>
    </div>
  </div>

</template>

<script>
// import videosModal from '~/modals/videos.vue'
export default {
  name: 'Videos',
  auth: false,
  data () {
    return {
      videos: [],
      loading: false,
      items: [
        { text: 'text.videoLessons', link: '/videos/', disabled: false }
      ]
    }
  },
  watch: {
    '$route.query.page': function (va){
      this.fetchVideos()
    }
  },
  methods: {
    checkVideoUrl (item) {
      if (item.includes('admin.agsat.uz')) {
        return false;
      } else {
        return  true
      }
    },
    pageChanged (page) {
      this.loading  = true;
      this.$router.push({path: this.localePath('/videos'), query: {page: page}})
    },
    async fetchVideos () {
      const _filters = {
        title: {
          $ne: 'None'
        }
      }
      try {
        await this.$store.dispatch('videos/get_videos_list', {
          populate: "*",
          locale: this.$i18n.locale,
          pagination: {
            page: this.$route.query.page ?? 1,
            pageSize: 12
          },
          filters:_filters
        }).finally(() => {
          this.loading = false
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async fetch () {
    try {
      await this.fetchVideos()
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>

