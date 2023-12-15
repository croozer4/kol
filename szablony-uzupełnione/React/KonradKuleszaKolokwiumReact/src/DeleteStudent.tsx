import axios from "axios"

type DeleteStudentProps={
    studentId:number;
    onStudentDeleted:()=>void;
}

export const DeleteStudent=({studentId, onStudentDeleted}:DeleteStudentProps) => {

    const deleteStudent = async() => {
        try{
            await axios.delete(`http://localhost:5250/students/${studentId}`)
            console.log("Usunięto studenta!")
            onStudentDeleted()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <button onClick={deleteStudent}>Usuń</button>
    )
}