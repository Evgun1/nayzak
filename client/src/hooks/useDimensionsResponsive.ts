// import { useEffect, useMemo, useState } from "react";
// import { fa } from "zod/v4/locales";

// interface State {
// 	isMobile: boolean;
// 	isTablet: boolean;
// 	isDesktop: boolean;
// }

// function useDimensionsResponsive() {
// 	const [responsiveState, setResponsiveState] = useState<State>({
// 		isDesktop: false,
// 		isMobile: false,
// 		isTablet: false,
// 	});

// 	if (typeof window === "undefined") return responsiveState;

// 	useEffect(() => {
// 		const handleResize = () => {
// 			const windowWidth = window.innerWidth;
// 			switch (true) {
// 				case windowWidth < 768:
// 					setResponsiveState({
// 						isDesktop: false,
// 						isMobile: true,
// 						isTablet: false,
// 					});
// 					break;
// 				case windowWidth >= 768 && windowWidth < 992:
// 					setResponsiveState({
// 						isDesktop: false,
// 						isMobile: false,
// 						isTablet: true,
// 					});

// 					break;
// 				case windowWidth >= 992:
// 					setResponsiveState({
// 						isDesktop: true,
// 						isMobile: false,
// 						isTablet: false,
// 					});
// 					break;
// 			}
// 		};

// 		window.addEventListener("resize", handleResize);
// 		return () => window.removeEventListener("resize", handleResize);
// 	}, []);

// 	useEffect(() => {
// 		const windowWidth = window.innerWidth;
// 		switch (true) {
// 			case windowWidth < 768:
// 				setResponsiveState({
// 					isDesktop: false,
// 					isMobile: true,
// 					isTablet: false,
// 				});
// 				break;
// 			case windowWidth >= 768 && windowWidth < 992:
// 				setResponsiveState({
// 					isDesktop: false,
// 					isMobile: false,
// 					isTablet: true,
// 				});

// 				break;
// 			case windowWidth >= 992:
// 				setResponsiveState({
// 					isDesktop: true,
// 					isMobile: false,
// 					isTablet: false,
// 				});
// 				break;
// 		}
// 	}, []);

// 	return responsiveState;
// }

// export default useDimensionsResponsive;
