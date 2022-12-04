using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetWebApi.Models;

namespace ProjetWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AspNetUsersAvisController : ControllerBase
    {
        private readonly AvisContext _context;

        public AspNetUsersAvisController(AvisContext context)
        {
            _context = context;
        }

        // GET: api/AspNetUsersAvis
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspNetUsersAvi>>> GetAspNetUsersAvis()
        {
            return await _context.AspNetUsersAvis.ToListAsync();
        }

        // GET: api/AspNetUsersAvis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AspNetUsersAvi>> GetAspNetUsersAvi(int id)
        {
            var aspNetUsersAvi = await _context.AspNetUsersAvis.FindAsync(id);

            if (aspNetUsersAvi == null)
            {
                return NotFound();
            }

            return aspNetUsersAvi;
        }

        // PUT: api/AspNetUsersAvis/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspNetUsersAvi(int id, AspNetUsersAvi aspNetUsersAvi)
        {
            if (id != aspNetUsersAvi.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspNetUsersAvi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetUsersAviExists(id))
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

        // POST: api/AspNetUsersAvis
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AspNetUsersAvi>> PostAspNetUsersAvi(AspNetUsersAvi aspNetUsersAvi)
        {
            _context.AspNetUsersAvis.Add(aspNetUsersAvi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAspNetUsersAvi", new { id = aspNetUsersAvi.Id }, aspNetUsersAvi);
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("Deleteallbyadmin")]
        public async Task<object> Deleteallbyadmin()
        {
           foreach(var item in _context.AspNetUsersAvis)
            {
                try
                {
                    _context.AspNetUsersAvis.Remove(item);
                 
                }catch(Exception e)
                {
                    return BadRequest(e.Message); 
                }
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE: api/AspNetUsersAvis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAspNetUsersAvi(int id)
        {
            var aspNetUsersAvi = await _context.AspNetUsersAvis.FindAsync(id);
            if (aspNetUsersAvi == null)
            {
                return NotFound();
            }

            _context.AspNetUsersAvis.Remove(aspNetUsersAvi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AspNetUsersAviExists(int id)
        {
            return _context.AspNetUsersAvis.Any(e => e.Id == id);
        }
    }
}
