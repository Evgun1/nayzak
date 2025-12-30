function responsiveHandler() {
	if (typeof window === "undefined") return "isDesktop";

	// const windowWidth = window.innerWidth;
	const documentElementWidth = document.documentElement.clientWidth;
	switch (true) {
		case documentElementWidth < 768:
			return "isMobile";
		case documentElementWidth >= 768 && documentElementWidth < 992:
			return "isTablet";
		case documentElementWidth >= 992:
			return "isDesktop";
	}
}

export default responsiveHandler;
