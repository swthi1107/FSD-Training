var express=require("express");
const fs=require("fs")
const app=express();
app.use(express.json());

function getStudents(){
    const data=fs.readFileSync("students.json","utf8");
    if (!data.trim())
            return [];
    return JSON.parse(data);

}

function saveStudents(students){
    fs.writeFileSync(
        "students.json",
        JSON.stringify(students, null, 2)
    );
}

app.get("/",(req,res)=>{
    res.json(getStudents());
});

app.get("/students/:id",(req,res)=>{
    const students=getStudents();
    const id=parseInt(req.params.id);
    const student=students.find(s=>s.id===id);
    if(!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    res.json(student);
});

app.post("/students",(req,res)=>{
    const students=getStudents();
    const body=req.body;
    const id=
        students.length>0
            ? students[students.length-1].id+1
            : 1;
    const newStudent={
        id,
        ...body
    };
    students.push(newStudent);
    saveStudents(students);
    res.status(201).json({
        message:"Added Successfully"
    });
})

app.put("/students/:id", (req, res) => {
    const students = getStudents();
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    students[index] = {
        ...students[index],
        ...req.body,
        id
    };
    saveStudents(students);
    res.json(students[index]);
});

app.delete("/students/:id", (req, res) => {
    const students = getStudents();
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }
    const deletedStudent = students.splice(index, 1);
    saveStudents(students);
    res.json({
        message: "Student deleted",
        student: deletedStudent[0]
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});