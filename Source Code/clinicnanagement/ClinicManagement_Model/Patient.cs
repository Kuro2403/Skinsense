using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class Patient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PatientID { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Dob { get; set; } = null!;
        public int AccountID { get; set; }
        public Account? Account { get; set; }
        public ICollection<Appointment>? Appointments { get; set; }
        public ICollection<Invoice>? Invoices { get; set; }
        public ICollection<MedicalReport>? MedicalReports { get; set; }
        public ICollection<Prescription>? Prescriptions { get; set; }
        public ICollection<ReportFromAi>? ReportFromAis { get; set; }

    }
}
