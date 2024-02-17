using BL;
using DAL.Context;
using Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using NuGet.Common;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly SqlDbContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(SqlDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("[action]")]
        public async Task<Models.Token> Login(UserLogin userLogin)
        {
            User user = await _context.Users.FirstOrDefaultAsync(p => p.Email == userLogin.Email && p.Password == userLogin.Password);

            if (user != null)
            {
                //Token Uretmem lazim
                TokenManager tokenManager = new TokenManager(_configuration);
                Models.Token token = await tokenManager.CreateAccessToken(user);

                user.RefreshToken = token.RefreshToken;
                user.RefreshTokenEndDate = token.Expiration.AddMinutes(5);
                await _context.SaveChangesAsync();
                return token;
            }
            return null;
        }
        [HttpGet("[action]")]
        public async Task<Models.Token> RefreshTokenLogin([FromForm] string refreshToken)
        {
            User user = await _context.Users.FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);
            if (user != null && user?.RefreshTokenEndDate > DateTime.Now)
            {
                TokenManager tokenHandler = new TokenManager(_configuration);
                Models.Token token = await tokenHandler.CreateAccessToken(user);

                user.RefreshToken = token.RefreshToken;
                user.RefreshTokenEndDate = token.Expiration.AddMinutes(5);
                await _context.SaveChangesAsync();

                return token;
            }
            return null;
        }

        [HttpPost("[action]")]
        public async Task<bool> Create([FromForm] User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }



    }
}
