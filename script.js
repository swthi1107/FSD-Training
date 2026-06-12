const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const usernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^[a-zA-Z0-9!@#$%^&_*]{6,15}$/;
        if (!usernamePattern.test(username)) {
            alert("Username must be 3-15 characters and contain only letters, numbers, and underscores.");
            return;
        }
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!passwordPattern.test(password)) {
            alert("Password must be between 6 to 15 characters and contain only numbers, letters, and some special characters.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        const response = await fetch("http://localhost:3001/users");
        const users = await response.json();
        if (users.find(user => user.username.toLowerCase() === username.toLowerCase())) {
            alert("Username already exists. Please choose another username.");
            return;
        }

        if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) {
            alert("Email already registered.");
            return;
        }
        await fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
        // alert("Registration Successful! Please login.");
        // window.location.href = "login.html";
        document.getElementById("successMessage").textContent ="Registration Successful! Please login.";
        setTimeout(() => {window.location.href = "login.html";}, 150);
    });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const response = await fetch("http://localhost:3001/users");
        const users = await response.json();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", username);
            alert("Login Successful");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Username or Password");
        }
    });
}

const addStudentForm = document.getElementById("addStudentForm");
if (addStudentForm) {
    addStudentForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const student = {
            name: document.getElementById("name").value,
            roll: document.getElementById("roll").value,
            branch: document.getElementById("branch").value,
            cgpa: document.getElementById("cgpa").value
        };
        const rollPattern = /^[0-9]{4}$/;
        const cgpaPattern = /^(10(\.0)?|[0-9](\.[0-9])?)$/;
        const branchPattern = /^[A-Z]{2,10}$/;
        if (!rollPattern.test(student.roll)) {
            alert("Roll number must contain exactly 4 digits.");
            return;
        }
        if (!branchPattern.test(student.branch)) {
            alert("Branch must contain only uppercase letters (e.g., CSE, ECE, IT).");
            return;
        }
        if (!cgpaPattern.test(student.cgpa)) {
            alert("CGPA must be between 0.0 and 10.0");
            return;
        }
        await fetch("http://localhost:3001/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });
        window.location.href = "view_students.html";
    });
}

const studentTable = document.getElementById("studentTable");
if (studentTable) {
    loadStudents();
}
async function loadStudents() {
    const response = await fetch("http://localhost:3001/students");
    const students = await response.json();
    studentTable.innerHTML = "";
    students.forEach(student => {
        studentTable.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.branch}</td>
            <td>${student.cgpa}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }
    await fetch(`http://localhost:3001/students/${id}`, {
        method: "DELETE"
    });
    loadStudents();
}

function editStudent(id) {
    localStorage.setItem("editId", id);
    window.location.href = "edit_student.html";
}

const editForm = document.getElementById("editForm");
if (editForm) {
    loadStudent();
    editForm.addEventListener("submit", updateStudent);
}

async function loadStudent() {
    const id = localStorage.getItem("editId");
    const response = await fetch(
        `http://localhost:3001/students/${id}`
    );
    const student = await response.json();
    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("branch").value = student.branch;
    document.getElementById("cgpa").value = student.cgpa;
}

async function updateStudent(e) {
    e.preventDefault();
    const id = localStorage.getItem("editId");
    const roll = document.getElementById("roll").value;
    const cgpa = document.getElementById("cgpa").value;
    const branch = document.getElementById("branch").value;
    const rollPattern = /^[0-9]{4}$/;
    const cgpaPattern = /^(10(\.0)?|[0-9](\.[0-9])?)$/;
    const branchPattern = /^[A-Z]{2,10}$/;

    if (!rollPattern.test(roll)) {
        alert("Roll number must contain exactly 4 digits.");
        return;
    }
    if (!branchPattern.test(branch)) {
        alert("Branch must contain only uppercase letters (e.g., CSE, ECE, IT).");
        return;
    }
    if (!cgpaPattern.test(cgpa)) {
        alert("CGPA must be between 0.0 and 10.0");
        return;
    }
    await fetch(`http://localhost:3001/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: Number(id),
            name: document.getElementById("name").value,
            roll,
            branch,
            cgpa
        })
    });
    window.location.href = "view_students.html";
}