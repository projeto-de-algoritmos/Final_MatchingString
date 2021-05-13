import React from 'react'
import Autocomplete from './components/Autocomplete'
import {cities} from './cities'


const App = () => {
	return (
		<Autocomplete data={cities}>
		</Autocomplete>
	)
}

export default App;