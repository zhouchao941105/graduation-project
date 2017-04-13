using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using graduate.Models;

namespace graduate.Controllers
{
    public class DefaultController : Controller
    {
        // GET: Default
        database db;
        public DefaultController()
        {
            this.db = new database();
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult addclass(string name, int count) {
            banji newclass = new Models.banji();
            newclass.className = name;
            newclass.stucount = count;
            db.banji.Add(newclass);
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult addclassroom(string name, int count, string type)
        {
            classroom clsroom = new classroom();
            clsroom.classroomName = name;
            clsroom.capacity = count;
            clsroom.timeUsed = "";
            clsroom.type = type;
            db.classroom.Add(clsroom);
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult addcourse(string name, string type, string timeperweek, int classid)
        {
            course newcourse = new course();
            newcourse.courseName = name;
            newcourse.type = type;
            newcourse.timeperweek = timeperweek;
            newcourse.classId = classid;
            db.course.Add(newcourse);
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult addteacher(string name, int priority, string prefertime, string type) {
            teacher newteacher = new teacher();
            newteacher.teacherName = name;
            newteacher.priority = priority;
            newteacher.prefertime = prefertime;
            newteacher.type = type;
            db.teacher.Add(newteacher);
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult classlist() {
            var t = (from d in db.banji select d).ToList();
            return Json(t);
        }
        public ActionResult teacherlist() {
            var q = (from d in db.teacher select d).ToList();
            return Json(q);
        }
        public ActionResult courselist() {
            var t = (from d in db.course select d).ToList();
            return Json(t);
        }
        public ActionResult classroomlist() {
            var q = (from t in db.classroom select t).ToList();
            return Json(q);
        }
    }
}