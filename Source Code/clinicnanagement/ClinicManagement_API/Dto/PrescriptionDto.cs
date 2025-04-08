using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class PrescriptionDto
    {
        public int PrescriptionID { get; set; }
        public string PrescriptionDate { get; set; } = null!;
        public int PatientID { get; set; }
        public int MedicationID { get; set; }
        public Medication? Medication { get; set; }
        public Patient? Patient { get; set; }
    }
}
