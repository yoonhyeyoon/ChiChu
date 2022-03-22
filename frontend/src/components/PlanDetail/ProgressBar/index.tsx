import React from 'react'
import {
  Parentdiv, Childdiv, Progresstext
} from './styles';

const ProgressBar = ({ bgcolor, progress, height }): JSX.Element => {

  return (
    <Parentdiv>
      <Childdiv>
        <Progresstext>{`${progress}%`}</Progresstext>
      </Childdiv>
    </Parentdiv>
  )
}

export default ProgressBar;