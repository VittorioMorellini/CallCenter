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
    public interface ITabCountryService : IBaseService<TabCountry, long, CcDbContext>
    {
        IEnumerable<TabCountry> Search(TabCountrySearchModel model);
        TabCountry GetByCizenShip(TabCountrySearchModel model);
    }

    public class TabCountryService : BaseService<TabCountry, long, CcDbContext>, ITabCountryService
    {
        private readonly ILogQueryService queryService;
        public TabCountryService(ILogQueryService queryService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.queryService = queryService;
        }

        public TabCountry GetByCizenShip(TabCountrySearchModel model)
        {
            var query = ctx.TabCountry.AsQueryable();

            query = query.Where(x => x.Citizenship == model.Citizenship);

            return query.FirstOrDefault();
        }

        public IEnumerable<TabCountry> Search(TabCountrySearchModel model)
        {
            var query = ctx.TabCountry.AsQueryable();

            query = query.OrderBy(x => x.LocalName ?? x.Name);

            return queryService.Execute("TabCountry", model, query);
        }
    }

    public class TabCountrySearchModel : QueryBuilderSearchModel
    {
        public long? TabCountryId { get; set; }
        public string Citizenship { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }
}
