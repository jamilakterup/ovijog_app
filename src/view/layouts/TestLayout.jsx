import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Static Data
const staticData = [
  {
    id: 1,
    assigned_office: "Office 1",
    assigned_person: "Person A",
    status_name: "Pending",
    created_at: "2024-01-01",
    assigned_person_comment: "Initial review",
  },
  {
    id: 2,
    assigned_office: "Office 2",
    assigned_person: "Person B",
    status_name: "In Progress",
    created_at: "2024-01-15",
    assigned_person_comment: "In progress",
  },
  {
    id: 3,
    assigned_office: "Office 3",
    assigned_person: "Person C",
    status_name: "Completed",
    created_at: "2024-02-01",
    assigned_person_comment: "Completed",
  },
];

const complaintDetails = {
  complaint_title: "Sample Complaint Title",
  tracking_id: "TRACK123456",
  complaint_content: "This is a detailed description of the complaint.",
};


// Flexbox container for wrapping steps
const StepperContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Stack steps vertically
  gap: theme.spacing(2),
  "& .MuiStep-root": {
    marginBottom: theme.spacing(2), // Space between steps
  },
}));

function TestLayout() {
  return (
    <section className="container mx-auto mt-20">
      <div className="w-1/2 mx-auto">
        <span className="text-2xl font-bold text-gray-600">
          অভিযোগের শিরোনাম:{" "}
          <span className="text-slate-800">
            {complaintDetails.complaint_title}
          </span>
        </span>
        <br />
        <span className="text-2xl font-bold text-gray-600">
          ট্র্যাকিং নম্বর:{" "}
          <span className="text-slate-800">{complaintDetails.tracking_id}</span>
        </span>
      </div>

        <Box sx={{ maxWidth: 600, padding: "20px", margin:"0 auto" }}>
          <StepperContainer>
            <Stepper orientation="vertical" activeStep={0}>
              {staticData?.map((data) => (
                <Step key={data.id}>
                  <StepLabel>
                    <Typography variant="h6" color="textPrimary">
                      {data.assigned_office}
                    </Typography>
                  </StepLabel>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <Typography variant="body1" color="textPrimary">
                      <span>
                        {" "}
                        দপ্তর:{" "}
                        <span className="text-blue-700">
                          {data.assigned_office}
                        </span>{" "}
                      </span>
                      <br />
                      <span>
                        {" "}
                        দায়িত্বপ্রাপ্ত:{" "}
                        <span className="text-blue-700">
                          {data.assigned_person}
                        </span>{" "}
                      </span>
                      <br />
                      <span>
                        {" "}
                        অবস্থা:{" "}
                        <span className="text-blue-700">
                          {data.status_name}
                        </span>{" "}
                      </span>
                      <br />
                      <span>
                        {" "}
                        হস্তানান্তরের তারিখ:{" "}
                        <span className="text-blue-700">
                          {data.created_at}
                        </span>{" "}
                      </span>
                      <br />
                      <span>
                        {" "}
                        নোট:{" "}
                        <span className="text-blue-700">
                          {data.assigned_person_comment}
                        </span>{" "}
                      </span>
                    </Typography>
                  </div>
                </Step>
              ))}
            </Stepper>
          </StepperContainer>
        </Box>

      {staticData.length > 0 ? (
        <div className="font-medium mx-auto w-full my-8 text-gray-800 bg-gray-50 p-5 rounded-md">
          <span className="font-bold text-gray-900">অভিযোগের বিবরণ:</span>{" "}
          {complaintDetails.complaint_content}
        </div>
      ) : (
        <div className="font-medium text-center md:text-3xl mx-auto w-full my-72">
          আপনার অভিযোগটি প্রক্রিয়াধীন আছে!!
        </div>
      )}
    </section>
  );
}

export default TestLayout;
