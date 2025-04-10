import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		fetch("https://playground.4geeks.com/contact/agendas/Guido/contacts")
			.then(res => res.json())
			.then(data => {
				dispatch({ type: "set_contacts", payload: data.contacts });
			})
			.catch(err => console.error("Error al obtener contactos:", err));
	}, []);

	return (
		<div className="container mt-4">
			<h1 className="text-center mb-4">📒 Agenda de contactos</h1>
			
			<div className="row">
				{store.contacts && store.contacts.length > 0 ? (
					store.contacts.map((contact) => (
						<div key={contact.id} className="col-md-4 mb-3">
							<div className="card shadow">
								<div className="card-body">
									<h5 className="card-title">{contact.name}</h5>
									<p className="card-text">
										📧 {contact.email}<br />
										📞 {contact.phone}<br />
										🏠 {contact.address}
									</p>
								</div>
							</div>
						</div>
					))
				) : (
					<p className="text-center">No hay contactos todavía.</p>
				)}
			</div>
		</div>
	);
};
