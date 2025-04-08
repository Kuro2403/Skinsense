using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class DetailDoctorRepository : IDetailDoctorRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public DetailDoctorRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> AddDetailDoctorAsync(DetailDoctorDto doctor)
        {
            var data = _mapper.Map<DetailDoctor>(doctor);
            _context.DetailDoctors.Add(data);
            await _context.SaveChangesAsync();
            return data.DetailDoctorId;
        }

        public async Task deleteDetailDoctorAsync(int id)
        {
            //Xóa bác sĩ thì mọi thông tin liên quan đều xóa
            var delete = _context.DetailDoctors.SingleOrDefault(a => a.DetailDoctorId == id);
            if (delete != null)
            {
                _context.DetailDoctors.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<DetailDoctorDto> GetDetailDoctorAsync(int id)
        {
            var doctor = await _context.DetailDoctors!
                .Include(h => h.Doctor)
                .ThenInclude(h => h!.Employee)
                .ThenInclude(h => h!.Account)
                .ThenInclude(h => h!.Role)
                .FirstOrDefaultAsync(e => e.DetailDoctorId == id);
            return _mapper.Map<DetailDoctorDto>(doctor);
        }

        public async Task<IList<DetailDoctorDto>> GetDetailDoctorsAsync()
        {
            var doctor = await _context.DetailDoctors
                .Include(h => h.Doctor)
                .ThenInclude(h => h!.Employee)
                .ThenInclude(h => h!.Account)
                .ThenInclude(h => h!.Role)
                .ToListAsync();
            return _mapper.Map<List<DetailDoctorDto>>(doctor);
        }

        public async Task updateDetailDoctorAsync(int id, DetailDoctorDto doctor)
        {
            if (id == doctor.DetailDoctorId)
            {
                var data = _mapper.Map<DetailDoctor>(doctor);
                _context.DetailDoctors.Update(data);
                await _context.SaveChangesAsync();
            }
        }
    }
}
