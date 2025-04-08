using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class TreatmentRepository : ITreatmentRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public TreatmentRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addTreatmentAsync(TreatmentDto treatment)
        {
            var treatmentsnew = _mapper.Map<Treatment>(treatment);
            _context.Treatments.Add(treatmentsnew);
            await _context.SaveChangesAsync();
            return treatmentsnew.TreatmentID;
        }
        public async Task deleteTreatmentAsync(int id)
        {
            var delete = _context.Treatments.SingleOrDefault(a => a.TreatmentID == id);
            if (delete != null)
            {
                _context.Treatments.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<IList<TreatmentDto>> getAllTreatmentAsync()
        {
            var treats = await _context.Treatments.ToListAsync();
            return _mapper.Map<List<TreatmentDto>>(treats);
        }
        public async Task<TreatmentDto> getTreatmentAsync(int id)
        {
            var treats = await _context.Treatments!.FindAsync(id);
            return _mapper.Map<TreatmentDto>(treats);
        }
        public async Task updateTreatmentAsync(int id, TreatmentDto treatment)
        {
            if (id == treatment.TreatmentID)
            {
                var treatmentupdate = _mapper.Map<Treatment>(treatment);
                _context.Treatments.Update(treatmentupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
