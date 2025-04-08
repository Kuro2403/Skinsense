namespace API_ClinicManagement.Helper
{
    public class RandomHelper
    {
        public static string RandomNumber()
        {
            Random random = new Random();
            int randomNumber = random.Next(1000, 10000);
            return randomNumber.ToString();
        }
    }
}
