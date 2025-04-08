using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class RoomClinicDto
    {
        public int RoomClinicID { get; set; }
        public string RoomName { get; set; } = null!;
        public int SpecialistID { get; set; }
        public SpecialistDto? Specialist { get; set; }
    }
}
