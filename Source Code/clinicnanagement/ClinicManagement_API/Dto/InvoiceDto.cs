using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class InvoiceDto
    {
        public int InvoiceID { get; set; }
        public string InvoiceDate { get; set; } = null!;
        public int PatientID { get; set; }
        public bool status { get; set; }
        public Patient? Patient { get; set; }
    }
}
