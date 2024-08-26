using DND.NETCore.Core.Models;

namespace DND.NETCore.Core.Abstractions
{
    public interface ICharactersService
    {
        Task<Guid> CreateCharacter(Character character);
        Task<Guid> DeleteCharacter(Guid id);
        Task<List<Character>> GetAllCharacters();
        Task<Guid> UpdateCharacter(Guid id, string name, string description, int initiative, bool current);
    }
}