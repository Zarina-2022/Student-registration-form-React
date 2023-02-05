import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentDetail = () => {
    const params = useParams()
    const [student, setStudent] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3004/students/${params.studentId}`)
            .then((res) => {
                setStudent(res.data)
            })
            .catch((err) => { })
    }, [])
    // "erken kacis satiri" - eger ogrenci bilgisi henuz cekilmediyse, ekrana hicbir sey basilmasin
    if (student === null) return null
    /* veya:
    if(student === null) {
        return null
    }
    */

    return (
        <div>
            <Header whichPage={"student-detail"}/>
            <div className="container my-5 d-flex justify-content-center">
                <div className="card w-50 text-bg-warning">
                    <div className="card-header card-header-primary d-flex justify-content-between align-items-center">
                        <span>Student's information</span>
                        <Link to={"/"} className="badge bg-black text-warning px-3" style={{fontSize:"14px"}}>Back</Link>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b style={{marginRight:"37px"}} >Name :</b>{student.name}</li>
                        <li className="list-group-item"><b style={{marginRight:"15px"}}>Surname :</b>{student.surname}</li>
                        <li className="list-group-item"><b style={{marginRight:"20px"}}>Number :</b>{student.number}</li>
                        <li className="list-group-item"><b style={{marginRight:"38px"}}>Grade :</b>{student.class}</li>
                        <li className="list-group-item"><b style={{marginRight:"33px"}}>School :</b>{student.school}</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default StudentDetail