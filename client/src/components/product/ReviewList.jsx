import React, { useState, useMemo } from "react";

const ReviewList = ({ reviews }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-left">
        No reviews yet.
      </p>
    );
  }

  // ⭐ Average rating
  const average = useMemo(() => {
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  // ⭐ Filter
  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    return reviews.filter((r) => r.rating === Number(filter));
  }, [filter, reviews]);

  // ⭐ Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === "newest") return new Date(b.date) - new Date(a.date);
      if (sort === "oldest") return new Date(a.date) - new Date(b.date);
      if (sort === "high") return b.rating - a.rating;
      if (sort === "low") return a.rating - b.rating;
      return 0;
    });
  }, [filtered, sort]);

  return (
    <div className="space-y-8 mt-6 text-left">

      {/* ⭐ Rating Summary */}
      <div>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">
          {average.toFixed(1)} / 5
        </p>
        <p className="text-yellow-500 text-xl">
          {"★".repeat(Math.round(average))}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Based on {reviews.length} reviews
        </p>
      </div>

      {/* ⭐ Filters */}
      <div className="flex flex-col md:flex-row items-start gap-4">

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 
                     dark:border-slate-600 bg-white dark:bg-slate-800 
                     text-slate-900 dark:text-white"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 
                     dark:border-slate-600 bg-white dark:bg-slate-800 
                     text-slate-900 dark:text-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="high">Highest Rating</option>
          <option value="low">Lowest Rating</option>
        </select>

      </div>

      {/* ⭐ Review Cards */}
      {sorted.map((review, i) => (
        <div
          key={i}
          className="border-b border-slate-200 dark:border-slate-700 pb-4"
        >
          <div className="flex justify-between items-start">
            <p className="font-semibold text-slate-900 dark:text-white">
              {review.name}
            </p>
            <p className="text-yellow-500">{`★`.repeat(review.rating)}</p>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
            {review.comment}
          </p>

          <p className="text-xs text-slate-400 mt-2">
            {new Date(review.date).toLocaleDateString("en-US")}
          </p>
        </div>
      ))}

    </div>
  );
};

export default ReviewList;
