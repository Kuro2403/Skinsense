using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class DoctorDto
    {
        public int DoctorID { get; set; }

        //Trạng thái: còn làm việc, đã xin nghĩ, đã thôi việc
        public string Availability { get; set; } = null!;
        public int EmployeeID { get; set; }
        public EmployeeDto? Employee { get; set; } = null!;
    }
}
