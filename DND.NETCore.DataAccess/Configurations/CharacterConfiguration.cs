
using DND.NETCore.Core.Models;
using DND.NETCore.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DND.NETCore.DataAccess.Configurations
{
    public class CharacterConfiguration : IEntityTypeConfiguration<CharacterEntity>
    {
        public void Configure(EntityTypeBuilder<CharacterEntity> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .HasMaxLength(Character.MAX_NAME_LENGTH)
                .IsRequired();

            builder.Property(x => x.Description)
                .IsRequired();

            builder.Property(x => x.Initiative)
                .IsRequired();

            builder.Property(x => x.Current)
                .IsRequired();
        }
    }
}
