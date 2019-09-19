import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
   root: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      color: '#fff',
      backgroundColor: '#421a5d',
   },
});

export default () => {

   const classes = useStyles();

   return (
      <footer className={classes.root}>
         <div className="footer-copyright text-center py-2">
            Rede Industrial
         </div>
      </footer>
   )
}