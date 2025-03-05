import { useState, lazy, Suspense } from "react";
import { Job } from "../types/Job";

const JobCard = lazy(() => import("./JobCard"));

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState(500000);

  // get unique locations from job list
  const locations = [...new Set(jobs.map(job => job.location))];

  // filter jobs based on search query, location, and salary range
  const filteredJobs = jobs.filter(
    job => 
    (job.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) || job.company.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) && (selectedLocation === "" || job.location === selectedLocation) && parseInt(job.salary.replace(/\D/g, "")) <= salaryRange
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Job Listings</h1>

      {/* filters section */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center items-center">
        {/* search input */}
        <input
          type="text"
          placeholder="Search by job title or company..."
          className="w-full md:w-1/3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* location dropdown */}
        <select
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-gray-400"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* salary range slider */}
        <div className="flex flex-col items-center">
          <label className="font-semibold">Max Salary: ₦{salaryRange.toLocaleString()}</label>
          <input
            type="range"
            min="100000"
            max="1000000"
            step="50000"
            value={salaryRange}
            onChange={(e) => setSalaryRange(Number(e.target.value))}
            className="w-48"
          />
        </div>
      </div>

      {/* job listings */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        {filteredJobs.length > 0 ? (
           filteredJobs.map((job) => (
            <Suspense 
              key={job.id} 
              fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 p-4 rounded-lg h-40"></div>}
            >
              <JobCard job={job} />
            </Suspense>
          ))
        ) : (
          <p className="text-center text-gray-600 text-xl">
            No jobs match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobList;
