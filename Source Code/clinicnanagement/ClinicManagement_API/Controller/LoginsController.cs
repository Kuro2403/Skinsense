using API_ClinicManagement.Helper;
using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using ClinicManagement_Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MySqlX.XDevAPI.Common;
using NuGet.Common;
using NuGet.Protocol;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_ClinicManagement.Controller
{
    public class LoginsController : ConBase
    {
        private readonly Appsettings _appsettings;
        private readonly IAccountRepository _repo;
        public IList<AccountDto> _accounts { get; set; } = default!;
        private readonly ApplicationDbContext _context;


        public LoginsController(IOptionsMonitor<Appsettings> optionsMonitor, IAccountRepository repo, ApplicationDbContext context)
        {
            _appsettings = optionsMonitor.CurrentValue;
            _repo = repo;
            _context = context;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Validate([FromBody] LoginModel obj)
        {
            try
            {
                var _accounts = await _context.Accounts.ToListAsync();
                var checkAccount = _accounts.FirstOrDefault(h => h.Mail.ToLower() == obj.email.ToLower());

                if (checkAccount != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(obj.password, checkAccount.Password))
                    {
                        var checkRole = await _repo.getAccountAsync(checkAccount.AccountID);
                        var role = checkRole!.Role!.RoleName;
                        return Ok(
                            new ApiResponse
                            {
                                Success = true,
                                Message = "Login success",
                                Role = role!,
                                Data = GenerateToken(obj.email!, role!),
                            }
                        );
                    }

                }
                return BadRequest(new ApiResponse { Success = false, Message = "Account does'n exist" });
            }
            catch
            {
                return NotFound();
            }
        }

        private string GenerateToken(string email, string roles)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var secretKeyBytes = Encoding.UTF8.GetBytes(_appsettings!.SecretKey!);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new[]
                    {
                        new Claim("Email", email),
                        new Claim("TokenId", Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.Role, roles)
                    }
                ),
                Expires = DateTime.UtcNow.AddHours(9),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(secretKeyBytes),
                    SecurityAlgorithms.HmacSha512Signature
                )
            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
