using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IDetailSpecialistRepository
    {
        public Task<IList<DetailSpecialistDto>> GetDetailSpecialists();
        public Task<DetailSpecialistDto> GetDetailSpecialist(int id);
        public Task<int> AddDetailSpecialist(DetailSpecialistDto obj);
        public Task UpdateDetailSpecialist(int id, DetailSpecialistDto obj);
        public Task DeleteDetailSpecialist(int id);
    }
}
