using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Cc.Core.Models;
using Cc.Core.Utils;

namespace Cc.Core.Services
{
    public interface ILogQueryService : IBaseService<LogQuery, long, CcDbContext>
    {
        IEnumerable<LogQuery> Search(LogQuerySearchModel model);
        List<T> Execute<T>(string table, object model, IQueryable<T> query) where T : class;
    }

    public class LogQueryService : BaseService<LogQuery, long, CcDbContext>, ILogQueryService
    {
        private readonly IConfiguration configuration;
        private readonly IIdentityService identityService;
        public LogQueryService(IConfiguration configuration, IIdentityService identityService, CcDbContext ctx = null)
            : base(ctx)
        {
            this.configuration = configuration;
            this.identityService = identityService;
        }

        public List<T> Execute<T>(string table, object model, IQueryable<T> query) where T : class
        {
            //if (!(bool)configuration.GetValue(typeof(bool), "Logging:Query"))
            //    return query.ToList();

            var list = new List<T>();
            // TODO ottimizzare e leggere dalla cache
            long id = identityService.GetIdentityId();
            var identity = ctx.Principal.Where(x => x.Id == id).FirstOrDefault();

            var item = new LogQuery
            {
                Date = DateTime.Now,
                CompanyId = identity?.CompanyId,
                PrincipalId = identity?.Id,
                User = identity?.Username,
                Table = table,
                Model = model != null ? JsonConvert.SerializeObject(model, Formatting.None, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }) : null
            };

            try
            {
                list = query.ToList();
                item.ExecutionTime = DateTime.Now - item.Date;
                item.Count = list.Count;
                item.Query = query.ToQueryString();
            }
            catch (Exception ex)
            {
                item.Error = ex.Message;
                if (ex.InnerException != null)
                    item.Error += System.Environment.NewLine + ex.InnerException.Message;

                throw;
            }
            finally
            {
                Save(item.Id, item);
            }

            return list;
        }

        public IEnumerable<LogQuery> Search(LogQuerySearchModel model)
        {
            var query = ctx.LogQuery.AsQueryable();
            if (model.CompanyId != null)
                query = query.Where(x => x.CompanyId == model.CompanyId.Value);

            query = query.ApplyPaging(model);

            return Execute("LogQuery", model, query);
        }
    }

    public class LogQuerySearchModel : BaseSearchModel
    {

    }
}
