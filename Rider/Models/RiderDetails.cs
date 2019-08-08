using System;
using System.Collections.Generic;

namespace Rider.Models
{
    public partial class RiderDetails
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime? StartDate { get; set; }
    }
}
