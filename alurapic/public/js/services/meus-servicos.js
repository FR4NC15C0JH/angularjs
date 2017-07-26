//criando um serviço que pode ser chamado por qualquer um e alterado em um so lugar
//função factory - é com ela que criamos um serviço passando seu nome e uma função que deve retornar um objeto.
// Em nosso caso, estamos devolvendo $resource já configurado
//OBS: toda função factory deve retornar um objeto, nunca uma função.
angular.module('meusServicos', ['ngResource'])
	.factory('recursoFoto', function($resource) {
		//mudando a injenção de dependência
		//passamos o parâmetro para o $resource a URL de um endpoint REST, com o coringa igual ao usado nas rotas
		//O serviço $resouce não tem suporte ao verbo PUT, nisso estamos criando o verbo para atender 
		//null - é utilizado qd queremos enviar os parâmetros através de query string
		//depois add a ação update, que possui como parâmetro um obj que indica o método a ser utilizado
		return $resource('/v1/fotos/:fotoId', null, {
			'update' : {
				method: 'PUT'
			}
		});	
	})//isolando o serviço de cadastrar fotos seguindo o padrão promise; 
	.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope) {
		//variavel criada deixa o cod mais sucinto
		var evento = 'fotoCadastrada';
		//criamos um obj service e o add a uma função, que tem "foto" como parâmetro
		//como devemos retornar uma promisse na função, o Angular tem um serviço que esse padrão, o $q
		var service = {};
		service.cadastrar = function(foto) {
			//o serviço $q recebe 2 parâmetros, que ambos sao funções:
			//1 - recebe como valor os dados que acessamos chamando a função the da promise
			//2 - passamos qualquer informação de erro pelo catch
			return $q(function(resolve, reject) {
				if(foto._id) {
					recursoFoto.update({fotoId: foto._id}, foto, function() {
						//como dentro do serviços nao temos $scope, só os controllers têm; 
						//nisso usamos o $rootScope, que é escopo pai de todos os escopos e disparamos o evento
						//$broadcast - substituí o $scope.focado e dispara o evendo com o fotoCadastrada
						$rootScope.$broadcast(evento);

						resolve({
							mensagem: 'Foto' + foto.titulo + ' atualizada com sucesso',
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível atualizar a foto ' + foto.titulo
						});
					});
				} else {
					recursoFoto.save(foto, function() {

						$rootScope.$broadcast(evento);

						resolve({
							mensagem: 'Foto ' + foto.titulo + ' incluída com sucesso',
							inclusao: true
						});
					}, function(erro){
						console.log(erro);
						reject({
							mensagem: 'Não foi possível incluir a foto ' + foto.titulo
						});
					});
				} 
			});
		};
		return service;
	});

/* as funções de $http (get, post, put, delete) devolvem uma promessa, 
no inglês promise. Uma promise contém o resultado futuro de uma ação.
 Quando a ação é bem sucedida, temos acesso ao valor retornado da ação,
  através da função then e erros através da função catch.
   Apesar de $http suportar as funções success e error, por baixo dos panos uma promise é utilizada.

Trabalhar com o pattern promise não é exclusividade do Angular, 
podemos implementá-lo em nosso código. Para isso, o Angular possui o serviço $q, 
especializado na criação de promises. Normalmente,
 retornamos uma promise a partir de uma chamada de função.
 */