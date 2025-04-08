using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RoleRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<RoleDto> GetRole(int id)
        {
            var data = await _context.Roles!.FindAsync(id);
            return _mapper.Map<RoleDto>(data);
        }

        public async Task<IList<RoleDto>> GetRoles()
        {
            var data = await _context.Roles.ToListAsync();
            return _mapper.Map<List<RoleDto>>(data);
        }
    }
}
