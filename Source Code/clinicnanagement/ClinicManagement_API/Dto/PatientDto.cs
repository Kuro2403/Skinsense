using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class PatientDto
    {
        public int PatientID { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Dob { get; set; } = null!;
        public int AccountID { get; set; }
        public Account? Account { get; set; }

    }
}
