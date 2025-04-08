using API_ClinicManagement.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    public class RolesController : ConBase
    {
        private readonly IRoleRepository _repo;
        public RolesController(IRoleRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                return Ok(await _repo.GetRoles());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var treatment = await _repo.GetRole(id);
            return treatment == null ? NotFound() : Ok(treatment);

        }
    }
}
