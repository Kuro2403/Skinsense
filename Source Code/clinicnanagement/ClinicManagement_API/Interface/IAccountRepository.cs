using API_ClinicManagement.ModelAutoMapper;
using ClinicManagement_Model;

namespace API_ClinicManagement.Interface
{
    public interface IAccountRepository
    {
        public Task<IList<AccountDto>> getAllAccountAsync();
        public Task<AccountDto> getAccountAsync(int id);
        public Task<int> addAccountAsync(AccountDto obj);
        public Task updateAccountAsync(int id, AccountDto obj);
        public Task deleteAccountAsync(int id);
    }
}
