using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class MedicationRepository : IMedicationRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public MedicationRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addMedicationAsync(MedicationDto medication)
        {
            var medicationsnew = _mapper.Map<Medication>(medication);
            _context.Medications.Add(medicationsnew);
            await _context.SaveChangesAsync();
            return medicationsnew.MedicationID;
        }

        public async Task deleteMedicationAsync(int id)
        {
            var delete = _context.Medications.SingleOrDefault(a => a.MedicationID == id);
            if (delete != null)
            {
                _context.Medications.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<MedicationDto>> getAllMedicationAsync()
        {
            var medications = await _context.Medications.ToListAsync();
            return _mapper.Map<List<MedicationDto>>(medications);
        }

        public async Task<MedicationDto> getMedicationAsync(int id)
        {
            var medications = await _context.Medications!.FindAsync(id);
            return _mapper.Map<MedicationDto>(medications);
        }

        public async Task updateMedicationAsync(int id, MedicationDto medication)
        {
            if (id == medication.MedicationID)
            {
                var medicationsupdate = _mapper.Map<Medication>(medication);
                _context.Medications.Update(medicationsupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
