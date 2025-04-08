using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class DetailDoctorsController : ConBase
    {
        private readonly IDetailDoctorRepository _repo;
        public DetailDoctorsController(IDetailDoctorRepository repo)
        {
            _repo = repo;
        }
        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.GetDetailDoctorsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var doctor = await _repo.GetDetailDoctorAsync(id);
            return doctor == null ? NotFound() : Ok(doctor);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] DetailDoctorDto model)
        {
            try
            {
                var id = await _repo.AddDetailDoctorAsync(model);
                var Doctor = await _repo.GetDetailDoctorAsync(id);
                return Doctor == null ? NotFound() : Ok(Doctor);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] DetailDoctorDto model)
        {
            try
            {
                model.DetailDoctorId = id;
                await _repo.updateDetailDoctorAsync(id, model);
                var Doctor = await _repo.GetDetailDoctorAsync(id);
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
                await _repo.deleteDetailDoctorAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
