﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectBoard.API.Controllers
{
    [System.Web.Http.Cors.EnableCorsAttribute("http://localhost:59140", "*", "*")]
    public class ProjectController : ApiController
    {
        // GET: api/Project
        public IHttpActionResult Get()
        {
            IMyDbContext myDbContext = new MyDbContext();
            var projects = myDbContext.Projects.Select(x => x).ToList();
            return Ok(projects);
        }

        // GET: api/Project/5
        public IHttpActionResult Get(int id)
        {
            using (IMyDbContext myDbContext = new MyDbContext())
            {
                var project = myDbContext.Projects.Where(x => x.Id == id).FirstOrDefault();
                if (project == null)
                    return NotFound();
                else
                    return Ok(project);
            }
        }

        // POST: api/Project
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Project/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Project/5
        public void Delete(int id)
        {
        }
    }
}
