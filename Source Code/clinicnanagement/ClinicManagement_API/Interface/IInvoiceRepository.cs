using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IInvoiceRepository
    {
        public Task<IList<InvoiceDto>> getAllInvoiceAsync();
        public Task<InvoiceDto> getInvoiceAsync(int id);
        public Task<int> addInvoiceAsync(InvoiceDto invoice);
        public Task updateInvoiceAsync(int id, InvoiceDto invoice);
        public Task deleteInvoiceAsync(int id);
    }
}
