const loginButtonElement = document.querySelector('.login-button-js');
const studentIdInputElement = document.querySelector('.studentid-input-js')

loginButtonElement.addEventListener('click', () => {
    const studentId = studentIdInputElement.value;
    studentIdInputElement.value = ''

    document.querySelector('.leaderboard').textContent = studentId;
    // if (studentId.length = 7 & !isNaN(studentId)) {

    // }
})