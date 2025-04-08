using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class HistoryRoomClinicsController : ConBase
    {
        private readonly IRoomRepository _repo;
        public HistoryRoomClinicsController(IRoomRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetRooms()
        {
            try
            {
                return Ok(await _repo.GetRooms());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var treatment = await _repo.GetRoom(id);
            return treatment == null ? NotFound() : Ok(treatment);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] HistoryRoomClinicDto obj)
        {
            try
            {
                var res = await _repo.AddRoom(obj);
                var data = await _repo.GetRoom(res);
                return data == null ? NotFound() : Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] HistoryRoomClinicDto obj)
        {
            try
            {
                obj.HistoryRoomClinicID = id;
                await _repo.UpdateRoom(id, obj);
                var data = await _repo.GetRoom(id);
                return Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            try
            {
                await _repo.DeleteRoom(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}