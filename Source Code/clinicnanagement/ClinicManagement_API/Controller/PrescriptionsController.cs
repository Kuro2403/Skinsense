using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class PrescriptionsController : ConBase
    {
        private readonly IPrescriptionRepository _repo;
        public PrescriptionsController(IPrescriptionRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllPrescriptionAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var prescription = await _repo.getPrescriptionAsync(id);
            return prescription == null ? NotFound() : Ok(prescription);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] PrescriptionDto Dtomodel)
        {
            try
            {
                var addPrescriptionsId = await _repo.addPrescriptionAsync(Dtomodel);
                var Prescriptions = await _repo.getPrescriptionAsync(addPrescriptionsId);
                return Prescriptions == null ? NotFound() : Ok(Prescriptions);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] PrescriptionDto Dtomodel)
        {
            try
            {
                Dtomodel.PrescriptionID = id;
                await _repo.updatePrescriptionAsync(id, Dtomodel);
                var Prescriptions = await _repo.getPrescriptionAsync(id);
                return Ok(Prescriptions);
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
                await _repo.deletePrescriptionAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
