using DND.NETCore.Core.Models;

namespace DND.NETCore.Core.Abstractions
{
    public interface ICharactersRepository
    {
        Task<Guid> Create(Character character);
        Task<Guid> Delete(Guid id);
        Task<List<Character>> Get();
        Task<Guid> Update(Guid id, string name, string description, int initiative, bool current);
    }
}