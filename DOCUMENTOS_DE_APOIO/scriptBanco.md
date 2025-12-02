create database falcao_real;
use falcao_real;

create table usuarios (
idUsuario int primary key auto_increment,
nome varchar(45) not null,
email varchar(60) not null unique,
senha varchar(50) not null,
dtNasc date not null,
telefone varchar(20),
cpf char(14) unique,
genero varchar(10)
);

select * from usuarios;

create table quiz (
idQuiz int primary key auto_increment,
nome varchar(45)
);

insert into quiz values
(1, 'Quiz FR');

select * from quiz;

create table resultado (
idResultado int primary key auto_increment,
fkQuiz int,
fkUsuarios int,
acertos int,
erros int,
constraint fkQuizResultado
foreign key (fkQuiz)
references quiz (idQuiz),
constraint fkUsuariosResultado
foreign key (fkUsuarios)
references usuarios (idUsuario)
);

select * from resultado;

-- select para o ranking
    SELECT 
    u.nome,
    SUM(r.acertos) AS melhorPontuacao -- soma todos os pontos de cada tentativa do usuário
    FROM resultado r
    JOIN usuarios u ON u.idUsuario = r.fkUsuarios
    GROUP BY r.fkUsuarios
    ORDER BY melhorPontuacao DESC
    LIMIT 5;


-- select do número de tentativas e a melhor pontuação do usuário
SELECT 
        COUNT(idResultado) AS tentativas,
        MAX(acertos) AS melhorPontuacao
        FROM resultado WHERE fkUsuarios = 3;