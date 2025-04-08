import * as React from 'react'
import Header from "../components/Clients/Header"
import { BodyContent, PrescriptionContent } from "../components/Clients/Body_MedicalRecord_Details"
import Footer from "../components/Clients/Footer"

export const MedicalRecordDetails = () => {
    return (
        <div>
            <Header />
            <BodyContent />
            <Footer />
        </div>
    )
}
export const PrescriptionDetails = () => {
    return (
        <div>
            <Header />
            <PrescriptionContent />
            <Footer />
        </div>
    )
}