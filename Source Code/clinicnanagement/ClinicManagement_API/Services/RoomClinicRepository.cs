using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class RoomClinicRepository : IRoomClinicRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RoomClinicRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddRoomClinic(RoomClinicDto obj)
        {
            var res = _mapper.Map<RoomClinic>(obj);
            _context.RoomClinics.Add(res);
            await _context.SaveChangesAsync();
            return res.RoomClinicID;
        }

        public async Task DeleteRoomClinic(int id)
        {
            var res = _context.RoomClinics.SingleOrDefault(a => a.RoomClinicID == id);
            if (res != null)
            {
                _context.RoomClinics.Remove(res);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<RoomClinicDto> GetRoomClinic(int id)
        {
            var res = await _context.RoomClinics!
                .Include(h => h.Specialist)
                .FirstOrDefaultAsync(h => h.RoomClinicID == id);
            return _mapper.Map<RoomClinicDto>(res);
        }

        public async Task<IList<RoomClinicDto>> GetRoomClinics()
        {
            var res = await _context.RoomClinics
                .Include(h => h.Specialist)
                .ToListAsync();
            return _mapper.Map<List<RoomClinicDto>>(res);
        }

        public async Task UpdateRoomClinic(int id, RoomClinicDto obj)
        {
            if (id == obj.RoomClinicID)
            {
                var res = _mapper.Map<RoomClinic>(obj);
                _context.RoomClinics.Update(res);
                await _context.SaveChangesAsync();
            }
        }
    }
}
