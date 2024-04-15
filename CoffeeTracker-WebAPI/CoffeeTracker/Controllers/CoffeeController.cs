using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoffeeTracker.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Data;
using System;

namespace ShiftsLoggerWebApi.Controllers;


[ApiController]
[ApiConventionType(typeof(DefaultApiConventions))]
[Route("api/CoffeeCups")]
public class CoffeeCupsController(CoffeeTrackerContext dbContext) : ControllerBase
{
    private readonly CoffeeTrackerContext CoffeeContext = dbContext;

    [HttpGet]
    public async Task<IResult> GetCoffeeCups()
    {
        if (CoffeeContext.Coffee == null)
            return TypedResults.Problem("Entity set 'Coffee'  is null.");
  
        return TypedResults.Ok(await CoffeeContext.Coffee.OrderBy( p => p.Date).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IResult> GetCoffeeCup( int id )
    {
        if (CoffeeContext.Coffee == null)
            return TypedResults.Problem("Entity set 'Coffee'  is null.");

        var cup = await CoffeeContext.Coffee.FindAsync(id);
        if(cup is null)
            return TypedResults.NotFound();

        return TypedResults.Ok( cup );
    }

    [HttpPost]
    public async Task<IResult> PostCoffeeCup( [FromBody] CoffeeCups cup)
    {
        if (!ModelState.IsValid)
            return TypedResults.BadRequest();

        CoffeeContext.Coffee.Add(cup);
        await CoffeeContext.SaveChangesAsync();
        return TypedResults.Created($"/{cup.Id}",cup);
    }

    [HttpDelete("{id}")]
    public async Task<IResult> DeleteCoffeeCup( int id)
    {
        var cup = await CoffeeContext.Coffee.FindAsync( id );
        if( cup is null)
            return TypedResults.NotFound();
        
        CoffeeContext.Coffee.Remove(cup);
        await CoffeeContext.SaveChangesAsync();
        return TypedResults.Ok();
    }

    [HttpPut("{id}")]
    public async Task<IResult> PutCoffeeCup( int id, [FromBody] CoffeeCups cup )
    {
        if(!ModelState.IsValid || id != cup.Id)
            return TypedResults.BadRequest();

        if( !CoffeeContext.Coffee.Any( p => p.Id == id))
            return TypedResults.NotFound();

        CoffeeContext.Coffee.Update(cup);
        await CoffeeContext.SaveChangesAsync();
        return TypedResults.Ok(cup);
    }
}