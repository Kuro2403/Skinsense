using ClinicManagement_Model;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class NewsDto
    {
        public int NewsID { get; set; }
        public int EmployeeID { get; set; }
        public string NewsContext { get; set; } = null!;
        public string NewImage { get; set; } = null!;
        public string Title { get; set; } = null!;
        public Employee? Employee { get; set; }
    }
}
