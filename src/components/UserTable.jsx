import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import 'datatables.net';

const UserTable = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Fetch user data from the backend
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => {
        // Dispatch an action to update the Redux store with fetched data
        dispatch({ type: 'SET_SUBMITTED_USERS', payload: data });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [dispatch]);

  const submittedUsers = useSelector((state) => state.user.submittedUsers);

  const tableData = useMemo(() => {
    return submittedUsers.map((user) => ({
      Name: user.name,
      Age: user.age,
      Sex: user.sex,
      Mobile: user.mobile,
      GovtIdType: user.govtIdType,
      GovtId: user.govtId,
      Address: user.address || 'N/A',
      State: user.state || 'N/A',
      City: user.city || 'N/A',
      Country: user.country || 'N/A',
      Pincode: user.pincode || 'N/A',
    }));
  }, [submittedUsers]);

  useEffect(() => {
    const table = $('#userTable').DataTable({
      data: tableData,
      columns: [
        { title: 'Name', data: 'Name' },
        { title: 'Age', data: 'Age' },
        { title: 'Sex', data: 'Sex' },
        { title: 'Mobile', data: 'Mobile' },
        { title: 'Govt ID Type', data: 'GovtIdType' },
        { title: 'Govt ID', data: 'GovtId' },
        { title: 'Address', data: 'Address' },
        { title: 'State', data: 'State' },
        { title: 'City', data: 'City' },
        { title: 'Country', data: 'Country' },
        { title: 'Pincode', data: 'Pincode' },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [tableData]);

  return (
    <div>
      <h2>Submitted Users</h2>
      <table id="userTable" className="display" style={{ width: '100%' }} />
    </div>
  );
};

export default UserTable;
