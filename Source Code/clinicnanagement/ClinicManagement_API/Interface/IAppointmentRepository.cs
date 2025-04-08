using API_ClinicManagement.ModelAutoMapper;
using ClinicManagement_Model;

namespace API_ClinicManagement.Interface
{
    public interface IAppointmentRepository
    {
        public Task<IList<AppointmentDto>> getAllAppointmentAsync();
        public Task<AppointmentDto> getAppointmentAsync(int id);
        public Task<int> addAppointmentAsync(Appointment appointment);
        public Task updateAppointmentAsync(int id, Appointment appointment);
        public Task deleteAppointmentAsync(int id);
    }
}
