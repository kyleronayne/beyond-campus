<template>
  <div id="signupPanel">
    <input type="email" v-model="email" placeholder="Enter email" required />
    <input
      type="password"
      v-model="pass"
      placeholder="Enter password"
      required
    />
    <input
      type="password"
      v-model="confirmPassword"
      placeholder="Confirm password"
      required
    />
    <div>
      <button :disabled="!isValidInput" @click="createAccount">Sign-up</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getAuth,
  Auth,
  signInWithPopup,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default defineComponent({
  name: "SignupView",
  data() {
    return {
      email: "",
      pass: "",
      confirmPassword: "",
      auth: getAuth(),
    };
  },
  methods: {
    isValidInput(): boolean {
      return (
        this.email!.length > 0 && this.pass!.length > 0 && this.pass!.length > 0
      );
    },
    checkPassword(a: string, b: string): boolean {
      if (a.localeCompare(b) == 0) {
        return true;
      } else {
        return false;
      }
    },
    createAccount(): void {
      console.log(this.pass);
      console.log(this.confirmPassword);
      if (this.checkPassword(this.pass, this.confirmPassword)) {
        createUserWithEmailAndPassword(this.auth!, this.email, this.pass)
          .then((cr: UserCredential) => {
            alert(`New account created with UID ${cr.user.uid}`);
            this.$router.push({ path: "/landing" });
          })
          .catch((err: any) => {
            alert(`Unable to create account ${err}`);
          });
      } else {
        alert("Passwords dont match");
      }
    },
  },
  mounted() {
    this.auth = getAuth();
  },
});
</script>

<style>
#signupPanel {
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
  padding: 5px;
}
</style>
