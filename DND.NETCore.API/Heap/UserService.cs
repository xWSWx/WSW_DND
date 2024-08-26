﻿namespace NetCoreApi.Heap
{
    public class UserService
    {
        private readonly IPasswordHasher _passwordHasher;
        public UserService(IPasswordHasher passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }
        public async Task Register(string userName, string email, string password)
        {
            var hashedPassword = _passwordHasher.Generate(password);
        }
    }
}
