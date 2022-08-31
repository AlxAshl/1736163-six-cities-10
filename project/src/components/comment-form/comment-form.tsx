import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchCommentAction } from '../../store/api-actions';


type CommentFormProps = {
  onComment: (formData: FormDataType) => void;
}

export type FormDataType = {
  comment: string
  rating: string
}

function CommentForm(props: CommentFormProps): JSX.Element {

  const dispatch = useAppDispatch();
  const [updateComment, SetUpdateComment] = useState(false);
  const {onComment} = props;
  const [formData, setFormData] = useState({
    comment: '',
    rating: '',
  });
  const removeInput = () => {
    setFormData({comment: '', rating: ''});
  };

  useEffect(()=>{
    SetUpdateComment(true);
    dispatch(fetchCommentAction());
  },[updateComment, dispatch]);

  const formChangeHandler = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value,});
  };

  return (
    <form onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      onComment(formData);
      removeInput();
      SetUpdateComment(false);
    }} className="reviews__form form" action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {!updateComment
          ? <div>Updating...</div>
          :
          <>
            <input onChange={formChangeHandler} className="form__rating-input visually-hidden" name="rating" value={5} id="5-stars" type="radio" />
            <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
            <input onChange={formChangeHandler} className="form__rating-input visually-hidden" name="rating" value={4} id="4-stars" type="radio" />
            <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
            <input onChange={formChangeHandler} className="form__rating-input visually-hidden" name="rating" value={3} id="3-stars" type="radio" />
            <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
            <input onChange={formChangeHandler} className="form__rating-input visually-hidden" name="rating" value={2} id="2-stars" type="radio" />
            <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input required onChange={formChangeHandler} className="form__rating-input visually-hidden" name="rating" value={1} id="1-star" type="radio" />
            <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </>}
      </div>
      {!updateComment
        ? <div className="reviews__textarea form__textarea"></div>
        : <textarea required onChange={formChangeHandler} className="reviews__textarea form__textarea" id="review" name="comment" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!updateComment}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
