using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class AppointmentDto
    {
        public int AppointmentID { get; set; }
        public string AppointmentDate { get; set; } = null!;
        public string AppointmentTime { get; set; } = null!;
        public string ExaminationService { get; set; } = null!;
        public int PatientID { get; set; }
        public int DoctorID { get; set; }
        public virtual PatientDto? Patient { get; set; }
        public virtual DoctorDto? Doctor { get; set; }
    }
}
