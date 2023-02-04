import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const StudentsList = ({ students, didUpdate, setDidUpdate }) => {
    const [searchText, setSearchText] = useState("")
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
        const tempArray = students.filter((item)=>
            item.name.toLowerCase().includes(searchText.toLowerCase()) === true || 
            item.surname.toLowerCase().includes(searchText.toLowerCase()) ||
            item.number.includes(searchText) ||
            item.class.toLowerCase().includes(searchText.toLowerCase()) ||
            item.school.toLowerCase().includes(searchText.toLowerCase())
            );
        setFilteredStudents(tempArray)
    }, [searchText])

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-end align-items-center my-5 me-5 pe-5">
                    <div className="w-100 ms-5">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter the information of the student you want to search..."
                            value={searchText} // bu state'in icinde yeni gelen veriyi tutuyoruz
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                    </div>
                    <Link className="btn btn-primary w-25" to={"/add-student"}>Add student</Link>
                </div>
                <table className="table border table-hover mx-auto w-75">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.length === 0 ? (
                                <tr>
                                    <td className="text-center" colSpan={7} style={{ fontSize: "18px",color:"red"}}>There are no registered students.</td>
                                </tr>
                            ) : (
                                <>
                                    {
                                        filteredStudents.map((student, index) => (
                                            <tr key={student.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{student.name}</td>
                                                <td>{student.surname}</td>
                                              
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <button onClick={() => deleteStudent(student.id)} type="button" className="btn btn-sm btn-danger">Delete</button>
                                                        <Link to={`/edit-student/${student.id}`} className="btn btn-sm btn-info">Edit</Link>
                                                        <Link to={"/"} className="btn btn-sm btn-secondary">Detail</Link>
                                                    </div>

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </>
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
    <th scope="col">Number</th>
    <th scope="col">Grade</th>
    <th scope="col">School</th>
*/

/*
<td>{student.number}</td>
<td>{student.class}</td>
<td>{student.school}</td>
*/