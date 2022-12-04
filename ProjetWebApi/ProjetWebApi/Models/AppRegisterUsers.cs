using System;

namespace ProjetWebApi.Models
{
    public class AppRegisterUsers
    {
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } 
        public DateTime Date_naissance { get; set; }
        public string Adresse { get; set; }
        public string Sexe { get; set; }
        public string PhoneNumber { get; set; }
    }
}
