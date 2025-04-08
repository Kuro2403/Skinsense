using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicManagement_Model
{
    public class Prescription
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PrescriptionID { get; set; }
        public string PrescriptionDate { get; set; } = null!;
        public int PatientID { get; set; }
        public int MedicationID { get; set; }
        public Medication? Medication { get; set; }
        public Patient? Patient { get; set; }
    }
}
