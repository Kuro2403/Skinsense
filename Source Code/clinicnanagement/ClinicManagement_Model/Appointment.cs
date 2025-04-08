using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace ClinicManagement_Model
{
    public class Appointment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AppointmentID { get; set; }
        public string AppointmentDate { get; set; } = null!;
        public string AppointmentTime { get; set; } = null!;
        public string ExaminationService { get; set; } = null!;
        public int PatientID { get; set; }
        public int DoctorID { get; set; }
        public Patient? Patient { get; set; }
        public Doctor? Doctor { get; set; }
    }
}