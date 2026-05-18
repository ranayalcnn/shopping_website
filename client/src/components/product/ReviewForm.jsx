import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ReviewForm = ({ onAddReview }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = (e) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newReview = {
      name,
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
    };

      onAddReview(newReview);
      toast.success("Your review has been submitted!");

      setName("");
      setRating(5);
      setComment("");
    };

  return (
    <form className="space-y-4 mt-10 text-left max-w-3xl" onSubmit={submitReview}>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
        Write a Review
      </h3>

      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-slate-800
                     border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Rating</label>
        <select
          className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-slate-800
                     border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[5,4,3,2,1].map(n => (
            <option key={n} value={n}>{n} ★</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Review</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-slate-800
                     border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
        />
      </div>

      <button
        type="submit"
        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 
                   text-white py-3 rounded-lg font-medium transition shadow-lg"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
