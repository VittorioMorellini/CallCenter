using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class Category
{
    public long Id { get; set; }

    public string Description { get; set; } = null!;

    public string? SubProduct { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual ICollection<Investment> Investment { get; set; } = new List<Investment>();

    public virtual ICollection<PrincipalAuth> PrincipalAuth { get; set; } = new List<PrincipalAuth>();

    public virtual ICollection<Product> Product { get; set; } = new List<Product>();
}
