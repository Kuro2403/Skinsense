using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IRoomClinicRepository
    {
        public Task<IList<RoomClinicDto>> GetRoomClinics();
        public Task<RoomClinicDto> GetRoomClinic(int id);
        public Task<int> AddRoomClinic(RoomClinicDto obj);
        public Task UpdateRoomClinic(int id, RoomClinicDto obj);
        public Task DeleteRoomClinic(int id);
    }
}
