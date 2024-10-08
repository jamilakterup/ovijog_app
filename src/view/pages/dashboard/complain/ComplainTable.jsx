import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import DetailsModal from "./DetailsModal";
import { useNavigate } from "react-router-dom";
import { useGetComplaintsQuery } from "../../../redux/complain/complainApi";
import axios from "axios";


function ComplainTable() {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [complaintData, setComplaintData] = useState(null);
  const [usersOptions, setUsersOptions] = useState(null);
  const [singleId, setSingleId] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});
  const scrollerRef = useRef(null);
  const navigate= useNavigate(null);
  const {data,isLoading}=useGetComplaintsQuery();

  // Function to get the class based on status ID
  const getStatusClass = (statusId) => {
    switch (statusId) {
      case 1:
        return "bg-yellow-400 text-yellow-800";
      case 2:
        return "bg-red-400 text-red-800";
      case 3:
        return "bg-green-400 text-green-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  const columns = [
    { field: "title", headerName: "শিরোনাম", width: 300 },
    { field: "office_name", headerName: "দপ্তর", width: 300 },
    { field: "tracking_id", headerName: "ট্র্যাকিং নম্বর", width: 220 },
    {
      field: "status_name",
      headerName: "স্ট্যাটাস",
      width: 200,
      renderCell: (params) => {
        const statusName = params.value;
        const statusClass = getStatusClass(params.value);

        return (
          <span
            className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${statusClass}`}
          >
            {statusName || "Unknown"}
          </span>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "অ্যাকশান",
      width: 120,
      cellClassName: "actions",
      align: "center",
      headerAlign: "center",
      getActions: (params) => {
        const { id, tracking_id } = params.row;
        return [
          <GridActionsCellItem
            key={`show-${id}`}
            icon={<VisibilityIcon />}
            label="Show"
            className="textPrimary"
            onClick={() => handleShowDetails(tracking_id)}
            color="inherit"
          />,
          <div key={`edit-${id}`}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={()=>handleOpenModal(id)}
              color="inherit"
            />
            <DetailsModal
              open={modalOpen}
              handleClose={handleCloseModal}
              usersOptions={usersOptions}
              setUsersOptions={setUsersOptions}
              singleId={singleId}
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
  

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollLeft = 0;
    }
  }, [rows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleShowDetails=(id)=>{
    navigate(`/complain-details/${id}`)
  }

  const handleOpenModal=(id)=>{
    setSingleId(id)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setComplaintData(null);
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const updatedRow = rows.find((row) => row.id === id);

    fetch(`http://114.130.119.192/api/complaints/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRow),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View },
        });
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  const handleDeleteClick = (id) => () => {
    fetch(`http://114.130.119.192/api/complaints/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(data.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Box
    // TODO paginate and height
      sx={{
        height: 580,
        width: "100%",
        margin: "10px",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
      ref={scrollerRef}
    >
      <h1 className="text-3xl font-semibold m-4 text-slate-800">অভিযোগ সমূহ:</h1>
      <DataGrid
        rows={data}
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
