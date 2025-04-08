using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class RoleSpecialistsController : ConBase
    {
        private readonly IRoleSpecialistRepository _repo;
        public RoleSpecialistsController(IRoleSpecialistRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetRoleSpecialists()
        {
            try
            {
                return Ok(await _repo.GetRoleSpecialists());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var treatment = await _repo.GetRoleSpecialist(id);
            return treatment == null ? NotFound() : Ok(treatment);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] RoleSpecialistDto obj)
        {
            try
            {
                var res = await _repo.AddRoleSpecialist(obj);
                var data = await _repo.GetRoleSpecialist(res);
                return data == null ? NotFound() : Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] RoleSpecialistDto obj)
        {
            try
            {
                obj.RoleSpecialistID = id;
                await _repo.UpdateRoleSpecialist(id, obj);
                var data = await _repo.GetRoleSpecialist(id);
                return Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteRoleSpecialist(int id)
        {
            try
            {
                await _repo.DeleteRoleSpecialist(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
