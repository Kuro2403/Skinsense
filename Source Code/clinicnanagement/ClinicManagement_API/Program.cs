using API_ClinicManagement.Data;
using API_ClinicManagement.Helper;
using API_ClinicManagement.Interface;
using API_ClinicManagement.Services;
using ClinicManagement_Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add Cors ALL Option
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Connection database
//1. SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(
    options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("SQL")
                ?? throw new InvalidOperationException("Connection string 'SQL' not found.")
        )
);

//2. MySQL
/*builder.Services.AddDbContext<ApplicationDbContext>(
    options =>
        options.UseMySQL(
            builder.Configuration.GetConnectionString("MySQL")
                ?? throw new InvalidOperationException("Connection string 'MySQL' not found.")
        )
);
*/
// Add services to the container.
builder.Services
    .AddControllers()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

//config JWT credentials
builder.Services.Configure<Appsettings>(builder.Configuration.GetSection("Appsettings"));
var secretKey = builder.Configuration["Appsettings:SecretKey"];
var secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);

//Add JWT
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(h =>
    {
        h.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),
            ClockSkew = TimeSpan.Zero,
        };
    });

//Add Service DJ
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IMedicationRepository, MedicationRepository>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
builder.Services.AddScoped<IReportFromAiRepository, ReportFromAiRepository>();
builder.Services.AddScoped<ITreatmentRepository, TreatmentRepository>();
builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IInvoiceRepository, InvoiceRepository>();
builder.Services.AddScoped<IMedicalReportRepository, MedicalReportRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IDetailDoctorRepository, DetailDoctorRepository>();
builder.Services.AddScoped<IDetailSpecialistRepository, DetailSpecialistRepository>();
builder.Services.AddScoped<IRoleSpecialistRepository, RoleSpecialistRepository>();
builder.Services.AddScoped<IRoomClinicRepository, RoomClinicRepository>();
builder.Services.AddScoped<ISpecialistRepository, SpecialistRepository>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IDetailInvoiceRepository, DetailInvoiceRepository>();
var app = builder.Build();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<ApplicationDbContext>();
    //Create a new database when running project
    //context.Database.EnsureCreated();
    //DbInitializer.Seed(context); // seed data here
    SeedData.Initialize(context);
}
catch (Exception ex)
{
    Console.WriteLine(ex);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();
