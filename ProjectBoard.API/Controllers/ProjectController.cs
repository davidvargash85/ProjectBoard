using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

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
        [ResponseType(typeof(Project))]
        public IHttpActionResult Post([FromBody]Project value)
        {
            try
            {
                if (value == null)
                {
                    return BadRequest("Project cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                using (IMyDbContext myDbContext = new MyDbContext())
                {
                    value.DateCreated = DateTime.Now;
                    myDbContext.Projects.Add(value);

                    myDbContext.SaveChanges();

                    return Created<Project>(Request.RequestUri + value.Id.ToString(),
                        value);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Project/5
        public void Put(int id, [FromBody]Project value)
        {
            using (IMyDbContext myDbContext = new MyDbContext())
            {
                var project = myDbContext.Projects.SingleOrDefault(x => x.Id == id);
                project.Name = value.Name;
                project.Description = value.Description;
                myDbContext.SaveChanges();
            }
        }

        // DELETE: api/Project/5
        public IHttpActionResult Delete(int id)
        {
            try
            {
                using (IMyDbContext myDbContext = new MyDbContext())
                {
                    var project = myDbContext.Projects.SingleOrDefault(x => x.Id == id);
                    if (project == null)
                        return NotFound();
                    else
                    {
                        myDbContext.Projects.Remove(project);
                        myDbContext.SaveChanges();
                        return Ok();
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
