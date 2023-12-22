import { useState } from 'react';

const AddLocation = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const countries = [
    {
      name: 'Country A',
      states: [
        {
          name: 'State 1',
          cities: ['City 1', 'City 2', 'City 3'],
        },
        {
          name: 'State 2',
          cities: ['City 4', 'City 5', 'City 6'],
        },
      ],
    },
    // Add more countries as needed
  ];

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
  };

  const selectState = (state) => {
    setSelectedState(state);
  };

  return (
    <div className="container mx-auto flex flex-1 bg-white flex-wrap py-6">
      <section className="w-full md:w-1/3 flex flex-col px-3">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Countries</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr
                key={country.name}
                className={`cursor-pointer ${
                  selectedCountry === country ? 'bg-gray-200' : ''
                }`}
                onClick={() => selectCountry(country)}
              >
                <td className="border px-4 py-2">{country.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="w-full md:w-1/3 flex flex-col px-3">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">States</th>
            </tr>
          </thead>
          <tbody>
            {selectedCountry &&
              selectedCountry.states.map((state) => (
                <tr
                  key={state.name}
                  className={`cursor-pointer ${
                    selectedState === state ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => selectState(state)}
                >
                  <td className="border px-4 py-2">{state.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      <section className="w-full md:w-1/3 flex flex-col px-3">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Cities</th>
            </tr>
          </thead>
          <tbody>
            {selectedState &&
              selectedState.cities.map((city) => (
                <tr key={city} className="cursor-pointer">
                  <td className="border px-4 py-2">{city}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AddLocation;
