using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicManagement_Model
{
    public class ReportFromAi
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReportAiID { get; set; }
        public int PatientID { get; set; }
        public string DateCreate { get; set; } = null!;
        //Hình ảnh đã được xử lý
        public string ImageDetected { get; set; } = null!;
        public string Acne_scars { get; set; } = null!;
        public string Papular { get; set; } = null!;
        public string Blackhead { get; set; } = null!;
        public string Purulent { get; set; } = null!;
        public string Sebo_crystan_conglo { get; set; } = null!;
        public string Total_of_acne_detected { get; set; } = null!;
        public string Evaluate { get; set; } = null!;
        public Patient? Patient { get; set; }
    }
}
