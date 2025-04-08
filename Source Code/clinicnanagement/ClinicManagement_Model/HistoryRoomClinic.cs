using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    public class HistoryRoomClinic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HistoryRoomClinicID { get; set; }
        public int DoctorID { get; set; }
        public int RoomClinicID { get; set; }
        public string DateIn { get; set; } = null!;
        public string DateOut { get; set; } = null!;
        public bool HasLeft { get; set; }
        public Doctor? Doctor { get; set; }
        public RoomClinic? RoomClinic { get; set; }

    }
}
