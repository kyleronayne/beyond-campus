import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const database: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

createApp(App).use(router).mount("#app");

export default database;
export { storage };
