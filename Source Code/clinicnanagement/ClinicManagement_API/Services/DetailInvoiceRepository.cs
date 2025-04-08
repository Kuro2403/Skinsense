using API_ClinicManagement.Dto;
using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class DetailInvoiceRepository : IDetailInvoiceRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public DetailInvoiceRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addDetailInvoiceAsync(DetailInvoiceDto DetailInvoice)
        {
            var data = _mapper.Map<DetailInvoice>(DetailInvoice);
            _context.DetailInvoices.Add(data);
            await _context.SaveChangesAsync();
            return data.DetailInvoiceID;
        }

        public async Task deleteDetailInvoiceAsync(int id)
        {
            var delete = _context.DetailInvoices.SingleOrDefault(a => a.DetailInvoiceID == id);
            if (delete != null)
            {
                _context.DetailInvoices.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<DetailInvoiceDto>> getAllDetailInvoiceAsync()
        {
            var DetailInvoice = await _context.DetailInvoices
                .Include(s => s.Treatment)
                .Include(s => s.Invoice)
                .ThenInclude(h => h!.Patient)
                .ThenInclude(h => h!.Account)
                .ToListAsync();
            return _mapper.Map<List<DetailInvoiceDto>>(DetailInvoice);
        }

        public async Task<DetailInvoiceDto> getDetailInvoiceAsync(int id)
        {
            var DetailInvoice = await _context.DetailInvoices
                .Include(s => s.Treatment)
                .Include(s => s.Invoice)
                .ThenInclude(h => h!.Patient)
                .ThenInclude(h => h!.Account)
                .FirstOrDefaultAsync(e => e.DetailInvoiceID == id);
            return _mapper.Map<DetailInvoiceDto>(DetailInvoice);
        }

        public async Task updateDetailInvoiceAsync(int id, DetailInvoiceDto DetailInvoice)
        {
            if (id == DetailInvoice.DetailInvoiceID)
            {
                var DetailInvoiceupdate = _mapper.Map<DetailInvoice>(DetailInvoice);
                _context.DetailInvoices.Update(DetailInvoiceupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
