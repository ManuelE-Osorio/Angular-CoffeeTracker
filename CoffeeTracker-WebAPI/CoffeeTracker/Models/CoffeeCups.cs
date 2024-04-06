namespace CoffeeTracker.Models;

public class CoffeeCups
{
    public int Id {get; set;}
    public int Quantity {get; set;}
    public int? Measure {get; set;}
    public string? Description {get; set;}
    public CoffeeMeasureUnits Units { get; set;}
    public DateOnly Date {get; set;}
}