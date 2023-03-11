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
    public interface ITabDistrictService : IBaseService<TabDistrict, long, CcDbContext>
    {
        IEnumerable<TabDistrict> Search(TabDistrictSearchModel model);
        IEnumerable<TabDistrict> GetDistrictsByRegion(long tabRegionId);
        TabDistrict GetByCodeOrName(TabDistrictSearchModel model);
    }

    public class TabDistrictService : BaseService<TabDistrict, long, CcDbContext>, ITabDistrictService
    {
        private readonly ILogQueryService queryService;
        public TabDistrictService(ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
        }

        public TabDistrict GetByCodeOrName(TabDistrictSearchModel model)
        {
            var query = ctx.TabDistrict.AsQueryable();

            query = query.Where(x => x.Code == model.Code || x.Description == model.Description);

            return query.FirstOrDefault();
        }
        
        public IEnumerable<TabDistrict> GetDistrictsByRegion(long tabRegionId)
        {
            return Search(new TabDistrictSearchModel()
            {
                TabRegionId = tabRegionId,
            });
        }

        public IEnumerable<TabDistrict> Search(TabDistrictSearchModel model)
        {
            var query = ctx.TabDistrict.AsQueryable();

            if (model.TabRegionId.HasValue)
                query = query.Where(x => x.TabRegionId == model.TabRegionId.GetValueOrDefault());

            query = query.OrderBy(x => x.Description);

            return queryService.Execute("TabDistrict", model, query);
        }
    }

    public class TabDistrictSearchModel : QueryBuilderSearchModel
    {
        public long? TabRegionId { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
