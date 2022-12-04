using System;
using System.Collections.Generic;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class AspNetPayment
    {
        public int Id { get; set; }
        public string Datecarte { get; set; }
        public string Numcarte { get; set; }
        public string Cvc { get; set; }
        public int IdCommande { get; set; }
        public string IdClient { get; set; }
    }
}
