import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  return (
    <form>
      {/* Existing form fields */}
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
        placeholder="password"
      />
      <input
        type="text"
        onChange={(e) => setVehicleColor(e.target.value)}
        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
        placeholder="Vehicle Color"
      />
      <input
        type="text"
        onChange={(e) => setPlate(e.target.value)}
        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
        placeholder="Plate"
      />
      <input
        type="number"
        onChange={(e) => setCapacity(e.target.value)}
        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
        placeholder="Capacity"
      />
      <select
        onChange={(e) => setVehicleType(e.target.value)}
        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
      >
        <option value="" disabled selected>
          Select Vehicle Type
        </option>
        <option value="car">Car</option>
        <option value="motorcycle">Motorcycle</option>
        <option value="auto">Auto</option>
      </select>
      <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm">
        Login
      </button>
      <p className="text-center">
        Already have an account?{' '}
        <Link to="/captain-login" className="text-blue-600">
          Login
        </Link>
      </p>
    </form>
  );
};

export default CaptainSignup;