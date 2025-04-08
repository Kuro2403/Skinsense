using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class MedicationsController : ConBase
    {
        private readonly IMedicationRepository _repo;
        public MedicationsController(IMedicationRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllMedicationAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var medication = await _repo.getMedicationAsync(id);
            return medication == null ? NotFound() : Ok(medication);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] MedicationDto Dtomodel)
        {
            try
            {
                var addMedicationId = await _repo.addMedicationAsync(Dtomodel);
                var medication = await _repo.getMedicationAsync(addMedicationId);
                return medication == null ? NotFound() : Ok(medication);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] MedicationDto Dtomodel)
        {
            try
            {
                Dtomodel.MedicationID = id;
                await _repo.updateMedicationAsync(id, Dtomodel);
                var medication = await _repo.getMedicationAsync(id);
                return Ok(medication);
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
                await _repo.deleteMedicationAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
