function ValidateUserLogin(){

    var user = $("#Usuario").val();
    var pass = $("#Password").val();

    $('#PreloaderLogin').show();
    $("#BotonLogin").attr('disabled',true);
    $("#BotonReset").attr('disabled',true);

    if (user != ""  && pass != "") {

        $.ajax({
            url:myBase_url+"index.php/Session/validatelogin",
            type:'POST',
            data:{user:user,pass:pass},
            async: true,
            timeout: 15000,
            success:function(datos){

                var obj = JSON.parse(datos); 
                var sp = obj.split("-");

                if(sp[0] == "OK"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonReset").attr('disabled',false);
                    window.location.href = myBase_url+"index.php/"+sp[1];
    
                }else if(obj == "UWOA"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonReset").attr('disabled',false);
                    swal("Error","Usuario sin acceso a la aplicacion","error");

                }else if(obj == "IUOP"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonReset").attr('disabled',false);
                    swal("Error","Usuario o contraseña incorrecta" ,"error");

                } else if(obj == "UWAS"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonReset").attr('disabled',false);
                    swal("Error","Usuario con sesion activa","error");
                }


            },error:function(status){

                var CodigoError = status.status;
                var DescripcionError = status.statusText;
                var Origen = "Login"
                GuardaErrorSession(CodigoError,DescripcionError,Origen);
            
                if (status.statusText=="timeout") {

                    swal({   
                        title: "Error",
                        text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                        type: "error",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "Cancelar",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){ 
                        $('#PreloaderLogin').hide();
                        $('#BotonLogin').removeAttr('disabled');
                        $("#BotonReset").removeAttr('disabled');       
                    }); 
                        
                }else if(status.statusText=="Not Found"){
        
                    $('#PreloaderLogin').hide();
                    $('#BotonLogin').removeAttr('disabled');
                    $("#BotonReset").removeAttr('disabled');
                    swal('Error',"La pagina que busca no existe" ,'error' );
        
                }else if(status.statusText=="Internal Server Error"){
        
                    $('#PreloaderLogin').hide();
                    $('#BotonLogin').removeAttr('disabled');
                    $("#BotonReset").removeAttr('disabled');
                    swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
        
                }else{
        
                    $('#PreloaderLogin').hide();
                    $('#BotonLogin').removeAttr('disabled');
                    $("#BotonReset").removeAttr('disabled');
                    swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                }
            }
        });
    
    }else{

        $('#PreloaderLogin').hide();
        $("#BotonLogin").attr('disabled',false);
        $("#BotonReset").attr('disabled',false);
        swal("Cuidado", "Aun quedan campos vacios", "warning")
    }

}

function ResetUserLogin(){

    var userreset = $("#Usuario").val();
    var passreset = $("#Password").val();

    $('#PreloaderLogin').show();
    $("#BotonLogin").attr('disabled',true);
    $("#BotonReset").attr('disabled',true);

    if (userreset != ""  && passreset != "") {

        $.ajax({
            url:myBase_url+"index.php/Session/ResetLogin",
            type:'POST',
            data:{userreset:userreset,passreset:passreset},
            async: true,
            timeout: 15000,
            success:function(datos){

                var response = JSON.parse(datos);

                if (response == "UWOA") {

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonReset").attr('disabled',false);
                    swal("Error","Usuario sin acceso a la aplicacion","error");
     
                }else if(response == "IUOP"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonReset").attr('disabled',false);
                    swal("Error","Usuario o contraseña incorrecta","error");
                    
                }else{

                    swal({   
                        title: "Exito",
                        text: "La sesion se ha reseteado exitosamente",   
                        type: "success",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "No, Cancel",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){   
                         
                        $('#PreloaderLogin').hide();
                        $("#BotonLogin").attr('disabled',false);
                        $("#BotonReset").attr('disabled',false);

                    });
                 }

            },
            error:function(status){

                var CodigoError = status.status;
                var DescripcionError = status.statusText;
                var Origen = "ResetLogin"
                GuardaErrorSession(CodigoError,DescripcionError,Origen);
            
                if (status.statusText=="timeout") {

                    swal({   
                        title: "Error",
                        text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                        type: "error",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "Cancelar",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){ 
                        $('#PreloaderLogin').hide();
                        $('#BotonLogin').removeAttr('disabled');
                        $("#BotonReset").removeAttr('disabled');       
                    });
                        
                }else if(status.statusText=="Not Found"){
        
                    $('#PreloaderLogin').hide();
                    $('#BotonLogin').removeAttr('disabled');
                    $("#BotonReset").removeAttr('disabled');
                    swal('Error',"La pagina que busca no existe" ,'error' );
        
                }else if(status.statusText=="Internal Server Error"){
        
                    $('#PreloaderLogin').hide();
                    $('#BotonLogin').removeAttr('disabled');
                    $("#BotonReset").removeAttr('disabled');
                    swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
        
                }else{
        
                    $('#PreloaderLogin').hide();
                    $('#BotonLogin').removeAttr('disabled');
                    $("#BotonReset").removeAttr('disabled');
                    swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                }
            }
        });
    
    }else{

        $('#PreloaderLogin').hide();
        $("#BotonLogin").attr('disabled',false);
        $("#BotonReset").attr('disabled',false);
        swal("Cuidado", "Aun hay campos vacios", "warning")
    }

}

function LogOut(){

    $.ajax({
        url:myBase_url+"index.php/Session/logout",
        type:'GET',
        async: true,
        success:function(datos){
            swal({   
                title: "Error",
                text: "La sesion expiro, porfavor ingrese de nuevo",   
                type: "error",   
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "Cancelar",   
                closeOnConfirm: false,   
                closeOnCancel: false 
            }, function(isConfirm){ 
                    location.href = myBase_url+"index.php/Session";       
            });     
        }
    });   
}


function CheckUActivo(){

    $.ajax({
        url:myBase_url+"index.php/Session/EstadoU",
        type:'GET',
        async: true,
        success:function(datos){
            var obj = JSON.parse(datos);

            if(obj != ""){
                console.log("Cuenta Activa");
            }else{
                $.ajax({
                    url:myBase_url+"index.php/Session/logout",
                    type:'GET',
                    async: true,
                    success:function(datos){
                        swal({   
                            title: "Error",
                            text: "Tu cuenta ha sido eliminada, para mas informacion contacte al administrado del sitio",   
                            type: "error",   
                            showCancelButton: false,   
                            confirmButtonColor: "#DD6B55",   
                            confirmButtonText: "OK",   
                            cancelButtonText: "Cancelar",   
                            closeOnConfirm: false,   
                            closeOnCancel: false 
                        }, function(isConfirm){ 
                                location.href = myBase_url+"index.php/Session";       
                        }); 
                    }
                });
            }  
        }
    });

} 


/* END - CONTROLLER: Session */

/* START - CONTROLLER: Dashboard */

function RellenaDatosDiaMes(fecha){

    $("#tablahorarios").empty();
    $("#tablahorariosreal").empty();

    var fecha = fecha;

    $("#custom-width-modal").modal();

    /*if(fecha!= ""){

        $.ajax({
            url:myBase_url+"index.php/Calendario/TotalCitas",
            type:'POST',
            data:{fecha:fecha},
            async: true,
            success:function(datos){

                var obj = JSON.parse(datos);

                var fechacompleta = "Detalles del dia : " + fecha;
                $("#custom-width-modalLabel").html(fechacompleta);

                if (obj.tentativo!="" || obj.real!="") {  

                    for (var i = 0; i < obj.tentativo.length; i++) {

                        var nombret = obj.tentativo[i].nombre_t;
                        var tpaterno = obj.tentativo[i].t_paterno;
                        var tmaterno = obj.tentativo[i].t_materno;
        
                        var nombrep = obj.tentativo[i].nombre_p;
                        var ppaterno = obj.tentativo[i].p_paterno;
                        var pmaterno = obj.tentativo[i].p_materno;

                        var hora = obj.tentativo[i].hora_sesion;

                        var nombrecompleto_t = nombret + ' ' + tpaterno + ' ' + tmaterno;
                        var nombrecompleto_p = nombrep + ' ' + ppaterno + ' ' + pmaterno; 
                        
                        $("#tablahorarios").append("<tr><td>"+nombrecompleto_t+"</td><td>"+nombrecompleto_p+"</td><td>"+hora+"</td></tr>");
                        

                    }

                    for (var i = 0; i < obj.real.length; i++) {

                        var nombret = obj.real[i].nombre_t;
                        var tpaterno = obj.real[i].t_paterno;
                        var tmaterno = obj.real[i].t_materno;
        
                        var nombrep = obj.real[i].nombre_p;
                        var ppaterno = obj.real[i].p_paterno;
                        var pmaterno = obj.real[i].p_materno;

                        var hora = obj.real[i].hora_sesion;

                        var nombrecompleto_t = nombret + ' ' + tpaterno + ' ' + tmaterno;
                        var nombrecompleto_p = nombrep + ' ' + ppaterno + ' ' + pmaterno; 
                        
                        $("#tablahorariosreal").append("<tr><td>"+nombrecompleto_t+"</td><td>"+nombrecompleto_p+"</td><td>"+hora+"</td></tr>");
                        

                    }

                    $("#custom-width-modal").modal();

                }else{

                    swal("Error","No existen datos para esta fecha","error");
                }

            },

            error:function(){
                swal("Error","Ha ocurrido un error intentelo de nuevo","error");
            }

        });

    }*/

}

/* END - CONTROLLER: Dashboard */

/* =============================================================================================================================================================================================================================== */

/* START - CONTROLLER: Citas */

function RellenaHorarioCitasFunciones(){
   
    var IdArtista = $("#Artista").val();
    var FechaIni = $("#FechaIni").val();
    var FechaFin = $("#FechaFin").val();
    $("#Id_A").val(IdArtista);

    $.ajax({
        url:myBase_url+"index.php/Citas/DatosArtista",
        type:'POST',
        data:{IdArtista:IdArtista},
        async: true,
        success:function(datos){

            
            var obj = JSON.parse(datos);

            if (obj!=""){

                $("#NArtista").empty();

                var nombre = obj[0].nombre;
                var apaterno = obj[0].apaterno;
                var amaterno = obj[0].amaterno;

                var nombrecompleto = nombre + " " + apaterno + " " + amaterno;

                $("#NArtista").val(nombrecompleto);  

            }

        },
        error:function(){
            swal("Error","Ha ocurrido un error intentelo de nuevo","error");
        }
    });

    if(IdArtista!="" && FechaIni!="" && FechaFin!="") {

        $.ajax({
            url:myBase_url+"index.php/Citas/Calendario",
            type:'POST',
            data:{IdArtista:IdArtista,FechaIni:FechaIni,FechaFin:FechaFin},
            async: true,
            success:function(datos){

                var obj = JSON.parse(datos);

                $("#Calendario").show();            

                if(obj!=""){

                    $("#l2").empty();
                    $("#l3").empty();
                    $("#l4").empty();
                    $("#l5").empty(); 
                    $("#l6").empty();
                    $("#l7").empty();
                    $("#l8").empty();
                    $("#l9").empty();
                    $("#l10").empty();
                    $("#l11").empty();
                    $("#l12").empty();
                    $("#l13").empty();

                    $("#ma2").empty();
                    $("#ma3").empty();
                    $("#ma4").empty();
                    $("#ma5").empty(); 
                    $("#ma6").empty();
                    $("#ma7").empty();
                    $("#ma8").empty();
                    $("#ma9").empty();
                    $("#ma10").empty();
                    $("#ma11").empty();
                    $("#ma12").empty();
                    $("#ma13").empty();

                    $("#mi2").empty();
                    $("#mi3").empty();
                    $("#mi4").empty();
                    $("#mi5").empty(); 
                    $("#mi6").empty();
                    $("#mi7").empty();
                    $("#mi8").empty();
                    $("#mi9").empty();
                    $("#mi10").empty();
                    $("#mi11").empty();
                    $("#mi12").empty();
                    $("#mi13").empty();

                    $("#j2").empty();
                    $("#j3").empty();
                    $("#j4").empty();
                    $("#j5").empty(); 
                    $("#j6").empty();
                    $("#j7").empty();
                    $("#j8").empty();
                    $("#j9").empty();
                    $("#j10").empty();
                    $("#j11").empty();
                    $("#j12").empty();
                    $("#j13").empty();

                    $("#v2").empty();
                    $("#v3").empty();
                    $("#v4").empty();
                    $("#v5").empty(); 
                    $("#v6").empty();
                    $("#v7").empty();
                    $("#v8").empty();
                    $("#v9").empty();
                    $("#v10").empty();
                    $("#v11").empty();
                    $("#v12").empty();
                    $("#v13").empty();

                    $("#s2").empty();
                    $("#s3").empty();
                    $("#s4").empty();
                    $("#s5").empty(); 
                    $("#s6").empty();
                    $("#s7").empty();
                    $("#s8").empty();
                    $("#s9").empty();
                    $("#s10").empty();
                    $("#s11").empty();
                    $("#s12").empty();
                    $("#s13").empty();

                    for (var i = 0; i < obj.length; i++) {

                        var id_horario = obj[i].id_c_muestra; 
                        var dias = obj[i].dia_sesion; 
                        var horas = obj[i].hora_sesion;
                        var nombre = obj[i].nombre_p;
                        var amaterno = obj[i].p_paterno;
                        var apaterno = obj[i].p_materno;

                        var nombrecompleto_p = nombre + ' ' + amaterno + ' ' + apaterno;

                        switch(dias){
                            case 'Lunes':
                                if (horas == '8a-9a') {
                                    $("#l2").html(nombrecompleto_p);
                                    $("#l2").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '9a-10a') {
                                    $("#l3").html(nombrecompleto_p);
                                    $("#l3").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '10a-11a') {
                                    $("#l4").html(nombrecompleto_p);
                                    $("#l4").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '11a-12p') {
                                    $("#l5").html(nombrecompleto_p);
                                    $("#l5").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '12p-1p') {
                                    $("#l6").html(nombrecompleto_p);
                                    $("#l6").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '1p-2p') {
                                    $("#l7").html(nombrecompleto_p);
                                    $("#l7").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '2p-3p') {
                                    $("#l8").html(nombrecompleto_p);
                                    $("#l8").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '3p-4p') {
                                    $("#l9").html(nombrecompleto_p);
                                    $("#l9").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '4p-5p') {
                                    $("#l10").html(nombrecompleto_p);
                                    $("#l10").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '5p-6p') {
                                    $("#l11").html(nombrecompleto_p);
                                    $("#l11").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '6p-7p') {
                                    $("#l12").html(nombrecompleto_p);
                                    $("#l12").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '7p-8p') {
                                    $("#l13").html(nombrecompleto_p);
                                    $("#l13").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                            break;
                            case 'Martes':
                                if (horas == '8a-9a') {
                                    $("#ma2").html(nombrecompleto_p);
                                    $("#ma2").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '9a-10a') {
                                    $("#ma3").html(nombrecompleto_p);
                                    $("#ma3").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '10a-11a') {
                                    $("#ma4").html(nombrecompleto_p);
                                    $("#ma4").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '11a-12p') {
                                    $("#ma5").html(nombrecompleto_p);
                                    $("#ma5").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '12p-1p') {
                                    $("#ma6").html(nombrecompleto_p);
                                    $("#ma6").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '1p-2p') {
                                    $("#ma7").html(nombrecompleto_p);
                                    $("#ma7").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '2p-3p') {
                                    $("#ma8").html(nombrecompleto_p);
                                    $("#ma8").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '3p-4p') {
                                    $("#ma9").html(nombrecompleto_p);
                                    $("#ma9").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '4p-5p') {
                                    $("#ma10").html(nombrecompleto_p);
                                    $("#ma10").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '5p-6p') {
                                    $("#ma11").html(nombrecompleto_p);
                                    $("#ma11").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '6p-7p') {
                                    $("#ma12").html(nombrecompleto_p);
                                    $("#ma12").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '7p-8p') {
                                    $("#ma13").html(nombrecompleto_p);
                                    $("#ma13").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }  
                            break;
                            case 'Miercoles':
                                if (horas == '7a-8a') {
                                    $("#mi1").html(nombrecompleto_p);
                                    $("#mi1").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '8a-9a') {
                                    $("#mi2").html(nombrecompleto_p);
                                    $("#mi2").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '9a-10a') {
                                    $("#mi3").html(nombrecompleto_p);
                                    $("#mi3").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '10a-11a') {
                                    $("#mi4").html(nombrecompleto_p);
                                    $("#m14").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '11a-12p') {
                                    $("#mi5").html(nombrecompleto_p);
                                    $("#mi5").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '12p-1p') {
                                    $("#mi6").html(nombrecompleto_p);
                                    $("#mi6").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '1p-2p') {
                                    $("#mi7").html(nombrecompleto_p);
                                    $("#mi7").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '2p-3p') {
                                    $("#mi8").html(nombrecompleto_p);
                                    $("#mi8").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '3p-4p') {
                                    $("#mi9").html(nombrecompleto_p);
                                    $("#mi9").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '4p-5p') {
                                    $("#mi10").html(nombrecompleto_p);
                                    $("#mi10").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '5p-6p') {
                                    $("#mi11").html(nombrecompleto_p);
                                    $("#mi11").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '6p-7p') {
                                    $("#mi12").html(nombrecompleto_p);
                                    $("#mi12").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '7p-8p') {
                                    $("#mi13").html(nombrecompleto_p);
                                    $("#mi13").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                            break;
                            case 'Jueves':
                                if (horas == '8a-9a') {
                                    $("#j2").html(nombrecompleto_p);
                                    $("#j2").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '9a-10a') {
                                    $("#j3").html(nombrecompleto_p);
                                    $("#j3").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '10a-11a') {
                                    $("#j4").html(nombrecompleto_p);
                                    $("#j4").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '11a-12p') {
                                    $("#j5").html(nombrecompleto_p);
                                    $("#j5").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '12p-1p') {
                                    $("#j6").html(nombrecompleto_p);
                                    $("#j6").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '1p-2p') {
                                    $("#j7").html(nombrecompleto_p);
                                    $("#j7").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '2p-3p') {
                                    $("#j8").html(nombrecompleto_p);
                                    $("#j8").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '3p-4p') {
                                    $("#j9").html(nombrecompleto_p);
                                    $("#j9").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '4p-5p') {
                                    $("#j10").html(nombrecompleto_p);
                                    $("#j10").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '5p-6p') {
                                    $("#j11").html(nombrecompleto_p);
                                    $("#j11").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '6p-7p') {
                                    $("#j12").html(nombrecompleto_p);
                                    $("#j12").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '7p-8p') {
                                    $("#j13").html(nombrecompleto_p);
                                    $("#j13").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                            break;
                            case 'Viernes':
                                if (horas == '8a-9a') {
                                    $("#v2").html(nombrecompleto_p);
                                    $("#v2").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '9a-10a') {
                                    $("#v3").html(nombrecompleto_p);
                                    $("#v3").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '10a-11a') {
                                    $("#v4").html(nombrecompleto_p);
                                    $("#v4").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '11a-12p') {
                                    $("#v5").html(nombrecompleto_p);
                                    $("#v5").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '12p-1p') {
                                    $("#v6").html(nombrecompleto_p);
                                    $("#v6").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '1p-2p') {
                                    $("#v7").html(nombrecompleto_p);
                                    $("#v7").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '2p-3p') {
                                    $("#v8").html(nombrecompleto_p);
                                    $("#v8").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '3p-4p') {
                                    $("#v9").html(nombrecompleto_p);
                                    $("#v9").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '4p-5p') {
                                    $("#v10").html(nombrecompleto_p);
                                    $("#v10").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '5p-6p') {
                                    $("#v11").html(nombrecompleto_p);
                                    $("#v11").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '6p-7p') {
                                    $("#v12").html(nombrecompleto_p);
                                    $("#v12").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '7p-8p') {
                                    $("#v13").html(nombrecompleto_p);
                                    $("#v13").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                            break;
                            case 'Sabado':
                                if (horas == '8a-9a') {
                                    $("#s2").html(nombrecompleto_p);
                                    $("#s2").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '9a-10a') {
                                    $("#s3").html(nombrecompleto_p);
                                    $("#s3").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '10a-11a') {
                                    $("#s4").html(nombrecompleto_p);
                                    $("#s4").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '11a-12p') {
                                    $("#s5").html(nombrecompleto_p);
                                    $("#s5").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '12p-1p') {
                                    $("#s6").html(nombrecompleto_p);
                                    $("#s6").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '1p-2p') {
                                    $("#s7").html(nombrecompleto_p);
                                    $("#s7").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '2p-3p') {
                                    $("#s8").html(nombrecompleto_p);
                                    $("#s8").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '3p-4p') {
                                    $("#s9").html(nombrecompleto_p);
                                    $("#s9").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '4p-5p') {
                                    $("#s10").html(nombrecompleto_p);
                                    $("#s10").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '5p-6p') {
                                    $("#s11").html(nombrecompleto_p);
                                    $("#s11").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '6p-7p') {
                                    $("#s12").html(nombrecompleto_po);
                                    $("#s12").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                                if (horas == '7p-8p') {
                                    $("#s13").html(nombrecompleto_p);
                                    $("#s13").append('<div align="right"><a href="#"" id="Editar" onclick="EditarHorario('+id_horario+')"><i class="fa fa-pencil"></i></a><a href="#" id="Borrar" onclick="BorrarHorario('+id_horario+')"><i class="md md-close"></i></a></div>');
                                }
                            break;
                        }
                    }
                }else{

                    $("#l1").empty();
                    $("#l2").empty();
                    $("#l3").empty();
                    $("#l4").empty();
                    $("#l5").empty(); 
                    $("#l6").empty();
                    $("#l7").empty();
                    $("#l8").empty();
                    $("#l9").empty();
                    $("#l10").empty();
                    $("#l11").empty();
                    $("#l12").empty();
                    $("#l13").empty();

                    $("#ma1").empty();
                    $("#ma2").empty();
                    $("#ma3").empty();
                    $("#ma4").empty();
                    $("#ma5").empty(); 
                    $("#ma6").empty();
                    $("#ma7").empty();
                    $("#ma8").empty();
                    $("#ma9").empty();
                    $("#ma10").empty();
                    $("#ma11").empty();
                    $("#ma12").empty();
                    $("#ma13").empty();

                    $("#mi1").empty();
                    $("#mi2").empty();
                    $("#mi3").empty();
                    $("#mi4").empty();
                    $("#mi5").empty(); 
                    $("#mi6").empty();
                    $("#mi7").empty();
                    $("#mi8").empty();
                    $("#mi9").empty();
                    $("#mi10").empty();
                    $("#mi11").empty();
                    $("#mi12").empty();
                    $("#mi13").empty();

                    $("#j1").empty();
                    $("#j2").empty();
                    $("#j3").empty();
                    $("#j4").empty();
                    $("#j5").empty(); 
                    $("#j6").empty();
                    $("#j7").empty();
                    $("#j8").empty();
                    $("#j9").empty();
                    $("#j10").empty();
                    $("#j11").empty();
                    $("#j12").empty();
                    $("#j13").empty();

                    $("#v1").empty();
                    $("#v2").empty();
                    $("#v3").empty();
                    $("#v4").empty();
                    $("#v5").empty(); 
                    $("#v6").empty();
                    $("#v7").empty();
                    $("#v8").empty();
                    $("#v9").empty();
                    $("#v10").empty();
                    $("#v11").empty();
                    $("#v12").empty();
                    $("#v13").empty();

                    $("#s1").empty();
                    $("#s2").empty();
                    $("#s3").empty();
                    $("#s4").empty();
                    $("#s5").empty(); 
                    $("#s6").empty();
                    $("#s7").empty();
                    $("#s8").empty();
                    $("#s9").empty();
                    $("#s10").empty();
                    $("#s11").empty();
                    $("#s12").empty();
                    $("#s13").empty();

                }           
            },
            error:function(){
                swal("Error","Ha ocurrido un error intentelo de nuevo","error");
                $("#Calendario").hide();
            }
        });
    }else{
        swal("Cuidado","Aun quedan campos vacios","warning");
    }
}

/* END - CONTROLLER: Citas */

/* =============================================================================================================================================================================================================================== */

/* START - CONTROLLER: Productos */

function VerificaContenidoProducto(){

    $("#PreloaderProducto").show();
    $("#BotonGuardaProducto").attr('disabled',true);

    var NombreProducto = $("#NombreProducto").val();
    var DescripcionProducto = $("#DescripcionProducto").val();
    var PrecioProducto = $("#PrecioProducto").val();
    var CategoriaProducto = $("#CategoriaProducto").val();

    if(NombreProducto!="" && DescripcionProducto!="" && PrecioProducto!="" && CategoriaProducto!=""){

       GuardaProductoS(); 

    }else{

        $('#PreloaderProducto').hide();
        $("#BotonGuardaProducto").attr('disabled',false);
        swal("Cuidado","Aun quedan campos vacios","warning");
    }
}

function GuardaProductoS(){

    var NombreProducto = $("#NombreProducto").val();
    var DescripcionProducto = $("#DescripcionProducto").val();
    var PrecioProducto = $("#PrecioProducto").val();
    var CategoriaProducto = $("#CategoriaProducto").val();

    $.ajax({
        url:myBase_url+"index.php/Productos/GuardaProductoC",
        type:"POST",
        data:{NombreProducto:NombreProducto,DescripcionProducto:DescripcionProducto,PrecioProducto:PrecioProducto,CategoriaProducto:CategoriaProducto},
        async:true,
        timeout: 15000,
        success:function(datos){

            var Cambio = "Guardar";
            var Origen = "Productos";
            var Contenido = NombreProducto;
            GuardaCambioProducto(Cambio,Origen,Contenido);

            $('#PreloaderProducto').hide();
            $("#BotonGuardaProducto").attr('disabled',false);

            swal({   
                title: "Exito",
                text: "El producto ha sido guardado exitosamente",   
                type: "success",   
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "Cancelar",   
                closeOnConfirm: false,   
                closeOnCancel: false 
            }, function(isConfirm){ 
                    location.href = "";       
            }); 

            
        },error:function(status){

            var CodigoError = status.status;
            var DescripcionError = status.statusText;
            var Origen = "GuardaProducto"
            GuardaErrorProducto(CodigoError,DescripcionError,Origen);
        
            if (status.statusText=="timeout") {

                swal({   
                    title: "Error",
                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                    type: "error",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                    $('#PreloaderProducto').hide();  
                    $("#BotonGuardaProducto").attr('disabled',false);    
                }); 

            }else if(status.statusText=="Not Found"){
    
                $('#PreloaderProducto').hide();
                $("#BotonGuardaProducto").attr('disabled',false);
                swal('Error',"La pagina que busca no existe" ,'error' );
    
            }else if(status.statusText=="Internal Server Error"){
    
                $('#PreloaderProducto').hide();
                $("#BotonGuardaProducto").attr('disabled',false);
                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
    
            }else{
    
                $('#PreloaderProducto').hide();
                $("#BotonGuardaProducto").attr('disabled',false);
                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
            }
        }

    });

}

function ConsultaDatosProductoS(IDProducto){

    $("#PreloaderProducto").show();
    $("#BotonGuardaProducto").attr('disabled',true);

    var IDProducto = IDProducto;

    if(IDProducto!=""){

        $.ajax({
            url:myBase_url+"index.php/Productos/ConsultaDatosProductoC",
            type:"POST",
            data:{IDProducto:IDProducto},
            async:true,
            success:function(datos){

                $('#PreloaderProducto').hide();
                $("#BotonGuardaProducto").attr('disabled',false);

                var Objeto = JSON.parse(datos);

                var ProductoID = Objeto[0].id_producto;
                var NombreProducto = Objeto[0].nombre;
                var DescripcionProducto = Objeto[0].descripcion;
                var ClaveProducto = Objeto[0].clave;
                var PrecioProducto = Objeto[0].precio;
                var CategoriaProducto = Objeto[0].categoria;
                var FechaRegistro = Objeto[0].fecha_registro;
                var UsuarioRegistro = Objeto[0].usuario_registro;
                var EstadoProducto = Objeto[0].estado;

                $("#IDOculto").val(ProductoID);
                $("#NombreProducto").val(NombreProducto);
                $("#DescripcionProducto").val(DescripcionProducto);
                $("#ClaveProducto").val(ClaveProducto);
                $("#PrecioProducto").val(PrecioProducto);
                $("#CategoriaProducto").val(CategoriaProducto);
                $("#FechaRegistro").val(FechaRegistro);
                $("#UsuarioRegistro").val(UsuarioRegistro);
                $("#EstadoProducto").val(EstadoProducto);

                $("#EstadoEscondido").show();
                $("#BotonGuardaProducto").hide();
                $("#BotonEditaProducto").show();

            },error:function(){

                $('#PreloaderProducto').hide();
                $("#BotonGuardaProducto").attr('disabled',false);
                swal("Error","Ha ocurrido un error interno del servidor, porfavor intentelo de nuevo","error");
            }

        });
    }
}

function EditaProductoS(){

    $('#PreloaderProducto').show();
    $("#BotonEditaProducto").attr('disabled',true);

    var IDProducto = $("#IDOculto").val();
    var NombreProducto = $("#NombreProducto").val();
    var DescripcionProducto = $("#DescripcionProducto").val();
    var ClaveProducto = $("#ClaveProducto").val();
    var PrecioProducto = $("#PrecioProducto").val();
    var CategoriaProducto = $("#CategoriaProducto").val();
    var FechaRegistro = $("#FechaRegistro").val();
    var UsuarioRegistro = $("#UsuarioRegistro").val();
    var EstadoProducto = $("#EstadoProducto").val();
        
    if(IDProducto != "" && NombreProducto!="" && DescripcionProducto!="" && ClaveProducto!="" && PrecioProducto != "" && CategoriaProducto != "" && FechaRegistro != "" && UsuarioRegistro != "" && EstadoProducto != ""){

        $.ajax({
            url:myBase_url+"index.php/Productos/EditaProductoC",
            type:"POST",
            data:{IDProducto:IDProducto,NombreProducto:NombreProducto,DescripcionProducto:DescripcionProducto,ClaveProducto:ClaveProducto,PrecioProducto:PrecioProducto,CategoriaProducto:CategoriaProducto,FechaRegistro:FechaRegistro,UsuarioRegistro:UsuarioRegistro,EstadoProducto:EstadoProducto},
            async:true,
            success:function(datos){

                var Cambio = "Editar";
                var Origen = "Productos";
                var Contenido = NombreProducto;
                GuardaCambioProducto(Cambio,Origen,Contenido);

                $('#PreloaderProducto').hide();
                $("#BotonEditaProducto").attr('disabled',false);

                swal({   
                    title: "Exito",
                    text: "El producto ha sido actualizado exitosamente",   
                    type: "success",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                        location.href = "";       
                }); 

                
            },error:function(status){

                var CodigoError = status.status;
                var DescripcionError = status.statusText;
                var Origen = "EditaProducto"
                GuardaErrorProducto(CodigoError,DescripcionError,Origen);
            
                if (status.statusText=="timeout") {

                    swal({   
                        title: "Error",
                        text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                        type: "error",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "Cancelar",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){ 
                        $('#PreloaderProducto').hide();
                        $('#BotonEditaProducto').removeAttr('disabled');       
                    });

                }else if(status.statusText=="Not Found"){
        
                    $('#PreloaderProducto').hide();
                    $('#BotonEditaProducto').removeAttr('disabled');
                    swal('Error',"La pagina que busca no existe" ,'error' );
        
                }else if(status.statusText=="Internal Server Error"){
        
                    $('#PreloaderProducto').hide();
                    $('#BotonEditaProducto').removeAttr('disabled');
                    swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
        
                }else{
        
                    $('#PreloaderProducto').hide();
                    $('#BotonEditaProducto').removeAttr('disabled');
                    swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                }
            }

        });

    }else{

        $('#PreloaderProducto').hide();
        $("#BotonEditaProducto").attr('disabled',false);
        swal("Cuidado","Aun hay campos vacios","warning");
    }    
    
}

function BorraProductoS(IDProducto){

    $('#PreloaderProducto').show();

    var Delay = 500;
    var IDProducto = IDProducto;

    if(IDProducto!=""){

        swal({   
            title: "Cuidado",
            text: "Estas seguro de borrar este producto?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "OK",   
            cancelButtonText: "Cancel",   
            closeOnConfirm: true,   
            closeOnCancel: true 
        }, function(isConfirm){ 

            if (isConfirm==true) {

                $.ajax({
                    url:myBase_url+"index.php/Productos/BorraProductoC",
                    type:"POST",
                    data:{IDProducto:IDProducto},
                    async:true,
                    success:function(datos){

                        $('#PreloaderProducto').hide();

                        var Objeto = JSON.parse(datos);
                        var ClaveProducto = Objeto;

                        var Cambio = "Borrar";
                        var Origen = "Productos";
                        var Contenido = ClaveProducto;
                        GuardaCambioProducto(Cambio,Origen,Contenido);

                        setTimeout(function() {

                            swal({   
                                title: "Exito",
                                text: "El producto ha sido borrado exitosamente",   
                                type: "success",   
                                showCancelButton: false,   
                                confirmButtonColor: "#DD6B55",   
                                confirmButtonText: "OK",   
                                cancelButtonText: "Cancel",   
                                closeOnConfirm: false,   
                                closeOnCancel: false 
                            }, function(isConfirm){ 
                                    location.href = "";       
                            });

                        }, Delay);
                        
                    },error:function(status){

                        var CodigoError = status.status;
                        var DescripcionError = status.statusText;
                        var Origen = "BorraProducto"
                        GuardaErrorProducto(CodigoError,DescripcionError,Origen);

                        setTimeout(function() {

                            if (status.statusText=="timeout") {

                                swal({   
                                    title: "Error",
                                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                                    type: "error",   
                                    showCancelButton: false,   
                                    confirmButtonColor: "#DD6B55",   
                                    confirmButtonText: "OK",   
                                    cancelButtonText: "Cancelar",   
                                    closeOnConfirm: true,   
                                    closeOnCancel: false 
                                }, function(isConfirm){ 
                                    $('#PreloaderProducto').hide();      
                                }); 
            
                            }else if(status.statusText=="Not Found"){
                    
                                $('#PreloaderProducto').hide();
                                swal('Error',"La pagina que busca no existe" ,'error' );
                    
                            }else if(status.statusText=="Internal Server Error"){
                    
                                $('#PreloaderProducto').hide();
                                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
                    
                            }else{
                    
                                $('#PreloaderProducto').hide();
                                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                            }

                        }, Delay);
                    }

                });
            }
                      
        });

        
    }

}


/* END - CONTROLLER: Productos */


/* START - CONTROLLER: Categorias */

function VerificaContenidoCategoria(){

    $("#PreloaderCategoria").show();
    $("#BotonGuardaCategoria").attr('disabled',true);

    var NombreCategoria = $("#NombreCategoria").val();
    var DescripcionCategoria = $("#DescripcionCategoria").val();

    if(NombreCategoria!="" && DescripcionCategoria!=""){

       GuardaCategoriaS(); 

    }else{

        $('#PreloaderCategoria').hide();
        $("#BotonGuardaCategoria").attr('disabled',false);
        swal("Cuidado","Aun quedan campos vacios","warning");
    }
}

function GuardaCategoriaS(){

    var NombreCategoria = $("#NombreCategoria").val();
    var DescripcionCategoria = $("#DescripcionCategoria").val();
 
    $.ajax({
        url:myBase_url+"index.php/Categorias/GuardaCategoriaC",
        type:"POST",
        data:{NombreCategoria:NombreCategoria,DescripcionCategoria:DescripcionCategoria},
        async:true,
        timeout: 15000,
        success:function(datos){

            var Cambio = "Guardar";
            var Origen = "Categorias";
            var Contenido = NombreCategoria;
            GuardaCambioCategoria(Cambio,Origen,Contenido);

            $('#PreloaderCategoria').hide();
            $("#BotonGuardaCategoria").attr('disabled',false);

            swal({   
                title: "Exito",
                text: "La categoria ha sido guardada exitosamente",   
                type: "success",   
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "Cancelar",   
                closeOnConfirm: false,   
                closeOnCancel: false 
            }, function(isConfirm){ 
                    location.href = "";       
            }); 

            
        },error:function(status){

            var CodigoError = status.status;
            var DescripcionError = status.statusText;
            var Origen = "GuardaCategoria"
            GuardaErrorCategoria(CodigoError,DescripcionError,Origen);
        
            if (status.statusText=="timeout") {

                swal({   
                    title: "Error",
                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                    type: "error",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                    $('#PreloaderCategoria').hide();  
                    $("#BotonGuardaCategoria").attr('disabled',false);    
                }); 

            }else if(status.statusText=="Not Found"){
    
                $('#PreloaderCategoria').hide();
                $("#BotonGuardaCategoria").attr('disabled',false);
                swal('Error',"La pagina que busca no existe" ,'error' );
    
            }else if(status.statusText=="Internal Server Error"){
    
                $('#PreloaderCategoria').hide();
                $("#BotonGuardaCategoria").attr('disabled',false);
                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
    
            }else{
    
                $('#PreloaderCategoria').hide();
                $("#BotonGuardaCategoria").attr('disabled',false);
                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
            }
        }

    });

}

function ConsultaDatosCategoriaS(IDCategoria){

    $("#PreloaderCategoria").show();
    $("#BotonGuardaCategoria").attr('disabled',true);

    var IDCategoria = IDCategoria;

    if(IDCategoria!=""){

        $.ajax({
            url:myBase_url+"index.php/Categorias/ConsultaDatosCategoriaC",
            type:"POST",
            data:{IDCategoria:IDCategoria},
            async:true,
            success:function(datos){

                $('#PreloaderCategoria').hide();
                $("#BotonGuardaCategoria").attr('disabled',false);

                var Objeto = JSON.parse(datos);

                var CategoriaID = Objeto[0].id_categoria;
                var NombreCategoria = Objeto[0].nombre;
                var DescripcionCategoria = Objeto[0].descripcion;
                var FechaRegistro = Objeto[0].fecha_registro;
                var UsuarioRegistro = Objeto[0].usuario_registro;
                var EstadoCategoria = Objeto[0].estado;

                $("#IDOculto").val(CategoriaID);
                $("#NombreCategoria").val(NombreCategoria);
                $("#DescripcionCategoria").val(DescripcionCategoria);
                $("#FechaRegistro").val(FechaRegistro);
                $("#UsuarioRegistro").val(UsuarioRegistro);
                $("#EstadoCategoria").val(EstadoCategoria);

                $("#EstadoEscondido").show();
                $("#BotonGuardaCategoria").hide();
                $("#BotonEditaCategoria").show();

            },error:function(){

                $('#PreloaderCategoria').hide();
                $("#BotonGuardaCategoria").attr('disabled',false);
                swal("Error","Ha ocurrido un error interno del servidor, porfavor intentelo de nuevo","error");
            }

        });
    }
}

function EditaCategoriaS(){

    $('#PreloaderCategoria').show();
    $("#BotonEditaCategoria").attr('disabled',true);

    var IDCategoria = $("#IDOculto").val();
    var NombreCategoria = $("#NombreCategoria").val();
    var DescripcionCategoria = $("#DescripcionCategoria").val();
    var FechaRegistro = $("#FechaRegistro").val();
    var UsuarioRegistro = $("#UsuarioRegistro").val();
    var EstadoCategoria = $("#EstadoCategoria").val();

    if(IDCategoria != "" && NombreCategoria!="" && DescripcionCategoria!="" && FechaRegistro != "" && UsuarioRegistro != "" && EstadoCategoria != ""){

        $.ajax({
            url:myBase_url+"index.php/Categorias/EditaCategoriaC",
            type:"POST",
            data:{IDCategoria:IDCategoria,NombreCategoria:NombreCategoria,DescripcionCategoria:DescripcionCategoria,FechaRegistro:FechaRegistro,UsuarioRegistro:UsuarioRegistro,EstadoCategoria:EstadoCategoria},
            async:true,
            success:function(datos){

                var Cambio = "Editar";
                var Origen = "Categorias";
                var Contenido = NombreCategoria;
                GuardaCambioCategoria(Cambio,Origen,Contenido);

                $('#PreloaderCategoria').hide();
                $("#BotonEditaCategoria").attr('disabled',false);

                swal({   
                    title: "Exito",
                    text: "La categoria ha sido actualizado exitosamente",   
                    type: "success",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                        location.href = "";       
                }); 

                
            },error:function(status){

                var CodigoError = status.status;
                var DescripcionError = status.statusText;
                var Origen = "EditaCategoria"
                GuardaErrorCategoria(CodigoError,DescripcionError,Origen);
            
                if (status.statusText=="timeout") {

                    swal({   
                        title: "Error",
                        text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                        type: "error",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "Cancelar",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){ 
                        $('#PreloaderCategoria').hide();
                        $('#BotonEditaCategoria').removeAttr('disabled');       
                    });

                }else if(status.statusText=="Not Found"){
        
                    $('#PreloaderCategoria').hide();
                    $('#BotonEditaCategoria').removeAttr('disabled');
                    swal('Error',"La pagina que busca no existe" ,'error' );
        
                }else if(status.statusText=="Internal Server Error"){
        
                    $('#PreloaderCategoria').hide();
                    $('#BotonEditaCategoria').removeAttr('disabled');
                    swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
        
                }else{
        
                    $('#PreloaderCategoria').hide();
                    $('#BotonEditaCategoria').removeAttr('disabled');
                    swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                }
            }

        });

    }else{

        $('#PreloaderCategoria').hide();
        $("#BotonEditaCategoria").attr('disabled',false);
        swal("Cuidado","Aun hay campos vacios","warning");
    }
    
}

function BorraCategoriaS(IDCategoria){

    $('#PreloaderCategoria').show();

    var Delay = 500;
    var IDCategoria = IDCategoria;

    if(IDCategoria!=""){

        swal({   
            title: "Cuidado",
            text: "Estas seguro de borrar esta categoria?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "OK",   
            cancelButtonText: "Cancel",   
            closeOnConfirm: true,   
            closeOnCancel: true 
        }, function(isConfirm){ 

            if (isConfirm==true) {

                $.ajax({
                    url:myBase_url+"index.php/Categorias/BorraCategoriaC",
                    type:"POST",
                    data:{IDCategoria:IDCategoria},
                    async:true,
                    success:function(datos){

                        $('#PreloaderCategoria').hide();

                        var Objeto = JSON.parse(datos);
                        var NombreCategoria = Objeto;

                        var Cambio = "Borrar";
                        var Origen = "Categorias";
                        var Contenido = NombreCategoria;
                        GuardaCambioCategoria(Cambio,Origen,Contenido);

                        setTimeout(function() {

                            swal({   
                                title: "Exito",
                                text: "La categoria ha sido borrado exitosamente",   
                                type: "success",   
                                showCancelButton: false,   
                                confirmButtonColor: "#DD6B55",   
                                confirmButtonText: "OK",   
                                cancelButtonText: "Cancel",   
                                closeOnConfirm: false,   
                                closeOnCancel: false 
                            }, function(isConfirm){ 
                                    location.href = "";       
                            });

                        }, Delay);
                        
                    },error:function(status){

                        var CodigoError = status.status;
                        var DescripcionError = status.statusText;
                        var Origen = "BorraCategoria"
                        GuardaErrorCategoria(CodigoError,DescripcionError,Origen);

                        setTimeout(function() {

                            if (status.statusText=="timeout") {

                                swal({   
                                    title: "Error",
                                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                                    type: "error",   
                                    showCancelButton: false,   
                                    confirmButtonColor: "#DD6B55",   
                                    confirmButtonText: "OK",   
                                    cancelButtonText: "Cancelar",   
                                    closeOnConfirm: true,   
                                    closeOnCancel: false 
                                }, function(isConfirm){ 
                                    $('#PreloaderCategoria').hide();      
                                }); 
            
                            }else if(status.statusText=="Not Found"){
                    
                                $('#PreloaderCategoria').hide();
                                swal('Error',"La pagina que busca no existe" ,'error' );
                    
                            }else if(status.statusText=="Internal Server Error"){
                    
                                $('#PreloaderCategoria').hide();
                                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
                    
                            }else{
                    
                                $('#PreloaderCategoria').hide();
                                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                            }

                        }, Delay);
                    }

                });
            }
                      
        });

    }

}


/* END - CONTROLLER: Categorias */

/* =============================================================================================================================================================================================================================== */

/* START - CONTROLLER: Reportes */


function Report1(){

    $('#PreloaderReport1').hide();
    $("#ButtonReport1").attr('disabled',false);

    var FromDate = $("#FromDate").val();
    var ToDate = $("#ToDate").val();

    if(FromDate!="" && ToDate !=""){

        $.ajax({
            url:myBase_url+"index.php/Report/SelectCompaniesFromDate",
            type:"POST",
            data:{FromDate:FromDate,ToDate:ToDate},
            async:true,
            success:function(datos){

                $('#PreloaderReport1').hide();
                $("#ButtonReport1").attr('disabled',false);

                var Object = JSON.parse(datos);
                var ObjLenght = Object.length;

                if(Object!=""){

                    //Funcion para llenar la tabla con datos resultantes de un query
                    function buildTableCompanies(datos, columns) {

                        var body = [];

                        body.push(columns);

                        datos.forEach(function(row) {
                            var dataRow = [];

                            columns.forEach(function(column) {
                                dataRow.push(row[column].toString());
                            })

                            body.push(dataRow);
                        });

                        return body;

                    }

                    //Funcion para construir y estilar la tabla en el formato requerido por PDFmake
                    function tablecompanies(datos, columns) {
                        return {
                            style: 'tablescompanies',
                            table: {
                                widths: ['auto','auto','auto'],
                                headerRows: 1,
                                body: buildTableCompanies(datos, columns)
                            }
                        };
                    } 


                    //Funcion para cambiar los nombres de los valores del JSON para imprimirlos en la tabla
                    var renamedobj = Object.map( item => { 
                        return {Company_Name: item.name,Category: item.category, Date: item.registration_date}; 
                    });

                    var docDefinition = {

                        //Inicio del contenido del PDF
                        content: [
                            {
                                text: 'Companies from: ' +FromDate+" to: "+ToDate, style:'header',alignment:'left'
                            },
                            { 
                                text: '\t\t\t\t\t\t\t\t\t\t\t\t', style: 'black',alignment:'center' 
                            },

                            { 
                                text: '\t\t\t\tCompany list', style: 'titles' 
                            },

                            { 
                                text: '\t\t\t\t\t\t\t\t\t\t\t\t', style: 'black',alignment:'center' 
                            },

                            { 
                                text: '\t\t\t\t\t\t\t\t\t\t\t\t', style: 'black',alignment:'center' 
                            },

                            tablecompanies(renamedobj, ['Company_Name','Category','Date']),

                            { 
                                text: '\t\t\t\t\t\t\t\t\t\t\t\t', style: 'black',alignment:'center' 
                            },

                            { 
                                text: '\t\t\t\t\t\t\t\t\t\t\t\t', style: 'black',alignment:'center' 
                            },


                            { 
                                text: '\t\t\t\tTotal Companies: ' +ObjLenght, style: 'black',alignment:'right' 
                            },

                        ], //Termina contenido del PDF

                        //Inician estilos del PDF
                        styles: {
                            header: {
                                fontSize: 16,
                                bold: true
                            },

                            titles: {
                                fontSize: 14,
                                bold: true,
                                decoration: 'underline',
                                alignment: 'center'
                            },

                            black:{
                                bold:true,
                                fontSize: 12
                            },
                            tablecompanies: {
                                margin: [5, 5, 0, 15],
                                fontSize: 12
                            },

                        },
                        //Terminan los estilos del PDF

                    };//Termina docDefinition

                    pdfMake.createPdf(docDefinition).download("Total companies from: "+FromDate+" to: "+ToDate); //Crea y descarga el PDF con el numero dela visita
                    //pdfMake.createPdf(docDefinition).open(); //Abre el PDF en el navegador 

                }else{

                    swal("Error","There is no info for the dates selected","error");
                }

                
            },error:function(){

                $('#PreloaderReport1').hide();
                $("#ButtonReport1").attr('disabled',false);
                swal("Error","An internal server error has ocurred","error");
            }

        });

    }else{

        $('#PreloaderReport1').hide();
        $("#ButtonReport1").attr('disabled',false);
        swal("Warning","Form incomplete","warning");

    }

    
}

/* END - CONTROLLER: Reportes */
/* =============================================================================================================================================================================================================================== */

/* START - CONTROLLER: Clientes */

function RevisaTelefonoCliente(){

    var Telefono = $("#TelefonoCliente").val();
    var LargoTelefono = Telefono.length;

    if (LargoTelefono<10 || LargoTelefono>10) {

        swal("Error","El telefono proporcionado es mas largo o corto que 10 digitos, porfavor intentelo de nuevo","error");
        $("#TelefonoCliente").val("");
    }
    
}

function RevisaCorreoCliente(){

    var CadenaValida = "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})";
    var Correo = $("#CorreoCliente").val();

     if (!Correo.match(CadenaValida)) {

        swal("Error","El correo proporcionado no es un correo electrónico válido, proporcione un correo válido.","error");
        $("#CorreoCliente").val("");

     }

}

function VerificaContenidoCliente(){

    $("#PreloaderCliente").show();
    $("#BotonGuardaCliente").attr('disabled',true);

    var NombreCliente = $("#NombreCliente").val();
    var ApPaternoCliente = $("#ApPaternoCliente").val();
    var ApMaternoCliente = $("#ApMaternoCliente").val();
    var TelefonoCliente = $("#TelefonoCliente").val();
    var CorreoCliente = $("#CorreoCliente").val();
    var FechaNCliente = $("#FechaNCliente").val();

    if(NombreCliente!="" && ApPaternoCliente!="" && ApMaternoCliente!="" && TelefonoCliente!="" && CorreoCliente!="" && FechaNCliente!=""){

        GuardaClienteS(); 
    }else{

        $('#PreloaderCliente').hide();
        $("#BotonGuardaCliente").attr('disabled',false);
        swal("Cuidado","Aun hay campos vacios","warning");
    }
}

function GuardaClienteS(){

    var NombreCliente = $("#NombreCliente").val();
    var ApPaternoCliente = $("#ApPaternoCliente").val();
    var ApMaternoCliente = $("#ApMaternoCliente").val();
    var TelefonoCliente = $("#TelefonoCliente").val();
    var CorreoCliente = $("#CorreoCliente").val();
    var FechaNCliente = $("#FechaNCliente").val();

    $.ajax({
        url:myBase_url+"index.php/Clientes/GuardaClienteC",
        type:"POST",
        data:{NombreCliente:NombreCliente,ApPaternoCliente:ApPaternoCliente,ApMaternoCliente:ApMaternoCliente,TelefonoCliente:TelefonoCliente,CorreoCliente:CorreoCliente,FechaNCliente:FechaNCliente},
        async:true,
        timeout: 15000,
        success:function(datos){

            var Cambio = "Guardar";
            var Origen = "Clientes";
            var Contenido = FechaNCliente;
            GuardaCambioCliente(Cambio,Origen,Contenido);

            $('#PreloaderCliente').hide();
            $("#BotonGuardaCliente").attr('disabled',false);

            swal({   
                title: "Exito",
                text: "El cliente ha sido guardado exitosamente",   
                type: "success",   
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "Cancelar",   
                closeOnConfirm: false,   
                closeOnCancel: false 
            }, function(isConfirm){ 
                    location.href = "";       
            }); 
 
        },error:function(status){

            var CodigoError = status.status;
            var DescripcionError = status.statusText;
            var Origen = "GuardaCliente"
            GuardaErrorCliente(CodigoError,DescripcionError,Origen);
        
            if (status.statusText=="timeout") {

                swal({   
                    title: "Error",
                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                    type: "error",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                    $('#PreloaderCliente').hide();
                    $('#BotonGuardaCliente').removeAttr('disabled');      
                });
                    
            }else if(status.statusText=="Not Found"){
    
                $('#PreloaderCliente').hide();
                $('#BotonGuardaCliente').removeAttr('disabled');
                swal('Error',"La pagina que busca no existe" ,'error' );
    
            }else if(status.statusText=="Internal Server Error"){
    
                $('#PreloaderCliente').hide();
                $('#BotonGuardaCliente').removeAttr('disabled');
                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
    
            }else{
    
                $('#PreloaderCliente').hide();
                $('#BotonGuardaCliente').removeAttr('disabled');
                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
            }
        }

    });

}

function ConsultaDatosClienteS(IDCliente){

    $("#PreloaderCliente").show();
    $("#BotonGuardaCliente").attr('disabled',true);

    var IDCliente = IDCliente;

    if(IDCliente!=""){

        $.ajax({
            url:myBase_url+"index.php/Clientes/ConsultaDatosClienteC",
            type:"POST",
            data:{IDCliente:IDCliente},
            async:true,
            success:function(datos){

                $('#PreloaderCliente').hide();
                $("#BotonGuardaCliente").attr('disabled',false);

                var Objeto = JSON.parse(datos);

                var ClienteID = Objeto[0].id_cliente;
                var NombreCliente = Objeto[0].nombre;
                var ApPaternoCliente = Objeto[0].apaterno;
                var ApMaternoCliente = Objeto[0].amaterno;
                var TelefonoCliente = Objeto[0].telefono;
                var CorreoCliente = Objeto[0].email;
                var FechaNCliente = Objeto[0].fecha_nacimiento;
                var FechaRegistro = Objeto[0].fecha_registro;
                var Codigo = Objeto[0].codigo;
                var EstadoCliente = Objeto[0].estado;

                $("#IDOculto").val(ClienteID);
                $("#NombreCliente").val(NombreCliente);
                $("#ApPaternoCliente").val(ApPaternoCliente);
                $("#ApMaternoCliente").val(ApMaternoCliente);
                $("#TelefonoCliente").val(TelefonoCliente);
                $("#CorreoCliente").val(CorreoCliente);
                $("#FechaNCliente").val(FechaNCliente);
                $("#FechaRegistro").val(FechaRegistro);
                $("#Codigo").val(Codigo);
                $("#EstadoCliente").val(EstadoCliente);

                $("#FechaNCliente").attr('disabled',true);
                $("#EstadoEscondido").show();
                $("#BotonGuardaCliente").hide();
                $("#BotonEditaCliente").show();

            },error:function(){

                $('#PreloaderCliente').hide();
                $("#BotonGuardaCliente").attr('disabled',false);
                swal("Error","Ha ocurrido un error interno del servidor, porfavor intentelo de nuevo","error");
            }

        });
    }
}

function EditaClienteS(){

    $('#PreloaderCliente').show();
    $("#BotonEditaCliente").attr('disabled',true);

    var IDCliente = $("#IDOculto").val();
    var NombreCliente = $("#NombreCliente").val();
    var ApPaternoCliente = $("#ApPaternoCliente").val();
    var ApMaternoCliente = $("#ApMaternoCliente").val();
    var TelefonoCliente = $("#TelefonoCliente").val();
    var CorreoCliente = $("#CorreoCliente").val();
    var FechaNCliente = $("#FechaNCliente").val();
    var FechaRegistro = $("#FechaRegistro").val();
    var Codigo = $("#Codigo").val();
    var EstadoCliente = $("#EstadoCliente").val();

    if(IDCliente != "" && NombreCliente!="" && ApPaternoCliente!="" && ApMaternoCliente!="" && TelefonoCliente!="" && CorreoCliente!="" && FechaNCliente!="" && FechaRegistro!="" && Codigo!="" && EstadoCliente != ""){

        $.ajax({
            url:myBase_url+"index.php/Clientes/EditaClienteC",
            type:"POST",
            data:{IDCliente:IDCliente,NombreCliente:NombreCliente,ApPaternoCliente:ApPaternoCliente,ApMaternoCliente:ApMaternoCliente,TelefonoCliente:TelefonoCliente,CorreoCliente:CorreoCliente,FechaNCliente:FechaNCliente,FechaRegistro:FechaRegistro,Codigo:Codigo,EstadoCliente:EstadoCliente},
            async:true,
            timeout: 15000,
            success:function(datos){

                var Cambio = "Editar";
                var Origen = "Clientes";
                var Contenido = FechaNCliente;
                GuardaCambioCliente(Cambio,Origen,Contenido);

                $('#PreloaderCliente').hide();
                $("#BotonEditaCliente").attr('disabled',false);

                swal({   
                    title: "Exito",
                    text: "El cliente ha sido actualizado exitosamente",   
                    type: "success",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                        location.href = "";       
                }); 

                
            },error:function(status){

                var CodigoError = status.status;
                var DescripcionError = status.statusText;
                var Origen = "EditaCliente"
                GuardaErrorCliente(CodigoError,DescripcionError,Origen);
            
                if (status.statusText=="timeout") {

                    swal({   
                        title: "Error",
                        text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                        type: "error",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "Cancelar",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){ 
                        $('#PreloaderCliente').hide();
                        $('#BotonEditaCliente').removeAttr('disabled');       
                    });

                }else if(status.statusText=="Not Found"){
        
                    $('#PreloaderCliente').hide();
                    $('#BotonEditaCliente').removeAttr('disabled');
                    swal('Error',"La pagina que busca no existe" ,'error' );
        
                }else if(status.statusText=="Internal Server Error"){
        
                    $('#PreloaderCliente').hide();
                    $('#BotonEditaCliente').removeAttr('disabled');
                    swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
        
                }else{
        
                    $('#PreloaderCliente').hide();
                    $('#BotonEditaCliente').removeAttr('disabled');
                    swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                }
            }

        });

    }else{

        $('#PreloaderCliente').hide();
        $("#BotonEditaCliente").attr('disabled',false);
        swal("Cuidado","Aun hay campos vacios","warning");
    }
}

function BorraClienteS(IDCliente){

    $('#PreloaderCliente').show();

    var Delay = 500;
    var IDCliente = IDCliente;

    if(IDCliente!=""){

        swal({   
            title: "Cuidado",
            text: "Esta seguro de borrar a este cliente??",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "OK",   
            cancelButtonText: "Cancel",   
            closeOnConfirm: true,   
            closeOnCancel: true 
        }, function(isConfirm){ 

            if (isConfirm==true) {

                $.ajax({
                    url:myBase_url+"index.php/Clientes/BorraClienteC",
                    type:"POST",
                    data:{IDCliente:IDCliente},
                    async:true,
                    timeout: 15000,
                    success:function(datos){

                        $('#PreloaderCliente').hide();

                        var Objeto = JSON.parse(datos);
                        var FechaNCliente = Objeto;

                        var Cambio = "Borrar";
                        var Origen = "Clientes";
                        var Contenido = FechaNCliente;
                        GuardaCambioCliente(Cambio,Origen,Contenido);

                        setTimeout(function() {

                            swal({   
                                title: "Exito",
                                text: "El cliente ha sido borrado exitosamente",   
                                type: "success",   
                                showCancelButton: false,   
                                confirmButtonColor: "#DD6B55",   
                                confirmButtonText: "OK",   
                                cancelButtonText: "Cancel",   
                                closeOnConfirm: false,   
                                closeOnCancel: false 
                            }, function(isConfirm){ 
                                    location.href = "";       
                            });

                        }, Delay);

                    },error:function(status){

                        var CodigoError = status.status;
                        var DescripcionError = status.statusText;
                        var Origen = "BorraCliente"
                        GuardaErrorCliente(CodigoError,DescripcionError,Origen);

                        setTimeout(function() {

                            if (status.statusText=="timeout") {

                                swal({   
                                    title: "Error",
                                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                                    type: "error",   
                                    showCancelButton: false,   
                                    confirmButtonColor: "#DD6B55",   
                                    confirmButtonText: "OK",   
                                    cancelButtonText: "Cancelar",   
                                    closeOnConfirm: true,   
                                    closeOnCancel: false 
                                }, function(isConfirm){ 
                                    $('#PreloaderCliente').hide();      
                                }); 
            
                            }else if(status.statusText=="Not Found"){
                    
                                $('#PreloaderCliente').hide();
                                swal('Error',"La pagina que busca no existe" ,'error' );
                    
                            }else if(status.statusText=="Internal Server Error"){
                    
                                $('#PreloaderCliente').hide();
                                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
                    
                            }else{
                    
                                $('#PreloaderCliente').hide();
                                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                            }

                        }, Delay);
                        
                    }

                });
            }
                      
        });
  
    }

}

/* END - CONTROLLER: Clientes */

/* START - CONTROLLER: Usuarios */

function RevisaTelefonoUsuario(){

    var Telefono = $("#TelefonoUsuario").val();
    var LargoTelefono = Telefono.length;

    if (LargoTelefono<10 || LargoTelefono>10) {

        swal("Error","El telefono proporcionado es mas largo o corto que 10 digitos, porfavor intentelo de nuevo","error");
        $("#TelefonoUsuario").val("");
    }
    
}

function RevisaCorreoUsuario(){

    var CadenaValida = "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})";
    var Correo = $("#CorreoUsuario").val();

     if (!Correo.match(CadenaValida)) {

        swal("Error","El correo proporcionado no es un correo electrónico válido, proporcione un correo válido.","error");
        $("#CorreoUsuario").val("");

     }

}

function RevisaUsuarioExistenteS(){

    var NombreUsuario = $("#NUsuario").val();

    if(NombreUsuario!=""){

        $.ajax({
            url:myBase_url+"index.php/Usuarios/RevisaUsuarioExistenteC",
            type:"POST",
            data:{NombreUsuario:NombreUsuario},
            async:true,
            success:function(datos){

                var Objeto = JSON.parse(datos);

                if(Objeto!=""){

                    swal("Error","El nombre de usuario ya esta en uso, porfavor intente con uno nuevo","error");
                    $("#NUsuario").val("");
                }


            },error:function(){

                swal("Error","Ha ocurrido un error interno del servidor, porfavor intentelo de nuevo","error");
            }

        });
    }

}

function VerificaContenidoUsuario(){

    $("#PreloaderUsuario").show();
    $("#BotonGuardaUsuario").attr('disabled',true);

    var NombreUsuario = $("#NombreUsuario").val();
    var ApPaternoUsuario = $("#ApPaternoUsuario").val();
    var ApMaternoUsuario = $("#ApMaternoUsuario").val();
    var TelefonoUsuario = $("#TelefonoUsuario").val();
    var CorreoUsuario = $("#CorreoUsuario").val();
    var NUsuario = $("#NUsuario").val();
    var PasswordUsuario = $("#PasswordUsuario").val();
    var RolUsuario = $("#RolUsuario").val();

    if(NombreUsuario!="" && ApPaternoUsuario!="" && ApMaternoUsuario!="" && TelefonoUsuario!="" && CorreoUsuario!="" && NUsuario!="" && PasswordUsuario!="" && RolUsuario!=""){

        GuardaUsuarioS(); 
    }else{

        $('#PreloaderUsuario').hide();
        $("#BotonGuardaUsuario").attr('disabled',false);
        swal("Cuidado","Aun hay campos vacios","warning");
    }
}

function GuardaUsuarioS(){

    var NombreUsuario = $("#NombreUsuario").val();
    var ApPaternoUsuario = $("#ApPaternoUsuario").val();
    var ApMaternoUsuario = $("#ApMaternoUsuario").val();
    var TelefonoUsuario = $("#TelefonoUsuario").val();
    var CorreoUsuario = $("#CorreoUsuario").val();
    var NUsuario = $("#NUsuario").val();
    var PasswordUsuario = $("#PasswordUsuario").val();
    var RolUsuario = $("#RolUsuario").val();

    $.ajax({
        url:myBase_url+"index.php/Usuarios/GuardaUsuarioC",
        type:"POST",
        data:{NombreUsuario:NombreUsuario,ApPaternoUsuario:ApPaternoUsuario,ApMaternoUsuario:ApMaternoUsuario,TelefonoUsuario:TelefonoUsuario,CorreoUsuario:CorreoUsuario,NUsuario:NUsuario,PasswordUsuario:PasswordUsuario,RolUsuario:RolUsuario},
        async:true,
        timeout: 15000,
        success:function(datos){

            var Cambio = "Guardar";
            var Origen = "Usuarios";
            var Contenido = NUsuario;
            GuardaCambioUsuario(Cambio,Origen,Contenido);

            $('#PreloaderUsuario').hide();
            $("#BotonGuardaUsuario").attr('disabled',false);

            swal({   
                title: "Exito",
                text: "El usuario ha sido guardado exitosamente",   
                type: "success",   
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "Cancelar",   
                closeOnConfirm: false,   
                closeOnCancel: false 
            }, function(isConfirm){ 
                    location.href = "";       
            }); 
 
        },error:function(status){

            var CodigoError = status.status;
            var DescripcionError = status.statusText;
            var Origen = "GuardaUsuario"
            GuardaErrorUsuario(CodigoError,DescripcionError,Origen);
        
            if (status.statusText=="timeout") {

                swal({   
                    title: "Error",
                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                    type: "error",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                    $('#PreloaderUsuario').hide();
                    $('#BotonGuardaUsuario').removeAttr('disabled');      
                });
                    
            }else if(status.statusText=="Not Found"){
    
                $('#PreloaderUsuario').hide();
                $('#BotonGuardaUsuario').removeAttr('disabled');
                swal('Error',"La pagina que busca no existe" ,'error' );
    
            }else if(status.statusText=="Internal Server Error"){
    
                $('#PreloaderUsuario').hide();
                $('#BotonGuardaUsuario').removeAttr('disabled');
                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
    
            }else{
    
                $('#PreloaderUsuario').hide();
                $('#BotonGuardaUsuario').removeAttr('disabled');
                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
            }
        }

    });

}

function ConsultaDatosUsuarioS(IDUsuario){

    $("#PreloaderUsuario").show();
    $("#BotonGuardaUsuario").attr('disabled',true);

    var IDUsuario = IDUsuario;

    if(IDUsuario!=""){

        $.ajax({
            url:myBase_url+"index.php/Usuarios/ConsultaDatosUsuarioC",
            type:"POST",
            data:{IDUsuario:IDUsuario},
            async:true,
            success:function(datos){

                $('#PreloaderUsuario').hide();
                $("#BotonGuardaUsuario").attr('disabled',false);

                var Objeto = JSON.parse(datos);

                var UsuarioID = Objeto[0].id_usuario;
                var NombreUsuario = Objeto[0].nombre;
                var ApPaternoUsuario = Objeto[0].amaterno;
                var ApMaternoUsuario = Objeto[0].apaterno;
                var TelefonoUsuario = Objeto[0].telefono;
                var CorreoUsuario = Objeto[0].email;
                var NUsuario = Objeto[0].username;
                var PasswordUsuario = Objeto[0].password;
                var RolUsuario = Objeto[0].rol;
                var EstadoUsuario = Objeto[0].estado;

                $("#IDOculto").val(UsuarioID);
                $("#NombreUsuario").val(NombreUsuario);
                $("#ApPaternoUsuario").val(ApPaternoUsuario);
                $("#ApMaternoUsuario").val(ApMaternoUsuario);
                $("#TelefonoUsuario").val(TelefonoUsuario);
                $("#CorreoUsuario").val(CorreoUsuario);
                $("#NUsuario").val(NUsuario);
                $("#PasswordUsuario").val(PasswordUsuario);
                $("#RolUsuario").val(RolUsuario);
                $("#EstadoUsuario").val(EstadoUsuario);

                $("#NUsuario").attr('disabled',true);
                $("#EstadoEscondido").show();
                $("#BotonGuardaUsuario").hide();
                $("#BotonEditaUsuario").show();

            },error:function(){

                $('#PreloaderUsuario').hide();
                $("#BotonGuardaUsuario").attr('disabled',false);
                swal("Error","Ha ocurrido un error interno del servidor, porfavor intentelo de nuevo","error");
            }

        });
    }
}

function EditaUsuarioS(){

    $('#PreloaderUsuario').show();
    $("#BotonEditaUsuario").attr('disabled',true);

    var IDUsuario = $("#IDOculto").val();
    var NombreUsuario = $("#NombreUsuario").val();
    var ApPaternoUsuario = $("#ApPaternoUsuario").val();
    var ApMaternoUsuario = $("#ApMaternoUsuario").val();
    var TelefonoUsuario = $("#TelefonoUsuario").val();
    var CorreoUsuario = $("#CorreoUsuario").val();
    var NUsuario = $("#NUsuario").val();
    var PasswordUsuario = $("#PasswordUsuario").val();
    var RolUsuario = $("#RolUsuario").val();
    var EstadoUsuario = $("#EstadoUsuario").val();

    if(IDUsuario != "" && NombreUsuario!="" && ApPaternoUsuario!="" && ApMaternoUsuario!="" && TelefonoUsuario!="" && CorreoUsuario!="" && NUsuario!="" && PasswordUsuario!=""  && RolUsuario!="" && EstadoUsuario != ""){

        $.ajax({
            url:myBase_url+"index.php/Usuarios/EditaUsuarioC",
            type:"POST",
            data:{IDUsuario:IDUsuario,NombreUsuario:NombreUsuario,ApPaternoUsuario:ApPaternoUsuario,ApMaternoUsuario:ApMaternoUsuario,TelefonoUsuario:TelefonoUsuario,CorreoUsuario:CorreoUsuario,NUsuario:NUsuario,PasswordUsuario:PasswordUsuario,RolUsuario:RolUsuario,EstadoUsuario:EstadoUsuario},
            async:true,
            timeout: 15000,
            success:function(datos){

                var Cambio = "Editar";
                var Origen = "Usuarios";
                var Contenido = NUsuario;
                GuardaCambioUsuario(Cambio,Origen,Contenido);

                $('#PreloaderUsuario').hide();
                $("#BotonEditaUsuario").attr('disabled',false);

                swal({   
                    title: "Exito",
                    text: "El usuario ha sido actualizado exitosamente",   
                    type: "success",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                        location.href = "";       
                }); 

                
            },error:function(status){

                var CodigoError = status.status;
                var DescripcionError = status.statusText;
                var Origen = "EditaUsuario"
                GuardaErrorUsuario(CodigoError,DescripcionError,Origen);
            
                if (status.statusText=="timeout") {

                    swal({   
                        title: "Error",
                        text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                        type: "error",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "Cancelar",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){ 
                        $('#PreloaderUsuario').hide();
                        $('#BotonEditaUsuario').removeAttr('disabled');       
                    });

                }else if(status.statusText=="Not Found"){
        
                    $('#PreloaderUsuario').hide();
                    $('#BotonEditaUsuario').removeAttr('disabled');
                    swal('Error',"La pagina que busca no existe" ,'error' );
        
                }else if(status.statusText=="Internal Server Error"){
        
                    $('#PreloaderUsuario').hide();
                    $('#BotonEditaUsuario').removeAttr('disabled');
                    swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
        
                }else{
        
                    $('#PreloaderUsuario').hide();
                    $('#BotonEditaUsuario').removeAttr('disabled');
                    swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                }
            }

        });

    }else{

        $('#PreloaderUsuario').hide();
        $("#BotonEditaUsuario").attr('disabled',false);
        swal("Cuidado","Aun hay campos vacios","warning");
    }
}

function BorraUsuarioS(IDUsuario){

    $('#PreloaderUsuario').show();

    var Delay = 500;
    var IDUsuario = IDUsuario;

    if(IDUsuario!=""){

        swal({   
            title: "Cuidado",
            text: "Esta seguro de borrar a este usuario??",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "OK",   
            cancelButtonText: "Cancel",   
            closeOnConfirm: true,   
            closeOnCancel: true 
        }, function(isConfirm){ 

            if (isConfirm==true) {

                $.ajax({
                    url:myBase_url+"index.php/Usuarios/BorraUsuarioC",
                    type:"POST",
                    data:{IDUsuario:IDUsuario},
                    async:true,
                    timeout: 15000,
                    success:function(datos){

                        $('#PreloaderUsuario').hide();

                        var Objeto = JSON.parse(datos);
                        var NUsuario = Objeto;

                        var Cambio = "Borrar";
                        var Origen = "Usuarios";
                        var Contenido = NUsuario;
                        GuardaCambioUsuario(Cambio,Origen,Contenido);

                        setTimeout(function() {

                            swal({   
                                title: "Exito",
                                text: "El usuario ha sido borrado exitosamente",   
                                type: "success",   
                                showCancelButton: false,   
                                confirmButtonColor: "#DD6B55",   
                                confirmButtonText: "OK",   
                                cancelButtonText: "Cancel",   
                                closeOnConfirm: false,   
                                closeOnCancel: false 
                            }, function(isConfirm){ 
                                    location.href = "";       
                            });

                        }, Delay);

                    },error:function(status){

                        var CodigoError = status.status;
                        var DescripcionError = status.statusText;
                        var Origen = "BorraUsuario"
                        GuardaErrorUsuario(CodigoError,DescripcionError,Origen);

                        setTimeout(function() {

                            if (status.statusText=="timeout") {

                                swal({   
                                    title: "Error",
                                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                                    type: "error",   
                                    showCancelButton: false,   
                                    confirmButtonColor: "#DD6B55",   
                                    confirmButtonText: "OK",   
                                    cancelButtonText: "Cancelar",   
                                    closeOnConfirm: true,   
                                    closeOnCancel: false 
                                }, function(isConfirm){ 
                                    $('#PreloaderUsuario').hide();      
                                }); 
            
                            }else if(status.statusText=="Not Found"){
                    
                                $('#PreloaderUsuario').hide();
                                swal('Error',"La pagina que busca no existe" ,'error' );
                    
                            }else if(status.statusText=="Internal Server Error"){
                    
                                $('#PreloaderUsuario').hide();
                                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
                    
                            }else{
                    
                                $('#PreloaderUsuario').hide();
                                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                            }

                        }, Delay);
                        
                    }

                });
            }
                      
        });
  
    }

}

/* END - CONTROLLER: Usuarios */

/* START: ErrorLog/ChangeLog */

function GuardaErrorSession(CodigoError,DescripcionError,Origen){

    $.ajax({
        url:myBase_url+"index.php/Session/GuardaErrorSC",
        type:'POST',
        data:{CodigoError:CodigoError,DescripcionError:DescripcionError,Origen:Origen},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaCambioUsuario(Cambio,Origen,Contenido){

    $.ajax({
        url:myBase_url+"index.php/Usuarios/GuardaCambioUC",
        type:'POST',
        data:{Cambio:Cambio,Origen:Origen,Contenido:Contenido},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaErrorUsuario(CodigoError,DescripcionError,Origen){

    $.ajax({
        url:myBase_url+"index.php/Usuarios/GuardaErrorUC",
        type:'POST',
        data:{CodigoError:CodigoError,DescripcionError:DescripcionError,Origen:Origen},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaCambioProducto(Cambio,Origen,Contenido){

    $.ajax({
        url:myBase_url+"index.php/Productos/GuardaCambioPC",
        type:'POST',
        data:{Cambio:Cambio,Origen:Origen,Contenido:Contenido},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaErrorProducto(CodigoError,DescripcionError,Origen){

    $.ajax({
        url:myBase_url+"index.php/Productos/GuardaErrorPC",
        type:'POST',
        data:{CodigoError:CodigoError,DescripcionError:DescripcionError,Origen:Origen},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaCambioCategoria(Cambio,Origen,Contenido){

    $.ajax({
        url:myBase_url+"index.php/Categorias/GuardaCambioCC",
        type:'POST',
        data:{Cambio:Cambio,Origen:Origen,Contenido:Contenido},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaErrorCategoria(CodigoError,DescripcionError,Origen){

    $.ajax({
        url:myBase_url+"index.php/Categorias/GuardaErrorCC",
        type:'POST',
        data:{CodigoError:CodigoError,DescripcionError:DescripcionError,Origen:Origen},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaCambioCliente(Cambio,Origen,Contenido){

    $.ajax({
        url:myBase_url+"index.php/Clientes/GuardaCambioCliC",
        type:'POST',
        data:{Cambio:Cambio,Origen:Origen,Contenido:Contenido},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaErrorCliente(CodigoError,DescripcionError,Origen){

    $.ajax({
        url:myBase_url+"index.php/Clientes/GuardaErrorCliC",
        type:'POST',
        data:{CodigoError:CodigoError,DescripcionError:DescripcionError,Origen:Origen},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

/* END: ErrorLog/ChangeLog */
