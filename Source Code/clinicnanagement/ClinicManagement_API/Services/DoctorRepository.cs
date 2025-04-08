using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public DoctorRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addDoctorAsync(DoctorDto doctor)
        {
            var doctornew = _mapper.Map<Doctor>(doctor);
            _context.Doctors.Add(doctornew);
            await _context.SaveChangesAsync();
            return doctornew.DoctorID;
        }

        public async Task deleteDoctorAsync(int id)
        {
            var delete = _context.Doctors.SingleOrDefault(a => a.DoctorID == id);
            if (delete != null)
            {
                _context.Doctors.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<DoctorDto>> getAllDoctorAsync()
        {
            var doctor = await _context.Doctors
               .Include(s => s.Employee)
               .ThenInclude(h => h!.Account)
               .ThenInclude(h => h!.Role)
               .ToListAsync();
            return _mapper.Map<List<DoctorDto>>(doctor);
        }

        public async Task<DoctorDto> getDoctorAsync(int id)
        {
            var doctor = await _context.Doctors!
                .Include(h => h.Employee)
                .ThenInclude(h => h!.Account)
                .ThenInclude(h => h!.Role)
                .FirstOrDefaultAsync(e => e.DoctorID == id);
            return _mapper.Map<DoctorDto>(doctor);
        }

        public async Task updateDoctorAsync(int id, DoctorDto doctor)
        {
            if (id == doctor.DoctorID)
            {
                var doctorupdate = _mapper.Map<Doctor>(doctor);
                _context.Doctors.Update(doctorupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
