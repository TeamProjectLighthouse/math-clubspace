import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';
import firebaseConfig from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const userFullName = localStorage.getItem('userName');
const userEmail = localStorage.getItem('userEmail');
const userStudentId = userEmail.split("@")[0];
const index = userFullName.indexOf(' ', userFullName.indexOf(' ') + 1)

const docRef = doc(db, 'studentId', userStudentId)
const docSnap = await getDoc(docRef);

let userData;

if (docSnap.exists()) {
    userData = docSnap.data();
} else {
    userData = {
        ename: userFullName.substring(index + 1),
        class: userFullName.substring(0, index).split(' ')[0],
        cno: userFullName.substring(0, index).split(' ')[1],
        points: 0
    }
}

document.querySelector('.name-js').innerHTML = userData.ename;
document.querySelector('.points-js').innerHTML = userData.points;

console.log(userData);