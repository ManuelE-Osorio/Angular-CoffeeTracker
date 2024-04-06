using CoffeeTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace CoffeeTracker;

public class CoffeeTracker
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddControllers();
        builder.Services.AddDbContext<CoffeeTrackerContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("CoffeeTrackerConnectionString") ?? 
                throw new InvalidOperationException("Connection string 'CoffeeTracker' not found.")));

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.MapControllers();
        app.Run();
    }
}




