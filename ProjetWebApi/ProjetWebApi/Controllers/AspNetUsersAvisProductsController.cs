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
    public class AspNetUsersAvisProductsController : ControllerBase
    {
        private readonly AvisProductContext _context;

        public AspNetUsersAvisProductsController(AvisProductContext context)
        {
            _context = context;
        }

        [HttpDelete]
        [Route("DeleteAvisByIdProduct")]
        [Authorize(Roles = "Pharmacien")]
        public async Task<object> DeleteByBothId(int idprod, string message)
        {
            var list = await _context.AspNetUsersAvisProducts.ToListAsync();
            foreach(var item in list.ToList())
            {
                if ((item.IdProduit==idprod) && (item.Message==message))
                {
                    try
                    {
                        _context.AspNetUsersAvisProducts.Remove(item);
                        await _context.SaveChangesAsync();
                        return null;
                    } catch(Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                
                }
               
            }
            return null;
        }

        [HttpGet]
        [Route("GetInfosByBothId")]
        public async Task<object> GetInfosByBoth(int idprod,string idclient)
        {
            var list=await _context.AspNetUsersAvisProducts.ToListAsync();
            foreach(var item in list)
            {
                if ((item.IdProduit==idprod) && (item.IdClient == idclient))
                {

                    return item;
                }
            }
            return null;
        }
        [HttpGet]
        [Route("GaveOpinion")]
        public async Task<object> GaveOpinion(int idprod,string idclient)
        {
            var test = false;
            var list = await _context.AspNetUsersAvisProducts.ToListAsync();
            foreach(var item in list)
            {
                if((item.IdProduit == idprod) && (item.IdClient == idclient))
                {
                    test = true;
                    break;
                }
            }
            return test;
        }
        // GET: api/AspNetUsersAvisProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AspNetUsersAvisProduct>>> GetAspNetUsersAvisProducts()
        {
            return await _context.AspNetUsersAvisProducts.ToListAsync();
        }

        // GET: api/AspNetUsersAvisProducts/5
        [HttpGet("{id}")]
       public async Task<ActionResult<AspNetUsersAvisProduct>> GetAspNetUsersAvisProduct(int id)
        {
            var aspNetUsersAvisProduct = await _context.AspNetUsersAvisProducts.FindAsync(id);

            if (aspNetUsersAvisProduct == null)
            {
                return NotFound();
            }

            return aspNetUsersAvisProduct;
        }
        [HttpGet]
        [Route("GetAvisByPh")]
        public async Task<object>GetAvisByPh()
        {
            var avis = await _context.AspNetUsersAvisProducts.ToListAsync();
            foreach (var item in avis.ToList())
            {
                if (item.Message == null)
                {
                    avis.Remove(item);
                }
            }
            return avis;
        }

        // PUT: api/AspNetUsersAvisProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAspNetUsersAvisProduct(int id, AspNetUsersAvisProduct aspNetUsersAvisProduct)
        {
            if (id != aspNetUsersAvisProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(aspNetUsersAvisProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetUsersAvisProductExists(id))
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

        // POST: api/AspNetUsersAvisProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AspNetUsersAvisProduct>> PostAspNetUsersAvisProduct(AspNetUsersAvisProduct aspNetUsersAvisProduct)
        {
            _context.AspNetUsersAvisProducts.Add(aspNetUsersAvisProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAspNetUsersAvisProduct", new { id = aspNetUsersAvisProduct.Id }, aspNetUsersAvisProduct);
        }

      

        private bool AspNetUsersAvisProductExists(int id)
        {
            return _context.AspNetUsersAvisProducts.Any(e => e.Id == id);
        }
    }
}
