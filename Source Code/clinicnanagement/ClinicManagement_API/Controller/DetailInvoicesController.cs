using API_ClinicManagement.Dto;
using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    public class DetailInvoicesController : ConBase
    {
        private readonly IDetailInvoiceRepository _repo;
        public DetailInvoicesController(IDetailInvoiceRepository repo)
        {
            _repo = repo;
        }
        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllDetailInvoiceAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var DetailInvoice = await _repo.getDetailInvoiceAsync(id);
            return DetailInvoice == null ? NotFound() : Ok(DetailInvoice);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] DetailInvoiceDto model)
        {
            try
            {
                var id = await _repo.addDetailInvoiceAsync(model);
                var DetailInvoice = await _repo.getDetailInvoiceAsync(id);
                return DetailInvoice == null ? NotFound() : Ok(DetailInvoice);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] DetailInvoiceDto model)
        {
            try
            {
                model.DetailInvoiceID = id;
                await _repo.updateDetailInvoiceAsync(id, model);
                var DetailInvoice = await _repo.getDetailInvoiceAsync(id);
                return Ok(DetailInvoice);
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
                await _repo.deleteDetailInvoiceAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
