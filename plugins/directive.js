import Vue from 'vue';
import ca from "vue2-datepicker/locale/es/ca";
Vue.directive('scroll-change', {
  inserted: (el,binding) => {
    // el.addEventListener('scroll', scroll)
    console.log('innerHTML', el.innerHTML)
    // function scroll (evt) {
    //   binding.value(evt)
    // }
    // function callback (event) {
    //   console.log('callback', event)
    // }
    // const observer = new IntersectionObserver(callback,{root: el})
    // observer.observe(el);
  }
})
