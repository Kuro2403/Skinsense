using API_ClinicManagement.Dto;
using API_ClinicManagement.ModelAutoMapper;
using AutoMapper;
using ClinicManagement_Model;

namespace API_ClinicManagement.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Appointment, AppointmentDto>().ReverseMap();
            CreateMap<Medication, MedicationDto>().ReverseMap();
            CreateMap<News, NewsDto>().ReverseMap();
            CreateMap<Patient, PatientDto>().ReverseMap();
            CreateMap<Prescription, PrescriptionDto>().ReverseMap();
            CreateMap<ReportFromAi, ReportFromAiDto>().ReverseMap();
            CreateMap<Treatment, TreatmentDto>().ReverseMap();
            CreateMap<Doctor, DoctorDto>().ReverseMap();
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Invoice, InvoiceDto>().ReverseMap();
            CreateMap<MedicalReport, MedicalReportDto>().ReverseMap();
            CreateMap<Account, AccountDto>().ReverseMap();
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<DetailDoctor, DetailDoctorDto>().ReverseMap();
            CreateMap<Specialist, SpecialistDto>().ReverseMap();
            CreateMap<RoleSpecialist, RoleSpecialistDto>().ReverseMap();
            CreateMap<DetailSpecialist, DetailSpecialistDto>().ReverseMap();
            CreateMap<RoomClinic, RoomClinicDto>().ReverseMap();
            CreateMap<HistoryRoomClinic, HistoryRoomClinicDto>().ReverseMap();
            CreateMap<Treatment, TreatmentDto>().ReverseMap();
            CreateMap<DetailInvoice, DetailInvoiceDto>().ReverseMap();
        }
    }
}
