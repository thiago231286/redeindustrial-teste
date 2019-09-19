<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;

$app->group('/api', function() {


    // endpoint: listar todos os registro da tabela users -----------------------------------------------
    $this->get('/users', function(Request $request, Response $response, array $args) {

        # Variável de retorno
        $result = Array();

        # Pega a conexão PDO da API
        $pdo = $this->db;

        # Execução da SQL
        try {
            $pdo->beginTransaction();
           $sql = "SELECT * FROM users ORDER BY id";
            $stmt = $pdo->query($sql);
            $result['total_rows'] = $stmt->rowCount();
            $result['data'] = $stmt->fetchAll();
            $pdo->commit();
        } catch( PDOException $Exception ) {
            $pdo->rollBack();
            return $this->response->withJson([
                'error' => true,
                'code' => $Exception->getCode(),
                'message' => $Exception->getMessage()
            ]);
        }

        sleep(1);

        return $this->response->withJson($result);
    });

    // endpoint: Buscar 1 registro específico -----------------------------------------------
    $this->get('/users/{id}', function(Request $request, Response $response, array $args) {
        # Variável de retorno
        $result = Array();

        # Pega a conexão PDO da API
        $pdo = $this->db;

        # Execução da SQL
        try {
            $pdo->beginTransaction();
            $sql = "SELECT * FROM users WHERE id=?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute( [$args['id']] );
            $result = $stmt->fetchAll();
            $pdo->commit();
        } catch( PDOException $Exception ) {
            $pdo->rollBack();
            return $this->response->withJson([
                'error' => true,
                'code' => $Exception->getCode(),
                'message' => $Exception->getMessage()
            ]);
        }

        sleep(1);

        return $this->response->withJson($result);
    });

    // endpoint: savar/atualizar registro na tabela users --------------------------------------
    $this->post('/users', function(Request $request, Response $response, array $args) {

        # Variavel de retorno
        $result = Array();

        # Pega a conexão PDO da API
        $pdo = $this->db;

        # --- Configurações
        define('PATH_UPLOAD_DIR', getcwd().'\\img-users\\');
        define('PATH_FOTO_URL', "{$request->getUri()->getBaseUrl()}/img-users/");

        # --- Parametros recebidos
        $data           = $request->getParams();    // parametros texto
        $uploadedFiles  = $request->getUploadedFiles();     // parametros arquivos

        # --- Pegando o parametro que contem a foto do usuário 
        @$foto = $uploadedFiles['foto'];
        if( $foto && $foto->getError() === UPLOAD_ERR_OK ) {
            $foto_nome = uniqid() . '.png';
            $foto->moveTo( PATH_UPLOAD_DIR . $foto_nome );
            $data['foto'] = PATH_FOTO_URL . $foto_nome;
        } else {
            $data['foto'] = null;
        }
        
        # --- Deixando em maiuscula a chave nome
        if( (int) $data['id'] === 0 ) {
            $sql = 'INSERT INTO users(nome, email, fone, foto) VALUES(:nome, :email, :fone, :foto)';
            unset($data['id']);
        } else {
            $sql = 'UPDATE users SET nome=:nome, email=:email, fone=:fone, foto=:foto WHERE id=:id';
        }

        try {
            $pdo->beginTransaction(); 
            $stmt = $pdo->prepare($sql);
            $stmt->execute( $data );
            $pdo->commit();
        } catch( PDOException $Exception ) {
            $pdo->rollBack();
            return $this->response->withJson([
                'error' => true,
                'code' => $Exception->getCode(),
                'message' => $Exception->getMessage()
            ]);
        }

        sleep(1);

        return $this->response->withJson([
            "success" => true,
            "data" => $result
        ]);

    });

    // endpoint: savar/atualizar registro na tabela users --------------------------------------
    $this->delete('/users/{id}', function(Request $request, Response $response, array $args) {

        # Variável de retorno
        $result = Array();

        # Pega a conexão PDO da API
        $pdo = $this->db;

        # Execução da SQL
        try {
            $pdo->beginTransaction();
                $sql = "DELETE FROM users WHERE id = :id";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':id', $args['id'], PDO::PARAM_INT);   
                $result['success'] = $stmt->execute();
            $pdo->commit();
        } catch( PDOException $Exception ) {
            $pdo->rollBack();
            return $this->response->withJson([
                'error' => true,
                'code' => $Exception->getCode(),
                'message' => $Exception->getMessage()
            ]);
        }

        sleep(1);

        return $this->response->withJson($result);

    });

});