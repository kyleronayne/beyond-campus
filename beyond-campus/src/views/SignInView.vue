<template>
  <div id="loginpanel">
    <input
      type="text"
      v-model="u_email"
      placeholder="Enter your email"
      id="textInput"
    />
    <input
      type="password"
      v-model="u_pass"
      placeholder="Enter your password"
      id="textInput"
    />
    <div id="withProvider">
      <button @click="createAccount">
        Signup
        <router-link
          v-bind:to="{ path: '/sign-up', name: 'SignUpView' }"
        ></router-link>
      </button>
      <button @click="loginWithEmail">Login</button>
      <button @click="loginWithGMail">Sign in with Google</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";
import db from "../main";
import database from "../main";
export default defineComponent({
  name: "SignInView",
  data() {
    return {
      u_pass: "",
      u_email: "",
      auth: getAuth(),
      db: db,
    };
  },
  methods: {
    createAccount(): void {
      this.$router.push({ path: "/sign-up" });
    },

    loginWithEmail(): void {
      signInWithEmailAndPassword(this.auth!, this.u_email, this.u_pass)
        .then((cr: UserCredential) => {
          this.$router.push({ path: "/", name: "LandingView" });
        })
        .catch((err: any) => {
          alert(`Unable to login ${err}`);
        });
    },

    loginWithGMail(): void {
      const provider = new GoogleAuthProvider();
      signInWithPopup(this.auth, provider).then((cred: UserCredential) => {
        const userDoc: DocumentReference = doc(
          database,
          `Users/${this.auth.currentUser?.uid}`
        );

        getDoc(userDoc).then((docSnapshot: DocumentSnapshot) => {
          if (!docSnapshot.exists()) {
            const userColl: CollectionReference = collection(database, "Users");
            const ownedPropertyRefs: DocumentReference[] = [];
            const savedPropertyRefs: DocumentReference[] = [];
            setDoc(userDoc, { ownedPropertyRefs, savedPropertyRefs });
          }
        });

        // Move to the home page
        this.$router.push({ path: "/landing", name: "LandingView" });
      });
    },
  },
  mounted() {
    this.auth = getAuth();
  },
});
</script>

<style scoped>
#loginpanel {
  position: fixed;
  left: 40%;
  top: 30%;
  background-color: var(--theme-color-main);
  border: 3px solid black;
  display: inline-flex;
  flex-direction: column;
  width: 35vh;
  height: fit-content;
  border-radius: 4px;
  padding-top: 5px;
}

#textInput {
  margin: 4px;
}

#withProvider {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 15px;
  margin-bottom: 5px;
  margin-block: 5px;
}
</style>
