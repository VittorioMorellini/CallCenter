using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class AppointmentEnding
    {
        public AppointmentEnding()
        {
            Appointment = new HashSet<Appointment>();
        }

        public long Id { get; set; }
        public string? Outcome { get; set; }
        public string? Color { get; set; }

        public virtual ICollection<Appointment> Appointment { get; set; }
    }
}
