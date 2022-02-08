$(function () {
  $("#formulario").submit((e) => {
    e.preventDefault();

    let input = $("input[type=text]").val();
    console.log(input);

    const regexNum = /^\d+$/;

    if (regexNum.test(input) == false) {
      document.querySelector(
        ".error"
      ).innerHTML = `<p class="text-danger fw-bold fs-4"><span><img class="ops d-block img-fluid mx-auto" src="assets/img/oops.png" alt="ops" width="10px" heigth="auto">Recorcholis Batman!! introduce un numero para descubrir tu superHero</span></p>`;
    } else if (input == "") {
      document.querySelector(
        ".error"
      ).innerHTML = `<p class="text-danger fw-bold fs-4"><span><img class="ops d-block img-fluid mx-auto" src="assets/img/oops.png" alt="ops" width="10px" heigth="auto">Recorcholis Batman!! introduce un numero para descubrir tu superHero</span></p>`;
    } else {
      document.querySelector(
        ".error"
      ).innerHTML = `<p class="text-success fw-bold fs-4"><span><img class="ops d-block img-fluid mx-auto" src="assets/img/wow.jpg" alt="ops" width="10px" heigth="auto">Wow!! Ahora te dire tu superHero</span></p>`;
      $(".resultado").css("display", "block");
    }

    $(".ops").animate({
      width: "300px",
      marginLeft: "150px",
      borderWidth: "10px",
    });

    
    $("#imagen").css("display", "none")

    $.ajax({
      type: "GET",
      url: `https://superheroapi.com/api.php/4905856019427443/${input}`,
      dataType: "json",
      success: (data) => {
        $(".resultado img")
          .attr("src", data.image.url)
          .attr("alt", data.name)
          .attr("class", "img-fluid rounded-start");

        let pesos=data.appearance.weight
        console.log(pesos);
          for (const peso of pesos) {
            console.log(peso[1]);
            $(".card-body").html();
        }

        $(".card-body").html(`
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-conexiones">Conexiones:${data.connections["group-affiliation"]} Familiares: ${data.connections.relatives}</p><hr>
                    <p class="card-publicadoX">Publicado por: ${data.biography.publisher}</p><hr>
                    <p class="card-publicadoX">Ocupación: ${data.work.occupation}</p><hr>
                    <p class="altura">Altura: ${data.appearance.height[1]}</p><hr>
                    <p class="peso">Peso kg: ${data.appearance.weight[1]}. Peso libras: ${data.appearance.weight[0]}</p><hr>
                    <p class="alianzas">Alianzas: ${data.biography.aliases}</p>

               `);

        console.log(data);

        let total = Object.values(data.powerstats).reduce((acumulador,valor) => {
            return acumulador + parseInt(valor)
        }, 0);  
        

         let datosGrafica= Object.entries(data.powerstats).map((item)=>({
             y:(item[1]*100)/total,
             label:item[0]
         }))
            console.log(datosGrafica);
            
        
          function graf() {
          var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            animationDuration: 3000,
            theme: "light2",
            title: {
            text: `${data.name}`,
            },
            data: [
              {
                type: "pie",                
                showInLegend: true,
                indexLabel: "{label} - {y}%",
                toolTipContent: "{label} - #percent %",
                yValueFormatString: "##0.00\"%\"",
                legendText: "{label}",
                dataPoints: datosGrafica,
              },
            ],
          });
          chart.render();
        }

        graf();
      },
      error: () => {
        return alert("Ha ocurrido un error, intente nuevamente");
      },
    });
  });

  let fecha = new Date().getFullYear();

 $(".footer").html(`&copy Betsy Toyo   ${fecha}`);
});

 