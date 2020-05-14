import firebase from 'firebase';

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBT5txIBUdwywWahU8uIQ5x_-UmChn_1Y4",
                authDomain: "juno-86274.firebaseapp.com",
                databaseURL: "https://juno-86274.firebaseio.com",
                projectId: "juno-86274",
                storageBucket: "juno-86274.appspot.com",
                messagingSenderId: "385960885084",
                appId: "1:385960885084:web:04c923e14389b395951f99",
                measurementId: "G-L6GX2YT35C"
            });
        }
    };

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({message}) {
                alert(message);
            }
        }
    };

    get uid() {
      return (firebase.auth().currentUser || {}).uid;
    }


}

Fire.shared = new Fire();
export default Fire;