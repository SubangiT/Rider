using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rider.Models
{
    public class Rider_DetailDataAccessLayer
    {
        RiderContext db = new RiderContext();


        public IEnumerable<RiderDetails> GetAllRider()
        {
            try
            {
                return db.RiderDetails.ToList();
            }
            catch
            {
                throw;
            }
        }

        // Add rider

        public int AddRider(RiderDetails rider)
        {
            try
            {
                db.RiderDetails.Add(rider);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }

        }

        // Update rifer
        public int EditRider(RiderDetails rider)
        {
            try
            {
                db.RiderDetails.Update(rider);
                db.SaveChanges();
                return 1;
            }
            catch
            {

                throw;
            }
        }

        // Get rider detail by id
        public RiderDetails GetRiderDetail_ById(int id)
        {
            try
            {
                RiderDetails rider = db.RiderDetails.Find(id);
                return rider;
            }
            catch
            {

                throw;
            }
        }

        // Delete rider
        public int DeleteRider(int id)
        {
            try
            {
                RiderDetails rider = new RiderDetails();
                rider = db.RiderDetails.Find(id);
                db.RiderDetails.Remove(rider);
                db.SaveChanges();
                return 1;
            }
            catch
            {

                throw;
            }

        }

        // Get List of Jobs 
        public List<RiderJobs> GetJobList()
        {
            try
            {
                List<RiderJobs> lstJobs = new List<RiderJobs>();
                lstJobs = (from JobList in db.RiderJobs select JobList).ToList();
                return lstJobs;
            }
            catch
            {
                throw;
            }

        }

     


        public List<RiderJobs> GetRideJobList(int id)
        {
            List<RiderJobs> lstJobsReview = new List<RiderJobs>();
            lstJobsReview = (from JobList in db.RiderJobs where(JobList.Id == id ) select JobList).ToList();
            var query = from R in db.RiderDetails
                        join J in db.RiderJobs on R.Id equals J.RiderId
                        where (R.Id == id)
                        group J by new
                        {
                            //R.FirstName,
                            //R.LastName,
                            //R.PhoneNumber,
                            //R.Email,
                            //R.StartDate,
                            J.RiderId
                        } into groping
                        select new
                        {

                            ReviewScore = groping.Average(J => J.ReviewScore),
                            Comment = groping.Max(J => J.ReviewComment)

                        };

            foreach (var item in query)
            {
                foreach (var lst in lstJobsReview)
                {
                    
                    lst.ReviewComment = item.Comment;
                    lst.ReviewScore = item.ReviewScore;
                }
            }
            return lstJobsReview;
        }

    }
}
