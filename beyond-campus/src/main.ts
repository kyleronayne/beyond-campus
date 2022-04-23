import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { Firestore, getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const database: Firestore = getFirestore(app);

createApp(App).use(router).mount("#app");

export default database;
