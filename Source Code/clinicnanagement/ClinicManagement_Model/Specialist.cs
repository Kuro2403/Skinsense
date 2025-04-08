using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    //Chuyên khoa
    public class Specialist
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SpecialistID { get; set; }
        public string SpecialistName { get; set; } = null!;
        public ICollection<DetailSpecialist>? DetailSpecialists { get; set; }
        public ICollection<RoomClinic>? RoomClinics { get; set; }

    }
}
