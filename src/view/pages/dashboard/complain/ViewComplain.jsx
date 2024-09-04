import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";


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
        console.log(data);
        setDataArray(data); // Set the state with the actual data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTrackingData();
  }, [trackingId]); // Added trackingId as a dependency

  return (
    <>
      {dataArray.length > 0 ? (
        <h2 className="text-2xl custom-bold-font text-center my-8">
          অভিযোগের শিরোনাম: {dataArray[0].complaint_title} <br />
          ট্র্যাকিং নম্বর: {dataArray[0].tracking_id}
        </h2>
      ) : (
        <h2>No complaint title available</h2>
      )}
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {dataArray?.map((data) => (
            <Step key={data.id}>
              <StepLabel>
                <div className="bg-slate-200 rounded-lg p-2 custom-font text-lg inline-block text-start">
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
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

        {dataArray.length > 0 ? (
          <div className="custom-font text-center my-8">
        অভিযোগের বিবরণ: {dataArray[0].complaint_content}
          </div>
        ) : (
          <div>অভিযোগের বিবরণ নেই!!</div>
        )}
    </>
  );
}

export default ViewComplain;
