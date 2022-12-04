using System;
using System.Collections.Generic;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class AspNetProductsFr
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public string ImageString { get; set; }
        public float Prix { get; set; }
        public float? Tva { get; set; }
        public int? Qte { get; set; }
        public DateTime? Date { get; set; }
        public string Categorie { get; set; }
        public string IdFournisseur { get; set; }
    }
}
