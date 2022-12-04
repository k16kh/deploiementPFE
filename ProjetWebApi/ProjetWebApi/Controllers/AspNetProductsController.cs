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
    public class AspNetProductsController : ControllerBase
    {
        private readonly APPDB _context;

        public AspNetProductsController(APPDB context)
        {
            _context = context;
        }

        // GET: api/AspNetProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspNetProduct>>> GetAspNetProducts()
        {
            return await _context.AspNetProducts.ToListAsync();
        }
        [HttpGet]
        [Route("GetMyProductsById")]
        public async Task <object> GetById(string id)
        {
            var products = await _context.AspNetProducts.ToListAsync();
            foreach (var item in products.ToList())
            {
                if (item.IdPharmacien != id)
                {
                    products.Remove(item);
                }
            }
            return products;
        }

        
        // afficher selon catg Bien etre 
        [HttpGet]
        [Route("GetMyProductsByCatBienetre")]
        public async Task<ActionResult<IEnumerable<AspNetProduct>>> GetByCatBienEtre()
        {
            var products = await _context.AspNetProducts.ToListAsync();

            foreach (var item in products.ToList())
            {
               if(item.Categorie != "Bien être")
                {
                    products.Remove(item);
                }
              
            }
            return products;
        }



        

        // afficher selon catg Santé 
        [HttpGet]
        [Route("GetMyProductsByCatSante")]
        public async Task<ActionResult<IEnumerable<AspNetProduct>>> GetByCatSante()
        {
            var products = await _context.AspNetProducts.ToListAsync();

            foreach (var item in products.ToList())
            {
                if (item.Categorie != "Santé")
                {
                    products.Remove(item);
                }

            }
            return products;
        }

        

        // afficher selon catg Beauté 
        [HttpGet]
        [Route("GetMyProductsByCatBeaute")]
        public async Task<ActionResult<IEnumerable<AspNetProduct>>> GetByCatBeauté()
        {
            var products = await _context.AspNetProducts.ToListAsync();

            foreach (var item in products.ToList())
            {
                if (item.Categorie != "Beauté")
                {
                    products.Remove(item);
                }

            }
            
            return products;
        }









        // GET: api/AspNetProducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AspNetProduct>> GetAspNetProduct(int id)
        {
            var aspNetProduct = await _context.AspNetProducts.FindAsync(id);

            if (aspNetProduct == null)
            {
                return NotFound();
            }

            return aspNetProduct;
        }

       

        // PUT: api/AspNetProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspNetProduct(int id, AspNetProduct aspNetProduct)
        {
            if (id != aspNetProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspNetProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetProductExists(id))
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

        // POST: api/AspNetProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AspNetProduct>> PostAspNetProduct(AspNetProduct aspNetProduct)
        {
            _context.AspNetProducts.Add(aspNetProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAspNetProduct", new { id = aspNetProduct.Id }, aspNetProduct);
        }

        // DELETE: api/AspNetProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAspNetProduct(int id)
        {
            var aspNetProduct = await _context.AspNetProducts.FindAsync(id);
            if (aspNetProduct == null)
            {
                return NotFound();
            }

            _context.AspNetProducts.Remove(aspNetProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AspNetProductExists(int id)
        {
            return _context.AspNetProducts.Any(e => e.Id == id);
        }
    }
}
