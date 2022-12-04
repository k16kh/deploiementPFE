using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetWebApi.Models;

namespace ProjetWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AspNetSoldProductsController : ControllerBase
    {
        private readonly SoldProductsContext _context;

        public AspNetSoldProductsController(SoldProductsContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetSoldById")]
        public async Task<object> GetSoldProductsByIdPh(string id)
        {

            var list = await _context.AspNetSoldProducts.ToListAsync();
            foreach (var product in list.ToList())
            {
                if (product.IdPharmacien != id)
                {
                    list.Remove(product);
                }
            }
            foreach (var item in list.ToList())
            {

                item.Prix = (float)(item.Qte * item.Prix);

            }

            return list.GroupBy(x => x.Date).Select(x => new { x.Key, sum = x.Sum(x => x.Prix) });
        }
        // GET: api/AspNetSoldProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspNetSoldProduct>>> GetAspNetSoldProducts()
        {
            return await _context.AspNetSoldProducts.ToListAsync();
        }

        // GET: api/AspNetSoldProducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AspNetSoldProduct>> GetAspNetSoldProduct(int id)
        {
            var aspNetSoldProduct = await _context.AspNetSoldProducts.FindAsync(id);

            if (aspNetSoldProduct == null)
            {
                return NotFound();
            }

            return aspNetSoldProduct;
        }

        // PUT: api/AspNetSoldProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspNetSoldProduct(int id, AspNetSoldProduct aspNetSoldProduct)
        {
            if (id != aspNetSoldProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspNetSoldProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetSoldProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AspNetSoldProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AspNetSoldProduct>> PostAspNetSoldProduct(AspNetSoldProduct aspNetSoldProduct)
        {
            _context.AspNetSoldProducts.Add(aspNetSoldProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAspNetSoldProduct", new { id = aspNetSoldProduct.Id }, aspNetSoldProduct);
        }

        // DELETE: api/AspNetSoldProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAspNetSoldProduct(int id)
        {
            var aspNetSoldProduct = await _context.AspNetSoldProducts.FindAsync(id);
            if (aspNetSoldProduct == null)
            {
                return NotFound();
            }

            _context.AspNetSoldProducts.Remove(aspNetSoldProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AspNetSoldProductExists(int id)
        {
            return _context.AspNetSoldProducts.Any(e => e.Id == id);
        }
    }
}
