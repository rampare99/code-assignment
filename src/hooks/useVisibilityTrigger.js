import { useCallback, useEffect, useState } from "react";

const useVisibilityTrigger = (callback) => {
	const [endOfTheListNode, setEndOfTheListNode] = useState(null);

	const EndOfTheList = useCallback(
		() => (
			<a
				ref={setEndOfTheListNode}
				style={{ minHeight: "1px", minWidth: "1px" }}
				data-end-of-list
			/>
		),
		[]
	);

	useEffect(() => {
		if (!window.IntersectionObserver) {
			return;
		}

		if (endOfTheListNode) {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry?.isIntersecting) {
					callback();
				}
			}, {rootMargin: '10px'});

			observer.observe(endOfTheListNode);

			return () => observer.disconnect();
		}
	}, [callback, endOfTheListNode]);

	return EndOfTheList;
};

export default useVisibilityTrigger;
