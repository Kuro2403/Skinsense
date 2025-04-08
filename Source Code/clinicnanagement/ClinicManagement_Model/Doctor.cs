using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class Doctor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DoctorID { get; set; }

        //Trạng thái: còn làm việc, đã xin nghĩ, đã thôi việc
        public string Availability { get; set; } = null!;
        public int EmployeeID { get; set; }
        public Employee? Employee { get; set; } = null!;
        public ICollection<DetailDoctor>? DetailDoctors { get; set; }
        public ICollection<DetailSpecialist>? DetailSpecialists { get; set; }
        public ICollection<HistoryRoomClinic>? HistoryRoomClinics { get; set; }

    }
}
