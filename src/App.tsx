import React from 'react';
import styled from "styled-components"
import { Sudoku } from './components/sudoku';
import { exampleSudokuData, theme } from "./resources"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { Header } from "./components/header"
import { Helmet } from "react-helmet"

const PageWrapper = styled.div({
  padding: "60px 0",
  minHeight: "calc(100vh - 120px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
})

const GlobalStyle = createGlobalStyle({
  "body": {
      background: theme.colors.primary,
      color: theme.colors.textColorPrimary,
      fontFamily: theme.fonts.base,
      margin: "0px"
  }
})

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sudoku</title>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap" rel="stylesheet"/>      </Helmet>
      <GlobalStyle/>
      <Header/>
      <PageWrapper> 
        <Sudoku data={exampleSudokuData}/>
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App