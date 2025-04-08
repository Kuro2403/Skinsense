using API_ClinicManagement.Dto;
using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IDetailInvoiceRepository
    {
        public Task<IList<DetailInvoiceDto>> getAllDetailInvoiceAsync();
        public Task<DetailInvoiceDto> getDetailInvoiceAsync(int id);
        public Task<int> addDetailInvoiceAsync(DetailInvoiceDto obj);
        public Task updateDetailInvoiceAsync(int id, DetailInvoiceDto obj);
        public Task deleteDetailInvoiceAsync(int id);
    }
}
