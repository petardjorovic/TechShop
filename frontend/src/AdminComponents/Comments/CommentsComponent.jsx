import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../../store/loader/loaderSlice";
import {
  changeCommentStatus,
  getAllComments,
} from "../../services/commentService";
import "./CommentsComponent.scss";
import { formatDateAdmin } from "../../utils/formatDate";
import { toast } from "react-toastify";
import DeleteCommentModal from "./Modals/DeleteCommentModal";

function CommentsComponent() {
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  const fetchComments = async () => {
    dispatch(showLoader(true));
    const res = await getAllComments();
    dispatch(showLoader(false));
    if (res.status === "success") {
      setComments(res.allComments);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const changeStatus = async (comment) => {
    const newStatus = !comment.status;
    dispatch(showLoader(true));
    const res = await changeCommentStatus({
      commentId: comment._id,
      status: newStatus,
    });
    dispatch(showLoader(false));
    if (res.status === "success") {
      toast.success(res.message);
      setComments((prev) =>
        prev.map((c) =>
          c._id === comment._id ? { ...c, status: newStatus } : c
        )
      );
    } else {
      toast.error(res.message);
    }
  };

  const openDeleteCommentModal = async (comment) => {
    setCurrentComment(comment);
    setIsDeleteModal(true);
  };

  return (
    <div className="table-comments">
      <table className="table table-striped table-hover table-bordered table-dark">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Author</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map((comment, index) => {
              return (
                <tr key={index} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{comment.productTitle}</td>
                  <td>{comment.author}</td>
                  <td>{comment.content}</td>
                  <td>{formatDateAdmin(comment.date)}</td>
                  <td>
                    {comment.status ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => changeStatus(comment)}
                      >
                        Forbid
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => changeStatus(comment)}
                      >
                        Aprrove
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteCommentModal(comment)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                There isn't any comment
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isDeleteModal && (
        <DeleteCommentModal
          currentComment={currentComment}
          setIsDeleteModal={setIsDeleteModal}
          rerenderView={fetchComments}
        />
      )}
    </div>
  );
}

export default CommentsComponent;
