using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace graduate.Models
{
    [Table("paike.teacher")]
    public class teacher
    {
        
        public int teacherId { get; set; }
        public string teacherName { get; set; }
    }
}