using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IDoctorRepository
    {
        public Task<IList<DoctorDto>> getAllDoctorAsync();
        public Task<DoctorDto> getDoctorAsync(int id);
        public Task<int> addDoctorAsync(DoctorDto doctor);
        public Task updateDoctorAsync(int id, DoctorDto doctor);
        public Task deleteDoctorAsync(int id);
    }
}
