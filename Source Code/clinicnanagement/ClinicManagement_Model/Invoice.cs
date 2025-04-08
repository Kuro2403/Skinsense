using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class Invoice
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InvoiceID { get; set; }
        public string InvoiceDate { get; set; } = null!;
        public int PatientID { get; set; }
        public bool status { get; set; }
        public Patient? Patient { get; set; }
        public ICollection<DetailInvoice>? DetailInvoices { get; set; }


    }
}
