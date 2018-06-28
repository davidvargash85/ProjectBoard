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
        // GET: api/Stages/5
        [ResponseType(typeof(Stage))]
        public IHttpActionResult Get(int id)
        {
            using (IMyDbContext myDbContext = new MyDbContext())
            {
                if (id == 0)
                    return Ok(new StageViewModel() { Id = 0 });
                else
                {
                    var stage = myDbContext.Stages.SingleOrDefault(x => x.Id == id);

                    if (stage == null)
                        return NotFound();
                    else
                        return Ok(GetViewModel(stage));
                }
            }
        }

        private StageViewModel GetViewModel(Stage stage)
        {
            return new Models.StageViewModel()
            {
                Id = stage.Id,
                Description = stage.Description,
                Name = stage.Name,
                DateCreated = stage.DateCreated
            };
        }

        // POST: api/Project
        [ResponseType(typeof(Stage))]
        public IHttpActionResult Post([FromBody]Stage stage)
        {
            try
            {
                if (stage == null)
                {
                    return BadRequest("Stage cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                using (IMyDbContext myDbContext = new MyDbContext())
                {
                    stage.DateCreated = DateTime.Now;
                    myDbContext.Stages.Add(stage);

                    myDbContext.SaveChanges();

                    return Created<Stage>(Request.RequestUri + stage.Id.ToString(),
                        stage);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Project/5
        public IHttpActionResult Put(int id, [FromBody]Stage value)
        {
            try
            {
                using (IMyDbContext myDbContext = new MyDbContext())
                {
                    var stage = myDbContext.Stages.SingleOrDefault(x => x.Id == id);

                    if (stage == null)
                        return NotFound();
                    else
                        return Ok(GetViewModel(stage));
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
                    var stage = myDbContext.Stages.SingleOrDefault(x => x.Id == id);
                    if (stage == null)
                        return NotFound();
                    else
                    {
                        myDbContext.Stages.Remove(stage);
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
