using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeID { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string JoiningDate { get; set; } = null!;
        public int AccountID { get; set; }
        public Account? Account { get; set; }
        public ICollection<Doctor>? Doctors { get; set; }
        public ICollection<News>? News { get; set; }

    }
}
