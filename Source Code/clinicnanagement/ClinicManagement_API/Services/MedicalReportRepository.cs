using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class MedicalReportRepository : IMedicalReportRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public MedicalReportRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addMedicalReportAsync(MedicalReportDto medicalReport)
        {
            var medicalReportnew = _mapper.Map<MedicalReport>(medicalReport);
            _context.MedicalReports.Add(medicalReportnew);
            await _context.SaveChangesAsync();
            return medicalReportnew.MedicalReportID;
        }

        public async Task deleteMedicalReportAsync(int id)
        {
            var delete = _context.MedicalReports.SingleOrDefault(a => a.MedicalReportID == id);
            if (delete != null)
            {
                _context.MedicalReports.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<MedicalReportDto>> getAllMedicalReportAsync()
        {
            var medicalReport = await _context.MedicalReports
               .Include(s => s.Patient)
               .ToListAsync();
            return _mapper.Map<List<MedicalReportDto>>(medicalReport);
        }

        public async Task<MedicalReportDto> getMedicalReportAsync(int id)
        {
            var medicalReport = await _context.MedicalReports!
               .Include(s => s.Patient)
               .FirstOrDefaultAsync(h => h.MedicalReportID == id);
            return _mapper.Map<MedicalReportDto>(medicalReport);
        }

        public async Task updateMedicalReportAsync(int id, MedicalReportDto medicalReport)
        {
            if (id == medicalReport.MedicalReportID)
            {
                var medicalReportupdate = _mapper.Map<MedicalReport>(medicalReport);
                _context.MedicalReports.Update(medicalReportupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
