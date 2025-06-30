import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMapPin, FiBriefcase, FiUsers } from "react-icons/fi";

// let demoJobs = []; // Will be filled by API

let demoJobs = []; // global variable for jobs

function getVisibleJobs(jobs, search, filtersActive) {
  if (!filtersActive && !search) return jobs.slice(0, 10);
  return jobs;
}

const MainPage = () => {
  const [dark, setDark] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobsLoaded, setJobsLoaded] = useState(false);
  const [, forceUpdate] = useState(0); // for re-render after jobs fetch

  // Fetch jobs from API and store in demoJobs
  useEffect(() => {
    fetch("https://job-data-api-beta.vercel.app/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        demoJobs = Array.isArray(data) ? data : [];
        setJobsLoaded(true);
        forceUpdate((v) => v + 1); // force re-render
      })
      .catch(() => {
        demoJobs = [];
        setJobsLoaded(true);
        forceUpdate((v) => v + 1);
      });
  }, []);

  // Filter jobs based on searchs
  const filteredJobs = demoJobs.filter((job) => {
    const q = search.toLowerCase();
    const l = location.toLowerCase();
    return (
      (job.employer_name?.toLowerCase().includes(q) ||
        job.job_city?.toLowerCase().includes(q) ||
        job.job_description?.toLowerCase().includes(q) ||
        (job.job_employment_types?.[0] &&
          job.job_employment_types[0].toLowerCase().includes(q))) &&
      job.job_city?.toLowerCase().includes(l)
    );
  });

  // If search or filters are active, show all filtered jobs, else show only 10
  const filtersActive = false; // Set to true if filter logic added
  const visibleJobs = getVisibleJobs(filteredJobs, search, filtersActive);

  const toggleDark = () => setDark((d) => !d);

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-gray-950 text-white transition-colors duration-900 no-scr"
          : "min-h-screen bg-gray-50 text-gray-900 transition-colors duration-900"
      }
    >
      {/* Header */}
      <header className="w-full px-4 py-3 flex items-center justify-between bg-blue-700 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">
            JobBoard
          </span>
          <span className="hidden sm:inline-block bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs ml-2">
            Find your next job
          </span>
        </div>
        <button
          onClick={toggleDark}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-900 hover:bg-blue-800 text-white transition"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <FiSun className="text-yellow-300" />
          ) : (
            <FiMoon className="text-gray-200" />
          )}
          <span className="font-semibold text-sm">
            {dark ? "Light" : "Dark"}
          </span>
        </button>
      </header>

      {/* Mobile Sidebar Toggle */}
      <div className="sm:hidden flex justify-between items-center px-4 py-2 bg-blue-600">
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className="text-white font-semibold"
        >
          {sidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>
        <div className="flex-1 ml-4">
          <input
            type="text"
            className="w-full px-3 py-2 rounded bg-blue-100 text-blue-900 placeholder-blue-400 focus:outline-none"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <main className="flex flex-col sm:flex-row max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } sm:block sm:w-1/4 shadow-md p-4 transition-all duration-300 ${
            dark
              ? "bg-gray-900 border-r border-gray-800"
              : "bg-blue-50 border-r border-blue-100"
          }`}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Preferred location..."
              onChange={(e) => setLocation(e.target.value)}
              className={
                dark
                  ? "w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  : "w-full px-3 py-2 border border-blue-200 rounded-lg bg-white"
              }
            />
          </div>
          <div className="mb-4">
            <span
              className={`block font-semibold mb-2 ${
                dark ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Job Type
            </span>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                <span className="text-sm">Full-time</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                <span className="text-sm">Part-time</span>
              </label>
            </div>
          </div>
          <div>
            <span
              className={`block font-semibold mb-2 ${
                dark ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Skills
            </span>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "Python", "AWS"].map((skill) => (
                <label key={skill} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  <span className="text-sm">{skill}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 px-2 sm:px-6 py-4">
          {/* Search Bar (desktop only) */}
          <div className="hidden sm:flex items-center gap-2 mb-4">
            <div className="flex-1">
              <input
                type="text"
                className={
                  dark
                    ? "w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
                    : "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
                }
                placeholder="Search jobs by title, skill, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 rounded p-2">
              <FiBriefcase className="text-blue-600" />
              <span className="font-semibold text-blue-700 dark:text-blue-200">
                {filteredJobs.length}
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-200">
                Jobs
              </span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 rounded p-2">
              <FiMapPin className="text-blue-600" />
              <span className="font-semibold text-blue-700 dark:text-blue-200">
                {
                  Array.from(new Set(filteredJobs.map((j) => j.job_city)))
                    .length
                }
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-200">
                Cities
              </span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 rounded p-2">
              <FiUsers className="text-blue-600" />
              <span className="font-semibold text-blue-700 dark:text-blue-200">
                {
                  Array.from(new Set(filteredJobs.map((j) => j.employer_name)))
                    .length
                }
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-200">
                Companies
              </span>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {!jobsLoaded ? (
              <div className="col-span-full text-center text-gray-500 py-8">
                Loading jobs...
              </div>
            ) : visibleJobs.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-8">
                No jobs found.
              </div>
            ) : (
              visibleJobs.map((job, idx) => {
                const isExpanded = expanded === idx;
                const desc = job.job_description || "";
                const shortDesc =
                  desc.length > 120 ? desc.slice(0, 120) + "..." : desc;
                return (
                  <div
                    key={idx}
                    className={
                      dark
                        ? "bg-gray-800 rounded-xl shadow-md p-4 flex flex-col gap-2 border border-gray-700"
                        : "bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-gray-200"
                    }
                  >
                    <div className="flex items-center gap-3">
                      {job.employer_logo ? (
                        <img
                          src={job.employer_logo}
                          alt={job.employer_name}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-500">
                          {job.employer_name?.[0] || "?"}
                        </div>
                      )}
                      <div>
                        <h2 className="text-base font-bold">
                          {job.employer_name}
                        </h2>
                        {job.employer_website ? (
                          <a
                            href={job.employer_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 underline"
                          >
                            {job.employer_website.replace(/^https?:\/\//, "")}
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">
                            No website
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs mt-1">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          job.job_employment_types?.[0] === "Full-time"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {job.job_employment_types?.[0]}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                        {job.job_city}
                      </span>
                    </div>
                    <div className="mt-2 flex-1">
                      <p
                        className={
                          dark
                            ? "text-gray-200 text-sm"
                            : "text-gray-700 text-sm"
                        }
                      >
                        {isExpanded ? desc : shortDesc}
                        {desc.length > 120 && (
                          <button
                            className="ml-2 text-blue-600 underline text-xs"
                            onClick={() => setExpanded(isExpanded ? null : idx)}
                          >
                            {isExpanded ? "Show less" : "Read more"}
                          </button>
                        )}
                      </p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <a
                        href={job.job_apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-700 transition"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 py-4 bg-blue-700 text-white text-center text-sm">
        <div>
          &copy; {new Date().getFullYear()} JobBoard &mdash; Built with React &
          Tailwind CSS.
        </div>
        <div className="mt-1">
          <a
            href="https://github.com/"
            className="underline text-blue-200 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
