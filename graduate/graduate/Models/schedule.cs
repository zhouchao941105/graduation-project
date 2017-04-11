using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace graduate.Models
{
    [Table("paike.schedule")]
    public class schedule
    {
        public int scheduleId { get; set; }
        public int courseId { get; set; }
        public int teacherId { get; set; }
        public string classIds { get; set; }
        public int classroomId { get; set; }
        public string time { get; set; }
    }
}