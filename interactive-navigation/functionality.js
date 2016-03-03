
var interactiveNavigation = function(container){
	if(interactiveNavigationJson == undefined) return;
	
	var inHTML = '';
	
	for(var linkInstance, i = 0, iLimit = interactiveNavigationJson.length; i < iLimit; ++i){
		linkInstance = interactiveNavigationJson[i];
		inHTML +=
			'<div class="interact-navigation-link" data-href="'+linkInstance.href+'">' +
				'<label>'+linkInstance.displayName+'</label>'+
				'<div class="interact-navigation-detail">';
		
			for(var pageInstance, j = 0, jLimit = linkInstance.pageSection.length; j < jLimit; ++j){
				
				pageInstance = linkInstance.pageSection[j];
				
				inHTML +=
					'<div class="interact-navigation-page">';
			
				for(var categoriesInstance, k = 0, kLimit = pageInstance.categories.length; k < kLimit; ++k){
					categoriesInstance = pageInstance.categories[k];
					inHTML +=
						'<div class="interact-navigation-categories" data-href="'+categoriesInstance.href+'">' +
							'<label>'+categoriesInstance.displayName+'</label>';
					
									
					for(var sectionInstance, l = 0, lLimit = categoriesInstance.sections.length; l < lLimit; ++l){
						sectionInstance = categoriesInstance.sections[l];
						inHTML +=
							'<div class="interact-navigation-sections" data-href="'+sectionInstance.href+'">' +
								'<label>'+sectionInstance.displayName+'</label>';
								
						inHTML +=
							'</div>';
					}
					
					inHTML +=
						'</div>';
				}
				
				inHTML +=
					'</div>';
				
			}
			
		
		inHTML +=
				'</div>'+
			'</div>';
		
	}
	
	$(container).html(inHTML);
};