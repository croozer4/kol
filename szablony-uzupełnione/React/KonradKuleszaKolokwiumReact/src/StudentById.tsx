import { useState } from "react"
import { Student } from "./Student.model";
import axios from "axios";

export const StudentById = () => {
    const [studentId, setStudentId] = useState<number>(0);

    const [student, setStudent] = useState<Student>();

    const handleSearch = async () => {
        try {
            const response = await axios.get<Student>(`http://localhost:5250/students/${studentId}`);
            setStudent(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h2>Wyszukiwanie studenta</h2>

            <input type="number" value={studentId} onChange={(e) => setStudentId(e.target.value as unknown as number)} />

            <button onClick={handleSearch}>Szukaj</button>
            <br />
            {student && (
                <div>
                    <p>{student.name}</p>
                    <p>{student.surname}</p>
                    <p>{student.age}</p>
                </div>
            )}
        </div>
    )
}