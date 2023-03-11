using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class Document
    {
        public Document()
        {
            Principal = new HashSet<Principal>();
        }

        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public string? Status { get; set; }
        public string? StatusMessage { get; set; }
        public string? Entity { get; set; }
        public string? Type { get; set; }
        public string? Name { get; set; }
        public int? Date { get; set; }
        public byte[]? File { get; set; }
        public string? Repository { get; set; }
        public string? ExternalId { get; set; }
        public byte[]? FileSigned { get; set; }
        public string? RepositorySigned { get; set; }
        public string? ExternalIdSigned { get; set; }
        public bool Opened { get; set; }

        public virtual ICollection<Principal> Principal { get; set; }
    }
}
