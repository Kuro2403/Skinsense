using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class RoleSpecialistRepository : IRoleSpecialistRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RoleSpecialistRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddRoleSpecialist(RoleSpecialistDto obj)
        {
            var res = _mapper.Map<RoleSpecialist>(obj);
            _context.RoleSpecialists.Add(res);
            await _context.SaveChangesAsync();
            return res.RoleSpecialistID;
        }

        public async Task DeleteRoleSpecialist(int id)
        {
            var res = _context.RoleSpecialists.SingleOrDefault(a => a.RoleSpecialistID == id);
            if (res != null)
            {
                _context.RoleSpecialists.Remove(res);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<RoleSpecialistDto> GetRoleSpecialist(int id)
        {
            var res = await _context.RoleSpecialists!.FirstOrDefaultAsync(h => h.RoleSpecialistID == id);
            return _mapper.Map<RoleSpecialistDto>(res);
        }

        public async Task<IList<RoleSpecialistDto>> GetRoleSpecialists()
        {
            var res = await _context.RoleSpecialists.ToListAsync();
            return _mapper.Map<List<RoleSpecialistDto>>(res);
        }

        public async Task UpdateRoleSpecialist(int id, RoleSpecialistDto obj)
        {
            if (id == obj.RoleSpecialistID)
            {
                var res = _mapper.Map<RoleSpecialist>(obj);
                _context.RoleSpecialists.Update(res);
                await _context.SaveChangesAsync();
            }
        }
    }
}
