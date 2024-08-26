namespace DND.NETCore.API.Contracts
{
    public record CharactersResponce(
        Guid Id,
        string Name,
        string Description,
        int Initiative,
        bool Current);
}
