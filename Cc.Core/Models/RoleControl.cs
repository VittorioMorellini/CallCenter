using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class RoleControl
{
    public long Id { get; set; }

    public long? ControlId { get; set; }

    public string? Role { get; set; }

    public string? Page { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual Control? Control { get; set; }
}
