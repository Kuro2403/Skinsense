using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class MedicalReportDto
    {
        public int MedicalReportID { get; set; }
        public string ReportDate { get; set; } = null!;
        public int PatientID { get; set; }
        public string Diagnosis { get; set; } = null!;
        public string TestResults { get; set; } = null!;
        public string Recommendations { get; set; } = null!;
        public string DoctorName { get; set; } = null!;
        public Patient? Patient { get; set; }
    }
}
