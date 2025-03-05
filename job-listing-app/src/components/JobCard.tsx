import React, { useState } from 'react';
import { Job } from '../types/Job';
import { motion } from 'framer-motion';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <motion.div 
      className="border rounded-lg p-4 mb-4 shadow-md flex flex-col justify-between min-h-[220px] self-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* job details */}
      <div>
        <h2 className='text-lg md:text-xl font-bold text-blue-700'>{job.title}</h2>
        <p className='text-sm md:text-base text-gray-600 dark:text-gray-400'>{job.company} - {job.location}</p>
        <p className='font-semibold text-green-600 dark:text-green-400'>{job.salary}</p>
      </div>

      <div className="mt-auto flex justify-start">
        <button
          onClick={toggleDetails}
          className="bg-blue-500 text-white px-4 py-2 min-w-[140px] rounded flex items-center justify-center gap-2 whitespace-nowrap hover:bg-blue-600 transition-all"
        >
          {showDetails ? "Hide Details" : "Show Details"} {showDetails ? "🔼" : "🔽"}
        </button>
      </div>

      {/* expandable job details */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={showDetails ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mt-4"
      >
        {showDetails && (
          <div>
            <p className="mb-2">{job.description}</p>

            {job.requirements && (
              <div>
                <h3 className='font-semibold mb-1'>Requirements:</h3>
                <ul className='list-disc list-inside'>
                  {job.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.responsibilities && (
              <div className="mt-2">
                <h3 className="font-semibold mb-1">Responsibilities:</h3>
                <ul className="list-disc list-inside">
                  {job.responsibilities?.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default JobCard;
