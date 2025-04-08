using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class HistoryRoomClinicDto
    {
        public int HistoryRoomClinicID { get; set; }
        public int DoctorID { get; set; }
        public int RoomClinicID { get; set; }
        public string DateIn { get; set; } = null!;
        public string DateOut { get; set; } = null!;
        public bool HasLeft { get; set; }
        public DoctorDto? Doctor { get; set; }
        public RoomClinicDto? RoomClinic { get; set; }

    }
}
