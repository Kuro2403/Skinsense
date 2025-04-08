using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class SpecialistsController : ConBase
    {
        private readonly ISpecialistRepository _repo;
        public SpecialistsController(ISpecialistRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetSpecialists()
        {
            try
            {
                return Ok(await _repo.GetSpecialists());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var treatment = await _repo.GetSpecialist(id);
            return treatment == null ? NotFound() : Ok(treatment);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] SpecialistDto obj)
        {
            try
            {
                var res = await _repo.AddSpecialist(obj);
                var data = await _repo.GetSpecialist(res);
                return data == null ? NotFound() : Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] SpecialistDto obj)
        {
            try
            {
                obj.SpecialistID = id;
                await _repo.UpdateSpecialist(id, obj);
                var data = await _repo.GetSpecialist(id);
                return Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteSpecialist(int id)
        {
            try
            {
                await _repo.DeleteSpecialist(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}

