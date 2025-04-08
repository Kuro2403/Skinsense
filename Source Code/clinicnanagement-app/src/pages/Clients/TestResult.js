import * as React from 'react';
import Header from '../components/Clients/Header';
import { BodyTestResultclient } from '../components/Doctors/Body_TestResult'; // Corrected import name
import Footer from '../components/Clients/Footer';

function TestResult() {
    return (
        <div>
            <Header />
            <BodyTestResultclient /> {/* Corrected component name */}
            <Footer />
        </div>
    );
}

export default TestResult;
