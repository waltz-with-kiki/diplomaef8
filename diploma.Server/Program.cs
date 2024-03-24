using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using try2.DAL.Interfaces;
using try2.DAL.Models;
using try2.DAL.Repositories;
using Version = try2.DAL.Models.Version;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddControllersWithViews()
    .AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


builder.Services.AddDbContext<AirplanesDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("POSTGRESQL")));

builder.Services.AddTransient<IRepository<Project>, ProjectRepository>();
builder.Services.AddTransient<IRepository<Version>, VersionRepository>();
builder.Services.AddTransient<IRepository<EducationType>, EducationTypeRepository>();
builder.Services.AddTransient<IRepository<Expert>, ExpertRepository>();
builder.Services.AddTransient<IRepository<AircraftType>, AircraftTypeRepository>();
builder.Services.AddTransient<IRepository<HmiQuestionnaire>, HmiQuestionnaireRepository>();
builder.Services.AddTransient<IRepository<ImQuestionnaire>, ImQuestionnaireRepository>();
builder.Services.AddTransient<IRepository<ExaminationTemplate>, ExaminationTemplateRepository>();
builder.Services.AddTransient<IRepository<Examination>, ExaminationRepository>();
builder.Services.AddTransient<IRepository<ImSectionGeneralAnswer>, ImSectionGeneralAnswerRepository>();
builder.Services.AddTransient<IRepository<ImQuestionnareGeneralAnswer>, ImQuestionnareGeneralAnswerRepository>();
builder.Services.AddTransient<IRepository<HmiQuestionnareGeneralAnswer>, HmiQuestionnareGeneralAnswerRepository>();
builder.Services.AddTransient<IRepository<ImGroupRequest>, ImGroupRequestRepository>();
builder.Services.AddTransient<IRepository<ImRequest>, ImRequestRepository>();
builder.Services.AddTransient<IRepository<HmiGroupRequest>, HmiGroupRequestRepository>();
builder.Services.AddTransient<IRepository<HmiRequest>, HmiRequestRepository>();
builder.Services.AddTransient<IRepository<ImSection>, ImSectionRepository>();
builder.Services.AddTransient<IRepository<HmiSection>, HmiSectionRepository>();
builder.Services.AddTransient<IRepository<HmiSectionGeneralAnswer>, HmiSectionGeneralAnswerRepository>();
builder.Services.AddTransient<IRepository<ImAnswer>, ImAnswerRepository>();
builder.Services.AddTransient<IRepository<HmiAnswer>, HmiAnswerRepository>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(
    x =>
    {
        x.WithHeaders().AllowAnyHeader();
        x.WithOrigins("https://localhost:5173");
        x.WithMethods().AllowAnyMethod();
    }
    );

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
