
window.ebp = window.ebp || {};

ebp.initiateEBP = function(){

	ebp.cart = ebp.cart || {};
	
	ebp.currentActiveFilters = ebp.currentActiveFilters || 0;
	
	/*
	 * Render filter pane
	 */
	var renderFilters = function(){
		// Creating filter-container
		var filterHTML = '';
		for(var filterType in ebp.filters){
			filterHTML += '<div class="filter-type" data-filter-type="'+filterType+'">'+
					'<div class="filter-type-header">'+ebp.filters[filterType].name+'</div>'+
					'<div class="clear-filter">clear</div>';
			
			// Keep track of active filters
			if(ebp.filters[filterType].selections.length > 0) ++ebp.currentActiveFilters;
			
			for(var optionsKey in ebp.filters[filterType].options){
				filterHTML += '<label class="filter-option-label"><input type="checkbox" '+ (ebp.filters[filterType].selections.indexOf(optionsKey) !== -1? 'checked': '') +' data-filter-option="'+optionsKey+'"/>'+ebp.filters[filterType].options[optionsKey]+'</label>'
			}
			
			filterHTML += '</div>';
		}

		$('#ebp-filter-container').html(filterHTML);
	};
	
	
	/*
	 * Render product
	 */
	var renderProduct = function(productIndex){
		return '<div class="product-result" data-product-index="'+productIndex+'">' +
					'<div class="product-image"><center>Image</center></div>' +
					'<div class="product-head">'+ebp.products[productIndex].name+'</div>' +
					'<div class="product-add-to-cart"></div>' +
				'</div>';
	};
	
	/*
	 * Render results pane
	 */
	var renderResults = function(){
		var productResultsHTML = '';
		
		if(ebp.currentActiveFilters > 0){
			// With filter
			for(var i = 0, iLimit = ebp.products.length; i < iLimit; ++i){
				ebp.products[i].index = i;
				
				var include = false;
				for(var filterType in ebp.filters){
					if(ebp.products[i][filterType] == '') continue;
					
					if(ebp.filters[filterType].selections.indexOf(ebp.products[i][filterType]) !== -1){
						include = true;
						break;
					}
				}
				
				if(!include) continue;
				
				productResultsHTML += renderProduct(i);
			}
		} else {
			// without filter
			for(var i = 0, iLimit = ebp.products.length; i < iLimit; ++i){
				if(ebp.products[i].index === undefined) ebp.products[i].index = i;
				productResultsHTML += renderProduct(i);
			}
		}

		$('#ebp-results-container').html(productResultsHTML);
	};
	
	renderFilters();
	renderResults();
	
	// Filters value change handler
	var filterValueChanged = function(e){
		var optionValue = this.getAttribute('data-filter-option');
		var filterType = this.parentNode.parentNode.getAttribute('data-filter-type');
		if(this.checked){
			ebp.filters[filterType].selections.push(optionValue);
			if(ebp.filters[filterType].selections.length === 1) ++ebp.currentActiveFilters;
		} else {
			var index = ebp.filters[filterType].selections.indexOf(optionValue);
			ebp.filters[filterType].selections.splice(index , 1);
			if(ebp.filters[filterType].selections.length === 0) --ebp.currentActiveFilters;
		}
		
		// Render the result set in accordance to new filter values
		renderResults();
		
		return;
	};
	
	// clearFilterValue
	var clearFilterValue = function(e){
		var filterType = this.parentNode.getAttribute('data-filter-type');
		if(ebp.filters[filterType].selections.length > 0) {
			var allOptionsElement = $(this.parentNode).find('input');
			for(var i = 0, iLimit = allOptionsElement.length; i < iLimit; ++i){
				allOptionsElement[i].checked = false;
			}
			ebp.filters[filterType].selections = [];
			--ebp.currentActiveFilters;
			
			// Render the result set in accordance to new filter values
			renderResults();
			
		}
	};
	
	// Add to Cart
	var addToCart = function(e){
		if(ebp.cart[this.parentNode.getAttribute('data-product-index')] == undefined) {
			ebp.cart[this.parentNode.getAttribute('data-product-index')] = 1;
		} else {
			ebp.cart[this.parentNode.getAttribute('data-product-index')] = ++ebp.cart[this.parentNode.getAttribute('data-product-index')];
		}
	};
	
	// view cart
	var viewCart = function(e){
		var str = '';
		for(var key in ebp.cart){
			str += ebp.products[+key].name +' - Qty : ' + ebp.cart[key] + '\n';
		}
		console.log(str);
	};
	
	// Event Binding
	$('#ebp-filter-container').on('change', 'input', filterValueChanged);
	$('#ebp-filter-container').on('click', '.clear-filter', clearFilterValue);
	$('#ebp-results-container').on('click', '.product-add-to-cart', addToCart);
	$('#ebp-proceed-checkout').on('click', viewCart);
};
