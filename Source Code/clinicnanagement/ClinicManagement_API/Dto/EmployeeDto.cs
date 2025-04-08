using ClinicManagement_Model;
using System.ComponentModel.DataAnnotations;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class EmployeeDto
    {
        public int EmployeeID { get; set; }
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string JoiningDate { get; set; } = null!;
        public int AccountID { get; set; }
        public Account? Account { get; set; }
    }
}
