const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.username.toLowerCase() === username.toLowerCase());
        if (existingUser) {
            alert("Username already exists. Please choose another username.");
            return;
        }
        const existingEmail = users.find(user => user.email.toLowerCase() === email.toLowerCase());
        if (existingEmail) {
            alert("Email already registered.");
            return;
        }
        users.push({
            username,
            email,
            password
        });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration Successful! Please login.");
        window.location.href = "login.html";
    });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", username);
            alert("Login Successful! Welcome, " + username + "!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Username or Password!");
        }
    });
}

if (!localStorage.getItem("students")) {
    const defaultStudents = [
        {
            name: "Rahul Sharma",
            roll: "0501",
            branch: "CSE",
            cgpa: "8.7"
        },
        {
            name: "Priya Reddy",
            roll: "0502",
            branch: "CSE",
            cgpa: "9.1"
        },
        {
            name: "Arjun Kumar",
            roll: "0703",
            branch: "ECE",
            cgpa: "8.4"
        },
        {
            name: "Sneha Patel",
            roll: "3204",
            branch: "IT",
            cgpa: "9.3"
        },
        {
            name: "Vikram Singh",
            roll: "6605",
            branch: "MECH",
            cgpa: "8.0"
        }
    ];
    localStorage.setItem("students", JSON.stringify(defaultStudents));
}
const addStudentForm = document.getElementById("addStudentForm");
if (addStudentForm) {
    addStudentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const student = {
            name: document.getElementById("name").value,
            roll: document.getElementById("roll").value,
            branch: document.getElementById("branch").value,
            cgpa: document.getElementById("cgpa").value
        };
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));
        window.location.href = "view_students.html";
    });
}

const studentTable = document.getElementById("studentTable");
if (studentTable) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    studentTable.innerHTML = "";
    students.forEach((student, index) => {
        studentTable.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.branch}</td>
            <td>${student.cgpa}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        location.reload();
    }
}

function editStudent(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "edit_student.html";
}

const editForm = document.getElementById("editForm");
if (editForm) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let index = localStorage.getItem("editIndex");
    if (index !== null) {
        document.getElementById("name").value = students[index].name;
        document.getElementById("roll").value = students[index].roll;
        document.getElementById("branch").value = students[index].branch;
        document.getElementById("cgpa").value = students[index].cgpa;
    }
    editForm.addEventListener("submit", function (e) {
        e.preventDefault();
        students[index] = {
            name: document.getElementById("name").value,
            roll: document.getElementById("roll").value,
            branch: document.getElementById("branch").value,
            cgpa: document.getElementById("cgpa").value
        };
        localStorage.setItem("students", JSON.stringify(students));
        window.location.href = "view_students.html";
    });
}