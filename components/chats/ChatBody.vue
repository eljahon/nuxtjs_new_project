<template>
  <div>
    <div v-if="$route.query.room_id" id="map-wrap" class="relative">
      <div style="height: calc(72vh - 0px)" class="flex-1 p-2 justify-between flex flex-col">
        <div class="flex sm:items-center justify-between pb-3 pt-0 border-b-2 border-gray-200">
          <div class="relative flex items-center space-x-4">
            <div class="relative" v-if="currentRoom">
              <img v-if="consultant && consultant.userinfo && consultant.userinfo.avatar"
                :src="$tools.getFileUrl(consultant.userinfo.avatar)"
                alt=""
                class="w-8 sm:w-12 h-8 sm:h-12 rounded-full"
              />
              <img v-else
                   :src="require('/assets/images/person/avatar.jpg')"
                   alt=""
                   class="w-8 sm:w-12 h-8 sm:h-12 rounded-full"
              />
            </div>
            <div class="flex flex-col leading-tight">
              <div class="text-lg mt-1 flex items-center">
                <span v-if="consultant.userinfo&&consultant.userinfo.name" class="text-gray-700 mr-3">{{
                    `${consultant.userinfo.name ? consultant.userinfo.name : ''} ${consultant.userinfo.surname ? consultant.userinfo.surname : ''}`
                  }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          id="messages"
          ref="chat"
          class="
            flex flex-col
            space-y-4
            p-3
            overflow-y-auto
            scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2
            scrolling-touch
          "
        >

          <chat-message-list
            :messages="messages"
            @handeleClick="handleClick"
          />
<!--          <main-loading v-else/>-->
        </div>
        <div
          v-if="$route.query.room_id"
          class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
        >
          <div class="relative flex">
            <textarea
              v-model="message.text"
              :rows="1"
              :placeholder="$t('word.write')"
              class="
                w-full
                focus:outline-none focus:border-green-300
                pr-20
                px-2
                focus:placeholder-gray-400
                text-gray-600
                placeholder-gray-600
                bg-gray-200
                rounded-md
                py-3
              "
              @keyup.enter="sendMessage()"
            />
            <div class="absolute right-0 items-center inset-y-0 flex">
              <button
                type="button"
                class="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  h-10
                  w-10
                  transition
                  duration-500
                  ease-in-out
                  text-gray-500
                  hover:bg-gray-300
                  focus:outline-none
                "
                @click="closeChatRoom()"
              >
                <svg
                  version="1.1"
                  id="Uploaded to svgrepo.com"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="32px"
                  height="32px"
                  viewBox="0 0 32 32"
                  style="enable-background: new 0 0 32 32"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      class="duotone_een"
                      d="M24.232,8.626l-9.192,9.192c-0.194,0.194-0.513,0.194-0.707,0l-2.828-2.828
		c-0.194-0.194-0.513-0.194-0.707,0l-0.707,0.707c-0.194,0.194-0.194,0.513,0,0.707l4.243,4.243c0.194,0.194,0.513,0.194,0.707,0
		L25.646,10.04c0.194-0.194,0.194-0.513,0-0.707l-0.707-0.707C24.745,8.431,24.427,8.431,24.232,8.626z"
                    />
                    <path
                      class="duotone_twee"
                      d="M15.747,21.354c-0.586,0.586-1.536,0.585-2.121,0c-0.038-0.038-0.192-0.192-4.243-4.243
		c-0.586-0.585-0.586-1.536,0-2.121l0.707-0.707c0.585-0.585,1.536-0.585,2.121,0l2.475,2.475L22,9.444V8.5
		C22,8.225,21.775,8,21.5,8h-15C6.225,8,6,8.225,6,8.5v15C6,23.775,6.225,24,6.5,24h15c0.275,0,0.5-0.225,0.5-0.5v-8.399
		L15.747,21.354z"
                    />
                  </g>
                </svg>
                <input
                  ref="file"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="mediaChange"
                />
              </button>
              <button
                type="button"
                class="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  h-10
                  w-10
                  transition
                  duration-500
                  ease-in-out
                  text-gray-500
                  hover:bg-gray-300
                  focus:outline-none
                "
                @click="$refs.file.click()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-6 w-6 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
                <input
                  ref="file"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="mediaChange"
                />
              </button>
              <button
                type="button"
                class="
                  text-blue-400
                  hover:bg-blue-300 hover:text-blue-600
                  inline-flex
                  items-center
                  mr-1
                  justify-center
                  rounded-full
                  h-10
                  w-10
                  transition
                  duration-500
                  ease-in-out
                  focus:outline-none
                "
                @click="sendMessage()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          v-else-if="!currentRoom.rate && currentUser.role.id !== 3"
          class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
        >
          <div class="flex items-center justify-between">
            <div>{{ $t('evaluate-the-advice') }}</div>
            <div class="flex ml-4 items-center">
              <star-rating v-model="advice.rating" />
            </div>
            <div class="items-center flex">
              <button
                type="button"
                class="
                  text-green-400
                  bg-green-100
                  hover:bg-geen-300
                  px-2
                  py-1
                  hover:text-green-600
                  inline-flex
                  items-center
                  mr-1
                  justify-center
                  rounded-md
                  transition
                  duration-500
                  ease-in-out
                  focus:outline-none
                "
                @click="toRating()"
              >
                {{ $t('rating') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-simple-context-menu
      ref="vueSimpleContextMenu"
      element-id="myUniqueId"
      :options="options"
      @option-clicked="optionClicked"
    />
  </div>
</template>
<script>
import deleteModal from '~/components/modals/delete.vue'
import sendMedia from '~/components/modals/send-media.vue'
// import finishChatModal from '~/components/modals/finish-chat.vue'
import { mapState, mapGetters } from 'vuex'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
export default {
  name: 'ChatRoomBody',
  mixins: [],
  auth: true,
  components: {
    VueSimpleContextMenu,
  },
  props: {
    // currentUser: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      message: {
        room: parseInt(this.$route.query.room_id),
        sender: this.$auth.user.id,
        receiver: parseInt(this.$route.query.consultant_id),
        text: '',
        // file_url: null,
        // seen: false,
      },
      windowWidth: 0,
      isEdit: false,
      currentUser: this.$cookies.get('user_info'),
      day: null,
      advice: {
        rating: 0,
        comment: '',
      },
      consultant: {},
      currentRoom: {
        attributes: {},
      },
      options: [
        {
          name: this.$t('edit'),
          slug: 'edit',
        },
        {
          name: `<em>${this.$t('delete')}</em>`,
          slug: 'delete',
        },
      ],
    }
  },
  async fetch() {
    try {

      if (this.$route.query.consultant_id) {
        await this.fetchConsultant()
      }
    } catch (err) {
    }
  },
  mounted() {
    if(this.$route.query.room_id !== 'new') {
      this.$store.dispatch('chats/chatmessages', {
        populate: '*',
        filters: {
          room: {
            id: {
              $eq: this.$route.query.room_id
            }
          }
        }
      })
    }

  },
  watch: {
    '$route.query.consultant_id'(val){
      this.fetchConsultant(val)
},
    messages: (newValue, oldValue) => {
      // console.log(newValue, oldValue, this)
    }
  },
  computed: {
    ...mapState({
      finishedChatId: (state) => state.socket.finishedChatId,
    }),
    ...mapGetters({
      messages: 'chats/getMessage',
      acvtiveUser: 'chats/getActiveUser'
    }),
  },
  methods: {
    async createRoomToSocket () {
      const room = {
        receiver: this.consultant.id,
        sender: this.$auth.user.id
      }
     return await this.$socket.emit('createRoom', room,)
    },
    async fetchCurrentRoom() {
      if (this.$route.query.room_id !== 'new') {
        await this.$store
          .dispatch('chats/getByIdChatrooms', {
            id: this.$route.query.room_id,
            params: {
              populate: '*',
              // 'filters[$and][0][id]': this.$route.query.room_id,
            },
          })
          .then((res) => {
            this.currentRoom = res.data
          })
      }
    },
    async socketDisconnector(id) {
      await this.$socket.emit('leaveRoom', {
        username: this.$auth.user.username,
        room:this.$route.query.room_id,
      })
      // await this.$store.dispatch('clearMessages')
    },
    async fetchConsultant(id) {
      this.$store
        .dispatch("users/get_users", {
          populate: '*',
          filters: {
            id: id ?? this.$route.query.consultant_id,
          },
        })
        .then((res) => {
          console.log(res.users)
          this.consultant = {...res.users[0]}
        })
    },
    scroll (event) {

    },
    toRating() {
      const _currentRoom = {
        id: this.currentRoom.id,
        data: {
          consultant: this.currentRoom.consultant.id,
          isCompleted: this.currentRoom.isCompleted,
          user: this.currentRoom.user.id,
          rate: this.advice.rating,
        },
      }
      this.$store
        .dispatch('putChatrooms', { id: _currentRoom.id, data: _currentRoom.data })
        .then(() => {
          this.fetchCurrentRoom().then(() => {
            this.sendRoomToSocket({
              id: this.currentRoom.id,
              data: {
                consultant: this.currentRoom.consultant.id,
                rate: this.currentRoom.rate,
                title: this.currentRoom.title,
                isCompleted: this.currentRoom.isCompleted,
                user: this.currentRoom.user.id,
                answerDuration: this.currentRoom.answerDuration,
              },
            })
          })
        })
    },
    checkDay (item) {
      const day = this.$dayjs(item).format('MM:DD:YYYY').split(':')[0];
      this.day = []
      // console.log(this.day, 'day')
      return day;
    },
    closeChatRoom() {
      this.$emit('editRooms')
    },
    sendMessage() {
    if (this.message.text === 0 || this.message.text.trim().length === 0) {
        return
      } else if (this.$route.query.room_id === 'new') {
        this.createRoomToSocket()
      } else {
            this.message.room = parseInt(this.$route.query.room_id)
            if (!this.isEdit) {
              this.$socket.emit('sendMessage', this.message)
              this.message.text = ''
            } else {
              const id = this.message.id;
              delete this.message.id
              this.$socket.emit('editMessage', {id: id , data: this.message})
              this.isEdit = !this.isEdit;
              this.message.text = ''
            }
      }
    },
    sendRoomToSocket(room) {
      if (room.id) {
        const _id = room.id
        const data = room.data
        delete data.id
        const _room = {
          id: _id,
          data,
        }
        this.$socket.emit('editRoom', _room, ({ res, rej }) => {
        })
      } else {
        socket.emit('createRoom', room, ({ res, rej }) => {
          // this.setMessage()
        })
      }
    },
    handleClick(event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item)
    },
    optionClicked(event) {
      console.log(event)
      const {item, option} = event
      if (option.slug === 'edit') {
        this.isEdit = ! this.isEdit;
        this.message.text = item.text
        this.message.file_url = item.file_url
        this.message.seen = item.seen;
        this.message.id = item.id
      }
      else if (event.option.slug === 'delete') {
        this.$modal.show(
          deleteModal,
          { name: 'DeleteMessage' },
          {
            height: 'auto',
            maxWidth: 400,
            width: window.innerWidth <= 400 ? window.innerWidth - 30 : 400,
            scrollable: true,
            clickToClose: false,
          }
        )
        // this.$socket.emit(
        //   'deleteMessage',
        //   { id: event.item.id, room: parseInt(this.$route.query.room_id)}
        // )
        this.$root.$once('delete-modal', (item) => {
          console.log('delete', event)
          if (item !== 'canceled') {
            this.$socket.emit(
              'deleteMessage',
              { id: event.item.id, room: parseInt(this.$route.query.room_id)}
            )
          }
        })
      }
    },
    mediaChange({ target }) {
      console.log(target.files[0])
      const formData = new FormData()
      formData.append('files', target.files[0])
      this.$store.dispatch('upload/uploadFile', formData).then((res) => {
        console.log('Image uploaded: ', res, res[0].url.substring(8))
        this.$modal.show(
          sendMedia,
          {
            image: res[0].url.substring(8),
          },
          {
            height: 'auto',
            maxWidth: 600,
            width: window.innerWidth <= 600 ? window.innerWidth - 30 : 600,
            scrollable: true,
            clickToClose: false,
          }
        )
        this.$root.$once('send-media-modal', (item) => {
          if (item !== 'canceled') {
            this.message.file_url = item.image
            this.message.text = item.text
            this.sendMessage()
          }
        })
      })
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
  },

}
</script>
