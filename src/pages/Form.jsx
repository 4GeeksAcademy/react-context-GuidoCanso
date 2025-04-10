import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Form = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const navigate = useNavigate();
	const { dispatch } = useGlobalReducer();

	const addContact = () => {
		fetch('https://playground.4geeks.com/contact/agendas/Guido/contacts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: fullName,
				phone: phone,
				email: email,
				address: address
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Error en la solicitud: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				console.log('Contacto creado:', data);
				// Recargar lista de contactos
				fetch("https://playground.4geeks.com/contact/agendas/Guido/contacts")
					.then(res => res.json())
					.then(data => {
						dispatch({ type: "set_contacts", payload: data.contacts });
						navigate("/"); // Redirige al home
					});
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	return (
		<div>
			<h1>Add Contact</h1>
			<label>Full name</label>
			<input type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} />
			<label>Email</label>
			<input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
			<label>Phone</label>
			<input type="number" onChange={(e) => setPhone(e.target.value)} value={phone} />
			<label>Address</label>
			<input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
			<button onClick={addContact}>Submit</button>
		</div>
	);
}

export default Form;
