﻿using System;
using System.Collections.Generic;

namespace ProjectBoard.API.Models
{
    public class ProjectViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<StageViewModel> Stages { get; internal set; }
        public DateTime DateCreated { get; set; }

        public ProjectViewModel()
        {
            Stages = new List<StageViewModel>();
        }

    }
}