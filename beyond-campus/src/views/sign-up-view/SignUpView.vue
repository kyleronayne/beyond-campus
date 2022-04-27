<template>
  <div id="signupPanel">
    <!-- Name fields -->
    <form id="name-fields-input">
      <!-- First name field -->
      <input
        id="name-field-first"
        type="text"
        v-model="firstName"
        placeholder="First Name"
      />
      <!-- Last name field -->
      <input
        id="name-field-last"
        type="text"
        v-model="lastName"
        placeholder="Last Name"
      />
    </form>
    <!-- Email and password fields -->
    <form id="email-and-password">
      <label> Email and Password</label>
      <input id="email" type="email" v-model="email" placeholder="Email" />
      <input
        id="password"
        type="password"
        v-model="pass"
        placeholder="Password"
      />
      <input
        id="confirmPassword"
        type="password"
        v-model="confirmPassword"
        placeholder="Confrim Password"
      />
    </form>
    <form id="information">
      <label>information</label>
      <input
        type="text"
        v-model="schoolName"
        placeholder="School Name"
        autocomplete="on"
      />
      <input
        type="tel"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        v-model="phoneNumber"
        placeholder="Phone Number"
      />
    </form>
    <form id="profile">
      <div
        id="primary-photo-input-container"
        v-on:click="didClickPrimaryPhotoInputContainer"
      >
        <img
          id="primary-photo-upload-icon"
          src="./profile-picture.svg"
          v-show="!primaryPhoto"
          alt="Grey upload icon"
        />
        <img
          id="primary-photo-preview"
          v-bind:src="primaryPhoto"
          v-show="primaryPhoto"
          alt="Listing primary photo preview"
        />
        <input
          id="primary-photo-input"
          type="file"
          v-on:change="didUploadPrimaryPhoto($event)"
        />
      </div>
      <label id="profile-pic">Profile Picture</label>
    </form>
    <div id="create-account">
      <button :disabled="!isValidInput" @click="createAccount">Sign-up</button>
      <button @click="clear">clear</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import database from "@/main";
import {
  getAuth,
  Auth,
  signInWithPopup,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  addDoc,
  DocumentReference,
  setDoc,
} from "firebase/firestore";
import { ref, getStorage, uploadBytes } from "firebase/storage";
import firebase from "firebase/app";
import { storage } from "@/main";

export default defineComponent({
  name: "SignUpView",
  data() {
    let valid = false;
    const store = storage;
    let photoFile: File | null = null;
    return {
      firstName: "",
      lastName: "",
      primaryPhoto: "",
      email: "",
      pass: "",
      confirmPassword: "",
      auth: getAuth(),
      valid: valid,
      schoolName: "",
      phoneNumber: "",
      store,
      photoFile,
      uid: "",
    };
  },
  methods: {
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
            const docRef: DocumentReference = doc(
              database,
              `Users/${cr.user.uid}`
            );
            setDoc(docRef, {
              uid: cr.user.uid,
              firstName: this.firstName,
              lastName: this.lastName,
              school: this.schoolName,
              phone: this.phoneNumber,
              profileRef: `${cr.user.uid}-profilePic`,
            }).then(() => {
              console.log(
                `New Doc added with id ${cr.user.uid} and name ${this.firstName}`
              );
            });
            this.uploadImageFile(cr.user.uid);
            this.$router.push({ path: "/" });
          })

          .catch((err: any) => {
            alert(`Unable to create account ${err}`);
          });
      } else {
        alert("Passwords dont match");
      }
    },
    didClickPrimaryPhotoInputContainer(): void {
      if (!this.primaryPhoto) {
        // If the user has not selected a primary photo
        document.getElementById("primary-photo-input")?.click();
      }
    },
    didUploadPrimaryPhoto(event: { target: { files: any[] } }): void {
      const file = event.target.files[0];
      this.photoFile = file;
      if (file) {
        if (
          file.type == "image/jpeg" ||
          file.type == "image/jpg" ||
          file.type == "image/png"
        ) {
          this.primaryPhoto = URL.createObjectURL(file);
        }
      }
    },
    didClickRemovePrimaryPhotoButton(): void {
      // Set input FileList to an empty string to emulate onChange event
      const primaryPhotoInput = document.getElementById(
        "primary-photo-input"
      ) as HTMLInputElement;
      primaryPhotoInput.value = "";
      this.primaryPhoto = "";
    },
    clear(): void {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.pass = "";
      this.confirmPassword = "";
    },
    uploadImageFile(uid: string): void {
      const storeRef = ref(this.store, `${uid}-profilePic`);
      uploadBytes(storeRef, this.photoFile!).then((snapshot) => {
        console.log(
          `Uploaded file to storage under ${uid}-profile for file: ${this.photoFile}`
        );
      });
    },
  },
  computed: {
    isValidInput(): boolean {
      return (
        this.email!.length > 0 &&
        this.pass!.length > 0 &&
        this.confirmPassword!.length > 0
      );
    },
  },
  mounted() {
    this.auth = getAuth();
  },
});
</script>

<style scoped>
#signupPanel {
  border: 10px solid black;
}
#name-fields-input {
  position: absolute;
  left: 30vw;
  top: 20vh;
  border-top: 4px solid blue;
  border-left: 4px solid blue;
  border-right: 4px solid blue;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-bottom: 5px;
  background-color: hsl(205, 89%, 93%);
}

#email-and-password {
  position: absolute;
  left: 30vw;
  top: 30vh;
  display: flex;
  flex-direction: column;
  width: 513px;
  border-top: 4px solid blue;
  border-left: 4px solid blue;
  border-right: 4px solid blue;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: hsl(205, 89%, 93%);
}

#information {
  position: absolute;
  left: 30vw;
  top: 58vh;
  display: flex;
  flex-direction: row;
  width: 513px;
  border-left: 4px solid blue;
  border-right: 4px solid blue;
  background-color: hsl(205, 89%, 93%);
}

#profile {
  position: absolute;
  left: 30vw;
  top: 68vh;
  display: flex;
  flex-direction: column;
  width: 513px !important;
  border-left: 4px solid blue;
  border-right: 4px solid blue;
  border-bottom: 4px solid blue;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: hsl(205, 89%, 93%);
}

#primary-photo-input-container {
  width: 30% !important;
  height: 40% !important;
  margin-top: 25px;
  margin-left: 29px;
}

#primary-photo-upload-icon {
  height: 30px;
}

#information input {
  margin-left: 25px;
  margin-top: 10px;
  width: 200px;
  height: 40px;
}

label {
  margin-top: 5px;
  margin-left: 5px;
  font-weight: 800;
  font-size: 12px;
}

#email {
  padding-left: 4px;
  margin-left: 25px;
  margin-right: 45px;
  margin-top: 15px;
  background-color: hsl(204, 42%, 95%);
  border-radius: 12px;
  height: 40px;
  width: 400px;
  font-size: 25px;
}

#password {
  padding-left: 4px;
  margin-left: 25px;
  margin-right: 45px;
  margin-top: 15px;
  background-color: hsl(204, 42%, 95%);
  border-radius: 12px;
  height: 40px;
  width: 400px;
  font-size: 25px;
}

#information label {
  position: relative;
  bottom: 4px;
}

#profile-pic {
  position: relative;
  left: 200px;
  bottom: 80px;
}

#information input {
  position: relative !important;
  right: 70px;
  margin-top: 25px;
  background-color: hsl(204, 42%, 95%);
  border-radius: 12px;
  font-size: 23px;
  padding-left: 4px;
  margin-bottom: 10px;
}

#confirmPassword {
  padding-left: 4px;
  margin-left: 25px;
  margin-right: 45px;
  margin-top: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  height: 40px;
  width: 400px;
  font-size: 25px;
  background-color: hsl(204, 42%, 95%);
}

#name-fields-input input {
  background-color: var(--theme-main-light);
  border-radius: 12px;
  height: 40px;
  width: 200px;
  font-size: 25px;
  background-color: hsl(204, 42%, 95%);
}

#name-field-first {
  padding-left: 4px;
  margin-left: 25px;
  margin-right: 45px;
  margin-top: 15px;
  margin-bottom: 20px;
}

#name-field-last {
  padding-left: 4px;
  margin-left: 10px;
  margin-right: 25px;
  margin-top: 10px;
}

#create-account {
  position: absolute;
  bottom: 10vh;
  left: 57vw;
}

#create-account button {
  margin-left: 10px;
  padding: 1px;
}
</style>
