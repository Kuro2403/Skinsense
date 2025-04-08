namespace API_ClinicManagement.Helper
{
    public class Appsettings
    {
        public string? SecretKey { get; set; }
    }
    public class EmailSenderAppointments
    {
        public string Email { get; set; } = null!;
        public string Date { get; set; } = null!;
        public string Time { get; set; } = null!;
        public string Doctor { get; set; } = null!;
        public string Hospital { get; set; } = null!;
        public string Address { get; set; } = null!;
    }
}
