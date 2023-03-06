import Pages from "./pages/Pages";
import {BrowserRouter} from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {MdOutlineFoodBank} from "react-icons/md"

function App() {
  return (

    <div className="App">

      <BrowserRouter>
      <Nav>
        <MdOutlineFoodBank />
        <Logo to={"/"}>Quick Chop</Logo>
      </Nav>
          <Search />
          <Pages />
      </BrowserRouter>

    </div>

  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Oleo Script', cursive;
`

const Nav = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 2rem;
  }
`
export default App;
