using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    //Cấp bậc nhân sự của chuyên khoa: trưởng khoa, phó khoa, các thành viên
    public class RoleSpecialist
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoleSpecialistID { get; set; }
        public string RoleSpecialistName { get; set; } = null!;
        public ICollection<DetailSpecialist>? DetailSpecialists { get; set; }
    }
}
