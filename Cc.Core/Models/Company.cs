using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class Company
{
    public long Id { get; set; }

    public string BusinessName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string VatCode { get; set; } = null!;

    public DateTime InsertDate { get; set; }

    public string InsertUser { get; set; } = null!;

    public DateTime UpdateDate { get; set; }

    public string UpdateUser { get; set; } = null!;

    public string? Mail { get; set; }

    public string? TaxCode { get; set; }

    public virtual ICollection<Agency> Agency { get; set; } = new List<Agency>();

    public virtual Configuration? Configuration { get; set; }

    public virtual ICollection<Customer> Customer { get; set; } = new List<Customer>();

    public virtual ICollection<CustomerRequiredField> CustomerRequiredField { get; set; } = new List<CustomerRequiredField>();

    public virtual ICollection<Principal> Principal { get; set; } = new List<Principal>();

    public virtual ICollection<Product> Product { get; set; } = new List<Product>();

    public virtual ICollection<Region> Region { get; set; } = new List<Region>();
}
