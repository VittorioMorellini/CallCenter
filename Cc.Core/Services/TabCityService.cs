using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Cc.Core.Models;
using Cc.Core.Utils;

namespace Cc.Core.Services
{
    public interface ITabCityService : IBaseService<TabCity, long, CcDbContext>
    {
        IEnumerable<TabCity> Search(TabCitySearchModel model);
        IEnumerable<TabCity> GetCitysByDistrict(long tabDistrictId);
    }

    public class TabCityService : BaseService<TabCity, long, CcDbContext>, ITabCityService
    {
        private readonly ILogQueryService queryService;
        public TabCityService(ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
        }

        public IEnumerable<TabCity> GetCitysByDistrict(long tabDistrictId)
        {
            return Search(new TabCitySearchModel()
            {
                DistrictId = tabDistrictId,
            });
        }

        public IEnumerable<TabCity> Search(TabCitySearchModel model)
        {
            var query = ctx.TabCity.AsQueryable();

            if (model.DistrictId.HasValue)
                query = query.Where(x => x.TabDistrictId == model.DistrictId.GetValueOrDefault());
            if (!string.IsNullOrWhiteSpace(model.DistrictCode))
                query = query.Where(x => x.TabDistrict.Code == model.DistrictCode);
            if (!string.IsNullOrWhiteSpace(model.Description))
                query = query.Where(x => x.Description == model.Description);

            query = query.OrderBy(x => x.Description);
            
            return queryService.Execute("TabCity", model, query);
        }
    }

    public class TabCitySearchModel : QueryBuilderSearchModel
    {
        public long? DistrictId { get; set; }
        public string DistrictCode { get; set; }
        public string Description { get; set; }
    }
}
