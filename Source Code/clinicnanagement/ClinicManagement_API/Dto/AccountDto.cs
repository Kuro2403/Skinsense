using System.ComponentModel.DataAnnotations;

namespace API_ClinicManagement.ModelAutoMapper
{
    public class AccountDto
    {
        public int AccountID { get; set; }
        public string? Mail { get; set; }
        public string? Password { get; set; }
        public string? Avatar { get; set; }
        public string? Gender { get; set; }
        public int RoleID { get; set; }
        public virtual RoleDto? Role { get; set; }
    }
}
