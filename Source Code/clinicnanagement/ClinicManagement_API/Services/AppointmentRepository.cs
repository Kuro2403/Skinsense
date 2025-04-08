using API_ClinicManagement.Interface;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;
using Microsoft.EntityFrameworkCore;

namespace API_ClinicManagement.Services
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public AppointmentRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<int> addAppointmentAsync(Appointment appointment)
        {
            var appointmentnew = _mapper.Map<Appointment>(appointment);
            _context.Appointments.Add(appointmentnew);
            await _context.SaveChangesAsync();
            return appointmentnew.AppointmentID;
        }
        //Delete Appointment
        public async Task deleteAppointmentAsync(int id)
        {
            var delete = _context.Appointments.SingleOrDefault(a => a.AppointmentID == id);
            if (delete != null)
            {
                _context.Appointments.Remove(delete);
                await _context.SaveChangesAsync();
            }
        }
        // Get all appointment
        public async Task<IList<AppointmentDto>> getAllAppointmentAsync()
        {
            var appoinment = await _context.Appointments
                .Include(s => s.Doctor)
                .Include(s => s.Patient)
                .ThenInclude(h => h!.Account)
                .Include(s => s.Doctor!.Employee)
                .ThenInclude(h => h!.Account)
                .ToListAsync();
            return _mapper.Map<List<AppointmentDto>>(appoinment);
        }
        //Get AppointmentById
        public async Task<AppointmentDto> getAppointmentAsync(int id)
        {
            var appoinment = await _context.Appointments!
                .Include(h => h.Doctor)
                .Include(s => s.Doctor!.Employee)
                .ThenInclude(h => h!.Account)
                .Include(h => h.Patient)
                .ThenInclude(h => h!.Account)
                .FirstOrDefaultAsync(h => h.AppointmentID == id);
            return _mapper.Map<AppointmentDto>(appoinment);
        }
        //Update Appointment
        public async Task updateAppointmentAsync(int id, Appointment appointment)
        {
            if (id == appointment.AppointmentID)
            {
                var appointmentupdate = _mapper.Map<Appointment>(appointment);
                _context.Appointments.Update(appointmentupdate);
                await _context.SaveChangesAsync();
            }
        }
    }
}
