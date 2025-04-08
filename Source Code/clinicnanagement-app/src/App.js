import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

import Home from "./pages/Clients/Home";
import Login from "./pages/Clients/Login";
import Register from "./pages/Clients/Register";
import Register1 from "./pages/Clients/Register_1";
import Forgotpass1 from "./pages/Clients/Forgot_pass_1";
import Forgotpass2 from "./pages/Clients/Forgot_pass_2";
import Forgotpass3 from "./pages/Clients/Forgot_pass_3";
import Profile from "./pages/Clients/Profile";
import News from "./pages/Clients/News";
import NewsDetails from "./pages/Clients/News_Details";
import AboutUs from "./pages/Clients/AboutUs";
import ShowMoreServiceTreatment from "./pages/Clients/ShowMoreServiceTreatment";
import ShowMoreServiceAcnePrevention from "./pages/Clients/ShowMoreServiceAcnePrevention";
import ShowMoreServiceCauseAcne from "./pages/Clients/ShowMoreServiceCauseAcne";
import Appointment from "./pages/Clients/Appointment";
import MedicalRecord from "./pages/Clients/MedicalRecord";
import Invoice from "./pages/Clients/Invoice";
import BookAppointment from "./pages/Clients/BookAppointment";
import BookAppointment1 from "./pages/Clients/BookAppointment_1";
import BookAppointment2 from "./pages/Clients/BookAppointment_2";
import { MedicalRecordDetails, PrescriptionDetails } from "./pages/Clients/MedicalRecord_Details";
import DetectAcne from "./pages/Clients/DetectAcne";
import DetectAcne1 from "./pages/Clients/DetectAcne_1";
import TestResultPatient from "./pages/Clients/TestResult";

import Doctor from "./pages/Doctors/Doctor";
import DoctorProfile from "./pages/Doctors/Profile";
import ViewAllAppointment from "./pages/Doctors/ViewAllAppointment";
import DoctorMedicalRecord from "./pages/Doctors/MedicalRecord";
import DoctorMedicalRecordCreate from "./pages/Doctors/MedicalRecord_Create";
import DoctorMedicalRecordDetails from "./pages/Doctors/MedicalRecord_Details";
import PatientsExamined from "./pages/Doctors/PatientsExamined";
import TestResultDoctor from "./pages/Doctors/TestResult";
import DoctorInvoice from "./pages/Doctors/Invoice_Create";


import HomeAdmin from "./pages/admin/HomeAdmin";
import Employees from "./pages/admin/Employees";
import Doctors from "./pages/admin/Doctors";
import Rooms from "./pages/admin/Rooms";
import Medicine from "./pages/admin/Medicine";
import Treatment from './pages/admin/Treatments';
import Specialists from "./pages/admin/Specialists";

import HomeStaff from './pages/staff/HomeStaff'
import Appointments from "./pages/staff/Appointments";
import Invoices from "./pages/staff/Invoice";
import Newss from "./pages/staff/New";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Register1" element={<Register1 />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Forgotpass1" element={<Forgotpass1 />} />
          <Route path="/Forgotpass2" element={<Forgotpass2 />} />
          <Route path="/Forgotpass3" element={<Forgotpass3 />} />

          <Route path="/News" element={<News />} />
          <Route path="/NewsDetails/:newsID" element={<NewsDetails />} />

          <Route path="/About Us" element={<AboutUs />} />

          <Route path="/ShowMoreServiceTreatment" element={<ShowMoreServiceTreatment />} />
          <Route path="/ShowMoreServiceAcnePrevention" element={<ShowMoreServiceAcnePrevention />} />
          <Route path="/ShowMoreServiceCauseAcne" element={<ShowMoreServiceCauseAcne />} />

          <Route path="/Appointment" element={<Appointment />} />

          <Route path="/Medical Record" element={<MedicalRecord />} />
          <Route path="/MedicalRecordDetails" element={<MedicalRecordDetails />} />
          <Route path="/PrescriptionDetails" element={<PrescriptionDetails />} />
          <Route path="/TestResult" element={<TestResultPatient />} />

          <Route path="/BookAppointment" element={<BookAppointment />} />
          <Route path="/BookAppointment1" element={<BookAppointment1 />} />
          <Route path="/BookAppointment2" element={<BookAppointment2 />} />


          <Route path="/Invoice" element={<Invoice />} />

          <Route path="/BookAppointment" element={<BookAppointment />} />
          <Route path="/BookAppointment1" element={<BookAppointment1 />} />
          <Route path="/BookAppointment2" element={<BookAppointment2 />} />

          <Route path="/Detect Acne" element={<DetectAcne />} />
          <Route path="/Detect Acne1" element={<DetectAcne1 />} />
          <Route path="/Doctor" element={<Doctor />} />
          <Route path="/Doctor/Profile" element={<DoctorProfile />} />
          <Route path="/Doctor/ViewAllAppointment" element={<ViewAllAppointment />} />
          <Route path="/Doctor/Medical Record/:patientID" element={<DoctorMedicalRecord />} />
          <Route path="/Doctor/MedicalRecordCreate" element={<DoctorMedicalRecordCreate />} />
          <Route path="/Doctor/MedicalRecordDetails/:medicalReportID" element={<DoctorMedicalRecordDetails />} />
          <Route path="/Doctor/Patients Examined" element={<PatientsExamined />} />
          <Route path="/Doctor/TestResult/:reportAiID" element={<TestResultDoctor />} />
          <Route path="/Doctor/Create Invoice" element={<DoctorInvoice />} />



          <Route>
            <Route path="/staff">
              <Route index element={<HomeStaff />} />
              <Route path="appointments">
                <Route index element={<Appointments />} />
              </Route>
              <Route path="news">
                <Route index element={<Newss />} />
              </Route>
              <Route path="invoices">
                <Route index element={<Invoices />} />
              </Route>
            </Route>
          </Route>

          <Route path="/admin">
            <Route index element={<HomeAdmin />} />
            <Route path="employees">
              <Route index element={<Employees />} />
            </Route>
            <Route path="doctors">
              <Route index element={<Doctors />} />
            </Route>
            <Route path="rooms">
              <Route index element={<Rooms />} />
            </Route>
            <Route path="medicines">
              <Route index element={<Medicine />} />
            </Route>
            <Route path="treatments">
              <Route index element={<Treatment />} />
            </Route>
            <Route path="specialists">
              <Route index element={<Specialists />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
