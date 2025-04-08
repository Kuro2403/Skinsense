import * as React from 'react'
import Header from "../components/Doctors/Header"
import Body from '../components/Doctors/Body_ViewAllAppointment';
import Footer from '../components/Doctors/Footer';

const ViewAllAppointment = () => {
    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    )
}

export default ViewAllAppointment;