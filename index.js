import * as firebase from 'firebase';
import { registerRootComponent } from 'expo';

import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyBT5txIBUdwywWahU8uIQ5x_-UmChn_1Y4",
  authDomain: "juno-86274.firebaseapp.com",
  databaseURL: "https://juno-86274.firebaseio.com",
  projectId: "juno-86274",
  storageBucket: "juno-86274.appspot.com",
  messagingSenderId: "385960885084",
  appId: "1:385960885084:web:04c923e14389b395951f99",
  measurementId: "G-L6GX2YT35C"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


