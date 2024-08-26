using DND.NETCore.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DND.NETCore.DataAccess
{
    public class DND_DbContext : DbContext
    {
        public DND_DbContext(DbContextOptions<DND_DbContext> options)
            : base(options)
        {
            
        }

        public DbSet<CharacterEntity> Characters { get; set; }
    }
}
