using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace API_ClinicManagement.Services
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public EmployeeRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addEmployeeAsync(EmployeeDto employee)
        {
            var employeenew = _mapper.Map<Employee>(employee);
            _context.Employees.Add(employeenew);
            await _context.SaveChangesAsync();
            return employeenew.EmployeeID;
        }

        public async Task deleteEmployeeAsync(int id)
        {
            var delete = _context.Employees.SingleOrDefault(a => a.EmployeeID == id);
            if (delete != null)
            {
                _context.Employees.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IList<EmployeeDto>> getAllEmployeeAsync()
        {
            var employee = await _context.Employees
                .Include(s => s.Account)
                .Include(s => s.Account!.Role)
                .ToListAsync();
            return _mapper.Map<List<EmployeeDto>>(employee);
        }

        public async Task<EmployeeDto> getEmployeeAsync(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.Account)
                .ThenInclude(a => a!.Role)
                .FirstOrDefaultAsync(e => e.EmployeeID == id);
            return _mapper.Map<EmployeeDto>(employee);
        }

        public async Task updateEmployeeAsync(int id, EmployeeDto employee)
        {
            if (id == employee.EmployeeID)
            {
                var employeeupdate = _mapper.Map<Employee>(employee);
                _context.Employees.Update(employeeupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
