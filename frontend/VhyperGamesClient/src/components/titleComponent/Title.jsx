import React from 'react';
import classes from './Title.module.css';

function Title({ text, size = '2em', color = '#ffffff', align = 'center' }) {
  return (
    <div className={classes['title-container']}>
        <h1 style={{ fontSize: size, color: color, textAlign: align }}>
        {text}
        </h1>
    </div>
  );
}

export default Title;