using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicManagement_Model
{
    public class News
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NewsID { get; set; }
        public int EmployeeID { get; set; }
        public string NewsContext { get; set; } = null!;
        public string NewImage { get; set; } = null!;
        public string Title { get; set; } = null!;
        public Employee? Employee { get; set; }
    }
}
