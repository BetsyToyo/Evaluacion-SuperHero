$(function(){
    $("#formulario").submit((e)=>{
        e.preventDefault()
        
       let input=$("input[type=text]").val()
       console.log(input);
       
       const regexNum=/^\d+$/;
   
       if(regexNum.test(input)==false){
           document.querySelector(".error").innerHTML=`<p class="text-danger fw-bold fs-4"><span><img class="ops d-block img-fluid" src="assets/img/oops.jpg" alt="ops" width="100px" heigth="auto">Recorcholis Batman!! introduce un numero para descubrir tu superHero</span></p>`
       }else if(input==""){
           document.querySelector(".error").innerHTML=`<p class="text-danger fw-bold fs-4"><span><img class="ops d-block img-fluid" src="assets/img/oops.jpg" alt="ops" width="100px" heigth="auto">Recorcholis Batman!! introduce un numero para descubrir tu superHero</span></p>`
       
        }else{document.querySelector(".error").innerHTML=`<p class="text-success fw-bold fs-4"><span><img class="ops d-block img-fluid" src="assets/img/wow.jpg" alt="ops" width="100px" heigth="auto">Wow!! Ahora te dire tu superHero</span></p>`}
       
        $(".ops").animate({
            width: "300px",            
            marginLeft: "150px",
            borderWidth: "10px",            
        });

        $.ajax({
            type:"GET",
            url:`https://superheroapi.com/api.php/4905856019427443/${input}`,
            dataType:"json",
            success:(data)=>{

               $(".resultado img").attr("src",data.image.url).attr('alt',data.name).attr('class','img-fluid rounded-start');
               
               $(".card-body").html(`
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-conexiones">Conexiones:${data.connections["group-affiliation"]} Familiares: ${data.connections.relatives}</p><hr>
                    <p class="card-publicadoX">Publicado por: ${data.biography.publisher}</p><hr>
                    <p class="card-publicadoX">Ocupación: ${data.work.occupation}</p><hr>
                    <p class="altura">Altura: ${data.appearance.height[1]}</p><hr>
                    <p class="peso">Peso: ${data.appearance.weight[1]}</p><hr>
                    <p class="alianzas">Alianzas: ${data.biography.aliases}</p>

               `)                          
                         
                 console.log(data);

                 $(".titulo-graf").html(`Estadisticas de poder para: ${data.name}`)

                  function graf () {
                    var chart = new CanvasJS.Chart("chartContainer",
                    {
                        animationEnabled: true, 
		                animationDuration: 2000,  
                        theme: "light2",
                        title:{
                            text: "Gaming Consoles Sold in 2012"
                        },		
                        data: [
                        {       
                            type: "pie",
                            showInLegend: true,
                            toolTipContent: "{y} - #percent %",
                            yValueFormatString: "#,##0,,.## Million",
                            legendText: "{indexLabel}",
                            dataPoints: [
                                {  y: 4181563, indexLabel: "PlayStation 3" },
                                {  y: 2175498, indexLabel: "Wii" },
                                {  y: 3125844, indexLabel: "Xbox 360" },
                                {  y: 1176121, indexLabel: "Nintendo DS"},
                                {  y: 1727161, indexLabel: "PSP" },
                                {  y: 4303364, indexLabel: "Nintendo 3DS"},
                                {  y: 1717786, indexLabel: "PS Vita"}
                            ]
                        }
                        ]
                    });
                    chart.render();
                }

                graf()
            }
        })
   });



    
});