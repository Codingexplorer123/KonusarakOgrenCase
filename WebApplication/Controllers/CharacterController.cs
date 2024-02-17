using DAL.Context;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Net.NetworkInformation;

namespace WebApplication.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly SqlDbContext _context;

        public CharacterController(SqlDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Character>>> GetCharacters()
        {
            if (_context.Characters == null)
                return NotFound();
            return await _context.Characters.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetCharacter(int id)
        {
            if (_context.Characters == null)
                return BadRequest();

            var character = await _context.Characters.FindAsync(id);

            if (character == null)
                return NotFound();

            return Ok(character);
        }
        [HttpGet("{ids}")]
        public async Task<ActionResult<IEnumerable<Character>>> GetMultipleCharacters([FromRoute] string ids)
        {
            try
            {

                var idArray = ids.Trim('[', ']').Split(',').Select(int.Parse).ToArray();


                var characters = await _context.Characters
                    .Where(c => idArray.Contains(c.Id))
                    .ToListAsync();

                if (characters == null || characters.Count == 0)
                    return NotFound();

                return Ok(characters);
            }
            catch (Exception)
            {
                return BadRequest("Invalid format for character ids.");
            }
        }
        [HttpGet("filter")]
        // /api/character/filter? name = Rick & status = Alive
        public async Task<ActionResult<IEnumerable<Character>>> FilterCharacters
            ([FromBody] string? name, [FromBody] string? status, [FromBody] string? species,
            [FromBody] string? type, [FromBody] string? gender)
        {
            Expression<Func<Character, bool>> filterExpression = c =>
             (string.IsNullOrWhiteSpace(name) || c.Name.ToLower().Contains(name.ToLower())) &&
             (string.IsNullOrWhiteSpace(status) || c.Status.ToLower() == status.ToLower()) &&
             (string.IsNullOrWhiteSpace(species) || c.Species.ToLower() == species.ToLower()) &&
             (string.IsNullOrWhiteSpace(type) || c.Type.ToLower() == type.ToLower()) &&
             (string.IsNullOrWhiteSpace(gender) || c.Gender.ToLower() == gender.ToLower());

            var filteredCharacters = await _context.Characters
               .Where(filterExpression)
               .ToListAsync();

            if (filteredCharacters == null || filteredCharacters.Count == 0)
                return NotFound();

            return Ok(filteredCharacters);
        }

    }
}
