using System;
using System.Collections.Generic;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class AspNetCommande
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public float Prixtotal { get; set; }
        public string Etat { get; set; }
        public string IdClient { get; set; }
    }
}
