import firebase, { firestore } from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHqjICFt71H483JxyBxaEWO4BSpx4MsdE",
    authDomain: "todoo-e80f1.firebaseapp.com",
    projectId: "todoo-e80f1",
    storageBucket: "todoo-e80f1.appspot.com",
    messagingSenderId: "55066731649",
    appId: "1:55066731649:web:72e70ba7d0ec553899d980"
    
}

class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onIdTokenChanged(user => {
            if (user) {
                callback(null, user)

            } else {
                firebase 
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
                
            }
        });
    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");
        
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }
}


export default Fire;