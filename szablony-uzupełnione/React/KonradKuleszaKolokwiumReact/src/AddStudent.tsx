import axios from "axios";
import { useState } from "react";

type AddStudentProps = {
    onStudentAdded: () => void;
};

export const AddStudent = ({ onStudentAdded }: AddStudentProps) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [age, setAge] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5250/students", {
                name,
                surname,
                age,
            });

            console.log("Dodano studenta!");
            onStudentAdded();
            setName("");
            setSurname("");
            setAge(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Dodaj Studenta</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Imię"
                /> <br/>

                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Nazwisko"
                /> <br/>

                <input
                    type="number"
                    value={age}
                    onChange={(e) =>
                        setAge(e.target.value as unknown as number)
                    }
                    placeholder="Wiek"
                /> <br/>

                <button type="submit">Dodaj Studenta</button>
            </form>
        </div>
    );
};
