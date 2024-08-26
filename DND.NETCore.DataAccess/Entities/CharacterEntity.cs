namespace DND.NETCore.DataAccess.Entities
{
    public class CharacterEntity
    {

        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Initiative { get; set; }
        public bool Current { get; set; }
    }
}
