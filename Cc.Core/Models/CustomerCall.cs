using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class CustomerCall
{
    public long Id { get; set; }

    public string? Description { get; set; }

    public long PrincipalId { get; set; }

    public long CustomerId { get; set; }

    public DateTime CallDate { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Principal Principal { get; set; } = null!;
}
