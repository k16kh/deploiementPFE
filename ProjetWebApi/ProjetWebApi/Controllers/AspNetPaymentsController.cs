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
    public class AspNetPaymentsController : ControllerBase
    {
        private readonly PaymentContext _context;

        public AspNetPaymentsController(PaymentContext context)
        {
            _context = context;
        }

        // GET: api/AspNetPayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspNetPayment>>> GetAspNetPayments()
        {
            return await _context.AspNetPayments.ToListAsync();
        }

        // GET: api/AspNetPayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AspNetPayment>> GetAspNetPayment(int id)
        {
            var aspNetPayment = await _context.AspNetPayments.FindAsync(id);

            if (aspNetPayment == null)
            {
                return NotFound();
            }

            return aspNetPayment;
        }

        // PUT: api/AspNetPayments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspNetPayment(int id, AspNetPayment aspNetPayment)
        {
            if (id != aspNetPayment.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspNetPayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetPaymentExists(id))
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

        // POST: api/AspNetPayments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AspNetPayment>> PostAspNetPayment(AspNetPayment aspNetPayment)
        {
            _context.AspNetPayments.Add(aspNetPayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAspNetPayment", new { id = aspNetPayment.Id }, aspNetPayment);
        }

        // DELETE: api/AspNetPayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAspNetPayment(int id)
        {
            var aspNetPayment = await _context.AspNetPayments.FindAsync(id);
            if (aspNetPayment == null)
            {
                return NotFound();
            }

            _context.AspNetPayments.Remove(aspNetPayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AspNetPaymentExists(int id)
        {
            return _context.AspNetPayments.Any(e => e.Id == id);
        }
    }
}
