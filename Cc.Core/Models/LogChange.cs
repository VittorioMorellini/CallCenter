using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class LogChange
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string? RefTable { get; set; }
        public long? RefId { get; set; }
        public string? RefUser { get; set; }
        public string? Action { get; set; }
        public string? Payload { get; set; }
    }
}
