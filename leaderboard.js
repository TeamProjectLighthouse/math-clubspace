import { userName, userEmail } from '/login.js';
import { getFirestore, doc, getDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

console.log(userEmail)
const userStudentId = userEmail.split("@")[0];

console.log(userStudentId);

const db = getFirestore();

const docRef = doc(db, 'studentId', user)