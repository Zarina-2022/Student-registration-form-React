import React from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const StudentsList = ({ students, didUpdate, setDidUpdate }) => {
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
    return (
        <div>
            <div className="d-flex justify-content-end align-items-center my-5 me-5 pe-5">
                <Link className="btn btn-success" to={"/add-student"}>Add student</Link>
            </div>
            <table className="table table-dark table-hover mx-auto w-75">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Number</th>
                        <th scope="col">Grade</th>
                        <th scope="col">School</th>
                        <th scope="col">Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.length === 0 ? (
                            <tr>
                                <td className="text-center" colSpan={7} style={{ fontSize: "18px" }}>There are no registered students.</td>
                            </tr>
                        ) : (
                            <>
                                {
                                    students.map((student, index) => (
                                        <tr key={student.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{student.name}</td>
                                            <td>{student.surname}</td>
                                            <td>{student.number}</td>
                                            <td>{student.class}</td>
                                            <td>{student.school}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button onClick={() => deleteStudent(student.id)} type="button" className="btn btn-sm btn-outline-danger">Delete</button>
                                                    <Link to={`/edit-student/${student.id}`} className="btn btn-sm btn-outline-info">Edit</Link>
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
    )
}

export default StudentsList;