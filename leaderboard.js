import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';
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
    let regex = /^[a-zA-Z]+$/; 
    if (regex.test(userFullName)) {
        userData = {
            ename: userFullName,
            class: userFullName.substring(0, index).split(' ')[0],
            cno: userFullName.substring(0, index).split(' ')[1],
            points: 0
        }
    } else {
        userData = {
            ename: userFullName.substring(index + 1),
            class: userFullName.substring(0, index).split(' ')[0],
            cno: userFullName.substring(0, index).split(' ')[1],
            points: 0
        }
    }
}

document.querySelector('.name-js').innerHTML = userData.ename;
document.querySelector('.points-js').innerHTML = userData.points;

let leaderboard = [];
const q = query(collection(db, 'studentId'), where('committee', '==', false));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data());
})
leaderboard = leaderboard.sort((a,b) => b.points-a.points);
console.log(leaderboard)
let yourRank;
if (leaderboard.findIndex(x=> x.ename === userData.ename) == '-1') {
    yourRank = leaderboard.length;
} else {
    yourRank = leaderboard.findIndex(x=> x.ename === userData.ename);
}


document.querySelector('.rank-js').innerHTML = yourRank;

let counter1 = 0;
document.querySelectorAll('.info-name').forEach((name) => {
    name.innerHTML = leaderboard[counter1].ename;
    counter1 ++;
})

let counter2 = 0;
document.querySelectorAll('.info-points').forEach((points) => {
    points.innerHTML = leaderboard[counter2].points;
    counter2 ++;
})