using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rider.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Rider.Controllers 
{
    [Route("api/[controller]")]
  
    public class RiderController : Controller
    {
        Rider_DetailDataAccessLayer objRider = new Rider_DetailDataAccessLayer();

        [HttpGet("[action]")]
        public IEnumerable<RiderDetails> Index()
        {
            return objRider.GetAllRider();
        }

        [HttpGet("[action]/{id}")]
        public RiderDetails GetRiderDetails_ByID(int id)
        {
            return objRider.GetRiderDetail_ById(id);
        }

        [HttpPost("[action]")]
        public int Create(RiderDetails rider )
        {
            return objRider.AddRider(rider);
        }

        [HttpPut("[action]")]
        public int Edit(RiderDetails rider)
        {
            return objRider.EditRider(rider);
        }

        [HttpDelete("[action]/{id}")]
        public int Delete(int id)
        {
            return objRider.DeleteRider(id);
        }

        [HttpGet("[action]")]
        public IEnumerable<RiderJobs> GetJobList()
        {
            return objRider.GetJobList();
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<RiderJobs> GetRideJobList(int id)
        {
            return objRider.GetRideJobList(id);
        }
    }
}
