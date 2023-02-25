import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth'
import {doc, getDoc, setDoc, getFirestore} from 'firebase/firestore'


class FireBaseApp {

    _firebaseConfig;
    _firebaseApp;

    constructor(config) {
        this._firebaseConfig = config;
        this._firebaseApp = initializeApp(this._firebaseConfig)
    }

    get firebaseConfig() {
        return this._firebaseConfig;
    }

    get firebaseApp() {
        return this._firebaseApp;
    }
}

class FireBaseAuth {

    _provider;
    _auth;

    constructor(auth, provider) {
        this._provider = provider;
        this._provider.setCustomParameters({
            prompt: "select_account"
        })
        this._auth = auth
    }

    signInWithGooglePopUp() {
        return signInWithPopup(this._auth, this._provider);
    }

    async createAuthUserWithEmailAndPassword(email, password) {
        if (!email || !password) {
            return;
        }
        return await createUserWithEmailAndPassword(this._auth, email, password);
    }
}

class FireBaseRepository {

    _firestore;

    constructor(firestore) {
        this._firestore = firestore;
    }

    // func(arg = {}) sets default value
    async createUserDocumentFromAuth(userAuth, additionalData = {}) {
        if (!userAuth) {
            return;
        }

        // Document reference
        const userDocRef =  await doc(this._firestore, 'users', userAuth.user.uid);

        // Document snapshot, allows to check if document exists
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            const {displayName, email} = userAuth.user;
            const createdAt = new Date();

            try {
                // Saves document based on ref and the data
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            } catch (error) {
                console.log("Error creating user", error)
            }
        }

        return userDocRef;
    }
}


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm2wSbs04gx35icZReyWNqNbSMZLVKpbU",
    authDomain: "crawn-clothing-db-f0c62.firebaseapp.com",
    projectId: "crawn-clothing-db-f0c62",
    storageBucket: "crawn-clothing-db-f0c62.appspot.com",
    messagingSenderId: "240922986876",
    appId: "1:240922986876:web:53e3cfcf8c42f6ffdf3cf9"
};


// Init App
new FireBaseApp(firebaseConfig);

export const fireBaseAuth = new FireBaseAuth(getAuth(), new GoogleAuthProvider());
export const fireStoreRepo = new FireBaseRepository(getFirestore());
