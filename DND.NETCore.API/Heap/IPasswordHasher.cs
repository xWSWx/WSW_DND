namespace NetCoreApi.Heap
{
    public interface IPasswordHasher
    {
        string Generate(string password);
        public bool Verify(string password, string hashedPassword);
    }
}
