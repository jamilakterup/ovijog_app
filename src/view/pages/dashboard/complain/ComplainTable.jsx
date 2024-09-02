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



function ComplainTable() {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [complaintData, setComplaintData] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});
  const scrollerRef = useRef(null); 


  const columns = [
    { field: 'title', headerName: 'Title', width: 200, editable: true },
    { field: 'complainer_info', headerName: 'Complainer Info', width: 180, editable: true },
    { field: 'content', headerName: 'Content', width: 120, editable: true },
    { field: 'file', headerName: 'File', width: 120 },
    { field: 'office', headerName: 'Office', width: 200, editable: true },
    { field: 'tracking_id', headerName: 'Tracking ID', width: 120 },
    { field: 'status', headerName: 'Status', width: 90, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      cellClassName: 'actions',
      align: 'right',
      headerAlign: 'right',
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
          <div key={`show-${id}`}>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Show"
            className="textPrimary"
            onClick={() => handleOpenModal(id)}
            color="inherit"
          />
          
          <DetailsModal
           open={modalOpen}
           handleClose={handleCloseModal}
           data={complaintData}
          />
        </div>,
          <GridActionsCellItem
          key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
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


  const fetchComplaintData = async (id) => {
    try {
      const response = await fetch(`http://114.130.119.192/api/complaints/${id}/`);
      const data = await response.json();
      setComplaintData(data);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching complaint data:', error);
    }
  };


  useEffect(() => {
    // Fetch data from the API
    fetch('http://114.130.119.192/api/complaints/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRows(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


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
  

 const handleOpenModal = (id) => {
    fetchComplaintData(id);
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

    fetch(`http://10.106.15.243/api/complaints/${id}`, {
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
    fetch(`http://10.106.15.243/api/complaints/${id}`, {
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
        margin:"10px",
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
