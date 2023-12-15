import axios from "axios";
import { useState } from "react";
import { Student } from "./Student.model";

type EditStudentProps = {
    student: Student;
    onStudentUpdates: () => void;
};

export const EditStudent = ({
    student,
    onStudentUpdates,
}: EditStudentProps) => {
    const [name, setName] = useState(student.name);
    const [surname, setSurname] = useState(student.surname);
    const [age, setAge] = useState(student.age);
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5250/students/${student.id}`, {
                name,
                surname,
                age,
            });

            console.log("Edycja studenta");
            onStudentUpdates();
            setIsEditing(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />{" "}
                    <br />
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <br />
                    <input
                        type="number"
                        value={age}
                        onChange={(e) =>
                            setAge(e.target.value as unknown as number)
                        }
                    />
                    <br />
                    <button type="submit">Zapisz</button>
                    <button onClick={() => setIsEditing(false)}>Anuluj</button>
                </form>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edytuj</button>
            )}
        </div>
    );
};
