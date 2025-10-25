using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class AppointmentEnding
{
    public long Id { get; set; }

    public string? Outcome { get; set; }

    public string? Color { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }

    public virtual ICollection<Appointment> Appointment { get; set; } = new List<Appointment>();
}
