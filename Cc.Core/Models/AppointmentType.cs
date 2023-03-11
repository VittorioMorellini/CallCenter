using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class AppointmentType
    {
        public AppointmentType()
        {
            Appointment = new HashSet<Appointment>();
        }

        public long Id { get; set; }
        public string Type { get; set; } = null!;
        public string? Page { get; set; }
        public string? Role { get; set; }

        public virtual ICollection<Appointment> Appointment { get; set; }
    }
}
