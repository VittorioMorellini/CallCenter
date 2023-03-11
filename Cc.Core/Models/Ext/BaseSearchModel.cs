using Cc.Core.Filters;
using Cc.Core.Utils;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cc.Core.Models
{
    public class BaseSearchModel : QueryBuilderSearchModel, IFilterModel
    {
        public long? PrincipalId { get; set; }
        public long? CompanyId { get; set; }
        public long? AgencyId { get; set; }
        public IEnumerable<long> ProductIds { get; set; }
        public IEnumerable<long> AgencyIds { get; set; }
        public string CustomerVisibility { get; set; }
    }
}
