import React from "react";
import { useDispatch } from "react-redux";
import useVisibilityTrigger from "../hooks/useVisibilityTrigger";
import "../styles/movies.scss";

const withInfiniteScroll = (WrappedComponent) => {
	return (props) => {
		const dispatch = useDispatch();
		const { isLoading, hasMore, apiUrl, page, fetch } = props;

		const EndOfTheList = useVisibilityTrigger(() => {
			if (!isLoading && hasMore) {
				dispatch(
					fetch({
						apiUrl,
						page,
					})
				);
			}
		});

		return (
			<div>
				<WrappedComponent {...props} />
				<EndOfTheList />
				{isLoading && (
					<div
						className="spinner-border scroll-spinner"
						role="status"
						data-testid="scroll-loading-spinner"
					/>
				)}
			</div>
		);
	};
};

export default withInfiniteScroll;
