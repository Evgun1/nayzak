import { createSlice } from "@reduxjs/toolkit";

const responsiveSlice = createSlice({
	name: "responsive",
	initialState: {
		isMobile: false,
		isTablet: false,
		isDesktop: false,
	},
	reducers: {
		init(state) {
			const documentElementWidth = document.documentElement.clientWidth;

			switch (true) {
				case documentElementWidth < 768:
					state.isMobile = true;
					break;
				case documentElementWidth >= 768 && documentElementWidth < 992:
					state.isTablet = true;
					break;
				case documentElementWidth >= 992:
					state.isDesktop = true;
					break;
			}
		},
		update(state) {
			const windowWidth = window.innerWidth;
			switch (true) {
				case windowWidth < 768:
					state.isMobile = true;
					state.isTablet = false;
					state.isDesktop = false;
					break;
				case windowWidth >= 768 && windowWidth < 992:
					state.isMobile = false;
					state.isTablet = true;
					state.isDesktop = false;
					break;
				case windowWidth >= 992:
					state.isMobile = false;
					state.isTablet = false;
					state.isDesktop = true;
					break;
			}
		},
	},
});

export default responsiveSlice.reducer;
export const responsiveActions = responsiveSlice.actions;
