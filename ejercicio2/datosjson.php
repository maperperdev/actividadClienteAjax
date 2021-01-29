 <?php
	header("Content-Type: application/json; charset=UTF-8");
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


	$campo = $_GET["campo"];
	$valor = 	$_GET["valor"];
	$servidor = "localhost";
	$basedatos = "ajax";
	$usuario = "ajax";
	$password = "dwec";

	$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
	mysqli_set_charset($conexion, "utf8");

	if ($conexion->connect_errno) {
		echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
	}	
	$sql = "select * from centros where " . $campo . " LIKE '$valor'";
	if ($resultado = $conexion->query($sql)) {
		$datos = array();

		while ($fila = $resultado->fetch_assoc()) {
			$datos[] = $fila;
		}
	}
	$resultado->free();
	echo json_encode($datos);
	$conexion->close();

	?>
