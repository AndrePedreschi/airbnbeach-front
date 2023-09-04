import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent, waitFor, getByRole } from './test-utils.jsx';

import { Home } from '../src/pages/Home';
import { Footer } from '../src/Components/Footer'
import { Header } from '../src/Components/Header'
import { Form } from '../src/Components/Form'

/* describe('Home component', () => {
  it('É renderizado corretamente"', () => {
    render(<Home />);
    //screen.debug();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
}); */


/* describe('Header component', () => {
  it('É renderizado corretamente"', () => {
    render(<Header />);
    //screen.debug();
    expect(screen.getByText('header')).toBeInTheDocument();
    //expect(screen.getByText(/©2023 AirBnBeach, inc/)).toMatchSnapshot()
    //expect(screen.getByText(/Content/i)).toBeUndefined()
  });
}); */


describe('Footer component', () => {
  it('É renderizado corretamente"', () => {
    render(<Footer />);
    expect(screen.getByText(/©2023 AirBnBeach, inc/)).toBeInTheDocument();

  });
});

describe('Login-Form component', () => {
  it('É renderizado corretamente"', () => {
    render(<Form type='login' />);
    //screen.debug();
    expect(screen.getByText(/Iniciar Sessão/)).toBeInTheDocument();

  });
});

describe('CreateUser-Form component', () => {
  it('É renderizado corretamente', () => {
    render(<Form type='createUser' />);
    //Tratativa para lidar com múltiplos elementos quando se quer um em específico 
    expect(screen.getAllByText(/Criar conta/)[0]).toBeInTheDocument();
  }
  );



  /*  it("Clicar no botão login é direcionado a página de login", async () => {
     
     render(<Form type='createUser'/>);
     
 
     fireEvent.click(screen.getByTestId('Homac'))
     //fireEvent.click(screen.getByText('Soma'))
 
     
     expect(screen.debug())
 
 
     
       
     //screen.debug()
     //expect(screen.getByText('Home')).toBeInTheDocument();
 
     
 }); */



});








