using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoffeeTracker.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Data;
using System;

namespace ShiftsLoggerWebApi.Controllers;

[Route("api/CoffeeCups")]
[ApiController]

public class CoffeeCupsController(CoffeeTrackerContext dbContext) : ControllerBase
{
    private readonly CoffeeTrackerContext DBContext = dbContext;

    [HttpGet]
    public async Task<ActionResult> GetCoffeeCups()
    {
        if (DBContext.Coffee == null)
            return Problem("Entity set 'Coffee'  is null.");

        var coffeeQuery = from m in DBContext.Coffee
            select m;
  
        return Ok(await coffeeQuery.ToListAsync());
    }

}