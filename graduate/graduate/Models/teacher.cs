﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace graduate.Models
{
    [Table("paike.teacher")]
    public class teacher
    {
        [Key]
        public int teacherId { get; set; }
        public string teacherName { get; set; }
    }
}