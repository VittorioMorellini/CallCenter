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
    [Route("customerRequiredField")]
    public class CustomerRequiredFieldController : Controller
    {
        private ICustomerRequiredFieldService service;
        public CustomerRequiredFieldController(ICustomerRequiredFieldService service)
        {
            this.service = service;
        }

        [HttpGet("{id}")]
        public IActionResult Find(long id)
        {
            return ServiceResult.Execute(() => service.Find(id));
        }

        [HttpPost("search")]
        //[EnhanceModelFilter]
        public IActionResult Search([FromBody] CustomerRequiredFieldSearchModel model)
        {
            return ServiceResult.Execute(() => service.Search(model));
        }

        [HttpPost("getRequired")]
        //[EnhanceModelFilter]
        public IActionResult GetRequired([FromBody] CustomerRequiredFieldSearchModel model)
        {
            return ServiceResult.Execute(() => service.GetRequired(model));
        }
        
        [HttpPost]
        public IActionResult Save([FromBody] CustomerRequiredField item)
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
