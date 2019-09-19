import React from 'react'
import Loading from '../../../components/Loading'
import { makeStyles } from '@material-ui/styles'
import { Row, Col, Table, ButtonToolbar, Button, Alert } from 'react-bootstrap'


// CSS custom
const useStyles = makeStyles({
   containerButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
   },
   table: {
      border: '.5px #6a10a7 solid',
      padding: '20px',
      borderRadius: '3px',
      backgroundColor: '#6065800a',
   }
});


export default React.forwardRef((props, ref) => {

   // obj CSS custom
   const classes = useStyles();

   /*--- View ---*/
   return (
      <>
         { props.loading
            ?
               <Loading />
            :
               <>
                  {
                     props.show
                     ?  <Row className="justify-content-center">
                           <Col xs={12} sm={12} md={6} lg={5} xl={5}>
                              <Alert variant={props.show.variant}>
                                 {props.show.msg}
                              </Alert>
                           </Col>
                        </Row>
                     : null
                  }

                  <Row>
                     <Col>
                        <h4>Registro de Usuários:</h4>
                     </Col>
                     <Col>
                        <div className={ classes.containerButton }>
                           <ButtonToolbar>
                              <Button title="Novo usuário" onClick={() => props.redirectUrl('/user/new')} variant="outline-secondary" size="sm">+ Novo</Button>&nbsp;
                              <Button title="Atualizar tabela" onClick={() => props.getUsers()} variant="outline-secondary" size="sm">@ Atualizar</Button>&nbsp;
                              <Button title="Imprimir" onClick={props.savePDF} variant="outline-secondary" size="sm"># Imprimir</Button>
                           </ButtonToolbar>
                        </div>
                     </Col>
                  </Row>

                  <div className={classes.table} ref={ref}>
                     <Table triped bordered hover size="sm" triped="true">
                        <thead>
                           <tr style={{ backgroundColor:"rgb(197, 197, 197)" }}>
                              <th style={{width: '30px'}}>ID</th>
                              <th>NOME</th>
                              <th>EMAIL</th>
                              <th>FONE</th>
                              <th style={{width: '20px'}}>AÇÃO</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              props.users.length === 0
                              ?
                                 <tr>
                                    <td colSpan={5}>
                                       <span>Nenhum registro encontrado.</span>
                                    </td>
                                 </tr>
                              : <>{
                                 props.users.map( (u, key) => (
                                    <tr key={key}>
                                       <td>{u.id}</td>
                                       <td style={{textTransform: 'uppercase'}}>{u.nome}</td>
                                       <td style={{textTransform: 'lowercase'}}>{u.email}</td>
                                       <td>{u.fone}</td>
                                       <td>
                                          <Button title="Editar registro" onClick={() => props.redirectUrl(`/user/edit/${u.id}`)} variant="outline-warning" size="sm">E</Button>
                                          &nbsp;
                                          <Button title="Excluir registro" onClick={() => props.deleteUser(u.id, key)} variant="outline-danger" size="sm">X</Button>
                                       </td>
                                    </tr>
                                 ))
                              }</>
                           }
                        </tbody>
                     </Table>
                  </div>
               </>
         }
      </>
   )
})