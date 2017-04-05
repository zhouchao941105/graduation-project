using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace graduate.Models
{
    [Table("paike.class")]
    public class banji
    {
        public int classId { get; set; }
        public string className { get; set; }

    }
}