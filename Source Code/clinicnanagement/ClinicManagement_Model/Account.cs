using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountID { get; set; }
        public string? Password { get; set; }
        public string Mail { get; set; } = null!;
        public string Avatar { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public int RoleID { get; set; }
        public Role? Role { get; set; }

    }
}
