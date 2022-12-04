using System;
using System.Collections.Generic;

#nullable disable

namespace ProjetWebApi.Models
{
    public partial class AspNetUsersAvi
    {
        public int Id { get; set; }
        public string IdClient { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}
