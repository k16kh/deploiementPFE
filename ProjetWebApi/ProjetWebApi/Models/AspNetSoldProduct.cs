using System;
using System.Collections.Generic;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class AspNetSoldProduct
    {
        public int Id { get; set; }
        public string IdPharmacien { get; set; }
        public int IdProduit { get; set; }
        public int? Qte { get; set; }
        public float Prix { get; set; }
        public DateTime? Date { get; set; }
    }
}
