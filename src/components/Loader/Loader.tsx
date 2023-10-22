import { ClipLoader } from "react-spinners";
import "./Loader.css";
import { CSSProperties } from "react";

const override: CSSProperties = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: "red",
};

const Loader = () => {
  return (
    <div className="max-h-screen h-screen max-w-screen flex items-center justify-center">
      <ClipLoader
        color={"red"}
        loading={true}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
