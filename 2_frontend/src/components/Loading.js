import React from 'react'
import { makeStyles } from '@material-ui/styles';
import ImgLoading from '../assets/images/loading.gif'


const useStyles = makeStyles({
   root: {
      textAlign: 'center',
      minHeight: '100%',
      marginTop: '50px',
   },
   texto: {
      fontFamily: 'monospace'
   }
});


export default () => {

   const classes = useStyles();

   return (
      <div className={classes.root}>
         <img src={ImgLoading} alt="loading" /><br/>
         <span className={classes.texto}>processando, aguarde...</span>
      </div>
   )
}