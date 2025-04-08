using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public AccountRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addAccountAsync(AccountDto obj)
        {
            var objAccount = new Account
            {
                AccountID = obj.AccountID,
                Mail = obj.Mail!,
                Password = BCrypt.Net.BCrypt.HashPassword(obj.Password),
                Avatar = obj.Avatar!,
                Gender = obj.Gender!,
                RoleID = obj.RoleID
            };
            var Accountnew = _mapper.Map<Account>(objAccount);
            _context.Accounts.Add(Accountnew);
            await _context.SaveChangesAsync();
            return Accountnew.AccountID;
        }
        //Delete Account
        public async Task deleteAccountAsync(int id)
        {
            var delete = _context.Accounts.SingleOrDefault(a => a.AccountID == id);
            if (delete != null)
            {
                _context.Accounts.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }
        // Get all Account
        public async Task<IList<AccountDto>> getAllAccountAsync()
        {
            var account = await _context.Accounts
                .Include(h => h.Role)
                .ToListAsync();
            return _mapper.Map<List<AccountDto>>(account);
        }
        //Get AccountById
        public async Task<AccountDto> getAccountAsync(int id)
        {
            var account = await _context.Accounts!
                .Include(h => h.Role)
                .FirstOrDefaultAsync(h => h.AccountID == id);
            return _mapper.Map<AccountDto>(account);
        }
        //Update Account
        public async Task updateAccountAsync(int id, AccountDto obj)
        {
            if (id == obj.AccountID)
            {

                if (obj.Password == null)
                {
                    var existingAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountID == obj.AccountID);
                    if (existingAccount != null)
                    {
                        existingAccount.Mail = obj.Mail!;
                        existingAccount.Avatar = obj.Avatar!;
                        existingAccount.Gender = obj.Gender!;
                        existingAccount.RoleID = obj.RoleID;
                        //Sử dụng phương thức Update để cập nhật thông tin tài khoản
                        _context.Accounts.Update(existingAccount);
                        await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    var objAccount = new Account
                    {
                        AccountID = obj.AccountID,
                        Mail = obj.Mail!,
                        Password = BCrypt.Net.BCrypt.HashPassword(obj.Password),
                        Avatar = obj.Avatar!,
                        Gender = obj.Gender!,
                        RoleID = obj.RoleID
                    };

                    var accountUpdate = _mapper.Map<Account>(objAccount);
                    _context.Accounts.Update(accountUpdate);
                    await _context.SaveChangesAsync();
                    return;
                }
            }
        }
    }
}
