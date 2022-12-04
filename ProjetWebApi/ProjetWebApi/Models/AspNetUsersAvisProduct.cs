using System;
using System.Collections.Generic;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class AspNetUsersAvisProduct
    {
        public int Id { get; set; }
        public int? Stars { get; set; }
        public int IdProduit { get; set; }
        public string IdClient { get; set; }
        public string Message { get; set; }
    }
}
