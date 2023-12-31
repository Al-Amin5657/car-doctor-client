import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('https://module-70-car-doctor-server-ten.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])
    return (
        <div className='mt-8'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold text-orange-500'>Services</h3>
                <h2 className='text-5xl mb-4'>Our service area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;