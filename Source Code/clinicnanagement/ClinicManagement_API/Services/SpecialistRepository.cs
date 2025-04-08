using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class SpecialistRepository : ISpecialistRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public SpecialistRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddSpecialist(SpecialistDto obj)
        {
            var res = _mapper.Map<Specialist>(obj);
            _context.Specialists.Add(res);
            await _context.SaveChangesAsync();
            return res.SpecialistID;
        }

        public async Task DeleteSpecialist(int id)
        {
            var res = _context.Specialists.SingleOrDefault(a => a.SpecialistID == id);
            if (res != null)
            {
                _context.Specialists.Remove(res);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<SpecialistDto> GetSpecialist(int id)
        {
            var res = await _context.Specialists!.FirstOrDefaultAsync(h => h.SpecialistID == id);
            return _mapper.Map<SpecialistDto>(res);
        }

        public async Task<IList<SpecialistDto>> GetSpecialists()
        {
            var res = await _context.Specialists.ToListAsync();
            return _mapper.Map<List<SpecialistDto>>(res);
        }

        public async Task UpdateSpecialist(int id, SpecialistDto obj)
        {
            if (id == obj.SpecialistID)
            {
                var res = _mapper.Map<Specialist>(obj);
                _context.Specialists.Update(res);
                await _context.SaveChangesAsync();
            }
        }
    }
}
