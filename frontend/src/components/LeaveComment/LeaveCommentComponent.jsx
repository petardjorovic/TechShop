import { useEffect, useState } from "react";
import LabelComponent from "../Label/LabelComponent";
import ButtonComponent from "../Button/ButtonComponent";
import "./LeaveCommentComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import {
  addProductComment,
  getProductComments,
} from "../../services/commentService";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/formatDate";

function LeaveCommentComponent({ product }) {
  const { user } = useSelector((state) => state.userStore);
  const [isComment, setIsComment] = useState(true);
  const [allComments, setAllComments] = useState([]);
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    author: user?.username || "Guest",
    content: "",
    productId: product._id,
    productTitle: product.title,
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.content) return setIsComment(false);
    setIsComment(true);
    dispatch(showLoader(true));
    const res = await addProductComment(comment);
    dispatch(showLoader(false));
    if (res.status === "success") {
      setComment((prev) => {
        return { ...prev, content: "" };
      });
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const fetchComments = async () => {
    dispatch(showLoader(true));
    const res = await getProductComments(product._id);
    dispatch(showLoader(false));
    if (res.status === "success") {
      setAllComments(res.allComments.filter((comment) => comment.status));
    }
  };

  return (
    <>
      <div className="leave-comment-wrapper">
        <h4>Leave Comment</h4>
        <form className="comment-form pt-1 pb-4" onSubmit={handleSubmit}>
          <LabelComponent htmlFor={"comment"} color={!isComment}>
            {isComment ? "Comment" : "Comment is required"}
          </LabelComponent>
          <textarea
            name="comment"
            id="comment"
            className="form-control my-2"
            maxLength={500}
            value={comment.content}
            onChange={(e) =>
              setComment((prev) => {
                return { ...prev, content: e.target.value };
              })
            }
          ></textarea>
          <ButtonComponent className="btn btn-primary">
            Submit Comment
          </ButtonComponent>
        </form>
      </div>
      <div className="comments-wrapper">
        <h4>Comments({allComments.length})</h4>
        {allComments.length > 0 &&
          allComments.map((comment, index) => {
            return (
              <div className="single-comment card" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{comment.author}</h5>
                  <p className="card-text">{comment.content}</p>
                  <footer className="blockquote-footer">
                    Date:{" "}
                    <cite title="Source Title">{formatDate(comment.date)}</cite>
                  </footer>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default LeaveCommentComponent;
