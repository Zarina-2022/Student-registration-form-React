import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";


const StudentsList = ({ students, didUpdate, setDidUpdate }) => {
    const [searchText, setSearchText] = useState("")
    const [radioInput, setRadioInput] = useState("nameAz")
    // bu stati cekilen tum verinin icinden istedigimizi filter yaparak ekrana basmak icin yazdik:
    // baslangiz degeri students cunku once db'ten tum verileri ceker, sonra icinden secer:
    const [filteredStudents, setFilteredStudents] = useState(students)

    const deleteStudent = (id) => {
        // kullanici onaylarsa silme islemi gerceklessin:
        if (window.confirm("Are you sure you want to delete?") === true) {
            // axios.delete("http://localhost:3004/students"+id) desek de calisir,
            axios.delete(`http://localhost:3004/students/${id}`)  // sektorde de boyle yazilir 
                .then(res => {
                    setDidUpdate(!didUpdate)
                })
                .catch(err => { })
        }
    }

    useEffect(() => {
        // componentDidMount ve componentDidUpdate
        //filter yapmak icin gecici bir dizi olusturuyoruz ve sonta bu diziyi set'e koyuyoruz 
        // amac: ogrenciyi okuluna or adina 0r soyadina or sinifina or numberine gore arayip bulmak:
        var tempArray = students.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) === true ||
            item.surname.toLowerCase().includes(searchText.toLowerCase()) ||
            item.number.includes(searchText) ||
            item.class.toLowerCase().includes(searchText.toLowerCase()) ||
            item.school.toLowerCase().includes(searchText.toLowerCase())
        );
        // once filtreliyor sonra alfabetik siraya (isme) gore yaziyor:
        if (radioInput === "nameAz") {
            tempArray = tempArray.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (radioInput === "nameZa") {
            tempArray = tempArray.sort((a, b) => b.name.localeCompare(a.name))
        }
        if (radioInput === "surnameAz") {
            tempArray = tempArray.sort((a, b) => a.surname.localeCompare(b.surname))
        }
        if (radioInput === "surnameZa") {
            tempArray = tempArray.sort((a, b) => b.name.localeCompare(a.surname))
        }

        setFilteredStudents(tempArray)
    }, [searchText, radioInput]); // ikisini de her degisiklikte bastan yaziyor  

    return (
        <div className="container">
            <div>
                <div className="d-flex justify-content-between mt-5">
                    <input
                        className="form-control w-75"
                        type="text"
                        placeholder="Enter the information of the student you want to search..."
                        value={searchText} // bu state'in icinde yeni gelen veriyi tutuyoruz
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                    <Link className="btn btn-primary w-25" to={"/add-student"}>Add student</Link>
                </div>

                <div onChange={(event) => setRadioInput(event.target.value)} className="d-flex justify-content-center my-2">
                    <div className="form-check mt-2">
                        <input className="form-check-input"
                            type="radio"
                            name="sort"
                            id="ascending"
                            value={"nameAz"}
                        />
                        <label className="form-check-label" htmlFor="ascending"> A-Z by student's name</label>
                    </div>

                    <div className="form-check mt-2 ms-5">
                        <input className="form-check-input"
                            type="radio"
                            name="sort"
                            id="descending"
                            value={"nameZa"}
                        />
                        <label className="form-check-label" htmlFor="descending"> Z-A by student's name</label>
                    </div>

                    <div className="form-check mt-2 ms-5">
                        <input className="form-check-input"
                            type="radio"
                            name="sort"
                            id="descending"
                            value={"surnameAz"}
                        />
                        <label className="form-check-label" htmlFor="descending"> A-Z by student's surname </label>
                    </div>

                    <div className="form-check mt-2 ms-5">
                        <input className="form-check-input"
                            type="radio"
                            name="sort"
                            id="descending"
                            value={"surnameZa"}
                        />
                        <label className="form-check-label" htmlFor="descending"> Z-A by student's surname</label>
                    </div>

                </div>
                <table className="table border table-hover mx-auto w-75">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col" className="w-25">Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.length === 0 ? (
                                <tr>
                                    <td className="text-center" colSpan={4}
                                        style={{ fontSize: "18px", color: "red" }}>
                                        There are no registered students.
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.length === 0 ? (
                                    <tr>
                                        <td className="text-center" colSpan={4}
                                            style={{ fontSize: "18px", color: "red" }}>
                                            There are no students in your search criteria
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student, index) => (
                                        <tr key={student.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{student.name}</td>
                                            <td>{student.surname}</td>

                                            <td className="w-25">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button onClick={() => deleteStudent(student.id)} type="button" className="btn btn-sm btn-danger">Delete</button>
                                                    <Link to={`/edit-student/${student.id}`} className="btn btn-sm btn-info">Edit</Link>
                                                    <Link to={`/student-detail/${student.id}`} className="btn btn-sm btn-secondary">Detail</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentsList;


/*
Filter ve map ayni islemi yapiyor: gelen veriyi bir dizinin icine koyuyor.
Ama bir fark var:
    - map() yrni bir dizi olusturup geri donduruyor
    - filter(), yazilan kosul true ise gecici degiskenin icine koyuyor veriyi, false ise es geciyor.
*/

/*

//input-radio'larda onchange parent divin icine konulur:

<div onChange={(event) => setRadioInput(event.target.value)}>
    <div className="form-check mt-2">
        <input className="form-check-input"
            type="radio"
            name="sort"
            id="ascending"
            value={"nameAz"}
            />
        <label className="form-check-label" htmlFor="ascending"> A-Z </label>
    </div>
    <div className="form-check mb-4">
        <input className="form-check-input"
            type="radio"
            name="sort"
            id="descending"
            value={"nameZa"}
            />
        <label className="form-check-label" htmlFor="descending"> Z-A </label>
    </div>
</div>
*/