using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectBoard.API.Models
{
    public class StageViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }

        public int ProjectId { get; set; }
    }
}