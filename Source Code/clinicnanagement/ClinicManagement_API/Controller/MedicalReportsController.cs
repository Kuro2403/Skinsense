using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using ClinicManagement_Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class MedicalReportsController : ConBase
    {
        private readonly IMedicalReportRepository _repo;
        public MedicalReportsController(IMedicalReportRepository repo)
        {
            _repo = repo;
        }
        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllMedicalReportAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var medicalReport = await _repo.getMedicalReportAsync(id);
            return medicalReport == null ? NotFound() : Ok(medicalReport);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] MedicalReportDto model)
        {
            try
            {
                var addMedicalMedicalReportID = await _repo.addMedicalReportAsync(model);
                var MedicalReport = await _repo.getMedicalReportAsync(addMedicalMedicalReportID);
                return MedicalReport == null ? NotFound() : Ok(MedicalReport);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] MedicalReportDto model)
        {
            try
            {
                model.MedicalReportID = id;
                await _repo.updateMedicalReportAsync(id, model);
                var MedicalReport = await _repo.getMedicalReportAsync(id);
                return Ok(MedicalReport);
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
                await _repo.deleteMedicalReportAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
