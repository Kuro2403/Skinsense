using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class DoctorsController : ConBase
    {
        private readonly IDoctorRepository _repo;
        public DoctorsController(IDoctorRepository repo)
        {
            _repo = repo;
        }
        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllDoctorAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var doctor = await _repo.getDoctorAsync(id);
            return doctor == null ? NotFound() : Ok(doctor);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] DoctorDto model)
        {
            try
            {
                var id = await _repo.addDoctorAsync(model);
                var Doctor = await _repo.getDoctorAsync(id);
                return Doctor == null ? NotFound() : Ok(Doctor);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] DoctorDto model)
        {
            try
            {
                model.DoctorID = id;
                await _repo.updateDoctorAsync(id, model);
                var Doctor = await _repo.getDoctorAsync(id);
                return Ok(Doctor);
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
                await _repo.deleteDoctorAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
