using ClinicManagement_Model;
using Microsoft.Extensions.Hosting;

namespace API_ClinicManagement.Data
{
    public class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            var roles = new Role[]
            {
                new Role
                {
                    RoleName = "Admin"
                },
                new Role
                {
                    RoleName = "Doctor"
                },
                new Role
                {
                    RoleName = "Staff"
                },
                new Role
                {
                    RoleName = "Customer"
                },

            };

            if (!context.Roles.Any())
            {
                context.Roles.AddRange(roles);
                context.SaveChanges();
            }
        }
    }
}