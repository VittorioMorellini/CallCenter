using System;
using System.Collections.Generic;

namespace Cc.Core.Models
{
    public partial class TabCity
    {
        public long Id { get; set; }
        public DateTime InsertDate { get; set; }
        public string? InsertUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public long TabDistrictId { get; set; }
        public string Code { get; set; } = null!;
        public string? IstatCode { get; set; }
        public string? Description { get; set; }
        public string? CadastralCode { get; set; }

        public virtual TabDistrict TabDistrict { get; set; } = null!;
    }
}
