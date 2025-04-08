using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClinicManagement_Model;
using System.Diagnostics.Metrics;
using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class AppointmentsController : ConBase
    {
        private readonly IAppointmentRepository _repo;

        public AppointmentsController(IAppointmentRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllAppointmentAsync());
            }
            catch
            {
                return BadRequest(ModelState);
            }
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var appointment = await _repo.getAppointmentAsync(id);
            return appointment == null ? NotFound() : Ok(appointment);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] Appointment obj)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var appID = await _repo.addAppointmentAsync(obj);
                var appointment = await _repo.getAppointmentAsync(appID);
                return appointment == null ? NotFound() : Ok(appointment);
            }
            catch
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Appointment obj)
        {
            try
            {
                obj.AppointmentID = id;
                await _repo.updateAppointmentAsync(id, obj);
                var appointment = await _repo.getAppointmentAsync(id);
                return Ok(appointment);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> RemoveById(int id)
        {
            try
            {
                await _repo.deleteAppointmentAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
