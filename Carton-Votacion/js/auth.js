
$(document).ready(function(){
    console.log(usuariosJSON)
})
$('.formLogin').submit(function (e) {
    e.preventDefault();
    var nombre = $('input[name="userName"]').val();
    var password = $('input[name="password"]').val();
    var seguir = false;
   
    // if (sw == 1) {
        usuarios = usuariosJSON.usuarios 
        for (usuario of usuarios) {
            if ( usuario.numero_cc == nombre && usuario.clave == password) {
                if (usuario.rol == "Votante") {
                    window.location.href = ("../index2.html");
                    seguir = true;
                }else if(usuario.rol == "Jurado"){
                    sessionStorage.setItem('nombreJurado',usuario.Nombres)
                    window.location.href=("../json/data.html");
                    
                }
                break;
            }
        }
    
    if (!seguir) {
        swal({
            title: "contraseña iconrrecta",
            text: "intente de nuevo",
            icon: "error",
            button: "ok!",
          });
    }
   


})
