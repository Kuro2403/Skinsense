using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class DetailDoctor
    {
        public int DetailDoctorId { get; set; }
        public string Specialty { get; set; } = null!;

        //Bệnh viện đã từng làm việc.
        public string Hospital { get; set; } = null!;
        public string YearsOfExperience { get; set; } = null!;
        public int DoctorID { get; set; }
        public Doctor? Doctor { get; set; }
    }
}
