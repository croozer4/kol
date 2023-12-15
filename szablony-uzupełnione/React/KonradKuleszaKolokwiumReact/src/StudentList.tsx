import axios from "axios";
import { useEffect, useState } from "react";
import { Student } from "./Student.model";
import { AddStudent } from "./AddStudent";
import { EditStudent } from "./EditStudent";
import { DeleteStudent } from "./DeleteStudent";
import { StudentById } from "./StudentById";

export const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);

    const loadStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5250/students");
            setStudents(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <div>
            <h1>Student List:</h1>

            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.name} {student.surname} {student.age}
                        <EditStudent
                            onStudentUpdates={loadStudents}
                            student={student}
                        ></EditStudent>
                        <DeleteStudent studentId={student.id} onStudentDeleted={loadStudents}></DeleteStudent>
                    </li>
                ))}
            </ul>

            <AddStudent onStudentAdded={loadStudents}></AddStudent>

            <StudentById></StudentById>
        </div>
    );
};
