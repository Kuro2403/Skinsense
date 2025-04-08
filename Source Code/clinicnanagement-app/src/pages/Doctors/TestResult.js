import * as React from 'react'
import Header from "../components/Doctors/Header"
import { BodyContent } from '../components/Doctors/Body_TestResult';
import Footer from '../components/Doctors/Footer';

const TestResult = () => {
    return (
        <div>
            <Header />
            <BodyContent />
            <Footer />
        </div>
    )
}

export default TestResult;