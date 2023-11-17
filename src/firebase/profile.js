import { reactive, watch } from "vue";
import { app } from "@/firebase/configuration";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);
const profile = reactive({
  uid: null,
  displayName: null,
  photoURL: null,
  phoneNumber: null,
  email: null
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    profile.uid = user.uid;
    profile.displayName = user.displayName;
    profile.photoURL = user.photoURL;
    profile.phoneNumber = user.phoneNumber;
    profile.email = user.email;
  }
});

const useProfile = () => {
  watch(profile, () => {
    return profile;
  });
};

export { useProfile };
