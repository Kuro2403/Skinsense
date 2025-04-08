using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IPrescriptionRepository
    {
        public Task<IList<PrescriptionDto>> getAllPrescriptionAsync();
        public Task<PrescriptionDto> getPrescriptionAsync(int id);
        public Task<int> addPrescriptionAsync(PrescriptionDto prescription);
        public Task updatePrescriptionAsync(int id, PrescriptionDto prescription);
        public Task deletePrescriptionAsync(int id);
    }
}
