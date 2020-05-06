import React from 'react';
import styled from "styled-components"
import { Sudoku } from './components/sudoku';
import { exampleSudokuData, theme } from "./resources"
import { ThemeProvider, createGlobalStyle } from "styled-components"

const PageWrapper = styled.div({
  padding: "40px"
})

const GlobalStyle = createGlobalStyle({
  "body": {
      background: theme.colors.primary,
      color: theme.colors.textColorPrimary,
      fontFamily: theme.fonts.base,
      margin: "0px"
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <PageWrapper>
        <Sudoku data={exampleSudokuData}/>
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App