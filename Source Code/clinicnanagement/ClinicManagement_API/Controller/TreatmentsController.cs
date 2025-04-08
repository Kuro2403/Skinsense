using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class TreatmentsController : ConBase
    {
        private readonly ITreatmentRepository _repo;
        public TreatmentsController(ITreatmentRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllTreatmentAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var treatment = await _repo.getTreatmentAsync(id);
            return treatment == null ? NotFound() : Ok(treatment);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] TreatmentDto Dtomodel)
        {
            try
            {
                var addTreatmentID = await _repo.addTreatmentAsync(Dtomodel);
                var Treatments = await _repo.getTreatmentAsync(addTreatmentID);
                return Treatments == null ? NotFound() : Ok(Treatments);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] TreatmentDto Dtomodel)
        {
            try
            {
                Dtomodel.TreatmentID = id;
                await _repo.updateTreatmentAsync(id, Dtomodel);
                var Treatments = await _repo.getTreatmentAsync(id);
                return Ok(Treatments);
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
                await _repo.deleteTreatmentAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
