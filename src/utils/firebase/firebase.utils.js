import {initializeApp} from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth'
import {collection, doc, getDoc, getDocs, getFirestore, setDoc, query, writeBatch} from 'firebase/firestore'


class FireBaseApp {

    _firebaseConfig;
    _firebaseApp;

    constructor(config) {
        this._firebaseConfig = config;
        this._firebaseApp = initializeApp(this._firebaseConfig)
    }

    // get firebaseConfig() {
    //     return this._firebaseConfig;
    // }

    // get firebaseApp() {
    //     return this._firebaseApp;
    // }
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

    signInUserWithGooglePopUp() {
        return signInWithPopup(this._auth, this._provider);
    }

    async signInUserWithEmailAndPassword(email, password) {
        if (!email || !password) {
            return;
        }
        return await signInWithEmailAndPassword(this._auth, email, password)
    }

    async createAuthUserWithEmailAndPassword(email, password) {
        if (!email || !password) {
            return;
        }
        return await createUserWithEmailAndPassword(this._auth, email, password);
    }

    async signOutUser() {
        return await signOut(this._auth);
    }

     onUserAuthStateChanged(callback) {
        return onAuthStateChanged(this._auth, callback);
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
        const userDocRef =  await doc(this._firestore, 'users', userAuth.uid);

        // Document snapshot, allows to check if document exists
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            const {displayName, email} = userAuth;
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

    /*jshint node:true, unused:false */
    async addCollectionAndDocuments(collectionKey, objectsToAdd) {
        const collectionRef = collection(this._firestore, collectionKey)
        const batch = writeBatch(this._firestore);

        objectsToAdd.forEach((object) => {
            const docRef = doc(collectionRef, object.title.toLowerCase());
            batch.set(docRef, object);
        })

        await batch.commit();
        // console.log("Done!");
    }

    async getCategoriesAndDocuments() {

        // Create a collection ref and create a query out of it
        const collectionRef = collection(this._firestore, 'categories')
        const firebaseQuery = query(collectionRef);

        // Get a collection snapshot using query
        const collectionSnapshot = await getDocs(firebaseQuery);
        /*
             Map document to object structure
             {
                title: [
                    {},
                    {},
                    ...
                ]

             }
         */
        return collectionSnapshot.docs.map((docSnapshot) => docSnapshot.data());
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
