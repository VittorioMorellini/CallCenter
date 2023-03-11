using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Event
    {
        public Event()
        {
            EventAttachment = new HashSet<EventAttachment>();
        }

        public long Id { get; set; }
        public long? OrderId { get; set; }
        public bool Closed { get; set; }
        public bool? LawyerVisible { get; set; }
        public string? Description { get; set; }
        public DateTime? EventDate { get; set; }
        public string? AttachmentName { get; set; }
        public long? EventTypeId { get; set; }
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual EventType? EventType { get; set; }
        public virtual OrderTable? Order { get; set; }
        public virtual ICollection<EventAttachment> EventAttachment { get; set; }
    }
}
