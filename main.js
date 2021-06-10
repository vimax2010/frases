// SERVICE WORKER//

if('serviceWorker' in navigator){
   console.log('Puedes usar los service worker en el navegador');
 
   navigator.serviceWorker.register('./sw.js')
   						  .then(res => console.log('serviceWorker cargado correctamente',res))
   						  .catch(err => console.log('serviceWorker no se ha podido registrar',err));

  }else{
   console.log('No puedes usar los service worker en el navegador');
}

// Scroll suavizado//
$(document).ready(function(){
   $("#menu a").click(function(e){
   	  e.preventDefault();
      
      $("html, body").animate({
      	   scrollTop: $($(this).attr('href')).offset().top
      });

   	  return false;
   });
});