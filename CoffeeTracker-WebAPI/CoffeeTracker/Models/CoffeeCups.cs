using System.ComponentModel.DataAnnotations;

namespace CoffeeTracker.Models;

public class CoffeeCups
{
    public int Id {get; set;}
    public int Quantity {get; set;}
    public int? Measure {get; set;}
    public string? Description {get; set;}

    [EnumDataType(typeof(CoffeeMeasureUnits))]
    public CoffeeMeasureUnits Units { get; set;}

    [DataType(DataType.Date)]
    public DateTime Date {get; set;}
}