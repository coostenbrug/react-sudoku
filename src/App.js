import React from 'react';
import styled from "styled-components"
import { Sudoku} from './components/sudoku';
import './App.css';

const sudokuData = {
  width: 9,
  height: 9,
  groupWidth: 3,
  groupHeight: 3,
  values: [
      [0,0,4,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,8,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,7,0,0,0,0,0,0],
      [0,2,0,0,3,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,5,6,0,0,0,0,0,0],
      [0,0,0,0,0,0,9,0,0]
  ],
  locked: [
      [0,0,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,0,0],
      [0,1,0,0,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,1,1,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,0,0]
  ],
}

const PageWrapper = styled.div({
  padding: "40px"
})

function App() {
  return (
    <PageWrapper>
      <Sudoku data={sudokuData}/>
    </PageWrapper>
  );
}

export default App