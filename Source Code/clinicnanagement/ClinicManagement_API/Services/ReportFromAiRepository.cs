using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class ReportFromAiRepository : IReportFromAiRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public ReportFromAiRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addReportFromAiAsync(ReportFromAiDto reportFromAi)
        {
            var ReportFromAisnew = _mapper.Map<ReportFromAi>(reportFromAi);
            _context.ReportFromAis.Add(ReportFromAisnew);
            await _context.SaveChangesAsync();
            return ReportFromAisnew.ReportAiID;
        }

        public async Task deleteReportFromAiAsync(int id)
        {
            var delete = _context.ReportFromAis.SingleOrDefault(a => a.ReportAiID == id);
            if (delete != null)
            {
                _context.ReportFromAis.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<ReportFromAiDto>> getAllReportFromAiAsync()
        {
            var reportFromAis = await _context.ReportFromAis
                .Include(h => h.Patient)
                .ToListAsync();
            return _mapper.Map<List<ReportFromAiDto>>(reportFromAis);
        }

        public async Task<ReportFromAiDto> getReportFromAiAsync(int id)
        {
            var reportFromAi = await _context.ReportFromAis!
                .Include(h => h.Patient)
                .FirstOrDefaultAsync(h => h.ReportAiID == id);
            return _mapper.Map<ReportFromAiDto>(reportFromAi);
        }

        public async Task updateReportFromAiAsync(int id, ReportFromAiDto reportFromAi)
        {
            if (id == reportFromAi.ReportAiID)
            {
                var reportFromAiupdate = _mapper.Map<ReportFromAi>(reportFromAi);
                _context.ReportFromAis.Update(reportFromAiupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
