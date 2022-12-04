using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetWebApi.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<AppUsers> _userManager;
        public UserProfileController(UserManager<AppUsers> userManager)
        {
            _userManager = userManager;
        }
        [HttpGet]
        [Route("GetClientNameById")]
        public async Task<object> GetClientNameById(string id)
        {
            try
            {

            
            var user = await _userManager.FindByIdAsync(id);
            return new
            {
                nom=user.Nom,
                prenom=user.Prenom,
               tel=user.PhoneNumber
            };
            }
            catch(Exception ex)
            {
                throw ex;
            };
        }
        [HttpGet]
        [Route("UserId")]
        public async Task<object> GetUserId()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                Id = user.Id
            };

        }
        [HttpGet]
        [Route("UserInfos")]
        //get user infos after log in
        public async Task <object> GetUserProfile()
        {
            string userId = User.Claims.First(c=> c.Type == "UserID").Value;
            var user= await _userManager.FindByIdAsync(userId);
       
            return new
            {
                Nom=user.Nom,
                Prenom=user.Prenom,
                Date_naissance=user.Date_naissance,
                Sexe=user.Sexe,
                PhoneNumber=user.PhoneNumber,
                Adresse=user.Adresse,
                Role=user.Role,
               DateFin=user.DateFin
            };
        }
        //admin methodes
        [HttpGet]
        [Authorize(Roles ="Admin")]
        [Route("GetUsersbyAdmin")]
        public async Task <object> GetUsersbyAdmin()
        {
            var users = await _userManager.Users.Select(user=>new UserInfosForAdmin
            {
                Id = user.Id,
                Email = user.Email,
                Nom = user.Nom,
                Date_naissance = user.Date_naissance,
                Role=user.Role,
                Adresse = user.Adresse,
                PhoneNumber = user.PhoneNumber,
                Prenom=user.Prenom,
                Sexe= user.Sexe,

            }).ToListAsync();
            return users;
        }
        [HttpGet]
        [Route("GetAllFournisseurs")]
        public async Task<object> GetAllFournisseurs()
        {
            var users = await _userManager.Users.Select(user => new FournisseurInfos
            {
                Id = user.Id,
                Email = user.Email,
                Nom = user.Nom,
                Role = user.Role,
                Adresse = user.Adresse,
                PhoneNumber = user.PhoneNumber,
                Prenom = user.Prenom
            }).ToListAsync();
            foreach(var user in users.ToList())
            {
                if (user.Role != "Fournisseur")
                {
                    users.Remove(user);
                }
            }
            return users;
        }
    }
}
