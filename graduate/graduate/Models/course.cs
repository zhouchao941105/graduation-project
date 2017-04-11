using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace graduate.Models
{
    [Table("paike.course")]
    public class course
    {
        public int courseId { get; set; }
        public string courseName { get; set; }
        public string type { get; set; }
        public string timeperweek { get; set; }
        public int classId { get; set; }
    }
}