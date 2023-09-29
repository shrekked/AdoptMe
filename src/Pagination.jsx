import { useState } from "react";
const Pagination = ({ pagination, requestParams, setRequestParams }) => {
	// fontawesome icons
	const mobileQuery = window.matchMedia("(max-width: 600px)");
	const [isMobile, setIsMobile] = useState(mobileQuery.matches);

	mobileQuery.onchange = (e) => {
		setIsMobile(e.matches);
	};

	// pagination config
	const pagesConfig = isMobile ? 1 : 4;
	const pages = [];
	const start = 1;
	const end = pagination.total_pages;
	const allPages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
	if (pagination.current_page < pagesConfig) {
		pages.push(...allPages.slice(0, pagesConfig));
	}
	if (pagination.current_page >= pagesConfig) {
		pages.push(
			...allPages.slice(
				pagination.current_page - Math.ceil(pagesConfig / 2),
				pagination.current_page + Math.ceil(pagesConfig / 2)
			)
		);
	}

	const handlePagination = (e, page) => {
		if (e?.code === "Enter" || e.type === "click") {
			setRequestParams({ ...requestParams, page: page });
		}
	};
	return (
		<>
			<div className="flex justify-center gap-8 p-12 ">
				{pagination.current_page > 1 && (
					<button
						onClick={(e) => handlePagination(e, pagination.current_page - 1)}
						onKeyDown={(e) => handlePagination(e, pagination.current_page - 1)}
						className="radius basis-3 rounded border border-solid border-black bg-red-400 p-2 font-bold transition hover:bg-red-500"
					>
						<i className="ri-arrow-left-line">
							<span className="sr-only">Previous</span>
						</i>
					</button>
				)}

				{pagination.current_page > pagesConfig && !isMobile && (
					<button
						className="radius basis-3 rounded border border-solid border-black bg-red-400 p-2 font-bold transition hover:bg-red-500"
						onClick={(e) => handlePagination(e, 1)}
						onKeyDown={(e) => handlePagination(e, 1)}
					>
						1
					</button>
				)}

				{pages.map((page) => {
					return (
						<button
							key={page}
							className={`radius basis-3 rounded border border-solid border-black bg-red-400 p-2 font-bold transition hover:bg-red-500 ${
								pagination.current_page === page ? " bg-red-500" : ""
							}`}
							onClick={(e) => handlePagination(e, page)}
							onKeyDown={(e) => handlePagination(e, page)}
						>
							{page}
						</button>
					);
				})}

				{pagination.current_page < pagination.total_pages &&
					pagination.total_pages > pagesConfig &&
					!isMobile && (
						<button
							className="radius basis-3 rounded border border-solid border-black bg-red-400 p-2 font-bold transition hover:bg-red-500"
							onClick={(e) => handlePagination(e, pagination.total_pages)}
							onKeyDown={(e) => handlePagination(e, pagination.total_pages)}
						>
							{pagination.total_pages}
						</button>
					)}

				{pagination.current_page < pagination.total_pages && (
					<button
						onClick={(e) => handlePagination(e, pagination.current_page + 1)}
						onKeyDown={(e) => handlePagination(e, pagination.current_page + 1)}
						className="radius basis-3 rounded border border-solid border-black bg-red-400 p-2 font-bold transition hover:bg-red-500"
					>
						<i className="ri-arrow-right-line">
							<span className="sr-only">Next</span>
						</i>
					</button>
				)}
			</div>
		</>
	);
};

export default Pagination;
