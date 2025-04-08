using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class DetailSpecialistDto
    {
        public int DetailSpecialistID { get; set; }
        public int SpecialistID { get; set; }
        public int DoctorID { get; set; }
        public int RoleSpecialistID { get; set; }
        public DoctorDto? Doctor { get; set; }
        public SpecialistDto? Specialist { get; set; }
        public RoleSpecialistDto? RoleSpecialist { get; set; }
    }
}
