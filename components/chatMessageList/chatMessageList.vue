<template>
  <div ref="chat">
  <div v-for="(msg, index) in messages" :key="index" class="chat-message p-2">
    <!--            {{msg}}-->
    <div
      v-if="msg.sender && msg.sender.id === $auth.user.id"
      class="flex items-end justify-end"
    >
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
        @click.prevent.stop="handleClick($event, msg)"
      >

        <div
          class="
                    px-4
                    py-2
                    rounded-lg
                    inline-block
                    rounded-br-none
                    text-gray-600 text-sm
                    bg-green-100
                  "
        >
          <div class="bg-indigo-300 mb-1">
            <img
              v-if="msg.file_url"
              class="object-cover h-48 w-96"
              :src="`${$tools.newUrl(msg.file_url)}`"
            />
          </div>
          <span class="">{{ msg.text }}</span>
        </div>
<!--        <span class="w-full flex justify-between"><sub>{{$dayjs(msg.createdAt).format('HH:mm')}}</sub>-->
<!--                <sub v-if="checkDay(msg.createdAt)">{{$dayjs(msg.createdAt).format('DD:MM:YYYY')}}</sub></span>-->
      </div>
      <img
        :src="
                  msg.sender && msg.sender.avatar
                    ? $tools.getFileUrl(msg.sender.avatar)
                    : require('/assets/images/person/avatar.jpg')
                "
        @error="require('/assets/images/person/avatar.jpg')"
        alt="My profile"
        class="w-6 h-6 rounded-full order-2"
      />
    </div>
    <div v-else class="flex items-end">
      <div
        class="
                  flex flex-col
                  space-y-2
                  text-xs
                  max-w-xs
                  mx-2
                  order-2
                  items-start
                  bg-gray-300
                  rounded-t-lg rounded-r-lg
                "
      >
        <div
          class="
                    px-4
                    py-2
                    rounded-lg
                    inline-block
                    rounded-bl-none
                    text-gray-600
                    bg-orange-50
                  "
        >
          <div class="bg-indigo-300 mb-1">
            <img
              v-if="msg.filepath"
              class="object-cover h-48 w-96"
              :src="`${$tools.getFileUrl(msg.filepath)}`"
            />
          </div>
          <span>{{ msg.text }} <sub>{{$dayjs(msg.createdAt).format('DD:MM:YYYY HH:mm')}}</sub></span>
        </div>
      </div>
      <img
        :src="
                  msg.sender && msg.sender.avatar
                    ? $tools.getFileUrl(msg.sender.avatar)
                    : require('/assets/images/person/avatar.jpg')
                "
        @error="require('/assets/images/person/avatar.jpg')"
        alt="My profile"
        class="w-6 h-6 rounded-full order-1"
      />
    </div>
  </div>
  </div>
<!--  </div>-->
</template>

<script>
export default {
  name: "chatMessageList",
  props: {
    messages: {
      type: Array | Object,
      required: true,
      default: () => []
    }
  },
  mounted() {
    this.scrollToEnd()
    this.setWindowWidth()
  },
  methods: {
    handleClick(event, item) {
      this.$emit('handeleClick', event,item)
    },
    scrollToEnd() {
      setTimeout(() => {
        if (this.$refs.chat) {
          console.log('===>>>setInterval', this.$refs.chat.$el, this.$refs.chat.scrollHeight)
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        }
      }, 0)
    },
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
      // console.log(window.innerWidth)
    },
    checkDay (item) {
      const day = this.$dayjs(item).format('MM:DD:YYYY').split(':')[0];
      this.day = []
      // console.log(this.day, 'day')
      return day;
    },
  }
}
</script>

<style scoped>

</style>
