using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class LogQuery
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public long? CompanyId { get; set; }
        public long? PrincipalId { get; set; }
        public string? User { get; set; }
        public string? Table { get; set; }
        public string? Model { get; set; }
        public string? Query { get; set; }
        public string? Parameters { get; set; }
        public int? Count { get; set; }
        public TimeSpan? ExecutionTime { get; set; }
        public string? Error { get; set; }
    }
}
