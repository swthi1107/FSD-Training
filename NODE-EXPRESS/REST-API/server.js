const http = require("http");
const fs = require("fs");

const PORT = 3000;
const FILE = "students.json";

function getStudents() {
    const data = fs.readFileSync(FILE, "utf8");
    return JSON.parse(data);
}

function saveStudents(students) {
    fs.writeFileSync(FILE, JSON.stringify(students, null, 2));
}

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/students") {
        const students = getStudents();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students));
    }

    else if (req.method === "POST" && req.url === "/students") {
        let body = "";
        req.on("data", chunk => {body += chunk;});
        req.on("end", () => {
            const student = JSON.parse(body);
            const students = getStudents();
            const newStudent = {
                id: students.length > 0
                    ? students[students.length - 1].id + 1
                    : 1,
                ...student
            };
            students.push(newStudent);
            saveStudents(students);
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "Student Added Successfully",
                student: newStudent
            }));
        });
    }

    else if (req.method === "PUT" && req.url.startsWith("/students/")) {
        const id = parseInt(req.url.split("/")[2]);
        let body = "";
        req.on("data", chunk => {body += chunk.toString();});
        req.on("end", () => {
            const updatedData = JSON.parse(body);
            const students = getStudents();
            const index = students.findIndex(s => s.id === id);
            if (index === -1) {
                res.writeHead(404);
                return res.end("Student not found");
            }
            students[index] = { ...students[index], ...updatedData };
            saveStudents(students);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message: "Student Updated successfully",
                student: students[index]
            }));
        });
    }

    else if (req.method === "DELETE" && req.url.startsWith("/students/")) {
        const id = parseInt(req.url.split("/")[2]);
        let students = getStudents();
        const filtered = students.filter(s => s.id !== id);
        if (filtered.length === students.length) {
            res.writeHead(404);
            return res.end("Student not found");
        }
        saveStudents(filtered);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            message: "Student Deleted Successfully"
        }));
    }

    else {
        res.writeHead(404);
        res.end("Route Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});