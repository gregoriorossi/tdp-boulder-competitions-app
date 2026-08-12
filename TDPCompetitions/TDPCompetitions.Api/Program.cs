using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuestPDF.Infrastructure;
using Resend;
using System.Text;
using TDPCompetitions.Api.Extensions;
using TDPCompetitions.Infrastracture.Data;
using JWTConsts = TDPCompetitions.Api.Constants.Config.JWT;

var builder = WebApplication.CreateBuilder(args);

bool useMockDatabase = builder.Configuration[TDPCompetitions.Api.Constants.Config.UseMockDatabase] == "True";

if (useMockDatabase)
{
    builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("MyInMemoryDatabaseDb"));
}
else
{

    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
}




QuestPDF.Settings.License = LicenseType.Community;

builder.Services.AddControllers();
builder.Services.AddOptions();
builder.Services.AddHttpClient<ResendClient>();
builder.Services.Configure<ResendClientOptions>(options =>
{
    options.ApiToken = builder.Configuration[TDPCompetitions.Api.Constants.Config.EmailServiceSettings.ApiToken];
});
builder.Services.AddTransient<IResend, ResendClient>();
builder.Services.RegisterService(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "TDPCompetitions API", Version = "v1" });

    options.CustomSchemaIds(type => type.FullName);
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration[JWTConsts.Issuer],
            ValidAudience = builder.Configuration[JWTConsts.Issuer],
            IssuerSigningKey = new SymmetricSecurityKey(
                 Encoding.UTF8.GetBytes(builder.Configuration[JWTConsts.Key]!)
             )
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    // TODO sistemare
    options.AddPolicy(name: "ALL", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .WithExposedHeaders("Content-Disposition");
    });
});
var app = builder.Build();

if (useMockDatabase)
{
    app.AddInMemoryDatabaseMockContent();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("ALL");

app.UseAuthorization();

app.MapControllers();

app.Run();

