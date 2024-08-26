
using DND.NETCore.Core.Abstractions;
using DND.NETCore.Core.Models;
using DND.NETCore.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DND.NETCore.DataAccess.Repositories
{
    public class CharactersRepository : ICharactersRepository
    {
        private readonly DND_DbContext _context;

        public CharactersRepository(DND_DbContext context)
        {
            _context = context;
        }

        public async Task<List<Character>> Get()
        {
            var characterEntities = await _context.Characters.
                AsNoTracking().
                ToListAsync();

            //TODO: Доверяю ли я тому, что в БД лежит валидная запись с валидной сущность через которую я создам character?
            var characters = characterEntities
                .Select(x => Character.Create(x.Id, x.Name, x.Description, x.Initiative, x.Current).Character)
                .ToList();

            return characters;
        }

        public async Task<Guid> Create(Character character)
        {
            var characterEntity = new CharacterEntity
            {
                Id = character.Id,
                Name = character.Name,
                Description = character.Description,
                Initiative = character.Initiative,
                Current = character.Current
            };

            await _context.Characters.AddAsync(characterEntity);
            await _context.SaveChangesAsync();

            return characterEntity.Id;
        }

        public async Task<Guid> Update(Guid id, string name, string description, int initiative, bool current)
        {
            await _context.Characters
                .Where(x => x.Id == id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.Name, x => name)
                    .SetProperty(x => x.Description, x => description)
                    .SetProperty(x => x.Initiative, x => initiative)
                    .SetProperty(x => x.Current, x => current));

            return id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _context.Characters
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync();

            return id;
        }
    }
}
