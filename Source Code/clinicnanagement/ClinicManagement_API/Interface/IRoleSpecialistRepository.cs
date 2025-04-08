using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IRoleSpecialistRepository
    {
        public Task<IList<RoleSpecialistDto>> GetRoleSpecialists();
        public Task<RoleSpecialistDto> GetRoleSpecialist(int id);
        public Task<int> AddRoleSpecialist(RoleSpecialistDto obj);
        public Task UpdateRoleSpecialist(int id, RoleSpecialistDto obj);
        public Task DeleteRoleSpecialist(int id);
    }
}
