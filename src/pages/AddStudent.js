import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const navigate = useNavigate();
    // her bir input icin useState olusturacagiz; ordan gelen veri'yi icinde saklamak icin
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [grade, setGrade] = useState("");
    const [school, setSchool] = useState("");
    const [students, setStudents] = useState(null)

    const handleSaveBtn = (event) => {
        event.preventDefault()
        // validation
        if (name === "" || surname === "" || number === "" || grade === "" || school === "") {
            alert("All fields are required.")
            return;
        }

        const hasStudent=students.find(item=>item.number === number && item.school === school)
        if(hasStudent !== undefined){
            // alert(`Another student has been registered with number ${number} `) // sadece number daha once kayitli ise kayit etmez
            alert(`Another student with the number ${number} has already been registered at school ${school} `) // kayit ederken hem okul hem number daha once kayitli ise kayit etmez
            return
        }
        
        const newStudent = {
            id: String(new Date().getTime()),
            name: name,
            surname: surname,
            number: number,
            class: grade,
            school: school,
        };
        axios.post("http://localhost:3004/students", newStudent)
            .then((res) => {
                navigate("/"); // veriler api'ye gonderildikten sonra ana sayfaya navigate ile don
            })
            .catch((err) => { })
    };
    // Yeni kayit ogrencinin numberi daha onceki og.number'ler ile kiyaslanacak (ayni no var mi diye):
    useEffect(() => {
        axios.get("http://localhost:3004/students")
            .then((res) => {
                setStudents(res.data)
            })
            .catch((err) => { })
    }, [])

    if (students === null){
        return null
    } 

    return (
        <div>
            <Header whichPage={"add-student"}/>
            <div className="container my-5">
            <h1 className="text-center mb-5">Add New Student Page</h1>
                <form onSubmit={handleSaveBtn}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label"><strong>Student's firstname:</strong></label>
                        <input type="text" className="form-control" id="firstName" placeholder="Zarina" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label"><strong>Student's surname:</strong></label>
                        <input type="text" className="form-control" id="surname" placeholder="Seker" value={surname} onChange={(event) => setSurname(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label"><strong>Student's number:</strong></label>
                        <input type="text" className="form-control" id="number" placeholder="40" value={number} onChange={(event) => setNumber(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grade" className="form-label"><strong>Student's grade:</strong></label>
                        <input type="text" className="form-control" id="grade" placeholder="6/C" value={grade} onChange={(event) => setGrade(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="school" className="form-label"><strong>Student's school:</strong></label>
                        <input type="text" className="form-control" id="school" placeholder="Zwijsen" value={school} onChange={(event) => setSchool(event.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-success w-50 my-4" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudent