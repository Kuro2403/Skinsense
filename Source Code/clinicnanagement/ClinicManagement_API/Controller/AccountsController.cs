using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using ClinicManagement_Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_ClinicManagement.Controller
{
    public class AccountsController : ConBase
    {
        private readonly IAccountRepository _repo;
        public AccountsController(IAccountRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("Gets")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.getAllAccountAsync());
            }
            catch
            {
                return BadRequest(ModelState);
            }
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var Account = await _repo.getAccountAsync(id);
            return Account == null ? NotFound() : Ok(Account);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] AccountDto obj)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var addAccountId = await _repo.addAccountAsync(obj);
                var Account = await _repo.getAccountAsync(addAccountId);
                return Account == null ? NotFound() : Ok(Account);
            }
            catch
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] AccountDto obj)
        {
            try
            {
                obj.AccountID = id;
                await _repo.updateAccountAsync(id, obj);
                var Account = await _repo.getAccountAsync(id);
                return Ok(Account);
            }
            catch
            {
                return BadRequest(ModelState);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> RemoveById(int id)
        {
            try
            {
                await _repo.deleteAccountAsync(id);
                return Ok("Delete success");
            }
            catch
            {
                return BadRequest(ModelState);
            }
        }
    }
}
