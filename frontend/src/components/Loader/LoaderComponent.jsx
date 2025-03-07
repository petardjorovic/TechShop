import { useSelector } from "react-redux";
import "./LoaderComponent.scss";

function LoaderComponent() {
  const { showLoader } = useSelector((state) => state.loaderStore);
  if (!showLoader) return;
  return (
    <>
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    </>
  );
}

export default LoaderComponent;
