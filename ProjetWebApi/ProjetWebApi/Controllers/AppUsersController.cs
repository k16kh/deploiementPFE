using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProjetWebApi.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ProjetWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUsersController : ControllerBase
    {
        public UserManager<AppUsers> _userManager;
        public SignInManager<AppUsers> _signInManager;
        private readonly ApplicationSettings _appsettings;
        //constructor
        public AppUsersController(UserManager<AppUsers> userManager, SignInManager<AppUsers> signInManager, IOptions<ApplicationSettings> appsettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appsettings = appsettings.Value;
        }
        //register method
        [HttpPost]
        [Route("Register")]
        public async Task<object> PostAppUser(AppRegisterUsers model)
        {
            var username = model.Nom + model.Date_naissance.ToShortDateString() + model.PhoneNumber;
            var appuser = new AppUsers()
            {
                UserName = username,
                Nom = model.Nom,
                Prenom = model.Prenom,
                Email = model.Email,
                Date_naissance = model.Date_naissance,
                Adresse = model.Adresse,
                Sexe = model.Sexe,
                PhoneNumber = model.PhoneNumber,
                Role = "Client" 
            };
            try
            {
                var result = await _userManager.CreateAsync(appuser, model.Password); //creation utilisateur
                await _userManager.AddToRoleAsync(appuser, "Client"); //affecation role
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("CreateClientByAdmin")]
        [Authorize(Roles = "Admin")]
        public async Task<object> CreateClientByAdmin(AddUserByAdmin model)
        {
            var username = model.Nom + model.Date_naissance.ToShortDateString() + model.PhoneNumber;

            var appuser = new AppUsers()
            {
                UserName = username,
                Nom = model.Nom,
                Prenom = model.Prenom,
                Email = model.Email,
                Date_naissance = model.Date_naissance,
                Adresse = model.Adresse,
                Sexe = model.Sexe,
                PhoneNumber = model.PhoneNumber,
                Role = model.Role
               
            };
            try
            {
                var result = await _userManager.CreateAsync(appuser, model.Password);
                if (model.Role == "Client")
                {
                    await _userManager.AddToRoleAsync(appuser, "Client");
                    return Ok(result);
                }
                else
                     if (model.Role == "Admin")
                {
                    await _userManager.AddToRoleAsync(appuser, "Admin");
                    return Ok(result);
                }
                else if (model.Role == "Fournisseur")
                {
                    appuser.DateFin = model.DateFin;
                    await _userManager.AddToRoleAsync(appuser, "Fournisseur");
                    return Ok(result);
                }
                else if (model.Role == "Pharmacien")
                {
                    appuser.DateFin = model.DateFin;
                    await _userManager.AddToRoleAsync(appuser, "Pharmacien");
                    return Ok(result);
                }
               
                else
                    return BadRequest(new { message = "erreur dans la création" });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //get user by id
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetUserById([FromRoute] Guid id)
        {
           var user= await _userManager.Users.FirstOrDefaultAsync(x =>x.Id == id.ToString());
            if (user == null)
            {
                return BadRequest();
            }

                return Ok(user);
        }
        //edit user by admin
        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("{id:Guid}")]
        public async Task<IActionResult> EditUserById([FromRoute] Guid id,AddUserByAdmin model)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return BadRequest();
            }
            user.Nom = model.Nom;
            user.Prenom = model.Prenom;
            user.Email = model.Email;
            user.Adresse = model.Adresse;
            user.PhoneNumber = model.PhoneNumber;
            user.Date_naissance = model.Date_naissance;
            user.Role = model.Role;
            user.Sexe = model.Sexe;
            user.DateFin = model.DateFin;
            await _userManager.UpdateAsync(user);
           return Ok(user);

        }
        //delete user by admin
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("{id:Guid}")]
        public async Task<IActionResult> RemoveUserByAdmin([FromRoute] Guid Id)
        {
            var user = await _userManager.FindByIdAsync(Id.ToString());
            if (user==null) return BadRequest();
              await _userManager.DeleteAsync(user);
            return Ok(user);
        }
        //login all users JWT Bearer (JSON WEB TOKEN)
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var key = Encoding.UTF8.GetBytes(_appsettings.JWT_Secret);
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user,model.Password))
            {
                var role=await _userManager.GetRolesAsync(user); //Getting User Role
                IdentityOptions _options = new IdentityOptions();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                   {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                   }),
                    Expires = DateTime.UtcNow.AddDays(5),        //Token Dead Line Time
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
           
            }
            else
            {
                return BadRequest();
            }
        }
    }
}