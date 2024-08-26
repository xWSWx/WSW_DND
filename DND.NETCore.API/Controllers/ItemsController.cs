using DND.NETCore.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetCoreApi.Models;
namespace NetCoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private static readonly List<Character> Items = new List<Character>
        {
            Character.Create(Guid.NewGuid(), "Item 1", "Description 1", 3, false).Character,
            Character.Create(Guid.NewGuid(), "Item 2", "Description 2", 2, false).Character,
            Character.Create(Guid.NewGuid(), "Item 3", "Description 3", 1, false).Character
        };

        private static int currentIndex = 0;

        static ItemsController()
        {
            // Sort items by Initiative
            Items.Sort((x, y) => x.Initiative.CompareTo(y.Initiative));
            // Set the first item as Current
            if (Items.Any())
            {
                Items[0].Current = true;
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<Character>> Get()
        {
            return Items;
        }

        [HttpPost("next")]
        public ActionResult<Guid> NextItem()
        {
            if (Items.Any())
            {
                Items[currentIndex].Current = false;
                currentIndex = (currentIndex + 1) % Items.Count;
                Items[currentIndex].Current = true;
                return Items[currentIndex].Id;
            }

            return BadRequest("No items available");
        }
    }
}
