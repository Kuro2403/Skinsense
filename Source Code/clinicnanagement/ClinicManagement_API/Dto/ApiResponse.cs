namespace API_ClinicManagement.ModelAutoMapper
{
    public class ApiResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? Role { get; set; }
        public object? Data { get; set; }
    }
}
