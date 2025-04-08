
using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IMedicationRepository
    {
        public Task<IList<MedicationDto>> getAllMedicationAsync();
        public Task<MedicationDto> getMedicationAsync(int id);
        public Task<int> addMedicationAsync(MedicationDto medication);
        public Task updateMedicationAsync(int id, MedicationDto medication);
        public Task deleteMedicationAsync(int id);
    }
}
