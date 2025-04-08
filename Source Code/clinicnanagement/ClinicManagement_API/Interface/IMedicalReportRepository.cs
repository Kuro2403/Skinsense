using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IMedicalReportRepository
    {
        public Task<IList<MedicalReportDto>> getAllMedicalReportAsync();
        public Task<MedicalReportDto> getMedicalReportAsync(int id);
        public Task<int> addMedicalReportAsync(MedicalReportDto medicalReport);
        public Task updateMedicalReportAsync(int id, MedicalReportDto medicalReport);
        public Task deleteMedicalReportAsync(int id);
    }
}
