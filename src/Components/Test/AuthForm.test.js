import { render, screen } from '@testing-library/react';
import AuthForm from '../Auth/AuthForm';

describe('AuthForm component', () => {
    test( 'should display the authentication', () =>{
        //Arrange
        render(<AuthForm />);

        //Act

        //Assert
        const edit = screen.getByText('edit', {exact: false});
        expect(edit).toBeInTheDocument();
    })
})