/*

*/

// Підключення функціоналу "Чертоги Фрілансера"
import layoutMode from "isotope-layout/js/layout-mode.js";
import { isMobile, FLS } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import Isotope from 'isotope-layout/js/isotope.js';

const items = document.querySelector('[data-iso-items]');
if (items) {
	const itemsGrid = new Isotope(items, {
		itemSelector: '[data-iso-item]',
		layoutMode: 'vertical',
		// masonry: {
		// 	fitWidth: true,
		// 	gutter: 20
		// }
	});
	   // ==  FILTER VACANCY ==================================================
    document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		if (targetElement.closest(".filter__item")) {
			const filterItem = targetElement.closest(".filter__item");
			const filterValue = filterItem.dataset.filter;
			const filterActiveItem = document.querySelector('.filter__item.active');

			filterValue === "*" ? itemsGrid.arrange({ filter: `` }) :
				itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` })

			filterActiveItem.classList.remove("active");
			filterItem.classList.add("active");

			e.preventDefault();
		}
	}
    // =====================================================================================
}