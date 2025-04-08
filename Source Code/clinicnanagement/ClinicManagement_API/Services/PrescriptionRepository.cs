using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class PrescriptionRepository : IPrescriptionRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public PrescriptionRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addPrescriptionAsync(PrescriptionDto prescription)
        {
            var prescriptionsnew = _mapper.Map<Prescription>(prescription);
            _context.Prescriptions.Add(prescriptionsnew);
            await _context.SaveChangesAsync();
            return prescriptionsnew.PrescriptionID;
        }

        public async Task deletePrescriptionAsync(int id)
        {
            var delete = _context.Prescriptions.SingleOrDefault(a => a.PrescriptionID == id);
            if (delete != null)
            {
                _context.Prescriptions.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<PrescriptionDto>> getAllPrescriptionAsync()
        {
            var prescriptions = await _context.Prescriptions
                .Include(h => h.Patient)
                .Include(h => h.Medication)
                .ToListAsync();
            return _mapper.Map<List<PrescriptionDto>>(prescriptions);
        }

        public async Task<PrescriptionDto> getPrescriptionAsync(int id)
        {
            var prescription = await _context.Prescriptions!
                .Include(h => h.Patient)
                .Include(h => h.Medication)
                .FirstOrDefaultAsync(h => h.PrescriptionID == id);
            return _mapper.Map<PrescriptionDto>(prescription);
        }

        public async Task updatePrescriptionAsync(int id, PrescriptionDto prescription)
        {
            if (id == prescription.PrescriptionID)
            {
                var prescriptionupdate = _mapper.Map<Prescription>(prescription);
                _context.Prescriptions.Update(prescriptionupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
