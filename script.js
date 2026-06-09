const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        var usernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{6,15}$/;
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
        for (var i = 0; i < users.length; i++) {
            if (users[i].username.toLowerCase() === username.toLowerCase()) {
                alert("Username already exists. Please choose another username.");
                return;
            }
        }
        for (var i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() === email.toLowerCase()) {
                alert("Email already registered.");
                return;
            }
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
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
        var found = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                found = true;
                break;
            }
        }
        if (found) {
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
        var rollPattern = /^[0-9]{4}$/;
        var cgpaPattern = /^(10(\.0)?|[0-9](\.[0-9])?)$/;
        var branchPattern = /^[A-Z]{2,10}$/;
        if (!rollPattern.test(document.getElementById("roll").value)) {
            alert("Roll number must contain only digits (4 digits).");
            return;
        }
        if (!cgpaPattern.test(document.getElementById("cgpa").value)) {
            alert("CGPA must be between 0.0 and 10.0");
            return;
        }
        if (!branchPattern.test(document.getElementById("branch").value)) {
            alert("Branch must contain only uppercase letters (e.g., CSE, ECE, IT).");
            return;
        }
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
        var rollPattern = /^[0-9]{4}$/;
        var cgpaPattern = /^(10(\.0)?|[0-9](\.[0-9])?)$/;
        var branchPattern = /^[A-Z]{2,10}$/;
        var roll = document.getElementById("roll").value;
        var cgpa = document.getElementById("cgpa").value;
        var branch = document.getElementById("branch").value;
        if (!rollPattern.test(roll)) {
            alert("Roll number must contain exactly 4 digits.");
            return;
        }
        if (!cgpaPattern.test(cgpa)) {
            alert("CGPA must be between 0.0 and 10.0");
            return;
        }
        if (!branchPattern.test(branch)) {
            alert("Branch must contain only uppercase letters (CSE, ECE, IT).");
            return;
        }
        students[index] = {
            name: document.getElementById("name").value,
            roll: roll,
            branch: branch,
            cgpa: cgpa
        };
        localStorage.setItem("students", JSON.stringify(students));
        window.location.href = "view_students.html";
    });
}