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
    public class AspNetProductsFrsController : ControllerBase
    {
        private readonly Products_Fr _context;

        public AspNetProductsFrsController(Products_Fr context)
        {
            _context = context;
        }

        // GET: api/AspNetProductsFrs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspNetProductsFr>>> GetAspNetProductsFrs()
        {
            return await _context.AspNetProductsFrs.ToListAsync();
        }
        //GetProducts Filtered
        [HttpGet]
        [Route("GetAspNetProductsFrsbyId")]
        public async Task<object> GetAspNetProductsFrsbyId(string id)
        {
            var list = await _context.AspNetProductsFrs.ToListAsync();
             foreach (var item in list.ToList())
             {
                 if (item.IdFournisseur!= id)
                 {
                list.Remove(item);  
                 }
             }
            return list;
        }

        // GET: api/AspNetProductsFrs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AspNetProductsFr>> GetAspNetProductsFr(int id)
        {
            var aspNetProductsFr = await _context.AspNetProductsFrs.FindAsync(id);

            if (aspNetProductsFr == null)
            {
                return NotFound();
            }

            return aspNetProductsFr;
        }

        // PUT: api/AspNetProductsFrs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspNetProductsFr(int id, AspNetProductsFr aspNetProductsFr)
        {
            if (id != aspNetProductsFr.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspNetProductsFr).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetProductsFrExists(id))
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

        // POST: api/AspNetProductsFrs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AspNetProductsFr>> PostAspNetProductsFr(AspNetProductsFr aspNetProductsFr)
        {
            _context.AspNetProductsFrs.Add(aspNetProductsFr);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAspNetProductsFr", new { id = aspNetProductsFr.Id }, aspNetProductsFr);
        }

        // DELETE: api/AspNetProductsFrs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAspNetProductsFr(int id)
        {
            var aspNetProductsFr = await _context.AspNetProductsFrs.FindAsync(id);
            if (aspNetProductsFr == null)
            {
                return NotFound();
            }

            _context.AspNetProductsFrs.Remove(aspNetProductsFr);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AspNetProductsFrExists(int id)
        {
            return _context.AspNetProductsFrs.Any(e => e.Id == id);
        }
    }
}
