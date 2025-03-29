import Modal from "react-modal";
import customModalStyles from "../../../../public/js/customModalStyles";
import { FaWindowClose } from "react-icons/fa";
import "./ViewProductsByCategoryModal.scss";
import useConvertPrice from "../../../utils/useConvertPrice";

function ViewProductsByCategoryModal({
  setIsViewProductsModal,
  currentCategory,
}) {
  const convertPrice = useConvertPrice();

  return (
    <Modal isOpen={true} ariaHideApp={false} style={customModalStyles} centered>
      <span onClick={() => setIsViewProductsModal(false)} className="close">
        <FaWindowClose color="tomato" />
      </span>
      <div className="content-header">
        <h4>
          All products for category{" "}
          <strong className="text-primary">
            {currentCategory.categoryName}
          </strong>
        </h4>
      </div>
      <div className="table-category-products">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentCategory.products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{convertPrice(product.price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

export default ViewProductsByCategoryModal;
