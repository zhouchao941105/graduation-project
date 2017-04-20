using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace graduate.Models
{
    public class sche
    {
        public int scheduleId { get; set; }
        public int courseId { get; set; }
        public int teacherId { get; set; }
        public int classId { get; set; }
        public int classroomId { get; set; }
        public int time { get; set; }
        public string teacherName { get; set; }
        public string classroomName { get; set; }
        public string courseName { get; set; }
        public string className { get; set; }
    }
}