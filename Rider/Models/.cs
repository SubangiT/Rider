using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rider.Models
{
    public partial class RiderReview
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime? StartDate { get; set; }
        public double? ReviewScore { get; set; }
        public string ReviewComment { get; set; }

    }
}
