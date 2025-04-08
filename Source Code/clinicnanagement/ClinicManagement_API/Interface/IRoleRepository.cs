using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IRoleRepository
    {
        public Task<IList<RoleDto>> GetRoles();
        public Task<RoleDto> GetRole(int id);


    }
}
