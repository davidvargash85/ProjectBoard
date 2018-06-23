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
    public class StagesController : ApiController
    {
        // GET: api/Project
        [ResponseType(typeof(IQueryable<Stage>))]
        public IHttpActionResult Get(int projectId)
        {
            IMyDbContext myDbContext = new MyDbContext();
            var stages = myDbContext.Stages.Where(x => x.Project.Id == projectId)
                .Select(x => new StageViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description, 
                DateCreated = x.DateCreated,
                ProjectId = x.ProjectId
            }).ToList();
            return Ok(stages);
        }

        // GET: api/Project/5
        [ResponseType(typeof(Stage))]
        public IHttpActionResult Get(int projectId, int stageId)
        {
            using (IMyDbContext myDbContext = new MyDbContext())
            {
                if (stageId == 0)
                    return Ok(new StageViewModel() { Id = 0 });
                else
                {
                    var stage = myDbContext.Stages.Where(x => x.Id == stageId).FirstOrDefault();
                    if (stage == null)
                        return NotFound();
                    else
                    {
                        return Ok(new Models.StageViewModel()
                        {
                            Id = stage.Id,
                            Description = stage.Description,
                            Name = stage.Name,
                            DateCreated = stage.DateCreated
                        });
                    }
                }
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
