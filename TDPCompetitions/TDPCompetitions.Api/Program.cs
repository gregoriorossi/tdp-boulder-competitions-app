using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuestPDF.Infrastructure;
using System.Text;
using TDPCompetitions.Api.Extensions;
using TDPCompetitions.Infrastracture.Data;
using JWTConsts = TDPCompetitions.Api.Constants.Config.JWT;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("MyInMemoryDatabaseDb"));
//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


QuestPDF.Settings.License = LicenseType.Community;

builder.Services.AddControllers();
builder.Services.RegisterService(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
        .AllowAnyMethod();
    });
});
var app = builder.Build();

app.AddInMemoryDatabaseMockContent();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("ALL");

//app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

