using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IEmployeeRepository
    {
        public Task<IList<EmployeeDto>> getAllEmployeeAsync();
        public Task<EmployeeDto> getEmployeeAsync(int id);
        public Task<int> addEmployeeAsync(EmployeeDto employee);
        public Task updateEmployeeAsync(int id, EmployeeDto employee);
        public Task deleteEmployeeAsync(int id);
    }
}
