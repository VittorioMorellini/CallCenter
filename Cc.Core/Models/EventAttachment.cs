using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class EventAttachment
    {
        public long Id { get; set; }
        public long EventId { get; set; }
        public string? AttachmentName { get; set; }
        public string? InsertUser { get; set; }
        public DateTime? InsertDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }

        public virtual Event Event { get; set; } = null!;
    }
}
