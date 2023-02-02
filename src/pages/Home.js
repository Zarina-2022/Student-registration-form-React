import React, { useEffect,useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import StudentsList from "../components/StudentsList";

const Home = () => {
    // ogrenci silme islemi onaylandiktan sonra home.js tekrar render yapmak icin:
    // ogrenci listesi StudentList'te oldugu icin once bu sayfada tanitacagiz(asagida) 
    const [didUpdate,setDidUpdate]=useState(false)
    // gelen veri'yi useState'in icine saklariz:
    const [students,setStudents]=useState(null)
    // axios'u (veri cekme vs. yapabilmek icin life-cycle (useEffect'e) ihtiyacimiz var)
    useEffect(() => {
        axios.get("http://localhost:3004/students")
            .then((res) => {
                setStudents(res.data)
             }) // gelen veri'yi useStatin icinde saklariz
            .catch((err) => { })
    }, [didUpdate])

    if(students === null) return null
    return (
        <div>
            <Header />
            <StudentsList students={students} didUpdate={didUpdate} setDidUpdate={setDidUpdate}/>
        </div>
    )
}

export default Home