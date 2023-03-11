using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Cc.Core.Services;
using Cc.Core.Utils;
using Cc.Core.Models;

namespace Cc.Api.Controllers
{
    [Authorize]
    [Route("configuration")]
    public class ConfigurationController : Controller
    {
        private IConfigurationService service;
        public ConfigurationController(IConfigurationService service)
        {
            this.service = service;
        }

        [HttpGet("{id}")]
        public IActionResult Find(long id)
        {
            return ServiceResult.Execute(() => id == 0 ? service.GetGlobal() : service.Find(id));
        }

        [HttpGet("company/{id}")]
        public IActionResult GetByCompany(long id)
        {
            return ServiceResult.Execute(() => service.GetByCompany(id));
        }

        [HttpPost("search")]
        //[EnhanceModelFilter]
        public IActionResult Search([FromBody] ConfigurationSearchModel model)
        {
            return ServiceResult.Execute(() => service.Search(model));
        }

        [HttpPost]
        public IActionResult Save([FromBody] Configuration item)
        {
            return ServiceResult.Execute(() => service.Save(item.Id, item));
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] long id)
        {
            return ServiceResult.Execute(() => service.Delete(id));
        }
    }
}
