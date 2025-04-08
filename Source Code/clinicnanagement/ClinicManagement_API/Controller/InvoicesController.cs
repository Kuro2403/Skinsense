using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    [Authorize]
    public class InvoicesController : ConBase
    {
        private readonly IInvoiceRepository _repo;
        public InvoicesController(IInvoiceRepository repo)
        {
            _repo = repo;
        }
        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllInvoiceAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var invoice = await _repo.getInvoiceAsync(id);
            return invoice == null ? NotFound() : Ok(invoice);

        }
        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] InvoiceDto model)
        {
            try
            {
                var addInvoiceId = await _repo.addInvoiceAsync(model);
                var Invoice = await _repo.getInvoiceAsync(addInvoiceId);
                return Invoice == null ? NotFound() : Ok(Invoice);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] InvoiceDto model)
        {
            try
            {
                model.InvoiceID = id;
                await _repo.updateInvoiceAsync(id, model);
                var Invoice = await _repo.getInvoiceAsync(id);
                return Ok(Invoice);
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
                await _repo.deleteInvoiceAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}