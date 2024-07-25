<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Productos extends MY_Controller {
        
    public function __construct() {
        parent::__construct();
    }

    public function index(){
        $data['tabTitle'] = "Kaanti - Productos";
        $data['pagecontent'] = "productos/productos";
        $data['productos'] = $this->Query_Model->ListaProductos();
        $data['categorias'] = $this->Query_Model->ListaCategoriasActivas();
        
        $this->loadpageintotemplate($data);
       
   }

    function GuardaCambioPC(){

        $Cambio = $this->input->post("Cambio");
        $Origen = $this->input->post("Origen");
        $Contenido = $this->input->post("Contenido");
        $Usuario = $this->session->userdata('user');
        date_default_timezone_set('America/Mexico_City');
        $FechaHoraActual = date('Y-m-d H:i:s');
    
        $DatosCambio = array(
            'cambio' => $Cambio, 
            'origen' => $Origen, 
            'contenido' => $Contenido,
            'usuario' => $Usuario,
            'fecha_cambio' => $FechaHoraActual,
        );
    
        $this->Query_Model->InsertaCambio($DatosCambio);
   }

    function GuardaErrorPC(){

        $CodigoError = $this->input->post("CodigoError");
        $DescripcionError = $this->input->post("DescripcionError");
        $Origen = $this->input->post("Origen");
        $Usuario = $this->session->userdata('user');
        date_default_timezone_set('America/Mexico_City');
        $FechaHoraActual = date('Y-m-d H:i:s');

        $DatosError = array(
            'codigo' => $CodigoError, 
            'descripcion' => $DescripcionError, 
            'origen' => $Origen, 
            'usuario' => $Usuario,
            'fecha_error' => $FechaHoraActual,
        );

        $this->Query_Model->InsertaError($DatosError);
    }

    public function GuardaProductoC(){

        $NombreProducto = $this->input->post("NombreProducto");
        $DescripcionProducto = $this->input->post("DescripcionProducto");
        $ClaveProducto = uniqid();
        $PrecioProducto = $this->input->post("PrecioProducto");
        $CategoriaProducto = $this->input->post("CategoriaProducto");
        date_default_timezone_set('America/Mexico_City');
        $FechaHoraActual = date('Y-m-d H:i:s');
        $Usuario = $this->session->userdata('user');
    
        $DatosProducto = array(
            'nombre' => $NombreProducto, 
            'descripcion' => $DescripcionProducto, 
            'clave' => $ClaveProducto, 
            'precio' => $PrecioProducto, 
            'categoria' => $CategoriaProducto, 
            'fecha_registro' => $FechaHoraActual, 
            'usuario_registro' => $Usuario, 
            'estado' => '1'
        );

        $this->Query_Model->InsertaProducto($DatosProducto);

   }

    public function ConsultaDatosProductoC(){

        $IDProducto = $this->input->post("IDProducto");
        $Resultado = $this->Query_Model->SeleccionaProductoPorID($IDProducto);
        echo json_encode($Resultado);
   }

    public function EditaProductoC(){

        $IDProducto = $this->input->post("IDProducto");
        $NombreProducto = $this->input->post("NombreProducto");
        $DescripcionProducto = $this->input->post("DescripcionProducto");
        $ClaveProducto = $this->input->post("ClaveProducto");
        $PrecioProducto = $this->input->post("PrecioProducto");
        $CategoriaProducto = $this->input->post("CategoriaProducto");
        $FechaHoraActual = $this->input->post("FechaRegistro");
        $Usuario = $this->input->post("UsuarioRegistro");
        $EstadoProducto = $this->input->post("EstadoProducto");

        $DatosProducto = array(
            'nombre' => $NombreProducto, 
            'descripcion' => $DescripcionProducto, 
            'clave' => $ClaveProducto, 
            'precio' => $PrecioProducto, 
            'categoria' => $CategoriaProducto, 
            'fecha_registro' => $FechaHoraActual, 
            'usuario_registro' => $Usuario, 
            'estado' => $EstadoProducto
        );

        $this->Query_Model->ActualizaProducto($DatosProducto,$IDProducto);
       
   }

    public function BorraProductoC(){

        $IDProducto = $this->input->post("IDProducto");
        $this->Query_Model->BorraProductoBD($IDProducto);
        $Resultado = $this->Query_Model->SeleccionaProductoPorID($IDProducto);
        $ClaveProducto = $Resultado[0] -> clave;
        echo json_encode($ClaveProducto);
   }

}
