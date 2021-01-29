 <?php
	header("Content-Type: application/json; charset=UTF-8");
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


	$nombreCentro = $_GET["nombreCentro"];
	$localidad = $_GET["localidad"];
	$provincia = $_GET["provincia"];
	$telefono = $_GET["telefono"];
	$fechaVisitas = $_GET["fechaVisitas"];
	$numVisitas = $_GET["numVisitas"];


	$servidor = "localhost";
	$basedatos = "ajax";
	$usuario = "ajax";
	$password = "dwec";

	$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
	mysqli_set_charset($conexion, "utf8");

	if ($conexion->connect_errno) {
		echo "Fallo al conectar a MySQL: " . $conexion->connect_errno . ") " . $conexion->connect_error;
	}
	$sql = "insert into centros (nombrecentro, localidad, provincia, telefono, fechavisita, numvisitantes) values ('$nombreCentro', '$localidad', '$provincia', '$telefono', '$fechaVisitas', '$numVisitas')";
	$conexion->query($sql);
	$conexion->close();


	$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
	$sql = "select * from centros order by nombrecentro";
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
