﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using try2.Domain.Entities.Base;

namespace try2.DAL.Models;

public partial class AircraftType : Entity
{

    public string? Name { get; set; }

    public virtual ICollection<Expert>? Experts { get; set; }
}
