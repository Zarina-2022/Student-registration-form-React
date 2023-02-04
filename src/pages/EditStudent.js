import React, {useEffect,useState} from "react";
import Header from "../components/Header";
// useParams url icindeki parametre'yi okumak icin use
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const EditStudent=()=>{
    // anasayfaya donmek icin:
    const navigate = useNavigate()
    //axios.get ile gelen veri icin:
    const [willEditStudent,setWillEditStudent]=useState(null)
    // input verileri icin:
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [grade, setGrade] = useState("");
    const [school, setSchool] = useState("");


    // Bu bir componentDidMount:
    useEffect(()=>{
        // burada da axios ile veriyi cekecegim (id'si bu olan ogrenciyi getir bana):
        axios.get(`http://localhost:3004/students/${params.studentId}`)
        .then((res)=>{
            // buraya cekilen veriyi useState'in icine koyuyoruz:
            setWillEditStudent(res.data)
            setName(res.data.name)
            setSurname(res.data.surname)
            setNumber(res.data.number)
            setGrade(res.data.grade)
            setSchool(res.data.school)
        })
        .catch((err)=>{})
    },[])
const handleSubmit=(event)=>{
    event.preventDefault()
    /* Validation */
    if (name === "" || surname === "" || number === "" || grade === "" || school === "") {
        alert("All fields are required.")
        return;
    }
    const editedStudent = {
        id: params.studentId,
        name: name,
        surname: surname,
        number: number,
        class: grade,
        school: school,
    };
    axios.put(`http://localhost:3004/students/${params.studentId}`,editedStudent)
    .then((res)=>{
        navigate("/"); 
    })
    .catch((err)=>{
        alert("An error occurred while updating.")
    })
}

    // eger students bos ise bos sayfa goster:
    const params = useParams()
    if(willEditStudent === null){
        return null
    }

    return(
        <div>
            <Header whichPage={"edit-student"}/>
            <div className="container my-5">
                <h1 className="text-center mb-5">Student Update Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label"><strong>Student's firstname:</strong></label>
                        <input type="text" className="form-control" id="firstName" placeholder="Zarina" value={name} onChange={(event)=>setName(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label"><strong>Student's surname:</strong></label>
                        <input type="text" className="form-control" id="surname" placeholder="Seker"  value={surname} onChange={(event)=>setSurname(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label"><strong>Student's number:</strong></label>
                        <input type="text" className="form-control" id="number" placeholder="40"  value={number} onChange={(event)=>setNumber(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grade" className="form-label"><strong>Student's grade:</strong></label>
                        <input type="text" className="form-control" id="grade" placeholder="6/C"  value={grade} onChange={(event)=>setGrade(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="school" className="form-label"><strong>Student's school:</strong></label>
                        <input type="text" className="form-control" id="school" placeholder="Zwijsen"  value={school} onChange={(event)=>setSchool(event.target.value)}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-danger w-50 my-4" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStudent