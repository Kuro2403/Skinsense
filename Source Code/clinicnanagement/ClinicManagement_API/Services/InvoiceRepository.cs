using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public InvoiceRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addInvoiceAsync(InvoiceDto invoice)
        {
            var invoicenew = _mapper.Map<Invoice>(invoice);
            _context.Invoices.Add(invoicenew);
            await _context.SaveChangesAsync();
            return invoicenew.InvoiceID;
        }

        public async Task deleteInvoiceAsync(int id)
        {
            var delete = _context.Invoices.SingleOrDefault(a => a.InvoiceID == id);
            if (delete != null)
            {
                _context.Invoices.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<InvoiceDto>> getAllInvoiceAsync()
        {
            var invoice = await _context.Invoices
                .Include(h => h.Patient)
                .ThenInclude(h => h!.Account)
                .ToListAsync();
            return _mapper.Map<List<InvoiceDto>>(invoice);
        }

        public async Task<InvoiceDto> getInvoiceAsync(int id)
        {
            var invoice = await _context.Invoices!
                .Include(h => h.Patient)
                .ThenInclude(h => h!.Account)
                .FirstOrDefaultAsync(h => h.InvoiceID == id);
            return _mapper.Map<InvoiceDto>(invoice);
        }

        public async Task updateInvoiceAsync(int id, InvoiceDto invoice)
        {
            if (id == invoice.InvoiceID)
            {
                var invoiceupdate = _mapper.Map<Invoice>(invoice);
                _context.Invoices.Update(invoiceupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
