import firebase from "firebase/app";
import '@firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyANSyKlmSsngY8RIpKQ4pZxNy7JIEkCUEI",
    authDomain: "push-notification-430da.firebaseapp.com",
    projectId: "push-notification-430da",
    storageBucket: "push-notification-430da.appspot.com",
    messagingSenderId: "618709941132",
    appId: "1:618709941132:web:deef5e0f880baba3acb4a9",
    measurementId: "G-HFCB4KXYW8"
};

firebase.initializeApp(firebaseConfig)

export const message = firebase.messaging()


export default firebase