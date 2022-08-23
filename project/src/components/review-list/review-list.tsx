import {Review} from '../../types/review';

type ReviewListProps = {
  comments: Review[];
}

function ReviewList({comments}: ReviewListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {comments.map((reviewObj, index) => {
        const keyValue = `${index}-${reviewObj}`;
        return (
          <li className="reviews__item" key={keyValue}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={reviewObj.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
              </div>
              <span className="reviews__user-name">
                {reviewObj.user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${20 * reviewObj.rating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {reviewObj.comment}
              </p>
              <time className="reviews__time" dateTime="2019-04-24">{reviewObj.date}</time>
            </div>
          </li>
        );})}
    </ul>
  );
}

export default ReviewList;
