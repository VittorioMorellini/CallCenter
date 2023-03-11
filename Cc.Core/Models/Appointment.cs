using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Appointment
    {
        public long Id { get; set; }
        public long EventId { get; set; }
        public long AppointmentTypeId { get; set; }
        public long? AppointmentEndingId { get; set; }
        public string? Motivation { get; set; }
        public long SalesmanId { get; set; }
        public long CustomerId { get; set; }
        public string District { get; set; } = null!;
        public long? ProductId { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public byte? State { get; set; }
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? Title { get; set; }

        public virtual AppointmentEnding? AppointmentEnding { get; set; }
        public virtual AppointmentType AppointmentType { get; set; } = null!;
        public virtual Principal Salesman { get; set; } = null!;
    }
}
