using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class Principal
{
    public long Id { get; set; }

    public string? InsertUser { get; set; }

    public DateTime InsertDate { get; set; }

    public string? UpdateUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string Username { get; set; } = null!;

    public string? Password { get; set; }

    public string? Name { get; set; }

    public string? Surname { get; set; }

    public string? Mail { get; set; }

    public string? Phone { get; set; }

    public string? Role { get; set; }

    public bool Disabled { get; set; }

    public string? TaxCode { get; set; }

    public long? CompanyId { get; set; }

    public string? Language { get; set; }

    public long? AvatarId { get; set; }

    public string? City { get; set; }

    public string? Mobile { get; set; }

    public string? District { get; set; }

    public string? Cap { get; set; }

    public string? Notes { get; set; }

    public bool AgendaLocked { get; set; }

    public string? Country { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Appointment> Appointment { get; set; } = new List<Appointment>();

    public virtual Document? Avatar { get; set; }

    public virtual Company? Company { get; set; }

    public virtual ICollection<Customer> Customer { get; set; } = new List<Customer>();

    public virtual ICollection<CustomerCall> CustomerCall { get; set; } = new List<CustomerCall>();

    public virtual ICollection<PrincipalAuth> PrincipalAuth { get; set; } = new List<PrincipalAuth>();

    public virtual ICollection<PrincipalFather> PrincipalFatherFather { get; set; } = new List<PrincipalFather>();

    public virtual ICollection<PrincipalFather> PrincipalFatherPrincipal { get; set; } = new List<PrincipalFather>();

    public virtual ICollection<PrincipalGrouping> PrincipalGrouping { get; set; } = new List<PrincipalGrouping>();

    public virtual ICollection<PrincipalRole> PrincipalRole { get; set; } = new List<PrincipalRole>();

    public virtual ICollection<PrincipalTabRegion> PrincipalTabRegion { get; set; } = new List<PrincipalTabRegion>();

    public virtual ICollection<Warehouse> Warehouse { get; set; } = new List<Warehouse>();
}
