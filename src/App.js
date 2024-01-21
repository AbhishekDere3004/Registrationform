import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Step1Form from './components/Step1Form';
import Step2Form from './components/Step2Form';
import UserTable from './components/UserTable';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>User Registration App</h1>
          <Routes>
            <Route path="/" element={<Step1Form/>} />
            <Route path="/Step2Form" element={<Step2Form/>} />
            <Route path="/" exact element={<UserTable/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
