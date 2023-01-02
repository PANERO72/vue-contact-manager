import { createApp } from 'vue';
import App from './App.vue';

import './styles.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

//import { createPopper } from '@popperjs/core'

// const popcorn = document.querySelector('#popcorn');
// const tooltip = document.querySelector('#tooltip');
// createPopper(popcorn, tooltip, {
//   placement: 'top-end',
// });

createApp(App).mount('#app');