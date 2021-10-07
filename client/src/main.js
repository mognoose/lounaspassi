import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootswatch/dist/darkly/bootstrap.min.css';
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import "bootstrap"
import { Settings } from "luxon";
Settings.defaultLocale = "fi";

createApp(App)
    .use(store)
    .use(router)
    .use(BootstrapIcon)
    .mount('#app')
