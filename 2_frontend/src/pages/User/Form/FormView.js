import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Loading from '../../../components/Loading'
import iconNoPicture from '../../../assets/images/no-picture.jpg';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import { Row, Col, Form, ButtonToolbar, Button, Alert } from 'react-bootstrap'


const useStyles = makeStyles({
   containerButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
   },
   containerButtonImage: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   form: {
      border: '.5px #6a10a7 solid',
      padding: '20px',
      borderRadius: '3px',
      backgroundColor: '#6065800a',
   },
   containerPreviewImage: {
      border: '.5px solid rgb(106, 16, 167)',
      padding: '2px',
      borderRadius: '2px',
      cursor: 'pointer',
      width: '128px',
      height: '128px',
   }
});

export default React.forwardRef((props, ref) => {

   const classes = useStyles();

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
                        <h4>Formulário:</h4>
                     </Col>
                  </Row>

                  <div className={classes.form}>
                     <Row className="justify-content-center">
                        <Col>
                           <div className={classes.containerButtonImage}>
                           <img title="selecionar foto" alt="imagem de perfil do usuário"
                              className={classes.containerPreviewImage}
                              src={ props.fotoView.fotoBase64 ? props.fotoView.fotoBase64 : iconNoPicture}
                              onClick={props.openFile}
                           />
                           </div>
                        </Col>
                     </Row>
                     <Row className="justify-content-center">
                        <Col>
                           <div className={classes.containerButtonImage}>
                              <ButtonToolbar>
                                 <Button disabled={props.user.foto === null} title="Apagar imagem" onClick={props.clearImageSelection} variant="link" size="sm">Apagar imagem</Button>
                              </ButtonToolbar>
                           </div>
                        </Col>
                     </Row>

                     <Form noValidate validated={props.validated} onSubmit={props.submitForm}>
                        <input
                           style={{ display: "none" }}
                           type="file"
                           onChange={props.handleImageChange}
                           ref={ref}
                        />
                        <Form.Group controlId="formGroupNome">
                           <Form.Label>Nome completo:</Form.Label>
                           <Form.Control style={{textTransform: 'upperCase'}}
                              type="text"
                              name="nome"
                              onChange={props.handleChange('nome')}
                              value={props.user.nome}
                              required
                           />
                           <Form.Control.Feedback type="invalid">
                              Campo obrigatório
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                           <Form.Label>Email</Form.Label>
                           <Form.Control style={{textTransform: 'lowerCase'}}
                              type="email"
                              name="email"
                              onChange={props.handleChange('email')}
                              value={props.user.email}
                              required
                           />
                           <Form.Control.Feedback type="invalid">
                              Campo obrigatório
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formGroupContato">
                           <Form.Label>Contato</Form.Label>
                           <MaskedFormControl 
                              type='text'
                              name="fone"
                              mask='(11)11111-1111'
                              onChange={props.handleChange('fone')}
                              value={props.user.fone}
                              minLength="14"
                              required
                           />
                           <Form.Control.Feedback type="invalid">
                              Campo obrigatório
                           </Form.Control.Feedback>
                        </Form.Group>
                        <div className={classes.containerButton}>
                           <ButtonToolbar>
                              <Button disabled={props.loading} title="Salvar" type="submit" variant="outline-success" size="sm">Salvar</Button>&nbsp;
                              <Button disabled={props.loading} title="Cancelar" onClick={() => props.redirectUrl('/')} variant="outline-danger" size="sm">Cancelar</Button>
                           </ButtonToolbar>
                        </div>
                     </Form>
                  </div>
      
               </>
         }
      </>
   )
})