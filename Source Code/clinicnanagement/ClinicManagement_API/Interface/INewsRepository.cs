using API_ClinicManagement.ModelAutoMapper;

namespace API_ClinicManagement.Interface
{
    public interface INewsRepository
    {
        public Task<IList<NewsDto>> getAllNewsAsync();
        public Task<NewsDto> getNewsAsync(int id);
        public Task<int> addNewsAsync(NewsDto news);
        public Task updateNewsAsync(int id, NewsDto news);
        public Task deleteNewsAsync(int id);
    }
}
