import { FaStar } from "react-icons/fa";

/* ===================== TYPES ===================== */

interface RatingDistribution {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
}

interface Review {
  id: string;
  rating: number;
  text: string;
  authorName: string;
  date: string; // already formatted
}

interface ProductRatingsSectionProps {
  averageRating?: number;
  totalReviews?: number;
  distribution?: RatingDistribution;
  reviews?: Review[];
  onViewAllReviews?: () => void;
}

/* ===================== COMPONENT ===================== */

export function ProductRatingsSection({
  averageRating,
  totalReviews,
  distribution,
  reviews = [],
  onViewAllReviews,
}: ProductRatingsSectionProps) {
  const hasRatings =
    averageRating !== undefined &&
    totalReviews !== undefined &&
    totalReviews > 0;

  return (
    <section>
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Ratings & Reviews
      </h2>

      {!hasRatings && <p className="text-sm text-gray-600">No reviews yet.</p>}

      {hasRatings && (
        <div className="space-y-8">
          {/* ================= SUMMARY ================= */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* Average Rating */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="text-2xl font-semibold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Based on {totalReviews} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            {distribution && (
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count =
                    distribution[star as keyof RatingDistribution] ?? 0;
                  const percentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                  return (
                    <div
                      key={star}
                      className="flex items-center gap-3 text-sm"
                      aria-label={`${star} star rating`}
                    >
                      <span className="w-10 text-gray-600">{star} ★</span>

                      <div className="relative h-2 flex-1 rounded bg-gray-200">
                        <div
                          className="absolute left-0 top-0 h-2 rounded bg-gray-700"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <span className="w-10 text-right text-gray-600">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================= REVIEWS ================= */}
          {reviews.length > 0 && (
            <div className="space-y-4">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {/* ================= VIEW ALL ================= */}
          {onViewAllReviews && (
            <button
              type="button"
              onClick={onViewAllReviews}
              className="text-sm font-medium text-gray-900 underline"
            >
              View all reviews
            </button>
          )}
        </div>
      )}
    </section>
  );
}

/* ===================== SUB COMPONENTS ===================== */

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="space-y-2 rounded-md border p-4">
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
            size={14}
          />
        ))}
      </div>

      <p className="text-sm text-gray-700 line-clamp-3">{review.text}</p>

      <div className="text-xs text-gray-500">
        {review.authorName} · {review.date}
      </div>
    </div>
  );
}
