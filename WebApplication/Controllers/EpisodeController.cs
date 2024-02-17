using DAL.Context;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpisodeController : ControllerBase
    {
        private readonly SqlDbContext _context;

        public EpisodeController(SqlDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Episode>>> GetEpisodes()
        {
            if (_context.Episodes == null)
                return NotFound();
            return await _context.Episodes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetEpisode(int id)
        {
            if (_context.Episodes == null)
                return BadRequest();

            var episode = await _context.Episodes.FindAsync(id);

            if (episode == null)
                return NotFound();

            return Ok(episode);
        }
        [HttpGet("{ids}")]
        public async Task<ActionResult<IEnumerable<Character>>> GetMultipleEpisodes([FromRoute] string ids)
        {
            try
            {

                var idArray = ids.Trim('[', ']').Split(',').Select(int.Parse).ToArray();


                var episodes = await _context.Episodes
                    .Where(c => idArray.Contains(c.Id))
                    .ToListAsync();

                if (episodes == null || episodes.Count == 0)
                    return NotFound();

                return Ok(episodes);
            }
            catch (Exception)
            {
                return BadRequest("Invalid format for episodes ids.");
            }
        }
    }
}
