const qs = require("qs");
function filterNonNull(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
}
export default function ({ $axios,$cookies, redirect, $auth, app }) {
  if (app.$auth) {
            const token = app.$auth.strategy.token.get().split(' ')[1]
            $axios.setToken(token, 'Bearer')
          }

  $axios.onError(error => {
    const code = error.response.status;
    // console.log('error', error, app.$auth,app.$cookies)
    if (code === 400) {

    } else if (code === 401) {
       localStorage.clear();
       app.$cookies.remove('user_info');
       app.$auth.logout();
    }
  })
  $axios.setBaseURL(process.env.NUXT_APP_BASE_URL);
  $axios.onRequest((config) => {
    config.paramsSerializer = function (params) {
      return qs.stringify(filterNonNull(params), { encodeValuesOnly: true });
    };
  });
  $axios.onResponse(data => {
    // console.log('onResponse====>>>>', data)
    return data.data
  })
}
