using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClinicManagement_Model
{
    //Phòng khám bệnh
    public class RoomClinic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoomClinicID { get; set; }
        public string RoomName { get; set; } = null!;
        public int SpecialistID { get; set; }
        public Specialist? Specialist { get; set; }
        public ICollection<HistoryRoomClinic>? HistoryRoomClinics { get; set; }

    }
}
