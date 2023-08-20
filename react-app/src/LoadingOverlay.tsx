import LoadingImg from "./assets/images/spinner-main.gif";

export function LoadingOverlay({isLoading}) {
  return (
    <div
      className="modal"
      id="myModal"
      style={{ display: isLoading === true ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
          style={{ border: "0", marginLeft: "110px" }}
        >
          <img src={LoadingImg} alt="loading..." width={300} height={300} />
        </div>
      </div>
    </div>
  );
}
