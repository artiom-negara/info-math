Program Solutie;
 { comentariu - definim viteza primului tren - V1; defenim timpul, cat a mers primul tren, pana cand a fost ajuns de al doilea tren - T ;
     viteza celui de-al doilea tren - V2 }

  Var V1, T, V2 : integer;
Begin
   { scriem formula de calcul a vitezei primului tren, fara a utiliza unitatile de masura, si fara calcu }l
     V1 := 300 div 5;
      
  { scriem formula de calcul a timpului, cat a mers primul tren, pana cand a fost ajuns de al doilea tren }
    T := (300 - 120) div V1;
   { scriem formula de calcul a vitezei celui de-al doilea tren }
     V2 := (300 - 120) div (T - 1);
   { afisam rezultatul calculului vitezei trenului al doilea
    write ('Viteza trenului al doilea este = '); write(V2); write (' km/h');
End.        