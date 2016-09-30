window.onload = function(){
	var search = document.getElementById("search");
	var searchbox = document.getElementById("searchbox");
	var searchRes = document.getElementById("searchResult");
	
	search.onclick = function(){
		if(searchRes.style.display == 'none'){
			searchRes.style.display = 'block';
		}else{
			searchRes.style.display = 'none';
		}
	}
	search.onmouseout = function(){
		searchRes.style.display = 'none';
	}
	search.onblur = function(){
		searchRes.style.display = 'none';
	}
}
