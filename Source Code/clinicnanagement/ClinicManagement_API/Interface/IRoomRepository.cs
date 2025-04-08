using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IRoomRepository
    {
        public Task<IList<HistoryRoomClinicDto>> GetRooms();
        public Task<HistoryRoomClinicDto> GetRoom(int id);
        public Task<int> AddRoom(HistoryRoomClinicDto obj);
        public Task UpdateRoom(int id, HistoryRoomClinicDto obj);
        public Task DeleteRoom(int id);
    }
}
