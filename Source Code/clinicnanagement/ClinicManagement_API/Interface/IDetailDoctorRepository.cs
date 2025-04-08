using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IDetailDoctorRepository
    {
        public Task<IList<DetailDoctorDto>> GetDetailDoctorsAsync();
        public Task<DetailDoctorDto> GetDetailDoctorAsync(int id);
        public Task<int> AddDetailDoctorAsync(DetailDoctorDto doctor);
        public Task updateDetailDoctorAsync(int id, DetailDoctorDto doctor);
        public Task deleteDetailDoctorAsync(int id);
    }
}
