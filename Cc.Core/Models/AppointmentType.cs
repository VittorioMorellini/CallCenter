using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class AppointmentType
{
    public long Id { get; set; }

    public string Type { get; set; } = null!;

    public string? Page { get; set; }

    public string? Role { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual ICollection<Appointment> Appointment { get; set; } = new List<Appointment>();
}
