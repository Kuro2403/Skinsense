using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class RoomRepository : IRoomRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RoomRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddRoom(HistoryRoomClinicDto obj)
        {
            var res = _mapper.Map<HistoryRoomClinic>(obj);
            _context.Rooms.Add(res);
            await _context.SaveChangesAsync();
            return res.HistoryRoomClinicID;
        }

        public async Task DeleteRoom(int id)
        {
            var res = _context.Rooms.SingleOrDefault(a => a.HistoryRoomClinicID == id);
            if (res != null)
            {
                _context.Rooms.Remove(res);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<HistoryRoomClinicDto> GetRoom(int id)
        {
            var res = await _context.Rooms!
                .Include(h => h.Doctor)
                .ThenInclude(h => h!.Employee)
                .Include(h => h.RoomClinic)
                .ThenInclude(h => h!.Specialist)
                .FirstOrDefaultAsync(h => h.HistoryRoomClinicID == id);
            return _mapper.Map<HistoryRoomClinicDto>(res);
        }

        public async Task<IList<HistoryRoomClinicDto>> GetRooms()
        {
            var res = await _context.Rooms
                .Include(h => h.Doctor)
                .ThenInclude(h => h!.Employee)
                .Include(h => h.RoomClinic)
                .ThenInclude(h => h!.Specialist)
                .ToListAsync();
            return _mapper.Map<List<HistoryRoomClinicDto>>(res);
        }

        public async Task UpdateRoom(int id, HistoryRoomClinicDto obj)
        {
            if (id == obj.HistoryRoomClinicID)
            {
                var res = _mapper.Map<HistoryRoomClinic>(obj);
                _context.Rooms.Update(res);
                await _context.SaveChangesAsync();
            }
        }
    }
}
