using ASPNetCoreAPI.Data;
using ASPNetCoreAPI.Infrastructure;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

string MyAllowSpecificOrigins = "localhost";

var builder = WebApplication.CreateBuilder(args);

//Add cors
var corsConfigValue = builder.Configuration.GetValue<string>("Cors");
builder.Services.AddCors(o => o.AddPolicy(MyAllowSpecificOrigins, builder =>
{
    builder.WithOrigins(corsConfigValue?.Split(','))
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
}));

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetValue<string>("ConnectionStrings:DefaultConnection")));

builder.Services.AddTransient<ImageSaver>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.SeedDatabase<ApplicationDbContext>();
app.Run();
