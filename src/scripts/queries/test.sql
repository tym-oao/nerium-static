select cast(1.25 as float) as foo
     , '2018-09-09' as bar
     , 'Hello' as quux
     , 'Björk Guðmundsdóttir' as quuux
 union
select 42
     , '2031-05-25'
     , :greeting
     , 'ƺƺƺƺ';
