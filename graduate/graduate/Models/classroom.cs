using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace graduate.Models
{
    [Table("paike.classroom")]
    public class classroom
    {
        public int classroomId { get; set; }
        public string classroomName { get; set; }
        public int capacity { get; set; }
        public string timeUsed { get; set; }
        public string type { get; set; }
    }
}