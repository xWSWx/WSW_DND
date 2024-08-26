using DND.NETCore.Core.Abstractions;
using DND.NETCore.Core.Models;

namespace DND.NETCore.Application.Services
{
    public class CharactersService : ICharactersService
    {
        private readonly ICharactersRepository _charactersRepository;

        public CharactersService(ICharactersRepository charactersRepository)
        {
            _charactersRepository = charactersRepository;
        }
        public async Task<List<Character>> GetAllCharacters()
        {
            return await _charactersRepository.Get();
        }

        public async Task<Guid> CreateCharacter(Character character)
        {
            return await _charactersRepository.Create(character);
        }

        public async Task<Guid> UpdateCharacter(Guid id, string name, string description, int initiative, bool current)
        {
            return await _charactersRepository.Update(id, name, description, initiative, current);
        }

        public async Task<Guid> DeleteCharacter(Guid id)
        {
            return await _charactersRepository.Delete(id);
        }
    }
}
