using API_ClinicManagement.ModelAutoMapper;
using ClinicManagement_Model;

namespace API_ClinicManagement.Dto
{
    public class DetailInvoiceDto
    {
        public int DetailInvoiceID { get; set; }
        public int TreatmentID { get; set; }
        public int InvoiceID { get; set; }
        public Invoice? Invoice { get; set; }
        public Treatment? Treatment { get; set; }
    }
}
