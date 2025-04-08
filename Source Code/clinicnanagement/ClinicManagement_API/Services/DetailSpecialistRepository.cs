using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class DetailSpecialistRepository : IDetailSpecialistRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public DetailSpecialistRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddDetailSpecialist(DetailSpecialistDto obj)
        {
            var res = _mapper.Map<DetailSpecialist>(obj);
            _context.DetailSpecialists.Add(res);
            await _context.SaveChangesAsync();
            return res.DetailSpecialistID;
        }

        public async Task DeleteDetailSpecialist(int id)
        {
            var res = _context.DetailSpecialists.SingleOrDefault(a => a.DetailSpecialistID == id);
            if (res != null)
            {
                _context.DetailSpecialists.Remove(res);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<DetailSpecialistDto> GetDetailSpecialist(int id)
        {
            var res = await _context.DetailSpecialists!
                .Include(h => h.RoleSpecialist)
                .Include(h => h.Specialist)
                .Include(h => h.Doctor)
                .ThenInclude(h => h!.Employee)
                .ThenInclude(h => h!.Account)
                .ThenInclude(h => h!.Role)
                .FirstOrDefaultAsync(h => h.DetailSpecialistID == id);
            return _mapper.Map<DetailSpecialistDto>(res);
        }

        public async Task<IList<DetailSpecialistDto>> GetDetailSpecialists()
        {
            var res = await _context.DetailSpecialists
                .Include(h => h.RoleSpecialist)
                .Include(h => h.Specialist)
                .Include(h => h.Doctor)
                .ThenInclude(h => h!.Employee)
                .ThenInclude(h => h!.Account)
                .ThenInclude(h => h!.Role)
                .ToListAsync();
            return _mapper.Map<List<DetailSpecialistDto>>(res);
        }

        public async Task UpdateDetailSpecialist(int id, DetailSpecialistDto obj)
        {
            if (id == obj.DetailSpecialistID)
            {
                var res = _mapper.Map<DetailSpecialist>(obj);
                _context.DetailSpecialists.Update(res);
                await _context.SaveChangesAsync();
            }
        }
    }
}
