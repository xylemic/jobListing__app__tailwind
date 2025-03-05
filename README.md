# Job Listing Application

## Description

This is a simple **Job Listing Application** built using **React**, **TypeScript**, and **Tailwind CSS**. It displays a list of job openings, allows users to view job details, and ensures proper conditional rendering.

## Features

- **React Components & Props**: 
  - `JobList` component displays the list of jobs.
  - `JobCard` component represents a single job.
  - Job details are passed as **props** to `JobCard`.

- **Conditional Rendering**:
  - If jobs are available, they are displayed.
  - If no jobs are available, a message `"No jobs available at the moment."` is shown.
  - A **"Show Details"** button toggles the job description, requirements, and responsibilities.

- **Job Data**:
  - Hardcoded in a TypeScript file (`jobs.ts`).
  - Contains at least **10 job entries**.

## Project Structure

