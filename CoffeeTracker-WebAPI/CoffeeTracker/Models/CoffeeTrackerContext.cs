using Microsoft.EntityFrameworkCore;

namespace CoffeeTracker.Models;

public class CoffeeTrackerContext(DbContextOptions<CoffeeTrackerContext> options) : DbContext(options)
{
    public DbSet<CoffeeCups> Coffee { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // add conversion to enum property
    }
}