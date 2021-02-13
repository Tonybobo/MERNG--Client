import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from './../utils/hooks';

import { AuthContext } from '../context/auth';
function Register(props) {
	const context = useContext(AuthContext);
	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			context.login(userData);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});
	function registerUser() {
		addUser();
	}

	return (
		<div className='form-container'>
			<Form onSubmit={onSubmit} className={loading ? 'loading' : ''} noValidate>
				<h1>Register</h1>
				<Form.Input
					label='Username'
					placeholder='Username'
					name='username'
					value={values.username}
					onChange={onChange}
					error={errors.username ? true : false}
				/>
				<Form.Input
					label='Email'
					placeholder='Email'
					type='email'
					name='email'
					value={values.email}
					onChange={onChange}
					error={errors.email ? true : false}
				/>

				<Form.Input
					type='password'
					label='Password'
					placeholder='Password'
					name='password'
					value={values.password}
					onChange={onChange}
					error={errors.password ? true : false}
				/>
				<Form.Input
					type='password'
					label='Confirm password'
					placeholder='Confirm Password...'
					name='confirmPassword'
					value={values.confirmPassword}
					onChange={onChange}
					error={errors.confirmPassword ? true : false}
				/>
				<Button type='submit' primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className='ui error message'>
					<ul className='list'>
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
