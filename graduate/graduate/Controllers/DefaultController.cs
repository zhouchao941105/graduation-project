using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using graduate.Models;
using Dapper;

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
        public ActionResult addclass(string name, int count,int currid) {
            var t = (from d in db.banji where d.classId == currid select d).ToList();
            if (!t.Any())
            {
                banji newclass = new Models.banji();
                newclass.className = name;
                newclass.stucount = count;
                db.banji.Add(newclass);
                db.SaveChanges();
            }
            else {
                t.FirstOrDefault().className = name;
                t.FirstOrDefault().stucount = count;
                db.SaveChanges();
            }
            
            return Json(new object());
        }
        public ActionResult addclassroom(string name, int count, string type,int currid)
        {
            var t = from d in db.classroom where d.classroomId == currid select d;
            if (t.Any())
            {
                t.FirstOrDefault().classroomName = name;
                t.FirstOrDefault().capacity = count;
                t.FirstOrDefault().type = type;
                db.SaveChanges();
            }
            else {
                classroom clsroom = new classroom();
                clsroom.classroomName = name;
                clsroom.capacity = count;
                clsroom.timeUsed = "";
                clsroom.type = type;
                db.classroom.Add(clsroom);
                db.SaveChanges();
            }
            
            return Json(new object());
        }
        public ActionResult addcourse(string name, string type, string timeperweek, int classid,int currid)
        {
            var t = from d in db.course where d.courseId == currid select d;
            if (t.Any())
            {
                t.FirstOrDefault().courseName = name;
                t.FirstOrDefault().type = type;
                t.FirstOrDefault().timeperweek = timeperweek;
                t.FirstOrDefault().classId = classid;
                db.SaveChanges();
            }
            else {
                course newcourse = new course();
                newcourse.courseName = name;
                newcourse.type = type;
                newcourse.timeperweek = timeperweek;
                newcourse.classId = classid;
                db.course.Add(newcourse);
                db.SaveChanges();
            }
            
            return Json(new object());
        }
        public ActionResult addteacher(string name, int priority, string prefertime, string type,int currid) {
            var t = from d in db.teacher where d.teacherId == currid select d;
            if (t.Any())
            {
                t.FirstOrDefault().teacherName = name;
                t.FirstOrDefault().priority = priority;
                t.FirstOrDefault().prefertime = prefertime;
                t.FirstOrDefault().type = type;
            }
            else {
                teacher newteacher = new teacher();
                newteacher.teacherName = name;
                newteacher.priority = priority;
                newteacher.prefertime = prefertime;
                newteacher.type = type;
                db.teacher.Add(newteacher);
            }
            
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult classlist(int? id) {
            if (id != null)
            {
                var t = (from d in db.banji where d.classId == id select d).ToList();
                return Json(t);
            }
            else {
                var k = (from d in db.banji select d).ToList();
                return Json(k);
            }
            
        }
        public ActionResult teacherlist() {
            var q = (from d in db.teacher select d);
            return Json(q.ToList());
        }
        public ActionResult courselist() {
            var t = (from d in db.course select d).ToList();
            return Json(t);
        }
        public ActionResult classroomlist() {
            var q = (from t in db.classroom select t).ToList();
            return Json(q);
        }
        public ActionResult delclass(int id) {
            banji del=new banji(){classId= id};
            db.banji.Attach(del);
            db.banji.Remove(del);
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult delclassroom(int id) {
            classroom del = new classroom() { classroomId = id };
            db.classroom.Attach(del);
            db.classroom.Remove(del);
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult delcourse(int id)
        {
            course del = new course() { courseId = id };
            db.course.Attach(del);
            db.course.Remove(del);
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult delteacher(int id)
        {
            teacher del = new teacher() { teacherId = id };
            db.teacher.Attach(del);
            db.teacher.Remove(del);
            db.SaveChanges();
            return Json(new object());
        }
        //初始化
        public ActionResult init() {
            var q0 = (from d in db.course select d).ToList();
            
            foreach (var item in q0) {
                schedule t0 = new schedule() { courseId = item.courseId,classId=item.classId };
                //随机一个teacher
                var sql = (from d in db.teacher
                           where d.type == item.type
                           select d.teacherId);
                Random rd = new Random(Guid.NewGuid().GetHashCode());
                int teacherlen = sql.ToList().Count();
                int n0 = rd.Next(0, teacherlen);
                t0.teacherId = sql.ToList()[n0];
                //随机一个classroom
                var room = from d in db.classroom
                           where d.type == item.roomrequest
                           select d.classroomId;
                int roomlen = room.ToList().Count();
                int n1 = rd.Next(0, roomlen);
                t0.classroomId = room.ToList()[n1];
                //随机一个时间
                t0.time = rd.Next(1, 26);

                db.schedule.Add(t0);
            }

            //using (var dbs=new database())
            //{
            //    using (var con = dbs.Database.Connection)
            //    {
            //        con.Open();
            //        var tran = dbs.Database.BeginTransaction();
            //        var sql = @"SELECT teacherId FROM teacher,course where teacher.type=course.type and course.type='数学'";
            //        var result = con.ExecuteScalar(sql);
            //    }
            //}
            
            db.SaveChanges();
            return Json(new object());
        }
    }
}