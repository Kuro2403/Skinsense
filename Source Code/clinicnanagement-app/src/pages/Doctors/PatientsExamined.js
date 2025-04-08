import * as React from 'react'
import Header from "../components/Doctors/Header"
import Body from '../components/Doctors/Body_PatientsExamined';
import Footer from '../components/Doctors/Footer';

const PatientsExamined = () => {
    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    )
}

export default PatientsExamined;