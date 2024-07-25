<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Citas extends MY_Controller {
        
    public function __construct() {
        parent::__construct();
    }

    public function index(){
        $data['tabTitle'] = "Kaanti - Citas";
        $data['pagecontent'] = "citas/citas";
        //$data['artistas'] = $this->Query_Model->ListaArtistasActivas();
        
        $this->loadpageintotemplate($data);
       
   }

   public function GuardaErrorDCiC(){

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

}
