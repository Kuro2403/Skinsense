using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    public class NewsController : ConBase
    {
        private readonly INewsRepository _repo;
        public NewsController(INewsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllNewsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var news = await _repo.getNewsAsync(id);
            return news == null ? NotFound() : Ok(news);

        }
        [Authorize(Roles = "Staff")]
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] NewsDto Dtomodel)
        {
            try
            {
                var addNewsID = await _repo.addNewsAsync(Dtomodel);
                var news = await _repo.getNewsAsync(addNewsID);
                return news == null ? NotFound() : Ok(news);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Staff")]
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] NewsDto Dtomodel)
        {
            try
            {
                Dtomodel.NewsID = id;
                await _repo.updateNewsAsync(id, Dtomodel);
                var news = await _repo.getNewsAsync(id);
                return Ok(news);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Staff")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> RemoveById(int id)
        {
            try
            {
                await _repo.deleteNewsAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
