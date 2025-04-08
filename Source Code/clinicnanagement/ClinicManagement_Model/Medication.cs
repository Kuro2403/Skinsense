using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicManagement_Model
{
    public class Medication
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MedicationID { get; set; }
        public string MedicationName { get; set; } = null!;
        //Liều lượng
        public string Dosage { get; set; } = null!;
        //Giá tiền
        public decimal Price { get; set; }
        public ICollection<Prescription>? Prescriptions { get; set; }

    }
}
