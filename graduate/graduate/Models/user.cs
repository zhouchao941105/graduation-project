using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace graduate.Models
{
    [Table("paike.user")]
    public class user
    {
        public int userId { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public int permission { get; set; }
    }
}