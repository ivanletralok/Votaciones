var c, con1 = 0;

$('.numeros').each((i, x) => {
    $(x).html(i + 1);
})

/** 
$('.Partido').click(function () {
    par = $(this).find('span').html()
    con1 = con1 + 1;
});

$(".numeros").click(function () {
    valor = parseInt($(this).html());
    con1 = con1 + 1;

});

$(".sub").click(function (e) {
    e.preventDefault();

    swal(" si desea confirmar la votacion click en ok, sino de click afuera del recuadro y recargue la paina ")
        .then((bool) => {

            if (bool == null) {
                swal("ha cancelado la votacion recargue y vuelva a votar")
            } else if (con1 == 2) {
                swal(" ustede ha Votado por el: " + par + " y el numero de candidato : " + valor);
            } else if (par == "Voto en blanco") {
                swal("su voto ha sido en blanco");
            }


        });


});

$(".sal").click(function (a) {
    a.preventDefault();

    window.location.href = ("/home/alex/Escritorio/entregar-voto/Carton-Votacion/login/Login.html");
})
*/

var pulsada, sw = 0;

$(".img").on("click", "img", function (e) {
    e.preventDefault();
    var pulsada = $(this).attr("alt");
    con1 = con1 + 1;
    swal({
            title: "Confirmar Voto",
            text: "Esta Seguro Votar Por Este Candidato!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                sw = sw + 1;
                swal("Voto Exitoso" + " : " + pulsada, {
                    icon: "success",

                });
            } else {
                swal("Voto Cancelado");
                sw = 0;
            }
        });

});

function redireccionar() {
    
        setTimeout("location.href='./login/Login.html'", 20000);
 

}










/* }
$('.bt').click(function(e){
    e.preventDefault();
    window.location.href=("./login/Login.html");

});
document.getElementById("prueba1").addEventListener("click",function(){
    console.log("has clickado con javascript")
})*/