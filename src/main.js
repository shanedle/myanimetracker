import "./style.css";

import { createApp } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import App from "./components/App.vue";

library.add(faMagnifyingGlass, faTrashCan);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
