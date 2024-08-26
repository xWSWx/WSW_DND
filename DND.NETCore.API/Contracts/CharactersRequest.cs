namespace DND.NETCore.API.Contracts
{
    public record CharactersRequest(
        string Name,
        string Description,
        int Initiative,
        bool Current);
}
