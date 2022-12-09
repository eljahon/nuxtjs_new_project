import { i18n } from "./locales";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Agromart new",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: 'preload',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'",
        href: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css'
      }
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],
// target: 'static',
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/axios.js" },
    { src: "~/plugins/tools.js", defer: true },
    { src: "~/plugins/swaper.js", defer: true },
    { src: "~/plugins/vue-modal", mode: "client", defer: true },
    { src: "~/plugins/client-libraries", mode: "client", defer: true },
    { src: "~/plugins/vee-validate", mode: "client", defer: true },
    { src: "~/plugins/other-libraries", mode: "client", defer: true },
    // { src: "~/plugins/directive", mode: "client", defer: true },
    { src: "~/plugins/socket.io",  ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  loading: false,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv",  'nuxt-build-optimisations'],
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/axios",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dayjs",
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    // 'nuxt-socket-io',
    ['cookie-universal-nuxt', { alias: 'cookiz' }]
  ],
  // io: {
  //   sockets: [{
  //     name: 'home',
  //     url: 'https://testapi.agromart.uz',
  //     vuex: {
  //       actions: [{ message: 'FORMAT_MESSAGE' }]
  //       // emitBacks: ['message']
  //     },
  //   }],
  //   server: {
  //     server: {
  //       // @ts-ignore
  //       cors: {
  //         credentials: true, // "Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted."
  //         origin: ['https://nuxt-socket-io.netlify.app'] // Array of whitelisted origin(s)
  //       }
  //     }
  //   },
  //   namespaces: {
  //     '/index': {
  //       emitters: ['joined', 'join+textMgs -->message'],
  //       listeners: ['message -->message']
  //     }
  //   }
  // },
  dayjs: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    plugins: [], // Your Day.js plugin
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
          // maxAge: 30 * 24 * 60 * 60,
          global: true,
          // type: 'Bearer'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/local', method: 'post' },
          user: {url: '/users/me', method:'get'},
          logout: false,
          valueOftokenRequired: false,
          tokenType: false,
        },
        redirect: {
          login: '/',
          logout: '/',
          user: '/profile',
          callback: '/'
        }
      }
    }
  },
  i18n: i18n,
  router: {
    // mode: 'hash',
    middleware: ['auth'],
    prefetchLinks: false
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    parallel: false,
    cache: false,
    hardSource: false
  },
};
