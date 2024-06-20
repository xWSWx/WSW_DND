using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetCoreApi.Models;
namespace NetCoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private static readonly List<Item> Items = new List<Item>
        {
            new Item { Id = 1, Name = "Item 1", Initiative = 3, Current = false },
            new Item { Id = 2, Name = "Item 2", Initiative = 1, Current = false },
            new Item { Id = 3, Name = "Item 3", Initiative = 2, Current = false }
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
        public ActionResult<IEnumerable<Item>> Get()
        {
            return Items;
        }

        [HttpPost("next")]
        public ActionResult<int> NextItem()
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
