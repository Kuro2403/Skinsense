using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]

    public class RoomClinicsController : ConBase
    {
        private readonly IRoomClinicRepository _repo;
        public RoomClinicsController(IRoomClinicRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetRoomClinics()
        {
            try
            {
                return Ok(await _repo.GetRoomClinics());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var treatment = await _repo.GetRoomClinic(id);
            return treatment == null ? NotFound() : Ok(treatment);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] RoomClinicDto obj)
        {
            try
            {
                var res = await _repo.AddRoomClinic(obj);
                var data = await _repo.GetRoomClinic(res);
                return data == null ? NotFound() : Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] RoomClinicDto obj)
        {
            try
            {
                obj.RoomClinicID = id;
                await _repo.UpdateRoomClinic(id, obj);
                var data = await _repo.GetRoomClinic(id);
                return Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteRoomClinic(int id)
        {
            try
            {
                await _repo.DeleteRoomClinic(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
