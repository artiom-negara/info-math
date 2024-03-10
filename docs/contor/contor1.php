<?php
/*
 // Contor vizitatori unici si accesari pagina
 // Script gratuit - MarPlo - http://www.marplo.net
*/

// Fisierul unde este stocat nr. vizitatori
$countfile = 'contor.txt';

// Numar de ore in care vizitatorul este considerat unic
$ore_unic = 24;

// Setare 1 nr. vizitatori si accesari, folosite cand pagina e accesata prima data
$vizitatori = 1;
$accesari = 1;

// Preia din URL pagina curenta, in format "urlencode"
$pagina = urlencode(strip_tags($_SERVER['REQUEST_URI']));
$r_pagina = $pagina."\r\n";			// Seteaza randul cu url-ul paginii care va fi adaugat in contor

// Seteaza numele care va fi folosit pt. cookie, in functie de pagina. Pastreaza doar caracterele [A-Za-z0-9_]
$nume_cookie = preg_replace('/[^A-Za-z0-9_]/', '', $pagina);

// Daca fisierul pt. stocare contor poate fi accesat
if (file_exists($countfile)) {
	$fisier = fopen($countfile, 'r+b');		// Deschide fisierul pt. citire
	flock($fisier, LOCK_EX);		// Blocheaza fisierul

	// Citeste fisierul de stocare linie cu linie pentru gasirea cimpului cu URL-ul paginii.
	while($citeste = fgets($fisier)) {
		if(strcmp($citeste, $pagina."\r\n")==0) {		// Compara linia gasita cu $pagina (daca sunt egale 'strcmp'=0)
			$reda = ftell($fisier);			// Returneaza pozitia curenta a pointer-ului
			$vizit = explode("^^^",fgets($fisier));   // Preia in matrice nr. vizitatori si accesari care se afla pe linia imediat dupa pozitia gasita de 'ftell'
			$vizitatori = (int)$vizit[0];			// Seteaza valoarea pt. nr. vizitatori cea din contor, in integer (nr. natural))
			$accesari = (int)$vizit[1] + 1;		// Seteaza valoarea pt. nr. accesari in integer si o mareste cu o unitate

			// Daca pagina vizitata nu e in cookie
			if (!isset($_COOKIE[$nume_cookie]) || $_COOKIE[$nume_cookie]!=$pagina) {
				$vizitatori++; 		// Mareste cu o unitate valoarea nr. vizitatori
			}

			fseek($fisier, $reda);		// Seteaza noua pozitie a pointerului (de la inceputul fisierului in bytes) la nivelul precizat de 'ftell', pt a adauga in locul corect noile valoari
			$r_pagina = '';			// Randul cu pagina exista deja in contor

			break;		// Intrerupe executia lui WHILE
		}
	}

	$adauga = $r_pagina.$vizitatori.'^^^'.$accesari;		// Seteaza pt. adaugare valorile pt. contor 
	fputs($fisier, $adauga."\r\n");		// Adauga datele in fisier
	@flock($fisier, LOCK_UN);   // Deblocheaza fisierul
	fclose($fisier);		// Inchide accesul la fisier

	// Seteaza cookie-ul pt. recunoasterea vizitatorului
	setcookie($nume_cookie, $pagina, time()+60*60*$ore_unic);
}
else {
  echo 'Fisierul '.$countfile.' nu a fost gasit';
}

// Datele de iesire
$contor_out = '<!-- Script gratuit de la http://www.marplo.net -->
	<div style="background:#dedefe; width:150px; border:1px solid #bbbbbb; padding:2px;" align="center">Vizitatori - <b><i>'. $vizitatori. '</i></b><br />
	Accesari &nbsp; - <b><i>'. $accesari. '</i></b></div>';
?>
