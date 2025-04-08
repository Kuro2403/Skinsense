using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class ReportFromAisController : ConBase
    {
        private readonly IReportFromAiRepository _repo;
        public ReportFromAisController(IReportFromAiRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllReportFromAiAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var reportFromAi = await _repo.getReportFromAiAsync(id);
            return reportFromAi == null ? NotFound() : Ok(reportFromAi);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] ReportFromAiDto Dtomodel)
        {
            try
            {
                var addReportFromAisId = await _repo.addReportFromAiAsync(Dtomodel);
                var ReportFromAis = await _repo.getReportFromAiAsync(addReportFromAisId);
                return ReportFromAis == null ? NotFound() : Ok(ReportFromAis);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] ReportFromAiDto Dtomodel)
        {
            try
            {
                Dtomodel.ReportAiID = id;
                await _repo.updateReportFromAiAsync(id, Dtomodel);
                var ReportFromAis = await _repo.getReportFromAiAsync(id);
                return Ok(ReportFromAis);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> RemoveById(int id)
        {
            try
            {
                await _repo.deleteReportFromAiAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
