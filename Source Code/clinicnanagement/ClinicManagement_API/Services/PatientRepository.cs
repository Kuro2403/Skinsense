using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class PatientRepository : IPatientRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public PatientRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addPatientAsync(PatientDto patient)
        {
            var patientsnew = _mapper.Map<Patient>(patient);
            _context.Patients.Add(patientsnew);
            await _context.SaveChangesAsync();
            return patientsnew.PatientID;
        }

        public async Task deletePatientAsync(int id)
        {
            var delete = _context.Patients.SingleOrDefault(a => a.PatientID == id);
            if (delete != null)
            {
                _context.Patients.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<PatientDto>> getAllPatientAsync()
        {
            var patients = await _context.Patients
                .Include(h => h.Account)
                .ToListAsync();
            return _mapper.Map<List<PatientDto>>(patients);
        }

        public async Task<PatientDto> getPatientAsync(int id)
        {
            var patient = await _context.Patients!
                .Include(h => h.Account)
                .FirstOrDefaultAsync(h => h.PatientID == id);
            return _mapper.Map<PatientDto>(patient);
        }

        public async Task updatePatientAsync(int id, PatientDto patient)
        {
            if (id == patient.PatientID)
            {
                var patientupdate = _mapper.Map<Patient>(patient);
                _context.Patients.Update(patientupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
