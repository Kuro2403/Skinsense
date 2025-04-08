using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IPatientRepository
    {
        public Task<IList<PatientDto>> getAllPatientAsync();
        public Task<PatientDto> getPatientAsync(int id);
        public Task<int> addPatientAsync(PatientDto patient);
        public Task updatePatientAsync(int id, PatientDto patient);
        public Task deletePatientAsync(int id);
    }
}
