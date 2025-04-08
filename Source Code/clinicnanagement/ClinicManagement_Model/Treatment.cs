using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicManagement_Model
{
    public class Treatment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TreatmentID { get; set; }
        public string TreatmentName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string ImageTreatment { get; set; } = null!;
        public decimal Cost { get; set; }
        public ICollection<DetailInvoice>? DetailInvoices { get; set; }
    }
}
