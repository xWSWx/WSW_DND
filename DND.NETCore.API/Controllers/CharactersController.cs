using DND.NETCore.API.Contracts;
using DND.NETCore.Core.Abstractions;
using DND.NETCore.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace DND.NETCore.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CharactersController : ControllerBase
    {
        private readonly ICharactersService _charactersService;

        public CharactersController(ICharactersService charactersService)
        {
            _charactersService = charactersService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CharactersResponce>>> GetCharacters()
        {
            var characters = await _charactersService.GetAllCharacters();
            var responce = characters.Select(b => new CharactersResponce(b.Id, b.Name, b.Description, b.Initiative, b.Current));
            return Ok(responce);
        }
        [HttpPost]
        public async Task<ActionResult<Guid>> CreateCharacter([FromBody] CharactersRequest request)
        {
            var (character, error) = Character.Create(
                Guid.NewGuid(),
                request.Name,
                request.Description,
                request.Initiative,
                request.Current);

            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(error);
            }

            var characterId = await _charactersService.CreateCharacter(character);

            return Ok(characterId);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateCharacters(Guid id, [FromBody] CharactersRequest request)
        {
            var characterId = await _charactersService.UpdateCharacter(id, request.Name, request.Description, request.Initiative, request.Current);
            return Ok(characterId);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteCharacters(Guid id)
        {
            return Ok(await _charactersService.DeleteCharacter(id));
        }
    }
}
