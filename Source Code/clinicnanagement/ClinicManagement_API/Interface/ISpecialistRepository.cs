using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface ISpecialistRepository
    {
        public Task<IList<SpecialistDto>> GetSpecialists();
        public Task<SpecialistDto> GetSpecialist(int id);
        public Task<int> AddSpecialist(SpecialistDto obj);
        public Task UpdateSpecialist(int id, SpecialistDto obj);
        public Task DeleteSpecialist(int id);
    }
}
