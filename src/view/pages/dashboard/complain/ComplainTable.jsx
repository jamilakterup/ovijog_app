import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import DetailsModal from './DetailsModal';
import axios from 'axios';



function ComplainTable() {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [complaintData, setComplaintData] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});
  const [statusMap, setStatusMap] = useState({});
  const [statusOptions, setStatusOptions] = useState([]);
  const [usersOptions, setUsersOptions] = useState([]);
  const [officesOptions, setOfficesOptions] = useState([]);
  const scrollerRef = useRef(null);

  // Function to get the class based on status ID
  const getStatusClass = (statusId) => {
    switch (statusId) {
      case 1: return 'bg-yellow-400 text-yellow-800';
      case 2: return 'bg-red-400 text-red-800';
      case 3: return 'bg-green-400 text-green-800';
      default: return 'bg-gray-400 text-gray-800';
    }
  };

  const columns = [
    { field: 'title', headerName: 'শিরোনাম', width: 300 },
    { field: 'office_name', headerName: 'দপ্তর', width: 300 },
    { field: 'tracking_id', headerName: 'ট্র্যাকিং নম্বর', width: 220 },
    {
      field: 'status',
      headerName: 'স্ট্যাটাস',
      width: 200,
      renderCell: (params) => {
        const statusName = statusMap[params.value];
        const statusClass = getStatusClass(params.value); // Function to get the class based on status ID

        return (
          <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${statusClass}`}>
            {statusName || 'Unknown'}
          </span>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'অ্যাকশান',
      width: 120,
      cellClassName: 'actions',
      align: 'center',
      headerAlign: 'center',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save-${id}`}
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`cancel-${id}`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
          key={`edit-${id}`}
          icon={<VisibilityIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
          <div key={`show-${id}`}>
            <GridActionsCellItem
              icon={<EditIcon/>}
              label="Show"
              className="textPrimary"
              onClick={() => handleOpenModal(id)}
              color="inherit"
            />

            <DetailsModal
              open={modalOpen}
              handleClose={handleCloseModal}
              statusOptions={statusOptions}
              usersOptions={usersOptions}
              officesOptions={officesOptions}
              data={complaintData}
            />
          </div>,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];




// fetch all complains status and users
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        // Fetch complaints data
        const complaintsResponse = await axios.get("http://114.130.119.192/api/complaints/");
        setRows(complaintsResponse.data);

        // Fetch status data
        const statusResponse = await axios.get("http://114.130.119.192/api/status/");
        const statusMapping = statusResponse.data.reduce((map, status) => {
          map[status.id] = status.name;
          return map;
        }, {});
        setStatusMap(statusMapping);
        setStatusOptions(statusResponse.data); // Assuming you need this elsewhere

        // Fetch users data
        const usersResponse = await axios.get("http://114.130.119.192/api/users/");
        setUsersOptions(usersResponse.data);

        // Fetch offices data
        const officeResponse = await axios.get("http://114.130.119.192/api/offices/");
        setOfficesOptions(officeResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
// end fetch all complains status and users


  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollLeft = 0; // Scroll to the left
    }
  }, [rows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };


  const handleOpenModal = async(id) => {
      try {
        const response = await fetch(`http://114.130.119.192/api/complaints/${id}/`);
        const data = await response.json();
        setComplaintData(data);
        setModalOpen(true);

        if (data.office) {
          const res= await axios.post('http://114.130.119.192/api/users/office/',{
            "office_id": data.office
          })
          // console.log(res)
          // Set offices data
          setOfficesOptions(officeResponse.data);
        const officeResponse = await axios.get("http://114.130.119.192/api/offices/");
        setOfficesOptions(officeResponse.data);
        }
      } catch (error) {
        console.error('Error fetching complaint data:', error);
      }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setComplaintData(null);
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const updatedRow = rows.find(row => row.id === id);

    fetch(`http://114.130.119.192/api/complaints/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRow),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      })
      .catch(error => console.error('Error saving data:', error));
  };

  const handleDeleteClick = (id) => () => {
    fetch(`http://114.130.119.192/api/complaints/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setRows(rows.filter(row => row.id !== id));
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find(row => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        margin: "10px",
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
      ref={scrollerRef}
    >
      <h1 className='text-3xl font-semibold m-4'>Complains</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
}

export default ComplainTable;
