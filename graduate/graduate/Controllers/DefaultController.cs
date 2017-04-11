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
            teacher t = new teacher();
            var q = db.teacher.Select(p => p.teacherId).ToList();
            var b = db.banji.Select(k => k.classId).ToList();
            return View();
        }
        public ActionResult addclass( string name, int count) {
            banji newclass = new Models.banji();
            newclass.className = name;
            newclass.stucount = count;
            db.banji.Add(newclass);
            return View();
        }
        public ActionResult addc(int name, string count)
        {
            user t = new user();
            t.userId = name;
            t.userName = count;
            db.user.Add(t);
            return View();
        }
    }
}