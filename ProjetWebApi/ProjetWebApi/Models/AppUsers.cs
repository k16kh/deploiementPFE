using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetWebApi.Models
{
    public class AppUsers : IdentityUser
    {
        [Column(TypeName = "nvarchar(10)")]
        public string Sexe { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string Nom { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string Prenom { get; set; }
        [Column(TypeName = "nvarchar(30)")]
        public string Adresse { get; set; }
        [Column(TypeName = "date")]
        public DateTime Date_naissance { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Role { get; set; }

        [Column(TypeName = "date")]
        public DateTime DateFin { get; set; }
    }
}
