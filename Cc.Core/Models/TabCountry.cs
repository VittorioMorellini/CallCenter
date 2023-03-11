using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class TabCountry
    {
        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public string Code { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? LocalName { get; set; }
        public string? Citizenship { get; set; }
        public string? Iso2Code { get; set; }
        public string? Iso3Code { get; set; }
    }
}
