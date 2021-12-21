var container; 
var camera, scene, renderer, light;
var dax=0.002;

var audio = new Audio('audio/09 Mysterious Mine Theme.mp3');

var light, AmbientLight, Pointlight;

const d_x = 0;	
const d_y = 0;						
const d_z = -20;
var coords = [d_x, d_y, d_z];

var indice2 = false;
var indice3 = false;

const F_HAUT = 38
const F_BAS = 40
const F_GAUCHE = 37
const F_DROITE = 39

var horizontal = true;
var turnSpeed = Math.PI * 0.03
;

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function Init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 2000 );

	camera.rotation.x=1.5;
	camera.rotation.y=9.4;
	camera.rotation.z=0;

	camera.position.x=d_x;
	camera.position.y= d_y;
	camera.position.z=d_z;

	//audio
	audio.play();
	audio.addEventListener('ended',function(){
		audio.src = "audio/09 Mysterious Mine Theme.mp3";
		audio.pause();
		audio.load();
		audio.play();
	});
	
	// scene
	scene = new THREE.Scene();

	//ambient light
	AmbientLight = new THREE.AmbientLight(0x0000ff, 0.2);
	scene.add( AmbientLight );

	Pointlight = new THREE.PointLight(0xffffff, 18, 18);
	Pointlight.position.set(-3,6,-3);
	Pointlight.castShadow = true;
	scene.add(Pointlight);

	// texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};

	var texture = new THREE.Texture();

	var loader = new THREE.ImageLoader( manager );
	loader.load( 'TranseptSud/TranseptTexture4096.jpg', function ( image ) {
		texture.image = image;
		texture.needsUpdate = true;
	} );

	// Chargement du modèle
	var loader = new THREE.OBJLoader( manager );
	loader.load( 'TranseptSud/transeptSudBox.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = texture;
			}
		} );
		scene.add( object );
	} );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	//DEBUT JEU
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	var debut = "Début du jeu: déplacez-vous...";

	context.font = "bold " + canvas.height / 2 + "px serif";
	canvas.width = context.measureText(debut).width;
	canvas.height = 300;
	context.font = "bold " + canvas.height / 4 + "px serif";
	context.fillStyle = "#F1F1F1";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(
	debut,
	canvas.width / 2,
	canvas.height / 2
	);
	var texture_canvas = new THREE.Texture(canvas);
	texture_canvas.needsUpdate = true;

	plane = constructeurPlane(11, 0xffffff, texture_canvas);
	scene.add(plane);

	var textureLoader = new THREE.TextureLoader();
	

	// CUBE
	var geometry = new THREE.CubeGeometry(1,1,1);
	var material = new THREE.MeshPhongMaterial( {
		ambient: 0xffffff,
		color: 0xffffff
	})

	
	mesh = new THREE.Mesh(
		geometry,
		material
	);
	scene.add(mesh);
	mesh.position.set(0, 5, -20);
	mesh.receiveShadow = true;
	mesh.castShadow = true;

}

function rotationCube(){
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
}

function Afficher() {

	renderer.render(scene,camera);
}

function Animer() {
	requestAnimationFrame(Animer);
	rotationCube();
	Afficher();
}

function limiteDeplacement(limite, event) {
	if (limite.position.x - 0.05 < -5) limite.position.x += 0.10;
	if (limite.position.x + 0.05 > 5) limite.position.x -= 0.10;
	if (limite.position.y - 0.05 < -10.4) limite.position.y += 0.10;
	if (limite.position.y + 0.05 > 10.4) limite.position.y -= 0.10;
	limite.position.z = -20;
}

function detecteurObjet(objet1, objet2, precision) {
	if ( Math.round(objet1.position.x * precision) == Math.round(objet2.position.x * precision) 
		&& Math.round(objet1.position.y * precision) == Math.round(objet2.position.y * precision)
	){
		return true;
	}
	else {
		return false;
	}
}

function constructeurCylinder(size, color) {
	var geometry  = new THREE.CylinderGeometry(size, 1, 1);
	var material  = new THREE.MeshLambertMaterial({ color: color });
	cylinder  = new THREE.Mesh(geometry, material );
	return cylinder ;
}

function constructeurPlane(size, color, texture){
	var planeGeometry = new THREE.PlaneGeometry(size, 7);
	var planeMateriel = new THREE.MeshBasicMaterial({color: color, transparent: true, side: THREE.DoubleSide, map: texture});
	plane = new THREE.Mesh(planeGeometry, planeMateriel);
	plane.rotateY(3.13);
	plane.position.z = -21;
	plane.position.x = 0;
	plane.position.y = -4;
	plane.rotation.x = 11;
	return plane;
}

$("*").keydown(function (event) {

	scene.remove(plane);

	if (event.altKey) {
		if ((event.which == F_DROITE || event.which == F_GAUCHE) && !horizontal) {
			camera.rotation.set(coords[0],coords[1],coords[2]);
			horizontal = true;
		}

		if (event.which == F_BAS || event.which == F_HAUT) {
			console.log(camera.rotation);
			if (horizontal) {
				coords[0] = camera.rotation.x;
				coords[1] = camera.rotation.y;
				coords[2] = camera.rotation.z;
			}
			horizontal = false;
		}

		if (event.which == F_HAUT) camera.rotateX(0.02);
		if (event.which == F_BAS) camera.rotateX(-0.02);
		if (event.which == F_GAUCHE) camera.rotateY(0.02);
		if (event.which == F_DROITE) camera.rotateY(-0.02);

	} else {
		limiteDeplacement(camera, event);
		if (event.which == F_GAUCHE) camera.translateX(-turnSpeed);
		if (event.which == F_DROITE) camera.translateX(turnSpeed);
		if (event.which == F_HAUT) camera.translateZ(-turnSpeed);
		if (event.which == F_BAS) camera.translateZ(turnSpeed);
		camera.position.z = d_z;
	}

	
if (detecteurObjet(camera, mesh, 1)){


	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	var text_indice2 = "Combien de portails possède la cathédrale d'Amiens";

	context.font = "bold " + canvas.height / 2 + "px serif";
	canvas.width = context.measureText(text_indice2).width;
	canvas.height = 300;
	context.font = "bold " + canvas.height / 4 + "px serif";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(
		text_indice2,
		canvas.width / 2,
		canvas.height / 2
		);
	var texture_canvas = new THREE.Texture(canvas);
	texture_canvas.needsUpdate = true;
	plane2 = constructeurPlane(11, 0xffffff, texture_canvas);
	scene.add(plane2);
	indice2 = true;


	if(event.which == (51)){				
		scene.remove(plane2);
			

		cylinder = constructeurCylinder(1, 0X32a852)
		cylinder.position.z = 10;
		cylinder.position.x = 0;
		cylinder.position.y = 0;
		cylinder.rotation.x = 11;
		scene.add( cylinder );

		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		var text_indice3 = "Chercher le nombre de cylindre?";
		context.font = "bold " + canvas.height / 2 + "px serif";
		canvas.width = context.measureText(text_indice3).width;
		canvas.height = 300;
		context.font = "bold " + canvas.height / 4 + "px serif";
		context.fillStyle = "#FFFFFF";
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.fillText(
			text_indice3,
		canvas.width / 2,
		canvas.height / 2
		);
		var texture_canvas = new THREE.Texture(canvas);
		texture_canvas.needsUpdate = true;
		plane3 = constructeurPlane(11, 0xffffff, texture_canvas);
		scene.add(plane3)
	}
}

if(indice2 && (event.which == (49))){
	indice3 = true;
}

if ((indice2 && indice3)){
	scene.remove(AmbientLight);
	scene.remove(plane3);
	scene.remove(plane2);
	AmbientLight
		= new THREE.AmbientLight(0xffffff);
	scene.add( AmbientLight);
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	var fin = "Bravo vous avez finis le mini-jeu";

	context.font = "bold " + canvas.height / 2 + "px serif";
	canvas.width = context.measureText(fin).width;
	canvas.height = 300;
	context.font = "bold " + canvas.height / 4 + "px serif";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(
		fin,
	canvas.width / 2,
	canvas.height / 2
	);
	var texture_canvas = new THREE.Texture(canvas);
	texture_canvas.needsUpdate = true;
	plane3 = constructeurPlane(11, 0xffffff, texture_canvas);
	scene.add(plane3);
}

});

Init();
Animer();