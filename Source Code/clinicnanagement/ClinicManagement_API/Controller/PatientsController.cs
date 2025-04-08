using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    public class PatientsController : ConBase
    {
        private readonly IPatientRepository _repo;
        public PatientsController(IPatientRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllPatientAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var patient = await _repo.getPatientAsync(id);
            return patient == null ? NotFound() : Ok(patient);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] PatientDto Dtomodel)
        {
            try
            {
                var addPatientsId = await _repo.addPatientAsync(Dtomodel);
                var Patients = await _repo.getPatientAsync(addPatientsId);
                return Patients == null ? NotFound() : Ok(Patients);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] PatientDto Dtomodel)
        {
            try
            {
                Dtomodel.PatientID = id;
                await _repo.updatePatientAsync(id, Dtomodel);
                var Patients = await _repo.getPatientAsync(id);
                return Ok(Patients);
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
                await _repo.deletePatientAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
