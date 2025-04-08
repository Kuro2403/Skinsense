using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class MedicalReport
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MedicalReportID { get; set; }
        public string ReportDate { get; set; } = null!;
        public int PatientID { get; set; }
        public string Diagnosis { get; set; } = null!;
        public string TestResults { get; set; } = null!;
        public string Recommendations { get; set; } = null!;
        public string DoctorName { get; set; } = null!;
        public Patient? Patient { get; set; }
    }
}
