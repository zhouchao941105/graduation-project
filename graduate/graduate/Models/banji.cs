using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace graduate.Models
{
    [Table("paike.class")]
    public class banji
    {
        [Key]
        public int classId { get; set; }
        public string className { get; set; }
        public int stucount { get; set; }
        public string timeused { get; set; }

    }
}