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
    public class AspNetCommandesController : ControllerBase
    {
        private readonly CommandeContext _context;

        public AspNetCommandesController(CommandeContext context)
        {
            _context = context;
        }

        // GET: api/AspNetCommandes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspNetCommande>>> GetAspNetCommandes()
        {
            return await _context.AspNetCommandes.ToListAsync();
        }
        // GET: api/AspNetCommandes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AspNetCommande>> GetAspNetCommande(int id)
        {
            var aspNetCommande = await _context.AspNetCommandes.FindAsync(id);

            if (aspNetCommande == null)
            {
                return NotFound();
            }

            return aspNetCommande;
        }

        // PUT: api/AspNetCommandes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspNetCommande(int id, AspNetCommande aspNetCommande)
        {
            if (id != aspNetCommande.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspNetCommande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetCommandeExists(id))
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

        // POST: api/AspNetCommandes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AspNetCommande>> PostAspNetCommande(AspNetCommande aspNetCommande)
        {
            _context.AspNetCommandes.Add(aspNetCommande);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAspNetCommande", new { id = aspNetCommande.Id }, aspNetCommande);
        }

        // DELETE: api/AspNetCommandes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAspNetCommande(int id)
        {
            var aspNetCommande = await _context.AspNetCommandes.FindAsync(id);
            if (aspNetCommande == null)
            {
                return NotFound();
            }

            _context.AspNetCommandes.Remove(aspNetCommande);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AspNetCommandeExists(int id)
        {
            return _context.AspNetCommandes.Any(e => e.Id == id);
        }
    }
}
