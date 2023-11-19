import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import {
    getFirestore, collection, getDocs,
    addDoc, setDoc, doc, updateDoc, increment, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Your web app's Firebase configuration
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();



// Sign in and sign out
const signInButton = document.querySelector('.sign-in-button-js');
const signOutButton = document.querySelector('.sign-out-button-js');

const userSignIn = async() => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;

        const userName = user.displayName;
        const userEmail = user.email;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

const userSignOut = async() => {
    signOut(auth).then(() => {
        alert("You have signed out successfully!")
    }).catch((error) => {})
}

onAuthStateChanged(auth, (user) => {
    if(user) {
        // alert("You have signed in!")
        window.location.href = "/leaderboard.html"
    } else {
        // Signed out
    }
})

signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);



// Adding JSON data into firestore

const db = getFirestore();

async function fetchFirestoreData() {
    let dataJSON;
     await fetch('./firebase/data.json')
        .then(response => response.json())
        .then(json => {
            dataJSON = json;
        });
    return dataJSON;
}

async function setFirestore() {
    const students = await fetchFirestoreData();
        
    for (const i in students) {
        const student = students[i];
        const docRef = doc(db, 'studentId', student.studentId.toString());

        await setDoc(docRef, {
            class: student.Class,
            cno: student.CNO,
            cname: student.CName,
            ename: student.EName,
            committee: student.Committee
        }, { merge: true }).then(() => {
            console.log("Document has been added successfully");
        })
        .catch((error) => {
            console.log(error);
        })

        await updateDoc(docRef, {
            points: increment(parseInt(student.Points))
        }).then(() => {
            console.log("Points have been updated successfully");
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

async function deleteData() {
    const students = await fetchFirestoreData();

    for (const i in students) {
        const student = students[i];
        const docRef = doc(db, 'studentId', student.studentId.toString());
        deleteDoc(docRef).then(() => {
            console.log("Deleted successfully.")
        });
    }
}

// deleteData()
// setFirestore()