using Microsoft.EntityFrameworkCore;

namespace ClinicManagement_Model
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }
        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<MedicalReport> MedicalReports { get; set; }
        public virtual DbSet<Medication> Medications { get; set; }
        public virtual DbSet<Prescription> Prescriptions { get; set; }
        public virtual DbSet<Treatment> Treatments { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<ReportFromAi> ReportFromAis { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<DetailDoctor> DetailDoctors { get; set; }
        public virtual DbSet<DetailSpecialist> DetailSpecialists { get; set; }
        public virtual DbSet<Specialist> Specialists { get; set; }
        public virtual DbSet<RoomClinic> RoomClinics { get; set; }
        public virtual DbSet<RoleSpecialist> RoleSpecialists { get; set; }
        public virtual DbSet<HistoryRoomClinic> Rooms { get; set; }
        public virtual DbSet<DetailInvoice> DetailInvoices { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>().ToTable("Account");
            modelBuilder.Entity<Doctor>().ToTable("Doctor");
            modelBuilder.Entity<Patient>().ToTable("Patient");
            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<Invoice>().ToTable("Invoice");
            modelBuilder.Entity<MedicalReport>().ToTable("MedicalReport");
            modelBuilder.Entity<Medication>().ToTable("Medication");
            modelBuilder.Entity<Prescription>().ToTable("Prescription");
            modelBuilder.Entity<Treatment>().ToTable("Treatment");
            modelBuilder.Entity<News>().ToTable("News");
            modelBuilder.Entity<ReportFromAi>().ToTable("ReportFromAi");
            modelBuilder.Entity<Role>().ToTable("Role");
            modelBuilder.Entity<RoleSpecialist>().ToTable("RoleSpecialist");
            modelBuilder.Entity<RoomClinic>().ToTable("RoomClinic");
            modelBuilder.Entity<Specialist>().ToTable("Specialist");
            modelBuilder.Entity<DetailSpecialist>().ToTable("DetailSpecialist");
            modelBuilder.Entity<DetailDoctor>().ToTable("DetailDoctor");
            modelBuilder.Entity<HistoryRoomClinic>().ToTable("HistoryRoomClinic");
            modelBuilder.Entity<DetailInvoice>().ToTable("DetailInvoice");
            modelBuilder.Entity<Appointment>().ToTable("Appointment");
            modelBuilder.Entity<Appointment>()
                        .HasOne(a => a.Patient)
                        .WithMany(p => p.Appointments)
                        .HasForeignKey(a => a.PatientID)
                        .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
