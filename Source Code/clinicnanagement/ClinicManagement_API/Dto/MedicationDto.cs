namespace API_ClinicManagement.ModelAutoMapper
{
    public class MedicationDto
    {
        public int MedicationID { get; set; }
        public string MedicationName { get; set; } = null!;
        //Liều lượng
        public string Dosage { get; set; } = null!;
        //Giá tiền
        public decimal Price { get; set; }
    }
}
