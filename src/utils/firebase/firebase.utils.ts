import {initializeApp} from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut, User,
} from 'firebase/auth'
import {collection, doc, getDoc, getDocs, getFirestore, setDoc, query, writeBatch, QueryDocumentSnapshot} from 'firebase/firestore'
import {Category} from "../../store/categories/categories.types";


class FireBaseApp {

    _firebaseConfig;
    _firebaseApp;

    constructor(config: any) {
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

    constructor(auth: any, provider: any) {
        this._provider = provider;
        this._provider.setCustomParameters({
            prompt: "select_account"
        })
        this._auth = auth
    }

    signInUserWithGooglePopUp() {
        return signInWithPopup(this._auth, this._provider);
    }

    async signInUserWithEmailAndPassword(email: string, password: string) {
        if (!email || !password) {
            return;
        }
        return await signInWithEmailAndPassword(this._auth, email, password)
    }

    async createAuthUserWithEmailAndPassword(email: string, password: string) {
        if (!email || !password) {
            return;
        }
        return await createUserWithEmailAndPassword(this._auth, email, password);
    }

    async signOutUser() {
        return await signOut(this._auth);
    }

     onUserAuthStateChanged(callback: any) {
        return onAuthStateChanged(this._auth, callback);
    }

    getCurrentUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(
                this._auth,
                (userAuth) => {
                    unsubscribe();
                    if (userAuth) {
                        resolve(userAuth);
                    }
                },
                // Optional callback in case of error
                reject
            )
        })
    }
}

export type ObjectToAdd = {
    title: string;
}

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

class FireBaseRepository {

    _firestore;

    constructor(firestore: any) {
        this._firestore = firestore;
    }

    // func(arg = {}) sets default value
    async createUserDocumentFromAuth(
        userAuth: any,
        additionalData = {} as AdditionalInformation
    ): Promise<void | QueryDocumentSnapshot<UserData>> {
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

        return userSnapshot as QueryDocumentSnapshot<UserData>;
    }

    /*jshint node:true, unused:false */
    async addCollectionAndDocuments<T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> {
        const collectionRef = collection(this._firestore, collectionKey)
        const batch = writeBatch(this._firestore);

        objectsToAdd.forEach((object) => {
            const docRef = doc(collectionRef, object.title.toLowerCase());
            batch.set(docRef, object);
        })

        await batch.commit();
        // console.log("Done!");
    }

    async getCategoriesAndDocuments() : Promise<Category[]> {

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
        return collectionSnapshot
            .docs
            .map((docSnapshot) => docSnapshot.data() as Category);
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
