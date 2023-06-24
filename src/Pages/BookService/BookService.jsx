import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const BookService = () => {
    const services = useLoaderData();
    console.log(services);
    const { title, _id, price, img } = services;

    const { user } = useContext(AuthContext);

    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = user?.email;
        const date = form.date.value;
        const dueAmount = form.dueAmount.value;
        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert('Service book successfully')
                }
            })
    }

    return (
        <div className="card-body">
            <h3 className="text-center text-3xl font-bold mb-4">Book Service: {title}</h3>
            <form onSubmit={handleBookService}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="form-control">
                        <input type="text" defaultValue={user?.displayName} name="name" placeholder="Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="date" name="date" placeholder="Date" className="input input-bordered" />

                    </div>
                    <div className="form-control">
                        <input type="text" name="email" defaultValue={user?.email} placeholder="Email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <input type="text" name="dueAmount" defaultValue={'$' + price} placeholder="Due Amount" className="input input-bordered" />

                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default BookService;