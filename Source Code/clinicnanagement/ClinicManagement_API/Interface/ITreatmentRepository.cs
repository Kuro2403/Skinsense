using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface ITreatmentRepository
    {
        public Task<IList<TreatmentDto>> getAllTreatmentAsync();
        public Task<TreatmentDto> getTreatmentAsync(int id);
        public Task<int> addTreatmentAsync(TreatmentDto treatment);
        public Task updateTreatmentAsync(int id, TreatmentDto treatment);
        public Task deleteTreatmentAsync(int id);
    }
}
