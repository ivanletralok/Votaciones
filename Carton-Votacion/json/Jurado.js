sw = 0;
$('.btn').click(function () {
    var clic = $(this).html();
    sw = 1;
    if (sw == 1) {
        usuarios = usuariosJSON.usuarios
        for (usuario of usuarios) {
            console.log("nombres -> " + usuario.Nombres)
        }
    }

})




function reloadData() {
    var usuarios = usuariosJSON.usuarios;
    var htmlTable = `<tr>
                <th rowspan="2">
                    ORD
                </th>
                <th rowspan="2">No c.c, Verifique el
                    <br> numero</th>
                <th colspan="3">Apellidos y Nombres Segun Cedula</th>
            </tr>
            <tr>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Nombres</th>
                <th>Acciones</th>

            </tr>`;

    for (var i = 0; i < usuarios.length; i++) {
        htmlTable += `<tr >
        <td>
            <p>
                <input type="checkbox" id="test${i}" />
                <label for="test${i}"></label>
            </p>
        </td>
        <td id="cedulaD">${usuarios[i].numero_cc}</td>
        <td>
            <span id="primerApellido">${usuarios[i].Primer_Apellido}</span>
        </td>
        <td>
            <span id="segundoApellido">${usuarios[i].Segundo_Apellido}</span>
        </td>
        <td>
            <span id="nombres">${usuarios[i].Nombres}</span>
        </td>
        <td>
            <i class="material-icons accionesIcons editarIcon ">create</i>
            <i class="material-icons accionesIcons borrarIcon" id="${i}">delete</i>
        </td>
    </tr>`
    }

    $('#tableRegistros').html(htmlTable)
}

$(document).ready(function () {

    /// logica reloj ///

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    setInterval(drawClock, 1000);

    function drawClock() {
        drawFace(ctx, radius);
        drawNumbers(ctx, radius);
        drawTime(ctx, radius);
    }

    function drawFace(ctx, radius) {
        var grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, '#333');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#333');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    }

    function drawNumbers(ctx, radius) {
        var ang;
        var num;
        ctx.font = radius * 0.15 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    }

    function drawTime(ctx, radius) {
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        //hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) +
            (minute * Math.PI / (6 * 60)) +
            (second * Math.PI / (360 * 60));
        drawHand(ctx, hour, radius * 0.5, radius * 0.07);
        //minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        drawHand(ctx, minute, radius * 0.8, radius * 0.07);
        // second
        second = (second * Math.PI / 30);
        drawHand(ctx, second, radius * 0.9, radius * 0.02);
    }

    function drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

    /// logica reloj ///

    function searchInput() {
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("tableRegistros");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    $('.modal').modal();

    $('#myInput').keyup(function () {
        searchInput();
    })

    $('.nomj').append(': ' + sessionStorage.getItem("nombreJurado"))
    reloadData()

    $(document).on('click', '.borrarIcon', function () {

        posicionVector = $(this).attr("id");
        usuariosJSON.usuarios.splice(posicionVector, 1)
        reloadData()

    })

    $(document).on('click', '.editarIcon', function () {
        $('#modal1').modal('open');
        $('#primerApellidoLabel').addClass('active')
        $('#segundoApellidoLabel').addClass('active')
        $('#nombresLabel').addClass('active')

        pk1 = $(this).closest('tr').find('#primerApellido').html();
        pk2 = $(this).closest('tr').find('#segundoApellido').html();
        pk3 = $(this).closest('tr').find('#nombres').html();
        pk4 = $(this).closest('tr').find('#cedulaD').html();

        $('input[name="primerApellido"]').val(pk1);
        $('input[name="segundoApellido"]').val(pk2);
        $('input[name="nombres"]').val(pk3);
    })

    $('#botonEditar').click(function () {
        objIndex = usuariosJSON.usuarios.findIndex((obj => obj.numero_cc == pk4));
        usuariosJSON.usuarios[objIndex].Primer_Apellido = $('input[name="primerApellido"]').val();
        usuariosJSON.usuarios[objIndex].Segundo_Apellido = $('input[name="segundoApellido"]').val();
        usuariosJSON.usuarios[objIndex].Nombres = $('input[name="nombres"]').val();
        reloadData();
    })

    $(".inputData").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#botonEditar").click();
        }
    });



})


function startTime() {
    today = new Date();
    var me = today.getMonth() + 1;
    var mes = (me < 10) ? '0' + me : me;
    h = today.getHours();
    m = today.getMinutes();
    s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('reloj').innerHTML = "Hora: " + h + ":" + m + ":" + s + " <br>" + 'Fecha: ' + today.getDate() + '/' + mes + '/' + today.getYear();
    t = setTimeout('startTime()', 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
window.onload = function () {
    startTime();
}



document.write();

$('.cerrS').click(function(e){
    e.preventDefault();
    window.location.href=("../login/Login.html");

});
