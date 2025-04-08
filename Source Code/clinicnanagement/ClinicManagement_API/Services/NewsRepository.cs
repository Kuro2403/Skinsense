using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class NewsRepository : INewsRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public NewsRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addNewsAsync(NewsDto news)
        {
            var newssnew = _mapper.Map<News>(news);
            _context.News.Add(newssnew);
            await _context.SaveChangesAsync();
            return newssnew.NewsID;
        }

        public async Task deleteNewsAsync(int id)
        {
            var delete = _context.News.SingleOrDefault(a => a.NewsID == id);
            if (delete != null)
            {
                _context.News.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<NewsDto>> getAllNewsAsync()
        {
            var news = await _context.News
                .Include(h => h.Employee)
                .ThenInclude(h => h!.Account)
                .ToListAsync();
            return _mapper.Map<List<NewsDto>>(news);
        }

        public async Task<NewsDto> getNewsAsync(int id)
        {
            var news = await _context.News!
                .Include(h => h.Employee)
                .ThenInclude(h => h!.Account)
                .FirstOrDefaultAsync(h => h.NewsID == id);
            return _mapper.Map<NewsDto>(news);
        }

        public async Task updateNewsAsync(int id, NewsDto news)
        {
            if (id == news.NewsID)
            {
                var newsupdate = _mapper.Map<News>(news);
                _context.News.Update(newsupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
