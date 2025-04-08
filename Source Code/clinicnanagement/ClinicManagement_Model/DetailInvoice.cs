using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class DetailInvoice
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DetailInvoiceID { get; set; }
        public int TreatmentID { get; set; }
        public int InvoiceID { get; set; }
        public Invoice? Invoice { get; set; }
        public Treatment? Treatment { get; set; }

    }
}
