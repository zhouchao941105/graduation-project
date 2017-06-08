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
        [myfilter]
        public ViewResult Index(string name)
        {
            //var name = Session["user"].ToString();
            if (name == "admin")
            {
                ViewData["msg"] = "1";
            }
            else
            {
                ViewData["msg"] = "0";
            }
            return View();
        }
        public ActionResult login()
        {
            return View();
            
        }
        public ActionResult check(string name, string password)
        {
            //name = Request.Form["name"];
            //password = Request.Form["password"];
            var query = from d in db.user where d.userName == name && d.password == password select d;
            if (query.Any())
            {
                Session["user"] = name;
                var t = 0;
                return Json(t);
            }
            else
            {
                return Json(new object());
            }
        }
        public ActionResult addclass(string name, int count, int currid)
        {
            var t = (from d in db.banji where d.classId == currid select d).ToList();
            if (!t.Any())
            {
                banji newclass = new Models.banji();
                newclass.className = name;
                newclass.stucount = count;
                db.banji.Add(newclass);
                db.SaveChanges();
            }
            else
            {
                t.FirstOrDefault().className = name;
                t.FirstOrDefault().stucount = count;
                db.SaveChanges();
            }

            return Json(new object());
        }
        public ActionResult addclassroom(string name, int count, string type, int currid)
        {
            var t = from d in db.classroom where d.classroomId == currid select d;
            if (t.Any())
            {
                t.FirstOrDefault().classroomName = name;
                t.FirstOrDefault().capacity = count;
                t.FirstOrDefault().type = type;
                db.SaveChanges();
            }
            else
            {
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
        public ActionResult addcourse(string name, string type, string timeperweek, int classid, int currid, string roomrequest)
        {
            var t = from d in db.course where d.courseId == currid select d;
            if (t.Any())
            {
                t.FirstOrDefault().courseName = name;
                t.FirstOrDefault().type = type;
                t.FirstOrDefault().timeperweek = timeperweek;
                t.FirstOrDefault().classId = classid;
                t.FirstOrDefault().roomrequest = roomrequest;
                db.SaveChanges();
            }
            else
            {
                course newcourse = new course();
                newcourse.courseName = name;
                newcourse.type = type;
                newcourse.timeperweek = timeperweek;
                newcourse.classId = classid;
                newcourse.roomrequest = roomrequest;
                db.course.Add(newcourse);
                db.SaveChanges();
            }

            return Json(new object());
        }
        public ActionResult addteacher(string name, int priority, int prefertime, string type, int currid)
        {
            var t = from d in db.teacher where d.teacherId == currid select d;
            if (t.Any())
            {
                t.FirstOrDefault().teacherName = name;
                t.FirstOrDefault().priority = priority;
                t.FirstOrDefault().prefertime = prefertime;
                t.FirstOrDefault().type = type;
            }
            else
            {
                teacher newteacher = new teacher();
                newteacher.teacherName = name;
                newteacher.priority = priority;
                newteacher.prefertime = prefertime;
                newteacher.type = type;
                db.teacher.Add(newteacher);
                user newuser = new user();
                newuser.userName = name;
                newuser.password = "123456";
                db.user.Add(newuser);
            }

            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult classlist(int? id)
        {
            if (id != null)
            {
                var t = (from d in db.banji where d.classId == id select d).ToList();
                return Json(t);
            }
            else
            {
                var k = (from d in db.banji select d).ToList();
                return Json(k);
            }

        }
        public ActionResult teacherlist()
        {
            var q = (from d in db.teacher select d);
            return Json(q.ToList());
        }
        public ActionResult courselist()
        {
            var t = from d in db.course
                    join c in db.banji on d.classId equals c.classId
                    select new {
                        courseId = d.courseId,
                        courseName=d.courseName,
                        type=d.type,
                        timeperweek=d.timeperweek,
                        classId=d.classId,
                        roomrequest=d.roomrequest,
                        className=c.className
                    };
            return Json(t);
        }
        public ActionResult classroomlist()
        {
            var q = (from t in db.classroom select t).ToList();
            return Json(q);
        }
        public ActionResult delclass(int id)
        {
            banji del = new banji() { classId = id };
            db.banji.Attach(del);
            db.banji.Remove(del);
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult delclassroom(int id)
        {
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
        public ActionResult init()
        {
            //清空schedule全有数据
            var list = (from d in db.schedule select d).ToList();
            db.schedule.RemoveRange(list);
            //删除timeused
            var classused = (from d in db.banji select d).ToList();
            var roomused = (from d in db.classroom select d).ToList();
            var teacherused = (from d in db.teacher select d).ToList();
            //db.banji.RemoveRange(classused);
            for(int i = 0, l = classused.Count(); i < l; i++)
            {
                classused[i].timeused = " ";
            }
            for (int i = 0, l = roomused.Count(); i < l; i++)
            {
                roomused[i].timeUsed = " ";
            }
            for (int i = 0, l = teacherused.Count(); i < l; i++)
            {
                teacherused[i].timeused = " ";
            }
            //db.SaveChanges();
            var q0 = (from d in db.course select d).ToList();
            var sql0 = (from d in db.teacher
                       where d.type == "语文"
                       select d.teacherId);
            var sql1 = (from d in db.teacher
                        where d.type == "数学"
                        select d.teacherId);
            var sql2 = (from d in db.teacher
                        where d.type == "英语"
                        select d.teacherId);
            var sql3 = (from d in db.teacher
                        where d.type == "物理"
                        select d.teacherId);
            var sql4 = (from d in db.teacher
                        where d.type == "化学"
                        select d.teacherId);
            var sql5 = (from d in db.teacher
                        where d.type == "生物"
                        select d.teacherId);
            var sql6 = (from d in db.teacher
                        where d.type == "体育"
                        select d.teacherId);
            var sql7 = (from d in db.teacher
                        where d.type == "实验"
                        select d.teacherId);
            var sql8 = (from d in db.teacher
                        where d.type == "历史"
                        select d.teacherId);
            var sql9 = (from d in db.teacher
                        where d.type == "政治"
                        select d.teacherId);
            var sql10 = (from d in db.teacher
                        where d.type == "地理"
                        select d.teacherId);
            int l0 = sql0.ToList().Count;
            int l1 = sql1.ToList().Count;
            int l2 = sql2.ToList().Count;
            int l3 = sql3.ToList().Count;
            int l4 = sql4.ToList().Count;
            int l5 = sql5.ToList().Count;
            int l6 = sql6.ToList().Count;
            int l7 = sql7.ToList().Count;
            int l8 = sql8.ToList().Count;
            int l9 = sql9.ToList().Count;
            int l10 = sql10.ToList().Count;
            int n0 = 0;
            int n11 = 0;
            int n12 = 0;
            int n3 = 0;
            int n4 = 0;
            int n5 = 0;
            int n6 = 0;
            int n7 = 0;
            int n8 = 0;
            int n9 = 0;
            int n10 = 0;
            foreach (var item in q0)
            {
                int tempid = 0;
                var runtime = 1;
                if (item.timeperweek == "4")
                {
                    runtime = 2;
                }
                for (var j = 0; j < runtime; j++)
                {
                    schedule t0 = new schedule() { courseId = item.courseId, classId = item.classId };
                    //随机一个teacher
                    

                    if (j == 0)
                    {
                        //int teacherlen = sql.ToList().Count();
                        //int n0 = rd0.Next(0, teacherlen);
                        if (item.type == "语文")
                        {
                            //Random rd0 = new Random(Guid.NewGuid().GetHashCode());
                            //int n0 = rd0.Next(0, l0);

                            if (n0 >= l0)
                            {
                                n0 = n0 - l0;
                            }
                            t0.teacherId = sql0.ToList()[n0];
                            n0++;
                        }
                        else if (item.type == "数学")
                        {
                            if (n11 >= l1)
                            {
                                n11 = n11 - l1;
                            }
                            t0.teacherId = sql1.ToList()[n11];
                            n11++;
                        }
                        else if (item.type == "英语")
                        {
                            if (n12 >= l2)
                            {
                                n12 = n12 - l2;
                            }
                            t0.teacherId = sql2.ToList()[n12];
                            n12++;
                        }
                        else if (item.type == "物理")
                        {
                            if (n3 >= l3)
                            {
                                n3 = n3 - l3;
                            }
                            t0.teacherId = sql3.ToList()[n3];
                            n3++;
                        }
                        else if (item.type == "化学")
                        {
                            if (n4 >= l4)
                            {
                                n4 = n4 - l4;
                            }
                            t0.teacherId = sql4.ToList()[n4];
                            n4++;
                        }
                        else if (item.type == "生物")
                        {
                            if (n5 >= l5)
                            {
                                n5 = n5 - l5;
                            }
                            t0.teacherId = sql5.ToList()[n5];
                            n5++;
                        }
                        else if (item.type == "体育")
                        {
                            if (n6 >= l6)
                            {
                                n6 = n6 - l6;
                            }
                            t0.teacherId = sql6.ToList()[n6];
                            n6++;
                        }
                        else if (item.type == "实验")
                        {
                            if (n7 >= l7)
                            {
                                n7 = n7 - l7;
                            }
                            t0.teacherId = sql7.ToList()[n7];
                            n7++;
                        }
                        else if (item.type == "历史")
                        {
                            if (n8 >= l8)
                            {
                                n8 = n8 - l8;
                            }
                            t0.teacherId = sql8.ToList()[n8];
                            n8++;
                        }
                        else if (item.type == "政治")
                        {
                            if (n9 >= l9)
                            {
                                n9 = n9 - l9;
                            }
                            t0.teacherId = sql9.ToList()[n9];
                            n9++;
                        }
                        else if (item.type == "地理")
                        {
                            if (n10 >= l10)
                            {
                                n10 = n10 - l10;
                            }
                            t0.teacherId = sql10.ToList()[n10];
                            n10++;
                        }

                        tempid = t0.teacherId;
                    }else if(j==1&&tempid!=0)
                    {
                        t0.teacherId = tempid;
                    }
                    //随机一个classroom
                    var room = from d in db.classroom 
                               join cr in db.course on d.type equals cr.roomrequest
                               join cd in db.banji on cr.classId equals cd.classId
                               where d.type == item.roomrequest && cr.classId==item.classId && cd.stucount<d.capacity
                               select d.classroomId;
                    Random rd1 = new Random(Guid.NewGuid().GetHashCode());
                    int roomlen = room.ToList().Count();
                    int n1 = rd1.Next(0, roomlen);
                    t0.classroomId = room.ToList()[n1];
                    //随机一个时间
                    var usedtime = from d in db.classroom
                                   where d.classroomId == t0.classroomId
                                   select d;
                    var teachertime = from d in db.teacher
                                      where d.teacherId == t0.teacherId
                                      select d;
                    var classtime = from d in db.banji
                                    where d.classId == t0.classId
                                    select d;
                    Random rd2 = new Random(Guid.NewGuid().GetHashCode());
                    var temptime = rd2.Next(1, 26);
                    var clsroomitem = usedtime.FirstOrDefault();
                    var teachertimeitem = teachertime.FirstOrDefault();
                    var clsitem = classtime.FirstOrDefault();
                    for (var i = 0; i < 25; i++)
                    {
                        if (clsroomitem.timeUsed.Contains(temptime.ToString()) || teachertimeitem.timeused.Contains(temptime.ToString()) || clsitem.timeused.Contains(temptime.ToString()))
                        {
                            temptime = rd2.Next(1, 26);
                        }
                        else
                        {
                            break;
                        }
                    }
                    t0.time = temptime;
                    clsroomitem.timeUsed += temptime.ToString() + ",";
                    teachertimeitem.timeused += temptime.ToString() + ",";
                    clsitem.timeused += temptime.ToString() + ",";
                    db.schedule.Add(t0);
                }
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
        public ActionResult setsche(List<schedule> t)
        {
            //清空schedule全有数据
            var list = (from d in db.schedule select d).ToList();
            db.schedule.RemoveRange(list);
            for (var i = 0; i < t.Count(); i++)
            {
                //var query = from d in db.schedule where d.scheduleId == t[i].scheduleId select d;
                
                schedule t0 = new schedule() { courseId = t[i].courseId, teacherId=t[i].teacherId, classId = t[i].classId,classroomId=t[i].classroomId,time=t[i].time };
                db.schedule.Add(t0);
            }
            db.SaveChanges();
            return Json(new object());
        }
        public ActionResult getlist()
        {
            var result = from d in db.schedule select d;
            return Json(result);

        }
        public ActionResult scheClass(int classId)
        {
            var query = from d in db.schedule
                        join c in db.teacher on d.teacherId equals c.teacherId
                        join b in db.banji on d.classId equals b.classId
                        join a in db.classroom on d.classroomId equals a.classroomId
                        join e in db.course on d.courseId equals e.courseId
                        where d.classId == classId
                        select new sche
                        {
                            scheduleId = d.scheduleId,
                            courseId = d.courseId,
                            courseName = e.courseName,
                            teacherId = d.teacherId,
                            teacherName = c.teacherName,
                            classId = d.classId,
                            className = b.className,
                            classroomId = d.classroomId,
                            classroomName = a.classroomName,
                            time = d.time
                        };
            return Json(query);
        }
        public ActionResult scheClassroom(int classroomId)
        {
            var query = from d in db.schedule
                        join c in db.teacher on d.teacherId equals c.teacherId
                        join b in db.banji on d.classId equals b.classId
                        join a in db.classroom on d.classroomId equals a.classroomId
                        join e in db.course on d.courseId equals e.courseId
                        where d.classroomId == classroomId
                        select new sche
                        {
                            scheduleId = d.scheduleId,
                            courseId = d.courseId,
                            courseName = e.courseName,
                            teacherId = d.teacherId,
                            teacherName = c.teacherName,
                            classId = d.classId,
                            className = b.className,
                            classroomId = d.classroomId,
                            classroomName = a.classroomName,
                            time = d.time
                        };
            return Json(query);
        }
        public ActionResult scheTeacher(int teacherId)
        {
            var query = from d in db.schedule
                        join c in db.teacher on d.teacherId equals c.teacherId
                        join b in db.banji on d.classId equals b.classId
                        join a in db.classroom on d.classroomId equals a.classroomId
                        join e in db.course on d.courseId equals e.courseId
                        where d.teacherId == teacherId
                        select new sche {
                            scheduleId = d.scheduleId,
                            courseId=d.courseId,
                            courseName=e.courseName,
                            teacherId=d.teacherId,
                            teacherName=c.teacherName,
                            classId=d.classId,
                            className=b.className,
                            classroomId=d.classroomId,
                            classroomName=a.classroomName,
                            time=d.time
                        };
            return Json(query);
        }
        public ActionResult fitnessFn()
        {
            var query = from d in db.schedule
                        join c in db.teacher on d.teacherId equals c.teacherId
                        select new {
                            teahcerid=d.teacherId,
                            priority=c.priority,
                            prefer=c.prefertime,
                            time=d.time
                        };
            var length = query.ToList().Count();
            //int[] fitnessArr=new int[4];
            var diffcount = 0;
            for(var i = 0; i < length; i++)
            {
                var item = query.ToList()[i];
                var diff = item.priority * System.Math.Abs(item.prefer - item.time % 5);
                diffcount += diff;
            }
            
            return Json(diffcount);
        }
        public ActionResult outputfit()
        {
            var query = from d in db.teacher select d;
            return Json(query);
        }
        public ActionResult modpassword(string oldpassword,string newpassword)
        {
            string curr = Session["user"].ToString();
            var query = (from d in db.user where d.userName == curr select d).ToList().FirstOrDefault();
            if (query.password == oldpassword)
            {
                query.password = newpassword;
            }
            db.SaveChanges();
            return Redirect("Index");
        }
    }
}