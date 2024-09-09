import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from '@mui/material/styles';

// Flexbox container for wrapping steps
const StepperContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', // Stack steps vertically
  gap: theme.spacing(2),
  '& .MuiStep-root': {
    marginBottom: theme.spacing(2), // Space between steps
  },
}));

function ViewComplain() {
  const { trackingId } = useParams();
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const getTrackingData = async () => {
      try {
        const response = await fetch(
          `http://114.130.119.192/api/complaint-progress-status/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tracking_id: trackingId }), // Send tracking_id in the request body
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDataArray(data); // Set the state with the actual data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTrackingData();
  }, [trackingId]); // Added trackingId as a dependency

  // Define the last step number
  const lastStepIndex = dataArray.length - 1;

  return (
    <section className="container mx-auto mt-20">
      {dataArray.length > 0 ? (
        <div className="w-1/2 mx-auto custom-bold-font">
          <span className="text-2xl text-gray-600">
            অভিযোগের শিরোনাম:{" "}
            <span className="text-slate-800">{dataArray[0].complaint_title}</span>
          </span>
          <br />
          <span className="text-2xl text-gray-600">
            ট্র্যাকিং নম্বর:{" "}
            <span className="text-slate-800">{dataArray[0].tracking_id}</span>
          </span>
        </div>
      ) : (
        <></>
      )}

      <Box sx={{ maxWidth: 600, padding: "20px", margin:"0 auto"}}>
        <StepperContainer>
          <Stepper orientation="vertical" activeStep={lastStepIndex}>
            {dataArray?.map((data, index) => (
              <Step
                key={data.id}
                completed={index < lastStepIndex}
                active={index === lastStepIndex}
              >
                <StepLabel
                  StepIconProps={{
                    sx: {
                      '& .MuiStepIcon-root': {
                        fontSize: 24, // Adjust the font size as needed
                        color: index < lastStepIndex ? 'green' : undefined,
                        '&.Mui-completed': {
                          color: 'green',
                        },
                      },
                    },
                  }}
                >
                </StepLabel>
                  <div className="bg-slate-100 p-4 rounded-md custom-font text-lg">
                      <span>
                        {" "}
                        দপ্তর:{" "}
                        <span className="text-blue-700">{data.assigned_office}</span>{" "}
                      </span>
                      <br />
                      <span>
                        {" "}
                        দায়িত্বপ্রাপ্ত:{" "}
                        <span className="text-blue-700">{data.assigned_person}</span>{" "}
                      </span>
                      <br />
                      <span>
                        {" "}
                        অবস্থা:{" "}
                        <span className="text-blue-700">{data.status_name}</span>{" "}
                      </span>
                      <br />
                      <span>
                        {" "}
                        হস্তানন্তরের তারিখ:{" "}
                        <span className="text-blue-700">{data.created_at}</span>{" "}
                      </span>
                      <br />
                      <span>
                        {" "}
                        মন্তব্য:{" "}
                        <span className="text-blue-700">{data.assigned_person_comment}</span>{" "}
                      </span>
                  </div>
              </Step>
            ))}
          </Stepper>
        </StepperContainer>
      </Box>

      {dataArray.length > 0 ? (
        <div className="font-medium mx-auto w-full my-8 text-lg text-gray-800 bg-gray-50 p-5 rounded-md">
          <span className="text-gray-900 custom-bold-font">অভিযোগের বিবরণ:</span>{" "}
          <span className="custom-font">{dataArray[0].complaint_content}</span>
        </div>
      ) : (
        <div className="custom-font font-medium text-center md:text-3xl mx-auto w-full my-60">
          আপনার অভিযোগটি প্রক্রিয়াধীন আছে!!
        </div>
      )}
    </section>
  );
}

export default ViewComplain;
