using System.Reflection;

namespace DND.NETCore.Core.Models
{
    public class Character
    {
        public const int MAX_NAME_LENGTH = 250;
        private Character(Guid id, string name, string description, int initiative, bool current)
        {
            Id = id;
            Name = name;
            Description = description;
            Initiative = initiative;
            Current = current;
        }

        public Guid Id { get; }
        public string Name { get; } = string.Empty;
        public string Description { get; } = string.Empty;
        public int Initiative { get; }
        //TODO: только get! set был добавлен для дебага!!
        public bool Current { get; set; }

        public static (Character Character, string Error) Create(Guid id, string name, string description, int initiative, bool current)
        {
            var error = string.Empty;
            if (string.IsNullOrEmpty(name) || name.Length > MAX_NAME_LENGTH) 
            {
                error = $"Name can not be empty or longer then {MAX_NAME_LENGTH} sybmols";                
            }
            var Character = new Character(id, name, description, initiative, current);

            return (Character, error);
        }
    }
}
