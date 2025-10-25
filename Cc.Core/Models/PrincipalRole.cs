using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class PrincipalRole
{
    public long Id { get; set; }

    public long PrincipalId { get; set; }

    public string Role { get; set; } = null!;

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual Principal Principal { get; set; } = null!;
}
