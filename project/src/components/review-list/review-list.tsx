import {Review} from '../../types/review';
import ReviewCard from '../review-card/review-card';

type ReviewListProps = {
  comments: Review[];
}

function ReviewList({comments}: ReviewListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {comments.map((userComment) => (
        <ReviewCard
          key={userComment.id}
          userComment={userComment}
        />
      )
      )}
    </ul>
  );
}

export default ReviewList;
