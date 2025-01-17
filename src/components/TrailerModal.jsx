import React from "react";
import { useDispatch, useSelector } from "react-redux";
import YoutubePlayer from "./YoutubePlayer";
import modalSlice from "../data/modalSlice";
import '../styles/modal.scss';

const TrailerModal = () => {
	const dispatch = useDispatch();
	const { isOpen, videoKey, movieTitle } = useSelector((state) => state.modal);
	const { closeModal } = modalSlice.actions;

  const handleBackdropClick = () => {
    dispatch(closeModal());
  };

  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

	if (!isOpen) return null;
	return (
		<div
			className="modal show d-block modal-background"
			tabIndex="-1"
			role="dialog"
			data-testid="trailer-modal"
      onClick={handleBackdropClick}
		>
			<div className="modal-dialog modal-dialog-centered modal-lg" onClick={handleModalContentClick}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{movieTitle}</h5>
						<button
							type="button"
							className="btn-close w-auto"
							aria-label="Close"
              data-testid="close-trailer-modal-button"
							onClick={() => dispatch(closeModal())}
						/>
					</div>
					<div className="modal-body">
						{videoKey ? (
							<YoutubePlayer videoKey={videoKey} />
						) : (
							<p>No trailer available.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrailerModal;
