import { createApp } from "vue";

import App from "./App.vue";

import "./style.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass, faTrashCan);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
