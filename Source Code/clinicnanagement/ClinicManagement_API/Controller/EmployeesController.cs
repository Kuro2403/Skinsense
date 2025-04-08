using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class EmployeesController : ConBase
    {

        private readonly IEmployeeRepository _repo;
        public EmployeesController(IEmployeeRepository repo)
        {
            _repo = repo;
        }
        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllEmployeeAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _repo.getEmployeeAsync(id);
            return employee == null ? NotFound() : Ok(employee);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] EmployeeDto model)
        {
            try
            {
                var id = await _repo.addEmployeeAsync(model);
                var Employee = await _repo.getEmployeeAsync(id);
                return Employee == null ? NotFound() : Ok(Employee);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] EmployeeDto model)
        {
            try
            {
                model.EmployeeID = id;
                await _repo.updateEmployeeAsync(id, model);
                var Employee = await _repo.getEmployeeAsync(id);
                return Ok(Employee);
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
                await _repo.deleteEmployeeAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
