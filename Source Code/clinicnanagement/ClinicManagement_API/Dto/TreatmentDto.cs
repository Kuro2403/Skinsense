namespace API_ClinicManagement.ModelAutoMapper
{
    public class TreatmentDto
    {
        public int TreatmentID { get; set; }
        public string TreatmentName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Cost { get; set; }
        public string ImageTreatment { get; set; } = null!;
    }
}
