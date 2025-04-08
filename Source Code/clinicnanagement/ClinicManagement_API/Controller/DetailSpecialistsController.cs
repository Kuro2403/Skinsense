using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class DetailSpecialistsController : ConBase
    {
        private readonly IDetailSpecialistRepository _repo;
        public DetailSpecialistsController(IDetailSpecialistRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetDetailSpecialists()
        {
            try
            {
                return Ok(await _repo.GetDetailSpecialists());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var treatment = await _repo.GetDetailSpecialist(id);
            return treatment == null ? NotFound() : Ok(treatment);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] DetailSpecialistDto obj)
        {
            try
            {
                var res = await _repo.AddDetailSpecialist(obj);
                var data = await _repo.GetDetailSpecialist(res);
                return data == null ? NotFound() : Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] DetailSpecialistDto obj)
        {
            try
            {
                obj.DetailSpecialistID = id;
                await _repo.UpdateDetailSpecialist(id, obj);
                var data = await _repo.GetDetailSpecialist(id);
                return Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteDetailSpecialist(int id)
        {
            try
            {
                await _repo.DeleteDetailSpecialist(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
