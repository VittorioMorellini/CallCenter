using System;
using System.Collections.Generic;

namespace Cc.Core.Models;

public partial class AppointmentReject
{
    public long Id { get; set; }

    public string? Reject { get; set; }

    public DateTime InsertDate { get; set; }

    public string? InsertUser { get; set; }

    public DateTime UpdateDate { get; set; }

    public string? UpdateUser { get; set; }
}
