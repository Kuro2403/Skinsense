using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    //Thông tin chuyên khoa
    public class DetailSpecialist
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DetailSpecialistID { get; set; }
        public int SpecialistID { get; set; }
        public int DoctorID { get; set; }
        public int RoleSpecialistID { get; set; }
        public Doctor? Doctor { get; set; }
        public Specialist? Specialist { get; set; }
        public RoleSpecialist? RoleSpecialist { get; set; }
    }
}