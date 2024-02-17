using DAL.Context;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly SqlDbContext _context;

        public LocationController(SqlDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations()
        {
            if (_context.Locations == null)
                return NotFound();
            return await _context.Locations.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocation(int id)
        {
            if (_context.Locations == null)
                return BadRequest();

            var location = await _context.Locations.FindAsync(id);

            if (location == null)
                return NotFound();

            return Ok(location);
        }
        [HttpGet("{ids}")]
        public async Task<ActionResult<IEnumerable<Character>>> GetMultipleLocations([FromRoute] string ids)
        {
            try
            {

                var idArray = ids.Trim('[', ']').Split(',').Select(int.Parse).ToArray();


                var locations = await _context.Locations
                    .Where(c => idArray.Contains(c.Id))
                    .ToListAsync();

                if (locations == null || locations.Count == 0)
                    return NotFound();

                return Ok(locations);
            }
            catch (Exception)
            {
                return BadRequest("Invalid format for location ids.");
            }
        }
    }
}
