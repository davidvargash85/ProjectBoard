using ProjectBoard.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ProjectBoard.API.Controllers
{
    //[System.Web.Http.Cors.EnableCorsAttribute("http://localhost:59140", "*", "*")]
    [System.Web.Http.Cors.EnableCorsAttribute("*", "*", "*")]

    public class ProjectsController : ApiController
    {
        // GET: api/Project
        [ResponseType(typeof(IQueryable<Project>))]
        public IHttpActionResult Get()
        {
            try
            {
                IMyDbContext myDbContext = new MyDbContext();
                var projects = myDbContext.Projects.Select(x => new ProjectViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    DateCreated = x.DateCreated
                }).ToList();
                return Ok(projects);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        // GET: api/Project/5
        [ResponseType(typeof(Project))]
        public IHttpActionResult Get(int id)
        {
            using (IMyDbContext myDbContext = new MyDbContext())
            {
                if (id == 0)
                    return Ok(new ProjectViewModel() { Id = 0 });
                else
                {
                    var project = myDbContext.Projects.Where(x => x.Id == id).FirstOrDefault();

                    if (project == null)
                        return NotFound();
                    else
                        return Ok(GetViewModel(project));
                }
            }
        }

        private ProjectViewModel GetViewModel(Project project)
        {
            var stgs = (from x in project.Stages
                        select new StageViewModel()
                        {
                            Name = x.Name,
                            Description = x.Description,
                            Id = x.Id,
                            ProjectId = x.ProjectId
                        }).ToList();

            return new Models.ProjectViewModel()
            {
                Id = project.Id,
                Description = project.Description,
                Name = project.Name,
                Stages = stgs
            };
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
        public IHttpActionResult Put(int id, [FromBody]Project value)
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
                        project.Name = value.Name;
                        project.Description = value.Description;

                        myDbContext.SaveChanges();

                        return Ok(GetViewModel(project));
                    }
                }
            }
            catch (Exception)
            {
                return InternalServerError();
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
