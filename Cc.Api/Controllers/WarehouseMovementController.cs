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
    [Route("warehouseMovement")]
    public class WarehouseMovementController : Controller
    {
        private IWarehouseMovementService service;
        public WarehouseMovementController(IWarehouseMovementService service)
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
        public IActionResult Search([FromBody] WarehouseMovementSearchModel model)
        {
            return ServiceResult.Execute(() => service.Search(model));
        }

        [HttpPost]
        public IActionResult Save([FromBody] WarehouseMovement item)
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
