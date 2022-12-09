<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div class="px-4 my-4 flex justify-between sm:px-0 items-center">
      <breadcrumbs :items="items"/>
    </div>
    <div
      style="height: calc(72vh - 0px)"
      class="
        responsive
        overflow-y-auto
        scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
        scrolling-touch
        responsive
        flex flex-col
        min-w-0
        flex-1
        overflow-hidden
      "
    >
      <div
        v-if="windowWidth >= 768"
        class="grid xl:grid-cols-4 md:grid-cols-3 h-auto grid-cols-1 gap-4"
      >
        <div
          style="height: calc(72vh - 0px)"
          class="
            md:m-0
            m-4
            bg-white
            responsive
            overflow-y-auto
            scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
            scrolling-touch
            md:col-span-1
            xl:col-span-1
            col-span-1
            border
            shadow-md
            rounded-md
          "
        >
          <div class="m-3 relative rounded-md">
            <div class="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style="fill: rgba(156, 163, 175, 1); transform: ; -ms-filter: "
              >
                <path
                  d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              class="
                text-gray-400 text-sm
                bg-gray-100
                block
                border-transparent
                w-full
                pl-10
                sm:text-sm
                rounded-md
              "
              :placeholder="$t('text.searchInterlocutor')"
            >
          </div>
          <div class="flex items-center m-3">
            <div>
              <button
                :class="[
                  activetab === 'active'
                    ? 'border-b border-green-600 text-green-600'
                    : 'hover:text-green-600 text-gray-600',
                ]"
                class="text-base font-medium text-gray-500 focus:outline-none"
                @click="changeTab('active')"
              >
                {{ $t('word.active') }}
              </button>
            </div>

            <div>
              <button
                :class="[
                  activetab === 'closed'
                    ? 'border-b border-green-600 text-green-600'
                    : 'hover:text-green-600  text-gray-600',
                ]"
                class="text-base font-medium text-gray-500 ml-6 focus:outline-none"
                @click="changeTab('closed')"
              >
                {{ $t('word.finished') }}
              </button>
            </div>
          </div>
          <div v-if="activetab === 'active'">
            <div v-if="activeRooms.length">
              <div
                v-for="(room, index) in activeRooms"
                :key="index"
                class="border-b hover:bg-gray-100 cursor-pointer"
                :class="$route.query.room_id === `${room.id}` ? 'bg-green-50' : 'bg-white'"
                @click="toChatting(room)"
              >
                <div class="p-4 flex items-center">
                  <div class="flex-shrink-0">
                    <span class="inline-block relative">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="room.consultantID && room.consultantID.avatar ? $tools.getFileUrl(room.consultantID.avatar) : require('/assets/images/person/avatar.jpg')"
                        alt=""
                      >
                    </span>
                  </div>
                  <div
                    class="
                      flex
                      items-center
                      overflow-y-auto
                      scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
                      scrolling-touch
                    "
                  >
                    <div class="grid grid-cols-3 ml-3">
                      <div class="col-span-2 block mb-1">
                        <p v-if="room.title !== null" class="text-sm text-gray-600">
                          {{ room.title }}
                        </p>
                        <p v-else class="text-sm text-gray-600">
                          {{ room.receiver.username }}
                        </p>
                        <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                          {{ room.message }}
                        </div>
                      </div>
                      <!--                      <div v-if="room.unread_message !== 0" class="flex justify-end">-->
                      <!--                        <p class="text-xs text-gray-100 bg-gray-400 rounded-xl py-2 px-3">-->
                      <!--                          &lt;!&ndash; {{ $dayjs(room.updated_at).format('') }} &ndash;&gt;-->
                      <!--&lt;!&ndash;                          {{ room.unread_message }}&ndash;&gt;-->
                      <!--                        </p>-->
                      <!--                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="align-middle text-center">
                <span class="rounded-md py-1 px-2 bg-green-200 text-gray-600">
                  {{ $t('text.youDontHaveActiveRooms') }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="activetab === 'closed'">
            <div v-if="$store.state.chats.notActiveRooms.length">
              <div
                v-for="(room, index) in $store.state.chats.notActiveRooms"
                :key="index"
                class="border-b hover:bg-gray-100 cursor-pointer"
                :class="$route.query.room_id === `${room.id}` ? 'bg-green-100' : 'bg-white'"
                @click="toChatting(room)"
              >
                <div class="p-4 flex items-center">
                  <div class="flex-shrink-0">
                    <span class="inline-block relative">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="room.consultantID && room.consultantID.avatar ? $tools.getFileUrl(room.consultantID.avatar) : require('/assets/images/person/avatar.jpg')"
                        alt=""
                      >
                    </span>
                  </div>
                  <div
                    class="
                      flex
                      items-center
                      overflow-y-auto
                      scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
                      scrolling-touch
                    "
                  >
                    <div class="grid grid-cols-3 ml-3">
                      <div class="col-span-2 block mb-1">
                        <p v-if="room.title !== null" class="text-sm text-gray-600">
                          <!--                          {{ `${room.consultantID.name ? room.consultantID.name : ''} ${room.consultantID.surname ? room.consultantID.surname : ''}` }}-->
                        </p>

                        <p v-else class="text-sm text-gray-600">
                          {{ room.receiver.username }}
                        </p>
                        <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                          {{ room.message }}
                        </div>
                      </div>
                      <div class="flex justify-end">
                        <p class="text-xs text-gray-400">
                          {{ $dayjs(room.updatedAt).format('MM:DD:YYYY HH:mm') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="ml-2">
              <div class="align-middle text-center">
                <span class="rounded-md py-1 px-2 bg-red-200 text-gray-600">
                  {{ $t('text.youDontHaveClosedRooms') }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="Object.keys($route.query).length === 0"
          class="md:col-span-2 xl:col-span-3">
          <div class="align-middle text-center">
            <span class="rounded-md py-1 px-2 bg-green-200 text-gray-600">
              {{ $t('text.selectConsultantToMessaging') }}
            </span>
          </div>
        </div>
        <div v-else class="md:col-span-2 xl:col-span-3">
          <chat-body ref="chat-body" :state="'consultant'" @editRooms="editRooms"/>
        </div>
      </div>
      <div v-else class="m-4">
        <div
          v-if="Object.keys($route.query).length === 0 && windowWidth < 768"
          class="p-4 border rounded-md shadow-md bg-white"
        >
          <div class="md:col-span-1 xl:col-span-1 col-span-1">
            <div class="my-2 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style="fill: rgba(156, 163, 175, 1); transform: ; -ms-filter: "
                >
                  <path
                    d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                class="
                  text-gray-400 text-sm
                  bg-gray-100
                  block
                  w-full
                  pl-10
                  sm:text-sm
                  border-gray-50
                  rounded-md
                "
                :placeholder="$t('text.searchInterlocutor')"
              >
            </div>
            <div class="flex items-center m-3">
              <div>
                <button
                  :class="[
                    activetab === 'active'
                      ? 'border-b border-green-600 text-green-600'
                      : 'hover:text-green-600 text-gray-600',
                  ]"
                  class="text-base font-medium text-gray-500 focus:outline-none"
                  @click="changeTab('active')"
                >
                  Faol
                </button>
              </div>

              <div>
                <button
                  :class="[
                    activetab === 'closed'
                      ? 'border-b border-green-600 text-green-600'
                      : 'hover:text-green-600  text-gray-600',
                  ]"
                  class="text-base font-medium text-gray-500 ml-6 focus:outline-none"
                  @click="changeTab('closed')"
                >
                  Tugallangan
                </button>
              </div>
            </div>
            <div v-if="activetab === 'active'">
              <div v-if="$store.state.chats.activeRooms.length">
                <div
                  v-for="(room, index) in $store.state.chats.activeRooms"
                  :key="index"
                  class="border-b hover:bg-gray-100 cursor-pointer"
                  :class="$route.query.room_id === `${room.id}` ? 'bg-green-50' : 'bg-white'"
                  @click="toChatting(room, $store.state.chats.activeRooms)"
                >
                  <!--                  <span>asdadsad</span>-->
                  <div class="p-4 flex items-center">
                    <div class="flex-shrink-0">
                    <span class="inline-block relative">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="room.consultantID && room.consultantID.avatar ? $tools.getFileUrl(room.consultantID.avatar) : require('/assets/images/person/avatar.jpg')"
                        alt=""
                      >
                    </span>
                    </div>
                    <div
                      class="
                      flex
                      items-center
                      overflow-y-auto
                      scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
                      scrolling-touch
                    "
                    >
                      <div class="grid grid-cols-3 ml-3">
                        <div class="col-span-2 block mb-1">
                          <span>{{ room }}</span>
                          <p v-if="room.title !== null" class="text-sm text-gray-600">
                            {{ room.title }}
                          </p>
                          <p v-else class="text-sm text-gray-600">
                            {{ room.receiver.username }}
                          </p>
                          <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                            {{ room.message }}
                          </div>
                        </div>
                        <!--                        <div v-if="room.unread_message !== 0" class="flex justify-end">-->
                        <!--                          <p class="text-xs text-gray-100 bg-gray-400 rounded-xl py-2 px-3">-->
                        <!--                            &lt;!&ndash; {{ $tools.getDateTime(room.updated_at) }} &ndash;&gt;-->
                        <!--                            {{ room.unread_message }}-->
                        <!--                          </p>-->
                        <!--                        </div>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="align-middle text-center">
                <span class="rounded-md py-1 px-2 bg-green-200 text-gray-600">
                  {{ $t('text.youDontHaveActiveRooms') }}
                </span>
                </div>
              </div>
            </div>
            <div v-if="activetab === 'closed'">
              <div v-if="$store.state.chats.notActiveRooms.length">
                <div
                  v-for="(room, index) in $store.state.chats.notActiveRooms"
                  :key="index"
                  class="border-b hover:bg-gray-100 cursor-pointer"
                  :class="$route.params.index === `${room.id}` ? 'bg-green-50' : 'bg-white'"
                  @click="toChatting(room)"
                >
                  <div class="p-4 flex items-center">
                    <div class="flex-shrink-0">
                    <span class="inline-block relative">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="room.consultantID && room.consultantID.avatar ? $tools.getFileUrl(room.consultantID.avatar) : require('/assets/images/person/avatar.jpg')"
                        alt=""
                      >
                    </span>
                    </div>
                    <div
                      class="
                      flex
                      items-center
                      overflow-y-auto
                      scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2
                      scrolling-touch
                    "
                    >
                      <div class="grid grid-cols-3 ml-3">
                        <div class="col-span-2 block mb-1">
                          <p v-if="room.title !== null" class="text-sm text-gray-600">
                            {{ room.title }}
                          </p>
                          <div class="flex pt-2 space-x-1 w-full text-xs text-gray-500">
                            {{ room.message }}
                          </div>
                        </div>
                        <div class="flex justify-end">
                          <p class="text-xs text-gray-400">
                            {{ $dayjs(room.createdAt).format('HH:mm') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <chat-body :state="'consultant'" @editRooms="editRooms"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import chatBody from "@/components/chats/ChatBody";
import finishChat from "@/components/modals/finish-chat";
export default {
  name: 'Chat',
  auth: true,
  components: {
    chatBody
  },
  // sockets: {
  //   connent: function () {
  //     console.log('socket connet==>')
  //   }
  // },
  data() {
    return {
      items: [{text: 'text.onlineConsultation', link: '/online-consultation', disabled: true}],
      windowWidth: 0,
      activeRooms: [],
      closedRooms: [],
      editRoomsList:null,
      currentUser: this.$cookies.get('user_info') ?? {},
      noChatSelected: true,
      activetab: 'active',
    }
  },
  computed: {
    ...mapState({
      finishedChatId: state => state.socket.finishedChatId,
      createRoom: state => state.socket.createRoom,
      seenMessage: state => state.socket.seenMessage,
      activeRooms: (state) => state.chats.activeRooms

    })
  },
  watch: {
    // "$store.state.chats.activeRooms": (value, old) => {
    //   console.log(value, old)
    // },
    // '$store.state.chats.message': (newValue, oldValue) => {
    //   console.log(newValue, oldValue, this)
    // },
    "$route.query.room_id"(val, old) {
      if (old !== 'new') {
        this.socketLeavRoom(old)
          .then(res => {
            this.joinToRoom(val)
              .then(res => {
                if (old === 'new') {
                  this.$refs['chat-body'].sendMessage()
                }
              })
          })
      } else {
        this.joinToRoom(val)
          .then(res=> {
            if (old === 'new') {
              this.$refs['chat-body'].sendMessage()
            }
          })
      }
      this.$store.dispatch('chats/chatmessages', {
        populate: '*',
        filters: {
          room: {
            id: {
              $eq: val
            }
          }
        }
      })
      // sockets.emit({room_id: this.$route.query.room_id, userID: this.currentUser.id})
    },
    finishedChatId() {
      this.fetchActiveRooms()
    },
    createRoom() {
      this.fetchActiveRooms()
    },
    seenMessage() {
      this.fetchActiveRooms()
    }
  },
  created() {
    if (!process.client) {
      return
    }

    if (this.$route.query.room_id && this.$route.query.room_id !== 'new') {
      // this.socketDisconnector().then(() => {
      //   this.$bridge.$emit('selected_room', { room_id: this.$route.query.room_id })
      // })
    }
  },
  async fetch() {
    this.currentUser = this.$cookies.get('user_info')
  },
  async mounted() {
    await this.fetchActiveRooms()
      .then(async (res) => {
        await this.joinSocket()
          .then(async (res) => {
            if (this.$route.query.room_id !== 'new' && this.$route.query.room_id !== undefined) {
              await this.joinToRoom(this.$route.query.room_id)
            }
          });
      })
    this.scrollToEnd()
    this.setWindowWidth();
  },
  updated() {
    this.scrollToEnd()
  },
  destroyed() {
    this.socketDisconnector()
    this.$store.dispatch('chats/clearMessage')
  },
  methods: {
    async joinSocket() {
      await this.$socket.emit('join', {
        username: this.currentUser.username,
        user_id: this.currentUser.id,
      })
    },
    async socketLeavRoom(id) {
      await this.$socket.emit('leaveRoom', {
        username: this.currentUser.username,
        room: id,
      }, ({res}) => {
        console.log(res)
      })
    },
    async joinToRoom(id) {
      await this.$socket.emit('joinRoom', {username: this.currentUser.username, room: id})
    },
    socketDisconnector() {
      this.$socket.emit("leave", {
        username: this.$auth.user.username,
        user_id: this.$auth.user.id,
      });
      this.$store.dispatch("socket/clearMessages");
    },
    editRooms () {
      console.log('=====>>>> isCompletant')
      // const _currentRoom = {
      //   id: this.currentRoom.id,
      //   data: {
      //     consultant: this.currentRoom.consultant.id,
      //     isCompleted: true,
      //     user: this.currentRoom.user.id,
      //   },
      // }
      // console.log('Current Room', _currentRoom, this.currentRoom)
      this.$modal.show(
        finishChat,
        {
          link: 'putChatrooms',
          data: this.editRoomsList,
        },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 400 ? window.innerWidth - 30 : 400,
          scrollable: true,
          clickToClose: false,
        }
      )
      // this.$root.$once('finish-chat-modal', (item) => {
      //   if (item !== 'canceled') {
      //     this.sendRoomToSocket({
      //       id: this.currentRoom.id,
      //       data: {
      //         consultant: _currentRoom.consultant,
      //         isCompleted: true,
      //         user: _currentRoom.user,
      //       },
      //     })
      //   }
      // })
      // console.log(this.currentRoom, '====>>>>>')
    },
    scrollToEnd() {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        }
      }, 0)
    },
    changeTab(status) {
      this.activetab = status;
      if (status === 'active') {
        this.fetchActiveRooms()
      }
      this.fetchClosedRooms()
    },
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
      // console.log(window.innerWidth)
    },
    toChatting(data, list) {
      this.editRoomsList = data;
      this.noChatSelected = false;
      this.$store.dispatch('chats/clearMessage')
      this.$router.push({query: {room_id: data.id, consultant_id: data.receiver.id}})
    },
    async fetchActiveRooms() {
      return this.$store
        .dispatch('chats/getRooms', {
          populate: '*',
          filters: {
            is_completed: false,
            sender: {
              id: this.currentUser.id
            }
          }
        })
        .then((res) => {
          // const {results, pagination} =res;
          this.activeRooms = res.results
          // this.setRooms(, 'active')
          // this.activeRooms = res
        })
    },
    async fetchClosedRooms() {
      await this.$store
        .dispatch('chats/getRooms', {
          populate: '*',
          filters: {
            is_completed: true,
            sender: {
              id: this.currentUser.id
            }
          }
        })
        .then((res) => {
          this.closedRooms = res.results;
          // this.setRooms(res, 'closed')
        })
    }
  }
}
</script>

<style>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}

@media screen and (max-width: 1024px) {
  .responsive {
    height: calc(100vh - 25px);
  }
}

@media screen and (min-width: 375px) {
  .responsive {
    height: calc(78vh - 25px);
  }
}

@media screen and (min-width: 375px) {
  .responsive {
    height: calc(80vh - 25px);
  }
}
</style>
