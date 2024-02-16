using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;


namespace DAL.Context
{
    public class SqlDbContext : DbContext
    {
        
        private readonly IConfiguration _configuration;
        public DbSet<Character>Characters { get; set; }
        public DbSet<Episode>Episodes { get; set; }
        public DbSet<Location> Locations { get; set; }

        public SqlDbContext(DbContextOptions options,IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer(@"Data Source=BERKPC; Initial Catalog= KonusarakOgrenDb; Integrated Security=true");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
           
               

        }

    }
}
