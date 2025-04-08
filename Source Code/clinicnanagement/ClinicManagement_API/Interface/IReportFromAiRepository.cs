using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface IReportFromAiRepository
    {
        public Task<IList<ReportFromAiDto>> getAllReportFromAiAsync();
        public Task<ReportFromAiDto> getReportFromAiAsync(int id);
        public Task<int> addReportFromAiAsync(ReportFromAiDto reportFromAi);
        public Task updateReportFromAiAsync(int id, ReportFromAiDto reportFromAi);
        public Task deleteReportFromAiAsync(int id);
    }
}
