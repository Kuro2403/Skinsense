using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class DetailDoctorDto
    {
        public int DetailDoctorId { get; set; }
        public string Specialty { get; set; } = null!;

        //Bệnh viện đã từng làm việc.
        public string Hospital { get; set; } = null!;
        public string YearsOfExperience { get; set; } = null!;
        public int DoctorID { get; set; }
        public Doctor? Doctor { get; set; }
    }
}
