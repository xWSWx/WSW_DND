var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
        });
});

// Configure logging
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
