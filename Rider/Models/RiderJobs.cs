using System;
using System.Collections.Generic;

namespace Rider.Models
{
    public partial class RiderJobs 
    {
        public int Id { get; set; }
        public DateTime? DateTime { get; set; }
        public int? RiderId { get; set; }
        public double? ReviewScore { get; set; }
        public string ReviewComment { get; set; }
        public string CompletedAt { get; set; }
    }
}
