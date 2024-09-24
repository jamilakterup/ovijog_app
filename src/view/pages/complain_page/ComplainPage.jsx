import { useEffect, useState } from "react";
import ComplainForm from "./ComplainForm";
import { loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ComplainPage() {
  const [offices, setOffices] = useState([]);
  const [files, setFiles] = useState([]);
  const [hideInfo, setHideInfo] = useState(false);
  const [officeName, setOfficeName] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOffice, setSelectedOffice] = useState('');
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getSummary = async (event) => {
    const value = event.target.value;
    setText(value);
    setError(''); 

    try {
      // Send the POST request with FormData
      const response = await fetch("http://114.130.116.176/api/summarizer/", {
        method: "POST",
        body: JSON.stringify({
          "content": value,
        }),
        headers: {
          "Content-Type": 'application/json',
        }
      });
      // Check if the response is not OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the response JSON
      const result = await response.json();

      // Check if result is received and handle accordingly
      if (result) {
        console.log('Summary received:', result);
        setTitle(result);
        // Perform actions with the result if needed
      }

    } catch (err) {
      // Handle and display error
      setError('Failed to fetch summary. Please try again.');
      console.error('Error:', err);
    }
  };


  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await fetch("http://114.130.119.192/api/offices/");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOffices(data);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };

    fetchOffices();
  }, [setOffices]);

  useEffect(() => {
    if (hideInfo) {
      setInputValue("");
    }
  }, [hideInfo]);

  useEffect(() => {
    loadCaptchaEnginge(4);
  }, []);

  const reloadCaptcha = () => {
    loadCaptchaEnginge(4);
  };

  const handleCaptchaChange = (event) => {
    setCaptchaValue(event.target.value);
  };

  // submit the form on database:::::::
//   const complainSubmit = async (event) => {
//     event.preventDefault();
// console.log(files)
//     const target = event.target;
//     const complain_title = target.complain_title.value;
//     const complain_details = target.complain_details.value;
//     const dropzone_file = target.dropzone_file.files[0]; // File object
//     const complainer_info = target.complainer_info.value;
//     const custom_office_name = target.custom_office?.value;

    
//     // Validate file extension
//     const validExtensions = ["jpg", "jpeg", "png", "pdf", "mp4", "3gp"];
//     if (dropzone_file) {
//       const fileExtension = dropzone_file.name.split(".").pop().toLowerCase();
//       if (!validExtensions.includes(fileExtension)) {
//         alert(
//           "Invalid file type. Please upload a jpg, jpeg, png, pdf, mp4, or 3gp file."
//         );
//         return;
//       }

//       // Optional: Validate file size (e.g., limit to 10MB)
//       const maxSizeMB = 10;
//       const maxSizeBytes = maxSizeMB * 1024 * 1024;
//       if (dropzone_file.size > maxSizeBytes) {
//         alert("File size exceeds 10MB.");
//         return;
//       }
//     }


//     if (validateCaptcha(captchaValue)) {
//       setCaptchaError(false);
//     } else {
//       setCaptchaError(true);
//       return;
//     }
//     setLoading(true);
    
//     try {
//       const response = await fetch("http://114.130.119.192/api/complaint/submit/", {
//         method: "POST",
//         body: JSON.stringify({
//           "title": complain_title,
//           "content": complain_details,
//           "complainer_info": complainer_info,
//           "file": dropzone_file,
//           "office_id": selectedOffice ? selectedOffice.id : "",
//           "custom_office": custom_office_name,
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();

//       if (result) {
//         navigate(`/tracking/${result.tracking_id}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error (e.g., show an error message)
//     }
//     finally{
//       setLoading(false);
//     }
//   };


const complainSubmit = async (event) => {
  event.preventDefault();

  // Retrieve values from the form
  const target = event.target;
  const complain_title = target.complain_title.value;
  const complain_details = target.complain_details.value;
  const complainer_info = target.complainer_info.value;
  const custom_office_name = target.custom_office?.value;

  // Create a FormData object
  const formData = new FormData();
  formData.append("title", complain_title);
  formData.append("content", complain_details);
  formData.append("complainer_info", complainer_info);
  
  // Append files to FormData
  files.forEach((fileObj) => {
    formData.append("files[]", fileObj.file);
  });


  formData.append("office_id", selectedOffice ? selectedOffice.id : "");
  formData.append("custom_office", custom_office_name);

  // Validate captcha
  if (!validateCaptcha(captchaValue)) {
    setCaptchaError(true);
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post("http://114.130.119.192/api/complaint/submit/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    if (response.data) {
      navigate(`/tracking/${response.data.tracking_id}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};




  return (
    <>
      <ComplainForm
        offices={offices}
        hideInfo={hideInfo}
        setHideInfo={setHideInfo}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setSelectedOffice={setSelectedOffice}
        complainSubmit={complainSubmit}
        reloadCaptcha={reloadCaptcha}
        handleCaptchaChange={handleCaptchaChange}
        captchaValue={captchaValue}
        captchaError={captchaError}
        text={text}
        setText={setText}
        title={title}
        setTitle={setTitle}
        loading={loading}
        error={error}
        getSummary={getSummary}
        officeName={officeName}
        setOfficeName={setOfficeName}
        files={files}
        setFiles={setFiles}
      />
    </>
  );
}

export default ComplainPage;
