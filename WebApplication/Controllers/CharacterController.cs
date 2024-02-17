using DAL.Context;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            if(_context.Characters == null)
                return NotFound();
            return await _context.Characters.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetCharacter(int id)
        {
            if (_context.Characters == null)
                return BadRequest();

            var character = await _context.Characters.FindAsync(id);

            if(character == null)
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

    }
}
