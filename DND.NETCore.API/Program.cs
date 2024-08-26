using DND.NETCore.Application.Services;
using DND.NETCore.Core.Abstractions;
using DND.NETCore.DataAccess;
using DND.NETCore.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DND_DbContext>(
    options => 
    {
        options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(DND_DbContext)));
    });

builder.Services.AddScoped<ICharactersService, CharactersService>();
builder.Services.AddScoped<ICharactersRepository, CharactersRepository>();

builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowVueApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:8080") // Vue app's URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
            builder.WithOrigins("http://localhost:5173") // Vue app's URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
            builder.WithOrigins("https://localhost:8080") // Vue app's URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
            builder.WithOrigins("https://localhost:5173") // Vue app's URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
            builder.WithOrigins("https://localhost") 
                   .AllowAnyHeader()
                   .AllowAnyMethod();
            builder.WithOrigins("http://localhost") 
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowVueApp");
app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    var logger = app.Logger;
    logger.LogInformation("Handling request: {Method} {Url}", context.Request.Method, context.Request.Path);
    await next.Invoke();
    logger.LogInformation("Finished handling request.");
});

app.MapControllers();

app.Run();
